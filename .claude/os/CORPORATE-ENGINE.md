# 🏢 THE CORPORATE ENGINE — built-in ads & paid experiences (system spec)

_Owner: Claude (CEO hat). Drafted 2026-06-13 from Zorba's brief: every UAE game
should be "fun, but with a corporate engine built in to bring in ads and paid
experiences." This is the reusable monetization SYSTEM all UAE games plug into —
ads/paid-experiences are a first-class engine, not a per-game bolt-on._
_Companion to `MONETIZATION.md` (the studio-wide plan). This makes its P2/P3
"direct sponsorship" + "branded mini-games as a service" into shippable plumbing._

## Why a shared engine (not per-game ad code)
Three UAE games (`games/THE-PLATE.md`, `games/BUILD-THE-BURJ.md`,
`games/DUBAI-LIFE.md`) all need the same things: native brand placements, paid
unlocks, real-world tie-ins, and a brand-facing funnel. Build it ONCE as a tiny
shared config module each game imports — so a new sponsor deal is a data edit,
not an engineering project. This shared layer **is the product** the consultancy
sells as "playable marketing for the Gulf."

## Design law (non-negotiable — mirrors SOCIAL.md's discipline)
1. **Native, never bolted-on.** The brand IS the play field — a tower floor, a
   car skin, a mall you actually shop in — never a banner over the canvas. The
   10M monetization panel's rule: if removing the logo breaks the fiction, it's
   native; if it just frees screen space, it's an ad. Ship only native.
2. **Brand-safe by construction.** No gambling framing (THE PLATE stays
   charity-auction only), family-friendly, culturally reviewed, Ramadan-aware
   scheduling. Government/tourism buyers (DET) need squeaky-clean — design for
   the strictest buyer.
3. **Never pay-to-win the daily seed.** Paid = cosmetic, convenience, or
   real-world value. The shared daily gauntlet stays fair, or the social loop
   (the whole growth engine) dies. Paid experiences are additive.
4. **Offline/static still holds.** Engine ships **dormant behind flags** (same
   pattern as `TIP_URL`/`BOARD_URL`): `CORP={}` → zero placements, pure game.
   Each deal flips data on. No deal, no ads — the game is never worse for it.

## The three revenue surfaces (all routed through one config)
```
CORP = {
  placements: [ {slot, brand, asset, tier, gameplayValue} ... ],  // native ad inventory
  paidExperiences: [ {trigger, type, payload} ... ],              // unlocks + real-world
  funnel: { brandId, events:[...] }                              // what the brand sees
}
```

### 1 · PLACEMENTS — native ad inventory (the "ads")
Per-game slots, tiered like real media:
- **BUILD THE BURJ** — rentable floors: ground-floor retail (telco/F&B),
  mid-rise offices (banks), the **crown** as a season anchor-tenant takeover.
  Sponsor floors carry gameplay value (stability/rent/prestige) so players *want*
  them. Primary buyer: master-developers (Emaar/Aldar/DAMAC).
- **THE PLATE** — auto-brand car skins (the reward players want) +
  "presented by [bank]" charity-auction frame.
- **DUBAI LIFE** — **locations as levels**: real venues (Dubai Mall, Gazebo, a
  mall parking lot, an SZR car brand) ARE the micro-games. The richest native
  surface — the placement and the level are the same object.

### 2 · PAID EXPERIENCES (the "paid experiences")
- **Real-world tie-ins** (the differentiator): win the parking game → a real
  **valet/coupon QR** for the mall; an auto skin → a **test-drive lead-gen**
  deep link; a Dubai Life level → a **Visit Dubai booking** deep link. The game
  becomes a top-of-funnel for a real transaction — what a tourism board or mall
  actually pays for.
- **Cosmetic unlocks / supporter pack** via **Stripe Payment Links** (no
  backend, per MONETIZATION P3): car skins, tower facades, garage backdrops.
- **Sponsored daily challenge**: "Today's lot/blueprint/day, presented by …"

### 3 · FUNNEL — what the brand buys (the B2B deliverable)
Reuse the GoatCounter event spine, namespaced per placement, so a brand gets a
dashboard, not a vibe: `evt-corp-<brand>-impression / -play / -complete /
-share / -claim` (claim = coupon/lead — the conversion the brand pays for). The
**brand-facing report is the sellable artifact**; the game generates it for free.

## Productization — "playable marketing for the Gulf" (B2B)
- **White-label editions:** "Build *our* tower" (developer off-plan launch),
  "Find parking at *our* mall," "Win a plate for *our* charity gala." Same
  engine, swapped `CORP` data + skin.
- **Pricing ladder (validate, don't promise):** a named placement ≈
  AED 150k–400k/quarter (panel's developer estimate, well above the $5–20/1k
  programmatic floor in `research/ad-economics.md`); a full white-label
  campaign microsite = a project fee + media.
- **The pipeline rule (panel mandate):** don't build the ad model on spec.
  **Land one anchor LOI** (an Emaar/Aldar "named floor", a DET "Build Dubai's
  skyline") to set the price floor and de-risk inventory fill — the engine's #1
  structural risk is empty slots, not fit.

## Target buyer map (first 10-target outreach list, per MONETIZATION P2)
| Category | Names | Best game |
|---|---|---|
| Master-developer | Emaar, Aldar, DAMAC, Sobha, Binghatti | BURJ |
| Mall / retail | Dubai Mall (Emaar), Mall of the Emirates | DUBAI LIFE |
| Tourism board | **DET / Visit Dubai**, Abu Dhabi DCT | DUBAI LIFE / BURJ |
| Bank / wealth | Emirates NBD, Mashreq, FAB | PLATE |
| Auto | Al Tayer, AGMC, Rolls-Royce/Bentley dealers | PLATE / DUBAI LIFE |
| Telco | e&, du | BURJ (retail floors) |
| F&B chain | **Gazebo**, local QSR | DUBAI LIFE |

## Zorba gates
- Approve "paid experiences" scope (coupons/lead-gen ok? Stripe ok?).
- Green-light the outreach list before any real logo enters a build.
- Confirm the dormant-by-default rule (ships off; flips per deal) as policy.
</content>
