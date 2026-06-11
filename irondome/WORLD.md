# 🚨 IRON DOME — world bible

**Pitch:** Defend every city, Sderot to Eilat. Tap to intercept; the sky lights
up gold. Heroic, hopeful, zero gore — interceptions feel like fireworks.

## Universe
- **10 cities, south to north arc:** the campaign travels Sderot → Eilat;
  each city has its own backdrop art (`/bg/`, hand-made, in SW cache) and
  difficulty personality. The city IS the level.
- **Tone:** protective, not warlike. You never attack — you only shield.
  Civilians below (windows, rooftops, beach umbrellas) are who you're saving.
- **Falafel power-ups:** the comic relief and the upgrade currency's flavor.
- **Miklat Wallet:** coin economy (in-game only) for upgrades between waves;
  lore: the arcade's shared currency.

## Characters & objects
- Iron Dome battery: the hero unit. Glowing cyan interceptors.
- Red rocket streaks: the threat — abstract, no faction, never named.
- Falafel balls (x3 sprites): pickups.

## Art direction
- Night palette: deep navy #0a1228, gold #ffd166, interceptor cyan #3ee6ff,
  alert red #ff5d73, warm amber window light.
- Existing art: 10 city JPGs + 3 falafel sprites (hand-made, pre-pipeline).
  Press pack spec: `press/prompts.json` (new). Gameplay art is already
  complete — no assets/prompts.json needed unless a remaster happens.

## Systems worth protecting (don't regress)
- Per-level analytics (clear/fail per level, D1/D7 return events).
- Challenge links (`?ref=share`), 3 share surfaces (mid-game, levels, end).
- Full offline SW (`irondome-v25`) incl. music.
- EN/HE i18n, Hebrew-first.

## Roadmap hooks
- Daily challenge mode (Mamad Dash has one; port the pattern).
- City-unlock share cards ("I defended Ashkelon 🛡️").
- Tip jar live once TIP_URL is set (hook shipped, dormant).
