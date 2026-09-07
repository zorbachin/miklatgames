# PODPAST — the $10M ed-tech audit (what's built · what's capable · what to fix · GTM for dummies)

_Audit date: 2026-09-06 · Auditor: Claude (COO seat) · Owner: Zorba_
_Scope: podpast.dev + kids version, the Miklat history assets in this repo, the tool stack on hand, unit economics at $5/mo, and the path to 10k school users._

---

## 0 · TL;DR — read this screen and nothing else if you're short on time

**Where you actually are:** podpast is a **landing page**, not a product. podpast.dev is a static Hugo site on your Netlify account, deployed by hand from a local folder (no git repo linked, no backend functions, no forms). The kids version is one extra page, `kids.html`, added Aug 31. Nothing conversational can be running. The closest real product code you own is **Changing History** in this repo (a shipped, panel-approved history arcade with a map, eras, figures, EN/HE, offline) — and it is unlisted.

**Five decisions (my recommendation in bold):**

| # | Decision | Recommendation |
|---|---|---|
| 1 | Live AI video at $5/mo? | **No. Pre-rendered episodes only in v1.** A single 5-second live clip costs $0.25–$3.75; $5 buys 1–20 clips before margin. Live = voice + still portrait. Video = the roadmap "Max" tier. |
| 2 | Kids product and adult product? | **One product, one content set, an age dial.** Adult = same canon with the safety dial off. Two products = split focus, zero extra revenue. |
| 3 | Compete on "chat with Lincoln"? | **No.** Hello History/Humy already has 400+ figures, 200k downloads, 5,000 teachers, FERPA/COPPA and $129/teacher/yr. Character.ai does it free. Compete on **the guided path (Duolingo), the episode format (podcast from the past), and the Israeli/Jewish track nobody serves.** |
| 4 | Which school wedge? | **Jewish day schools first** (Prizmah network: 305 schools, ~101k students, enrollment at a record high). One network relationship = distribution; they want *both* American and Israeli tracks; they have donors who fund tech. US public districts second (slow, 12–18 mo cycles). Israel Ministry third (Education Cloud catalog + Innovation Authority sandbox). |
| 5 | Pricing? | **Free for teachers (guided content) · $5/mo individual/parent · $8/student/yr school (min $1,500) · district custom.** This is the Prodigy/Khanmigo shape, and it's the only shape that gets to 10k users without a sales team. |

**The honest number:** 10k users via schools ≈ **$80k–150k ARR**. That is a real milestone and a fundable one, but it is not $10M. The $10M path is 1M+ students (public-school scale) or consumer virality on top of the school base. Set the milestone honestly and build the thing that makes both possible: **the canon + episode factory.**

**Next 7 days (in order):** ① put the podpast source in git ② pick the stack (below) ③ build the "one era, six figures, fully guided" vertical slice on the Miklat engine ④ record the first 3-minute episode with Higgsfield + ElevenLabs ⑤ book 10 teacher conversations. Checklist at the bottom.

---

## 1 · What's built (verified, no fantasy)

### 1.1 podpast.dev — audited via your Netlify account metadata
| Fact | Value | So what |
|---|---|---|
| Hosting | Netlify site `podpast`, primary URL podpast.dev, team plan `nf_team_dev` | Fine for a landing page; functions are available and **unused**. |
| Framework | Hugo (static site generator) | Static = zero runtime cost, but no AI/chat/auth/progress possible without a backend. |
| Deploy method | `deploy_source: cli`, `commit_ref: null`, `build_id: null` | **The source is not in version control.** One laptop failure = product gone. Fix first. |
| Backend | 0 functions, 0 edge functions, forms not enabled | Nothing conversational is live; "live answers" is not built. |
| Timeline | Created 2026-07-07 · last deploy 2026-08-31 · 1 file changed | Two months, one page added. This is where a "landing page then go build" decision got stuck. |
| Kids version | `kids.html` on the same site | Same-site page, no separate identity, no gating. |
| Content | **Unverified** — the audit sandbox's network policy blocks podpast.dev, the netlify.app mirror and the screenshot CDN | Treat everything below as an audit of the concept + the repo, not the copy on the page. |

Search for the source: it is **not** in any of your 8 GitHub repos (searched all, including zorbasphere), not in Drive, not in Fireflies, not in Lovable (2 unrelated projects), not in Higgsfield websites. If it exists, it's on one machine. Push it today.

### 1.2 Miklat assets that are directly reusable (this repo)
| Asset | State | Reuse for podpast |
|---|---|---|
| **Changing History** (`changinghistory/`, ~1,150 LOC + 3 genre slices) | Shipped, unlisted, panel verdict SHIP 2026-06-13, stability 8/10 | The **era map** (8 eras, unlockable nodes), the **"events are data rows, mechanics are engines"** split, Museum/collections, share card, EN/HE, offline SW. This *is* the podpast world map engine. |
| **Miklat Academy** (`academy/index.html`, 322 LOC) | Working course engine: levels, XP, ranks, quiz, mission, localStorage | The **lesson rail**: episode → 3 checks → mission → XP/streak. Swap marketing content for history content. |
| **GAME-FACTORY.md** pipeline | 7 stages with gates, 10M advisor panel, headless logic pass | Use as-is for every episode batch. Content QA = stage 3. |
| `assets/prompts.json` + `bin/imagepack` | Art pipeline on a free Gemini key, magenta chroma-key, emoji fallback | Portrait + b-roll prompt packs per figure, same loader. |
| i18n EN/HE + RTL, offline PWA, GoatCounter events, `?beat=` challenge links | Proven across 5 games | Hebrew is a *launch* requirement for the day-school + Israel wedge, and you already have it. |
| Design pillar: **FUN → CURIOSITY → LEARNING**, History Mode off by default | Written, tested with the panel | Keep this. It is the anti-Humy position: not a chatbot wearing a textbook. |

### 1.3 Tool stack on hand (what's capable, with real prices)
| Capability | Tool you already have | Cost (verified Sept 2026) |
|---|---|---|
| Scripts, canon extraction, conversation, safety classification | Claude API | Sonnet 5 $2/$10 per M tokens · Haiku 4.5 $1/$5 · Opus 5 $5/$25. Cache reads far cheaper. |
| Narration / figure voices | ElevenLabs | TTS ≈ $0.05/min (Flash) – $0.10/min (Multilingual v3). Conversational agent (STT+LLM+TTS) ≈ $0.08/min. |
| Portraits, living portraits, b-roll, character consistency | **Higgsfield Ultra — 5,012 credits in the account** | Already paid. Character-sheet workflow gives one consistent face per figure across every clip. |
| Video APIs (if you go beyond Higgsfield) | Veo 3.1 Lite / Fast / Standard, Kling 3.0, Runway Gen-4 Turbo | $0.05 · $0.15 · $0.75 per sec (Veo) · $0.09–0.14/s (Kling) · $0.05/s (Runway Turbo). 720p→1080p ~2×, audio +30–100%. |
| Hosting + backend | Netlify (functions unused), GitHub Pages | Free tier covers v1. |
| Auth/DB if needed | Supabase (you've used it via Lovable) | Free tier covers v1. |
| Analytics | GoatCounter, wired in every game | Free. |
| Art on a budget | Gemini key via `bin/imagepack` | Free tier. |

**Read:** you are not tool-constrained. You are **content-and-decision constrained**.

---

## 2 · The concept, judged (not cheered)

**The pitch:** Duolingo × history via conversation. Map of the world across generations, figures tiered (icons / in-between / hidden gems), each with an image, a voice, and a canon. Guided episodes with AI b-roll first, live prompt-and-respond video later. Kids first, adults too. American history, then Israeli.

### What's strong
- **"Podcast from the past" is a format, not a feature.** A 3-minute episode where the figure tells their own story is (a) the cheapest thing to make, (b) the most shareable, (c) the safest for kids because it's pre-rendered and reviewed, and (d) exactly the on-brand name. This is the product. Chat is the add-on.
- **Guided > live is also the moat.** Anyone can wire GPT to a portrait. Nobody has a *sequenced, standards-mapped, streak-driven path* through history with a real canon behind each figure. That's Duolingo's actual edge (the tree, not the owl).
- **Tiered figures (icons / in-between / hidden gems)** is genuinely good design: icons for recognition, hidden gems for the "I didn't know that" share moment (Haym Salomon, Katherine Johnson, Hedy Lamarr).
- **The Israeli/Jewish track is unserved and you are unusually placed to build it** (EN/HE craft, the Miklat tribe positioning, the OpenDor/Unpacked contact already in your Drive).

### What's weak (and I'd push back on)
1. **"Talk to historical figures" is a commodity.** Humy has the schools, the compliance, the 400 figures. Don't lead with it.
2. **Live video doesn't pencil at $5** (math in §4). It also isn't what a 9-year-old or a teacher needs. Cut from v1; keep as roadmap.
3. **Kids + adults from day one** is two products. Ship one with an age dial.
4. **"American first, then Israeli"** — right for public-school credibility, but your *launch customer* (day schools) wants both, and your *differentiation* is the second one. Build the engine with American Era 1, and ship Israeli Era 1 in the same quarter.
5. **Historical accuracy is a liability you must own.** An AI Lincoln that invents a quote in a classroom is a lost district. The canon pack (§5) exists to make this a *retrieval* problem, not a generation problem.
6. **10k users ≠ $10M.** See §6. The milestone is real; the valuation story needs the factory.

### Score card (10M-panel style)
| Lens | Score | Why |
|---|---|---|
| Product built | 2/10 | Landing page; engine exists elsewhere (Changing History) but isn't pointed at this. |
| Concept differentiation | 6/10 | Format + path + Israeli track are real; chat alone isn't. |
| Content moat potential | 7/10 | Canon packs + episode library compound; nobody has the Jewish/Israeli history layer for kids. |
| Unit economics (guided-first) | 8/10 | Near-zero marginal cost; $5 tier margin is fine. |
| Unit economics (live video) | 3/10 | Doesn't work at $5. |
| Kid-safety readiness | 2/10 | No policy, no DPA, no consent model, no logging. All required before a single classroom. |
| GTM readiness | 2/10 | No teacher pilot, no price sheet, no case study. |
| Team/tooling leverage | 8/10 | Factory pipeline, Higgsfield Ultra, EN/HE, panel process. |
| **Verdict** | **BUILD THE GUIDED SLICE** | Cut live video, pick the day-school wedge, ship 6 figures in 4 weeks. |

---

## 3 · Product spec (what to actually build)

### 3.1 The loop (one screen, one next action — ADHD-friendly for the learner too)
1. **Map** — eras as bands (reuse Changing History's vertical timeline). Tap a node.
2. **Figure card** — portrait, one-line hook, tier badge, "Meet them" button.
3. **Episode (3 min)** — the figure's voice tells their story over portrait + 3 b-roll clips + captions (EN/HE). Pre-rendered, reviewed.
4. **3 checks** — Duolingo-style: tap-the-answer, order-the-events, "what would you ask?" (free text, graded by rubric, not by the figure).
5. **Ask them (gated)** — live text chat with the figure, canon-bound, quota-limited. Voice reply optional on paid tiers.
6. **Reward** — XP, streak, the figure joins your **Museum**, a share card ("I just met Haym Salomon").
7. **Next node unlocks.** Daily figure. Streak. "Next in 18h."

### 3.2 Two modes of one product
| | Guided (default, free) | Live (gated, paid/quota) |
|---|---|---|
| What runs | Static files on CDN | Netlify Function → Claude (+ ElevenLabs for voice) |
| Marginal cost | ~$0 | see §4 |
| Kid-safety surface | Reviewed once at build time | Runtime guardrails (§5.3) + logging |
| Offline | Yes (house PWA pattern) | No |

### 3.3 Stack recommendation (one decision, make it this week)
- **Player app:** the Miklat pattern — a single static app (HTML/JS, no build step) served from podpast.dev. Reuse Changing History's map + Academy's lesson rail. Hugo stays only for marketing pages, or drop it.
- **Backend:** Netlify Functions (already on the account) for `/chat`, `/quota`, `/progress`. Keep the API key server-side. Never ship a key to the browser.
- **Identity:** adults = magic-link email. Kids = **class code + first name/initial only** (no email for under-13 — that's how you stay on the COPPA school-consent path). Parent-paid kids = parent's account owns the child profile.
- **Data:** Supabase (progress, quotas, transcripts for teacher view). Guided progress also mirrored to localStorage so offline still works.
- **Content:** `content/figures/*.json` (canon), `content/episodes/*.json` (script, media refs), `assets/` (portraits, clips, audio). Content is data rows. The engine never changes per figure.

### 3.4 Build plan (chunk + gate, per CLAUDE.md)
| Phase | Weeks | Ship | Gate |
|---|---|---|---|
| 0 · Rescue | this week | podpast source in git; stack decided; `PODPAST-WORLD.md` written | Source on GitHub, CI deploy to Netlify |
| 1 · Vertical slice | 1–4 | Era 1 (Colonial & Founding), 6 figures, fully guided, EN/HE, streak, share card | Panel review; 20 kids/parents play it; D1 return measured |
| 2 · Live + money | 5–8 | Canon-bound text chat w/ quota; $5 Stripe Payment Link; teacher class codes + progress table | 1 paying parent; 1 teacher running a class |
| 3 · Library + pilot | 9–16 | 48 American figures (8 eras × 6); Israeli Era 1 (6 figures); privacy policy, DPA template, COPPA notice | 5-classroom free pilot running; case study drafted |
| 4 · Enterprise | 17–26 | Google Classroom/Clever sign-in, reporting, standards alignment map, per-student pricing | First school PO |

Each episode goes through the factory: **canon → script (Claude) → review (human) → voice (ElevenLabs) → portrait + 3 clips (Higgsfield) → assemble → headless check (captions match audio, links resolve) → panel spot-check → ship.**

---

## 4 · Unit economics — what $5 actually buys

### 4.1 Cost to *make* one 3-minute guided episode (one-time, amortized over every user)
| Item | Cost |
|---|---|
| Script + canon extraction (Claude Sonnet 5, ~20k tokens in/out) | ~$0.10–0.50 |
| Narration, 3 min (ElevenLabs $0.05–0.10/min) | $0.15–0.30 |
| Portrait + living-portrait loop (Higgsfield credits, already paid) | ~$0 marginal now; ~$0.10 at API rates |
| 3 b-roll clips × 5 s ($0.05–0.15/s) | $0.75–2.25 |
| **Total per episode** | **≈ $1.50–3.50** |
| 200 episodes (a full American + Israeli library) | **≈ $300–700, once** |

**Guided content is effectively free to serve.** That is the whole economic argument for guided-first.

### 4.2 Cost to *run* live conversation (per user, per session)
| Mode | Assumptions | Cost |
|---|---|---|
| Text chat turn | ~2k tokens in (canon + system + history), 150 out, Sonnet 5, no cache | ≈ $0.006/turn |
| Text chat turn, cached canon | prompt caching on the canon pack | ≈ $0.002/turn |
| 10-min text conversation (~15 turns) | | **≈ $0.03–0.09** |
| + Voice replies (150 words ≈ 800 chars ≈ 0.8 min TTS) | $0.04–0.08/turn | **+ $0.60–1.20 per 10-min chat** |
| Voice-to-voice agent (ElevenLabs conversational) | $0.08/min all-in + LLM | **≈ $0.85–1.00 per 10 min** |
| Live video reply (one 5 s clip) | $0.05–0.75/s | **$0.25–3.75 per reply** |

### 4.3 What the $5 tier can afford (target ≥ 40% gross margin → ≤ $3 COGS/user/mo)
| Included at $5/mo | Cost ceiling | Why |
|---|---|---|
| Unlimited guided episodes + checks + streaks | ~$0 | static |
| **100 text messages/month** with figures | ≈ $0.20–0.60 | fine |
| **30 voice minutes/month** (figure speaks back) | ≈ $2.40–3.00 | this is the budget line |
| Live video | **0** | one clip ≈ a month's margin |

**So the answer to "how many minutes":** at $5, **30 voice minutes or ~100 text turns**, plus unlimited guided content. Most learners never hit the cap; the cap exists for the 5% who would.

**Enterprise:** pool minutes at class level (e.g. 10 voice min/student/mo pooled → a 28-kid class shares 280 min) because classroom usage is bursty (everyone talks to Lincoln on Tuesday, nobody on Friday).

### 4.4 Revenue at the milestone (be honest)
| Scenario | Math | ARR |
|---|---|---|
| 10k consumer users, 5% pay $5 | 500 × $5 × 12 | $30k |
| 10k school seats @ $8/student/yr | | $80k |
| 10k school seats + 1k parent upgrades | $80k + 1,000 × $60 | $140k |
| 100k school seats (≈ 150 schools) | | $800k |
| **1M seats** | | **$8M** — the $10M-company line |

Comparables: Khanmigo district $10–15/student/yr; Humy $129/teacher/yr, school plans custom; Prodigy free for schools, parents $60–120/child/yr; Duolingo Super ≈ $5/mo annual, 9% of MAU pay after years of optimization.

---

## 5 · The Canon — content architecture, settings, and the figure map

### 5.1 Data model (one JSON per figure; the engine never changes)
```
figure {
  id, track (US | IL | WORLD), era, region, born, died,
  tier: icon | between | gem,
  kind: historical | folk | legendary   // folk/legend figures are flagged on-screen
  name_en, name_he, hook_en, hook_he,   // one line, the "why meet them"
  canon: {
    facts[]        // each with a source id
    quotes[]       // verified only; each with source
    beliefs[]      // what they argued for, in their words where possible
    controversies[]// two-views cards, adult-mode only or grade-gated
    boundary: { knows_until: year, would_not_know: [...] }
  },
  voice: { provider_id, age_at_voice, pace, register }
  portrait: { prompt, seed, character_sheet_id }        // Higgsfield consistency
  kid_notes: { exclude[], soften[], grade_min }
  adult_notes: { include[] }
  sources[]   // books, archives, museum pages
  standards[] // e.g. "US Grade 5 History: American Revolution"
}
```

### 5.2 The map — eras as generation bands (American track v1: 8 eras × 6 = 48 figures)
| Era | Icons | In-between | Hidden gems |
|---|---|---|---|
| **1 · Colonial & Founding** (1600–1789) | Benjamin Franklin · George Washington | Abigail Adams · Phillis Wheatley | Haym Salomon · Tisquantum (Squanto) |
| **2 · Early Republic & Expansion** (1790–1850) | Thomas Jefferson · Sacagawea | Tecumseh · Dolley Madison | Rebecca Gratz · York (Lewis & Clark) |
| **3 · Civil War & Reconstruction** (1850–1877) | Abraham Lincoln · Harriet Tubman | Frederick Douglass · Clara Barton | Robert Smalls · Elizabeth Keckley |
| **4 · Gilded Age & Immigration** (1877–1914) | Thomas Edison · Mark Twain | Emma Lazarus · Nikola Tesla | Ida B. Wells · Lewis Latimer |
| **5 · World Wars & Depression** (1914–1945) | Franklin D. Roosevelt · Amelia Earhart | Eleanor Roosevelt · Jesse Owens | Hedy Lamarr · Dorothea Lange |
| **6 · Civil Rights & Space** (1945–1975) | Martin Luther King Jr. · Neil Armstrong | Rosa Parks · Cesar Chavez | Katherine Johnson · Claudette Colvin |
| **7 · Modern** (1975–2001) | Steve Jobs · Ronald Reagan | Sally Ride · Fred Rogers | Grace Hopper · Norman Borlaug |
| **8 · Folk & Legend** (cross-era, flagged "tall tale") | Johnny Appleseed · Annie Oakley | John Henry · Casey Jones | Paul Bunyan · Pecos Bill |

Rules for the list: every era mixes gender and background without saying so; every "gem" has a one-sentence "wait, what?" hook; every figure has a tie to at least one other node (Haym Salomon → Washington; Emma Lazarus → immigration → Israeli track).

### 5.3 Israeli / Jewish track v1 (ship Era 1 in the same quarter; 6 eras × 6 later)
| Era | Sample figures (icons → gems) |
|---|---|
| Biblical & Second Temple (tradition-flagged) | Abraham · Deborah · David · Judah Maccabee · Hillel · Josephus |
| Diaspora & Golden Ages | Maimonides · Judah Halevi · Rashi · Doña Gracia Nasi · Glückel of Hameln · Baal Shem Tov |
| Zionism & the Yishuv (1880–1948) | Theodor Herzl · Eliezer Ben-Yehuda · Rachel Bluwstein · Hannah Szenes · Sarah Aaronsohn · Yosef Trumpeldor |
| State-building (1948–1977) | David Ben-Gurion · Golda Meir · Menachem Begin · Yigal Allon · Ilan Ramon (later) · Naomi Shemer |
| Modern (1977–) | Yitzhak Rabin · Natan Sharansky · Yoni Netanyahu · Ilan Ramon · Eli Cohen · Gal Gadot (contemporary, opt-in) |
| Folk & legend | Golem of Prague · Hershele of Ostropol · Elijah the Prophet (tradition) · Chelm's wise men |

Sensitivity note, stated plainly: modern Israeli history is contested in some US public districts. That is a **market segmentation fact**, not a reason to soften the content. Day schools, Israeli schools and diaspora families want it; some public districts will only buy the American track. Package tracks separately so the buyer chooses.

### 5.4 Content settings — the safety layer (this is the enterprise product)
| Setting | Explorer (6–9) | Scholar (10–13) | Adult | Classroom (teacher-controlled) |
|---|---|---|---|---|
| Guided episodes | ✓ reviewed | ✓ reviewed | ✓ | ✓ teacher assigns |
| Live chat | off by default; parent can enable text | text ✓, voice with quota | text + voice | teacher toggles per class; **transcripts visible to teacher** |
| Violence / death detail | named, not described | described, not graphic | full | per grade band |
| Contested topics | one-view, age-appropriate | "two views" cards | full + sources | teacher chooses view depth |
| Romance / sexuality | none | none | historical fact only | none |
| Modern politics / opinions | figure declines | figure declines, cites canon | figure declines beyond canon | figure declines |
| Memory across sessions | none | none | opt-in | none |
| Ads / third-party trackers | never | never | never | never |
| Off-topic | redirect to episode | redirect + "ask your teacher" | answer within canon | redirect |

**Runtime guardrails for live mode (all four are required, none is optional):**
1. **Canon-bound prompting** — the figure answers only from its canon pack (retrieval), says "I lived until 1865; I can't know that" past its boundary, and never invents quotes. Prompt-cached so it's cheap.
2. **Output check** — a fast classifier pass (Haiku 4.5) on every reply for grade-band violations before it renders; block + regenerate once, then fall back to a scripted line.
3. **Quota + rate limit** per profile, server-side.
4. **Logging** — every kid transcript stored, visible to the teacher/parent, deletable on request, purged on schedule. Nothing used for training or ads.

**Guided mode needs none of this at runtime** — it was reviewed once at build time. That is why guided is the default for every kid.

### 5.5 Accuracy process (the thing that actually wins districts)
- Every fact in a canon pack has a source id. Scripts are generated *from* the pack, not from the model's memory.
- One human review per episode before ship (you, or a teacher advisor paid per episode — budget $25–50/episode).
- Corrections channel in the app ("this is wrong") → issue → re-render. Publish a changelog. Teachers trust products that admit errors.

---

## 6 · GTM for dummies

### 6.1 How schools buy (the 90-second version)
- **Teachers try, schools buy, districts standardize.** Free tools that teachers love create the pull; the purchase order comes from a principal or curriculum director.
- **Calendar:** budgets are set **Jan–Apr**, purchases happen **May–Aug**, pilots run **Sept–Dec**. You are in September 2026 → this fall is **pilot season**; the money decision for 2027–28 is made this spring.
- **What blocks a sale:** no privacy policy, no Data Processing Agreement, no COPPA school-consent posture, no accessibility statement, no standards alignment. Have all five *before* the first call. (COPPA fines are up to $53k per violation, per child — districts know this.)
- **What wins a sale:** a teacher in the building who already uses it + a one-page case study with numbers + a price that fits a building budget without a board vote (that's why $1,500 min).

### 6.2 The three wedges, in order
| Wedge | Size | Why now | How |
|---|---|---|---|
| **1 · Jewish day schools (US/Canada)** | 305 Prizmah schools, ~101k students, record enrollment, growing 7.5% since 2021 | They need *both* tracks, they're mission-motivated, tech is often donor-funded, one network = distribution | Prizmah network + conference; 5 pilot schools this fall; Unpacked/OpenDor as content/marketing partner (you already have their JD in Drive — there's a relationship) |
| **2 · Parents & homeschoolers (consumer)** | unbounded, US + diaspora | $5 tier is impulse-priced; share cards + streaks are the growth loop you already build in every game | Free guided episode on the landing page; TikTok/Reels clips of figures ("Hedy Lamarr invented Wi-Fi's grandmother"); the Miklat WhatsApp railroad for Israeli families |
| **3 · Israel (Ministry + private)** | national | Education Cloud catalog is the gatekeeper *and* the stamp; Innovation Authority + Ministry run an AI sandbox with NIS 10M seed and real-school pilots | Apply to the sandbox with the Hebrew Israeli track; meanwhile sell direct to private/anglo schools in Israel |
| 4 · US public districts (later) | 50M students | Only after a case study; 12–18 month cycles; American track only | NCSS (social studies teachers) conference; state standards alignment; Clever/Google Classroom |

### 6.3 Price sheet (one page, no negotiation below school tier)
**Launch rule (decided Sep 7, 2026): content is free, conversation is the product.** Never gate an era or a figure behind pay; gate live conversation, because that is the only thing with a per-minute cost (§4.2). "Ask them" from the canon pack runs on-device at zero marginal cost, so it stays free and is the funnel into Plus.

| Tier | Price | Includes |
|---|---|---|
| **Free** | $0 | The whole journey (board, every era as it ships, episodes in each figure's recorded voice, clues, stamps, mini-games, streaks) + "Ask them" from the canon pack. Teachers: class codes + progress table once classroom mode ships. |
| **Plus** (launch week) | $5/mo · 7-day free trial | Live voice conversation with any Era 1 figure via ElevenLabs Agents, 30 minutes/mo, then unlimited text turns with the same guardrails. Up to 4 profiles. |
| **School** | $8/student/yr, min $1,500 | Live chat with class-pooled minutes, transcripts, reporting, DPA, admin dashboard, both tracks. "Contact us" only until the first pilot. |
| **District / Network** | custom (~$6/student at 10k+) | SSO (Clever/Google), rostering, standards reports, custom figures. |
| Roadmap **Max** | $15/mo | Live video replies, longer voice quota. Only when video ≤ $0.02/s. |

**Launch stack (subscriptions live by Fri Sep 11):** ElevenLabs Agents (one agent per figure, config in `podpast/assets/agents.json`) · Stripe Checkout + Customer Portal · Supabase magic-link auth · two Netlify Functions on podpast.dev (Stripe webhook → entitlement; signed agent session + minutes meter). The game stays the single-file build.

### 6.4 The dummies checklist (do these in this order; each is ≤ 1 day)
- [ ] **Landing page = one free playable episode.** Not a description. Playable. Above the fold. (Reuse the Miklat share/challenge loop.)
- [ ] **10 teacher conversations** (5 day-school, 3 homeschool parents, 2 public). Script: "Show me how you teach the Revolution today. What would make a 3-minute Franklin episode useful?" Take notes; don't pitch.
- [ ] **5-classroom free pilot, Oct–Dec 2026.** Give them Era 1 + a progress table. Ask for 3 things: 1 quote, 1 number (minutes used / completion), 1 photo of kids using it.
- [ ] **Compliance kit** before pilot day 1: privacy policy, DPA template (use a standard student-privacy template), COPPA school-consent notice, data map (what you store, where, how long), accessibility statement.
- [ ] **Case study** in January from pilot data → the spring sales asset.
- [ ] **Three events:** Prizmah conference (spring), ISTE (June), NCSS (late fall). Speak, don't sponsor.
- [ ] **Partnership email** to OpenDor/Unpacked: co-branded Israeli track episodes, their distribution, your engine.
- [ ] **Israel Innovation Authority sandbox application** once Hebrew Era 1 ships.
- [ ] **Weekly clip** from the factory (one figure, one "wait, what?" fact, 20 seconds) — WhatsApp first, then Reels. This is already the Miklat marketing plan; same machine.

---

## 7 · What to do this week (the only list that matters)

_Rewritten Sep 7, 2026 for the subscription launch. Earlier items 1–6 (source rescue, WORLD.md, engine fork, Salomon episode, playtest, teacher emails) stay valid; the engine fork and Era 1 episodes are done in `podpast/`._

| Day | Ship | Blocker |
|---|---|---|
| Mon | Plus paywall + pricing screens in the build ✅ · six agent prompt packs ✅ · two-clip image-to-video proof (15 credits) | none |
| Tue | Supabase sign-in, Stripe Checkout (test mode), Stripe webhook function | ElevenLabs key, Stripe keys, Supabase URL + anon key from Zorba |
| Wed | Six ElevenLabs agents live, signed-session function, 30-minute cap, talk screen in the app | same keys |
| Thu | Journey spine light (fixed order, stamps, era door), in-app signs/prompts, hero video clips (≤ 90 credits for Era 1) | none |
| Fri | Phone QA, Stripe live mode, launch post, first subscribers | Zorba's go |

Stop condition for the week: **one paying subscriber talking to Franklin in his own voice.** Nothing else.

---

## 8 · Sources (verified this session)
- Netlify site + deploy metadata for `podpast` (site id af6ed325…, deploy 6a4c47fa…): framework Hugo, deploy source CLI, no functions, `kids.html` added in the latest deploy.
- Hello History / Humy: [App Store listing](https://apps.apple.com/us/app/hello-history-ai-chat/id1659654111), [Humy pricing](https://www.humy.ai/humy-pricing), [Humy comparison post](https://www.humy.ai/blog/ai-history-chat-tools-compared-classroom), [Humy for schools](https://www.humy.ai/for-schools).
- Khanmigo district pricing: [Edusage guide](https://www.edusageai.com/blogs/how-much-does-khanmigo-cost-pricing-for-teachers-and-schools-in-2026).
- Duolingo pricing + conversion: [DealNews](https://www.dealnews.com/features/duolingo/cost/), [Measure Protocol](https://www.measureprotocol.com/insights/duolingo-engagement-vs-conversion-gap), [Axis Intelligence](https://axis-intelligence.com/duolingo-statistics/). Duolingo for Schools sunset: [Zendesk](https://duolingoschools.zendesk.com/hc/en-us/articles/6830504408461-How-much-does-Duolingo-for-Schools-cost).
- Prodigy model: [Prodigy for educators](https://www.prodigygame.com/main-en/teachers), [Nibble review](https://nibble-app.com/blog/prodigy-review), [Fairplay critique](https://fairplayforkids.org/pf/prodigy/).
- Prizmah enrollment 2026: [JNS](https://www.jns.org/news/u-s-news/record-high-jewish-day-school-enrollment-in-2026-prizmah-report-suggests), [JTA](https://www.jta.org/2026/06/26/united-states/jewish-day-school-enrollment-is-rising-across-denominations), [Prizmah report](https://prizmah.org/knowledge/resource/prizmah-network-jewish-day-school-enrollment-landscape-report).
- AI video API prices: [Apiframe](https://apiframe.ai/blog/ai-video-api-pricing-2026), [BuildMVPFast](https://www.buildmvpfast.com/api-costs/ai-video), [Modelslab](https://modelslab.com/blog/api/veo-3-1-vs-kling-3-sora-2-ai-video-api-cost-2026).
- ElevenLabs prices: [ElevenLabs API pricing](https://elevenlabs.io/pricing/api), [Puter breakdown](https://developer.puter.com/tutorials/elevenlabs-api-pricing/).
- Claude API prices: Anthropic first-party rate table (Sonnet 5 $2/$10, Haiku 4.5 $1/$5, Opus 5 $5/$25 per M tokens).
- COPPA/FERPA for ed-tech AI: [SchoolAI guide](https://schoolai.com/blog/ensuring-ferpa-coppa-compliance-school-ai-infrastructure), [Promise Legal](https://blog.promise.legal/edtech-ai-compliance-ferpa-coppa/), [Sonomos](https://sonomos.ai/blog/ferpa-ai-chatgpt-claude-schools-edtech-2026/).
- Israel Education Cloud + AI sandbox: [Innovation Authority call](https://innovationisrael.org.il/en/calls_for_proposal/personalized-education-tech/), [EdTech policy paper](https://www.researchgate.net/publication/308365386_Educational_Technology_Policy_in_Israel).
- Higgsfield account: Ultra plan, 5,012 credits (checked this session).
