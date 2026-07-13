# 🏗️ BUILD THE BURJ — design doc (concept / factory stage 1)

_Working title. The UAE **revenue engine** — build second, after THE PLATE
(`../UAE-LOCALIZATION.md`). Research: `../research/uae-market.md`._
_Pitch: **"Build the world's tallest tower — balance budget, materials and
stability against the wind, and rent your floors to the brands of Dubai."**_
_Cultural hook: the Burj Khalifa fantasy — 828m, ~$1.5B, 26,000 glass panels,
192 piles, and extreme-height **wind engineering** as the real challenge._

## Research: what proven game is this adapted from?
| Source mechanic | Why it works | Build the Burj adaptation |
|---|---|---|
| **"Stack" / Tower Bloxx** (Ketchapp) | One-tap timing; instantly legible; "one more floor" | A floor swings on the crane; **tap to drop** — land it centered or it overhangs/topples |
| **Light builder/sim** (Township-ish) | Resource tension makes each tap a decision | Each floor costs **budget**; pick a **material grade**; misalignment + wind raise a **sway/stability** meter |
| **Built-in limits** (factory Rule 2) | Stakes + a definite end, no endless toy | Lose on **bankruptcy** or **collapse**; win at a **target height / spire** |
| **Wordle daily seed** | One shared, comparable puzzle a day | **Daily Blueprint** — same floor widths, gust pattern, budget cap for everyone, resets midnight GST |
| **Named landmark finish lines** | A binary brag beats an abstract number | "Today: top the **Burj Al Arab (321m)**" — a target every Dubai player knows |

## The four dials (the actual game)
**Budget ↔ Material grade ↔ Stability (sway/wind) ↔ Height.** Cheap floors save
money but sway; premium floors are stable but burn budget; height is the score
but every meter adds wind load. The skill is the trade-off, the drop is the verb.

## v1 scope (proposed — factory stage 2 once Zorba approves stage 1)
- Single-file canvas, offline SW, **EN + Arabic (RTL)**, GoatCounter events,
  `?beat=<height>` daily-seed challenge, localStorage best + skyline (`burj_*`).
- Core loop: drop swinging floors; manage budget + material choice; watch the
  sway meter; reach the day's landmark height before bankruptcy/collapse.
- **Persistent skyline** (panel's strongest retention idea): each day's best
  tower plants a silhouette in a growing Dubai panorama; **a skip leaves a
  gap** (visible-streak pressure). 30 days = a skyline.
- Share card 1080×1350 (pure canvas): the tower silhouette frozen (mid-collapse
  is the best moment), height reached, sway meter, the named landmark target,
  "beat my skyline →" + miklatgames.fun.
- Events: `evt-burj-start / -floor / -collapse / -win / -share`.

## Panel needle-movers folded in (stage 3, pre-baked)
- **Virality (the panel's #1 fix):** ship the **named-landmark daily** so the
  card is a binary brag ("I topped the Burj Al Arab, did you?") not a bare
  number. Keep **sponsor logos off the share card** — ad inventory and
  shareability fight on the same surface; the brag stays clean.
- **Retention:** Daily Blueprint + the lossy persistent skyline; currency buys
  **cosmetic facades / landmark unlocks**, never raw power (keeps the seed fair).
- **Stability (must-do before build — this is the riskier build):**
  - **Fixed-timestep accumulator** for all swing/drop physics, render-interpolated,
    decoupled from rAF `dt` — same input must give the same outcome at 40fps and
    60fps (fairness + reproducible share heights). Non-negotiable.
  - **One DPR helper + single world→screen transform**; inverse-map taps through
    the live camera-pan offset (tower scrolls up). Unit-test the drop line vs the
    rendered floor at 1×/2×/3×.
  - **Cull + cap rendered floors** to the visible ~6–8; **pre-bake each
    sponsor-logo floor to one offscreen sprite** — never re-rasterize text/logo
    per frame, or draw-call growth blows the 60fps budget at floor 80.
  - Eastern-Arabic digits via the shared formatter; HUD numbers in a fixed-direction
    box so `dir=rtl` doesn't reflow the meter mid-run.

## Monetization (the reason this is the revenue engine — per MONETIZATION.md)
- **Brands rent floors = native, in-fiction ad inventory.** A floor is a
  *tenant*, not a banner: ground-floor retail (telco/F&B), mid-rise offices
  (banks), the **crown** as a season-long **anchor-tenant takeover**. Sponsor
  floors carry gameplay value (stability/rent/prestige) so the player *wants*
  them. The brand is the play field, never an overlay.
- **Primary buyer: master-developers (Emaar / Aldar / DAMAC / Sobha /
  Binghatti)** — among the UAE's largest ad spenders, and the fiction *is* their
  business. Realistic: ~AED 150k–400k/quarter for a named floor + skin (well
  above the $5–20/1k programmatic floor in `ad-economics.md`).
- **B2B playable marketing:** "Build *our* tower" — Emaar's Dubai Creek Tower
  off-plan launch microsite; **DET/"Visit Dubai"** "Build Dubai's skyline"
  tourism piece (brand-safe, no gambling optics — a buyer The Plate can't reach).
- **Risk (panel): FILL, not fit.** The model needs a roster of paying tenants or
  the tower looks empty. **Do not build the ad model on spec — validate one
  anchor-developer LOI first** (a single Emaar/Aldar "named floor" sets the
  price floor and de-risks everything after).

## Deferred
- Per-emirate towers, a co-op "build the city" mode (BAYIT wallet from SOCIAL.md),
  real-physics stability mode, generated art pass (replace emoji/primitives).

## Sources
- ../research/uae-market.md (Burj facts, developer ad-spend, DET gamification)
- https://www.propertyfinder.ae/blog/burj-khalifa-cost/
- https://theconstructor.org/structures/structural-details-burj-khalifa-concrete-grade-foundations/20512/
- GAME-FACTORY.md (Rule 1 TIME-IT, Rule 2 limits), MONETIZATION.md (P2/P3), ad-economics.md
</content>
