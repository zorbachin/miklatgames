# CHANGING HISTORY — v2 design spec ("Beat History")
*Creative-direction rethink · 2026-06-13 · supersedes the v1 core loop in WORLD.md*

This doc answers two hard notes on the shipped v1:

1. **No real skill** — the v1 mini-games (tap-the-green timing, tap-fast mash) are reflex/luck, not skill or strategy. There is no *decision* to be good at.
2. **You're not changing history, you're re-enacting it** — v1 has you perform history's counterfactual once, then read a static joke card. The consequence doesn't persist, doesn't compound, and doesn't travel with you. There's no continuous quest and nothing to *beat*.

v2 fixes both with one reframe and a persistence engine borrowed from the best games that already solved this.

---

## The reframe: History is the antagonist

You are not a tourist re-enacting events. You are a **Meddler** building a timeline that is *yours*. **Capital-H History is a living force that fights to restore "what really happened."** You win by making a change **stick**, **compound** into later eras, and **survive** History's correction.

This single move converts "repeat the past" into **"beat the past"** — and it forces skill, strategy, and persistence to exist, because every choice now has to pay off three eras later.

---

## Chosen model: roguelike runs → one persistent Atlas (the Hades model)

A **run** is a journey down the timeline (Prehistory → Future), ~6–10 Crossroads, a few minutes each.
- Within a run, your changes **persist and tag along**, mutating what comes next.
- A run ends with a **Present-Day verdict** scoring the timeline you built.
- Every stabilized timeline is permanently deposited into the **Atlas of Timelines** (the meta) — the one ever-growing world you keep reshaping across runs, plus the unlocks that deepen future runs.

*Why this and not a single persistent grand timeline:* short runs fit mobile sessions and drive replay; the Atlas still delivers the "permanent ever-growing world" feeling as the meta-layer. The Phase-1 vertical slice is identical for both framings, so this choice is low-cost and reversible (lengthen runs later if desired).

---

## The five systems

### 1. Timeline DNA (persistence + strategy) — *Slay the Spire / Hades*
Each change grants a **persistent Relic** (a power that travels with you and changes downstream events) **and** a persistent cost (instability, or a paradox tag). Relics **synergize** — collecting Fire + Latin + Raptors creates combos that auto-solve or transform later beats. The strategy is the *run*, not the tap: which change, which relic, which route.

### 2. Cascade (you change what comes next) — *Crusader Kings / Civ*
A change rewrites the next Crossroads: which events appear, which tools you hold, and what the micro-games *are*. Save the dinosaurs and Rome becomes **Raptor-Mounted Rome** with different beats and different solutions. Give cavemen fire and you carry a **Flame** tool you can spend in the Roman siege. Consequences are in your hands as you play — not in a museum.

### 3. Paradox & History's Restorers (stakes + risk/reward) — *Mini Metro tension*
Every divergence raises an **Instability meter**. The more you change, the harder History pushes — **Restorers** and paradox events appear mid-Crossroads trying to undo your work. Instability is a resource you manage: bank it for a bigger payoff, or play safe and stable. This is the strategic tension v1 completely lacked.

### 4. Tactical skill, not twitch — *Into the Breach*
Skill = **perfect-information tactics + meaningful decisions + mastery scoring**, not reaction time:
- **Draft choices** with real tradeoffs at every node.
- At least one **Into-the-Breach-style tactical micro-game** per Crossroads: you see the threat and your limited tools, and you out-think the moment (no hidden luck).
- **Mastery scoring**: *how well* you play decides *how strongly* the change sticks. A clean run = a wildly divergent, stable timeline; a sloppy run = History claws it back. Skill expresses as divergence.

### 5. Crossroads = a mini-campaign — *Fusion Frenzy / Mario Party*
Each historical event is a **3–5 beat themed sequence** that escalates to a climax "Divergence" game, with your carried tools usable inside it. Variety, escalation, payoff — instead of one shallow tap.

---

## World-building as its own pillar (fun-first, not lore dumps)

A dedicated **branch bible** per major divergence: each change opens a *coherent* world with its own cast, tech tree, and running jokes that **build across eras** rather than one-off gag cards. Delivered through play and quick reveals (Civ-style flavor + Disco-Elysium wit), never as walls of text. The persistent **State of Your Timeline** is the living, shareable artifact — and the Present-Day verdict card is the brag.

This needs a small dedicated world-building track (the "world team") whose only job is keeping each branch deep *and* funny, and ensuring combinations (Fire + Rome + Mars) read as one coherent, hilarious world.

---

## Vertical slice to build first: "Fire → Rome"

Proves persistence, a carried tool, History fighting back, a mini-campaign, and tactical skill — all in one thread.

**Crossroads A — First Fire (Prehistory)**
- Beat 1 (tactical): position the tribe around the ember so a perfect-info "wind" pattern doesn't blow it out (Into-the-Breach-style, solvable).
- Beat 2 (decision): keep the fire small & stable (low instability) or build a bonfire (big payoff, +instability).
- Reward: Relic **🔥 Flame** (spendable later) + instability based on your choice.

**Crossroads B — Save Caesar (Classical), mutated by Fire**
- The world is now *Fire-Cult Rome*; the brief and cast reflect it.
- Beat 1 (deduction): identify the conspirators from clues.
- Beat 2 (spend Flame): burn the plot letter — or save Flame for later if you're building toward it.
- Beat 3 (tactical + Restorer): a History Restorer crashes the Senate; solve the standoff with your tools.
- Climax (mastery): the Divergence game — how cleanly you play sets how hard the change sticks.
- Reward: Relic **🏛️ Eternal Latin** (auto-solves a future "decode" beat).

**Run end — Present-Day verdict**
`Divergence % × Stability` → e.g. *"The Burning Latin Republic — 78% divergent, stable."* Deposited into the Atlas; unlocks a new starting relic.

---

## Build plan (phased, no boil-the-ocean)

- **Phase 1 — Persistence skeleton:** run state + Relics that carry forward + Paradox meter + run-end verdict, bolted onto reskinned v1 mini-games. Proves the *feeling*.
- **Phase 2 — Skill + structure:** convert Crossroads into 3-beat campaigns; add one true Into-the-Breach tactical micro-game; add mastery scoring → divergence.
- **Phase 3 — World & meta:** branch bibles, the Atlas of Timelines, cross-run unlocks, shareable verdict cards.

Reuse from v1: the i18n/RTL frame, WebAudio, offline SW, share-card canvas, the timeline-name generator (becomes the verdict-card namer).

---

## Open questions (don't block Phase 1)
- Run length target (3 min vs 8 min) — resolved by playtest, not up front.
- How punishing should History be (does a run *fail*, or just score lower)? Lean: lower score, rarely a hard fail — keep it casual.
- Relic count at launch (aim ~12 for real synergy without overwhelm).
</content>
