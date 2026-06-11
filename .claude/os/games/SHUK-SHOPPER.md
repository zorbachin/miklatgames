# 🧺 SHUK SHOPPER — design doc (Subway Surfers, adapted)

_v1 shipped 2026-06-11 at `/shukshopper/`. Single-file canvas runner, house
pattern (mamaddash sibling): offline SW, EN/HE i18n, GoatCounter events,
`?beat=` challenge links, localStorage best (`ss_best`)._

## Research: why Subway Surfers works (and what we stole)

Most-downloaded mobile game of all time; ~91% D1 / ~60% D30 retention.

| Subway Surfers mechanic | Why it works | Shuk Shopper adaptation |
|---|---|---|
| 3 lanes + exactly 4 swipes (L/R/up/down) | Whole input vocabulary learned in 5 seconds; perfect for short mobile sessions | Same. Swipe stalls / jump crates / slide under awnings. Tap = jump (one-thumb promise) |
| Chase framing (inspector + dog) | Stakes + a *forgiving* fail: first hit = stumble, chaser closes in; second hit = caught | The vendor 👨‍🍳: grabbed a "free sample," he wants his ladle back. Stumble → 6s of danger on your heels → clean running shakes him off |
| Coins line the safe path | Collectibles double as *guidance* — the reward trail teaches the dodge | Shekels ₪ + list items spawn only in the guaranteed-safe lane |
| Missions/word hunts | A second goal layered over survival = "one more run" | **Ima's list** 📜 — 4 shuk items per basket; full basket = bonus + new list. The core hook and the share stat |
| Speed ramp, no level end | Session length self-balances to skill | Speed +0.0048/s, capped; +bump per basket |
| Powerups (magnet, jetpack, hoverboard) | Variety + comeback moments | 🧲 magnet (8s, pulls pickups across lanes), 🛒 cart dash (5s invincible) — only 2 in v1, on purpose |
| World Tour (new city every 3 weeks) | Freshness + cultural connection drives the famous retention | **Shuk Tour** roadmap: Carmel → Mahane Yehuda → Ramle → Akko skins (v2+) |
| Characters/boards cosmetics | Identity + coin sink | Deferred to monetization P3 (paid unlocks) |

## v1 scope (shipped)

- Pseudo-3D 3-lane perspective road, emoji sprites (zero asset downloads — the
  whole game is one HTML file; art pass later).
- Obstacles: jump (📦🍉👵), slide (hanging 🥙🏮), full-block (🛒🧔).
- Ima's list HUD, baskets + shekels score, stumble/caught system, magnet +
  cart dash, pause on tab-hide, first-run how-to overlay.
- Share: "I filled N baskets… your turn" + `?beat=N` inbound challenge banner.
- Events: `evt-ss-start / -death / -basket / -share` (GoatCounter).
- Verified headless: 60s sim — spawn/cull, basket cycle, two-hit death,
  best-score persist, beat banner all pass.

## Deferred (don't build until the funnel says so)

- v1.1 polish: real art pass (replace emoji), SFX/music, daily seed ("Friday
  Run" = today's list, same for everyone — mirrors Mamad Dash "Today's Siren").
- v2: Shuk Tour skins, near-miss scoring, og:image challenge card (canvas).
- P3 (per MONETIZATION.md): cosmetic characters (savta, soldier-on-leave,
  french oleh) as paid unlocks.

## Sources

- https://gameworldobserver.com/2016/06/24/subway-surfers-gameplay-analysis
- https://wnhub.io/news/analytics/item-6425
- https://maf.ad/en/blog/subway-surfers-success-formula/
- https://www.globalgamesforum.com/features/keeping-the-world-running-how-liveops-fuel-over-a-decade-of-subway-surfers
- https://vsquad.art/blog/what-gameplay-loop-types-core-loops-explained
