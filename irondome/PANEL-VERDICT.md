# IRON DOME — 10M Advisor Panel Verdict
*Portal-submission readiness review (CrazyGames / itch.io, submission T-1 day)*
*Reviewed: index.html (2,299 LOC, v25), sw.js (irondome-v25), WORLD.md. Pure-logic smoke tests run in node (RNG determinism, save hardening, track mapping, weights, dt clamp, streak dates, share grid) — 25/25 assertions pass.*

---

## 1) STABILITY — 8/10

The code is unusually defensive for a single-file game: corrupt-save hardening (index.html:304–318), try/catch around every localStorage/audio call, dt clamped to [0.5ms, 50ms] against tab-restore jumps (index.html:1794), chain-blast cap (1237), visibility auto-pause (2236), iOS AudioContext "interrupted" recovery (2238). Smoke tests confirm daily RNG is deterministic per date, save hardening survives garbage, and weight tables sum to 1.

**Confirmed issues (node-verified where noted):**
- **Negative `unlocked` survives hardening** (verified in node). index.html:318 does `+save.unlocked || 0` but no `Math.max(0,…)`. A tampered/corrupt save with `unlocked:-3` → `gotoIntro(Math.min(-3,9))` → `LEVELS[-3]` undefined → TypeError in `newGame`/`renderBackdrop` → boot-to-play crash. One-character fix.
- **Menu music never arms at boot.** `menuMusicUpdate()` is only called from `show()`/visibilitychange/sound-toggle — none run at boot (boot block 2242–2258 calls `syncSound(); applyLang();` only). So `menuMusicWanted` is never set, and the pointerdown retry (714) never fires: first-session menu is silent until the player finishes a game and returns to the menu. Fix: call `menuMusicUpdate()` once at boot.
- **SW cache version not bumped for today's edit.** index.html modified today (tip-jar block 2275–2278) but sw.js:2 still `irondome-v25` (= GAME_VERSION). Network-first nav (sw.js:40–61) saves you online, but convention and offline-stale safety say bump to v26 before submitting.
- **Music is NOT offline despite WORLD.md:31 claiming "Full offline SW incl. music."** sw.js ASSETS (3–24) precaches zero .mp3s. Worse, audio elements fetch with Range headers → 206 responses → `cache.put` rejects (unhandled, harmless, but means music never runtime-caches either). Offline = silent game.
- **iOS: level-track has no gesture-retry.** `gotoIntro`'s auto-start (1817, setTimeout) breaks the gesture chain; `playTrack`'s `.catch(()=>{})` (678) swallows the block with no retry analogous to `menuMusicWanted`. Players who wait for auto-advance can get silent levels on iOS.
- **Per-frame DOM writes.** `update()` sets `hudWave`/`hudLevel`/`btnSling` textContent every frame (1488–1512) — only `hudScore` is change-guarded. Same-value textContent sets still dirty the DOM. Cheap fix, real jank on low-end Android.
- **shadowBlur abuse in the hot path.** Every rocket body (1679), interceptor streak (1710), boom ring (1729), and crate (1771) uses `shadowBlur` — the classic mobile-canvas killer. Eilat (42 rockets, gap .75) on a low-end device will drop frames. Consider a `lowFx` flag keyed off a frame-time probe.
- **Un-debounced `visualViewport` scroll → full resize** (589–592): every iOS pinch/URL-bar move reallocs the canvas + re-renders the backdrop. Debounce ~100ms.
- **Tip jar code: SAFE.** Single element (266, only on scrOver), referenced once at boot (2277); with `TIP_URL=''` the block is skipped entirely, element stays `hidden`. No cross-screen style assumptions; `hidden=false` + `display:block` are set together. No error path found.
- Cosmetic: comment at 662–664 says "the finale gets the hottest track" but `LEVEL_TRACKS[9] === 'level1.mp3'` (node-verified); `learnCal` (1190) can drift ±60px if players habitually lead moving targets — clamped, low risk.

State machine (pause/resume, death-during-transition via `dyingT`, intro auto-start guard `screen==='intro' && !document.hidden`, continue-revive) audited clean. No leaks found.

## 2) RETENTION — 7.5/10

**Correction to the brief: the daily mode is NOT missing.** Iron Dome has a full Daily Alert — date-seeded deterministic barrage (`mulberry32(dateSeed(todayStr()))`, 519–532, node-verified identical per date), one counted attempt/day, practice retries, streak counter with 🔥 multiplier on the menu button (2032–2035), and Wordle-style 🟩🟥 share grid (1857). WORLD.md:35's roadmap line ("port from Mamad Dash") is stale — update it.

**Strong:** Difficulty curve is layered (per-level count/gap/speed/weights at 546–555, intra-level 30% ramp, adaptive "heat" that speeds up for good players and cools after leaks — 1329–1332, 1401). Red Alert endless unlock at city 3 gives the best-score chase. Continue (unemployment-money lore) is a real coin sink with a 300₪ floor. Upgrade pacing: first upgrade (~₪120 Quick Fuse) lands after ~1 level (coinGain ≈ score×0.4), full max-out is a multi-session arc — good. D1/D7 events already instrumented (2279–2288). Session math: ~30–60s/level × retries + daily + endless comfortably clears 4 min.

**Gaps:** (a) No city map / level select — `btnPlay` jumps straight to highest unlocked (2170); the 10 hand-made city backdrops are a collection mechanic begging for a map screen ("9/10 cities defended") and it's the cheapest D7 lever here. (b) Daily streak resets silently at UTC midnight (`toISOString`) — 2–3am for Israeli players; fine, but no "streak at risk" nudge on the menu. (c) Stars are computed (1947) but never persisted — no 3-star replay chase.

## 3) VIRALITY — 7/10

All 3 share surfaces live (level end 254, game over 273 — auto-promoted to a primary CTA on new-best at 1903, a genuinely smart peak-moment trigger — and victory 284). Share payload is strong: localized brag text + Wordle grid + `?ref=share&b=<score>&c=<city>` challenge link rendering a gauntlet banner for the recipient (2248–2255), with K-factor measurable via `track('share')`/`track('challenged')` (counted on share *completion*, not click — correct). og/twitter cards present; share-card.jpg same-day fresh.

**Gaps:** og is he_IL only — no English og:title variant for international portal traffic. City-unlock share cards ("I defended Ashkelon 🛡️", WORLD.md:36) still unbuilt — that's the share moment with real identity attached. Daily share exists but isn't differentiated visually from campaign shares.

**Best trailer clip:** the **Iron Beam crate during a dense Eilat barrage** — the full-sky left-to-right sweep (1628–1641) wiping 8+ rockets with the photosafe flash, falafel bursts bouncing off the ground, gold chain-blast rings. Runner-up: the Iron Sling slow-mo volley (2124–2129), four pops marching left-to-right in 90ms drumroll with the final hit-stop. Capture at commando difficulty, level 10, HE UI for flavor.

## 4) MONETIZATION — 4/10

**Zero portal SDK integration**, and several things CrazyGames QA will flag outright:

- **External links (CrazyGames forbids outbound links):** the arcade back-link `btnArcade href="../"` (index.html:190) navigates out of the game; the WhatsApp share fallback `window.open('https://wa.me/…')` (2159); and the **tip jar** (266, `target="_blank"`) — dormant today (`TIP_URL=''`), but it MUST stay dormant (or be build-flagged off) in the portal build even after TIP_URL is set for the arcade build. GoatCounter is a pixel request, not a link — generally tolerated, but be ready to remove it if asked.
- **Hebrew-first default** (`<html lang="he" dir="rtl">`, `save.lang='he'`): the QA reviewer's first impression is an RTL Hebrew UI. Auto-detect via `navigator.language` (default EN unless `he*`) for the portal build.
- **Ad slots: the natural break points already exist and are clean** — `gotoIntro` (1815, interstitial before level), `endLevel`'s three terminal screens (1844+, interstitial on result), and the killer one: **CONTINUE (1909–1921) maps 1:1 to a rewarded ad** — the revive logic (2 buildings back + 2.5s shield grace) is already written; just gate it on `sdk.rewardedAd()` instead of/alongside wallet spend.
- Session length (>4 min avg) and pausable audio (`musicStop`/`stopTrack`) satisfy portal bars; SW/PWA bits no-op harmlessly inside an iframe (registration is `.catch(()=>{})`); localStorage is fully try/catch-wrapped so sandboxed-storage portals won't crash it.
- itch.io: no blockers at all — external links and Hebrew-first are both fine there.

---

## Ranked Top-10 Issues

| # | Sev | Issue | Where | Fix |
|---|-----|-------|-------|-----|
| 1 | **BLOCKER (CrazyGames only)** | Outbound links: arcade back-link, wa.me share fallback, tip jar | index.html:190, 2159, 266 | `PORTAL` build flag (or `?portal=1`): hide btnArcade + tipJar, swap wa.me fallback for clipboard-copy + "✓ Copied!" toast |
| 2 | **BLOCKER (CrazyGames only)** | No portal SDK: no init, no ad breaks, no rewarded continue | gotoIntro:1815, endLevel:1844, continue:1909 | Add CrazyGames SDK; `gameplayStart/Stop` on show('play')/overlays; midroll at level intro & end screens; rewarded ad as alternate CONTINUE payment |
| 3 | **HIGH (QA risk)** | Hebrew/RTL default UI for an international reviewer | index.html:2, 306, 315 | Default `save.lang` from `navigator.language` (he* → he, else en) when no save exists |
| 4 | **HIGH** | Music not in SW precache (+ 206 Range responses never cache) — WORLD.md offline claim false | sw.js:3–24, 49; WORLD.md:31 | Add 4 mp3s to ASSETS (≈5.7MB total, acceptable) and bump cache to v26; or amend WORLD.md |
| 5 | **MED** | SW cache `irondome-v25` not bumped though index.html changed today (tip-jar block) | sw.js:2 vs index.html:296 | Bump both to v26 as the submission build |
| 6 | **MED** | Menu music never plays on first session (`menuMusicUpdate` never called at boot, retry flag never armed) | index.html:2242–2258 | Add `menuMusicUpdate();` after `applyLang();` at boot |
| 7 | **MED** | Per-frame DOM writes (hudWave/hudLevel/btnSling) + shadowBlur on every entity → low-end Android jank in late levels | index.html:1488–1512, 1679, 1710, 1729 | Change-guard textContent like hudScore (1494); optional `lowFx` mode dropping shadowBlur when frame time >22ms |
| 8 | **MED** | iOS: level track has no gesture-retry after auto-advanced intro; silent levels possible | index.html:678, 1817 | Mirror the `menuMusicWanted` pattern (714–719) for `trackAudio` |
| 9 | **LOW** | Negative `unlocked` in a corrupt save crashes `newGame` via `LEVELS[-3]` (node-verified the hardening misses it) | index.html:318 | `save.unlocked = Math.max(0, Math.min(LEVELS.length - 1, +save.unlocked || 0))` |
| 10 | **LOW** | Un-debounced visualViewport scroll → canvas realloc + backdrop re-render per event on iOS pinch/URL-bar | index.html:589–592 | Debounce resize ~100ms; skip if W/H unchanged |

## VERDICT

- **itch.io: SHIP tomorrow.** No blockers. Do #5 (bump v26), #6, and #9 tonight — three one-liners — and submit. Issues 7/8/10 are post-launch patches.
- **CrazyGames: NO-SHIP as-is — but it's ~half a day from SHIP.** #1–#3 are policy/QA blockers, not redesigns: one `PORTAL` flag stripping links, one SDK include with 4 hook points (the break-point architecture already exists), one language auto-detect. Submit itch.io tomorrow, CrazyGames the day after.

## The 3 fixes that most move the 10M needle

1. **Portal build flag + CrazyGames SDK with rewarded-ad CONTINUE** (#1+#2). CrazyGames is the distribution engine toward 10M; the continue flow (revive + shield grace) is already built — wiring it to a rewarded ad converts your best emotional moment ("the city just fell") into both retention AND revenue with zero new design.
2. **English-first auto-language + EN og variant** (#3 + virality gap). Hebrew-first caps the ceiling at a few million native speakers; auto-detect costs ~5 lines and opens the other 99% of portal traffic while keeping Hebrew-first for the home arcade.
3. **City map with unlock-share cards** (retention #a + WORLD.md:36 roadmap). Turns 10 hand-made backdrops into a visible collection ("7/10 cities defended"), gives a D7 reason to return, and creates the identity-laden share moment ("I defended Ashkelon 🛡️") that the current score-only shares lack.

*Stale doc note: WORLD.md:35 says daily mode is a roadmap item — it shipped (Daily Alert, streaks, deterministic seed). Update the world bible so future agents don't rebuild it.*
