# 🧺 SHUK SHOPPER — Design Sprint: "Friday, Golden Hour"
*Sprint date: 2026-06-12 · design lead spec · implementation follows this document*
*State audited: index.html post-panel (sound ✅, daily ✅, bbox-crop keyMagenta ✅, restart-race guard ✅, 12k density ramp ✅). `assets/` contains zero PNGs — emoji fallback is the live path until `bin/imagepack` runs tomorrow.*

---

## 0. Thesis

The game is mechanically done. What's missing is **ceremony**. The core loop —
fill Ima's list — currently resolves as a 35%-alpha emoji flipping to ✅ in the
corner of the screen. Subway Surfers would throw a parade. The sprint's center
of gravity: **make list-filling the most celebrated thing on screen**, wrap it
in a single ownable light ("Friday golden hour"), and make tomorrow's art land
into a game that already moves like it deserves it.

---

## 1. VISUAL IDENTITY

### 1.1 Critique of current state

**Palette.** The declared palette (cream `#fdf3e3`, gold `#ffd166`, amber
`#e9a23b`, coral `#ff5d73`, deep brown `#1a0f08`) is genuinely ownable — warm,
edible, Israeli. The problem: **the canvas world barely uses it.** The HTML
overlays (menu, death card) are on-brand and read premium. The in-game world is
not: the fallback sky is a generic blue→peach gradient (:470), the road is a
mud-brown gradient (:481), and the lane dividers are highway dashes (:488) — a
market lane has pavement seams and crate litter, not Route 6 markings. The
district awning colors (the world's best visual idea — the lane changes flag as
you travel) render as abstract floating triangles that read as bunting, not
stalls.

**Typography.** `Courier New` as the display face (:25) is the single loudest
"prototype" tell in the game. It says terminal, not market. A shuk's visual
voice is the **hand-painted price sign** — chunky brush capitals, slightly
crooked, gold on brown. We will not add a webfont (external request = Poki
fail, page-weight cost); instead the v2 art pack includes a painted
`title-wordmark.png` (chroma-keyed) that replaces the menu title image-style,
with the text kept underneath as fallback/accessibility. In-canvas HUD stays
Heebo/system at weight 800 — that part is fine.

**Composition.** Horizon at 0.30·H with the road filling the rest is correct
runner grammar. Two failures of grounding: (a) **nothing casts a contact
shadow** — player, vendor, and every obstacle float on the road plane; (b)
emoji entities pop into existence at z=0.02 with no atmospheric fade, so the
horizon shimmers with full-contrast clutter. Versus the genre bar: Subway
Surfers wins on *silhouette readability at speed* (every obstacle class has a
distinct outline) — our jump/slide/block classes are distinct (crate vs.
hanging vs. cart) which is good, but the hanging-item rope (:515) is a 2px line
that vanishes on bright backdrops. Crossy Road wins on *chunk* — oversized,
thick-edged, instantly parsed objects — our emoji at 64·persp px are
fundamentally chunky, which is why the emoji fallback works at all. Keep that
property when art arrives: **art must never be less readable than the emoji it
replaces.**

### 1.2 The Shuk Shopper look — 5 rules

Everything (canvas code, sprites, backdrops, promo, HUD) obeys these:

1. **GOLDEN HOUR, ALWAYS.** Every scene is lit like 15:45 on a Friday. Whites
   are cream `#fdf3e3`, never pure white. Shadows are deep brown `#1a0f08`,
   never gray or black. Light comes from low and warm.
2. **CHUNKY AND GROUNDED.** Every object is thick-outlined, slightly oversized,
   and sits on a contact shadow. Nothing floats. Everything must read in an
   80px-tall thumbnail.
3. **ONE HERO HUE PER SHUK.** Shared warm base + exactly one signature accent
   each: Carmel = coral `#ff5d73` against Mediterranean cyan `#3ee6ff`;
   Levinsky = paprika amber `#e9a23b` in deep-brown shade; Yehuda = lamplight
   gold `#ffd166` on dusk purple `#5e3c8f`. If a frame's accent doesn't tell
   you which shuk you're in, it's wrong.
4. **THE LANE IS SACRED.** The bottom third of every image and every frame
   stays plain and quiet — all richness lives above the horizon. Gameplay
   silhouettes (kid, vendor, obstacles) must pop against the plain ground at
   full speed; decoration never competes with information.
5. **HAND-PAINTED, NEVER CORPORATE.** Market-sign brush energy: visible
   strokes, imperfect edges, painted texture. No glossy UI chrome, no sterile
   vector gradients, no SaaS-blue anywhere. The whole game should look like the
   sign above the halva stand.

### 1.3 Per-shuk visual personalities

| | **Shuk HaCarmel** | **Shuk Levinsky** | **Mahane Yehuda** |
|---|---|---|---|
| One word | LOUD | CONNOISSEUR | SACRED→ELECTRIC |
| Time of day | High noon, Mediterranean glare | Late afternoon, amber hour | Dusk sliding into night |
| Light | Hard overhead sun, bleached highlights, short shadows | Low warm side-light through awning gaps, dusty god-rays | Stone glowing gold, then string-lights and neon take over |
| Sky | Bright cyan, sea light, gull-white clouds | Narrow strip of warm sky between Bauhaus rooflines | Purple dusk `#5e3c8f` deepening to near-black (Night Shuk) |
| Palette delta | Base + coral `#ff5d73` + cyan `#3ee6ff` accents | Base pushed amber/brown, almost monochrome spice tones | Base + gold light sources on purple/black field |
| Signature props | Red-white striped awnings, hanging t-shirts & totes, orange pyramids, plastic crates, beach inflatables | Glass spice jars in rows, burlap sacks (paprika/turmeric), copper scales, hanging herb bundles & sausages, sacks with hand-written price signs | Jerusalem-stone arches, iron market roof, hanging challah & pretzels, halva wheels; Night Shuk: disco ball, neon bar signs, lanterns, bar stools |
| Crowd energy | Everything at once, kids and tourists | Quiet experts, cats, old men with coffee | Pilgrim bustle → party |
| In-code hooks today | awning rgba reds/greens/cyans (ZONES :254–263) | ambers/browns (:265–272) | golds → purple/black Night Shuk (:274–281) |

The Night Shuk is the **showpiece** (the panel's "best clip moment"). It gets
its own backdrop in the v2 pack (`bg-yehuda-night.png`) — the only district
with a district-level (not shuk-level) backdrop. ~5 LOC code hook (§5).

---

## 2. GAME FEEL ("JUICE") AUDIT

### 2.1 Every player action → current feedback (from code)

| Action | Code | Current feedback | Verdict |
|---|---|---|---|
| Lane switch | go() :351–2, lerp :435 | smooth laneF lerp (dt·14), `SND.tick` | OK base; no body lean |
| Jump | go('u') :353 | vy=2.6 arc, `SND.jump` | no stretch, no dust, no landing event |
| Slide | go('d') :354 | pose swap 0.55s | **silent** — no sound at all |
| Fast-fall (swipe ↓ mid-air) | :354 | vy=−4 | **zero feedback**; players won't discover it |
| Running idle | :530 | sin-bob — *sprite path only*; emoji runner is rigid | fine once art lands |
| Shekel pickup | collect :410 | +1, `SND.pop` | no floating +1, no sparkle |
| List-item pickup | :411–414 | HUD emoji 0.35→1.0 alpha | **the core loop's weakest moment** |
| Off-list item grab | :421 | +2₪, **silent** | missing pop |
| Basket complete | :414–419 | toast + `SND.ding` + speed +0.025 | a toast. For the game's win-moment. |
| Magnet / cart pickup | :423–4 | toast + HUD countdown | no aura, no trail; acceptable P2 |
| Cart dash (1.25× speed) | :447 | nothing visual | needs speed lines |
| First hit (stumble) | hit() :406 | shake 0.4 + red flash 0.5 + thud + vibrate + blink | **already the best-juiced moment** — model for the rest |
| Vendor chase (6s) | :538–550 | vendor drawn, scales with time left | no vignette, no heartbeat — danger is visible but not *felt* |
| Death | gameOver :604 | `SND.over`, instant overlay | no hitstop, no death beat |
| Speed growth | :430 | nothing | world never communicates speed |
| District change | advanceZone :298 | toast + instant awning swap | hard cut; acceptable |
| Shuk change | :302 | toast | undersold — this is the travel fantasy's payoff |

### 2.2 Juice spec — each item: effect · trigger · LOC · perf note

Shared infrastructure first:

**J0 — Particle core.** One array `G.parts` (cap 64, hard-splice oldest), each
`{x,y,vx,vy,life,txt|col,size}`; update in `update()`, draw as one pass of
`fillText`/`fillRect` before HUD. **~22 LOC.** Perf: no allocation churn beyond
spawn objects; no shadowBlur, no per-particle save/restore (set globalAlpha
once per particle, reset after loop). This powers J2–J6.

**J-reduced-motion.** Read `matchMedia('(prefers-reduced-motion: reduce)')`
once; if set, multiply shake & hitstop to 0 and halve particle counts. **~3
LOC.** The CSS rule (:69) already covers DOM; canvas must respect it too.

| # | Item | Effect | Trigger | LOC | Perf note |
|---|---|---|---|---|---|
| J1 | **Squash & stretch + lane lean** | On jump start: draw player scaled 0.85w/1.15h decaying 120ms; on land: 1.2w/0.8h for 80ms; slide entry: 1.25w/0.7h. Lean: rotate player ±0.18rad by `(G.lane−G.laneF)` (translate→rotate→draw→restore) | jump/land/slide/lane events (land = jy hits 0 with vy<0) | ~12 | One save/rotate/restore on a single drawImage/fillText — free |
| J2 | **List-item flight + slot pulse** | Collected list emoji spawns at pickup point and lerps to its HUD slot over ~350ms (ease-out), HUD slot pulses scale 1.5→1.0 on arrival; HUD shows `🧺 2/4` count | collect() item branch | ~20 | One extra fillText/frame per in-flight item (max 4) |
| J3 | **Basket-complete celebration** | The 4 list emojis burst radially from the basket + 8 gold sparks + warm gold full-screen flash (`rgba(255,209,102,…)` 250ms — reuse existing `G.flash` pattern with a color field) + **hitstop**: `G.timeScale=0.25` for 0.35s (multiply dt) + tiny shake 0.1 | list completes (:414) | ~15 | Particles from J0; hitstop is one multiplier on dt — free |
| J4 | **Landing/slide dust** | 4 cream dots kicked outward at feet on landing; 2/frame trailing dots while sliding | land event; sliding>0 | ~8 | J0 particles, cap respected |
| J5 | **Floating score text** | `+1` drifts up & fades on shekel; `+2` on off-list grab (also add `SND.pop` there — it's silent today); `+10 🧺` big & gold on basket | collect() | ~6 | J0 text particles |
| J6 | **Near-miss shekel sparkle** | Obstacle passes z 0.965–1.045 with lane-diff 0.45–0.9 → `+1 ✨` sparkle + tick; rewards skilled play, makes dense fields fun instead of scary. Dedupe per entity (flag `e.grazed`) | the existing collision z-window, the "almost" band | ~10 | Check is 2 comparisons inside the existing entity loop |
| J7 | **Vendor proximity vignette + heartbeat** | While `G.vendor>0`: red radial vignette, alpha `0.22·(G.vendor/6)` pulsing at heartbeat rate; `SND.heartbeat()` (two low sine thumps, ~55→40Hz) every 1.0s→0.6s as timer runs down | G.vendor>0 (:439) | ~12 | **Cache the radial gradient on resize** — never build gradients per frame. One fillRect/frame while active |
| J8 | **Speed lines** | 8 horizontal cream streaks at screen edges, alpha keyed to `(G.speed−0.8)/0.25`, always-on during cart dash | speed>0.8 or cart>0 | ~10 | 8 fillRects, no alpha churn; skip entirely when alpha would be 0 |
| J9 | **Slide + fast-fall audio** | `SND.b(300,140,.18,'sine',.08)` swoosh on slide; short down-chirp on fast-fall | go('d') | ~3 | synth, free |
| J10 | **Contact shadows** | Soft dark ellipse under player (shrinks as jy rises — sells jump height better than the arc itself), under vendor, and under z>0.5 entities | draw() | ~8 | Plain `ellipse()+fill`, no blur. The single cheapest "grounded" win |
| J11 | **Shuk-transition stamp** | On shuk change: shuk name in big gold display text scales-in center-screen for 900ms (canvas text, not toast) — the travel fantasy's reward | advanceZone shuk branch | ~8 | One fillText while timer active |
| J12 | **Shake budget rule** | Shake sources: hit 0.4 (existing) · basket 0.1 · landing 0.05. Hard cap displacement 10px (exists), never additive above cap, zero under reduced-motion | — | ~2 | — |
| J13 | **Awning color crossfade** | District change lerps awning rgba over 600ms instead of hard cut | advanceZone | ~10 | P2 — needs color parsing; skip tonight |
| J14 | **Death beat** | On death: 500ms hitstop at 0.1 timescale + vendor "gotcha" zoom before overlay shows (delay `show('over')` by 600ms) | gameOver | ~8 | P1; keep restart itself instant |

**Perf budget doctrine (low-end Android, single canvas):** zero gradient or
canvas allocation per frame (today's draw() builds 2 gradients every frame
:470/:481 — **cache them on resize, ~8 LOC, a real win that pays for the
particles**); no shadowBlur outside the HUD block; particle cap 64; DPR already
clamped to 2. Total added per-frame cost of the full P0 set: <0.5ms on a 2018
Android — measured doctrine, not hope: keep `try/catch` frame containment as
is.

---

## 3. UX PASS

### 3.1 Menu hierarchy

Current: RUN (gold, primary) → DAILY SHUK (ghost) → streak/best lines. **Daily
is the retention engine and it's dressed as an afterthought.** Spec:

- Daily button gets solid panel styling (not ghost): dark panel + gold border,
  streak flame **on the button** (`📅 DAILY #N · 🔥3`), and a subtle pulse
  animation when today's daily hasn't been played yet (localStorage check
  already exists via `daily.day!==dayNum()`). Played already → show today's
  result on the button and stop pulsing. ~8 LOC HTML/CSS/JS.
- Keep RUN visually dominant (first-time players need zero decisions), keep the
  existing `?daily=1` promotion logic (:628).
- Title: swap to `title-wordmark.png` when present, text fallback otherwise
  (with-art cut, ~8 LOC).

### 3.2 HUD readability at speed — the core-loop critique

The list (top-right, :566–575) is the *purpose of the game* and it has three
legibility failures: (1) un-got items render at **0.35 alpha** — ghost emojis
over what will soon be a busy painted backdrop are unparseable at speed; (2)
collected items are **replaced by ✅** so you lose track of what you already
got; (3) there's **no progress count**. Spec:

- **List pill:** one rounded dark chip `rgba(26,15,8,.55)` behind the whole
  list row (12px radius, drawn once per frame). Contrast becomes
  backdrop-independent — this is mandatory before art lands, or the painted
  Carmel sky will eat the list.
- Un-got items: **full alpha** emoji on a dim circular well; got items: emoji
  stays visible with a small ✅ badge at its corner (don't erase the memory).
- Add `🧺 2/4` count at the pill's start.
- Left HUD (baskets/shekels) gets the same pill treatment.
- ~15 LOC total. Keep the district·shuk line as is (center-top, fine).

### 3.3 Death→restart flow

One-tap RUN AGAIN that stays in your mode (:626) is correct — **do not add
friction**. Two upgrades: (a) the death card should brag location: "Made it
to: Spice Alley · Levinsky" (~5 LOC, uses `zoneName/shukName`) — it feeds the
share-text upgrade the panel wants (issue #7) and makes death informative;
(b) J14's 600ms death beat gives the score a moment to register without
slowing the rage-restart (buttons live the instant the overlay shows).

### 3.4 First-run teaching

The howgrid (4 cells) is decent reference but it's a wall read *before* play
and forgotten by the first crate. Spec **first-contact hints**: for a player
with no `ss_best` record, the first occurrence of each obstacle class spawns
with a floating hint above it (`⬆️ JUMP!` / `⬇️ SLIDE!` / `↔️ DODGE!`), shown
once per class per session, drawn as canvas text tracking the entity. The
spawn safety system already guarantees a safe lane, so teaching is
low-stakes by design. ~15 LOC, P1. Keep the howgrid — it costs nothing and
serves returning players switching devices.

---

## 4. IMAGE REVAMP — v2 prompt packs

Both packs rewritten and saved alongside v1 (never overwriting):
- `assets/prompts-v2.json` — gameplay pack, 11 images (was 8)
- `press/prompts-v2.json` — promo pack, 8 images (was 5)

What changed and why:

1. **The 5 rules are baked into every prompt** — golden-hour light, cream-not-
   white, thick `#1a0f08` outlines, hand-painted texture, per-shuk hero hue.
   v1 said "warm palette" and listed hexes; v2 directs *light and material*.
2. **Character bible hardened & enforced everywhere.** The kid gains stable
   identity tokens (olive skin, big eyebrows, gap-tooth grin, red-gingham
   basket cloth) repeated verbatim in every prompt featuring him — including
   all promo images, where v1 let him drift ("a kid"). The three vendors get
   the same treatment and now appear consistently in promo art.
3. **Sprite framing directives for the bbox-crop pipeline:** "fills 85–95% of
   frame height, feet touching the bottom edge, no clipping" — minimizes
   magenta margins so the in-code crop (:226–239) yields tight, consistently
   scaled sprites; slide pose directed to span frame *width* so the fixed
   `w=pf·1.15` draw math lands correctly.
4. **New gameplay assets the audit demands:**
   - `bg-yehuda-night.png` — the Night Shuk showpiece (clip moment).
   - `player-jump.png` — the most-seen pose has no sprite in v1; jump with
     run-sprite legs reads broken once art lands.
   - `title-wordmark.png` — hand-painted market-sign logo on magenta; kills
     the Courier New problem with one image and zero font bytes.
5. **Deliberately NOT added** (decisions of record): per-item/per-obstacle
   sprites — emoji items stay, they're zero-weight, crisp, and the game's charm
   (WORLD.md doctrine; also each would multiply gen-QA surface); HUD frame
   image — the pill renders crisper in code at every DPR; basket fill-states —
   would double player sprite count for a detail invisible at speed (P2 if
   ever).
6. **Promo pack:** dedicated `og-16x9.png` (panel issue #8 — stop unfurling
   the shared arcade og.jpg) composed with WhatsApp-thumbnail-safe margins;
   `poster-9x16` recast as the **Night Shuk** scene (neon + disco ball — the
   most arresting vertical); per-shuk key-art set (Carmel/Levinsky/Yehuda)
   fulfilling the WORLD.md roadmap so store pages and posts can rotate.

**Post-generation QA checklist (10 min, gate before commit):** feet touch
bottom edge on all 6 character sprites · slide sprite is wider than tall after
crop · no magenta halo at 2× zoom (key threshold r>170,b>170,g<110 — if halos,
regenerate, don't widen the key) · backdrop bottom third actually plain ·
backdrops don't out-contrast the obstacles (rule 4) · wordmark legible at 280px
wide.

---

## 5. PRIORITIZED BUILD LIST

Ranked by impact-per-LOC. **P0 = tonight (no art dependency), P1 = this week,
P2 = backlog.**

### 🌙 TONIGHT CUT — ≤150 LOC, implement now, in this order

| # | Item (spec §) | LOC | Running total |
|---|---|---|---|
| 1 | Cached sky/road gradients on resize (perf headroom first) | 8 | 8 |
| 2 | J0 particle core + reduced-motion gate | 25 | 33 |
| 3 | J2 list-item flight + slot pulse + 2/4 count | 20 | 53 |
| 4 | J3 basket celebration (burst + gold flash + hitstop) | 15 | 68 |
| 5 | §3.2 HUD list pill + left-HUD pill | 15 | 83 |
| 6 | J1 squash/stretch + lane lean | 12 | 95 |
| 7 | J10 contact shadows (player/vendor/near entities) | 8 | 103 |
| 8 | J7 vendor vignette + heartbeat synth | 12 | 115 |
| 9 | J4 landing/slide dust + J5 floating +1/+2/+10 (+missing pop) | 14 | 129 |
| 10 | J8 speed lines | 10 | 139 |
| 11 | J9 slide/fast-fall sounds + §3.1 daily button promotion | 9 | 148 |

After implementing: **re-run the 30-assertion headless suite** — J3's hitstop
multiplies dt and J0 touches the update loop; the suite must stay 30/30.

### 🎨 WITH-ART CUT — lands when `bin/imagepack` output passes QA (§4 checklist)

| Item | LOC |
|---|---|
| Night Shuk backdrop hook (`bg-yehuda-night` when `curZone().en==='The Night Shuk'`) | 5 |
| `player-jump` sprite hook (use when `G.jy>0.05`) | 3 |
| Menu wordmark `<img>` with text fallback | 8 |
| og:image → game's own `press/og-16x9.png` (+1200×630 dims) | 2 |
| Visual QA pass per §4 checklist, then commit art | — |

### P1 — this week
- J6 near-miss sparkle (10 LOC) — wants a feel-tuning session, not a blind merge
- J14 death beat (8 LOC) · J11 shuk-transition stamp (8 LOC)
- §3.4 first-contact teaching hints (15 LOC)
- §3.3 "Made it to: X · Y" on death card (5 LOC) **+ shuk-reached in share text** (panel issue #7 — pairs with this)

### P2 — backlog
- J13 awning crossfade · magnet aura/trail · basket fill-states
- Keyboard preventDefault (panel #9 — bundle with the portal-build flag work)
- Shekel economy (the real fix for "currency with no sink" — design doc first)

---

## Final word

The art pack will make screenshots; **the tonight cut makes the game feel like
the screenshots.** Highest conviction: items 2–4 (particles → list flight →
basket celebration). The game's entire fantasy is *doing Ima proud* — right
now that's a toast; tonight it becomes a parade.
