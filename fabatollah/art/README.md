# Fabatollah — art drop (READY TO COMPLETE)

My side is **already wired**. The game looks for these files automatically and
uses them the moment they exist. Until then it falls back to the SVG — nothing
breaks. Your only step: **drop the named PNGs into this folder (`fabatollah/art/`)
and commit.** No code changes needed.

## STEP 1 — the instant win (8 files)

Rename your finished full-look renders + the banner to EXACTLY these names and
drop them here. Each preset button will then show your render instead of the SVG.

| your art (from the looks you generated) | rename to            |
|-----------------------------------------|----------------------|
| the navy + rainbow-stripe banner        | `cover.png`          |
| Desert Diva (rainbow turban, gold top)  | `look-desertdiva.png`|
| Disco Mullah (purple sequin cape, fan)  | `look-discomullah.png`|
| Pride Parade (flower crown, pink skirt) | `look-prideparade.png`|
| Festival (purple fishnet, feather robe) | `look-festival.png`  |
| Cabaret (purple wig, white boa)         | `look-cabaret.png`   |
| Cowboy Couture (hat, fishnet, boots)    | `look-cowboy.png`    |
| Disco Angel (halo, wings, sheer)        | `look-angel.png`     |

That's it for the headline upgrade. Commit → tell me → I push a link.

How to drop them (whichever is easiest):
- **GitHub web:** repo → branch `claude/awesome-euler-odgkud` → this `art/`
  folder → **Add file → Upload files** → drag them in → **Commit**.
- **GitHub mobile app:** same, from your phone.
- **Paste into a PR/issue comment** on the repo and I'll pull them in — GitHub
  hosts attachments on a domain I can reach (Google Drive I cannot).

## STEP 2 — optional: the mix-and-match wardrobe (sprite swap)

Your isolated item sprites (the sticker sheets) can replace the SVG doll for
true layered dressing. That one needs me to **see the files to position each
layer on the body**, so: commit the sprites here (individual transparent PNGs,
or the sheets and I'll slice them), and I'll do the compositing + tuning pass.
Naming for individual sprites is `head-*`, `top-*`, `bottom-*`, `robe-*`,
`acc-*`, `face-*` using the game's option ids — but don't sweat exact names for
the sheets; I'll map them visually once they're in the repo.

## Specs
- PNG. Full-look renders: transparent or solid bg both fine. Sprites: transparent.
- `cover.png` ideally ~1200×675 (landscape). Looks can be any portrait size.
- I auto-fit/trim on display — don't worry about precise cropping.
