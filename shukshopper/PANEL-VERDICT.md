# 🧺 SHUK SHOPPER — 10M Advisor Panel Verdict
*Panel date: 2026-06-11 · target: portal submission tomorrow · game audited at `shukshopper/index.html` (~590 LOC, single file)*

**Headless verification: re-run post-art-loader edits.** Full game script loaded under Node with DOM stubs; 30 assertions across boot, 7,200-frame core-loop sim, spawn invariants, collision rules, two-strike death, basket/zone progression, shuk transitions, zone-13 wrap, keyMagenta chroma math, 404-art fallback, beat-param parsing (`?beat=3`, `?beat=banana`, `?beat=-5`), and share text. **29/30 passed.** The one failure is a real (rare) bug — issue #4 below.

---

## Advisor scores

### 1. STABILITY — 8.5/10
The engineering discipline is genuinely good for 600 LOC.

**Verified safe (with evidence):**
- **ART loader / 404 path** (index.html:212–232): images only enter `ART` via `onload`; no `onerror` handler needed — a 404 simply never fires `onload`, `ART[n]` stays undefined, and every draw site (`bg` :417, player :480, vendor :493) checks truthiness before `drawImage`. **This is the live production path: `assets/` contains zero PNGs today — only `prompts.json`. The shipped game is 100% emoji-fallback.** Headless sim of the fallback draw path: clean.
- **keyMagenta taint safety** (index.html:216–222): `getImageData` is wrapped in try/catch — a tainted canvas cannot crash the loader. (Residual cosmetic risk, issue #10: on taint the catch returns the canvas *with magenta intact*, so characters would render inside magenta squares. Only reachable via `file://` openings; same-origin portal/own-domain hosting never taints.)
- **Frame containment** (index.html:542–543): the whole `update`/`draw` is try/caught per frame — a draw bug degrades, never freezes. DPR clamped to 2; iOS zero-size canvas self-heal interval (:187, mamaddash #102 lesson) present.
- **Spawn invariant:** 2,000 simulated rows — the safe lane never contained an obstacle. Collision rules verified: jump clears `low`, slide clears `high`, `block` hits even mid-jump, jumping into a hanging `high` correctly hits. No tunneling possible: max z-step/frame = 1.05×0.05 = 0.0525 < 0.08 collision window (:403).
- **Shuk/list transitions:** basket completion → +10₪ → 900ms → `advanceZone` → fresh list drawn **only from the new district's items** (verified). Carmel→Levinsky hop fires the `shukEnter` toast at the zone-5 boundary; zone 13 wraps to Carmel with a valid list (endless lap is sound). 12,000-dist fallback advance verified — nobody gets stuck.
- **Swipe input** (index.html:309–318): touchend-only with 600ms gesture cap, 24px dead zone, tap = jump. `touch-action:none` + `overscroll-behavior:none` kill scroll/pinch. Overlay buttons can't trigger phantom jumps (`running` is false when their touchend bubbles; `click` fires after). Arcade link stops propagation (:575–576).
- **SW with missing assets** (sw.js:22–42): runtime cache only stores `res.ok` same-origin responses — PNG 404s are never cached, no poisoning; navigations are network-first with a 3s cached-race, so updates propagate. `localStorage`, `navigator.share`, clipboard all try/caught — survives sandboxed portal iframes.
- **Beat param hardened:** `?beat=banana` → 0, `?beat=-5` → 0, `?beat=3` → banner + win-flag flips exactly when baskets exceed 3.

**What costs the 1.5 points:**
- **The sprite-draw paths have never rendered a real image** — they're dead code until `bin/imagepack` runs, and they contain visual landmines (issue #3): no bounding-box crop after chroma-key, fixed sprite width regardless of pose, the 1:1 slide-sprite frame.
- The confirmed 900ms restart race (issue #4).
- No `preventDefault` on arrows/Space (issue #9).

### 2. RETENTION — 4.5/10
- **No daily mode — flagged hard.** mamaddash (the sibling this game shares its DNA with) has a seeded `?daily=1` mode with deterministic spawns (mamaddash/index.html:382–383). SHUK SHOPPER's only return hook is the localStorage best line. For a portal audience there is no "come back tomorrow" reason at all.
- **District pacing is the game's best retention asset:** 13 districts across 3 real shuks, each with its own items/hazards/awning colors/vendor — "how far can I get" (see the Night Shuk, reach Mahane Yehuda) is a real pull for runs 2–10. But nothing persists: no "furthest shuk reached" record, no per-shuk best (WORLD.md roadmap #4), so the pull evaporates once seen.
- **Difficulty curve is mis-shaped at the front:** the density ramp `d=min(1,G.dist/2200)` (index.html:327) saturates in **~6 seconds** (dist accrues at ~340/s at base speed), so obstacle probability jumps 0.45→0.85 almost immediately; after that, only speed (+0.0048/s, cap 1.05 at ~2.5 min, :382) and the two-strike vendor system carry the curve. First-run players hit max density before learning slide. The two-strike system (6s vendor chase + 1.2s mercy invuln, :359) is a great forgiveness mechanic and partially masks this.
- Shekels accumulate and buy nothing (WORLD.md roadmap #6 unbuilt) — a visible currency with no sink reads as unfinished by day 2.
- **Zero audio.** Both siblings ship WebAudio synth (mamaddash: 3 hits, irondome: 2); this game is silent. Silence reads as broken on portals and kills juice on the basket-complete moment.

### 3. VIRALITY — 6.5/10
- **?beat= loop: fully working, verified end-to-end.** Inbound: banner on menu (:579), live "beat the challenge!" toast mid-run (:370), result line on death screen (:553). Outbound: share text carries baskets + shekels + `?beat=N` URL (:133). Bilingual (en/he), WhatsApp-native (`navigator.share` → clipboard fallback). This is the strongest system in the game.
- **Tribe badge: PARTIAL — fails the arcade's own standard.** The academy's Level-2 mission (academy/index.html:148) demands every share text carry "Israeli identity + miklatgames.fun." URL: yes. Identity: implicit only (shuk, ₪, vendor) — no Hebrew flourish in the EN text, no spoiler-free brag visual (Wordle-grid equivalent, e.g. `🧺✅✅✅` per basket), no shuk-title flex ("I made it to Mahane Yehuda"). The HE share is good; the EN share (the diaspora one — worth 2–3× per impression per the academy's own CPM math) is the weaker badge.
- **Share also drops state the receiver would want:** no `lang`, no shekels in the param (mamaddash sends `?beat=N&c=coins&v=2`), and crucially **not the shuk reached** — "I made it to the Night Shuk" is a better brag than a basket count.
- **og image** (:15): points at the portal-level `/og.jpg` (confirmed real, 1200×630). Acceptable placeholder for tomorrow — the unfurl works — but every game sharing one image means SHUK SHOPPER links look identical to mamaddash links in the group chat. `press/prompts.json` already specs the key art; it's a `bin/imagepack` run away.
- **Best clip moment:** 🛒 CART DASH plowing through the Night Shuk (disco ball, dancers, purple awnings) with the vendor on screen — that's the 10-second capture. Second: the vendor-chase near-miss (the 6s chase with the chaser visibly on your heels is inherently clip-able).

### 4. MONETIZATION — 2/10
- **Live revenue paths today: zero.** `TIP_URL=''` (:169) → tip jar hidden (same as both siblings — the whole arcade has an unfilled tip jar; filling one config string lights up three games). No ad SDK, no interstitial points, no rewarded hooks.
- **Natural ad-break points exist and are clean:** game-over screen (perfect interstitial slot), the 900ms basket→new-district beat (too short for an ad, fine for a banner refresh), menu. A rewarded-ad "the vendor trips — keep running" revive is an obvious fit with the existing vendor-chase mechanic and matches mamaddash's `revived` pattern.
- **Session length risk: real but acceptable.** Typical first-session runs are 60–150s (two-strike forgiveness helps); the 13-district tour gives ~5–7 min of novelty. That's portal-viable for the runner category but thin vs. CrazyGames' median.
- **Portal QA risks (blockers for CrazyGames/Poki, fine on itch):**
  1. GoatCounter third-party analytics script (:585) — Poki disallows external requests; CrazyGames flags third-party trackers.
  2. `arcadeBack` out-link (:75) and tip-jar external link (:103) — external links out of the game fail CrazyGames QA.
  3. No portal SDK (gameplay start/stop events, ad hooks) — required by both CrazyGames and Poki.
  4. No audio (not a hard fail, but QA reviewers score it).
  5. Service worker — portals host on their CDN paths; relative-scope SW registration is safe but should be disabled in portal builds (CrazyGames serves cross-origin; SW may simply fail to register — harmless, but verify).
- **Verdict on placement: this is an itch-first launch.** It's the lightest of the three games and the only one with no audio and no daily. Let it harden on itch + own domain while the art pack and SDK build happen.

---

## Ranked Top-10 issues

| # | Sev | Where | Issue → Concrete fix |
|---|-----|-------|----------------------|
| 1 | **HIGH** (portal tiers only) | index.html:75, :103, :585 | External link-outs + third-party analytics + no SDK fail CrazyGames/Poki QA. Fix: build flag/query (`?portal=1`) that hides `arcadeBack` + tipJar and skips GoatCounter; integrate CrazyGames SDK (init, gameplayStart/Stop on start()/gameOver(), sdkGameLoadingStart/Stop) before that submission. |
| 2 | **HIGH** | whole file (0 hits for AudioContext) | Zero audio; both siblings ship WebAudio synth. Fix: port mamaddash's oscillator helper (~25 LOC): pickup blip, basket-complete fanfare, hit thud, vendor-chase heartbeat. Biggest juice-per-LOC available. |
| 3 | **HIGH** (only if art lands before submission) | index.html:213–224, :480–483; assets/prompts.json | Sprite path is untested-in-production dead code: (a) `keyMagenta` doesn't crop the bounding box, so 1:1 gen images with margins render the kid smaller than the emoji and floating above the ground line (feet anchor at `pyo-h*0.85`+`h` = baseline+0.17·pf only if the model filled the frame); (b) `player-slide` uses the same fixed `w=pf*1.15` though the pose is "low in frame" — risk of a levitating slide; (c) vendor sprite same exposure. Fix: after chroma-key, scan for the opaque bbox and crop the canvas to it (≈10 LOC in `keyMagenta`), then the existing math is trustworthy. **Either do that + 10 min of visual QA with real PNGs, or ship emoji-only tomorrow (current state — verified safe).** |
| 4 | **MED** (rare, confirmed by test) | index.html:371–372 vs :547 | 900ms restart race: complete a basket → die → tap RUN AGAIN within the window → the stale `setTimeout` sees the *new* run's `running=true` and advances the fresh run to district 1. Headless-confirmed (`zone===1` on a fresh run). Fix: store the timer id in `G` and `clearTimeout` in `reset()`, or capture the `G` object and bail if `G!==captured`. 2 lines. |
| 5 | **MED** | absent feature (cf. mamaddash:382) | No daily mode. Fix: `?daily=1` + date-seeded `mulberry32` for `newList` order, `safeLane` walk, and spawn rolls (the pattern already exists in mamaddash); daily share text variant. Turns one-shot portal traffic into returners. |
| 6 | **MED** | index.html:327 | Difficulty density ramp saturates in ~6s (`dist/2200` at ~340 dist/s). Fix: change to `G.dist/22000` (~60s ramp) or key it to `G.zone` so each district is a difficulty step — matches the travel fantasy. One number. |
| 7 | **MED** | index.html:133 | Share text is a weak tribe badge by the academy's own m2 standard: add identity + a spoiler-free brag — e.g. include the shuk reached and a basket grid: `🧺✅✅✅ made it to Mahane Yehuda before Shabbat`. Also carry shekels in the URL (`&s=`) like mamaddash's `&c=`. |
| 8 | **MED** | index.html:15 | og:image is the shared portal placeholder — fine for tomorrow, but all arcade links unfurl identically in WhatsApp. Fix: run `bin/imagepack shukshopper` (press/prompts.json already written), point og:image at the game's own key art. |
| 9 | **LOW-MED** | index.html:319–323 | Keyboard handler lacks `e.preventDefault()` for arrows/Space — embedded-iframe desktop portals can scroll the host page / trigger Space-scroll. Fix: `if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(k)) e.preventDefault();` |
| 10 | **LOW** | index.html:216–223 | Tainted-canvas catch returns the *un-keyed* canvas → magenta boxes around sprites (file:// only). Fix: in the catch, return the original `img` (or set a flag to skip ART assignment). Also note: vendor sprite/emoji always renders to the player's left — at lane 0 it crowds the road edge; cosmetic, RTL-agnostic, fine to leave. |

---

## SHIP / NO-SHIP by portal tier

| Tier | Verdict | Reasoning |
|------|---------|-----------|
| **itch.io** | **SHIP tomorrow** | Zero QA bar; game is stable (29/30 headless), emoji-fallback path is the shipped path and is clean; beat-loop + bilingual share work; offline PWA works. Ship as-is; issues #2/#4/#6 can land in updates. |
| **CrazyGames** | **NO-SHIP tomorrow — SHIP in ~1–2 days** | Hard blockers: SDK integration, strip arcade out-link + GoatCounter + tip jar in the portal build (issue #1). Strong recommendations before their 48 guaranteed homepage hours are spent on it: audio (#2) and the front-loaded density fix (#6) — you only get the homepage burst once. |
| **Poki** | **NO-SHIP** (don't apply yet) | ~1 acceptance/day bar; silent game with no daily/meta and a 6s difficulty spike won't pass review and a rejection costs the relationship. Apply after: SDK, audio, daily mode, per-game og/key art, and a week of itch+CrazyGames retention data to cite. |

This matches the academy's own distribution doctrine (academy/index.html:159): *itch now → CrazyGames with SDK → Poki application.*

## Top-3 needle-movers

1. **Run the art pack tonight and add bbox-crop to `keyMagenta` (issues #3, #8).** Portals are judged by screenshot before anyone presses play; `prompts.json` for both packs is already written and the loader is already wired. One `bin/imagepack` run + 10 LOC of crop + 10 minutes of eyeball QA converts this from "emoji prototype" to "Subway-Surfers-adjacent" — or consciously ship emoji-only to itch and gate CrazyGames on art. Do not ship un-QA'd sprites.
2. **25 LOC of WebAudio (issue #2).** Port the sibling synth helper. Pickup blip + basket fanfare + chase heartbeat transforms perceived quality more than any other single edit, and it's a CrazyGames review-score input.
3. **Daily list + shuk-reached share badge (issues #5, #7).** Date-seeded daily run reusing mamaddash's mulberry32 pattern, and share text that brags the shuk reached with a basket grid. Together they close the retention hole AND sharpen the viral loop — the two lowest scores on this panel — for ~40 LOC.

---
*Methodology: full source read (index.html, sw.js, manifest, WORLD.md, both prompts.json, sibling games for convention parity); Node headless harness executing the real game script with DOM stubs — 30 assertions, 29 pass; the 1 failure is issue #4. No game files were edited.*
