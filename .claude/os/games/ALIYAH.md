# 🧳 ALIYAH: THE ADVENTURE — analysis, spec & build report

_Stage-1 concept doc + stage-3 panel in one file. Written 2026-09-06 before a
line of game code, then updated with what actually shipped in v1 (bottom)._
_Source brief: Zorba ↔ ChatGPT conversation (Naruto-style Aliyah adventure,
NBN process, city-per-level, licence-to-NBN ambition). Answers given: gap-year
+ young-family bias · "Naruto style" undefined · Claude picks camera ·
funny + religious-spectrum (religious quests optional, bonus points) · social
= part 2 · $0 budget, distribution = Israel influencers._

---

## 0. The verdict in ten lines (read this if nothing else)

1. **The idea is good. The ChatGPT scope is not.** A cel-shaded 3D open-world
   city game is a $3–15M / 18-month build with a 30-person team. With $0 and
   one AI + one human, that plan ships nothing. Retro Bowl, Flappy Bird,
   Wordle, Pou — the David-vs-Goliath winners in our own research corpus —
   won on *resonance + a tight loop*, not fidelity.
2. **What "Naruto style" can honestly mean here:** a hero with a headband and
   a growth arc, mentors in every town, skills that carry across cities, a
   world map that unlocks, anime-poster art direction. **Not** 3D parkour.
3. **Build shape: a 2D anime-poster "quest map" game with a chain of 30–90s
   minigames** (WarioWare × Subway Surfers × Cooking Mama structure). Every
   city = 3 missions. Stars + shekels + friendships carry across the map. This
   is the only shape that fits the house invariants (one `index.html`,
   offline, one thumb) *and* can be extended city-by-city forever.
4. **First milestone (this PR): Prologue + Tel Aviv + Jerusalem = 10 missions,
   ~15–25 min of content, replayable for 3 stars.** That's the influencer
   test build. Haifa/Tzfat/Eilat are content packs added only if the funnel
   says people finish Jerusalem.
5. **The licence-to-NBN goal needs a reality check.** NBN is a nonprofit with
   its own marketing budget and legal review. They won't "license a game"; they
   might *sponsor, co-brand, or embed* one that already has traffic and is
   factually right. So the deal-shaped deliverable is: a traffic number, a
   completion number, a share number, and a fact-checked Aliyahpedia layer.
   Build for players first; NBN is a downstream buyer of proof.
6. **Biggest content risk: getting the process wrong.** Requirements differ
   by country, family status, and conversion status. The game must be
   *directionally* right and say "check with NBN / the Jewish Agency" — never
   pretend to be the authority. (The NBN site is blocked from this build
   sandbox; facts below are from prior knowledge and are flagged for a
   verification pass — see §8.)
7. **Biggest product risk: educational ≠ fun.** Every mission is fun on its
   own terms (dodge, time, rally, budget) and the Aliyah fact is the *reward
   card*, not the gameplay. Nobody plays a form-filling sim twice.
8. **Religious content = optional side quests with bonus stars**, never gates
   on progression. Chabad tefillin, Kotel at sunset, Shabbat shopping all exist;
   a secular player can 3-star the game without them. That's the "spectrum".
9. **Two heroes, not a character creator.** Gap-year kid and young-family
   parent (with a stroller). Cheap, on-brief, and the *hero choice itself is
   the audience segmentation* for later analytics.
10. **Success gate for milestone 1:** ≥40% of starters finish the Prologue,
   ≥15% reach Jerusalem, share-rate ≥3%. Below that, we fix the loop, we do
   not add Haifa.

---

## 1. What a $10M-revenue builder actually checks first

A studio that has shipped $10M+ mobile titles asks four questions before art:

| Question | Honest answer for this game |
|---|---|
| **Is there a loop I can play 100 times?** | Not in "explore a city" — in *3-star chasing* on short missions + a daily seeded challenge. Subway Surfers logic: session 60–150s, "one more". |
| **Where does the second session come from?** | Map unlocks (next city visible but locked), star gates ("★★ to unlock Jerusalem"), daily mission with a shared seed, and the challenge link `?beat=`. |
| **What is the share moment?** | The absurd matkot rally with Savta, the sunset dash to the Kotel, the apostille stamp slam. Plus the Wordle-style spoiler-free brag card: `🧳✈️🏄🏐🏓🛒🕍` with stars per city. |
| **What kills it?** | Load time on a phone with no signal (we're single-file, fine), input on iOS Safari (house pattern handles it), factual errors that make Israelis screenshot-mock it, and religious tone-deafness in either direction. |

### 1.1 Comparable products (what worked, what we take)

| Comp | Take | Leave |
|---|---|---|
| **Subway Surfers** (Sybo) | 3-lane runner as the first mission — 5s to learn, endless-able, stumble-then-caught forgiveness. | Endless-only; we need a *finish line* per mission so the story advances. |
| **WarioWare / Rhythm Heaven** | Rapid, absurd micro-games with one verb each. Comedy comes from escalation. | Random order; we need a story order. |
| **Cooking Mama / Diner Dash** | "Do a real-world thing, cartoonishly" is a proven genre; life-skills content is *the* casual hook. | Nothing. |
| **Duolingo** | Streaks, gems, the owl guilt. Hebrew words as pickups. | Full course. We seed 40 words, not 4,000. |
| **Pokémon / Naruto games** | World map with town badges, mentors, skills that carry. | Combat, 3D, anything requiring a content team. |
| **Wordle** | Daily + spoiler-free share grid. Already the house standard. | — |

### 1.2 Retention math we are designing for (targets, not claims)

- D1 20–30% is realistic for a browser game with a story hook and no install
  (portal medians are ~10–15%). We get there with the *locked next city*
  visible on the map at the end of session 1.
- Session length 4–8 min (3 missions + map). Long enough to remember, short
  enough for a bus.
- Content half-life: with 10 missions × 3-star chase ≈ 25–40 min of real
  play. Fine for the influencer test; **not** fine for a portal launch —
  that needs Haifa + daily mode first.

---

## 2. Scope decision (locked for v1)

**IN v1 (this PR):**
- Hero pick: **Gap-Year Noa/Noam** (backpack, headband) or **The Cohens**
  (parent + stroller, "Baby Ezra"). Name is typed (defaults offered).
- **Prologue "The Lost Documents"** (3 missions): archive runner → apostille
  stamp → shaliach interview.
- **Arrival**: luggage carousel scramble + Teudat Oleh moment (1 mission).
- **Tel Aviv** (3): surf, beach volleyball, matkot (escalating, Savta boss).
- **Jerusalem** (3): Shabbat shuk on a budget, race to the Kotel before
  sunset, Chabad tefillin (optional, bonus).
- World map with locks/stars, shekel wallet, Hebrew word pickups (a "Milon"
  collection screen), "Aliyah facts" reward cards after each mission.
- EN/HE i18n + RTL, offline SW, share/`?beat=`, GoatCounter events, tip-jar.

**DEFERRED (content packs, gated on funnel):**
- Haifa (Carmelit / cable car / Wadi Nisnas food), Tzfat (art + klezmer),
  Eilat/Negev (reef, stargazing), "Finding Home" apartment + friends finale.
- Post-arrival bureaucracy quest line (Misrad HaKlita, bank, kupat cholim,
  ulpan) as a *hub side-quest board*, not blocking missions.
- Daily seeded mission, leaderboards, friend co-op ("part 2" per Zorba).
- Real art pass (sprites on magenta, house ART loader), music.

**REJECTED:**
- 3D / WebGL / Three.js: breaks single-file + offline + low-end Android.
- Character creator: cost with no retention evidence.
- Combat: wrong tone for an Aliyah game and a licensing poison pill.

---

## 3. Design pillars

1. **Hero of your own Aliyah.** Everything the player does is a thing a real
   oleh does, exaggerated to cartoon. The reward card tells you the real
   version in two sentences.
2. **One thumb, 5 seconds to learn, 60 seconds to master.** Each mission has
   exactly one verb (swipe / tap-time / drag / pick). No tutorials longer than
   the how-grid.
3. **Affectionate Israeli comedy.** Savta is a boss. The vendor haggles. The
   shaliach asks about your rabbi's rabbi. Nobody is mocked for being religious
   or secular; the joke is always the *situation*.
4. **Spectrum, not sermon.** Religious missions give bonus stars and a warm
   card; skipping them costs nothing.
5. **Carry-over.** Stars, shekels, Hebrew words, and friends (NPCs met) persist
   across the map. The map is the character sheet.

---

## 4. Full mission spec (v1)

Every mission returns `{score, stars(0–3), coins, words[], card}`; stars are
derived from thresholds so balancing is one table.

| # | Chapter · Mission | Verb | Loop (30–90s) | 3★ condition | Reward card (fact, flagged for verification) |
|---|---|---|---|---|---|
| 0 | Prologue · **The Lost Documents** | swipe lanes / tap jump | 3-lane runner through the family archive; collect the doc checklist (birth certificate, passport, rabbi's letter, marriage cert if family, police background check); dodge falling boxes and the cat; shelves collapse behind you | all docs + no hits | Aliyah application docs: birth cert, valid passport, proof-of-Judaism letter from a rabbi, marriage/divorce certs, background check; many need an apostille |
| 1 | Prologue · **The Apostille** | tap-timing | Stamp each doc as the moving marker crosses the green zone; zone shrinks per stamp | all 5 perfect | An apostille certifies a document for international use (Hague Convention); issued by the state/federal office that keeps the record |
| 2 | Prologue · **The Shaliach Interview** | pick 1 of 3 | 5 rapid questions with a 6s timer; funny wrong answers, one honest one | 5/5 honest | The Jewish Agency (Sochnut) interview confirms eligibility under the Law of Return; NBN coordinates for North America/UK |
| 3 | Arrival · **Ben Gurion Carousel** | tap | Suitcases pass; tap yours (matching sticker), avoid the lookalikes; the 2nd family suitcase spawns for the Cohens | all bags, 0 wrong | At the airport olim get the Teudat Oleh and a temporary ID; Misrad HaKlita starts the sal klita (absorption basket) payments |
| 4 | Tel Aviv · **Surf at Gordon Beach** | hold to balance | Wave tilts; hold left/right to keep the board level; trick windows (tap) for bonus; wipeout at 3 imbalance | ride full set + 3 tricks | Tel Aviv beaches run Gordon → Frishman → Banana; Hebrew: *galim* (waves) |
| 5 | Tel Aviv · **Beach Volleyball** | tap-time | Ball arcs to you; tap when it hits the ring; rally to 12 | 12 rally no miss | Hebrew: *kadur-af*; the Israeli beach is a Saturday institution |
| 6 | Tel Aviv · **Matkot with Savta** | drag paddle | Ball speeds up each hit; Savta's shots curve; a beach umbrella flies in; 30 hits wins | 30 hits, hit Savta's "slipper serve" | Matkot has no score. Ever. That's the point. Hebrew: *matka* (paddle) |
| 7 | Jerusalem · **Shabbat Shuk on a Budget** | tap | Items scroll by with prices; buy the list (challah, wine, hummus, flowers, chicken) under ₪150 before the Shabbat siren; haggle prompt: tap the vendor when the price flashes | list complete, ≥₪30 left | Mahane Yehuda closes ~2h before Shabbat; Friday 1pm is the rush; Hebrew: *kama ze oleh?* |
| 8 | Jerusalem · **Sunset to the Kotel** | swipe lanes / tap jump | Runner through Old City alleys with stairs, cats, tour groups; the sky goes from gold to purple; arrive before candle-lighting | arrive with >20s left, no hits | Candle-lighting is 18 min before sunset in Jerusalem (40 in some customs); the Kotel plaza is open 24/7 |
| 9 | Jerusalem · **Tefillin with Chabad** (optional) | tap rhythm | Wrap 7 times on the beat, then 3 on the hand; misses restart the count | 10 perfect | Chabad stands offer tefillin at the Kotel daily; bonus star, never required |

**Difficulty:** every mission has an on-fail retry with a one-line tip; no
lives system across the map (Aliyah is hard enough).

**Economy (deliberately shallow, per MONETIZATION.md "no economy builds"):**
shekels are a *score*, spent on nothing in v1; wallet shown for future
cosmetics. Hebrew words are collected into the Milon; 3 words per mission.

---

## 5. Art & audio direction ("anime poster", no assets)

- **Camera:** side-on / pseudo-3D per mission, painted-sky gradients, big
  sun, silhouetted skylines (Azrieli, Old City walls). Everything is canvas
  vectors + emoji sprites (house pattern; sprite pass later via
  `assets/prompts.json`).
- **Hero:** drawn vector — round head, **headband** (the Naruto nod, with a ✡
  instead of a leaf), backpack or stroller. Two palettes.
- **UI chrome = brand** (gold CTAs, shelter-night, mono display) so it's
  recognizably a Miklat game.
- **Audio:** house synth vocabulary (tick/pop/ding/thud/over) + a 4-note
  "level clear" riff. No music files in v1 (offline budget).

---

## 6. Distribution plan for $0 (what the influencer build needs)

1. Share text with a spoiler-free progress grid + city reached + `?beat=` stars.
2. og image per game (placeholder portal og.jpg now; key art via `bin/imagepack aliyah` when a Gemini key exists).
3. Seed list: Aliyah-content creators (NBN alumni vloggers, gap-year program
   TikToks, "Israel with…" accounts), Hillel/Masa WhatsApp groups, Hey Alma /
   Times of Israel "Jewish games" beat (precedent: Jewdle, Meduyeket).
4. Ask of influencers is a *clip*, not a post: 10s of the Savta matkot boss.
5. Instrument first: `evt-al-start`, `-mission-N`, `-chapter-N`, `-share`,
   `-death`, `-tip`. No numbers, no NBN meeting.

---

## 7. Risk register (things that bite)

| Risk | Sev | Mitigation |
|---|---|---|
| Aliyah facts wrong / outdated | HIGH | Cards say "check NBN / the Jewish Agency"; verification pass with the live site before any NBN outreach (§8) |
| Religious tone (too much / too little) | HIGH | Optional bonus quests; secular 3★ path exists; playtest with one observant + one secular tester before influencers |
| "Educational" smell | HIGH | Facts only on reward cards; missions are pure play |
| Single file grows past 3k LOC | MED | Mission registry pattern; each mission is a self-contained object |
| Savta/matkot drag input on iOS | MED | Pointer events + `touch-action:none` (house pattern) |
| Bandwidth: no images | LOW | Whole game <120 KB; offline SW |
| Hebrew RTL layout breaks map | MED | Map is canvas; only overlays flip |
| NBN never licenses | MED | Product stands alone on the arcade; NBN is upside |

---

## 8. Fact-verification checklist (do before any NBN conversation)

The build sandbox cannot reach nbn.org.il. Verify each reward card against
the live Aliyahpedia and mark ✅ here:

- [ ] Application document list (birth cert, passport, rabbi letter, marriage/divorce, background check) and which need apostille
- [ ] Jewish Agency interview wording + who conducts it for North America/UK
- [ ] Airport: Teudat Oleh, temporary Teudat Zehut, first sal klita payment timing
- [ ] Sal klita amounts (do NOT put numbers in the game until verified)
- [ ] Mahane Yehuda Friday closing time; candle-lighting custom (18 vs 40 min)
- [ ] Chabad tefillin stand at the Kotel (daily, free)

---

## 9. Panel review (pre-build, four lenses)

- **Virality 7/10** — matkot Savta and the sunset Kotel run are clip-able;
  share grid is spoiler-free. Missing: a per-game og image (asset-blocked).
- **Retention 6/10** — map locks + 3★ chase carry ~5 sessions. Daily seeded
  mission and Haifa are the next two levers; both deferred on purpose.
- **Stability 8/10** — house engine patterns, single verb per mission,
  headless tests on every mission's pure update loop.
- **Monetization 3/10** — tip jar only. Correct for a $0, pre-traffic build.
  Sponsor slot (NBN / Masa / a bank's olim account) is the real revenue shape.

**Ship gate for this PR:** headless tests green, `node --check` clean,
offline load verified by SW review, RTL overlay check, shelf card + SW bump.

---

## 10. What actually shipped in v1 (updated after build, 2026-09-06)

- `aliyah/index.html` — one file, ~92 KB, no assets, no build. All ten
  missions from §4, the Israel-silhouette world map, two heroes, EN/HE + RTL,
  save/continue, share grid + `?beat=`, GoatCounter `evt-al-*` events, tip
  jar, scoped SW (`aliyah-v1`), manifest. Portal card + SW `v13` + `/aliyah/`
  scope added.
- **Deviations from §4:** shuk haggling is "tap the item while its price
  flashes red" (one verb, not two); the interview shuffles answer order;
  Jerusalem unlocks at 15★ (needs at least one Tel Aviv star), Tel Aviv at
  6★, Arrival at 3★. Missed documents in the archive runner are re-queued so
  the 3★ run is always possible. A runner row never puts a blocking obstacle
  two lanes from the safe lane (fairness rule, headless-verified).
- **Verification:** `aliyah/test/test.js` — 54 assertions, all green at
  390×780, 320×568 and 520×1000, and with `?beat=7&lang=he`; each mission is
  driven to a win by a scripted bot and to a clean fail with no input.
  Playwright walkthrough of every screen at both phone sizes: no page errors.
- **Not done (on purpose):** sprite art pass, music, daily seed, Haifa+,
  the post-arrival bureaucracy side-quest board, fact verification against the
  live NBN site (§8 — sandbox could not reach nbn.org.il).
