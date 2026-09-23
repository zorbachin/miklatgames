# Miklat Hatzolah — Visual Batch 02

## Purpose
Create a proof-of-concept visual language for an original Israeli arcade ambulance game that captures the speed, clarity, personality, and repeated pickup-to-destination rhythm of a great arcade driving game without copying Crazy Taxi artwork, typography, characters, music, logos, vehicles, city design, or branding.

**Core visual idea:** emergency arcade realism.

Emotional rhythm: **DISPATCH → ACCELERATION → CITY CHAOS → HUMAN MOMENT → RACE TO CARE → CLEAN HANDOFF → NEXT CALL.**

## 1. Visual system

### Overall art direction
- Low third-person chase camera, slightly wider lens than a racing simulator.
- Stylized realism rather than cartoon art.
- Mediterranean daylight as base lighting; golden late-afternoon warmth; selected blue-hour/night missions.
- Strong wheel motion, suspension bounce, subtle camera vibration, road reflections, siren light wash.
- Patients and bystanders expressive but grounded. No caricature or exaggerated ethnic markers.
- At gameplay speed, the player should identify route, ambulance, mission target, hospital, and traffic threat in under one second.

### Palette
Base world: warm limestone/sand, sun-faded concrete, Mediterranean teal, asphalt charcoal, eucalyptus/olive green.

Emergency layer: ambulance white, deep medical blue, restrained red emergency accent, cyan route guidance, amber caution/intersection timing.

Avoid fluorescent yellow-red-black punk styling, checkerboards, graffiti typography, and other visual cues strongly associated with Crazy Taxi.

### Typography
Modern condensed sans-serif for timer/urgency values. Clean bilingual sans-serif for Hebrew/English labels. The HUD should feel like a contemporary emergency-response interface crossed with an arcade score system, not a retro taxi meter.

### Ambulance
Hero vehicle: compact-to-mid-size Israeli urban ambulance with white body, blue medical striping, rooftop light bar, rear medical compartment, roof vents, side utility doors, and believable emergency markings.

Until Hatzolah licensing is approved, use fictional **MIKLAT RESCUE** or neutral emergency markings. Avoid copying a specific real fleet livery.

Silhouette requirements:
- instantly readable from rear three-quarter view
- tall/substantial but agile enough for urban play
- blue/red light spill reflects across road signs, windows, and stone walls

### Street language
Use everyday Israeli detail rather than postcard collage:
- Hebrew/Arabic/English wayfinding
- white and red-white curbs where appropriate
- scooters, buses, delivery bikes, compact cars
- balconies, AC units, awnings, stone facades, solar water heaters, shade structures
- dense pedestrian crossings
- bus lanes, traffic circles, construction detours

## 2. City differentiation

### Tel Aviv
Fast, flat, dense, bright, improvisational. White Bauhaus blocks, glass towers in distance, scooters, bike lanes, cafe awnings, boulevards, sea light, construction. Challenge: scooters, buses, blocked lanes, short blocks, sudden crossings.

### Jerusalem
Elevation, compression, stone, sharp turns. Jerusalem limestone, retaining walls, steep climbs, mixed old/new infrastructure, light rail corridors. Challenge: hills, bottlenecks, tight turns, rail crossings. Signature shot: blue siren light rippling across warm stone.

### Haifa
Vertical city, switchbacks, hillside neighborhoods, sea/port views, terraced roads. Challenge: downhill braking and split-level routing.

### Be’er Sheva
Broad roads, heat, distance, desert edge, low-rise neighborhoods, wide arterials. Challenge: long emergency runs punctuated by roundabouts.

### Nazareth
Dense slope, old/new street weave, commercial signs, pedestrian-heavy streets. Challenge: tight clearance and navigation.

### Eilat
Resort speed, desert/sea contrast, red mountains, palms, bright hotels. Challenge: tourist traffic and long straights.

### Ashdod
Planned avenues, port context, modern towers, landscaped medians. Challenge: large intersections and freight traffic.

### Tiberias
Lakeside curves, hill-to-water transitions, older commercial strip. Challenge: curves and narrow access roads.

## 3. UI / HUD

Primary HUD elements:
1. **RESPONSE CLOCK** — top center
2. **ROUTE ARROW / NEXT TURN** — cyan directional chevron
3. **PATIENT STATUS** — upper right: stable / watch / urgent
4. **SERVICE SCORE** — upper left
5. **SIREN STATE** — lower center: OFF / CLEARING / PRIORITY

Brief feedback examples:
- SAFE CLEAR +150
- EARLY SIREN +100
- SMOOTH STOP +200
- WRONG TURN -3 SEC
- HARD IMPACT score penalty

Behavior:
- dark translucent glass panels
- EN/HE global language switch
- subtle projected cyan route ribbon on road surface
- urgency conveyed by timer/pulse animation rather than full-screen red flashing

## 4. Human / patient system

Build each patient from independent attributes: age, language preference, neighborhood, personality, mobility, medical scenario, family/bystander context, and urgency.

The roster can naturally include Jewish Israelis from varied backgrounds, Arab Israelis, Bedouin Israelis, Haredi characters, Ethiopian Israelis, Russian-speaking Israelis, French olim, secular Tel Aviv residents, tourists, and others. Never mechanically bind ethnicity/religion to one disease, one personality, or one neighborhood stereotype.

Example characters:
- elderly Hebrew-speaking man insisting he can walk himself
- young Arab-Israeli mother holding a child and directing the medic in Arabic/Hebrew
- Haredi teenager with a worried older sibling
- Ethiopian-Israeli grandmother with shopping trolley and concerned neighbors
- French oleh chef in apron joking to mask anxiety
- Tel Aviv beach volleyball player with an ankle injury
- construction worker with dust on clothes and a foreman translating details
- tourist showing medication information on a phone

## 5. Key screens

### Mission start / dispatch
Camera begins overhead on a simplified city grid and drops toward the ambulance.

```text
CALL 07:42
CHEST PAIN
DIZENGOFF / GORDON
2.1 KM
PRIORITY 1
```

Radio waveform animates. One dispatcher line. Player taps RESPOND. Camera settles behind ambulance as doors close and lights activate.

### Patient pickup
Ambulance arrival and braking matter. Game slows to 70% for ~1.5 seconds. Camera shifts to curb-level three-quarter. Patient and bystander are framed clearly. A two-line human beat plays; loading is represented quickly and respectfully.

Example:
> Patient: “I’m fine. My daughter is overreacting.”
> Daughter: “He said that ten minutes ago too.”

UI: **DESTINATION LOCKED — ICHILOV**.

### Hospital arrival
Hospital entrance readable 300m out using blue beacon column and clear signage. Final 100m reduces music and emphasizes siren/engine/dispatch audio. Player must stop inside a clean arrival box.

```text
HANDOFF COMPLETE
RESPONSE 02:48
SAFE CLEAR x5
ROUTE 92%
PATIENT STABLE
SERVICE SCORE +4,860
NEXT CALL →
```

## 6. 12-frame proof-of-concept storyboard

1. **Cold open:** dark ambulance light bar, one blue pulse, engine catches. Text: EVERY SECOND HAS A STREET.
2. **Dispatch:** top-down Tel Aviv block map; red call pin; camera plunges toward street.
3. **Launch:** rear three-quarter hero angle; ambulance pulls hard from curb; clock starts.
4. **City skill:** scooter cuts lane, bus blocks left; player triggers siren before intersection; cars open a corridor; EARLY SIREN +100.
5. **Route choice:** arterial congestion vs narrow side street; cyan route updates dynamically.
6. **Patient human beat:** older man outside small cafe with daughter; quick grounded exchange.
7. **Transport:** brief rear-partition glimpse; back to chase view; status WATCH.
8. **Jerusalem cut:** match cut from Tel Aviv white facade to Jerusalem stone; steep uphill road.
9. **Multi-city montage:** Haifa switchback; Be’er Sheva roundabout; Eilat road with desert mountains.
10. **Diverse calls:** rapid 4-up montage of ages/backgrounds/contexts; UI call cards, not identity labels.
11. **Hospital handoff:** clean marked-bay arrival; timer freezes; Service Score rises.
12. **Title:** MIKLAT HATZOLAH — RESPOND. DRIVE. DELIVER CARE.

## 7. Image-generation prompt pack

### Global style prefix
> Original third-person arcade emergency-response game concept art, stylized photorealism, contemporary Israel, believable urban materials, cinematic Mediterranean light, energetic low chase camera, realistic compact urban ambulance with fictional blue medical markings, crisp modern game HUD, subtle cyan route guidance, strong motion and readable composition, humanistic character design, no logos from existing games, no graffiti-punk taxi aesthetic, no copyrighted characters, 16:9.

### A — Tel Aviv hero gameplay
Rear three-quarter chase view of a white-and-blue fictional Israeli ambulance accelerating down a busy central Tel Aviv boulevard, Bauhaus apartments, scooters, cafe awnings, city buses and trees, Mediterranean midday light, cars beginning to pull aside as siren activates, subtle cyan route ribbon painted onto the road surface, modern arcade HUD with response timer and service score, speed and suspension motion, clean readable lane geometry.

### B — Jerusalem hero gameplay
Low third-person chase view of the same fictional ambulance climbing a steep Jerusalem road, limestone retaining walls and contemporary stone buildings, blue siren reflections washing across warm stone, traffic squeezing toward the curb, evening sun and deep shadows, modern bilingual navigation HUD, dramatic incline, no ancient-monument postcard composition.

### C — Tel Aviv pickup
Curb-level three-quarter shot beside a small Tel Aviv cafe, the ambulance stopped precisely at the curb, an elderly man seated and alert with his adult daughter beside him, two paramedics approaching quickly but calmly, scooters and cafe chairs in background, grounded human expressions, emergency lights reflecting in windows, game pickup UI reading PATIENT LOCATED, no gore, no melodrama.

### D — Hospital arrival
Third-person gameplay shot approaching a modern Israeli hospital emergency entrance, ambulance centered in frame, blue arrival beacon integrated into game world, clear drop-off lane and covered entry, evening light, response timer at top center, patient status upper right, cyan route ending at the marked bay, sense of relief and precision.

### E — Haifa
Same ambulance descending a steep Haifa switchback with Mediterranean sea and port glimpsed beyond hillside apartments, trees, retaining walls and layered roads, strong downhill sense of speed, crisp arcade HUD, safe but aggressive emergency driving, realistic Israeli road markings.

### F — Be’er Sheva
Same ambulance crossing a large Be’er Sheva roundabout under hard desert daylight, low-rise city, dry landscaping, hospital district in distance, broad roads and long sight lines, modern arcade navigation HUD, high-speed emergency response without collisions.

### G — Eilat
Same ambulance on an Eilat arterial, red desert mountains behind modern hotels and palms, turquoise sea glimpse, intense clean daylight, tourist traffic moving aside, cyan route line, polished contemporary arcade game composition.

### H — Character contact sheet
Character concept sheet for a humanistic Israeli emergency-response arcade game, eight ordinary patients and bystanders of varied ages and backgrounds, contemporary everyday clothing, natural body types and expressions, Jewish, Arab, Bedouin, Haredi, Ethiopian-Israeli, Russian-speaking, French oleh and tourist representation without caricature or costume stereotypes, front three-quarter portrait plus small full-body pose, neutral studio backdrop, consistent realistic game character rendering.

### I — Dispatch screen
Game UI concept screen, top-down stylized Tel Aviv street grid with one emergency call pulsing, clean dark translucent information panel reading CALL / CHEST PAIN / 2.1 KM / PRIORITY 1, bilingual Hebrew-English system styling, cyan route preview, compact ambulance icon, modern emergency dashboard aesthetic, no taxi meter design.

### J — HUD overlay
UI-only design sheet for a contemporary arcade ambulance game: response timer, service score, siren state, patient status pulse, route arrow, safe-clear bonus, bilingual Hebrew-English typography, dark translucent panels, cyan navigation accents, restrained red urgency cues, clean functional emergency-response aesthetic, no retro taxi motifs.

### K — Title screen
Cinematic title screen for an original Israeli emergency-response arcade game, white-and-blue ambulance parked at night on a wet urban street, blue light reflecting across Hebrew road signs and stone/concrete facades, empty space for title MIKLAT HATZOLAH, sophisticated modern game key art, tense but hopeful, no violence.

### L — Multi-city key art
Wide cinematic montage composition centered on one fictional Israeli ambulance, Tel Aviv white city on left, Jerusalem limestone climb on right, Haifa sea hillside above, Be’er Sheva desert road below, visual transitions blended through roads rather than collage borders, diverse ordinary civilians in subtle background vignettes, contemporary arcade game key art.

## 8. 35-second proof-of-concept trailer

- **0:00–0:02** black screen, dispatch tone, single blue flash.
- **0:02–0:05** overhead Tel Aviv map, call pin hits, camera dives.
- **0:05–0:09** ambulance launch; engine + siren; RESPONSE CLOCK begins.
- **0:09–0:13** intersection gameplay; player activates siren early; traffic opens; +100.
- **0:13–0:16** shortcut down tight side street; cyan route bends in real time.
- **0:16–0:20** patient pickup; one human line; DESTINATION LOCKED.
- **0:20–0:23** transport at speed; stable-driving bonus builds.
- **0:23–0:28** Jerusalem, Haifa, Be’er Sheva, Eilat montage.
- **0:28–0:31** hospital arrival; precision stop; timer freezes.
- **0:31–0:33** HANDOFF COMPLETE / SERVICE SCORE 4,860.
- **0:33–0:35** title card: MIKLAT HATZOLAH — RESPOND. DRIVE. DELIVER CARE.

### Sound design
Dispatch chirp, ignition/door slam, plausible siren motif, tire/road texture, restrained city beds. Music should build with percussion and forward motion rather than punk-rock imitation. Drop music briefly at patient contact and hospital arrival.

## 9. Shared Drive organization

Shared Drive root: **Miklat Games / Hatzolah**

- `01_VISUAL_SYSTEM/`
  - palette reference
  - ambulance turnaround
  - HUD sheet
  - typography sheet
  - character style sheet
- `02_STORYBOARD/`
  - `SB_01_COLD_OPEN.png`
  - `SB_02_DISPATCH.png`
  - `SB_03_LAUNCH.png`
  - `SB_04_INTERSECTION.png`
  - `SB_05_ROUTE_CHOICE.png`
  - `SB_06_PICKUP.png`
  - `SB_07_TRANSPORT.png`
  - `SB_08_JERUSALEM.png`
  - `SB_09_CITY_MONTAGE.png`
  - `SB_10_PATIENT_MONTAGE.png`
  - `SB_11_HANDOFF.png`
  - `SB_12_TITLE.png`
- `03_GENERATION_PROMPTS/`
  - keep this document as canonical prompt source
  - generated images retain exact prompt letter, e.g. `PROMPT_A_TEL_AVIV_v01.png`
  - never overwrite approved art; increment version
- `04_TRAILER/`
  - `TRAILER_35SEC_SCRIPT.md`
  - `TRAILER_SHOTLIST.csv`
  - `selects/`
  - `audio/`
  - `exports/`

## 10. Existing Miklat assets to audit / reuse

The shared Miklat Games root already contains:
- `MIKLAT GAMES 🚨 — games from the shelter.png`
- `home screen.mp3`
- `Galactic Arcade Rush.mp3` and alternate
- `Level Two Invaders.mp3` and alternate
- `Temple Dash.mp3`
- `Jericho Run.mp3`
- `Temple Run Shalom.mp3` and alternate
- a large batch of legacy ChatGPT-generated images from June 11

Treat these as an asset library, not automatic canon. Reuse the Miklat master brand where it fits. Existing music can be used for internal prototype cuts if rights/provenance are clear; otherwise use it only as mood reference. Do not force old artwork into the Hatzolah visual language if it conflicts with this system.

## 11. First build order for Claude

1. Lock ambulance rear-three-quarter design.
2. Generate Tel Aviv gameplay hero frame.
3. Generate Jerusalem gameplay hero frame.
4. Generate HUD sheet.
5. Generate one patient pickup frame.
6. Generate hospital handoff frame.
7. Assemble 12 storyboard frames using consistent ambulance/HUD references.
8. Build a 35-second animatic before producing more cities.

Do not expand the asset count until **Tel Aviv → pickup → hospital** reads instantly as one coherent game.

## 12. Guardrails

- Use Crazy Taxi only as structural inspiration for pace, loop clarity, and arcade immediacy.
- No copied logo construction, lettering, flames, checkers, taxi silhouettes, character archetypes, music cues, city layouts, or UI.
- No reckless-driving reward language. Reward anticipation, route intelligence, safe speed, siren timing, and precision.
- No comedy built around medical suffering.
- No ethnic/religious stereotype as gameplay shorthand.
- Any real Hatzolah marks, uniforms, vehicle liveries, or facilities require permission before public use.

## End state
The proof should make a viewer understand the product in five seconds: **“I’m an ambulance driver in a fast Israeli arcade game.”**

It should make the Hatzolah audience understand the emotional value in thirty seconds: every neighborhood is different, every patient is a person, and the fun comes from getting better at getting people to care quickly and safely.
