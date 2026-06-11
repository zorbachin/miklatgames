# MAMAD DASH — 10M Advisor Panel Verdict
*Portal-submission readiness review · 2026-06-11 · index.html @ 1161 LOC, sw.js v1*
*Method: full JS read (2 passes), node tests on extracted pure functions (mulberry32, waveCfg, carry-over clamp, revive budget, daily seeding order), asset/SW manifest diff, syntax check (`node --check`: PASS).*

---

## Scores

### STABILITY — 8/10
- `track()` is a hoisted function declaration inside the single inline script (index.html:544); all call sites valid: die() :424 (`evt-md-death`, `evt-md-siren-N`), resetRun :458 (`evt-md-start`/`-start-daily`), tip :555, challenged :560, share :602. The :560 top-level call executes after parse, so hoisting covers it. GoatCounter image-beacon format (`?p=/evt&e=true`) is correct; try/catch + localhost/file guard. Clean.
- `$('tipJar')` exists (index.html:113, inside #dead panel); TIP_URL block (:553-555) runs after DOM parse (script at end of body). Dormant (`TIP_URL=''`). **But the wiring has a latent touch bug — see Issue #1.**
- Pause/resume: correct. `update()` early-returns before `G.t+=dt` when paused (:630), so the deadline clock truly freezes; siren stopped on pause (:516), re-arms on resume via the `left<=3` check (:657). Music ducks to null while paused.
- Deathcam: state machine sound. `showDeathPanel` guarded by state check (:432), `deathTimer` cleared in both `startWave` (:380) and `die` (:429) — no stale-timer panel after revive.
- Revive: deadline math verified by test — `total=max(4.5, need*1.2+1)` always exceeds time-to-door at current speed; 1.5s invuln covers spawn-camping; once-per-run + 100-coin gate enforced at :531.
- Daily determinism: obstacle/coin/power streams correctly seeded per wave with independent streams (:383-387), tutorial spacing neutralized for dailies (:381), difficulty pinned to medium (:360). **One leak: the scooter — Issue #3 (proven nondeterministic by test).**
- SW staleness: **no version bump needed for index.html edits.** sw.js is network-first for navigations (3s cache race, sw.js:58-62) and runtime-`put`s every fresh OK response into `mamaddash-v1` (sw.js:50-53) — returning online players get today's build on next load. Bump the cache name only when adding precached files. (Minor: no `ignoreSearch`, so `?beat=` URLs miss cache offline and accumulate as duplicate cache entries — Issue #9.)
- iOS audio: WebAudio SFX unlock is correct (`Sound.init()` inside the gesture stack, :475). **HTMLAudio music is not — first `play()` happens in the rAF loop, outside any gesture (Issue #4).**
- Main loop is error-contained (:1154), dt-clamped, self-healing on resize. Wave math: v0 < v1 for all 40 tested waves; carry-over clamp never inverts the ramp.

Docked 2 points for: tip-jar touch bug, background-tab audio leak, scooter determinism leak, iOS music risk.

### RETENTION — 6.5/10
- Daily mode is well-engineered (seeded gauntlet, fair-for-everyone medium difficulty, per-day best in `md_daily_N`, dedicated share text) — daily #35 today, math verified.
- **But it is invisible**: the only entry is the `?daily=1` URL param (:558). No title-screen button. The synchronized-ritual asset cannot retain players who never receive a daily link.
- **Streak mechanics: confirmed MISSING** (zero matches for streak/consecutive/yesterday). No consecutive-day counter, no "next daily in Xh" countdown, no emoji result history. This is the entire Wordle retention engine and it's absent.
- Difficulty curve: solid. Speed carry (`vCarry*.86` clamped, :377) compounds tension as designed; marathon every 4th wave; wave-8 marathon is the first real spike (37.9s clean-run need vs 42s cap = 90% budget utilization — watch `evt-md-siren-7/8` falloff in the funnel).
- Revive economy: 100 shekels is well-tuned against earnings (~20+5w per wave + pickups → revive becomes affordable around wave 3-4, exactly when runs start to matter). But coins are per-run only — no persistent meta-currency, so nothing accumulates between sessions to pull players back.
- Theme rotation per wave (4 hoods) + per-hood music with resume-position reuse: good variety for a 1-file game.

### VIRALITY — 7.5/10
- `renderCard` (:567-599) logic-reviewed line by line: no errors. All referenced values (`THEME()`, `SITE`, `G.deathLine`) defined at call time; text auto-shrinks to maxW; 1080x1350 (4:5) is the right ratio for IG/WhatsApp; canvas is same-origin-clean (pure drawing, no images) so `toBlob` cannot taint-fail.
- Share chain is properly layered: file share → text share → clipboard, each guarded (:610-625). Share text is genuinely good — daily, beat-the-challenger, and default variants all include the link and a hook.
- `?beat=` loop closes correctly: inbound tracks `evt-md-challenged` (:560), title personalizes (:562), death panel renders win/tie/loss verdict with rematch framing (:449-453).
- og:image present (149KB, correct meta tags, absolute URLs).
- Docked for: in a portal iframe, `navigator.share` AND `navigator.clipboard` can both reject (cross-origin iframe permissions) — outer catch swallows everything and the button silently does nothing (Issue #7). Also share only exists on death; no daily-result emoji grid.

### MONETIZATION — 5/10
- Death panel is a clean interstitial slot: 2.3s deathcam creates a natural ad-break beat before the panel; restart is user-initiated. Revive button is a drop-in rewarded-video slot (swap the `G.coins<100` gate at :454/:531 for an ad callback). Architecture is ready; **zero SDK integrated**, so actual revenue tomorrow is 0.
- Session length supports ads: waves 25-42s, typical death wave 3-8 → 2-5 min sessions, frequent death-panel impressions.
- Tip jar: hook shipped, dormant — but activating it today would ship broken on mobile (Issue #1). Fix before ever setting TIP_URL.
- Portal QA risks on outbound links: `arcadeBack` (:90) is an external-navigation element (most portals prohibit off-site links/branding); GoatCounter (:1159 + track) is third-party analytics (Poki prohibits, CrazyGames tolerates); tip jar must stay dormant in portal builds. Needs a portal-build flag.

---

## Top-10 issues (ranked)

| # | Sev | Where | Issue → Fix |
|---|-----|-------|-------------|
| 1 | HIGH | index.html:486, :498 (+ :113) | Input guards only exempt `closest('button')`. The tip-jar `<a>` gets `preventDefault()` (click never fires on touch) AND `primary()` runs → **tapping the tip jar restarts the game instead of opening the link**. arcadeBack got an explicit stopPropagation guard (:506-508); tipJar didn't. Fix: change both guards to `e.target.closest('button,a')` — one-line, covers all future anchors. Dormant only because TIP_URL=''. |
| 2 | HIGH (portal QA) | no handler exists; Sound.sirenStart :160, Music :197 | No `visibilitychange`/blur handling. rAF stops when tab hides, but the HTMLAudio music and — worse — the looping WebAudio **siren oscillator keep playing in a hidden tab** (siren is live if hidden during the final 3s). Audio-on-blur is a standard portal QA check. Fix: on `document.hidden` → `Sound.sirenStop()`, pause all Music tracks, and auto-pause a running game. ~6 lines. |
| 3 | MED-HIGH | index.html:379 vs :383 | Daily determinism leak: `G.nextScoot=c.goal*wrandC(.3,.62)` draws **before** `WRc` is reseeded for the wave → wave-1 scooter uses unseeded `Math.random` (test-proven: 1294 vs 1021 on same daily) and later waves consume the prior wave's stream. Breaks "exact same gauntlet for everyone." Fix: move that one line below the seeding block. |
| 4 | MED-HIGH | index.html:197-212, :475 | iOS music: first `play()` of each track happens inside the rAF loop, outside the gesture stack — iOS Safari blocks first-play per element → **soundtrack likely silent on iOS** (rejections swallowed by `.catch`). Fix: in `primary()`'s title branch, synchronously call `Music.update()` or run the classic unlock (`play().then(a=>a.pause())`) over all tracks inside the touchstart stack. |
| 5 | MED | index.html:558 (only entry) | Daily mode has no UI entry — reachable only via `?daily=1`. Fix: add a "DAILY #N" button on the title panel (with today's best if played). |
| 6 | MED | absent (grep: 0 matches) | No streak mechanic. Fix: `md_streak={last,count}` updated on daily completion; show "X-day streak" on death panel and prepend to daily share text; add "next daily in Xh" countdown. |
| 7 | MED | index.html:601-626 | In portal iframes both `navigator.share` and `clipboard.writeText` can reject → outer catch swallows → share button silently no-ops. Fix: on final failure, show the text in a `prompt()`/selectable field and flash "COPY THIS" on the button. |
| 8 | LOW-MED | index.html:90, :544, :1159 | Portal outbound-link/analytics policy: arcadeBack link, GoatCounter beacon, tip jar. Fix: a `PORTAL=1` build flag (or query param) that hides arcadeBack and short-circuits `track()`. |
| 9 | LOW | sw.js:47, :52 | No `ignoreSearch`: challenge/daily URLs (`?beat=…`) miss the cached `./` offline, and every unique share-link query gets `put` as a new cache entry (unbounded growth). Fix: `caches.match(e.request,{ignoreSearch:true})` for navigations; skip `put` for querystring navigations. |
| 10 | LOW | sw.js:3-27 | Music files absent from SW ASSETS → offline runs are silent (degrades gracefully); `savta-judge.png` and `hero.webp` precached but unused by the game. Also: wave-8 marathon is the tightest budget in the curve (90% utilization) — intended spike, but watch the siren-7→8 funnel. |

---

## VERDICT: **SHIP** (conditional — 3 fixes tonight, ~30 min total)

The core game is portal-grade: error-contained loop, verified-sane difficulty math, deterministic daily seeding (one leak), graceful art/audio fallbacks, correct SW update path (no version bump needed for these edits), working analytics funnel, and a genuinely strong share loop. Nothing here is a no-ship defect **except** that Issue #2 (background audio) is the single likeliest portal-QA rejection, and Issues #1/#3 are one-line fixes you will regret not making before the build freezes:

1. **Must (pre-submission):** Issue #2 — visibilitychange audio stop. The hidden-tab siren wail is exactly what QA testers find.
2. **Must (one line each):** Issue #1 (`closest('button,a')`) and Issue #3 (move `nextScoot` below the reseed).
3. **Should:** Issue #8 portal flag if the target portal prohibits external links (check the specific portal's policy; CrazyGames is tolerant, Poki is not).

Everything else ships as-is tomorrow.

## Top-3 needle-movers (post-submission week)

1. **Make the daily visible and sticky** (Issues #5+#6): title-screen DAILY button + streak counter + streak in share text + next-daily countdown. The synchronized-ritual asset is already built and currently has zero organic entry path — this is the highest retention-per-line-of-code available.
2. **Wire the rewarded-revive ad slot** (Issue from Monetization): the death panel + 100-shekel revive is a proven, already-tuned rewarded-video moment; integrating the portal's SDK there converts the game's best emotional beat (died 40m from the door) into revenue with no design changes.
3. **Bulletproof the share loop inside iframes** (Issue #7): share is the only growth channel, and the portal iframe — where most players will be — is precisely where it can silently fail today. A visible-text fallback guarantees the `?beat=` loop survives embedding.
