# 🏭 GAME FACTORY — the Miklat pipeline (plan of record)

Every game moves through the same 7 stages. The per-game **PM agent** owns
stages 1–5 and runs the **10M advisor panel** reviews; the **Commercialization
CEO** (`mg-ceo`) owns stages 6–7. Nothing ships to the shelf without the
stage-gate checklist below. This file is the reusable playbook extracted from
how Iron Dome, Mamad Dash, and Shuk Shopper were actually built.

## The 7 stages

### 1 · CONCEPT — design doc before code
- `.claude/os/games/<GAME>.md` — research (what proven game is this adapted
  from?), the cultural hook, scope of v1, deferred roadmap.
- `<game>/WORLD.md` — universe bible: setting, characters, districts/levels,
  art direction, character bible for sprites.
- **Gate:** Zorba approves the one-line pitch + cultural hook.

### 2 · BUILD — the single-file pattern
House invariants (copy from Shuk Shopper, the cleanest reference):
- One `index.html`, inline CSS/JS, canvas, no build step. 300–2,300 LOC.
- i18n EN/HE dict at top of file, RTL toggle, `?lang=` param + localStorage.
- `manifest.webmanifest` + scoped service worker (`<game>-v1` cache;
  portal SW never touches game scopes).
- Arcade back-link. Mobile-first input (swipe + keys).

### 3 · LOGIC PASS — headless + advisor review
- 60s headless sim of the core loop (spawn/cull, scoring, difficulty curve)
  before any polish — pattern from SHUK-SHOPPER.md.
- **10M advisor panel review** (PM convenes, multi-agent): virality advisor
  (share moments?), retention advisor (why return tomorrow?), stability
  advisor (perf, input edge cases), monetization advisor (where do revenue
  hooks live?). Written verdicts; fixes before art.
- **Gate:** panel sign-off recorded in the game's design doc.

### 4 · ART — spec first, generate when justified
- `assets/prompts.json` — gameplay pack (backdrops, player, chasers) with
  character bible inlined. Sprites on flat magenta `#ff00ff`; game code uses
  the ART loader + `keyMagenta()` chroma-key with emoji fallback (never let
  art block shipping).
- `press/prompts.json` — promo pack (key art 16:9, icon 1:1, poster 9:16,
  itch cover 4:3, no-text banner).
- Generate both: `bin/imagepack <game>` and `bin/imagepack <game>/assets`
  (free Gemini key).

### 5 · INSTRUMENT & WIRE — the funnel must see
- GoatCounter custom events, same names every game:
  `evt-<g>-start`, `evt-<g>-death`, `evt-<g>-share`, `evt-<g>-challenged`,
  plus one progression event (`evt-<g>-level-N` / `-shuk-N`).
- Share/challenge loop: score-bearing share text + `?beat=`/`?ref=share`
  challenge links (all three live games have this — keep it).
- Per-game og meta tags (`og:title/description/image` + twitter card) so
  shared links carry the game's identity, not the portal's.
- Tip-jar hook on game-over screen (hidden until `TIP_URL` is set).
- **Gate:** events visible in GoatCounter from a test run.

### 6 · MARKETING — CEO takes the wheel
- Generate press pack; pick the launch clip moment (the panel's "share
  moment" from stage 3).
- Portal submissions: itch.io → CrazyGames → Poki (per MONETIZATION.md).
- Launch posts: WhatsApp-first (Israel), then TikTok/Reels clip, diaspora
  press pitch. Holiday-calendar tie-in if one is near.
- **Gate:** published = done. Drafted ≠ done.

### 7 · SHIP & WATCH
- Merge to main → live on miklatgames.fun + arcade shelf card + portal SW
  `ASSETS` bump.
- Watch `evt-*` funnel for 7 days; PM reports D1 return + share rate to
  standup; revenue switches flip per MONETIZATION.md KPI gates.

## Current coverage (audit 2026-06-11, full detail in PR #4 discussion)

| Stage | Iron Dome | Mamad Dash | Shuk Shopper |
|---|---|---|---|
| 1 Concept docs | ⚠️ lore in code only | ⚠️ lore in code only | ✅ |
| 2 Build invariants | ✅ | ✅ | ✅ |
| 3 Logic pass | ✅ (de facto) | ✅ (de facto) | ✅ |
| 4 Art: gameplay / press spec | ✅ hand-made / ❌ | ✅ hand-made / ❌ | spec'd, ungenerated / ✅ |
| 5 Events / og / tip hook | ✅ / ✅ / ❌ | ❌ / ❌ / ❌ | ✅ / ❌ / ❌ |
| 6 Portal submissions | ❌ | ❌ | ❌ |
| 7 Live + watched | ✅ live | ✅ live | branch |

**Backfill queue (tonight):** Mamad Dash events · og tags (MD+SS) · tip-jar
hooks (all 3 + shelf, dormant until account exists) · press specs (ID+MD) ·
WORLD.md (ID+MD) · Shuk Shopper runtime asset caching.
**Blocked on Zorba:** Buy Me a Coffee account (flips tip jars live) · Gemini
key (generates art packs) · portal submissions need final art.
**Decision needed:** Balagan + Fabatollah — spec them through stage 1 or keep
as teaser doors.
