# 🌆 DUBAI LIFE — design doc (concept / factory stage 1)

_Working title (a.k.a. "Balagan, but for Sheikh Zayed Road"). The corporate
engine's showcase title + the UAE social daily. Research: `../research/uae-market.md`.
Plugs into `../CORPORATE-ENGINE.md` and `../SOCIAL.md`._
_Pitch: **"Survive a day in Dubai — find parking at the Dubai Mall, beat Sheikh
Zayed Road, make your Gazebo reservation on time."** A grab-bag of bite-size
micro-games about modern Dubai daily life, tied into one shared **Daily Run**
you duel your friends on._
_Cultural hook: the everyday, lovingly-relatable Dubai chaos every resident
knows — the legendary Dubai Mall parking hunt, SZR traffic, the Friday brunch
scramble. Recognition, not aspiration. (Mirrors how Balagan mines Israeli daily
life for the group chat.)_

## Research: what proven game is this adapted from?
This **reuses the Changing History architecture wholesale** (`changinghistory/GENRES.md`,
`PANEL-VERDICT.md`): "mechanics are engines, events are data." Each Dubai
vignette is one micro-game built from the existing locked control vocabulary —
new content is data, not new engines. That's why this is *cheap to build and
safe to ship* (stability panel's favorite property).

| Source | Why it works | Dubai Life adaptation |
|---|---|---|
| **WarioWare / Changing History grab-bag** | Variety of genre with one shared wrapper; clear in 3s, fun on tap 1 | Each Dubai location is a micro-game; the "day" is the wrapper |
| **Wordle / Balagan daily** | One shared seeded run = a communal, comparable ritual | **The Daily Run** — same seeded sequence of micro-games for everyone, resets midnight GST |
| **Trivia Crack / SOCIAL.md URL-duel** | Respond-or-forfeit obligation | Send your Daily Run as a `?beat=` URL-duel; friend plays the same day, compares |

## The micro-games (events = data; each uses a GENRES.md scheme)
| Vignette | Scheme | The bit | Limit |
|---|---|---|---|
| 🅿️ **Find Parking @ Dubai Mall** (the headliner) | TAP-TARGETS / TIME-IT | circle the packed lot, grab the open spot before a rival driver snipes it | patience/fuel meter + N attempts |
| 🛣️ **Sheikh Zayed Road** | SLIDE + GAS | weave lanes down SZR without clipping (reuse chariot/shuk engine) | 3 near-misses |
| 🍛 **Make the Gazebo Reservation** | SLIDE + GAS runner | dash through the Dubai Mall to your table before it's given away (reuse Shuk Shopper engine, reskinned) | timer to the table |
| ☕ **Brunch / metro / valet** (roadmap) | TAP-LANE / TIME-IT | future vignettes as the net fills | per-game |

**Bar each must clear (GENRES.md):** clear in 3 seconds, fun on tap 1, its own
distinct feel. Win the day → a "survived Dubai" score card; lose → "stuck in
traffic, try again."

## v1 scope (proposed — factory stage 2 once Zorba approves)
- Single-file canvas, offline SW, **EN + Arabic (RTL)**, GoatCounter events,
  `?beat=`/`?day=` URL-duel, localStorage best + streak (`dxb_*`).
- Ship the **Find Parking** micro-game first (the relatable headliner), then SZR
  + Gazebo, then assemble into the Daily Run wrapper (mirrors Changing History's
  "ship each self-contained, then assemble the hub" build order).
- Share card 1080×1350 (pure canvas): "I survived Dubai in N tries — found
  parking in 4, beat SZR, made my table with 12s to spare," day-seed badge,
  "beat my day →" + miklatgames.fun.
- Events: `evt-dxb-start / -parking / -szr / -gazebo / -day-clear / -share / -duel`.

## Panel-lens pre-read (full stage-3 panel pending build)
- **Virality:** the **relatable-pain brag** is the strongest share fuel here —
  "I found parking in 4 tries, beat me" is universally legible to anyone who's
  driven in Dubai. URL-duel on the seeded day makes it a fight, not a leaderboard.
- **Retention:** the **Daily Run + streak** is the spine (one seeded day, a
  countdown to the next, a streak baked into the share text — the exact loop the
  Changing History panel asked for as its #1 retention fix).
- **Stability:** **lowest-risk of the three UAE titles** — it reuses already-shipped,
  panel-reviewed engines (chariot, shuk, the CH dispatch); the new work is data +
  the parking micro-game. Same shared mandate: Eastern-Arabic digits, seeded
  integer PRNG (so duels resolve identically), `fonts.ready` gate.
- **Monetization:** the **corporate engine's best showcase** — every location is
  a real brand (Dubai Mall, Gazebo, an SZR auto brand), so placement = level,
  and **paid experiences** are native: win Find Parking → a real mall valet/coupon
  QR; the Gazebo run → a booking deep link. Buyers: malls, F&B (Gazebo), DET,
  auto. See `../CORPORATE-ENGINE.md`.

## Role in the lineup
The **social daily flagship** (Zorba's "Balagan for SZR") AND the cleanest
demonstration of the corporate engine — locations-as-levels make the ad surface
and the fun surface the same object. Medium effort (engine reuse), high strategic
value (proves the playable-marketing pitch to malls + tourism boards).

## Deferred
- More vignettes (brunch, metro, beach day, RTA Salik), per-emirate days, HaLuach
  "today's fastest day in Dubai" board, BAYIT co-op "family day out" (SOCIAL.md).

## Sources
- ../research/uae-market.md · ../CORPORATE-ENGINE.md · ../SOCIAL.md
- changinghistory/GENRES.md (control vocab + limits) · changinghistory/PANEL-VERDICT.md
- ../games/SHUK-SHOPPER.md (runner engine to reuse)
</content>
