# MIKLAT TOWER — image prompt pack

Everything needed to finish the game's art for go-live. Style is locked to the
cozy flat-pixel "dollhouse cutaway" look (the liked candidates) — **not**
photoreal. Generate on **Higgsfield → `flux_2`**, `count: 4`, pick the best,
then upscale the winner to 4K and downscale to the target size.

## How to use
1. Paste the **STYLE BLOCK** first, then append the one **SCENE** line for the asset.
2. Keep the two guard phrases verbatim — they hold the style:
   `NOT photorealistic` and `No text, no letters, no numbers ... no words anywhere`.
3. Generate 4, pick 1. **Upscale the winner to 4K** (bytedance), then export at the target size.
4. Optional consistency trick: once the **cover** is chosen, feed it back as a *style reference* for the other three so all four share the same building.

---

## STYLE BLOCK (paste at the start of every prompt)

```
Cozy flat 2.5D pixel-art illustration, clean chunky pixels with soft dark
outlines and gentle cel-shading, bright and sunny, NOT photorealistic, no
gritty grain, children's-book-meets-arcade warmth. A tall Israeli apartment
block drawn as a cutaway dollhouse cross-section so every floor is visible,
built from warm Jerusalem-stone blocks (cream and sand tan) with blue metal
trisim shutters and little balcony railings. Authentic rooftop solar water
heaters (dud shemesh) with angled panels, white AC units, a black water tank,
and a satellite dish. Bougainvillea in purple and pink cascades down the
walls; terracotta plant pots, herbs, a bicycle and stacked cardboard moving
boxes clutter the floors and balconies; street cats lounge on the sills. A
pale stone staircase zig-zags diagonally down the middle. A warm, DIVERSE set
of Israeli neighbors in flat colors holds hands in a line — a grandma
(savta) in a cardigan with glasses, a bearded religious man in a kippah, a
woman in a hijab, curly-haired kids in sandals, a man with a mustache in a
ribbed undershirt, and a little brown dog — led by a cheerful volunteer in a
yellow hard hat and orange hi-vis vest carrying a broom. A glowing green
basement shelter (miklat) doorway with a white down-arrow at the base. Bright
blue sky, one small round yellow sun, a couple of soft clouds. Warm, comedic,
peaceful — zero violence, nothing broken, no rubble. Palette: sky blue,
Jerusalem-stone cream/sand, blue shutters, bougainvillea purple-pink, warm
orange ground, shelter green, sunny yellow. No text, no letters, no numbers,
no signage, no words anywhere.
```

---

## 1. COVER  *(REQUIRED for go-live)*
- **Aspect:** `16:9`  → export **1280×720 PNG**
- **File:** `assets/miklattower-cover.png` (replaces placeholder)
- **Used by:** link/social preview (`og:image`) **and** the arcade portal card
- **Gotcha:** the card overlays the game name itself, so keep this image text-free; leave the busy detail left-of-centre so it still reads when cropped.

```
SCENE: Wide horizontal keyart. The cutaway tower sits left-of-centre, warm sky
fills the upper right. A cheerful chain of neighbors HOLDING HANDS descends the
staircase toward the glowing green shelter door, led by a volunteer in a yellow
hard hat and hi-vis vest carrying a broom. A grey cat and a plump pigeon peek
comically from windows.
```

## 2. APP ICON  *(REQUIRED for go-live)*
- **Aspect:** `1:1`  → export **512×512** (then downscale a copy to **192×192**)
- **Files:** `miklattower/icon-512.png`, `miklattower/icon-192.png`
- **Gotcha:** must read at tiny size — bold, high-contrast, almost no interior clutter.

```
SCENE: Tight bold icon crop — just the top few floors of the tan tower with
rooftop solar water heaters, and ONE big glowing green shelter door with a
white down-arrow. Simple, high-contrast, thick rounded border, centered,
readable as a phone home-screen icon.
```

## 3. TITLE BACKGROUND  *(optional — nice upgrade)*
- **Aspect:** `9:16`  → export tall PNG (game canvas is 520×800; cover-fit crops the sides)
- **File:** `miklattower/title.png` (I'll paint it behind the logo on the title screen)
- **Gotcha:** keep the **top third calm open sky** — that's where the MIKLAT TOWER logo sits.

```
SCENE: Vertical poster composition. The TOP THIRD is calm open blue sky kept
empty for a logo; the building fills the lower two thirds, centered and inviting,
the neighbor chain mid-descent on the stairs.
```

## 4. SHARE-CARD FRAME  *(optional — for the SHARE button)*
- **Aspect:** `3:4`  → export portrait PNG
- **File:** `assets/miklattower-share.png` (I'll composite the player's score onto the empty panel)
- **Gotcha:** the centre/right **must stay one big empty flat navy panel** for stats.

```
SCENE: The tan tower runs down the LEFT edge only; the entire center-and-right
60% is ONE large flat empty midnight-navy panel reserved for overlaid stats.
Thin sky strip with a small sun across the top, green shelter-door motif at the
bottom edge. Large empty negative space in the middle.
```

---

## Go-live path (after you approve)
Once you hand me the chosen images, on your **go**:
1. Optimize + place: cover & share → `assets/`, icons → `miklattower/`, convert cover to `.webp` for speed (portal already uses webp elsewhere).
2. Wire title background into the title screen (if used) + repoint `og:image`.
3. Portal card already points at `assets/miklattower-cover.png` — it picks up the new cover automatically.
4. Final pass: syntax + play-through check, then mark PR #3 ready and merge → live at `miklatgames.fun/miklattower/`.

Nothing ships until you say so.
