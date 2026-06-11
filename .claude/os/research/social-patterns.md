# Research: social/multiplayer patterns for offline-first web games (sourced)

## Validated patterns
- **Daily seed = Wordle's whole backend.** Same-challenge-for-all from a
  date-derived seed needs zero server; the emoji result grid (player-invented,
  then built-in) made shares spoiler-safe and comparable. 1.2M grids tweeted
  Jan 1–13 2022.
- **URL-as-transport duels:** seed + result/trace in a `#fragment` (fragments
  never hit the server) = async 1v1 with no backend; WhatsApp message = the
  "your turn" push. Words With Friends ran on turn-blobs + push; Trivia Crack
  used a **36-hour forfeit deadline** to kill dead games (copy this).
- **Ghosts:** Mario Kart RKG = input replay through a deterministic engine;
  Trackmania = fixed 100Hz timestep. ⚠️ JS pitfall: `Math` trig isn't
  bit-exact across engines → for web, **record position snapshots every N
  ticks instead of inputs** — determinism stops mattering, files stay tiny.
- **Duo streaks have hard numbers:** Duolingo Friend Streak (Feb 2025):
  **+22% daily-lesson completion** with ≥1 friend streak; ~⅓ of DAU use it.
  Snapchat-streak research: the engine is loss aversion + mutual obligation
  ("we both lose it"). Chavruta mode is evidence-backed.
- **Anti-cheat (casual-grade, CrazyGames' own design):** server sanity
  bounds + cooldowns + **opaque acceptance** (always return ok, drop
  server-side) + percentile framing so a hacked #1 can't poison the UX.
  CrazyGames SDK ships its OWN leaderboard (min/max bounds, cooldowns) —
  portal builds should use theirs; HaLuach is for our domain.

## Free-tier reality (the corrections)
- **Cloudflare KV: only 1,000 writes/day free** — fine for launch (<1K
  opted-in score-improvements/day), then migrate to **D1 (100K rows/day
  free)**. Workers cap: 100K req/day → 50K DAU does NOT fit any free tier;
  the real path is **Workers Paid $5/mo** (10M req/mo). That's the entire
  scale bill.
- Cloudflare has Tel Aviv + Haifa PoPs → <50ms for Israeli players, no cold
  starts. Supabase free auto-pauses after 7 idle days; Firestore free =
  20K writes/day and functions need a card. Cloudflare wins.
- **Background Sync API: never on iOS/Firefox.** Primary sync = outbox queue
  (IndexedDB/localStorage) flushed on load + `online` + `visibilitychange`,
  single-flight flag, remove-on-2xx only. Idempotency shortcut for boards:
  server stores MAX(score) per (id, day) — duplicates harmless.

## Live VS (phase-3 cautions, all confirmed)
- ~**20% of WebRTC connections need TURN** (free TURN ~doesn't exist at
  scale) → accept 1-in-5 failures or pay relay. PeerJS public broker:
  documented unreliable; self-host signaling on a Worker/Durable Object
  (free tier OK, WebSocket hibernation = no idle billing). iOS: backgrounded
  tab silently stalls DataChannels — must reconnect on visibilitychange.
  QR/manual SDP works for same-room duels with zero infra.

Full citations in the night-shift agent report (2026-06-12 session).
