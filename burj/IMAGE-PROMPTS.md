# 🏗️ BUILD THE BURJ — image prompt pack (paste one at a time)

How to use: paste each numbered prompt into ChatGPT (image) or Gemini, one at a
time. Each prompt is **self-contained** (style, palette, and rules baked in), so
order doesn't matter and you don't need to carry context between them. Save each
result under the **filename** shown, into the **folder** shown. Match the aspect
ratio if your tool lets you set it.

**Two rules that matter:**
- **Gameplay sprites** (the floors, crane, Rafi, spire) MUST end up on a **flat
  solid magenta `#ff00ff` background, edge to edge** — the game chroma-keys it
  out. If a tool won't do pure magenta, ask it to put the subject on a plain
  flat magenta `#ff00ff` field with no shadow/gradient.
- **Backdrops** (the two skies) are full scenes, no transparency, and must keep
  the **center column clear** (the tower is drawn up the middle).

Shared look (already folded into each prompt; here for reference): vibrant 3D
cartoon, app-store polish, thick outlines, punchy saturation. Palette — desert
gold `#e9c08b`, brand gold `#ffd166`, glass cyan `#3ee6ff`, cream `#fdf3e3`,
dusk purple `#5e3c8f`, shelter-night sky `#0d1120`, danger/wobble coral
`#ff5d73`. Hero character **Rafi the Worker**: friendly Middle-Eastern
construction foreman, yellow hard hat, hi-vis neon-orange vest over a teal tee,
work gloves, a small brass finjan (coffee pot) holstered at his belt, big grin.

---

## GAMEPLAY PACK → save into `burj/assets/`

### 1. `bg-sky-day.png` · aspect 9:16 · (backdrop, full scene)
Tall vertical painted game background, vibrant 3D cartoon style with thick outlines, for a tower-stacking game set in Dubai: a clear hot daytime desert sky going from warm sandy haze at the horizon up to bright blue, a few soft clouds, a hint of a distant Dubai skyline silhouette and golden dunes along the very bottom horizon. Composition: keep the entire CENTER COLUMN open and uncluttered (the player's tower is drawn rising up the middle) — all scenery detail pushed to the far left and right edges and the lower horizon. Bottom edge is flat sandy ground #e9c08b with NO objects. Palette: desert gold #e9c08b, brand gold #ffd166, sky blue, cream #fdf3e3. No people, no cranes, no buildings in the center, no text.

### 2. `bg-sky-dusk.png` · aspect 9:16 · (backdrop, full scene)
Tall vertical painted game background, vibrant 3D cartoon style with thick outlines, for the high-altitude phase of a Dubai tower-stacking game: a glowing sunset sky, warm gold and coral low down fading up into deep dusk purple #5e3c8f and shelter-night blue #0d1120 near the top, the first stars appearing, a thin layer of clouds drifting below (you are now ABOVE the city). Composition: keep the entire CENTER COLUMN open and uncluttered for the rising tower; scenery only at the far edges. Palette: brand gold #ffd166, coral #ff5d73, dusk purple #5e3c8f, shelter-night #0d1120, cyan glint #3ee6ff. No people, no buildings in the center, no text.

### 3. `floor-glass.png` · aspect 16:9 · (sprite — flat magenta background)
Game asset, vibrant 3D cartoon style with thick outlines: a SINGLE horizontal segment of a modern skyscraper — one floor / storey block, wider than tall, a sleek blue-glass curtain-wall facade with cyan #3ee6ff glints and a slim brand-gold #ffd166 trim along top and bottom edges, clean and premium. Drawn straight-on (elevation view), centered, filling the frame edge to edge horizontally. The ENTIRE background is one flat solid magenta color #ff00ff — no shadow, no gradient, no text.

### 4. `floor-concrete.png` · aspect 16:9 · (sprite — flat magenta background)
Game asset, vibrant 3D cartoon style with thick outlines: a SINGLE horizontal segment of a building — one raw budget floor block, wider than tall, exposed grey concrete and rebar with a cheap corrugated look, a little rough, the 'cheap material' choice. Drawn straight-on (elevation view), centered, filling the frame horizontally. The ENTIRE background is one flat solid magenta color #ff00ff — no shadow, no gradient, no text.

### 5. `floor-gold.png` · aspect 16:9 · (sprite — flat magenta background)
Game asset, vibrant 3D cartoon style with thick outlines: a SINGLE horizontal segment of a skyscraper — one LUXURY premium floor block, wider than tall, gleaming gold-clad facade #ffd166 with amber #e9a23b panels, ornate but tasteful, the 'top-grade material' choice, subtle sparkle. Drawn straight-on (elevation view), centered, filling the frame horizontally. The ENTIRE background is one flat solid magenta color #ff00ff — no shadow, no gradient, no text.

### 6. `floor-retail.png` · aspect 16:9 · (sprite — flat magenta background)
Game asset, vibrant 3D cartoon style with thick outlines: a SINGLE horizontal podium/ground-floor segment of a building, wider than tall, with glass shopfront arcades, an awning, warm interior light — a retail base. A clean BLANK rectangular sign panel above the shopfront (cream #fdf3e3, empty, no writing) left clear for a sponsor logo to be added later. Drawn straight-on (elevation view), centered, filling the frame horizontally. The ENTIRE background is one flat solid magenta color #ff00ff — no shadow, no gradient, no text.

### 7. `floor-sponsor.png` · aspect 16:9 · (sprite — flat magenta background)
Game asset, vibrant 3D cartoon style with thick outlines: a SINGLE horizontal skyscraper floor segment, wider than tall, glass office facade, dominated by one large clean BLANK billboard/logo panel in the center (flat cream #fdf3e3, completely empty, no writing or symbols) framed in brand gold #ffd166 — a rentable 'sponsor floor' template for a brand logo to be dropped in later. Drawn straight-on (elevation view), centered, filling the frame horizontally. The ENTIRE background is one flat solid magenta color #ff00ff — no shadow, no gradient, no text.

### 8. `crane.png` · aspect 16:9 · (sprite — flat magenta background)
Game asset, vibrant 3D cartoon style with thick outlines: a yellow construction tower-crane hook and trolley at the top, a steel cable hanging down with an empty spreader hook at the end (no load), drawn straight-on, the horizontal jib spanning the frame near the top. Bright safety yellow #ffd166 and grey steel. The ENTIRE background is one flat solid magenta color #ff00ff — no shadow, no gradient, no text.

### 9. `foreman-rafi.png` · aspect 1:1 · (sprite — flat magenta background)
Game character sprite, full body, vibrant 3D cartoon style with thick outlines: Rafi the Worker — a friendly Middle-Eastern construction foreman in a yellow hard hat and hi-vis neon-orange safety vest over a teal tee, work gloves, a small brass finjan coffee pot holstered at his belt, giving an enthusiastic two-thumbs-up with a big proud grin, looking up at his tower. Centered, feet near the bottom edge. The ENTIRE background is one flat solid magenta color #ff00ff, edge to edge — no ground shadow, no gradient, no text.

### 10. `spire.png` · aspect 3:4 · (sprite — flat magenta background)
Game asset, vibrant 3D cartoon style with thick outlines: a gleaming tapering skyscraper spire / crown topper, a slender stepped silver-and-gold needle pinnacle catching a bright highlight at the tip (the finishing piece of a super-tall tower, Burj-Khalifa-like silhouette). Centered, pointing up, filling the vertical frame. Palette: silver, brand gold #ffd166, cyan glint #3ee6ff. The ENTIRE background is one flat solid magenta color #ff00ff — no shadow, no gradient, no text.

---

## PROMO PACK → save into `burj/press/`

### 11. `keyart-16x9.png` · aspect 16:9 · (full art, title text OK)
Mobile game key art, vibrant 3D cartoon style, app-store quality. A colossal half-built glass skyscraper soaring up into a golden Dubai sunset, a yellow tower-crane lowering one glowing floor block toward the top of the stack, a few floors comically overhanging and swaying. In the foreground Rafi the Worker — yellow hard hat, hi-vis neon-orange vest, brass finjan at his belt — points up with a proud two-thumbs-up grin. Distant Dubai skyline and golden dunes on the horizon. Palette: desert gold #e9c08b, brand gold #ffd166, glass cyan #3ee6ff, dusk purple #5e3c8f, coral #ff5d73, cream #fdf3e3. Bold chunky game-logo title text "BUILD THE BURJ" across the top, gold gradient on dark. High-energy, polished.

### 12. `icon-1x1.png` · aspect 1:1 · (app icon, no text)
App icon for a mobile game, 3D cartoon style, glossy game-icon finish, readable at small size. A single sleek blue-glass skyscraper with a gold spire, a small yellow crane hook lowering one bright gold floor onto its top, with motion sparkle. Centered on a warm brand-gold #ffd166 radial background with a faint desert-dune curve at the bottom. Thick outlines, bold and punchy, cyan glint #3ee6ff on the glass. No text.

### 13. `poster-9x16.png` · aspect 9:16 · (full art, title + tagline)
Vertical mobile game poster, vibrant 3D cartoon style, app-store quality. Dramatic low-angle hero shot looking straight up a towering, slightly swaying glass skyscraper mid-construction, a crane-held floor about to drop into place at the very top, the spire glinting against a sunset-to-dusk sky (gold #ffd166 fading to purple #5e3c8f and shelter-night #0d1120). Tiny Rafi the Worker silhouette cheering on a lower floor. Bold chunky title "BUILD THE BURJ" near the top; a tagline banner at the bottom reading "BALANCE THE BUDGET. BEAT THE WIND. TOUCH THE SKY." Polished, high-energy.

### 14. `itchcover-4x3.png` · aspect 4:3 · (cover crop, title text OK)
Game cover art for itch.io, vibrant 3D cartoon style. Close crop: a yellow crane hook lowering a glowing gold floor block onto a teetering stack of mismatched skyscraper floors (glass, concrete, gold), one floor overhanging precariously, Rafi the Worker's grinning hard-hatted face peeking from the side cheering. Dubai sunset behind, desert gold #e9c08b and brand gold #ffd166, glass cyan #3ee6ff, coral #ff5d73 wobble lines. Bold chunky hand-painted title "BUILD THE BURJ" across the top third. Thick outlines, punchy saturated colors, readable as a small thumbnail.

### 15. `banner-notext-16x9.png` · aspect 16:9 · (wide banner, NO title text)
Wide promotional banner for a mobile game, vibrant 3D cartoon style, NO title text. Composition with clean negative space in the top-center for overlay text: on the right, a tall glass skyscraper rising with a crane lowering a floor; center, floors stacking with a little comic sway and sparkle; on the left, Rafi the Worker in hard hat and hi-vis vest giving a thumbs-up. Background: blurred golden Dubai skyline and dunes at sunset. Palette: desert gold #e9c08b, brand gold #ffd166, glass cyan #3ee6ff, dusk purple #5e3c8f, coral #ff5d73, cream #fdf3e3. Polished, high-energy, no text in image.
