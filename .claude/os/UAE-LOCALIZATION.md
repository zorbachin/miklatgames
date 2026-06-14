# 🇦🇪 MIKLAT → DUBAI — UAE localization strategy (plan of record)

_Owner: Claude (PM + CEO hats). Zorba approves the pitches; Claude executes._
_Drafted 2026-06-13 from Zorba's brief: "localize the games in Dubai —
build the Burj balancing budget/material/stability with sponsors renting;
win the best license plate — and figure out what gets UAE tourism and other
boards interested in advertising and addictive localized games."_
_Research: `research/uae-market.md`. Reviewed by the 10M panel (verdict below)._

## The thesis (the answer to "what gets the boards interested")
The arcade's whole edge is **cultural resonance over polish** (the
`identity-games.md` thesis: 41% of MENA gamers prefer Arabic-localized titles,
75% in the GCC say cultural portrayal matters, Arabic is ~1% of app content).
The UAE is the best possible home for that edge plus money:

- **The audience pays.** UAE = **highest game ARPU in the world**, ~$1.26B
  market, ~90% mobile — and the Arabic content lane is wide open.
- **The state is a buyer, not just the consumers.** Saudi's **$38B** Savvy
  strategy, the UAE **regulating gaming in 2025**, and **DET/"Visit Dubai"
  naming gamification** in its own marketing mean there is institutional money
  looking for exactly what we make: addictive, shareable, culturally-native
  games. We are not pitching into a void — we are pitching into a budget line.
- **Our monetization plan already names the bridge** (`MONETIZATION.md` P2/P3):
  *direct sponsorship > programmatic*, and *branded mini-games as a service*.
  Dubai is where that bridge has the richest traffic on it — UAE real-estate
  developers and banks are among the country's largest ad spenders, and our two
  flagship fictions (a tower, a prestige auction) map 1:1 onto their products.

**So the UAE play is the proof-of-concept for the consultancy's "playable
marketing" business** — not a detour from the arcade, the commercial point of it.

## House invariants carry over, with one swap
Everything in `GAME-FACTORY.md` / `DESIGN-SYSTEM.md` holds: single-file
canvas, offline PWA, share card, `?beat=` duels, the limits rules. **The one
change: the localized second language is Arabic (RTL).** RTL is already a house
invariant (we ship Hebrew RTL), so the muscle exists — but Arabic adds
**Eastern-Arabic digits** and **bidirectional plate/number layout on canvas**,
which the stability panel flagged as the top localization reject risk (below).

## The three flagships (Zorba's ideas, specced)
Concept docs: `games/THE-PLATE.md`, `games/BUILD-THE-BURJ.md`, `games/DUBAI-LIFE.md`.
All three plug into one **corporate engine** (`CORPORATE-ENGINE.md`) — ads &
paid experiences as a first-class shared system, not per-game bolt-ons.

| | **THE PLATE** 🚗 | **BUILD THE BURJ** 🏗️ | **DUBAI LIFE** 🌆 |
|---|---|---|---|
| Pitch | Race rivals down the Dubai strip — beat them, take their plate | Stack a megatower balancing budget / material / stability / height | Survive a day in Dubai — parking, SZR traffic, the Gazebo run |
| Proven base | Race-for-pinks (NFS / F&F) + ghost racing (SOCIAL.md) | Tower Bloxx / "Stack" + light sim | Changing-History grab-bag + Balagan daily duel |
| Control scheme | SLIDE + GAS (reuses the shipped chariot engine) | TIME-IT (drop swinging floor) | reuses existing engines (data, not new engines) |
| Cultural hook | plate-code status grammar + Dubai supercar racing | Burj Khalifa (828m, $1.5B, wind) | relatable daily-life chaos every resident knows |
| Share unit | plate stolen in a race ("took plate 7 at 290 km/h") | skyline + height | "survived Dubai in N tries" |
| Role | **Viral flagship — ship first** | **Revenue engine + B2B** | **Social daily + corporate-engine showcase** |

## 🏆 10M Advisor Panel Verdict (concept review, 2026-06-13)
Panel convened pre-build (factory stage 1). Two flagships reviewed head-to-head.
Verbatim role: virality / retention / stability / monetization.

| Lens | THE PLATE | BUILD THE BURJ | Winner |
|---|---|---|---|
| **Virality** | **8/10** — status > score; natively a WhatsApp duel | 6.5/10 — a number, not a story; sponsor logos fight the card | PLATE |
| **Retention** | **7.5/10** — 36h-forfeit duel = mutual obligation | 6/10 — beautiful but solitaire ritual | PLATE |
| **Stability** | **7.5/10** — hard parts (URL codec, RTL plate text) testable up front | 5/10 — frame-rate-independent physics + draw-call growth verifiable only late | PLATE (ship first) |
| **Monetization** | 6.5/10 → **~8** after racing pivot (see note) | **8.5/10** — developers are huge spenders; fiction = their product; brand-safe | BURJ |

**🏁 Racing pivot note (2026-06-13, supersedes The Plate's v1 auction concept):**
Zorba moved The Plate from an auction to a **street race — beat the rival, take
their plate** (`games/THE-PLATE.md`). Panel-lens re-read: **virality ⬆️** (the
steal is now a clip-able overtake, not a bid number), **monetization ⬆️ 6.5→~8**
(no bidding = **no gambling read** → banks + government/tourism buyers re-open,
and auto brands become the natural, cleaner sponsor), **retention ≈** (same daily
+ 36h-forfeit duel spine), **stability 7.5→~6.5 but mitigated** (more to build
than an auction, but it **reuses the already-shipped chariot SLIDE+GAS engine**
and ghost-racing snapshots dodge cross-device desync). Net: the pivot trades a
little build-risk for a stronger share moment and a far bigger, brand-safe buyer
pool. v1 auction kept as a deferred "Most Noble Numbers" charity mode.

**Consensus call: ship THE PLATE first, build BURJ second.**
- The Plate wins reach, retention, and is the *safer* first build — its hardest
  problems are unit-testable before a line of game code. Lock the **charity-auction
  framing from day one** (it's true to the real events) to defuse the gambling read.
- Burj is the **money** but is gated on a sponsor sales pipeline. Don't build the
  ad model on spec — **validate one anchor-developer LOI** (an Emaar/Aldar/DAMAC
  "named floor") first; that single deal de-risks the whole inventory model.
- **Cross-pollinate:** steal Burj's "persistent, lossy skyline" (a gap where the
  day you skipped should be) as The Plate's **garage wall** — gives the flagship a
  visible-streak-shame loop on top of the forfeit duel.
- **One shared-foundation mandate (stability):** write three helpers ONCE and
  reuse — an **Eastern-Arabic digit formatter**, a **seeded integer PRNG**
  (integer/fixed-point only, so async duels resolve identically across devices),
  and a **`document.fonts.ready` gate** before any canvas `fillText`. These are
  the three likeliest silent localization/determinism rejects.

## Build order (factory stages apply per game)
| Phase | Item | Gate |
|---|---|---|
| P0 | Shared helpers: Eastern-Arabic digits, seeded int PRNG, fonts gate | reusable snippet block |
| P0 | **Corporate engine** dormant scaffold (`CORP={}` flag, placement/funnel config) | ships off; flips per deal |
| P0 | **THE PLATE** stages 1–5 (charity framing, URL-duel, garage) | Zorba signs the pitch + hook |
| P1 | **DUBAI LIFE** — ship Find Parking first, then SZR + Gazebo, assemble Daily Run | reuses CH/Shuk engines |
| P1 | **BUILD THE BURJ** stages 1–5 (daily-seed landmark race) | Zorba; anchor-developer LOI before ad model |
| P1 | Arabic pass on existing arcade (Shuk Souk reskin candidate) | reuse Shuk Shopper engine |
| P2 | B2B one-pager: "playable marketing for the Gulf" + 10-target list (CORPORATE-ENGINE.md map) | per MONETIZATION.md P3 |

## Zorba gates
- ✅/❌ approve the two one-line pitches + cultural hooks (factory stage 1 gate).
- Names: "THE PLATE" and "BUILD THE BURJ" are working titles — Arabic names TBD.
- Green-light the B2B outreach list before any logo goes in a build.
- Decide whether the UAE set lives on miklatgames.fun or a sibling domain
  (a Gulf-facing brand may want its own front door).
</content>
