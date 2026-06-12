# 🎨 MIKLAT DESIGN SYSTEM — universal tokens & the canonical cast

The arcade is one universe. Every game pulls from this file instead of
re-inventing; per-game files may EXTEND, never contradict. (Factory stage 2
invariant from now on.)

## Core tokens
- **Brand palette:** shelter-night `#0d1120` · panel `#161d33` · gold
  `#ffd166` (THE brand color — CTAs, scores, titles) · siren red `#ff5d73` ·
  mint `#7ee8c7` (success) · cyan `#3ee6ff` (info) · cream `#fdf3e3`.
- Per-game worlds may shift the *environment* palette (shuk warm-browns,
  beach blues, dig earth-tones) but UI chrome stays brand: gold CTAs, red
  danger, mint success — a player who learned one game has learned them all.
- **Type:** display = Courier-class mono, 900 weight, letterspaced, UPPERCASE;
  body = Heebo/system. Hebrew is never an afterthought: every display
  lockup needs an HE variant.
- **Shape language:** chunky rounded (12-16px radii), 1px luminous borders,
  soft glows over hard shadows. Buttons: gold gradient primary
  (`#ffd166→#e9a23b`, ink text), ghost secondary (1px cream border).
- **Sound vocabulary** (every game's synth speaks one language): tick =
  navigation · pop = pickup · ding(+harmonic) = achievement · thud = damage ·
  descending saw = run over. Volumes ≤.2, durations ≤.6s.
- **Juice budget:** 60fps on low-end Android is sacred. Effects are additive
  ramps: shake ≤0.4, particles pooled, no shadowBlur in hot loops (Iron Dome
  panel finding).

## The canonical cast (one universe, recurring characters)
Generated sprites must match these bibles EVERYWHERE (universal pack below):
- **THE KID ("Noni")** — 10yo, curly dark-brown hair, orange tee, blue
  shorts, sandals. Shuk Shopper's runner; cameo material everywhere.
- **SAVTA** — floral dress, cardigan even in August, wheeled shopping cart,
  slipper arsenal. Obstacle in Mamad Dash, crowd in Shuk Shopper, the
  shoe-in-the-door hero of the promo, "Savta's Chair" in Digger, matkot
  legend in Balagan. SHE IS THE ARCADE'S MASCOT-IN-CHIEF.
- **SHUKI THE VENDOR** — burly, mustache, green apron, wooden spoon. Chaser
  in Shuk Shopper (Carmel), stall-owner cameos elsewhere.
- **INSPECTOR TIKVA** — Antiquities Authority, clipboard, whistle, immaculate
  khaki. Strict, never villainous. Digger's antagonist.
- **THE WORKER ("Rafi")** — Digger's hero: hard hat, neon vest, finjan
  holstered like a sidearm.
- Shared lore objects: **the Miklat Wallet ₪** (one economy), **the wicker
  basket**, **the lime scooter**, **the finjan**.

## Share-card standard (every game, same skeleton)
1080×1350 (4:5): game logo top · big stat center (the ONE number) · emoji
result row · challenge line + miklatgames.fun bottom-third · brand gold on
shelter-night. The Wordle-grid lesson: spoiler-free brag, instantly legible
in a WhatsApp thumbnail.

## Universal asset pack
`assets/universal/prompts.json` — cast sheets + UI kit, generated once,
reused by every game (cast consistency beats per-game art drift). Game packs
reference the cast by description COPIED VERBATIM from this file's bibles.
