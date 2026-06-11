# BALAGAN — art pack drop-in slots

The game runs today on emoji, but every world element checks for a matching
PNG first (same `ART{}` + `artOk()` fallback pattern as `mamaddash/`). Drop a
file with the exact name below into `balagan/art/` and that element upgrades
itself on next load — no code change needed.

Match the MAMAD DASH look: hand-painted, warm Tel Aviv palette
(navy #0b0e1a, gold #ffd166, teal #7ee8c7, cream #f4ecdd), bold readable
silhouettes, transparent background PNGs, drawn facing **right**
(characters are auto-mirrored when walking left).

## Characters (skins — the player sprite + shop card)
Each is a full standing figure, ~320px tall, transparent bg.

| file | who | status |
|------|-----|--------|
| `char-avtali.png`   | Avtali        | ✅ pulled from Mamad Dash (`run1.png`) |
| `char-savta.png`    | Savta Mizrahi | ✅ pulled from Mamad Dash (`savta-cart.png`, faces left — `artFlip` set in code) |
| `char-bro.png`      | Beach Bro     | 🔲 needed: tan, tank top, flip-flops, Goldstar |
| `char-chabad.png`   | Chabad Guy    | 🔲 needed: black hat/coat, tefillin, warm smile |
| `char-hightech.png` | Hi-Tech Bro   | 🔲 needed: hoodie, AirPods, cold brew, smug |
| `char-mamadmom.png` | Mamad Mom     | 🔲 needed (secret cross-game skin): supermom with a shelter-door shield |
| `savta-nu.png`      | street/volley Savta | ✅ pulled from Mamad Dash |

(Walk-cycle frames `char-<id>-1.png`/`-2.png` are a nice-to-have; the engine
currently uses a single sprite with a bob — wire the frames in `drawPlayer`
if/when they exist.)

## Stations (the street furniture)
Wider pieces, ~420px tall. **The street is a 3/4 top-down town view** — draw
buildings/stalls front-on in 3/4 perspective (like a JRPG town); they sit on
the back edge of the walkable plaza. (Generated stall/storefront art in 3/4
view drops in perfectly.)

| file | what |
|------|------|
| `stand-falafel.png` | striped falafel stall with pita basket |
| `net-volley.png`    | beach volleyball net + sand patch |
| `shop-front.png`    | shuk storefront (the "buy a new life" shop) |
| `home.png`          | the player's apartment door / stairwell |
| `kiosk.png`         | classic Tel Aviv street kiosk — cigarettes, lottery (goralot) tickets, gum, a babushka leaning on the counter |
| `matkot.png`        | a pair of crossed wooden beach paddles (matkot) stuck in the sand with the ball |
| `shawarma.png`      | shawarma stand: vertical spit with the meat cone, knife, laffa stack |
| `aroma.png`         | iced-coffee cart/counter: cold brew jug, plastic cups, ice, "AROMA"-style sign |
| `cats.png`          | alley corner with crates and windowsills — street-cat territory |
| `allenby.png`       | busy crosswalk corner: traffic light, zebra stripes, a waiting sherut |
| `music.mp3`         | 🎵 street music loop — drops in and just plays (the Music object watches for it) |

## Background
| file | what |
|------|------|
| `bg-city.png` | ✅ pulled from Mamad Dash (`bg-beach.webp` — webp bytes, browsers sniff content). A dedicated seamless strip can replace it later. |

## Share / store art (referenced by the page, not auto-loaded)
| file | what |
|------|------|
| `../og.jpg` style `og.jpg` (1200×630) | social card for `balagan/` — "Tel Aviv on ₪500, double it". Currently the page points at `balagan/og.jpg`; add one to light up link previews. |

## Future minigame art (not wired yet — leave hooks)
- `vb-ball.png`, `pita.png`, `falafel.png` — swap the 🏐 / 🫓 / 🧆 emoji in the
  minigame draw calls.
- `prop-*` set: chairs, umbrellas, dogs, doves, scooters to scatter along the
  promenade for depth.
