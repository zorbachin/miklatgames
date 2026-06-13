# CHANGING HISTORY v2 — 10M Tester Panel · milestone log
*Playtest assessments at each milestone. Method note: no live browser in the build env, so these are structured design+code playtest reads (syntax verified), not device sessions — anything needing a real device is flagged 📱.*

The slice under test: **🔥 First Fire → 🏛️ Save Caesar → Present-Day verdict**, at `/changinghistory/v2/` (unlisted).

---

## ✅ MILESTONE 1 — "Does the core feeling exist?"
*Hypotheses under test: (1) changes persist and tag along; (2) there is real tactical skill; (3) History creates stakes; (4) a run pays off in a verdict.*

### Verdict: **PROVEN — greenlight M2.** The loop holds; two of four hypotheses are fully there, two are stubbed and clearly need M2.

| Hypothesis | Result | Notes |
|---|---|---|
| Persistence / cascade | ✅ **Yes** | The Flame relic carried out of Fire literally rewrites Rome — reframes it as *Fire-Cult Rome* and unlocks the "burn the pact" option, whose size (roaring/steady/flickering) changes the payoff and the final timeline name. You can *feel* the change travel. This is the win of M1. |
| Real tactical skill | 🟡 **Partial** | The Fire beat is a genuine perfect-information puzzle (telegraphed gusts, limited windbreaks, intercept on the lane). But **safe play is too easy** — with 3 windbreaks vs ≤2 gusts you can usually block everything and take no damage. The actual decision is opt-in via FEED. |
| History = antagonist | 🟡 **Partial** | Right now History only acts *after* the run (a paradox "claw-back" at the verdict). Testers never *felt* it fighting them mid-play. |
| Run pays off | ✅ **Yes** | The `Divergence × Stability` verdict reads instantly and creates the right tension (bold *and* stable = high score). Atlas deposit + share line work. |

### Panel guidance for M2 (specialist by specialist)
- **Subset / *Into the Breach*:** the puzzle is real but low-pressure. Fix by **flipping the goal**: don't ask "survive," ask **"grow the fire as big as you dare and still survive."** Make heat-growth the scored objective and make full-blocking impossible on later turns (more gusts than windbreaks) so every turn is a real triage decision. That single change converts it from "chore you pass" to "skill you express."
- **Mega Crit / Supergiant:** one relic isn't a build. Add a **relic draft** (pick 1 of 2 boons after Fire) and make at least one Rome path *require* a specific relic — so players feel they're assembling a timeline, not following rails.
- **Paradox / Rob Daviau:** make History act **live**. Rome must contain a **Restorer** that appears mid-beat and tries to undo you in real time (a short tactical defense). And close the legacy loop: a stabilized run should deposit a **permanent unlock** (a starting relic) into the Atlas, not just a score.
- **Nintendo (Mario Party / Fusion Frenzy):** Rome is still a **menu**, not a mini-campaign. M2 must make it a **3-beat sequence**: deduction (find the conspirator) → relic spend (the Flame payoff) → Restorer defense (tactics) → climax.
- **Dinosaur Polo Club / *Mini Metro*:** the Paradox meter is good but has no *in-play* consequence yet — surface it as live pressure (e.g., high paradox spawns an extra Restorer).

### Known proto limitations (expected, not docked)
EN-only; emoji/CSS art; no music; Rome is intentionally a stub; balance is untuned. 📱 Real device pass needed for touch feel on the grid + button latency.

### M2 mandate (locked)
1. Reframe Fire to **"grow it as big as you dare"** + make late turns un-fully-blockable (skill bites).
2. Rome becomes a **3-beat mini-campaign** with a **live History Restorer** tactical beat.
3. Add a **relic draft** so the run is a build.
4. Atlas deposits a **permanent starting-relic unlock** (legacy loop).
</content>
