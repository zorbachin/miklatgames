# MIKLAT GAMES — repo guide + how I work here

Free browser-game arcade (miklatgames.fun). Each game is a single `index.html`
(inline CSS/JS, canvas, no build step), offline-first PWA, hosted on GitHub
Pages. The portal (`/index.html`) is the shelf; `/sw.js` caches only the portal
shell and hands off each game's own scope.

The full build pipeline lives in `.claude/os/GAME-FACTORY.md` (7 stages,
stage-gates). Per game: `WORLD.md` (vision bible), `PANEL-VERDICT.md`
(adversarial review). Read those before building a new game.

---

## 🧭 Operating method — economical, staged building

How I approach any non-trivial task — adapted from how this arcade was actually
built. **Core principle: rigor scales with change size.** Never heavy process on
light work; never light process on heavy work. The staging exists to spend the
fewest credits on the fewest failures — it is economy, not ceremony.

### Default loop (anything beyond a small tweak)
1. **Vision first (≤10 lines).** Goal, the chunks, and how each chunk connects.
   Get a nod before building anything big or hard to reverse.
2. **Chunk + gate.** Build one chunk, prove it works in isolation, then wire the
   next. Small gates = small, cheap failures. Never big-bang a whole feature and
   then debug the tangle.
3. **Headless logic check before polish.** Extract the pure logic and assert it
   (node) before touching visuals/UX — catch bugs in seconds, not after a
   deploy-and-eyeball cycle. Minimum: `node --check` the extracted inline JS.
   Better: real assertions on the logic (fable5 ran 25/25 node assertions on
   Iron Dome before art).
4. **Adversarial self-review before "done".** Run the diff through the lenses
   that bite here: does it break offline? mobile? the "works in the shelter / no
   signal" data promise? Is anything now orphaned (dead listeners, stale IDs) or
   duplicated? Only report green when it passes. (This is what caught the
   duplicate Iron Dome card and the orphaned `cardWhack` listener.)
5. **Verify, then report plainly.** Say what was checked and how. No false
   "done"; if something is skipped or failing, say so.

### Scale rule
- **Tiny (≤ a few lines):** just do it + verify. No spec, no ceremony.
- **Feature / structural change / new artifact:** run the full loop above.

### Standing habits
- **Update the vision/spec when reality diverges**, so future sessions don't
  rebuild what exists (fable5 nearly rebuilt Iron Dome's daily mode because
  `WORLD.md` was stale — the "stale-doc" trap).
- Respect repo invariants before adding: single-file pattern, offline + data
  promise, i18n EN/HE + RTL, **bump the SW cache version** on any portal change.
- Keep a visible checklist for multi-chunk work so state is legible.
- Compress media hard (H.264, drop audio on muted loops, size to real render
  width); never let an asset break the no-signal promise — gate heavy loads on
  `navigator.onLine` and keep game scopes out of the offline cache.
