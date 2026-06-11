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

| file | who | vibe |
|------|-----|------|
| `char-avtali.png`   | Avtali        | the broke-but-hopeful default Tel Avivi |
| `char-savta.png`    | Savta Mizrahi | Sephardi grandma, shopping cart energy |
| `char-bro.png`      | Beach Bro     | tan, tank top, flip-flops, Goldstar |
| `char-chabad.png`   | Chabad Guy    | black hat/coat, tefillin, warm smile |
| `char-hightech.png` | Hi-Tech Bro   | hoodie, AirPods, cold brew, smug |

(Walk-cycle frames `char-<id>-1.png`/`-2.png` are a nice-to-have; the engine
currently uses a single sprite with a bob — wire the frames in `drawPlayer`
if/when they exist.)

## Stations (the street furniture)
Wider pieces, ~420px tall, sit on the boardwalk.

| file | what |
|------|------|
| `stand-falafel.png` | striped falafel stall with pita basket |
| `net-volley.png`    | beach volleyball net + sand patch |
| `shop-front.png`    | shuk storefront (the "buy a new life" shop) |
| `home.png`          | the player's apartment door / stairwell |
| `kiosk.png`         | classic Tel Aviv street kiosk — cigarettes, lottery (goralot) tickets, gum, a babushka leaning on the counter |

## Background
| file | what |
|------|------|
| `bg-city.png` | seamless horizontal Tel Aviv strip (sky→skyline→sea→promenade). Tiles horizontally; height maps to the ground line. Replaces the procedural sky+skyline+palms. |

## Share / store art (referenced by the page, not auto-loaded)
| file | what |
|------|------|
| `../og.jpg` style `og.jpg` (1200×630) | social card for `balagan/` — "Tel Aviv on ₪500, double it". Currently the page points at `balagan/og.jpg`; add one to light up link previews. |

## Future minigame art (not wired yet — leave hooks)
- `vb-ball.png`, `pita.png`, `falafel.png` — swap the 🏐 / 🫓 / 🧆 emoji in the
  minigame draw calls.
- `prop-*` set: chairs, umbrellas, dogs, doves, scooters to scatter along the
  promenade for depth.
