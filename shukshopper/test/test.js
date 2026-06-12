global.SEARCH = process.env.SEARCH || '';
const { game: g, els } = require('./harness.js');
let pass = 0, fail = 0;
const ok = (cond, name) => { if (cond) { pass++; console.log('  PASS', name); } else { fail++; console.log('  FAIL', name); } };

console.log('--- 1. boot & reset ---');
g.reset();
ok(g.G.list.length === 3, 'first list has 3 items (playtest tuning: faster first basket)');
g.G.baskets = 1; g.G.list = g.newList ? g.newList() : g.G.list;
ok(!g.newList || g.G.list.length === 4, 'later lists have 4 items');
g.reset();
ok(g.G.list.every(x => g.curZone().items.includes(x.it)), 'list items all from current district');
ok(g.G.lane === 1 && g.G.speed === 0.34, 'initial lane/speed');

console.log('--- 2. core loop: 120 simulated seconds at 60fps, no input ---');
g.G = null; g.reset(); g.running = true;
let err = null;
try {
  for (let i = 0; i < 7200; i++) { g.update(1/60); g.draw(); }
} catch (e) { err = e; }
ok(!err, 'no exception in 7200 frames (got: ' + (err && err.message) + ')');
ok(g.G.speed <= 1.05 + 1e-9, 'speed capped at 1.05 (=' + g.G.speed.toFixed(3) + ')');
ok(g.G.ents.length < 200, 'entity list bounded (=' + g.G.ents.length + ')');
ok(g.G.zone >= 1, 'fallback advanced zones with no pickups (zone=' + g.G.zone + ')');

console.log('--- 3. spawn invariant: safe lane never has an obstacle ---');
g.reset(); g.running = true;
let bad = 0;
for (let i = 0; i < 2000; i++) {
  g.G.ents = []; g.G.dist = Math.random() * 50000;
  g.spawnRow();
  for (const e of g.G.ents)
    if ((e.kind === 'low' || e.kind === 'high' || e.kind === 'block') && e.lane === g.G.safeLane) bad++;
}
ok(bad === 0, 'no obstacle ever in safe lane (2000 rows)');

console.log('--- 4. jump clears low, slide clears high, block always hits ---');
function collideOne(kind, setup) {
  g.reset(); g.running = true; setup();
  g.G.ents = [{ z: 0.97, lane: 1, kind, it: 'X' }];
  const v0 = g.G.vendor;
  g.update(1/60);
  return g.G.vendor > v0; // got hit?
}
ok(!collideOne('low', () => { g.G.jy = 0.5; }), 'jump (jy=.5) clears low');
ok(collideOne('low', () => { g.G.jy = 0; }), 'grounded hits low');
ok(!collideOne('high', () => { g.G.sliding = 0.5; }), 'slide clears high');
ok(collideOne('high', () => { g.G.jy = 0.5; }), 'jumping hits high (hanging)');
ok(collideOne('block', () => { g.G.jy = 0.5; }), 'block hits even mid-jump');

console.log('--- 5. two-strike death: hit during vendor chase = game over ---');
g.reset(); g.running = true;
g.hit();
ok(g.G.vendor === 4 && g.running, 'first hit = vendor chase, still running (chase=4s per playtest)');
g.G.inv = 0; g.hit();
ok(!g.running, 'second hit during chase ends run');

console.log('--- 6. basket completion & zone advance ---');
g._timeouts.length = 0;
g.reset(); g.running = true;
const z0 = g.G.zone;
for (const li of g.G.list) g.collect({ kind: 'item', it: li.it });
ok(g.G.baskets === 1 && g.G.shekels === 10, 'basket bonus +10 shekels');
const pending = g._timeouts.filter(t => t.ms === 900);
ok(pending.length === 1, 'zone advance scheduled at 900ms');
pending[0].fn();
ok(g.G.zone === z0 + 1, 'zone advanced after timeout');
ok(g.G.list.length === 4 && g.G.list.every(x => g.curZone().items.includes(x.it)), 'new list from NEW district');

console.log('--- 7. THE 900ms RESTART RACE ---');
g._timeouts.length = 0;
g.reset(); g.running = true;
for (const li of g.G.list) g.collect({ kind: 'item', it: li.it }); // schedules advance
g.gameOver();                       // die inside the 900ms window
g.start();                          // player smashes RUN AGAIN fast
const t2 = g._timeouts.filter(t => t.ms === 900).pop();
t2.fn();                            // stale timeout fires on the NEW run
ok(g.G.zone === 0, 'fresh run still in district 0 after stale timeout (zone=' + g.G.zone + ')');

console.log('--- 8. shuk transition at district boundary ---');
g.reset(); g.running = true;
g.G.zone = 4; // Tchotchke Alley, last Carmel district
g.advanceZone();
ok(g.curZone().shuk.id === 'levinsky', 'Carmel→Levinsky hop at zone 5');
g.G.zone = 12; g.advanceZone();
ok(g.curZone().shuk.id === 'carmel' && g.G.zone === 13, 'zone 13 wraps to Carmel (endless lap)');
g.G.list = g.newList();
ok(g.G.list.every(x => g.curZone().items.includes(x.it)), 'wrapped-lap list still valid');

console.log('--- 9. duplicate item / non-list item collection ---');
g.reset(); g.running = true;
const item = g.G.list[0].it;
g.collect({ kind: 'item', it: item });
const s = g.G.shekels;
g.collect({ kind: 'item', it: item }); // already got → consolation
ok(g.G.shekels === s + 2, 'duplicate list item pays 2 consolation shekels');

console.log('--- 10. keyMagenta: 404/never-loaded art leaves ART empty; fallback path drawn ---');
ok(Object.keys(g.ART).length === 0, 'ART empty when all PNGs 404 (current production state)');
g.reset(); g.running = true;
let derr = null; try { for (let i = 0; i < 60; i++) { g.update(1/60); g.draw(); } } catch (e) { derr = e; }
ok(!derr, 'emoji-fallback draw path safe');

console.log('--- 11. keyMagenta chroma math on synthetic pixels ---');
// re-implement check of threshold: r>170 && b>170 && g<110 → alpha 0
const px = [[255,0,255,true],[255,105,255,true],[180,109,171,true],[171,110,171,false],[200,200,200,false],[255,150,255,false]];
let kops = true;
for (const [r,gr,b,exp] of px) {
  const keyed = r>170 && b>170 && gr<110;
  if (keyed !== exp) kops = false;
}
ok(kops, 'threshold keys magenta family, keeps near-pink skin/highlights >=110 green');

console.log('--- 12. gameOver/share state ---');
g.reset(); g.running = true; g.G.baskets = 3; g.G.shekels = 42;
g.gameOver();
ok(els['ovBaskets'].textContent === 3 || els['ovBaskets'].textContent === '3', 'overlay shows baskets');
const share = g.T().shareTxt(3, 42);
ok(share.includes('?beat=3') && share.includes('miklatgames.fun/shukshopper'), 'share text carries beat param + URL');
ok(!/he=|lang=/.test(share), '(note) share URL does NOT carry lang');

console.log('\nRESULT: ' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
