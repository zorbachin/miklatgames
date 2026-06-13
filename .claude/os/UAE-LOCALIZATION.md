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

## The two flagships (Zorba's ideas, specced)
Full concept docs: `games/THE-PLATE.md` and `games/BUILD-THE-BURJ.md`.

| | **THE PLATE** 🚗 | **BUILD THE BURJ** 🏗️ |
|---|---|---|
| Pitch | Win the most prestigious car plate by out-bidding whales & friends | Stack a megatower balancing budget / material / stability / height |
| Proven base | Auction/duel tension + Trivia-Crack forfeit duel | Tower Bloxx / "Stack" (Ketchapp) + light sim |
| Control scheme | TIME-IT (bid on the beat) / nerve-hold | TIME-IT (drop the swinging floor) |
| Cultural hook | Plate "P7" → AED 55M charity auction; plate-code status grammar | Burj Khalifa (828m, $1.5B, wind engineering) |
| Share unit | The plate you won + clout score ("I took plate 7 from you") | Skyline silhouette + height reached |
| Role | **Viral flagship — ship first** | **Revenue engine + B2B play** |

## 🏆 10M Advisor Panel Verdict (concept review, 2026-06-13)
Panel convened pre-build (factory stage 1). Two flagships reviewed head-to-head.
Verbatim role: virality / retention / stability / monetization.

| Lens | THE PLATE | BUILD THE BURJ | Winner |
|---|---|---|---|
| **Virality** | **8/10** — status > score; natively a WhatsApp duel | 6.5/10 — a number, not a story; sponsor logos fight the card | PLATE |
| **Retention** | **7.5/10** — 36h-forfeit duel = mutual obligation | 6/10 — beautiful but solitaire ritual | PLATE |
| **Stability** | **7.5/10** — hard parts (URL codec, RTL plate text) testable up front | 5/10 — frame-rate-independent physics + draw-call growth verifiable only late | PLATE (ship first) |
| **Monetization** | 6.5/10 — gambling-adjacency caps the buyer roster | **8.5/10** — developers are huge spenders; fiction = their product; brand-safe | BURJ |

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
| P0 | **THE PLATE** stages 1–5 (charity framing, URL-duel, garage) | Zorba signs the pitch + hook |
| P1 | **BUILD THE BURJ** stages 1–5 (daily-seed landmark race) | Zorba; anchor-developer LOI before ad model |
| P1 | Arabic pass on existing arcade (Shuk Souk reskin candidate) | reuse Shuk Shopper engine |
| P2 | B2B one-pager: "playable marketing for the Gulf" + 10-target list (DET, Emaar, a bank, a telco, an auto brand) | per MONETIZATION.md P3 |

## Zorba gates
- ✅/❌ approve the two one-line pitches + cultural hooks (factory stage 1 gate).
- Names: "THE PLATE" and "BUILD THE BURJ" are working titles — Arabic names TBD.
- Green-light the B2B outreach list before any logo goes in a build.
- Decide whether the UAE set lives on miklatgames.fun or a sibling domain
  (a Gulf-facing brand may want its own front door).
</content>
