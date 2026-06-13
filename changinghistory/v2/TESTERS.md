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

---

## ✅ MILESTONE 2 — "Is there real skill, a build, and a live antagonist?"
*Tests the four M1 mandates.*

### Verdict: **MANDATE MET — greenlight M3 (polish/feel/world).** All four asks are in and the slice now plays like the v2 vision instead of a reskin.

| M2 mandate | Result | Notes |
|---|---|---|
| Fire = "grow as big as you dare" + un-fully-blockable late | ✅ | Gusts now escalate 1→2→3→4 vs 3 windbreaks, so turns 3–4 force triage — you *can't* save every lane. Divergence is driven by final heat (`6 + heat×3 + fed×2`), so the skill is "how big can I grow it and still survive." The risk/reward the panel wanted is now the core, not opt-in. |
| Live History antagonist | ✅ | Rome's 3rd beat is a real-time **Restorer** lane-defense: daggers advance on Caesar over 3 waves, you have 2 shields/turn (3 with Ember-Ward). Hits *weaken your change* (paradox up, divergence clawed back). History now acts *on screen*. |
| Relic draft (build) | ✅ | Pick 1 of {🔥 Flame / 📜 Oracle's Spark / 🛡️ Ember-Ward}. Each visibly changes Rome: Flame unlocks the burn path + fire-cult cascade; Oracle auto-solves the deduction; Ward hardens the Restorer. Three distinct builds from one slice. |
| Legacy unlock | ✅ | Strong runs permanently unlock a starting boon (extra windbreak / Tinder), shown on the title and applied to the next Fire. The run→meta→run loop closes. |
| Rome = mini-campaign | ✅ (bonus) | Now 3 beats: **deduction** (perfect-info logic, uniquely solvable) → **relic-spend decision** → **live Restorer**. Fusion-Frenzy structure achieved. |

### Panel reactions
- **Subset:** "Now it's a *decision* every turn — good. Next, the Restorer and Fire are the same verb (block lanes); give them slightly different textures so the run doesn't feel repetitive." → M3.
- **Mega Crit:** "Three real builds in a two-event slice is the right density. The pull to replay is visible. Want the relic to *combo* with the next era too." → future eras.
- **Daviau:** "History striking live is the whole game now. Make a hit *hurt* more viscerally (camera shake, the king reacting)." → M3 juice.
- **Duolingo UX:** "Beat objectives are clear, but first-timers need a one-line teach on the Fire grid before turn 1, and the meters need a microcopy tooltip." → M3.
- **Mini Metro:** "Paradox finally has live teeth (it feeds the Restorer). Good. Show the claw-back happening, don't just log it." → M3.

### M3 mandate (locked)
1. **Juice & feedback**: shake on a dagger through, ember/king reactions, meter-change pings, win/lose punch. Make consequences *felt*.
2. **First-time teach**: a one-line coached first turn on the Fire grid + meter tooltips.
3. **Texture the two tactics** so Fire and the Restorer don't feel identical.
4. **Show, don't log**, History's claw-back at the verdict.
5. Light pass on balance + a proper share **card image** (reuse v1's canvas) and EN copy polish. (HE + full art remain pre-launch, out of slice scope.)
📱 Still needs a real-device session for touch feel before M3 sign-off.

---

## ✅ MILESTONE 3 — "Does it feel good, teach itself, and read as one experience?"

### Verdict: **SLICE COMPLETE — it proves the v2 thesis.** All five M3 asks are in.

| M3 mandate | Result |
|---|---|
| Juice / consequences felt | ✅ Screen-shake + king recoil when a dagger lands; ember scale-pop on FEED; flash-red on fire damage; meter numbers bump on every change; confetti + gold flash on a changed timeline. Hits now *hurt*. |
| First-time teach | ✅ Coached first turn on the Fire grid (points at the glowing entry tiles → block → resolve), then switches to the FEED-the-fire nudge; both meters have hover/long-press tooltips. |
| Texture the two tactics | ✅ Fire = omnidirectional lane-intercept with directional gust arrows; Restorer = downward *advancing* threat where the dagger one step from the throne pulses as priority. Same family, different decision shape. |
| Show, don't log, claw-back | ✅ High-paradox claw-back now flashes, shakes, toasts "⏳ History claws back −X%", and visibly drains the divergence meter before the verdict. |
| Share card image + polish | ✅ Canvas 1080×1350 verdict card (relic emojis, timeline name, Divergent/Score/Stability stat row, "Can you beat my history?") with image→text→clipboard fallback. EN copy tightened. |

---

## OVERALL SLICE VERDICT: **GREENLIGHT the v2 direction.**

In two events the slice now demonstrates every pillar the redesign promised:
- **You change history, not re-enact it** — your Fire choice *cascades* into a different Rome, and your changes *persist* as relics you spend.
- **Real skill** — perfect-information triage in Fire (grow-vs-defend) and live lane-defense vs History in Rome; performance scales how strongly the change sticks.
- **History is a live antagonist** — it strikes mid-Rome and claws back unstable timelines.
- **It's a build + a continuous quest** — a 3-relic draft, a Divergence×Stability verdict, and a permanent Atlas unlock feeding the next run.
- **Events are mini-campaigns** — Rome is logic → decision → tactics, Fusion-Frenzy style.

### What this slice deliberately is NOT (scope honesty)
EN-only; emoji/CSS art; 2 events (not the full 8 eras); WebAudio bleeps, no music; balance is first-pass; 📱 **not yet device-tested** (no browser in build env — all assessments are design+code reads).

### Recommended path to a real game (post-slice)
1. **Device playtest** the slice; tune Fire winnability + Restorer difficulty on real thumbs.
2. **Content scale**: the engines (tactics grid, deduction, lane-defense, draft) are reusable — author 6–8 more eras as data + branch bibles (the world-building track).
3. **Relic depth**: grow to ~12–15 relics with cross-era combos.
4. **Then** localize (HE/RTL), art pass, and decide launch surface (still unlisted until it earns the shelf).
</content>
