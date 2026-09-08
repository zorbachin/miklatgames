const { g, els, store } = require('./harness.js');
let pass = 0, fail = 0;
const ok = (c, n) => { if (c) { pass++; console.log('  PASS', n); } else { fail++; console.log('  FAIL', n); } };
const DT = 1 / 60;
/* step a mission with an optional per-frame bot; returns when it ends or maxS elapsed */
function run(id, bot, maxS = 90) {
  g.startMission(id); const M = g.CUR; let t = 0;
  while (!M.ended && t < maxS) { if (bot) bot(M, t); if (M.ended) break; M.t += DT; M.def.update(M, DT); g.updateParts(DT); M.def.draw(M); t += DT; flushTimeouts(); }
  flushTimeouts(); return M;
}
const keysOf = o => Object.keys(o).sort().join(',');

console.log('--- 1. boot & dictionaries ---');
ok(g.ORDER.every(id => g.MISSIONS[id]), 'every ORDER id has a mission');
ok(g.ORDER.every(id => g.I18N.en.m[id] && g.I18N.he.m[id]), 'every mission has EN+HE copy');
ok(keysOf(g.I18N.en.m) === keysOf(g.I18N.he.m) && keysOf(g.I18N.en.hints) === keysOf(g.I18N.he.hints), 'EN/HE mission + hint keys match');
ok(keysOf(g.I18N.en.toasts) === keysOf(g.I18N.he.toasts), 'EN/HE toast keys match');
ok(g.ORDER.every(id => g.WORDS[id] && g.WORDS[id].length === 3), '3 Hebrew words per mission');
ok(g.CHAPTERS.flatMap(c => c.m).join() === g.ORDER.join(), 'chapters cover ORDER in order');
ok(g.I18N.en.q.length === 5 && g.I18N.he.q.length === 5 && g.I18N.en.q.every(q => q.a.length === 3), 'interview: 5 questions × 3 answers, both langs');

console.log('--- 2. runner (docs): perfect bot wins with all docs, no input fails cleanly ---');
function runnerBot(M) {
  const band = e => e.z > .5 && e.z < 1.03;
  const hazard = l => M.ents.some(e => e.lane === l && band(e) && (e.type === 'block' || e.type === 'low'));
  const want = l => M.ents.some(e => e.lane === l && band(e) && (e.type === 'doc' || e.type === 'word'));
  if (hazard(M.lane) || (!want(M.lane) && [-1, 0, 1].some(l => want(l) && !hazard(l)))) {
    const pick = [-1, 0, 1].filter(l => !hazard(l) && Math.abs(l - M.lane) <= 1).sort((a, b) => (want(b) - want(a)));
    if (pick.length && pick[0] !== M.lane) M.def.swipe(M, pick[0] > M.lane ? 'right' : 'left');
  }
  const low = M.ents.find(e => e.lane === M.lane && e.type === 'low' && e.z > .84 && e.z < .92);
  if (low && M.jumpT <= 0) M.def.tap(M);
}
let M = run('docs', runnerBot);
ok(M.ended && g.lastResult.ok, 'docs: bot finished the archive (dist ' + M.dist.toFixed(1) + '/' + M.len + ')');
ok(M.got >= M.cfg.docs.length - 1, 'docs: bot collected ' + M.got + '/' + M.cfg.docs.length + ' documents');
{ g.startMission('docs'); const m3 = g.CUR; const before = m3.docQ.length; m3.ents.push({ lane: 0, z: 1.05, type: 'doc', e: { icon: '📜', k: 'x' } }); for (let i = 0; i < 6; i++) m3.def.update(m3, DT);
  ok(m3.docQ.length === before + 1 && m3.ents.every(e => e.type !== 'doc' || e.z < 1), 'docs: a missed document is re-queued (never lost)'); }
ok(g.lastResult.stars >= 2, 'docs: ≥2 stars for the bot (got ' + g.lastResult.stars + ', hits ' + M.hits + ')');
ok(g.SAVE.stars.docs >= 2 && g.SAVE.words.length >= 1, 'save: stars + words persisted');
M = run('docs', null);
ok(M.ended, 'docs: no-input run terminates (hearts ' + M.hearts + ', ok=' + g.lastResult.ok + ')');
{ g.startMission('docs'); const m2 = g.CUR; for (let i = 0; i < 400; i++) m2.def.update(m2, DT);
  const rows = {}; m2.ents.forEach(e => { rows[e.z.toFixed(3)] = rows[e.z.toFixed(3)] || []; rows[e.z.toFixed(3)].push(e); });
  const badRow = Object.values(rows).some(r => r.filter(e => e.type === 'low' || e.type === 'block').length === 3);
  ok(!badRow, 'docs: no row blocks all three lanes');
  const unfair = Object.values(rows).some(r => { const free = [-1,0,1].filter(l => !r.some(e => e.lane === l && (e.type === 'low' || e.type === 'block'))); return r.some(e => e.type === 'block' && !free.some(l => Math.abs(l - e.lane) <= 1)); });
  ok(!unfair, 'docs: no blocking obstacle two lanes from the safe lane'); }

console.log('--- 3. runner (kotel): timer + bot ---');
M = run('kotel', runnerBot);
ok(M.ended && g.lastResult.ok && M.timeLeft > 0, 'kotel: bot arrives before sunset (' + M.timeLeft.toFixed(1) + 's left)');
g.startMission('kotel'); M = g.CUR; M.timeLeft = .5; for (let i = 0; i < 60 && !M.ended; i++) M.def.update(M, DT); flushTimeouts();
ok(M.ended && !g.lastResult.ok && g.lastResult.stars === 0, 'kotel: sunset = fail, 0 stars');

console.log('--- 4. apostille ---');
M = run('apostille', (M) => { if (M.slam <= 0 && Math.abs(M.def.markerX(M)) < .03) M.def.tap(M); });
ok(M.ended && g.lastResult.ok && M.perfect === 5 && g.lastResult.stars === 3, 'apostille: 5 perfect stamps = 3★');
M = run('apostille', (M) => { if (M.slam <= 0 && Math.abs(M.def.markerX(M)) > .9) M.def.tap(M); });
ok(M.ended && !g.lastResult.ok && M.miss === 5, 'apostille: 5 smudges = fail');

console.log('--- 5. interview ---');
M = run('interview', (M) => { if (M.lock <= 0 && M.qi < 5) { const q = g.T().q[M.qi]; M.def.tap(M, g.W / 2, M.def.boxes()[M.order.indexOf(q.ok)].y + 10); } });
ok(M.ended && g.lastResult.ok && M.honest === 5 && g.lastResult.stars === 3, 'interview: 5 honest = 3★');
M = run('interview', (M) => { if (M.lock <= 0 && M.qi < 5) { const q = g.T().q[M.qi]; const i = [0, 1, 2].find(i => M.order[i] !== q.ok); M.def.tap(M, g.W / 2, M.def.boxes()[i].y + 10); } });
ok(M.ended && !g.lastResult.ok && M.strikes === 3, 'interview: 3 traps = fail');
M = run('interview', null);
ok(M.ended && !g.lastResult.ok, 'interview: silence times out to fail');

console.log('--- 6. carousel ---');
M = run('carousel', (M) => { const b = M.bags.find(b => b.mine); if (b) { const p = M.def.pos(b.a); M.def.tap(M, p.x, p.y); } });
ok(M.ended && g.lastResult.ok && M.got === M.need && M.wrong === 0, 'carousel: bot grabs only its bags (' + M.need + ')');
M = run('carousel', (M) => { const b = M.bags.find(b => !b.mine); if (b) { const p = M.def.pos(b.a); M.def.tap(M, p.x, p.y); } });
ok(M.ended && !g.lastResult.ok && M.wrong === 3, 'carousel: 3 wrong bags = security');
g.SAVE.hero = 'fam'; g.startMission('carousel'); ok(g.CUR.need === 4, 'carousel: the Cohens need 4 bags'); g.SAVE.hero = 'gap';

console.log('--- 7. surf ---');
M = run('surf', (M) => { const s = -Math.sign(M.th + M.vel * .3); g.IN.keys.ArrowLeft = s < 0; g.IN.keys.ArrowRight = s > 0; if (M.winT > 0) M.def.tap(M); });
g.IN.keys.ArrowLeft = g.IN.keys.ArrowRight = false;
ok(M.ended && g.lastResult.ok && M.wob === 0, 'surf: balance bot rides the whole set (tricks ' + M.tricks + ')');
ok(M.tricks >= 3 && g.lastResult.stars === 3, 'surf: 3 tricks reachable = 3★');
{ const q = []; M = run('surf', (M) => { q.push(-Math.sign(M.th + M.vel * .3)); const s = q.length > 9 ? q.shift() : 0; g.IN.keys.ArrowLeft = s < 0; g.IN.keys.ArrowRight = s > 0; });
  g.IN.keys.ArrowLeft = g.IN.keys.ArrowRight = false;
  ok(M.ended && g.lastResult.ok && M.wob <= 1, 'surf: 150ms-reaction human-ish bot still survives (wobbles ' + M.wob + ')'); }
M = run('surf', null);
ok(M.ended && !g.lastResult.ok && M.wob === 3, 'surf: hands off = wipeout');

console.log('--- 8. volleyball ---');
M = run('volley', (M) => { if (M.phase === 'in' && Math.abs(M.bt - M.dur) < .02) M.def.tap(M); });
ok(M.ended && g.lastResult.ok && M.rally === 12 && M.miss === 0, 'volley: on-time bot rallies to 12 = 3★ (' + g.lastResult.stars + ')');
M = run('volley', null);
ok(M.ended && !g.lastResult.ok && M.miss === 3, 'volley: no taps = 3 misses = fail');

console.log('--- 9. matkot ---');
M = run('matkot', (M) => { M.def.move(M, M.bx + (M.vx * .12)); }, 120);
ok(M.ended && g.lastResult.ok && M.rally >= 30, 'matkot: shadow-tracking bot survives 30 (misses ' + M.miss + ')');
ok(M.slipperHit, 'matkot: slipper serve appeared and was returned');
M = run('matkot', (M) => { M.def.move(M, 0); }, 120);
ok(M.ended && !g.lastResult.ok && M.miss === 3, 'matkot: paddle parked = fail');

console.log('--- 10. shuk ---');
M = run('shuk', (M) => { const need = M.list.filter(l => !l.got).map(l => l.n);
  let it = M.items.find(i => i.n && need.includes(i.n) && i.red > 0 && i.x > 20 && i.x < g.W - 20);
  if (!it && M.timeLeft < 18) it = M.items.find(i => i.n && need.includes(i.n) && i.x > 20 && i.x < g.W - 20);
  if (it) M.def.tap(M, it.x, M.def.rowY(it.row)); });
ok(M.ended && g.lastResult.ok, 'shuk: list bot finishes before the siren (₪' + M.money + ' left, haggled ' + M.haggled + ')');
ok(M.money >= 0 && g.lastResult.stars >= 2, 'shuk: budget respected, ≥2★ (' + g.lastResult.stars + ')');
M = run('shuk', null);
ok(M.ended && !g.lastResult.ok, 'shuk: doing nothing = siren = fail');
M = run('shuk', (M) => { const d = M.items.find(i => !i.n); if (d) M.def.tap(M, d.x, M.def.rowY(d.row)); });
ok(M.ended && !g.lastResult.ok && M.money < 150, 'shuk: buying decoys drains the wallet to a fail');

console.log('--- 11. tefillin ---');
M = run('tefillin', (M) => { if (M.lead <= 0 && !M.tapped && M.t - M.lastBeatAt < .03) M.def.tap(M); });
ok(M.ended && g.lastResult.ok && M.count === 10 && M.misses === 0 && g.lastResult.stars === 3, 'tefillin: on-beat bot = 10 wraps, 3★');
M = run('tefillin', (M) => { if (M.lead <= 0 && M.t - M.lastBeatAt > .3 && M.t - M.lastBeatAt < .32) M.def.tap(M); });
ok(M.ended && !g.lastResult.ok && M.misses === 4, 'tefillin: off-beat taps = fail');

console.log('--- 12. progression, unlocks, share, beat ---');
g.SAVE.stars = {}; ok(!g.chapterUnlocked(g.CHAPTERS[1]) && g.chapterUnlocked(g.CHAPTERS[0]), 'fresh save: only prologue open');
g.SAVE.stars = { docs: 3 }; ok(g.chapterUnlocked(g.CHAPTERS[1]) && !g.chapterUnlocked(g.CHAPTERS[2]), '3★ opens arrival, not Tel Aviv');
g.SAVE.stars = { docs: 3, apostille: 2, interview: 1 }; ok(g.chapterUnlocked(g.CHAPTERS[2]), '6★ opens Tel Aviv');
ok(g.nextMissionId('interview') === 'carousel' && g.nextMissionId('carousel') === 'surf' && g.nextMissionId('matkot') === null, 'nextMissionId respects locks');
g.SAVE.stars = { docs: 3, apostille: 3, interview: 3, carousel: 3 }; ok(!g.chapterUnlocked(g.CHAPTERS[3]), 'all-prologue 12★ does not open Jerusalem (need ' + g.CHAPTERS[3].need + ')');
g.SAVE.stars = { docs: 3, apostille: 3, interview: 3, carousel: 3, surf: 3 }; ok(g.chapterUnlocked(g.CHAPTERS[3]), '15★ opens Jerusalem');
const grid = g.shareGrid(); ok(/🧳★★★/.test(grid) && /🕍☆☆☆/.test(grid), 'share grid is spoiler-free per chapter: ' + grid);
ok(g.T().shareTxt('Noa', grid, 15).includes('?beat=15'), 'share text carries ?beat=');
g.save();
ok(g.beatTarget === (process.env.SEARCH ? 7 : 0), 'beat param parsed: ' + g.beatTarget);
ok(JSON.parse(store.aliyah_save).stars.docs === 3, 'localStorage save round-trips');

console.log('--- 13. map layout fits the screen ---');
const bs = g.bubbles(); ok(bs.length === g.ORDER.length && bs.every(b => b.x > 20 && b.x < g.W - 20 && b.y > 0 && b.y < g.H), 'all ' + bs.length + ' bubbles inside ' + g.W + 'x' + g.H);
ok(!bs.some((a, i) => bs.some((b, j) => i !== j && Math.hypot(a.x - b.x, a.y - b.y) < 40)), 'no two bubbles overlap (≥40px apart)');
g.drawMap(1); ok(true, 'drawMap runs headless');
g.lang = 'he'; g.applyLang(); ok(document.documentElement.dir === 'rtl', 'HE sets RTL'); g.lang = 'en'; g.applyLang();

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
