# 🤝 MIKLAT SOCIAL — architecture (night draft, 2026-06-12)

**Zorba's brief:** companion mode, VS mode, global scoreboard (opt-in),
offline-first with optional sync — and maybe a new game where social is the
core, not a feature.

**Design law (non-negotiable):** no accounts, no logins, offline never breaks,
static hosting stays. Social is a LAYER you opt into, not a wall you hit.

---

## 0 · Identity: the "Shem" (שם)
A local identity, created in one tap, stored on-device:
`miklat.shem = {id: <random>, name: "Zorba", emoji: "🦁", optIn: false}`
- No email, no password, no server until the player *chooses* to appear on a
  board. Name + emoji is the whole identity. Cross-game (portal-level, like
  the Wallet).

## 1 · VS MODE — three rungs, each one ships independently

### Rung 1: URL-DUELS (zero backend — ship first) ⭐
The challenge links (`?beat=`) already carry a number. Upgrade: carry the
whole *run*.
- Daily modes are seed-deterministic → a duel is just **same seed + compared
  results**. Encode `{seed, score, sirens, name, emoji}` base64 in the link.
- Receiver's device plays the SAME gauntlet, compares locally, renders a
  result card (👑 winner, margins, taunt line) — **the URL is the database.**
- Works in WhatsApp perfectly, works offline after load, costs ₪0 forever.
- Rematch = new link back. A duel thread in a group chat IS the game loop.

### Rung 2: GHOST RACING (async, feels live)
Record **position snapshots every N ticks** (not input replays — JS float
math isn't bit-exact across engines, so re-simulation desyncs; snapshots
make determinism irrelevant). A 60s run is still ~1-2KB compressed.
- Race your friend's translucent ghost in real time on your screen.
- Small ghosts fit IN the URL; longer ones go through the board worker (blob).
- This is Mario Kart ghosts for the shuk — async that *feels* synchronous,
  with none of WebRTC's pain.
- Duel etiquette from the genre: **36h to answer a duel or it forfeits**
  (Trivia Crack's dead-game killer).

### Rung 3: LIVE VS (phase-gated, only after rungs 1-2 prove demand)
WebRTC DataChannel, P2P position streaming, opponent rendered as ghost.
Signaling via the same worker (or QR exchange for same-room play).
Gate: ≥500 duels/week through rungs 1-2. Don't build live for an audience
that hasn't proven async.

## 2 · GLOBAL SCOREBOARD — "HaLuach" (הלוח)
One Cloudflare Worker + KV/D1 (free tier; validate limits vs research).
- `POST /score {game, mode, score, shem, day}` · `GET /board/{game}/{day|all}`
- **Opt-in only:** the board button asks once, sets `shem.optIn`.
- **Offline sync queue:** scores earned offline go to `miklat.pending[]`,
  flushed on `online`/next load, idempotent by `(shem.id, game, day)` —
  this is Zorba's "sync for those who want."
- Anti-cheat = casual-grade: server sanity bounds per game (max plausible
  score/duration), percentile display ("top 8% today") instead of raw rank
  #1 fixation, shadow-lane for absurd scores.
- Boards that fit the tribe: **today's daily** (everyone ran the same
  gauntlet — the fairest, most Wordle-like board), all-time, and
  **per-community boards** (a board per group code — see Companion).
- Client ships DORMANT behind `BOARD_URL=''` (same pattern as TIP_URL).
- **Validated infra math (research 2026-06-12):** KV free = 1,000 writes/day
  → fine at launch (best-only writes), migrate to D1 (100K/day free) at
  ~500 daily submitters; full scale = Workers Paid **$5/mo total**. Cloudflare
  has Tel Aviv + Haifa PoPs (<50ms for IL players). Background Sync API never
  shipped on iOS → the outbox queue IS the sync (flush on load + online +
  visibilitychange, single-flight, remove on 2xx only).
- **Portal builds use the portal's own boards** (CrazyGames SDK ships a
  leaderboard with bounds + cooldowns + opaque acceptance); HaLuach serves
  miklatgames.fun.

## 3 · COMPANION MODE — three shapes, cheapest first

### A. CHAVRUTA STREAK (the killer feature, async) ⭐
Two people bind as chavruta (one link tap). The shared streak only survives
if **BOTH** do today's daily.
- **Evidence (hard numbers):** Duolingo's Friend Streak drives **+22% daily
  completion** and ~⅓ of DAU use it; Snapchat-streak research shows the
  engine is loss aversion + mutual obligation — "we both lose it."
- Deeply tribe-coded: chavruta is literally the Jewish institution of
  paired practice. Copy writes itself: "Don't break the chavruta."
- Needs only the board worker (tiny shared-streak record) or even URL-ping
  v0 (daily result links double as streak proof in the chat).

### B. BAYIT (household) WALLET — co-op economy
The Miklat Wallet (shared ₪ across games) gets a group code: everyone in
the bayit feeds one fund; group milestones unlock cosmetics/themes for all.
Co-op without synchronous play — savta contributes from her phone.

### C. COUCH CO-OP (zero infra, one phone/screen)
- Iron Dome: split-sky two-thumb co-op — left half / right half, shared
  city. Already viable on tablets/desktop.
- MOTZASH TOURNAMENT mode (portal feature): hot-seat bracket for N players
  passing one phone, bracket card to share after. Family gatherings = the
  exact moment this tribe plays together.

## 4 · THE NEW GAME — where social IS the game
The arcade's coming-soon door **BALAGAN 🌀** becomes the social flagship:
**a daily Israeli-culture duel built for the group chat** (full design:
`balagan/WORLD.md`). Trivia-duel precedent: Trivia Crack hit #1 in 19
countries on cultural flavor; Wordle proved the shared-daily ritual; both
mechanics are URL-duel-native (zero backend). Solo plays offline; duels ride
rung 1; boards ride HaLuach.

## 5 · Build order (factory stages apply per item)
| Phase | Item | Infra | Effort |
|---|---|---|---|
| P0 | URL-duels on MD daily + SS | none | 1-2 days |
| P0 | HaLuach worker + dormant client (daily board first) | 1 worker | 2 days |
| P1 | Chavruta streak | worker | 1 day |
| P1 | BALAGAN v1 (daily + URL-duel) | none | 3-4 days |
| P1 | Motzash tournament (portal) | none | 1 day |
| P2 | Ghost racing (MD, SS) | worker blob | 2-3 days |
| P2 | Bayit wallet groups | worker | 1-2 days |
| P3 | Live VS (WebRTC) | signaling | gated |

**Zorba gates:** Cloudflare account (free) when HaLuach ships; naming
approvals (Shem/HaLuach/Chavruta/Bayit/Motzash); BALAGAN concept sign-off.
