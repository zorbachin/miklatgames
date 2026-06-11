# 🌀 BALAGAN — world bible v2 (concept, stage 1 — Zorba steered: SPORTS)

**Pitch:** The Tel Aviv beach, in your pocket. Three Israeli street sports —
**matkot, beach volleyball, scooter racing** — built so every one of them is
played WITH someone. The arcade's social flagship.

**Why this beats the trivia concept (parked, see bottom):** each sport maps
1:1 onto a rung of the social architecture (SOCIAL.md) — BALAGAN becomes the
living demo of the whole social layer:

| Sport | Social mode it embodies | Infra |
|---|---|---|
| 🏓 **MATKOT** | **Companion** — co-op by nature: keep the rally alive *together* | none |
| 🏐 **VOLLEYBALL** | **VS** — 1v1 duel | none (couch) → live later |
| 🛴 **SCOOTER RACE** | **Ghost racing** — race your friend's recorded run | URL ghosts |

## 🏓 MATKOT — the companion game
The most Israeli sport that exists: no winner, no points — just two people
refusing to drop the ball. Pure cooperation.
- **One-phone couch co-op:** split screen, one thumb each side, rally counter
  climbing. The phone passes the beach to any two people in a room.
- **Solo vs. the Savta wall** (practice mode, offline).
- **Async chavruta rally:** the rally counter carries across the duo —
  you play your half today, send the link, they continue the rally tomorrow.
  *"Rally: 847 hits, 12 days — don't drop it"* = the chavruta streak made
  physical. The share line writes itself.
- Sound: that unmistakable *tok… tok… tok* (WebAudio, like siblings).

## 🏐 VOLLEYBALL — the VS game
Pikachu-Volleyball-class 1v1 (proven minimal physics: one ball, gravity, two
jumpers, a net). Gordon Beach at golden hour, sand physics, crowd of savtas.
- **Couch VS:** one phone, two thumbs (left/right halves) — instant duels.
- **Solo vs. AI** with personality tiers (Shuk Vendor → Lifeguard → Savta).
- **Async VS:** seeded ball physics + your point pattern in the duel link.
- **Live VS:** the rung-3 WebRTC candidate when duel volume earns it.

## 🛴 SCOOTER RACE — the ghost game
Race a lime scooter down the tayelet (the Mamad Dash scooter, promoted to
hero). Dodge joggers, savtas with carts, matkot crossfire, dog leashes.
- Time-trial with **position-snapshot ghosts in the URL** (SOCIAL.md rung 2)
  — race any friend's translucent run, no backend, 36h duel forfeit.
- **Daily route** (seeded) = the shared gauntlet + HaLuach board entry.
- The bridge game: scooter ghosts are the tech rehearsal for ghosts in
  Mamad Dash + Shuk Shopper.

## The daily: "YOM YAM" (beach day)
One seeded challenge across all three (e.g. 30 rally hits + first to 5 vs AI
+ tayelet time-trial) → one Wordle-grade result card:
`BALAGAN #12 🏓847 🏐5:3 🛴0:42 — yom yam! Your turn:` + duel link.

## Tone & art
Golden-hour Gordon Beach palette (sky #7ec8ff, sand #ffe2b0, lime scooter
green, matkot-paddle wood). Same cartoon language as the arcade; assets via
prompts.json packs (factory stage 4). Zero gore, zero politics, maximum
August-in-Tel-Aviv.

## Tech shape
Single file per the house pattern; three mini-games behind one menu (still
one canvas, shared physics helpers); offline-first SW; i18n EN/HE; events
`evt-bg-*`; standard factory invariants. Couch modes ship with ZERO infra;
async modes ride the URL; HaLuach/live arrive with their phases.

## Build order
1. **Matkot couch + solo** (smallest, most iconic — and the companion-mode
   proof) → 2. Scooter time-trial + URL ghosts → 3. Volleyball couch VS →
   4. Yom Yam daily card → 5. live VS (gated).

## Parked (not lost)
The trivia-duel concept (Emet o Balagan / Slang Match / Emoji Pitgam / Savta
Says) is strong but it's a different game — parked as a future door
(working name: **SAVTA SAYS 👵**), nucleus-logged.

## Zorba gates (stage 1)
1. Greenlight BALAGAN = beach sports trilogy as above?
2. Build order OK (matkot first)?
3. "Yom Yam" as the daily's name?
