# HATZOLAH — Stage 1 concept research

**Status:** Concept batch 01. Ready for Zorba review before code.

**Working pitch:** *Crazy Taxi energy, rebuilt around an Israeli ambulance shift: race across living Israeli cities, answer dispatch calls, reach wildly different people, and get them safely to care before the clock runs out.*

**Cultural hook:** One arcade shift becomes a cross-section of Israel. Every pickup changes the neighborhood, language, personality, traffic pattern, and human story. The fantasy is not reckless emergency driving; it is becoming the responder who knows the city, keeps calm, and gets there.

## Proven loop being adapted

The classic Crazy Taxi loop is a score-attack structure built around: locating a passenger, committing to a trip, a second delivery timer, a directional destination cue, skill bonuses, a persistent overall session clock, and rapid re-entry into the next fare. We keep the *structure* and replace the taxi-specific fantasy, money, protected presentation, stunts, characters, map, music, branding, and art.

### Translation table

| Crazy Taxi function | Hatzolah adaptation |
| --- | --- |
| Roaming passenger markers | Dispatch call markers / call cards |
| Passenger pickup | Reach scene + stop in response zone |
| Passenger destination | Hospital / clinic / handoff destination |
| Fare timer | Response window |
| Overall arcade timer | Shift clock |
| Money / tips | Service score |
| Green directional arrow | Dispatch route beacon |
| Stunt combo | Clean-response combo |
| Near misses / reckless driving | **Removed** — no reward for unsafe driving |
| Drift / jump shortcuts | Controlled cornering, route knowledge, legal shortcut gates |
| Different drivers / cars | Ambulance handling profiles / crews later |
| Crazy Box mini-games | Responder driving drills later |

## Core loop

1. **DISPATCH** — 2–3 equal-priority calls pulse on the city radar. Each shows distance, rough response window, and a tiny patient portrait/silhouette. Player picks one.
2. **RESPOND** — chase-camera arcade driving through traffic. Route beacon points generally toward the scene but does not solve the road network.
3. **CLEAR THE CITY** — use siren timing before intersections to make traffic open a lane. Good anticipation builds a Clear Lane streak; late or spammed siren use gives no bonus.
4. **ARRIVE** — brake inside a glowing scene zone and come to a controlled stop. A 1–2 second load/handoff animation replaces any medical mini-game.
5. **TRANSPORT / HANDOFF** — the destination becomes active. The response window continues; hard collisions and bad driving reduce service score, not patient health graphics.
6. **COMPLETE** — stop accurately in the receiving bay. Fast + smooth + efficient runs add time to the shift clock and chain a combo.
7. **NEXT CALL** — the next dispatch arrives immediately. No menu break unless the player pauses.

A run should feel like: **spot → commit → weave → clear → stop → carry → handoff → instantly go again.**

## Controls

### Mobile, landscape-first
- **Left thumb:** steer via horizontal drag / virtual wheel.
- **Right thumb:** hold accelerator; drag down or tap brake.
- **Large siren button:** clears cooperative traffic ahead when timed before an intersection; cooldown prevents spam.
- **Tap call card:** accept one of the active dispatches.
- **Optional swipe up:** short acceleration burst only on clear road; it never phases through traffic and is cancelled by collision.

### Desktop
- WASD / arrows = steer + accelerate/brake.
- Space = siren.
- Enter / 1–3 = accept highlighted call.
- Shift = controlled hard brake.

No jump button, weapon, ramming, or collision reward.

## Scoring

The game replaces fares with a **Service Score**. Score should communicate speed *and* professionalism.

### Base score per completed call
- **Response speed — 40%**: how much response window remained.
- **Safe driving — 30%**: collisions, curb strikes, hard impacts, red-zone driving penalties.
- **Route efficiency — 20%**: distance vs. best reasonable route; rewards learning the map.
- **Handoff precision — 10%**: clean stop in scene and receiving zones.

### Positive combo events
- **CLEAR LANE xN** — correctly time siren use through consecutive intersections.
- **SMOOTH RIDE** — complete leg without collision / hard impact.
- **LOCAL KNOWLEDGE** — take a discoverable shortcut gate.
- **PERFECT BAY** — stop centered in the pickup or hospital zone.
- **ON A ROLL** — consecutive completed calls without a reassignment.

### Explicitly not rewarded
- Near misses.
- Hitting traffic or pedestrians.
- Driving on sidewalks.
- Causing crashes.
- Treating a patient condition as a joke.

## Urgency mechanics

### 1. Shift clock
A 2:30–3:00 arcade session clock is always running. Clean successful calls add roughly 8–20 seconds depending on call length. This preserves the classic “one more run” pressure.

### 2. Response window
Every accepted call starts a second countdown. The HUD shows time numerically plus a shrinking ring around the call portrait. If it expires, dispatch reassigns the call and the combo breaks. No death screen, gore, or implied medical outcome.

### 3. Traffic cooperation
The siren is a skill mechanic, not a turbo. Triggering it early causes cars ahead to begin pulling aside; using it too late leaves a messy intersection. The player learns anticipation.

### 4. Road-state events
Construction, delivery trucks, buses, scooters, market streets, rain, tourist congestion, and temporary closures create route decisions without turning civilians into targets.

### 5. Clean pressure
The optimal play is **fast, smooth, knowledgeable**. Recklessness can be faster for a few seconds but loses enough safety score to be a bad strategy.

## Patient / passenger personality system

Every patient is generated from independent layers so diversity feels human rather than stereotyped.

### Identity layer
- Name.
- Age band.
- Neighborhood / city relationship: local, commuter, tourist, new immigrant, visiting family.
- Visible cultural cues only where art has been reviewed for accuracy.
- Spoken language pack: Hebrew, Arabic, English, Russian, French, Amharic, etc. Dialogue can fall back to Hebrew/English until localized.

### Personality layer
- Calm ↔ anxious.
- Quiet ↔ talkative.
- Dry humor ↔ serious.
- Local navigator ↔ unfamiliar with area.
- Alone ↔ family/friend escort.

### Reactive dialogue layer
Lines can trigger on:
- Fast response.
- A rough bump.
- A known shortcut.
- Entering a recognizable district.
- Arrival at care.

Dialogue is short and characterful, but **never diagnoses, prescribes treatment, or makes ethnicity/religion the punchline**.

### Diversity rule
Medical scenario assignment is independent from ethnicity, religion, language, or class. No group becomes “the asthma patient,” “the accident patient,” etc. The roster should feel like a cross-section of Israeli society over many runs.

## City structure

Each city is a compact arcade caricature of its road logic, not a GPS replica. A city should be learnable in 5–10 runs and full of route secrets.

### Launch / pitch cities
1. **Tel Aviv–Yafo** — flat, dense, one-way streets, buses, scooters, beach roads, construction, quick alley connectors.
2. **Jerusalem** — hills, stone corridors, sharp elevation changes, light-rail crossings, market congestion, narrow approach roads.
3. **Haifa** — steep switchbacks, Carmel climbs, tunnel/bridge choices, port-level roads.
4. **Be’er Sheva** — wider roads, roundabouts, desert glare, campus/market traffic, longer high-speed connectors.
5. **Nazareth** — hills, old-city approaches, tight streets, market density, short technical routes.
6. **Eilat** — resort roads, desert edges, hotel traffic, heat shimmer, longer clear stretches interrupted by congestion.

### MVP scope
- **Playable:** Tel Aviv–Yafo + Jerusalem.
- **Pitch art / locked roadmap:** Haifa, Be’er Sheva, Nazareth, Eilat.
- 8–12 patients per playable city.
- 3–5 receiving destinations per city.
- 1 ambulance handling profile.
- 3-minute score attack + daily seeded shift.
- EN/HE from day one; RTL.
- Mobile-first, offline-first, one `index.html` per Miklat repo rules.

## Eight concrete mission seeds

1. **Tel Aviv — “Beach Lane”**
   - Patient: Camille, French-Israeli graphic designer, 31, energetic but anxious.
   - Scene: near the Gordon/Dizengoff corridor after a bicycle fall.
   - Route problem: bus lane blockage + scooter traffic; beach road is longer but clearer.
   - Personality beat: recognizes a shortcut and relaxes when the player takes it.

2. **Jerusalem — “Stone Steps”**
   - Patient: Rivka, Haredi grandmother, 72, calm, dry sense of humor.
   - Scene: edge of Nachlaot after a fall.
   - Route problem: uphill approach, market spillover, light-rail crossing timing.
   - Personality beat: a family escort talks rapidly while Rivka remains composed.

3. **Haifa — “Carmel Drop”**
   - Patient: Samir, Arab-Israeli engineering student, 22, talkative and local.
   - Scene: campus district with breathing difficulty.
   - Route problem: downhill speed control vs. switchback shortcut.
   - Personality beat: gives a short local-navigation clue if the player stays smooth.

4. **Be’er Sheva — “Market Heat”**
   - Patient: Amal, Bedouin grandmother, 66, quiet and direct.
   - Scene: market area after dizziness in the heat.
   - Route problem: roundabout timing + one temporary road closure.
   - Personality beat: family member joins; sparse Arabic/Hebrew lines create warmth without exposition.

5. **Nazareth — “Closing Time”**
   - Patient: Elias, Arab-Israeli baker, 44, joking to hide nerves.
   - Scene: old-city commercial street with a hand injury.
   - Route problem: narrow approach; ambulance must stop outside and complete a short pickup animation.
   - Personality beat: points out a faster outer-ring road on transport.

6. **Eilat — “Hotel Strip”**
   - Patient: Almaz, Ethiopian-Israeli lifeguard, 27, calm and athletic.
   - Scene: hotel zone after an ankle injury.
   - Route problem: pedestrian-heavy frontage vs. fast rear service road.
   - Personality beat: reacts positively to a smooth, non-aggressive route.

7. **Ashdod — “Family Visit”**
   - Patient: Anna, Russian-speaking Israeli, 58, skeptical then appreciative.
   - Scene: residential block after a household fall.
   - Route problem: school-zone congestion and a blocked main avenue.
   - Personality beat: starts in Russian, switches to Hebrew; companion interprets if localization is not active.

8. **Tiberias — “Lakeside Curve”**
   - Patient: Noam, Israeli tour guide, 36, chatty and funny.
   - Scene: lakeside promenade with heat-related symptoms.
   - Route problem: lakeside tourist traffic vs. steep inland bypass.
   - Personality beat: narrates landmarks in tiny fragments when the driving is calm.

These are **mission seeds, not medical simulations**. Final condition wording and any organization-specific procedures should be reviewed with the Hatzolah partner before release.

## Art / tone

Carry forward Miklat’s premium-playful arcade identity: dark navy, warm gold, mint, coral, cream; bold readable silhouettes; affectionate Israeli detail; never grim or militarized. Camera should feel like a high three-quarter chase view with exaggerated readable streets and traffic.

Do **not** publicly use an organization’s logo, official ambulance livery, uniforms, insignia, or endorsement language until partnership approval. Pitch build can use neutral “Miklat Rescue” livery and then swap to approved branding.

## Retention hooks that fit the repo
- Daily seeded shift: same calls/traffic seed for everyone.
- Score-bearing challenge links: “Beat my 14,820 in Jerusalem.”
- City mastery badges based on clean response streaks.
- Weekly featured city.
- Patient roster collection as a human “people of Israel” album, not a gacha economy.

## Deferred roadmap
- Additional cities and districts.
- Multiple ambulance handling profiles.
- Partner-approved responder facts between runs.
- Co-op driver/navigator mode.
- Driving drills.
- Sponsored city packs / fundraising integration.
- Full 3D build only if the web prototype validates the loop.

## Stage gate

**Approve or revise:**
1. One-line pitch.
2. Cultural hook.
3. Whether public working title should use “Hatzolah” before formal partner approval.
4. Whether MVP starts Tel Aviv + Jerusalem or one city only for speed.

Once approved, Claude should move to Stage 2 using `hatzolah/WORLD.md` and `hatzolah/missions.json` as the canonical concept inputs. Do not skip the headless logic pass before art.
