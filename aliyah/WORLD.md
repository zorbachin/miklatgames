# 🧳 ALIYAH: THE ADVENTURE — world bible v1

One hero, one suitcase, one country unlocked city by city. The game is an
anime-poster quest map: every city holds three short missions, every mission
is one verb, every clear hands you a Hebrew word and a two-line "how it really
works" card. Companion doc: `.claude/os/games/ALIYAH.md` (analysis + spec).

## Tone laws
1. **Funny first, warm always.** The joke is the situation (Savta's slipper
   serve, the shaliach's third follow-up question), never the person.
2. **Spectrum, not sermon.** Religious missions (Kotel at sunset, Chabad
   tefillin, Shabbat shopping) are bonus-star side quests. A secular hero can
   3★ the game. A religious hero gets extra warmth, never extra gates.
3. **Directionally true.** Reward cards describe the real Aliyah step and
   always end with "check with NBN / the Jewish Agency" energy. We never
   invent amounts or deadlines.
4. **Naruto-style = growth arc, headband, mentors, map.** Never combat.

## Heroes (pick one; the choice is also our audience split)
| Hero | Read | Visual | Story flavour |
|---|---|---|---|
| **NOA / NOAM "the gap-year kid"** | 18–19, post-high-school program | curly hair, gold headband with ✡, oversized backpack, sneakers | first time alone, texts Ima constantly, discovers matkot |
| **THE COHENS** | young family (parent + Baby Ezra) | parent in a cap, baby in a stroller, diaper bag as "second suitcase" | every mission has a stroller gag; the carousel spawns two suitcases |

## Mentors & cast (recurring, arcade-canon where possible)
- **SAVTA** (arcade mascot-in-chief) — the matkot boss at Gordon Beach. Cardigan in August. Slipper serve.
- **SHUKI THE VENDOR** (Shuk Shopper canon) — runs the Mahane Yehuda stall; haggles.
- **DVIR the shaliach** — Jewish Agency interviewer, kind, relentless follow-ups.
- **RABBI MENDY** — Chabad at the Kotel, offers tefillin, never pushes.
- **TAMAR the NBN counsellor** — the voice of the reward cards.
- **THE CAT** — every Israeli alley has one; obstacle in two missions.

## World map (v1 = 4 chapters; v2+ marked)
| Chapter | Missions | Unlock |
|---|---|---|
| 0 Prologue — The Lost Documents | archive runner · apostille stamp · shaliach interview | start |
| 1 Arrival — Ben Gurion | carousel scramble | ★1 in prologue |
| 2 Tel Aviv | surf · volleyball · matkot (Savta boss) | arrival cleared |
| 3 Jerusalem | Shabbat shuk budget · sunset run to the Kotel · tefillin (optional) | ★★★ across Tel Aviv |
| 4 Haifa (v2) | Carmelit · cable car · Wadi Nisnas food | — |
| 5 Tzfat (v2) | artists' quarter · restore the painting · klezmer hunt | — |
| 6 Eilat / Negev (v2) | reef · desert nav · stargazing | — |
| 7 Finding Home (v2) | choose a base · furnish · bring the friends | — |

## Art direction ("anime poster", zero downloads)
- Painted-gradient skies with a giant sun/moon, silhouetted skylines
  (Azrieli towers, Jaffa clock tower, Old City walls + Dome), soft haze bands.
- Hero = drawn vector (round head, headband, backpack/stroller), NPCs = emoji
  sprites until the sprite pack exists (`assets/prompts.json`, magenta key).
- UI chrome stays brand: shelter-night, gold CTAs, mono display type.
- Motion: speed lines on runs, squash on hits, confetti on 3★, screen shake ≤0.4.

## Systems that carry across cities
- **Stars** (0–3 per mission) gate chapters. **Shekels** are score (no shop in v1).
- **Milon** (Hebrew dictionary): 3 words per mission, collected as pickups.
- **Friends**: NPCs met are listed on the map screen (Savta, Shuki, Dvir, Mendy).
- **Save**: `localStorage.aliyah_save` — hero, name, stars per mission, words, best scores.

## Share standard
Spoiler-free grid: one emoji per chapter with stars, e.g.
`🧳★★★ ✈️★★ 🏖️★★★ 🕍★☆☆ — I'm making Aliyah in ALIYAH: THE ADVENTURE`
plus `?beat=<totalStars>` challenge link.

## Deferred roadmap
Daily seeded mission · Haifa pack · bureaucracy side-quest board (Misrad
HaKlita, bank, kupat cholim, ulpan) · sprite/art pass · music · co-op.
