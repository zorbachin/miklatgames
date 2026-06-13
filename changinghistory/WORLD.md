# 🕰️ CHANGING HISTORY — world bible v1

**Pitch:** *What if YOU could change history?* Travel through time, alter one
famous event in a 30-second mini-game, and watch the timeline mutate into a
wildly different (and funnier) present. Stack changes and the worlds collide:
**Dinosaurs survive + Caesar lives + Tesla wins = the Dino-Roman Cyber Empire.**

**The one rule that makes it work:** **FUN → CURIOSITY → LEARNING.** Never the
reverse. The player first wonders *"what happens if I save the dinosaurs?"*,
plays a fast game to find out, laughs at the alternate timeline — and only
*then*, if they tap **History Mode**, discovers what actually happened. This
is not an educational game wearing a fun costume. It is a fun game where the
history leaks in through curiosity.

This is the arcade's first **global, non-Israeli** title — the same house
craft (single file, offline-first, EN/HE, WebAudio, juice) pointed at a
worldwide 10M-download audience.

---

## 🎮 The core loop (Quick Play, ≤60s)

1. **Briefing** — one card: event, year, the dare ("Stop the asteroid?").
2. **Mini-game** — one mechanic, one objective, minimal reading.
3. **Outcome** — success or fail, with juice.
4. **Timeline Reveal** — the signature beat: your change rewrites the present.
5. **Reward** — Timeline Shards + a Museum exhibit + (sometimes) a Figure.
6. **Next** — back to the map; the next node unlocks.

History Mode adds context, characters, and the real takeaway to steps 1 & 3,
and stretches sessions to 3–8 minutes. It is **off by default**.

---

## 🕹️ Mini-game engines (mechanics are reusable; events are data)

The whole content strategy rests on this split. Five tight, juicy mechanics
power every event. A new event is a **data row**, not new code — which is how
the catalog scales to 500+ without touching the engine.

| Engine | Verb | Feels like | Example events |
|---|---|---|---|
| **AIM** | drag-aim-launch at a moving target | Angry Birds / artillery | Stop the Asteroid, Archimedes' Mirror, Land on Mars |
| **DODGE** | steer left/right, survive the gauntlet | endless runner | Titanic, Columbus's Voyage, Escape the Plague |
| **TIMING** | stop the marker in the green zone | rhythm/skill-check | Warn Caesar, Stack the Pyramid, Charge Tesla's Coil |
| **MASH** | tap fast to fill the bar before time | button-masher | Row the Longship, Blow the First Ember |
| **SEQUENCE** | watch, then repeat the pattern | Simon | Save the Library of Alexandria, Crack the Code |

Each engine ships with **difficulty params** (speed, target count, lives,
zone size) so the same mechanic spans Quick Play → Boss without new art.

---

## ⏳ The Timeline System (the franchise feature)

Every win sets a **change flag** (a `tag`: `DINOS`, `CAESAR`, `TESLA`…). The
present is *generated* from the set of active tags:

- **Adjective stacking** — each tag carries a world-adjective (`Dinosaur`,
  `Roman`, `Tesla-powered`). The present's name is composed:
  *"The Dinosaur Roman Tesla-powered Empire."*
- **Special combos** — hand-authored mashups for the funniest pairs/triples
  fire when their full set is present (`DINOS+CAESAR+TESLA → Dino-Roman Cyber
  Empire 🦖🏛️⚡`).
- **Consequence lines** — a seeded pool of one-liners per tag and per combo
  ("Senators now ride velociraptors to work").

With ~13 launch tags the generator already yields thousands of distinct
present-day cards; at 50 tags it is effectively unbounded. Each card is a
**shareable Timeline Card** (the Wordle-grade growth unit).

---

## 🏛️ The Museum of Changed History (retention spine)

Every cleared event unlocks an **exhibit** in the player's Museum — a room of
artifacts from the timeline they created (Dinosaur currency, Caesar's
smartphone, a Viking Starbucks cup). The Museum is the always-growing trophy
case players return to, show friends, and complete. Long-term retention lives
here, not in the level grind.

Collections layered on top: **Timeline Shards** (soft currency), **Famous
Figures** (character cards), **Timeline Cards** (the generated presents),
**World Wonders** and **Alternate Technologies** (boss rewards).

---

## 🗺️ World map — eras

Prehistory → Ancient → Classical → Middle Ages → Age of Exploration →
Industrial → Modern → Future. Each era is a band on a vertical scrolling
timeline; nodes unlock left-to-right. Node types: **main**, **secret**,
**challenge**, and an era-capping **boss** (a multi-stage historical crisis,
e.g. *Save Rome*: Politics → Military → Economy → Diplomacy → Invasion — each
stage a different engine).

---

## 💰 Economy & monetization (design intent)

- **Soft currency:** Timeline Shards (earned by clearing/replaying).
- **No pay-to-win, no energy walls** in the fun core — the arcade ethos.
- **Monetization (if ever):** cosmetic Museum themes, a "Time Traveler's
  Almanac" season pass (extra cards + boss skins), and the existing house
  **tip jar**. Education stays free and optional, always.

---

## 📈 Live ops & content pipeline

- **1 event/week** drop ("This Week in Changed History"), often tied to the
  real date ("On this day…").
- **Weekly Challenge** — one seeded event, global leaderboard, one share card.
- **Seasonal timelines** — themed event clusters (Spooky timeline, Space race).
- Because events are data rows, an author can ship a new one by adding to the
  `EVENTS` table — no engine work.

---

## 🎨 Art & tone

Bright, instantly readable, memorable silhouettes, shareable. Launch build is
**emoji + CSS/canvas** (zero asset dependency, ships today, works offline);
the art upgrade path is the arcade's `prompts.json` pack pipeline (vibrant 3D
cartoon, thick outlines) when a title earns it. Tone: playful, surprising,
globally legible, gentle with real history. Zero gore.

---

## 🧩 Tech shape (house invariants)

Single `index.html`; one canvas + DOM layers; offline-first `sw.js`; i18n
EN/HE with RTL; lazy WebAudio (no sound files); `localStorage` for progress
(`ch.*`); GoatCounter events `evt-ch-*`; `?beat=` challenge links; standard
share-with-clipboard-fallback. No backend at launch — every social feature
rides the URL (challenge links, shared Timeline Cards), exactly like the rest
of the shelf.

---

## ✅ MVP (this build) vs. roadmap

**Shipped in v1 (the playable vertical slice):**
- Map across all 8 eras, 13 events, all 5 engines.
- Quick Play loop end to end: brief → game → outcome → **Timeline Reveal**.
- Timeline generator (adjective stacking + special combos + consequence lines).
- Museum with per-event exhibits; Timeline Shards; Figures.
- History Mode toggle (real-history blurbs on brief + outcome).
- EN/HE, audio, offline, share Timeline Card, `?beat=` challenge.

**Roadmap (post-MVP, no core redesign needed):**
- Boss events (multi-stage), secret/challenge nodes.
- Weekly drop + Weekly Challenge leaderboard.
- `prompts.json` art pass; Museum cosmetic themes; season pass.
- Friend Museums / Timeline trading via shared URLs.
</content>
</invoke>
