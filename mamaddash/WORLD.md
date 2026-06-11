# 🏃 MAMAD DASH — world bible

**Pitch:** The siren is live. Jump the savtas, duck the doves, stack shekels,
reach the mamad. How many sirens can you survive?

## Universe
- An Israeli residential street at siren time, played with comic urgency —
  the run to the mamad (reinforced room) that every Israeli knows, made funny
  and survivable. Zero gore; the danger is abstract (the clock, not violence).
- **Waves = sirens.** Speed carries over between sirens (14% relief dip,
  never a full reset) — tension compounds.
- **Themes/cities** rotate the backdrop (`/art/`: 4 backgrounds + 16 sprites,
  hand-made, all in SW cache).
- **Daily mode:** same gauntlet for everyone once a day (`?daily=1`) —
  Wordle-style synchronized ritual; daily # counts from launch era.

## Characters & objects
- The runner: determined everyperson. Tap = jump, swipe down = duck.
- **Savtas** with shopping carts: the iconic obstacle. Doves: the duck-under.
- Shekels: collectible currency; revive costs 100₪.
- **Death lines:** deadpan one-liners on the death panel (DEATH_LINES pool) —
  the game's voice. Keep them sharp, never mean.

## Art direction
- Dusk palette: indigo #1a2040, siren red #ff5d73, gold #ffd166, mint #7ee8c7.
- Press pack spec: `press/prompts.json` (new). Gameplay art complete.

## Systems worth protecting (don't regress)
- Challenge card share (canvas-rendered image share with text fallback).
- Challenge links (`?beat=N&c=coins`), daily links (`?daily=1`).
- Full offline SW (`mamaddash-v1`, 22 art files). EN/HE bilingual HUD.
- Per-game funnel events (evt-md-start/-death/-siren-N/-share/-challenged) —
  wired 2026-06-11.

## Roadmap hooks
- og:image is hand-made og.jpg; regenerate via press pack when refreshing.
- Tip jar live once TIP_URL is set (hook shipped, dormant).
