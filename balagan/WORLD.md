# 🌀 BALAGAN — world bible (concept, stage 1 — awaiting Zorba gate)

**Pitch:** The daily Israeli-culture duel built for the group chat. 90
seconds, 5 chaotic rounds, one shared gauntlet a day — then you send the
link and find out who's really Israeli.

**Why this game:** the social brief demands a game where connection IS the
mechanic, not a bolt-on. Precedents from the research corpus: Trivia Crack
hit #1 in 19 countries on cultural flavor alone; Wordle built the world's
biggest daily ritual on a shareable result grid; both patterns are
URL-duel-native (zero backend, WhatsApp-first — rung 1 of SOCIAL.md).

## The daily: 5 rounds, ~90 seconds, seeded (same for everyone)
1. **אמת או בלאגן? (Emet o Balagan?)** — a wild "fact" about Israel: real
   or invented? (10s)
2. **Slang Match** — 4 slang words ↔ 4 meanings, against the clock.
3. **שוק: The Price Is Right** — real shuk item, guess the price; closest
   band scores. (Shuk Shopper crossover energy.)
4. **Emoji Pitgam** — decode the Hebrew proverb/song from emojis
   (🕊️🫒 → ...). The screenshots share themselves.
5. **Savta Says** — reflex round; obey ONLY instructions prefixed
   "Savta says." Miss once, savta wins.

**Result = points + speed**, rendered as a Wordle-grade share grid:
`BALAGAN #12 🟩🟩🟥🟩🟨 87 — savta took me on round 3. Your turn:` + duel link.

## The duel (the actual game)
Your result rides IN the link (SOCIAL.md rung 1, no server). Friend plays
the same 5 rounds; their device compares round-by-round; result card crowns
👑 per round + overall, with a taunt line. Rematch = tomorrow's daily —
**the retention loop is the relationship.**
- Chavruta streaks apply natively (both played today = streak lives).
- Group chats become standings: everyone replies with their card.

## Tone & content rules
- Celebratory chaos, never cringe, never partisan. Politics is OUT; culture,
  food, slang, savta, nostalgia are IN. Bilingual EN/HE with full parity —
  diaspora plays in English, gets the same rounds.
- Content ships as versioned JSON packs (factory: agents draft, human
  approves — cultural sensitivity gate is MANDATORY per pack).
- Holiday packs = the calendar engine (Hanukkah pack, Pesach pack) — re-spike
  every year, sponsorable later.

## Tech shape
Single file, offline-first (packs precached in SW), seeded daily from
day-number, zero backend for solo + duels; HaLuach board + streaks when the
worker exists. Standard factory invariants (i18n, events, og, tip hook).

## Open questions for Zorba (the stage-1 gate)
1. Greenlight BALAGAN as this (the social daily duel) vs. keep the name for
   something else?
2. Round 5 alternative: "Protexia" (queue-jumping reflex game)?
3. English-market naming: "BALAGAN" travels great — agree?
