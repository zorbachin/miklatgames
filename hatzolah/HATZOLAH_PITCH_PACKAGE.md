# MIKLAT HATZOLAH — FINAL PITCH PACKAGE

**Status:** internal/private pitch draft for discussion with Hatzolah leadership.  
**Brand rule:** until Hatzolah explicitly approves public use, treat **MIKLAT HATZOLAH** as a working title and use neutral **MIKLAT RESCUE** visual markings in prototypes.

## One-line hook

**An arcade emergency-response game where you race through living Israeli cities, answer calls from every part of Israeli society, and turn speed, local knowledge, siren timing, and safe driving into a score.**

Internal shorthand: **“Crazy Taxi energy, rebuilt for an ambulance.”** The gameplay structure is inspired by fast pickup-to-destination arcade loops, but the game must not copy Crazy Taxi characters, art, branding, music, maps, typography, UI, or reckless-driving reward language.

---

## 30-second verbal pitch

Imagine the immediacy of a great arcade driving game, but instead of picking up fares, you are responding to emergency calls across Israel. Dispatch sends you into Tel Aviv, Jerusalem, Haifa, Be’er Sheva, Nazareth, Eilat and beyond. Every patient is different, every neighborhood drives differently, and your score comes from arriving quickly, reading the city, clearing intersections intelligently, driving safely, and making a clean handoff at the hospital. The result is a game that is fun first, while also showing the human reality behind emergency response and the diversity of the people Hatzolah serves.

---

## Why this serves Hatzolah

1. **Makes emergency response legible.** Players feel the pressure of dispatch, navigation, traffic cooperation, scene arrival, transport, and handoff without turning the experience into a medical simulator.
2. **Humanizes the mission.** Calls feature ordinary people from different Israeli communities, ages, languages, and neighborhoods. Background is never mechanically tied to illness or personality.
3. **Shows service across society.** The game can depict Jewish, Arab, Bedouin, Haredi, Ethiopian-Israeli, Russian-speaking, French-Israeli, secular, religious, tourist, and other characters as normal parts of the same world.
4. **Creates a youth/family engagement vehicle.** The core loop is easy to understand, mobile-friendly, replayable, bilingual, and built around a score attack rather than graphic medical content.
5. **Creates a fundraising/storytelling asset.** A polished game can become a donor-engagement experience, event activation, school/community presentation tool, sponsor vehicle, and shareable social product.

The game should never imply that it teaches diagnosis or treatment. Medical wording, scenarios, uniforms, branding, and organizational representation require Hatzolah review before public release.

---

## Gameplay explanation

### Core loop

`DISPATCH → RESPOND → CLEAR → ARRIVE → TRANSPORT → HANDOFF → NEXT`

A run is a compressed ambulance shift. The player begins with a short shift clock. Dispatch presents 2–3 equal-priority calls. The player chooses one, races to the scene, uses the siren early enough to clear intersections, stops accurately in the pickup zone, transports the patient, and parks precisely in the hospital handoff bay. A good completion adds time and chains directly into the next call.

### What makes it arcade-fun

- short missions chained without downtime;
- a visible response clock plus an overall shift clock;
- route choices and local shortcuts;
- city-specific traffic problems;
- early siren timing as a skill mechanic;
- combo feedback for clean response driving;
- daily seeded shifts and challenge links;
- replayable service-score optimization.

### Service Score

- **40% response speed**
- **30% safe driving**
- **20% route efficiency**
- **10% handoff precision**

Positive feedback includes `CLEAR LANE`, `SMOOTH RIDE`, `LOCAL KNOWLEDGE`, `PERFECT BAY`, and `ON A ROLL`. The game does **not** reward ramming, near misses, sidewalk driving, collisions, or reckless stunts.

---

## Representative cities, patients and missions

These are existing Stage 1 mission seeds in `hatzolah/missions.json`; they are not final clinical scripts.

| City | Mission | Patient seed | Gameplay problem |
|---|---|---|---|
| Tel Aviv–Yafo | **Beach Lane** | Camille, 31, French-Israeli graphic designer | bus-lane blockage, scooter traffic, clogged direct route vs clearer coast route |
| Jerusalem | **Stone Steps** | Rivka, 72, Haredi grandmother | hill control, market spillover, light-rail crossing timing |
| Haifa | **Carmel Drop** | Samir, 22, Arab-Israeli engineering student | downhill braking vs switchback shortcut |
| Be’er Sheva | **Market Heat** | Amal, 66, Bedouin grandmother | roundabouts, temporary closure, rerouting |
| Nazareth | **Closing Time** | Elias, 44, Arab-Israeli baker | narrow approach and precision stop |
| Eilat | **Hotel Strip** | Almaz, 27, Ethiopian-Israeli lifeguard | pedestrian frontage vs faster rear service road |
| Ashdod | **Family Visit** | Anna, 58, Russian-speaking Israeli | school-zone congestion and blocked avenue |
| Tiberias | **Lakeside Curve** | Noam, 36, Israeli tour guide | lakeside tourist traffic vs steep inland bypass |

### Diversity rule

Patient identity is assembled from independent layers: age, language, neighborhood, personality, mobility, family/bystander context, urgency, and medical-scenario template. Ethnicity or religion must never be a shorthand for one illness, one joke, one personality, or one gameplay mechanic.

---

## Visual identity

**Art direction:** contemporary Israeli **emergency arcade realism**.

- low third-person chase camera;
- stylized realism, not cartoon imitation;
- Mediterranean daylight, warm stone, real Israeli street detail;
- readable bilingual HUD with cyan navigation accents;
- white-and-blue fictional ambulance until branding approval;
- blue/red emergency light spill on road signs, windows, stone walls and traffic;
- patients expressive and grounded, with no caricature or exaggerated ethnic markers.

### City differentiation

- **Tel Aviv:** fast, flat, scooters, buses, short blocks, Bauhaus/glass mix, sea light.
- **Jerusalem:** steep, stone, compressed, rail crossings, bottlenecks, blue siren light on warm limestone.
- **Haifa:** switchbacks, elevation, port/sea glimpses, downhill control.
- **Be’er Sheva:** wider roads, heat, roundabouts, long emergency runs.
- **Nazareth:** hills, narrow commercial streets, local-knowledge navigation.
- **Eilat:** long straights, hotel/tourist congestion, desert/sea contrast.
- **Ashdod:** planned avenues, large intersections, freight/port context.
- **Tiberias:** lakeside curves, hill-to-water transitions, narrow access roads.

### Key screens already defined

1. Dispatch / mission start
2. Tel Aviv launch
3. Intersection siren timing
4. Route-choice moment
5. Patient pickup / human beat
6. Transport
7. Jerusalem hero gameplay
8. Multi-city montage
9. Diverse-call montage
10. Hospital arrival
11. Service-score result
12. Title card

---

## Educational and cultural value

The educational value should emerge from play rather than quizzes:

- **geography:** each city has a distinct driving language and recognizable urban structure;
- **civic understanding:** players learn why intersections, road access, congestion, hills, and precise handoff matter to responders;
- **language:** Hebrew/English interface with room for Arabic, Russian, French, Amharic, Yiddish and other character dialogue packs after review;
- **shared society:** patients come from different communities without making identity itself the challenge;
- **service ethos:** the high score comes from getting there quickly **and** safely, not from chaos.

A school/community version could later add optional factual cards about emergency preparedness, volunteer service, city geography, or Hatzolah history, but those are outside the current MVP.

---

## Sponsorship / fundraising possibilities

Keep the core game free or easily accessible if Hatzolah is the partner. Revenue/fundraising should sit around the experience rather than turning patients into monetized objects.

### Partnership models

- **Hatzolah-underwritten official edition:** Hatzolah funds/co-funds development and uses the game for donor/community engagement.
- **Named donor edition:** a donor, foundation, or family underwrites a city pack, school rollout, or public launch with tasteful credit outside gameplay.
- **Corporate sponsor:** mobility, technology, insurance, medical-device, communications, or Israeli consumer brands can sponsor the launch, score challenge, event installation, or city expansion subject to Hatzolah approval.
- **Fundraising challenge:** community members play a daily/weekly shift, share scores, and donate or recruit sponsors around a campaign target.
- **Event activation:** playable kiosk/mobile challenge at dinners, schools, community events, conventions, or emergency-preparedness programs.

### Avoid

- ads during emergency calls;
- selling power-ups tied to patient outcomes;
- sponsorship branding on a patient or medical condition;
- monetization that implies paying improves care.

---

## MVP scope

**Playable prototype pair:** Tel Aviv–Yafo + Jerusalem.

- 1 ambulance profile;
- 1 three-minute score-attack mode;
- 8–12 patient identities per city;
- 8 scenario templates shared independently across identity pools;
- 3–5 receiving destinations per city;
- daily seeded shift;
- shareable score/challenge link;
- EN/HE + RTL;
- mobile-first, offline-first web build;
- Miklat single-file `index.html` architecture for the first playable slice.

### First playable slice should be smaller than the MVP

Build **one Tel Aviv block first** with:
- one ambulance;
- one dispatch screen;
- 2–3 call seeds;
- one intersection siren mechanic;
- one pickup sequence;
- one receiving/handoff bay;
- scoring, timer extension, and immediate next-call chain.

The question is not “can we render Israel?” It is: **does `dispatch → drive → pickup → transport → handoff → next` feel addictive?**

---

## Prototype requirements

### Systems

- headless simulation for dispatch spawn, accept, travel time, completion/reassignment, score, and time extension;
- service-score calculation and timer tuning before final art;
- one-thumb mobile steering/accelerate/brake/siren controls;
- early-siren intersection-clearing behavior;
- route beacon and alternate-route logic;
- clean-stop detection at scene and hospital;
- EN/HE UI and RTL;
- daily seed and challenge link support;
- GoatCounter event hooks following Miklat patterns.

### Visual proof assets

Required for the first coherent art lock:
1. ambulance rear-three-quarter turnaround / hero design;
2. Tel Aviv gameplay hero frame;
3. Jerusalem gameplay hero frame;
4. HUD sheet;
5. one patient pickup frame;
6. one hospital handoff frame;
7. twelve storyboard frames;
8. 35-second animatic.

---

## 35-second proof-of-concept trailer

**0:00–0:02** black, dispatch tone, single blue flash.  
**0:02–0:05** overhead Tel Aviv map; call pin; camera dives.  
**0:05–0:09** ambulance launch; response clock begins.  
**0:09–0:13** siren triggered before intersection; traffic opens; score callout.  
**0:13–0:16** route choice / shortcut.  
**0:16–0:20** patient pickup; one human line; destination locks.  
**0:20–0:23** smooth transport bonus.  
**0:23–0:28** Jerusalem, Haifa, Be’er Sheva, Eilat montage.  
**0:28–0:31** hospital approach and precise stop.  
**0:31–0:33** `HANDOFF COMPLETE / SERVICE SCORE`.  
**0:33–0:35** working-title card: `MIKLAT HATZOLAH — RESPOND. DRIVE. DELIVER CARE.`

Until name approval, the public-facing title card should use a neutral placeholder.

---

## Pitch deck structure

Keep the live pitch to **8 slides**.

1. **Hook** — one-line concept + hero image.
2. **Why it works** — arcade loop translated to emergency response.
3. **The player experience** — dispatch → response → pickup → transport → handoff.
4. **Israel is the map** — Tel Aviv/Jerusalem + expansion cities.
5. **The people** — diverse patient system; one society, many stories.
6. **Why Hatzolah** — engagement, awareness, families/youth, donors, events.
7. **Prototype** — one-block playable + 35-second visual proof.
8. **The ask** — approve a private prototype sprint and appoint one reviewer.

Do not lead the deck with monetization. Lead with the experience and Hatzolah mission; put sponsorship/fundraising as a secondary path.

---

## Exact next ask to the head of Hatzolah

> **Would you be open to us building a small private prototype with your feedback: one Tel Aviv neighborhood, one ambulance, a few representative calls, and a 3-minute score-attack loop? We would keep Hatzolah branding private until you approve it, and we would ask you to designate one person to review the organizational, medical, cultural, and visual details. If the prototype feels right, we can then decide together whether to turn it into an official Hatzolah game and fundraising/community platform.**

### What we need from Hatzolah at prototype stage

- permission to use the Hatzolah name inside a **private review build** or confirmation that we should use a neutral placeholder;
- one designated reviewer/contact;
- guidance on ambulance/uniform/dispatch details that should or should not be represented;
- confirmation of appropriate medical-scenario boundaries;
- permission status for logo/livery/brand marks if the prototype advances publicly.

---

# CLAUDE HANDOFF

## Canonical existing files — VERIFIED IN REPO

Claude should read these in order:

1. `.claude/os/games/HATZOLAH.md` — concept/reverse-engineering research.
2. `hatzolah/WORLD.md` — canonical world/game bible.
3. `hatzolah/missions.json` — eight Stage 1 mission seeds.
4. `hatzolah/ASSET-MANIFEST.md` — confirmed asset locations and first-build order.
5. `hatzolah/VISUAL_BATCH_02.md` — visual system, storyboard, prompt pack, trailer structure.
6. `hatzolah/HATZOLAH_PITCH_PACKAGE.md` — this final pitch/handoff file.

## Existing shared assets — VERIFIED

### Miklat Drive locations

- Miklat Games Drive root folder ID: `1jsdRbTIw4XFQWyZniriF-OuXL8HXIM6I`
- Hatzolah Drive subfolder ID: `19j9cfVckVBc6iKhLJlp0s9tivei0YTxl`

### Confirmed Miklat brand asset

- `MIKLAT GAMES 🚨 — games from the shelter.png`
  - Drive file ID: `1S5fR-Bv-MY_KLblM72SaMROB-QxctzS0`
  - use as parent-brand/deck reference, **not** as Hatzolah key art.

### Confirmed existing music candidates — TEMP audition only

- `home screen.mp3` — `11srg_EkOjWy7uuD120c5FUunuZz0KMqh`
- `Galactic Arcade Rush.mp3` — `1ctwqiqtC1Jo9TK04VGm88UgdEPmkUfIf`
- `Galactic Arcade Rush (1).mp3` — `15QoQw1jASb9icSmkLnpeFhovSETA3Ki0`
- `Jericho Run.mp3` — `11BdvWCCSb-o6UCn7K6p3E4RZSQHvrsNa`
- `Temple Dash.mp3` — `1Lbf4XMqwbkqwVxp1MnOAyP68koqQ8nYl`
- `Temple Run Shalom.mp3` — `1lZc3XtWMBRxiA3LXvLqdsTnW43B3dpup`
- `Temple Run Shalom (1).mp3` — `174ghbwwk4Nu0izWyf2KfPbJh-LAKszZB`
- `Level Two Invaders.mp3` — `1cBR8ORZVfrs0pqoWmPDhMCadeQpmiyjb`
- `Level Two Invaders (1).mp3` — `1nol4XISWI5hkIYSgUgzRqIlXLHSnkT6T`

These are prototype candidates only. Final Hatzolah audio needs its own dispatch/siren/engine/music identity and rights/provenance review.

### Existing generic image library — VERIFIED EXISTENCE, NOT SEMANTIC CONTENT

The Miklat Drive root contains a large June 11, 2026 batch of generic `ChatGPT Image...` PNGs. Their existence is confirmed, but they have not been semantically labeled. **Do not infer their content from filenames/timestamps.** Visually audit before reuse; copy/rename useful files into the Hatzolah subfolder.

## Existing repo systems to reuse — VERIFIED

- single-file `index.html` game pattern;
- offline-first PWA pattern;
- EN/HE i18n + RTL;
- daily seeded mode;
- shareable score/challenge links;
- GoatCounter custom-event pattern;
- per-game `WORLD.md` review workflow;
- gameplay art spec via `assets/prompts.json`;
- promo art spec via `press/prompts.json`.

## Newly proposed assets — NOT YET CONFIRMED AS CREATED

Treat every file below as **NEEDED** until it physically exists and is audited:

```text
hatzolah/
  index.html                     [NEEDED]
  manifest.webmanifest           [NEEDED]
  sw.js                          [NEEDED]
  assets/
    prompts.json                 [NEEDED]
    ambulance/
      ambulance_player.png       [NEEDED]
      ambulance_turn_l.png       [NEEDED]
      ambulance_turn_r.png       [NEEDED]
      ambulance_brake.png        [NEEDED]
    city/
      bg_telaviv.png             [NEEDED]
      bg_jerusalem.png           [NEEDED]
      intersection_set.png       [NEEDED]
      traffic_set.png            [NEEDED]
      hospital_bay.png           [NEEDED]
      scene_marker.png           [NEEDED]
    patients/
      patient_camille.png        [NEEDED]
      patient_rivka.png          [NEEDED]
      patient_samir.png          [NEEDED]
      patient_amal.png           [NEEDED]
      patient_elias.png          [NEEDED]
      patient_almaz.png          [NEEDED]
      patient_anna.png           [NEEDED]
      patient_noam.png           [NEEDED]
    ui/
      dispatch_card.png          [NEEDED]
      siren_button.png           [NEEDED]
      route_beacon.png           [NEEDED]
      combo_badges.png           [NEEDED]
  press/
    prompts.json                 [NEEDED]
    keyart_16x9.png              [NEEDED]
    icon_1x1.png                 [NEEDED]
    poster_9x16.png              [NEEDED]
    itch_4x3.png                 [NEEDED]
    banner_notext.png            [NEEDED]
```

## Shared Drive visual-production structure

Visual Batch 02 defines this working organization under **Miklat Games / Hatzolah**:

```text
01_VISUAL_SYSTEM/
02_STORYBOARD/
03_GENERATION_PROMPTS/
04_TRAILER/
```

Target storyboard filenames:

```text
SB_01_COLD_OPEN.png
SB_02_DISPATCH.png
SB_03_LAUNCH.png
SB_04_INTERSECTION.png
SB_05_ROUTE_CHOICE.png
SB_06_PICKUP.png
SB_07_TRANSPORT.png
SB_08_JERUSALEM.png
SB_09_CITY_MONTAGE.png
SB_10_PATIENT_MONTAGE.png
SB_11_HANDOFF.png
SB_12_TITLE.png
```

These are target names from the visual plan; they are **not confirmed as generated files** unless subsequently audited in Drive.

## Claude next-build tasks

### Build 1 — game feel, no art dependency
1. Read all six canonical Hatzolah docs.
2. Build a headless dispatch/score/timer simulation.
3. Tune a 3-minute shift so a clean completion adds enough time to encourage chaining without allowing an endless easy run.
4. Implement one Tel Aviv block using simple geometry/placeholders.
5. Add steering, accelerate, brake, siren cooldown, traffic-clear timing, scene stop, transport and hospital-bay stop.
6. Wire Service Score: 40 speed / 30 safety / 20 route / 10 handoff.
7. Prove the loop is fun before expanding the map.

### Build 2 — coherent visual lock
1. Generate/approve the same ambulance rear-three-quarter design first.
2. Generate Tel Aviv hero gameplay using that vehicle reference.
3. Generate Jerusalem hero gameplay using the same vehicle reference.
4. Lock HUD sheet.
5. Lock one pickup frame.
6. Lock one hospital handoff frame.
7. Only then build all 12 storyboard frames.
8. Cut the 35-second animatic before generating more city coverage.

### Build 3 — pitch output
1. Use the strongest approved hero frame on Slide 1.
2. Build the 8-slide deck from this document.
3. Export a private review PDF and 35-second MP4.
4. Keep all official Hatzolah logos/liveries/uniform marks out unless explicit permission has been received.

## Hard guardrails

- Crazy Taxi is structural inspiration only.
- no copied Crazy Taxi characters, logo treatment, typography, music, UI, maps, taxi silhouette, checkers/flames, or branded visual motifs;
- no reward for reckless collision/near-miss behavior;
- no gore or visible patient deterioration;
- no comedy about medical suffering;
- no ethnic/religious stereotypes as gameplay shorthand;
- no diagnosis/treatment instruction;
- no official Hatzolah marks or endorsement claims without permission.

## Definition of a successful prototype

A viewer should understand the game in under ten seconds: **a call appears, the ambulance launches, the player reads the city, traffic opens when they use the siren intelligently, a human being is picked up, and a clean hospital handoff turns pressure into a score.**
