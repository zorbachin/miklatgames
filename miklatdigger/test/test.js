// MIKLAT DIGGER test suite — drives the real game script headless.
const { load } = require('./harness.js');
let pass = 0, fail = 0;
const ok = (cond, name) => { if (cond) { pass++; console.log('  PASS', name); } else { fail++; console.log('  FAIL', name); } };
const approx = (a, b, eps) => Math.abs(a - b) <= (eps || 1e-6);

/* ---------- 1. boot & grid dig rules ---------- */
console.log('--- 1. boot & dig rules ---');
{
  const { g } = load();
  g.reset(false); g.running = true;
  ok(g.grid[0][3] === 0 && g.P.c === 3 && g.P.r === 0, 'starting hole carved, player in it');
  ok(g.grid.slice(0, 2).every(row => row.every((t, i) => t === 0 || t === 1 || i === 3)), 'topsoil rows 0-1 are pure dirt');
  // fence the dig: target must be dirt and no generated pipe may sit adjacent
  g.grid[1][3] = 1; delete g.artAt['3,1'];
  for (const [c, r] of [[2, 1], [4, 1], [3, 2]]) if (g.grid[r] && g.grid[r][c] === 5) g.grid[r][c] = 1;
  const c0 = g.G.coffee;
  g.dig(0, 1);
  ok(g.P.r === 1 && g.grid[1][3] === 0, 'dig down clears dirt and moves in');
  ok(approx(c0 - g.G.coffee, g.digCost()), 'dirt dig costs digCost coffee (=' + (c0 - g.G.coffee) + ')');
  ok(g.G.depth === 1, 'depth = deepest row reached');
  g.grid[2][3] = 2; delete g.artAt['3,2'];
  g.dig(0, 1);
  ok(g.P.r === 1 && g.grid[2][3] === 2, 'rock is undiggable, blocks the move');
  g.dig(0, -1);
  ok(g.P.r === 1, 'cannot dig up');
  g.P.c = 0; g.dig(-1, 0);
  ok(g.P.c === 0, 'left wall bounds respected');
  g.P.c = 3; g.grid[1][4] = 0; const c1 = g.G.coffee;
  g.dig(1, 0);
  ok(g.P.c === 4 && g.G.coffee === c1, 'walking into empty space is free');
  g.running = false; g.dig(0, 1);
  ok(g.P.r === 1, 'dig is a no-op when not running');
}

/* ---------- 2. gravity: telegraph, fall, smash, crush, chain ---------- */
console.log('--- 2. gravity / collapse ---');
{
  const { g } = load();
  g.reset(false); g.running = true;
  g.P.c = 6; g.P.r = 0;                       // park the player out of the way
  g.grid[3][2] = 2; g.grid[4][2] = 0; g.grid[5][2] = 1; delete g.artAt['2,3'];
  g.gravityScan(1 / 60);
  ok(g.tele['2,3'] !== undefined, 'unsupported rock telegraphs');
  for (let i = 0; i < 40; i++) g.gravityScan(1 / 60); // ~0.66s: telegraph expires
  ok(g.grid[3][2] === 0 && g.falls.some(f => f.c === 2), 'after 0.5s the rock becomes a falling block');
  for (let i = 0; i < 300 && g.falls.length; i++) g.updateFalls(1 / 60);
  ok(g.falls.length === 0, 'falling block landed');
  ok(g.grid[4][2] === 0 && g.grid[5][2] === 1, 'block SMASHES on landing (clears, floor intact)');
}
{
  const { g, els } = load();
  g.reset(false); g.running = true;
  g.grid[3][2] = 2; g.grid[4][2] = 0; g.grid[5][2] = 0; delete g.artAt['2,3'];
  g.P.c = 2; g.P.r = 5; g.grid[6][2] = 1;     // player standing in the shaft
  for (let i = 0; i < 600 && g.running; i++) { g.gravityScan(1 / 60); g.updateFalls(1 / 60); }
  ok(!g.running, 'falling block onto player = game over');
  ok(els['ovTtl'].textContent === g.T().overCrush, 'death cause: crushed');
}
{
  const { g } = load();
  g.reset(false); g.running = true;
  g.P.c = 6; g.P.r = 0;
  g.grid[2][4] = 2; g.grid[3][4] = 2; g.grid[4][4] = 0; g.grid[5][4] = 1;
  delete g.artAt['4,2']; delete g.artAt['4,3'];
  for (let i = 0; i < 600; i++) { g.gravityScan(1 / 60); g.updateFalls(1 / 60); }
  ok(g.grid[2][4] === 0 && g.grid[3][4] === 0, 'chain collapse: both stacked rocks fell and smashed');
}

/* ---------- 3. coffee depletion math ---------- */
console.log('--- 3. coffee ---');
{
  const { g, els } = load();
  delete g.meta.tank; delete g.meta.pick;
  g.reset(false); g.running = true;
  ok(g.G.coffee === 100 && g.maxCoffee() === 100, 'base coffee = 100');
  const c0 = g.G.coffee;
  for (let i = 0; i < 60; i++) g.update(1 / 60);
  ok(approx(c0 - g.G.coffee, 1, 0.02), 'drains ~1/s idle (=' + (c0 - g.G.coffee).toFixed(3) + ')');
  g.G.coffee = 50; g.grid[1][3] = 4;
  for (const [c, r] of [[2, 1], [4, 1], [3, 2]]) if (g.grid[r] && g.grid[r][c] === 5) g.grid[r][c] = 1;  // no stray pipes
  g.dig(0, 1);
  ok(approx(g.G.coffee, 50 - 2 + 30), 'finjan: +30% of max, after dig cost (=' + g.G.coffee + ')');
  g.G.coffee = 95; g.grid[2][3] = 4; delete g.artAt['3,2'];
  for (const [c, r] of [[2, 2], [4, 2], [3, 3]]) if (g.grid[r] && g.grid[r][c] === 5) g.grid[r][c] = 1;  // no stray pipes
  g.dig(0, 1);
  ok(g.G.coffee === 100, 'coffee caps at max');
  g.G.coffee = 0.5;
  for (let i = 0; i < 120 && g.running; i++) g.update(1 / 60);
  ok(!g.running && els['ovTtl'].textContent === g.T().overCoffee, 'coffee 0 = sat down for a break');
  g.meta.pick = 1;
  ok(approx(g.digCost(), 1.4), 'Pickaxe II: dig cost -30%');
  g.meta.tank = 1;
  ok(g.maxCoffee() === 140, 'Coffee Tank: +40% max');
  g.reset(false);
  ok(g.G.coffee === 140, 'run starts with full tank');
  delete g.meta.pick; delete g.meta.tank;
}

/* ---------- 4. ladder rig ---------- */
console.log('--- 4. ladder rig ---');
{
  const { g } = load();
  g.meta.ladder = 1;
  g.reset(false);
  ok(g.P.r === 8 && g.G.depth === 8, 'Ladder Rig: start at -8m');
  let shaft = true;
  for (let r = 0; r <= 8; r++) if (g.grid[r][3] !== 0) shaft = false;
  ok(shaft, 'starting shaft carved to -8m');
  delete g.meta.ladder;
}

/* ---------- 5. brush mini-game: success path ---------- */
console.log('--- 5. artifact extract: success ---');
{
  const { g, els } = load();
  g.reset(false); g.running = true;
  g.grid[1][4] = 0; g.P.c = 4; g.P.r = 1;
  g.grid[2][4] = 3; g.artAt['4,2'] = 0;       // stratum 0, type 0 = bamba
  g.dig(0, 1);
  ok(g.mode === 'brush' && g.G.B && g.G.B.c === 4 && g.G.B.r === 2, 'entering artifact tile starts BRUSH');
  const r0 = g.P.r;
  g.dig(0, 1);
  ok(g.P.r === r0, 'digging frozen during brush');
  g.rub(60);
  ok(g.G.B.clean === 60 && g.mode === 'brush', 'rubbing fills the clean meter');
  g.rub(60);
  ok(g.mode === 'play' && g.G.B === null, 'clean=100 ends the brush');
  ok(g.G.shekels === g.VAL[0] && g.G.finds === 1, 'clean extraction pays stratum value (₪' + g.G.shekels + ')');
  ok(g.museum['bamba'] === 1, 'museum entry recorded');
  ok(g.running === false && els['cardName'].textContent.length > 0, 'first-ever find shows the flavor card');
  ok(els['cardFact'].textContent.includes('1964'), 'flavor card carries the true history line');
  ok(g.P.c === 4 && g.P.r === 2 && g.grid[2][4] === 0, 'player moved into the cleared tile');
}

/* ---------- 6. brush: timeout → inspector confiscation + tax ---------- */
console.log('--- 6. artifact extract: confiscation ---');
{
  const { g } = load();
  g.reset(false); g.running = true;
  g.G.shekels = 50;
  g.grid[1][4] = 0; g.P.c = 4; g.P.r = 1;
  g.grid[2][4] = 3; g.artAt['4,2'] = 1;
  g.dig(0, 1);
  for (let i = 0; i < 200 && g.mode === 'brush'; i++) g.update(1 / 60);
  ok(g.mode === 'insp', 'timeout → INSPECTOR overlay state');
  ok(g.G.shekels === 45, '10% dig-tax applied (50→' + g.G.shekels + ')');
  ok(g.G.finds === 0 && !g.museum['agora'], 'confiscated: no find, no museum entry');
  for (let i = 0; i < 120 && g.mode === 'insp'; i++) g.update(1 / 60);
  ok(g.mode === 'play' && g.running, 'inspector overlay clears, dig resumes');
}

/* ---------- 7. Savta's Chair: one free confiscation ---------- */
console.log("--- 7. Savta's chair ---");
{
  const { g } = load();
  g.meta.savta = 1;
  g.reset(false); g.running = true;
  g.grid[1][4] = 0; g.P.c = 4; g.P.r = 1;
  g.grid[2][4] = 3; g.artAt['4,2'] = 0;
  g.startBrush(4, 2);
  g.finishBrush(false);
  ok(g.G.savtaUsed && g.G.finds === 1 && g.mode === 'play', 'Savta saves the first confiscation — find kept');
  g.running = true;
  g.G.shekels = 30;
  g.grid[3][4] = 3; g.artAt['4,3'] = 1;
  g.startBrush(4, 3);
  g.finishBrush(false);
  ok(g.mode === 'insp' && g.G.shekels === 27, 'second failure: Savta is out of arguments, tax applies');
  delete g.meta.savta;
}

/* ---------- 8. wallet contract safety ---------- */
console.log('--- 8. miklat.wallet safety ---');
{
  const { g } = load('', { 'miklat.wallet': '{corrupt json!!' });
  ok(g.wGet() === 0, 'corrupt JSON reads as 0');
  g.wAdd(10);
  ok(g.wGet() === 10, 'write after corruption recovers');
}
{
  const store = { 'miklat.wallet': '{"sh":5,"foo":"bar"}' };
  const { g } = load('', store);
  g.wAdd(10);
  const w = JSON.parse(store['miklat.wallet']);
  ok(w.sh === 15 && w.foo === 'bar', 'foreign wallet fields preserved (cross-game contract)');
  g.wSet(-7);
  ok(g.wGet() === 0 && JSON.parse(store['miklat.wallet']).sh === 0, 'negative clamps to 0');
}
{
  const { g } = load('', { 'miklat.wallet': '{"sh":"abc"}' });
  ok(g.wGet() === 0, 'non-numeric sh reads as 0');
}
{
  const { g } = load('', { 'miklat.wallet': '[1,2,3]' });
  ok(g.wGet() === 0, 'array wallet reads as 0');
  g.wAdd(3); ok(g.wGet() === 3, 'and is replaced by a sane object');
}
{
  const { g } = load();
  g.reset(false); g.running = true;
  g.G.shekels = 42; const w0 = g.wGet();
  g.gameOver('coffee');
  ok(g.wGet() === w0 + 42, 'run shekels bank into the shared wallet at game over');
}

/* ---------- 9. daily determinism ---------- */
console.log('--- 9. daily dig determinism ---');
{
  const { g } = load();
  const snap = () => { g.ensureRows(120); return JSON.stringify({ g: g.grid.slice(0, 120), a: g.artAt, s: g.scorps }); };
  g.reset(true);
  ok(g.G.counted === true, 'first daily attempt of the day is counted');
  const s1 = snap();
  g.running = true; g.G.depth = 17; g.G.finds = 2;
  g.gameOver('coffee');
  ok(g.daily.lastDay === g.dayNum() && g.daily.depth === 17 && g.daily.streak === 1,
     'counted daily records depth + starts streak');
  g.reset(true);
  ok(g.G.counted === false, 'second attempt same day = practice (uncounted)');
  const s2 = snap();
  ok(s1 === s2, 'two seeded runs generate identical worlds (rows, artifacts, scorpions)');
  const d0 = g.daily.depth;
  g.start(true);                              // practice replay
  g.G.depth = 99; g.gameOver('coffee');
  ok(g.daily.depth === d0, 'practice replay does NOT touch the daily record');
  const txt = g.T().shareDaily(g.dayNum(), 17, 1);
  ok(txt.includes('?daily=1') && txt.includes('-17m'), 'daily share text promotes the daily deep link');
}

/* ---------- 10. ?beat= fuzzing + challenge flow ---------- */
console.log('--- 10. ?beat fuzz ---');
{
  const cases = [['?beat=abc', 0], ['?beat=-5', 0], ['?beat=12.7', 12], ['?beat=99999', 9999],
                 ['?beat=38', 38], ['?beat=', 0], ['?beat=0x10', 0], ['?beat=%F0%9F%92%80', 0]];
  let all = true;
  for (const [s, exp] of cases) {
    const { g } = load(s);
    if (g.beatTarget !== exp) { all = false; console.log('    fuzz mismatch', s, '→', g.beatTarget, 'expected', exp); }
  }
  ok(all, 'beat param sanitized across 8 hostile inputs');
  const { g, els } = load('?beat=3');
  ok(els['beatBanner'].textContent === g.T().beatBanner(3), 'challenge banner shown on menu');
  g.reset(false); g.running = true;
  let derr = null;
  try { for (let i = 0; i < 60; i++) { g.update(1 / 60); g.draw(); } } catch (e) { derr = e; }
  ok(!derr, 'depth line draw path safe (err=' + (derr && derr.message) + ')');
  g.P.r = 4; g.setDepth();
  ok(g.G.beaten === true, 'crossing the friend depth flags the win');
  const share = g.T().shareTxt(38, 5);
  ok(share === '⛏️ MIKLAT DIGGER — reached -38m, 🏺 ×5. Beat my depth: https://miklatgames.fun/miklatdigger/?beat=38',
     'share text matches the spec exactly');
}

/* ---------- 11. museum set completion ---------- */
console.log('--- 11. museum sets ---');
{
  const { g } = load();
  g.reset(false); g.running = true;
  const w0 = g.wGet();
  g.grid[2][1] = 3; g.artAt['1,2'] = 0;
  g.startBrush(1, 2); g.rub(200);
  ok(!g.sets[0], 'half a set = no bonus yet');
  g.running = true;
  g.grid[3][1] = 3; g.artAt['1,3'] = 1;
  g.startBrush(1, 3); g.rub(200);
  ok(g.sets[0] === 1, 'both stratum-1 types found → set complete');
  ok(g.wGet() === w0 + 100, 'set completion pays the ₪100 bonus');
  g.running = true;
  g.grid[4][1] = 3; g.artAt['1,4'] = 0;
  g.startBrush(1, 4); g.rub(200);
  ok(g.wGet() === w0 + 100, 'no double bonus for the same set');
  ok(g.museum['bamba'] === 2, 'duplicate finds still count up in the museum');
}

/* ---------- 12. hazards: pipe burst & scorpion ---------- */
console.log('--- 12. hazards ---');
{
  const { g } = load();
  g.reset(false); g.running = true;
  g.grid[1][3] = 5; g.G.coffee = 80;
  for (const [c, r] of [[2, 1], [4, 1], [3, 2]]) if (g.grid[r] && g.grid[r][c] === 5) g.grid[r][c] = 1;  // exactly one pipe
  g.dig(0, 1);
  ok(approx(g.G.coffee, 80 - 2 - 25), 'digging a pipe bursts it: -25% max coffee (=' + g.G.coffee + ')');
  ok(g.grid[1][3] === 0 && g.P.r === 1, 'burst pipe clears, player moves in');
  g.grid[2][2] = 5; g.grid[2][3] = 1; delete g.artAt['3,2']; delete g.artAt['2,2'];
  // exactly ONE pipe may neighbor the target, or the delta double-counts
  if (g.grid[2][4] === 5) g.grid[2][4] = 1;
  if (g.grid[3] && g.grid[3][3] === 5) g.grid[3][3] = 1;
  const c2 = g.G.coffee;
  g.dig(0, 1);
  ok(approx(c2 - g.G.coffee, 2 + 25), 'digging ADJACENT to a pipe bursts it too');
  g.G.coffee = 10; g.grid[3][2] = 5; g.grid[3][3] = 1; delete g.artAt['3,3']; delete g.artAt['2,3'];
  g.dig(0, 1);
  ok(!g.running, 'pipe burst can end the run via coffee');
}
{
  const { g, els } = load();
  g.reset(false); g.running = true;
  g.ensureRows(30); g.scorps.length = 0;
  // solid ceiling: emptying row 20 must not unsupport generated rocks above,
  // or a falling block crushes the player and the death cause reads wrong
  g.grid[18] = [1, 1, 1, 1, 1, 1, 1]; g.grid[19] = [1, 1, 1, 1, 1, 1, 1];
  g.grid[20] = [1, 0, 0, 0, 1, 1, 1]; g.grid[21] = [1, 1, 1, 1, 1, 1, 1];
  g.scorps.push({ r: 20, x: 3.5, dir: -1, alive: true });
  g.P.c = 1; g.P.r = 20;
  for (let i = 0; i < 300 && g.running; i++) g.update(1 / 60);
  ok(!g.running && els['ovTtl'].textContent === g.T().overSting, 'scorpion contact = stung');
}
{
  const { g } = load();
  g.reset(false); g.running = true;
  g.P.c = 6; g.P.r = 0;
  g.ensureRows(30); g.scorps.length = 0;
  g.grid[18] = [1, 1, 2, 1, 1, 1, 1]; g.grid[19] = [1, 1, 0, 1, 1, 1, 1]; g.grid[20] = [1, 1, 1, 1, 1, 1, 1];
  delete g.artAt['2,18'];
  g.scorps.push({ r: 19, x: 2.5, dir: 1, alive: true });
  const s0 = g.G.shekels;
  for (let i = 0; i < 600; i++) { g.gravityScan(1 / 60); g.updateFalls(1 / 60); }
  ok(!g.scorps[0].alive && g.G.shekels === s0 + 10, 'dropping a rock on the scorpion = pest control +₪10');
}

/* ---------- 13. smoke: long idle run survives & ends honestly ---------- */
console.log('--- 13. smoke ---');
{
  const { g } = load();
  g.start(false);
  ok(g.running === true, 'start() runs');
  let err = null;
  try { for (let i = 0; i < 7200 && g.running; i++) { g.update(1 / 60); g.draw(); } } catch (e) { err = e; }
  ok(!err, 'no exception across up to 7200 frames (got: ' + (err && err.message) + ')');
  ok(!g.running, 'idle run ends by coffee within 120s');
  ok(g.falls.length < 50 && Object.keys(g.tele).length < 200, 'gravity bookkeeping stays bounded');
}
{ // stratum boundaries & values sanity
  const { g } = load();
  ok(g.STRATA.length === 6 && g.VAL.length === 6, '6 strata, 6 price bands');
  ok(g.STRATA.every(s => s.arts.length >= 2 && s.arts.every(a => a.fen && a.fhe && a.he)), 'every artifact has EN+HE name and fact');
  const ids = g.STRATA.flatMap(s => s.arts.map(a => a.id));
  ok(new Set(ids).size === ids.length, 'artifact ids unique (museum keys safe)');
  g.reset(false);
  g.P.r = 15; g.G.stratum = 0; g.G.depth = 14; g.setDepth();
  ok(g.G.stratum === 1, 'crossing 15m enters stratum 2');
}

console.log('\nRESULT: ' + pass + ' passed, ' + fail + ' failed');
process.exit(fail ? 1 : 0);
