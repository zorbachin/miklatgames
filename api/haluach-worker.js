/* HaLuach (הלוח) — the Miklat global board. One Cloudflare Worker, KV-backed.
 *
 * Deploy (free tier): wrangler deploy api/haluach-worker.js
 *   + KV namespace binding: BOARD
 * Client stays dormant until BOARD_URL is set in the games (TIP_URL pattern).
 *
 * Design law: opt-in only, no accounts, casual-grade anti-cheat (sanity
 * bounds + percentile framing), idempotent by (shemId, game, mode, day) so
 * the offline sync queue can flush blindly.
 *
 * SCALE NOTE (validated 2026-06-12): KV free tier = 1,000 writes/day — fine
 * at launch since only personal-best improvements write; migrate storage to
 * D1 (100K rows/day free) at ~500 daily submitters; Workers Paid ($5/mo,
 * 10M req) covers everything beyond. Tel Aviv/Haifa PoPs serve IL <50ms.
 *
 * API:
 *   POST /score  {game, mode, day, score, meta, shem:{id,name,emoji}}
 *   GET  /board/{game}/{mode}/{day}   -> top 50 + count   (day: YYYY-MM-DD | all)
 *   GET  /rank/{game}/{mode}/{day}?score=N -> {pct, count} (percentile, no write)
 *   POST /chavruta {pairId, shemId, day}   -> {streak}     (both ping a day = streak)
 */

const GAMES = {
  // per-game sanity bounds: [maxScore, maxPerDayWrites]
  irondome:    [1e6, 40],
  mamaddash:   [500, 40],   // sirens survived
  shukshopper: [500, 40],   // baskets
  balagan:     [200, 40],
};
const NAME_RE = /^[\p{L}\p{N} _.\-]{1,16}$/u;

const J = (o, s = 200) => new Response(JSON.stringify(o), {
  status: s,
  headers: {
    'content-type': 'application/json',
    'access-control-allow-origin': '*',            // public read API; origin-lock later if abused
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type',
  },
});

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return J({});
    const url = new URL(req.url);
    const p = url.pathname.split('/').filter(Boolean);

    try {
      if (req.method === 'POST' && p[0] === 'score')    return postScore(req, env);
      if (req.method === 'GET'  && p[0] === 'board')    return getBoard(env, p[1], p[2], p[3]);
      if (req.method === 'GET'  && p[0] === 'rank')     return getRank(env, p[1], p[2], p[3], +url.searchParams.get('score'));
      if (req.method === 'POST' && p[0] === 'chavruta') return chavruta(req, env);
      return J({ err: 'not found' }, 404);
    } catch (e) {
      return J({ err: 'bad request' }, 400);
    }
  },
};

async function postScore(req, env) {
  const b = await req.json();
  const cfg = GAMES[b.game];
  const day = String(b.day || '').slice(0, 10);
  if (!cfg) return J({ err: 'unknown game' }, 400);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return J({ err: 'bad day' }, 400);
  const score = Math.floor(+b.score);
  if (!(score > 0) || score > cfg[0]) return J({ err: 'implausible' }, 422);   // shadow-lane
  const shem = b.shem || {};
  if (!NAME_RE.test(shem.name || '')) return J({ err: 'bad name' }, 400);
  if (!/^[a-f0-9-]{8,40}$/i.test(shem.id || '')) return J({ err: 'bad id' }, 400);

  const mode = b.mode === 'daily' ? 'daily' : 'free';
  const key = `s:${b.game}:${mode}:${day}:${shem.id}`;            // idempotent: one row per shem/day
  const prev = await env.BOARD.get(key, 'json');
  if (prev && prev.score >= score) return J({ ok: true, kept: prev.score });   // only improvements write
  await env.BOARD.put(key, JSON.stringify({
    score, name: shem.name, emoji: (shem.emoji || '🎮').slice(0, 8), t: Date.now(),
  }), { expirationTtl: mode === 'daily' ? 60 * 86400 : undefined });
  return J({ ok: true });
}

async function listDay(env, game, mode, day) {
  const rows = [];
  let cursor;
  do {                                                            // daily boards stay small; cap pages defensively
    const r = await env.BOARD.list({ prefix: `s:${game}:${mode}:${day}:`, cursor });
    for (const k of r.keys) {
      const v = await env.BOARD.get(k.name, 'json');
      if (v) rows.push(v);
    }
    cursor = r.list_complete ? null : r.cursor;
  } while (cursor && rows.length < 2000);
  return rows.sort((a, b) => b.score - a.score);
}

async function getBoard(env, game, mode, day) {
  if (!GAMES[game]) return J({ err: 'unknown game' }, 400);
  const rows = await listDay(env, game, mode, day);
  return J({ count: rows.length, top: rows.slice(0, 50) });
}

async function getRank(env, game, mode, day, score) {
  const rows = await listDay(env, game, mode, day);
  const better = rows.filter(r => r.score > score).length;
  const pct = rows.length ? Math.max(1, Math.round(100 * (1 - better / rows.length))) : 100;
  return J({ pct, count: rows.length });                          // "top X% today" framing
}

async function chavruta(req, env) {
  const b = await req.json();
  if (!/^[a-f0-9-]{8,40}$/i.test(b.pairId || '')) return J({ err: 'bad pair' }, 400);
  const day = String(b.day || '').slice(0, 10);
  const key = `c:${b.pairId}`;
  const c = (await env.BOARD.get(key, 'json')) || { streak: 0, last: '', pings: {} };
  c.pings[day] = c.pings[day] || {};
  c.pings[day][b.shemId] = 1;
  if (Object.keys(c.pings[day]).length >= 2 && c.last !== day) {  // both showed up today
    const y = new Date(new Date(day) - 86400000).toISOString().slice(0, 10);
    c.streak = c.last === y ? c.streak + 1 : 1;
    c.last = day;
  }
  for (const d of Object.keys(c.pings)) if (d < new Date(Date.now() - 3 * 86400000).toISOString().slice(0, 10)) delete c.pings[d];
  await env.BOARD.put(key, JSON.stringify(c));
  return J({ streak: c.streak, today: c.last === day });
}
