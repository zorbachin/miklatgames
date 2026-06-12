# SHUK SHOPPER — Quantitative Gameplay Test (Bot Playtest)

**Date:** 2026-06-12 · **Build:** `index.html` as of 2026-06-11 20:44 (post `d = dist/12000` change)
**Method:** headless harness (`/tmp/sstest/loader.js`, extension of `harness.js`) loads the real
game script with DOM stubs; bots drive `go()` against `update(1/60)` fixed-timestep calls.
`setTimeout`s (incl. the 900 ms zone-advance) are fired on the simulated clock. The game file was
never modified — tuning variants are in-memory source transforms.

## 1. Bot policies

| Policy | Reaction delay | Wrong-input rate | Notes |
|---|---|---|---|
| PERFECT | 0 ms | 0% | Time-window occupancy planner: tracks safe path, late-dodges between blocks, detects unclearable same-lane combos, exact jump (TTC−0.27 s) / slide (TTC−0.30 s) timing |
| GOOD | 250 ms | 5% | Same planner, delayed + noisy |
| CASUAL | 450 ms | 15% | + ignores 25% of list items |
| BUTTON-MASHER | — | — | Random valid input every 300–600 ms |

Caveat: PERFECT is "expert human" grade (commits to one action at a time), not an oracle.
Since the safe lane always exists and moves ≤1 lane/row, true oracle survival is unbounded;
PERFECT's numbers are a *floor* on the skill ceiling.

## 2. Topline (baseline, n = 250 runs/policy, cap 600 s)

| Metric | PERFECT | GOOD | CASUAL | MASHER |
|---|---|---|---|---|
| Survival median | **155.5 s** | **52.9 s** | **32.8 s** | **6.5 s** |
| Survival p90 | 431.2 s | 129.3 s | 76.3 s | 16.3 s |
| Survival mean | 206.1 s | 68.8 s | 42.4 s | 8.9 s |
| Runs hitting 600 s cap | 10 (4%) | 0 | 0 | 0 |
| Baskets/run (mean / med) | 32.3 / 22 | 7.9 / 5 | 3.9 / 2 | 0.14 / 0 |
| Shekels/run (mean) | 989 | 240 | 118 | 6.4 |
| Districts reached (mean / max) | 32.2 / 109 | 7.8 / 66 | 3.9 / 44 | 0.13 / 3 |
| Time→first pickup (med) | 2.7 s | 2.7 s | 2.7 s | 3.3 s |
| Time→first basket (med) | 12.4 s | 12.3 s | 12.8 s | 12.1 s (26/250 runs) |
| Zero-basket runs | 0.4% | 2.0% | 14.4% | 89.6% |
| Stumbles → lethal | 26% | 43% | 50% | 84% |
| Zone advances mid-chaos | 99.5% | 98.9% | 98.8% | 93.8% |

### Death cause breakdown (two-strike system)
Every death is a second hit inside the 6 s vendor-chase window; binned by gap after the stumble:

| Policy | Direct second-hit (≤2 s after stumble) | Caught deep in chase (2–6 s) | Chases survived |
|---|---|---|---|
| PERFECT | 106 (44%) | 134 (56%) | 666 / 906 stumbles |
| GOOD | 115 (46%) | 135 (54%) | 330 / 580 |
| CASUAL | 128 (51%) | 122 (49%) | 249 / 500 |
| MASHER | 124 (50%) | 126 (50%) | 46 / 296 |

Roughly half of all deaths are the immediate re-hit right after `inv` (1.2 s) expires — the
mercy window is the single most lethal constant in the game (see §7).

### Death-time histograms (deaths per bin)

| Bin (s) | 0-10 | 10-20 | 20-30 | 30-45 | 45-60 | 60-90 | 90-120 | 120-180 | 180-300 | 300-600 |
|---|---|---|---|---|---|---|---|---|---|---|
| PERFECT | 1 | 0 | 2 | 3 | 17 | 31 | 36 | 51 | 55 | 44 |
| GOOD | 4 | 8 | 26 | 56 | 51 | 54 | 22 | 16 | 10 | 3 |
| CASUAL | 21 | 33 | 51 | 65 | 36 | 26 | 11 | 1 | 6 | 0 |
| MASHER | 181 | 55 | 11 | 3 | 0 | 0 | 0 | 0 | 0 | 0 |

## 3. Difficulty ramp vs the `d = dist/12000` curve

Measured from the live sim (no baskets):

| t | dist | d | speed | obstacle p/lane | row interval |
|---|---|---|---|---|---|
| 5 s | 1,766 | 0.15 | 0.364 | 0.51 | 0.508 s |
| 10 s | 3,640 | 0.30 | 0.388 | 0.57 | 0.477 s |
| 15 s | 5,641 | 0.47 | 0.412 | 0.64 | 0.449 s |
| 20 s | 7,761 | 0.65 | 0.436 | 0.71 | 0.424 s |
| 25 s | 9,897 | 0.82 | 0.484 | 0.78 | 0.382 s |
| 30 s | 12,376 | **1.00** | 0.508 | 0.85 | 0.364 s |
| 60 s | 29,770 | 1.00 | 0.652 | 0.85 | 0.284 s |

**Verdict on 2200→12000: keep it. Early game is NOT too flat — it is still too hard for casuals.**
- A/B (n=150/policy): with the old `2200`, CASUAL median = 30.4 s; with `12000` = 38.9 s.
  The change bought casuals ~8 s; PERFECT/GOOD unchanged within noise (they don't die in the ramp window).
- `d` saturates at ~30 s, exactly where the genre wants challenge to arrive — and the CASUAL/GOOD
  death mass starts at 20–30 s (histograms above). Challenge arrival ≈ 20–30 s: **on target**.
- The d-lever is weak anyway: spawn density 0.45→0.85 matters less than speed. The real
  difficulty driver is the row interval shrinking 0.51 s → 0.28 s → 0.176 s (at the 1.05 cap,
  reached ~148 s in), which crosses a casual's ~450 ms reaction at around t≈20 s.
  Variants `ramp6000` / `ramp9000` / `accel .0085` / `accel .0040` / `cap 0.95` all moved
  CASUAL by <±3 s (noise). The ramp constant is the wrong knob; the stumble mechanics are the right one.

## 4. The 900 ms zone advance happens mid-chaos essentially always

Across all baseline runs, **98.8–99.5%** of basket-triggered zone advances fired while the player
was in a vendor chase or had an obstacle inside z > 0.7 (i.e., during active dodging). At the
moment Ima's list visually swaps, the player is virtually never in a calm window. A
`spawnAt ≥ 0.45` post-basket breather was A/B'd and only moved this to 97% (in-flight obstacles
dominate) — a real fix needs ~1.0 z-units of suppression or moving the swap to a detected gap.
Old-zone list items still in flight after the swap silently degrade to +2₪ consolation pickups.

## 5. Daily shuk: 50 seeds × 16 GOOD runs each

| Stat | min | median | max | sd | CV |
|---|---|---|---|---|---|
| Per-day median survival | **15.8 s** (day 29) | 63.5 s | **161.7 s** (day 3) | 33.4 | **47%** |
| Per-day baskets/run | 1.38 | — | 24.06 | 5.26 | — |
| List-item spawns/min | 25.8 | — | 51.9 | 6.61 | 2.0× spread |

**Yes — some dailies are way harder.** A 10.2× spread in median survival and a 17× spread in
baskets between the easiest and hardest day. Basket availability also varies 2× (25.8 vs 51.9
item spawns/min: the seeded safe-lane walk + the 24% item-roll interact badly on some streams).
Hardest five: days 29 (15.8 s), 46 (19.5), 22 (24.9), 31 (26.8), 37 (28.3). Easiest five:
days 3 (161.7), 33 (149.5), 47 (135.9), 4 (131.7), 50 (123.1). For a shareable "same shuk for
everyone" mode this is fine *within* a day but makes streak/score comparison across days
meaningless. Cheap mitigation: screen day-seeds offline with this bot harness and re-hash any
day whose bot-median falls outside 0.6×–1.6× of global median (`mulberry32((dn*2654435761)^0x9E3779B9)`).

<details><summary>Full 50-day table (sorted by difficulty)</summary>

```
day  medSurv  meanBaskets  items/min  ttfBasket  zeroB%
 29    15.8      1.38        37.0       11.6       6
 46    19.5      3.06        25.8       11.4       0
 22    24.9      3.19        39.6       14.6       0
 31    26.8      2.75        34.0       14.0       0
 37    28.3      2.81        36.9        8.4       0
 30    32.6      2.00        31.3       15.3       0
 23    42.4      3.56        29.4       10.7       0
 34    42.9      3.88        31.8       15.5       0
 12    43.0      3.00        27.3       11.8       0
 36    45.1      4.13        33.6        9.7       0
 28    45.5      3.06        27.3       15.0       0
 19    47.3      8.94        39.4        7.8       0
 44    48.6      4.44        38.4        9.3       0
 17    49.9      4.06        35.4       16.0       0
 27    50.5      4.88        35.1        9.9       0
  6    51.7      4.94        27.7       19.2       0
  2    52.1      6.00        40.8        9.2       0
 20    53.0      4.63        35.8       12.8       6
 16    53.0      3.81        32.8       10.4       0
  5    55.5      7.06        34.9       18.5       6
 13    56.0      6.19        38.2       10.2       0
 35    57.4      5.50        47.3       17.1       0
 49    58.4      3.06        26.2       20.4       0
 25    59.1      5.44        33.8       12.0       0
 15    62.5      8.75        39.2        8.9       0
 32    64.5     12.88        45.3        6.8       0
 42    66.0      5.50        31.1       13.9       0
 11    68.1      7.56        45.3        9.7       0
  7    69.4      6.00        36.4        8.6       0
 40    69.6      7.25        40.3       13.0       0
 48    69.6     12.31        41.7        6.9       0
 21    71.9      8.75        36.6       15.5       0
 41    79.1      6.19        28.9       15.7       0
 24    79.2     10.75        42.1       13.5       0
 38    82.8      8.75        44.3       12.8       0
 10    84.3      7.19        43.1        7.0       0
 43    88.1      9.13        34.6       11.6       0
 26    93.5      9.56        40.2       10.8       0
  1    94.0     16.44        50.6       13.9       0
 45    95.1     13.81        48.1        9.2       0
  8    97.6     11.31        44.4       12.7       0
  9    98.0     15.69        44.5       11.4       0
 14   111.7     13.81        41.8       10.9       0
 18   116.4     14.81        42.6        7.8       0
 39   116.9     11.88        38.0       13.4       0
 50   123.1     13.13        43.3       15.7       0
  4   131.7     16.94        51.9       13.9       0
 47   135.9     22.94        44.8       10.9       0
 33   149.5     15.13        43.8       12.2      13
  3   161.7     24.06        50.6       11.7       0
```
</details>

## 6. Genre-bar scorecard

| Bar | Target | Current | Verdict |
|---|---|---|---|
| Casual median session | 45–90 s | **32.8 s** | ❌ ~12 s short |
| Time-to-first-dopamine | <10 s | first pickup **2.7 s** ✅ / first basket **12.4 s** | ⚠️ coin-dopamine passes; the *named* reward (basket) misses by ~2.5 s |
| Perfect-play survival | >3 min | **2.6 min** median (p75 ≈ 5 min, 4% immortal at 10 min cap) | ⚠️ borderline — and PERFECT is a floor estimate |
| Difficulty arrival | 20–40 s in | death mass starts 20–30 s; d=1 at ~30 s | ✅ on target |

## 7. A/B tuning experiments (n = 150 runs/policy/variant)

Survival medians (s); Δ vs same-batch base:

| Variant | PERFECT | GOOD | CASUAL | Note |
|---|---|---|---|---|
| base (current) | 160–184 | 53–58 | 36–39 | batch noise band ±15% |
| ramp 12000→2200 (old) | 167 | 58 | **30.4** | old constant was worse for casuals |
| ramp 12000→6000 | 171 | 56 | 33.6 | weak lever |
| accel 0.0048→0.0085 | 151 | 44 | 30.1 | too fast |
| accel 0.0048→0.0040 | 180 | 58 | 36.6 | doesn't help — deaths aren't speed-bound early |
| vendor chase 6→8 s | 147 | 55 | 32.3 | worse |
| vendor chase 6→4 s | 156 | 55 | 38.8 | + stumble lethality 50→45% |
| **inv 1.2→2.0 s** | **215** | **60** | **40.1** | biggest single lever |
| vendor 4 + inv 2.0 | 246 | 69 | 41.2 | lethality: CASUAL 36%, GOOD 31% |
| spawn p 0.45+0.4d → 0.30+0.55d | 142 | 57 | **39.8** | gentler first 20 s, same 0.85 end |
| basket speed +0.025→+0.04 | 152 | 51 | 34.1 | worse, keep 0.025 |
| first list 3 items (then 4) | 171 | 61 | 31.9 | **ttfb 12.4→9.8–10.7 s** |
| slide-cancel jump (allow `u` during slide) | 149 | 54 | 33.6 | no measurable gain for bots; still a QoL candidate for humans (untestable here) |
| post-basket spawn breather (spawnAt ≥0.45) | 171 | 56 | 35.1 | chaos-advance 99%→97% only; insufficient |
| **RECIPE: vendor 4 + inv 2.0 + p 0.30+0.55d + first-list 3** | **291** (16% immortal) | **71.6** | **44.2** (p90 97 s, zeroB 5%) | hits/nears every bar |

### RECIPE vs genre bars
- Casual median 44.2 s (p90 97 s) → at the bar (was 33 s) ✅~
- Time-to-first-basket 10.0–10.5 s → at the bar (was 12.4 s) ✅~
- Perfect median 291 s = 4.9 min, 16% of runs immortal at cap → clears 3 min ✅
- Difficulty arrival unchanged (~20–30 s) ✅

## 8. Recommended tuning deltas (numbers, not vibes)

1. **`G.inv = 1.2` → `2.0`** (in `hit()`) — post-stumble mercy window. Strongest single lever:
   PERFECT +31 s, GOOD +5.6 s, CASUAL +3.9 s median; cuts "direct second-hit" deaths (~half of all deaths).
2. **`G.vendor = 6` → `4`** (chase duration) — with #1, stumble lethality drops 50%→36% (CASUAL),
   43%→31% (GOOD); zero-basket runs 15%→8%.
3. **`const p = 0.45+0.4*d` → `0.30+0.55*d`** (spawnRow) — same 0.85 endgame density, ~33% fewer
   obstacles in the first 15 s; +3.6 s casual median on its own.
4. **First list 3 items, then 4** (`pool.slice(0, G.baskets===0?3:4)`) — first basket 12.4 s → 10.0 s,
   first zone advance arrives inside the first-session attention window.
5. **Keep:** `dist/12000` (the change was right), accel `0.0048`, cap `1.05`, basket `+0.025`,
   slide `0.55 s`, spawn interval `0.16+0.05·RNG`.
6. **Daily:** screen day-seeds with this harness; re-hash outliers (>±60% from global median).

## 9. Bugs / sharp edges surfaced by the bots

1. **Stale list on fallback zone advance (real bug, 1-line fix).** When a zone advances via the
   12 000-distance fallback (`update()`: `if(G.zoneDist>ZONE_FALLBACK_DIST) advanceZone();`),
   `G.list` is **not** renewed — verified in-sim: district changes, list keeps previous district's
   items (`list items in NEW zone pool? false`), while the toast says "📜 new list from Ima!".
   The basket-timer path does `advanceZone(); G.list=newList();` — the fallback path needs the
   same. Hits exactly the players the fallback exists for (those who stall a list).
2. **Slide lock-out combo.** A `high` followed by a `low` in the same lane within ~0.85 s is
   unclearable in place: slide lasts 0.55 s and `go('u')` is silently ignored while sliding
   (`dir==='u'&&G.jy===0&&!G.sliding`). Dodging is the only out; when adjacent lanes are occupied
   this is a scripted stumble. It was the #1 residual killer of the PERFECT bot. Slide-cancel
   jump tested neutral for bots; consider it for input forgiveness anyway.
3. **Zone advance always lands mid-chaos (§4)** — 99% of list swaps happen during active dodging;
   in-flight old-list items degrade to consolation shekels.
4. **Daily seed fairness (§5)** — 10× difficulty spread across days.
5. Confirmed working under stress: 900 ms restart-race guard (`G===run`), safe-lane spawn
   invariant (0 violations in 2 000 rows), speed cap, entity bounding, two-strike rules.

---
*Harness: `/tmp/sstest/loader.js` (DOM-stub loader with source-transform A/B support),
`/tmp/sstest/bots.js` (policies, runner, stats; modes: smoke/baseline/daily/ab),
`/tmp/sstest/ab2.js`, `/tmp/sstest/ab3.js`, `/tmp/sstest/debughit.js` (hit-cause tally).
~4,000 simulated runs total at 60 fps fixed timestep.*
