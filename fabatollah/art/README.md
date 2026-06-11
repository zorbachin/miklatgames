# Fabatollah — art drop zone

Upload **only Fabatollah game art** here. Anything not on this list is ignored
(no stray generations, no `home screen.mp3`, no duplicates).

The game currently renders the character as inline SVG. These PNGs get wired in
two ways — both are fine to provide:

## A) Hero / preset / share art  (drop-in, highest value)
Full finished illustrations of Fabatollah in a complete look. Used for the
homepage cover, the share/OG card, and preset showcase art.

| filename                | use                                  | size (px)     |
|-------------------------|--------------------------------------|---------------|
| `cover.png`             | homepage tile (replaces cover.svg)   | 1200 × 675    |
| `og.png`                | social share card                    | 1200 × 630    |
| `look-before.png`       | preset: stern "before"               | 1024 × 1536   |
| `look-prideparade.png`  | preset: Pride Parade                 | 1024 × 1536   |
| `look-discomullah.png`  | preset: Disco Mullah                 | 1024 × 1536   |
| `look-desertdiva.png`   | preset: Desert Diva                  | 1024 × 1536   |
| `look-festival.png`     | preset: Festival                     | 1024 × 1536   |
| `look-cabaret.png`      | preset: Cabaret                      | 1024 × 1536   |
| `look-cowboy.png`       | preset: Cowboy Couture               | 1024 × 1536   |
| `look-angel.png`        | preset: Disco Angel                  | 1024 × 1536   |

## B) Layered paper-doll sprites  (optional — to replace the SVG doll)
Each item isolated on a **transparent** background, same pose/framing as
`base.png`, so they stack. Naming = `<category>-<id>.png` using the game's IDs:

- `base.png` (neutral body)
- `head-*` : bare, turban_white, turban_black, turban_rainbow, drag, wig_blonde,
  tiara, flower, cowboy, beret, fascinator, halo, party
- `top-*` : bare, tank, tee, crop, blouse, fishnet, mesh, sequin, halter,
  military, vest, blazer
- `bottom-*` : briefs, trousers, jeans, leather, leggings, hotpants, mini, tutu,
  sequinSkirt, harem, fishnetTights
- `robe-*` : aba, rainbow, sequin, feather, sheer
- `face-*`, `jewel-*`, `acc-*` : see the prompt pack for the full list

## Specs
- PNG, **transparent background** for sprites (flat/solid OK for cover & og).
- Keep the character art consistent (same style + same Fabatollah face/pose).
- Don't worry about exact cropping — I'll trim, center, and resize on import.

When the files are pushed, tell me and I'll pull, process, and wire them in.
