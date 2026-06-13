# 🚗 THE PLATE — design doc (concept / factory stage 1)

_Working title. The UAE flagship — ship-first per the 10M panel
(`../UAE-LOCALIZATION.md`). Research: `../research/uae-market.md`._
_Pitch: **"Win the most prestigious license plate in Dubai — outbid the whales,
and your friends, before your money runs out."**_
_Cultural hook: low/single-digit plates are pure status; plate "P7" sold for
**AED 55M (~$15M)** at Dubai's **"Most Noble Numbers" charity auction**. The
prize is a status object, not a score — and "outbid me or lose the plate" is a
duel the group chat already speaks._

## Research: what proven game is this adapted from?
| Source mechanic | Why it works | The Plate adaptation |
|---|---|---|
| **Auction tension** (real Emirates Auction events) | Bidding is a nerve game — escalation, bluff, the fear of overpaying vs losing | A timed lot: bid against AI "whales" (sheikh/HNW personas) for one plate, with a hard budget |
| **TIME-IT / nerve-hold** (the house control vocab) | One learnable verb; tap-on-the-beat or press-and-hold "chicken" | Tap to raise the bid on the auctioneer's beat; hold = commit, but every dirham spent is gone |
| **Trivia Crack 36h-or-forfeit duel** | Mutual obligation: respond or you lose | Async **URL-duel** — open a lot, send the link, friend must counter in 36h or **forfeit the plate to you** |
| **Top Trumps / collection flex** | A visible garage of status objects + a net-worth ladder | Won plates fill a **garage wall**; plate codes (single-letter → digit-count) form a legible status ladder |
| **Wordle daily ritual** | One shared puzzle a day = a communal, comparable event | **Daily Marquee Lot** — one seeded headline plate the whole region bids on against AI, resolves at local midnight (GST) |

## The plate-code status grammar (the cultural literacy the game teaches)
Fewer digits + earlier letter = more prestige. The game makes this legible to a
newcomer and obvious to a local: `1` ≫ `7` ≫ `55` ≫ `AA 12` ≫ `Q 8842`. The
charity-auction framing is **load-bearing, not decorative** — it is true to the
real events and it is the panel's mandated defuse for any "this is gambling" read.

## v1 scope (proposed — factory stage 2 once Zorba approves stage 1)
- Single-file canvas, offline SW, **EN + Arabic (RTL)**, GoatCounter events,
  `?beat=`/`?lot=` challenge links, localStorage garage + clout (`plate_*`).
- Core loop: a lot opens → AI whales bid → you tap-to-bid on the beat within a
  budget → win (plate rolls onto your car + clout) or bust (overpaid / outbid).
- **URL-duel:** encode the lot `{seed, yourBid, plate, name, emoji}` base64 in
  the link; receiver bids the SAME seeded lot, compares locally, gets a 👑/💸
  result card and a rematch link. The URL is the database — zero backend.
- **Garage wall** with the "lossy skyline" steal: a gap where a skipped day's
  plate should be (visible-streak shame).
- Share card 1080×1350 (pure canvas): the plate glyph big, "won for AED N,
  outbid 3 whales," clout score, "take it from me →" + miklatgames.fun.
- Events: `evt-plate-start / -win / -bust / -share / -duel`.

## Panel needle-movers folded in (stage 3, pre-baked)
- **Virality:** the head-to-head **plate steal** — beating a friend's link
  auto-generates *"I just took plate '7' from [name]"*. Named theft of a status
  object is the most re-share-forcing card we can build.
- **Retention:** the **36h forfeit duel** + the **Daily Marquee Lot** countdown
  are the reason-to-return; winnings buy **bidding budget for tomorrow's lot**
  (a self-reinforcing sink — money fuels the next ritual).
- **Economy sink:** clout/AED → next-lot budget, car skins, garage backdrops,
  "sniper" tokens that extend the nerve-hold window. Never raw power (keeps the
  daily seed fair).
- **Stability (must-do before build):** URL-safe base64 (`-_`, strip `=`) +
  `TextEncoder`/`TextDecoder` (never `btoa()` on Arabic — it throws) + a
  **version byte + checksum** + a <1500-char payload cap with a graceful
  "old/corrupt link" screen. Resolution from a **seeded integer PRNG, integer
  math only** so both devices agree on the winner. `fonts.ready` gate before
  drawing bidirectional plate text; render each plate slot in a
  `direction`-locked sub-box; Eastern-Arabic digits via the shared formatter.

## Monetization (per MONETIZATION.md — P2/P3)
- **Native:** auto-brand **car skins** (the reward the player already wants —
  Rolls-Royce/Bentley/G-Wagon dealers like Al Tayer/AGMC) and a **"presented by
  [bank]"** auction frame (Emirates NBD / Mashreq / FAB — the plate-buyer
  audience is HNW banking).
- **B2B playable marketing:** a bank/telco runs it as a **CSR/charity
  activation** tied to a real Plates-of-Hope-style event; an auto dealer as a
  test-drive lead-gen toy.
- **Risk (panel):** auction/bidding optics can read gambling-adjacent —
  sensitive post-2025 regulation and a hard no for conservative bank/government
  legal. Charity framing is mandatory; keep it prestige-philanthropy, never
  real-money or chance-framed.

## Deferred
- Live VS (WebRTC) — only after async duels prove demand (mirrors SOCIAL.md).
- HaLuach board: a "national net-worth" leaderboard (opt-in), daily marquee board.
- More lots/emirates, seasonal charity tie-ins, an Abu Dhabi plate set.

## Sources
- ../research/uae-market.md (plate auctions, market, charity framing)
- https://www.semafor.com/article/01/08/2025/uae-sets-records-for-multimillion-dollar-license-plate-auctions
- SOCIAL.md (URL-duel rung 1, 36h forfeit rule), MONETIZATION.md (P2/P3)
</content>
