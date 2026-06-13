# CHANGING HISTORY — 10M Advisor Panel Verdict
*Launch-readiness review · 2026-06-13 · index.html ~1100 LOC, sw.js v1, WORLD.md*
*Method: full JS read (2 passes), `new Function()` syntax check (PASS), engine-by-engine logic trace, share-loop + persistence audit, i18n/RTL spot-check. No live browser in the build env — behavioral claims are from code-reading, flagged where they need device QA.*

The panel was asked to review **everything** before going live. Verdict is at the bottom. Five quick wins were applied during this review (marked ✅ FIXED); the rest is the prioritized post-launch roadmap.

---

## Scores

### STABILITY — 8/10
- One inline script, `'use strict'`, all engine entry points behind a single `ENG` dispatch (`startGame`). Every mini-game has a `finished` guard so the `done()` callback can only fire once — no double-scoring on a frame where win+timeout race. Verified in all five engines.
- Teardown is centralized: `stopEngine()` cancels the rAF and runs the engine's `cleanup()` (each engine removes exactly the listeners it added). Confirmed the DODGE engine's stray anonymous `mousemove` was the one leak — **already fixed** before this review (named `dragMove`, removed in cleanup).
- Canvas is DPR-aware (`fitCanvas`, capped at 2×) and re-derives from the arena rect on each game start. Pure-drawing canvas (no external images) → `toBlob` cannot taint-fail, which the new share card depends on.
- `localStorage` is fully try/caught (save, lang, mute, history, caveman, seen). Game runs in private mode / file:// with no throw.
- Audio is lazy WebAudio one-shots (no looping oscillators, no HTMLAudio) → **no hidden-tab audio leak** (the classic portal-QA reject that hit MAMAD DASH does not apply here).
- Docked 2: (a) **SEQUENCE uses `setInterval`/`setTimeout` for the "watch" playback** — if the player backgrounds the tab mid-pattern, the timers keep firing and the sequence plays to an unwatching player → near-guaranteed loss on return (Issue #6, low-sev edge case). (b) No global pause; rAF self-throttles when hidden so action engines are fine, but there's no resume affordance.

### FUN / GAME FEEL — 7.5/10  *(WarioWare + Mini Metro)*
- Five genuinely distinct verbs (aim, dodge, timing, mash, sequence) is the right MVP spread, and the "mechanics are engines, events are data" split is exactly how you scale to 500 events without re-touching feel. This is the strongest architectural decision in the build.
- **Input latency was wrong for a skill game** — the TIMING tap and SEQUENCE cells were bound to `click` (fires on release, adds latency). For a stop-the-marker game that's the difference between "tight" and "mushy." ✅ **FIXED**: both now `pointerdown` with `preventDefault`.
- **First-impression difficulty (AIM):** the opening event (Stop the Asteroid) is an aim game requiring 2 hits on a moving target — demanding as a literal first tap. ✅ **FIXED**: aim now grants +2 bonus shots by default and a slightly larger hit window (target r 24→27, pad 12→14). Still skillful, no longer a brick wall on tap #1.
- MASH timeout win threshold (≥92% of goal) is a kind, anti-frustration touch. Good.
- Missing: there is no per-game **score** or star rating, so there's no "do it better" pull on replay — replays exist (for +5 shards) but feel identical. WarioWare's whole engine is escalating speed; here only TIMING speeds up within a round. Roadmap #2.

### CURIOSITY → LEARNING — 8.5/10  *(Civilization + Oregon Trail)*
- The FUN → CURIOSITY → LEARNING mandate is honored structurally: you play first, the alternate present is the payoff, and the real history is gated behind a **History Mode that is off by default**. This is the rare educational-adjacent game that doesn't lead with the textbook. Narrative panel is happy.
- The consequence one-liners ("Senators ride velociraptors," "the toaster gives excellent life advice") are the curiosity hook and they land. Civ panel would only ask for more per tag (currently 2 each) so the present-card doesn't repeat across replays.
- `real{}` blurbs are accurate and genuinely interesting (Vikings did reach America; Caesar's death *started* the Empire; Black Death raised wages). Oregon Trail panel signs off on factual quality.

### RETENTION — 5/10  *(Royal Match)*
- The Museum is the right long-term spine (a growing trophy case of exhibits + Figures), and the era-gated map gives a clear "next." Solid bones.
- **But there is no reason to return *tomorrow*.** No daily event, no streak, no energy/anticipation loop, no notification hook. Every retention mechanic in the design doc is roadmap, not code. For 10M this is the #1 gap after virality. Roadmap #1.
- **Economy has no sink:** Timeline Shards accrue (15 new / 5 replay) and are spent on *nothing*. An earn with no spend is dead weight to the Monopoly Go panel — either give them a use (cosmetic Museum themes, a hint, a re-roll of the present) or hide the counter until there is one. Roadmap #3.
- Progression is strictly linear (event N unlocks N+1). It funnels cleanly but fights the "play what you're curious about" fantasy — a curious player who wants to jump to Titanic can't. Consider unlocking the first node of each era. Roadmap #4.

### VIRALITY — 7.5/10  *(Monopoly Go + Subway Surfers growth)*
- **The shareable Timeline Card was text-only** at submission — and the design doc literally calls it "the game's most important feature." That was the single biggest miss versus the brief. ✅ **FIXED**: added a pure-canvas 1080×1350 card (`renderShareCard`) — wordmark, the generated present name (auto-shrink to fit), big emoji, up to 3 consequence lines, a "X/13 timelines changed · 💎" progress line, and a "What's YOUR timeline? / miklatgames.fun" footer. Share chain is now image → text → clipboard, each guarded. This is the growth unit the franchise rests on.
- **FTUE fast-path** ✅ **FIXED**: a brand-new player (no `ch.seen`, nothing cleared) now lands straight in the opening dare instead of a map of locked doors — fastest path to the first "whoa," which is what feeds the share.
- The `?beat=`-style inbound challenge loop is **not yet wired** here (MAMAD DASH has it; this doesn't). The shared card drives installs but there's no personalized "beat my timeline" return path. Roadmap #5.
- `og:image` is still the generic portal `og.jpg`, not a Changing-History card — link unfurls won't show the game. SVG can't be an OG image (unfurlers need raster); needs a generated PNG/JPG. Issue #7.

### UX / ACCESSIBILITY — 8/10  *(Duolingo)*
- Mobile-first, one-thumb, big tap targets, `prefers-reduced-motion` honored, full EN/HE with RTL `dir` flip and a complete translation table (no missing keys found). Toggle states persist. This is portal-grade polish.
- **🦴 Caveman Mode** is a delightful, on-brand accessibility lever — it's effectively an "easy + no-reading" mode dressed as a joke: grunt objectives, eased difficulty across every engine, wordy brief/history suppressed. Duolingo panel loves that the *accessibility* setting is the *fun* setting. (Minor: the in-round objective regressed to normal text on later SEQUENCE rounds — ✅ FIXED.)
- Gaps: toggles live only on Map/Brief, not in-game or on the outcome screen; the action engines have a one-shot instruction toast but no replay-the-hint button.

---

## Issues (ranked) — 5 fixed this pass, 2 open

| # | Sev | Status | Where | Issue → Fix |
|---|-----|--------|-------|-------------|
| 1 | HIGH | ✅ FIXED | OUTCOME / share | Timeline Card was text-only — the core viral asset. Added canvas 1080×1350 image card + image-first share chain. |
| 2 | MED-HIGH | ✅ FIXED | engTiming, engSeq | `click` input → latency on a timing game. Switched to `pointerdown`+`preventDefault`. |
| 3 | MED | ✅ FIXED | engAim | First event (asteroid) too punishing as the literal first tap. +2 default bonus shots, bigger hit window. |
| 4 | MED | ✅ FIXED | boot | New players hit a map of locked doors. First-run now opens the opening dare directly (`ch.seen`). |
| 5 | LOW | ✅ FIXED | engSeq | Caveman objective reverted to normal text after round 1; dead `pw` var in engAim removed. |
| 6 | LOW | OPEN | engSeq | `setInterval` playback runs in a hidden tab → unwatchable pattern → loss on return. Fix: pause/restart the watch on `visibilitychange`. Edge case; deferred. |
| 7 | MED | OPEN | `<head>` | `og:image` is the generic portal card. Needs a generated Changing-History PNG (1200×630). Deferred — needs the art/raster pipeline. |

---

## VERDICT: **SHIP** ✅

The fun-first loop is real, the five engines are stable and cleanly separated, the Timeline generator + Museum deliver the franchise's signature beat, and the two launch-grade gaps the panel cared about most — **a visual shareable card** and a **fun-first FTUE** — were closed during this review, along with the input-latency and first-level-difficulty feel issues. Nothing open is a no-ship defect: #6 is a backgrounded-tab edge case and #7 is a link-unfurl nicety. **Cleared for live.**

## Top-5 needle-movers (post-launch, in priority order)

1. **Add the daily + streak loop** (Retention): one seeded "This Day in Changed History" event, a consecutive-day counter shown on the outcome card and baked into the share text, and a "next in Xh" countdown. Highest retention-per-line available; the share card already exists to carry the streak.
2. **Give replays a reason** (Fun): per-game score/stars (time, accuracy, hits) + a personal best, so the +5-shard replay becomes a "beat your run."
3. **Give Shards a sink** (Economy): cosmetic Museum themes or a "re-roll the present" — turn the dead counter into a goal.
4. **Wire the `?beat=`/`?timeline=` inbound loop** (Virality): let a shared card deep-link a friend into the same event with a "match my timeline" frame — closes the install→play→reshare loop.
5. **Generate a real `og:image`** and unlock the first node of each era so curious players can chase the timeline they actually want.
