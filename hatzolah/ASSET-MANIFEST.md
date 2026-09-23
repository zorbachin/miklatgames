# Hatzolah asset manifest — batch 01

## Canonical locations

### Code / Claude handoff
- Repository: `zorbachin/miklatgames`
- Concept research: `.claude/os/games/HATZOLAH.md`
- World bible: `hatzolah/WORLD.md`
- Mission data: `hatzolah/missions.json`
- This manifest: `hatzolah/ASSET-MANIFEST.md`

### Shared visual/media storage
- Miklat Games Drive root folder ID: `1jsdRbTIw4XFQWyZniriF-OuXL8HXIM6I`
- Hatzolah Drive subfolder ID: `19j9cfVckVBc6iKhLJlp0s9tivei0YTxl`

Generated Hatzolah-specific images, audio, video, logos, boards, and pitch exports should go into that Drive subfolder rather than the crowded Miklat root.

## Existing Miklat assets confirmed in Drive

### Brand / key art
- `MIKLAT GAMES 🚨 — games from the shelter.png`
  - Drive file ID: `1S5fR-Bv-MY_KLblM72SaMROB-QxctzS0`
  - Use: Miklat brand reference / pitch-deck parent-brand slide.
  - Do not treat as Hatzolah key art.

### Existing music candidates for TEMP prototype audition only
- `home screen.mp3` — `11srg_EkOjWy7uuD120c5FUunuZz0KMqh`
- `Galactic Arcade Rush.mp3` — `1ctwqiqtC1Jo9TK04VGm88UgdEPmkUfIf`
- `Galactic Arcade Rush (1).mp3` — `15QoQw1jASb9icSmkLnpeFhovSETA3Ki0`
- `Jericho Run.mp3` — `11BdvWCCSb-o6UCn7K6p3E4RZSQHvrsNa`
- `Temple Dash.mp3` — `1Lbf4XMqwbkqwVxp1MnOAyP68koqQ8nYl`
- `Temple Run Shalom.mp3` — `1lZc3XtWMBRxiA3LXvLqdsTnW43B3dpup`
- `Temple Run Shalom (1).mp3` — `174ghbwwk4Nu0izWyf2KfPbJh-LAKszZB`
- `Level Two Invaders.mp3` — `1cBR8ORZVfrs0pqoWmPDhMCadeQpmiyjb`
- `Level Two Invaders (1).mp3` — `1nol4XISWI5hkIYSgUgzRqIlXLHSnkT6T`

**Note:** Existing titles are not a tone guarantee. Audition them; do not ship one simply because it exists. Final Hatzolah audio should get its own dispatch/siren/engine/music identity.

### Existing image library
The Miklat Drive root contains a large June 11, 2026 batch of generated PNGs with generic `ChatGPT Image...` filenames. These are confirmed to exist but are **not semantically labeled**. Before reusing any of them, visually audit and rename/copy the useful items into the Hatzolah subfolder. Do not guess what an image depicts from timestamp alone.

## Existing repo systems to reuse

From the Miklat repo pipeline and live games:
- Single-file `index.html` game architecture.
- Offline-first PWA pattern.
- EN/HE i18n and RTL.
- Daily seeded mode pattern.
- Shareable score/challenge links.
- GoatCounter custom-event pattern.
- Per-game `WORLD.md` + panel review workflow.
- Gameplay art spec in `assets/prompts.json`.
- Promo art spec in `press/prompts.json`.

## Hatzolah asset structure to create next

```text
hatzolah/
  index.html
  manifest.webmanifest
  sw.js
  WORLD.md
  missions.json
  ASSET-MANIFEST.md
  assets/
    prompts.json
    ambulance/
      ambulance_player.png
      ambulance_turn_l.png
      ambulance_turn_r.png
      ambulance_brake.png
    city/
      bg_telaviv.png
      bg_jerusalem.png
      intersection_set.png
      traffic_set.png
      hospital_bay.png
      scene_marker.png
    patients/
      patient_camille.png
      patient_rivka.png
      patient_samir.png
      patient_amal.png
      patient_elias.png
      patient_almaz.png
      patient_anna.png
      patient_noam.png
    ui/
      dispatch_card.png
      siren_button.png
      route_beacon.png
      combo_badges.png
  press/
    prompts.json
    keyart_16x9.png
    icon_1x1.png
    poster_9x16.png
    itch_4x3.png
    banner_notext.png
```

The nested folders above are organizational targets. If the current Miklat image loader requires flat files, keep production assets flat at runtime and preserve the categories in filenames instead.

## First art generation pack

Do not generate random shots. The first pack should prove the gameplay fantasy:
1. Chase-camera hero frame: neutral rescue ambulance cutting through Tel Aviv traffic, Miklat palette.
2. Jerusalem hill frame: ambulance climbing a stone-lined street toward a glowing dispatch marker.
3. Dispatch UI overlay with patient portrait, timer, route beacon, score, siren control.
4. Scene-arrival frame with respectful patient pickup zone.
5. Hospital handoff frame with `PERFECT BAY` arcade callout.
6. Eight patient portrait cards using the mission seed roster.
7. Clean logo lockup for a **neutral working title** until Hatzolah name/branding approval.

## Brand / legal guardrail
Until explicit partner permission exists:
- no official Hatzolah logo;
- no copied ambulance livery;
- no official uniform insignia;
- no claim that the organization endorses the game;
- no copied Crazy Taxi characters, maps, logo, music, UI, or art.

The concept may be described internally as “Crazy Taxi for an ambulance,” but public creative should stand on its own.

## Claude next-build order
1. Read `.claude/os/games/HATZOLAH.md`.
2. Read `hatzolah/WORLD.md`.
3. Load `hatzolah/missions.json`.
4. Build a headless simulation first: dispatch spawn → accept → travel time → completion/reassignment → score/time extension.
5. Assert scoring and timer curve before visuals.
6. Build only **one Tel Aviv block** in the first playable slice.
7. Prove `dispatch → drive → arrive → transport → handoff → next` is fun.
8. Only after that, add Jerusalem and art generation.
