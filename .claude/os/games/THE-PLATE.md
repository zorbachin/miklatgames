# 🏎️ THE PLATE — design doc (concept / factory stage 1) · RACING PIVOT

_Working title. UAE viral flagship — ship-first per the 10M panel
(`../UAE-LOCALIZATION.md`). Research: `../research/uae-market.md`._
_**v2 pivot (2026-06-13, Zorba):** the plate is won in a STREET RACE, not an
auction. "Race their car, take their plate." (v1 auction concept kept as a
deferred mode — see bottom.) The pivot keeps the status-object prize + the
"I took plate 7 from you" steal, and **removes the gambling-adjacency risk** the
monetization panel flagged as v1's ceiling — a race is sport, not betting._
_Pitch: **"Dubai street racing where the prize is the plate. Beat the rival,
take his number. Climb from a D-plate clunker to single-digit on a hypercar."**_
_Cultural hook: Dubai supercar + Sheikh Zayed Road racing culture, fused with
the plate-code status grammar (single-digit = god-tier)._

## Research: what proven game is this adapted from?
| Source mechanic | Why it works | The Plate adaptation |
|---|---|---|
| **"Race for Pinks" / pink-slip racing** (Need for Speed, F&F) | The ultimate stake — winner takes the loser's prize; instant drama, instant flex | Winner takes the loser's **plate** onto their own car. Higher-prestige rivals = wager your own plate to enter |
| **SLIDE + GAS** (house control, `GENRES.md`; reuses the **chariot engine**) | One learnable verb; slide to steer, hold to surge — already shipped & panel-reviewed | Slide to weave SZR traffic, hold the pedal to overtake; beat the rival to the line |
| **Ghost racing** (`SOCIAL.md` rung 2) | Async that *feels* live; position snapshots (~1-2KB), not input replay → no float desync | Race your friend's translucent ghost; win = take their plate. The duel IS the share |
| **Trivia Crack 36h-or-forfeit** | Respond-or-lose obligation | A challenge race forfeits the plate to the challenger if unanswered in 36h |
| **Top Trumps / collection flex** | A visible garage of status objects + a net-worth ladder | Won plates + cars fill a **garage**; plate codes (single-letter → digit-count) are the prestige ladder |
| **Wordle / daily seed** | One shared, comparable run = a communal ritual | **Daily Grand Prix** — same seeded track, rivals & traffic for everyone, resets midnight GST |

## The plate-code status grammar (kept — it's the cultural literacy)
Fewer digits + earlier letter = more prestige: `1` ≫ `7` ≫ `55` ≫ `AA 12` ≫
`Q 8842`. A better plate rides a better car — so the ladder you climb is visible
on the road: the rival you must beat for plate "7" is driving the hypercar you want.

## v1 scope (proposed — factory stage 2 once Zorba approves)
- Single-file canvas, offline SW, **EN + Arabic (RTL)**, GoatCounter events,
  `?beat=`/`?race=` ghost-duel links, localStorage garage + clout (`plate_*`).
- Core loop: pick a rival (each wears a plate of some prestige) → **race** SLIDE+GAS
  down a Dubai strip, dodge traffic, beat them to the line → win = their plate
  onto your car + clout; lose = no plate (and lose your wager if you staked one).
- **Ghost-duel:** encode the run as position snapshots (SOCIAL.md rung 2) — small
  ghosts ride in the URL, longer ones via the board-worker blob. Receiver races
  the SAME seeded track against your ghost, gets a 👑/💨 result + rematch link.
- **Garage** with the "lossy skyline" steal: a gap where a skipped day's plate/car
  should be (visible-streak shame).
- Share card 1080×1350 (pure canvas): the plate big, "took plate '7' off [rival]
  at 290 km/h," clout score, "race me for it →" + miklatgames.fun.
- Events: `evt-plate-start / -win / -loss / -steal / -share / -duel`.

## Panel-lens re-read on the pivot (full stage-3 panel pending build)
The 10M panel's v1 verdict (PLATE = viral 8 / retention 7.5 / stability 7.5 /
monetization 6.5). Racing changes it as follows:
- **Virality ⬆️ (8 → ~8.5):** the steal now has a *clip* — an overtake at the
  line, not a bid number. Same "I took plate 7 from [name]" card, more watchable.
- **Monetization ⬆️ (6.5 → ~8):** **the pivot fixes v1's biggest risk.** No
  bidding = no gambling read → banks AND government/tourism buyers re-open, and
  the natural sponsor (auto brands) is a bigger, cleaner buyer. Cars are native
  ad inventory by definition (the reward IS the brand). See `../CORPORATE-ENGINE.md`.
- **Retention ≈ (7.5):** Daily Grand Prix + 36h forfeit ghost-duel + lossy garage
  = same obligation spine; winnings buy faster cars / race entries (the sink).
- **Stability ⚠️ (7.5 → ~6.5, mitigated):** racing is more to build than an
  auction — BUT it **reuses the already-shipped, panel-reviewed chariot SLIDE+GAS
  engine** (camera-scroll, traffic, crash limits all exist), and ghost-racing's
  snapshot approach (not input-replay) sidesteps cross-device float desync. Still
  the must-do shared mandate: Eastern-Arabic digits, seeded **integer** PRNG
  (rivals/traffic identical across devices), `fonts.ready` gate, URL-safe base64
  codec with version byte; cap URL ghosts, overflow to the board worker.

## Monetization (per CORPORATE-ENGINE.md)
- **Native:** auto-brand **car skins** (McLaren/Lambo/Nissan GT-R; dealers
  Al Tayer/AGMC) — the reward is the brand; **trackside billboards** on the SZR
  strip (real OOH analog — but keep them OFF the share card per the virality rule);
  tire/fuel/telco sponsors.
- **B2B playable marketing:** "Race for *our* dealership's car," an auto-launch
  microsite, a DET "race the Dubai strip" tourism piece (now brand-safe).
- **Risk:** street-racing optics — keep it arcade/legal-strip framed (sanctioned
  drag event, not reckless street racing) for government/tourism buyers.

## Deferred
- **Auction Mode (the v1 concept):** unlock the **"Most Noble Numbers" charity
  auction** for the legendary single-digit plates you can't win on the track —
  best of both, and keeps the real charity story as a PR moment.
- Live VS (WebRTC, SOCIAL.md rung 3) after async ghosts prove demand; HaLuach
  "national net-worth" board; more strips/emirates; seasonal car drops.

## Sources
- ../research/uae-market.md (plate auctions, status grammar, Dubai car culture)
- ../SOCIAL.md (ghost racing rung 2, 36h forfeit) · ../CORPORATE-ENGINE.md
- changinghistory/chariot (SLIDE+GAS engine to reuse) · ../games/SHUK-SHOPPER.md
</content>
