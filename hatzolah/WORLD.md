# 🚑 MIKLAT HATZOLAH — world bible

**Pitch:** Crazy Taxi energy, rebuilt as an Israeli emergency-response score attack: answer dispatch calls, race through living cities, reach radically different people, and deliver them safely to care before the shift clock dies.

## Universe
- The fantasy is **mastering the city under pressure**, not reckless driving.
- A run is one compressed ambulance shift across a stylized Israeli city.
- Every successful call extends the shift clock; every reassigned call breaks the streak.
- Zero gore. No visible patient deterioration. Failure is framed as dispatch reassignment / delayed handoff.
- The city is affectionate, busy, funny, multilingual, and recognizably Israeli without turning civilians into obstacles to hit.

## Protected core loop
1. Dispatch offers 2–3 equal-priority calls.
2. Player chooses one and receives a general route beacon.
3. Drive to scene under a response timer.
4. Time siren use before intersections to open lanes.
5. Stop inside scene zone; short pickup/load animation.
6. Drive to receiving destination.
7. Stop cleanly in handoff bay.
8. Score, add time, chain immediately into the next call.

**Rhythm:** `DISPATCH → RESPOND → CLEAR → ARRIVE → TRANSPORT → HANDOFF → NEXT`.

## Controls
### Mobile
- Left thumb horizontal drag = steering.
- Right thumb hold = accelerate; pull/tap down = brake.
- Large siren button = traffic-clear mechanic with cooldown.
- Tap call card = accept.
- Swipe up on clear road = short acceleration burst.

### Desktop
- WASD / arrows = drive.
- Space = siren.
- Shift = hard brake.
- 1–3 / Enter = select call.

No jump, ramming, weapon, or near-miss reward.

## Score system
### Service Score weights
- Response speed: **40%**
- Safe driving: **30%**
- Route efficiency: **20%**
- Handoff precision: **10%**

### Combo callouts
- `CLEAR LANE xN`
- `SMOOTH RIDE`
- `LOCAL KNOWLEDGE`
- `PERFECT BAY`
- `ON A ROLL xN`

### Penalties
- Vehicle collision.
- Sidewalk / restricted-zone driving.
- Hard curb strike.
- Wrong-way shortcut abuse.
- Missing response window.

## Urgency
- **Shift clock:** target 2:30–3:00 starting time.
- **Call timer:** per accepted dispatch.
- **Completion bonus:** approximately +8 to +20 seconds depending on call length and clean score.
- **Traffic cooperation:** siren creates space only when anticipated early.
- **Road-state events:** construction, buses, scooters, market congestion, weather, temporary road closures.

## Patient character system
Each patient is built from independent data layers:

```text
identity: name, age band, city relationship, language pack
personality: calm/anxious, quiet/talkative, dry/serious, local/newcomer
social: alone, family escort, friend escort
reactivity: fast response, rough bump, shortcut, landmark, arrival
```

### Rules
- Background never determines illness, skill, morality, urgency, or humor.
- Medical scenario pool is randomized independently from identity pool.
- Dialogue never diagnoses or gives treatment instructions.
- Cultural/religious clothing and language require review before final art/VO.
- Humor can come from personality and city friction, never the condition.

## City bible

### Tel Aviv–Yafo
**Driving feel:** flat, fast, dense, impatient.
- One-way grids, buses, scooters, beach road, construction.
- Short connectors reward map learning.
- Signature choice: clogged direct route vs. longer clear coastline.

### Jerusalem
**Driving feel:** vertical, technical, compressed.
- Hills, stone corridors, rail crossings, market spillover.
- Visibility changes on climbs.
- Signature choice: steep shortcut vs. slower wide road.

### Haifa
**Driving feel:** momentum + elevation.
- Switchbacks, port level, Carmel climbs, tunnels.
- Braking skill matters downhill.

### Be’er Sheva
**Driving feel:** wider, faster, route-planning heavy.
- Roundabouts, long connectors, desert glare, campus and market zones.

### Nazareth
**Driving feel:** tight, local-knowledge heavy.
- Hills, old-city approaches, narrow commercial streets.

### Eilat
**Driving feel:** bursts of open speed interrupted by resort congestion.
- Long clear segments, service roads, hotel/pedestrian zones.

## MVP
- Playable cities: **Tel Aviv–Yafo + Jerusalem**.
- 8–12 patient identities per city.
- 8 scenario templates shared across identity pool.
- 3–5 receiving destinations per city.
- One ambulance profile.
- One 3-minute score-attack mode.
- Daily seeded shift.
- EN/HE + RTL.
- Mobile-first and offline-first.
- Single `index.html`, inline CSS/JS/canvas per repo rule.

## Visual language
Use Miklat’s premium-playful palette family:
- Navy / night base: `#0b0e1a`
- Gold: `#ffd166`
- Mint: `#7ee8c7`
- Coral emergency accent: `#ff5d5d`
- Cream: `#f4ecdd`

Camera: high three-quarter chase camera. Roads and vehicles should be exaggerated for phone readability. UI needs a huge timer, strong route beacon, tiny patient portrait, combo callouts, and one-thumb siren access.

### Brand safety
Until formal partner approval, use neutral rescue livery. Do not publish official Hatzolah logos, uniform marks, ambulance livery, or endorsement language.

## Audio
- Fast arcade bed with Israeli rhythmic flavor, not military or tragic.
- Siren must be readable but mixed below music on repeat play.
- Distinct stingers: dispatch accepted, scene arrival, handoff, combo, shift end.
- Existing Miklat music may be auditioned as temporary prototype tracks; final game should get its own identity.

## Patient roster seed
The canonical 8 mission seeds live in `missions.json` and cover Tel Aviv, Jerusalem, Haifa, Be’er Sheva, Nazareth, Eilat, Ashdod, and Tiberias with varied languages/backgrounds/personality tones.

## Systems worth protecting from existing Miklat games
- Daily synchronized mode.
- Score-bearing challenge links.
- EN/HE bilingual HUD.
- Offline-safe web game.
- Shareable score card.
- GoatCounter funnel events.

Recommended event namespace:
- `evt-hz-start`
- `evt-hz-call-accepted`
- `evt-hz-handoff`
- `evt-hz-reassigned`
- `evt-hz-share`
- `evt-hz-challenged`
- `evt-hz-city-N`

## Art pack target structure
```text
hatzolah/
  WORLD.md
  missions.json
  ASSET-MANIFEST.md
  index.html                 # Stage 2
  manifest.webmanifest       # Stage 2
  sw.js                      # Stage 2
  assets/
    prompts.json             # Stage 4
    ambulance_player.png
    bg_telaviv.png
    bg_jerusalem.png
    patient_*.png
    ui_*.png
  press/
    prompts.json             # Stage 4
    keyart_16x9.png
    icon_1x1.png
    poster_9x16.png
    itch_4x3.png
    banner_notext.png
```

## Stage 1 gate
Before code, Zorba signs off on:
- working one-line pitch;
- cultural hook;
- public use of the word “Hatzolah” vs. neutral placeholder;
- Tel Aviv + Jerusalem as the prototype pair.
