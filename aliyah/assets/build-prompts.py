#!/usr/bin/env python3
"""Single source for the ALIYAH art packs. Writes assets/prompts.json, press/prompts.json
and PROMPTS-COPYPASTE.txt (every prompt fully inlined for ChatGPT / Gemini / Flow).
Run: python3 aliyah/assets/build-prompts.py"""
import json, os, textwrap
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

STYLE=("Anime-poster style: painted gradient skies with a giant sun, clean cel-shaded characters, "
 "bold readable silhouettes at phone-thumbnail size, soft haze bands, no photorealism. "
 "Brand palette: shelter-night #0d1120, gold #ffd166 (the accent), siren red #ff5d73, mint #7ee8c7, "
 "cyan #3ee6ff, cream #fdf3e3. Israeli light: warm, high, Mediterranean.")
AVOID=("AVOID: photorealism, text, captions, watermarks, logos, extra fingers, weapons, gore, "
 "religious caricature, muddy desaturated palettes, tourist-brochure stock-photo look.")
MAGENTA=("Sprite on a FLAT solid magenta #ff00ff background, nothing else in frame, no shadow on the ground, "
 "no gradient (the game chroma-keys magenta out).")

HERO_GAP=("NOA, the gap-year hero: 18 years old, curly dark-brown hair, warm tan skin, gold headband with a small "
 "Star of David on the forehead (the Naruto nod), orange t-shirt, blue jeans, cream sneakers, oversized green "
 "backpack, wide friendly grin. Round head, roughly 4 heads tall, chunky hands.")
HERO_FAM=("THE COHENS, the young-family hero: a parent in a navy cap with a small gold Star of David, mint t-shirt, "
 "dark trousers, pushing a red stroller with BABY EZRA inside (round-faced, yellow beanie, one tooth). "
 "A diaper bag hangs off the stroller like a second suitcase. Same proportions as the other hero.")
SAVTA=("SAVTA, the arcade's mascot: 70s, small and mighty, floral dress, cardigan even in August, grey bun, "
 "reading glasses on a chain, a wooden matkot paddle in one hand and a slipper in the other. Fierce, loving grin.")
SHUKI=("SHUKI THE VENDOR: burly, thick black mustache, green apron over a white t-shirt, wooden spoon in his fist, "
 "one eyebrow raised mid-haggle.")
DVIR=("DVIR, the Jewish Agency shaliach: 40s, neat beard, blue button-up shirt with a small Israeli-flag lanyard, "
 "clipboard, kind eyes, the expression of someone about to ask one more question.")
MENDY=("RABBI MENDY of Chabad: black hat, black coat, warm broad smile, holding a velvet tefillin bag, one hand "
 "open in a welcoming gesture. Never pushy, always glad.")

def sheet(name,bio,extra=""):
    return (f"CHARACTER REFERENCE SHEET, 1:1. {bio} Sheet layout: full-body front view, side view, back view, "
            f"plus three head-and-shoulder expressions: determined, delighted, oops. Consistent proportions across "
            f"all views. {extra} {MAGENTA}")
def backdrop(scene):
    return (f"Painted vertical game background, 9:16, for a phone game. {scene} Composition: all detail in the "
            f"upper 60%; the bottom 40% fades to a plain flat ground with NO objects (gameplay is drawn over it). "
            f"No people, no animals, no text.")

GAMEPLAY=[
 {"file":"hero-gap-sheet.png","ar":"1:1","prompt":sheet("Noa",HERO_GAP,"Also include one running pose and one jumping pose.")},
 {"file":"hero-fam-sheet.png","ar":"1:1","prompt":sheet("The Cohens",HERO_FAM,"Also include one running pose pushing the stroller.")},
 {"file":"savta-sheet.png","ar":"1:1","prompt":sheet("Savta",SAVTA,"Include one pose mid-serve with the slipper flying.")},
 {"file":"shuki-sheet.png","ar":"1:1","prompt":sheet("Shuki",SHUKI,"Include one pose behind a market stall counter, arms crossed.")},
 {"file":"dvir-sheet.png","ar":"1:1","prompt":sheet("Dvir",DVIR)},
 {"file":"mendy-sheet.png","ar":"1:1","prompt":sheet("Rabbi Mendy",MENDY)},
 {"file":"bg-archive.png","ar":"9:16","prompt":backdrop("A cramped family archive at night: towering shelves of dusty boxes and photo albums, a single hanging bulb, filing cabinets leaning, gold dust motes in the beam, shadows in deep violet-brown. Nostalgic, a little spooky, funny.")},
 {"file":"bg-office.png","ar":"9:16","prompt":backdrop("A government notary office: a heavy wooden desk with a big stamp, stacks of certificates with red seals, a wall clock, a window with venetian blinds throwing warm stripes. Cel-shaded, slightly heroic, like the stamp is legendary.")},
 {"file":"bg-bengurion.png","ar":"9:16","prompt":backdrop("Ben Gurion airport arrivals hall: bright white and pale blue, a big blue sign reading nothing (no text), Israeli flags, the curve of a baggage carousel, glass wall with a plane tail outside in golden light.")},
 {"file":"bg-gordon.png","ar":"9:16","prompt":backdrop("Gordon Beach, Tel Aviv, midday: turquoise sea with rolling white waves, striped beach umbrellas, the Tel Aviv skyline and the Azrieli towers in the haze, a huge pale sun, cyan-to-cream sky.")},
 {"file":"bg-matkot.png","ar":"9:16","prompt":backdrop("Tel Aviv beach at golden hour for a matkot duel: orange-gold sky, giant low sun, silhouetted skyline, sea band, wide sand foreground kept empty.")},
 {"file":"bg-mahane-yehuda.png","ar":"9:16","prompt":backdrop("Mahane Yehuda market, Jerusalem, Friday early afternoon: red-and-cream striped awnings, strings of glowing bulbs, Jerusalem-stone arches, mountains of spices, challah and flowers, warm amber light, crowded color.")},
 {"file":"bg-oldcity.png","ar":"9:16","prompt":backdrop("Old City of Jerusalem alleys at sunset: worn stone steps, arches, hanging lanterns, a cat on a ledge, the Dome of the Rock silhouette on the horizon, sky going from gold to purple.")},
 {"file":"bg-kotel.png","ar":"9:16","prompt":backdrop("The Kotel plaza at dusk: the great stone wall with tufts of green capers in the cracks, warm floodlight on the stone, violet-pink sky above, calm and monumental.")},
]
PRESS=[
 {"file":"keyart.png","ar":"16:9","prompt":f"KEY ART, 16:9, poster composition. {HERO_GAP} stands on Gordon Beach at sunset holding a red suitcase with an Israeli-flag sticker, headband ribbon flying; behind them a giant gold sun, the Tel Aviv skyline on the left and the Old City walls with the Dome of the Rock on the right, both impossibly close like an anime opening. Savta with a matkot paddle small in the background. Confetti of Hebrew-letter-shaped sparkles (no readable words). Wide margin at the top-left for a title to be added later."},
 {"file":"icon.png","ar":"1:1","prompt":f"APP ICON, 1:1, centred, no text. A red suitcase with an Israeli-flag sticker and a gold headband tied around its handle, on a shelter-night #0d1120 background with a gold #ffd166 sunburst behind it. Chunky, readable at 64px."},
 {"file":"poster.png","ar":"9:16","prompt":f"VERTICAL POSTER, 9:16, no text. Stacked anime-poster collage top to bottom: the family archive with flying documents, Ben Gurion arrivals, Gordon Beach surf, Savta serving a slipper at matkot, Mahane Yehuda awnings, and at the bottom the Kotel at dusk with {HERO_GAP} arriving. Gold sun rays tie the panels together. Leave the top 15% quiet for a title."},
 {"file":"cover-itch.png","ar":"4:3","prompt":f"GAME COVER, 4:3, no text. {HERO_GAP} and {HERO_FAM} side by side on the Tel Aviv tayelet, suitcases at their feet, looking toward Jerusalem on the horizon under a giant gold sun. Savta photobombs from the left with a paddle."},
 {"file":"banner.png","ar":"21:9","prompt":"WIDE BANNER, 21:9, no text, no characters. A single continuous painted panorama left to right: New York skyline at night with a plane taking off, the Mediterranean, the Tel Aviv shore, the Judean hills, the Old City of Jerusalem at sunset. Gold sun in the centre. Quiet, cinematic."},
 {"file":"share-card.png","ar":"4:5","prompt":"SHARE CARD TEMPLATE, 4:5 (1080x1350), for WhatsApp. Shelter-night #0d1120 background, gold #ffd166 frame, a big empty rounded panel in the centre for a number to be overlaid later, a row of four small circular slots along the bottom third for chapter icons, subtle sun rays from the top. No text, no characters."},
]

def pack(title,items,note):
    return {"game":title,"style":STYLE+" "+note,"images":[{"file":i["file"],"aspect_ratio":i["ar"],"prompt":i["prompt"]} for i in items]}
json.dump(pack("Aliyah: The Adventure — gameplay art pack",GAMEPLAY,
  "Sprites go on FLAT MAGENTA #ff00ff; backdrops need no transparency. Generate with bin/imagepack aliyah/assets"),
  open(os.path.join(ROOT,"assets","prompts.json"),"w"),indent=1,ensure_ascii=False)
json.dump(pack("Aliyah: The Adventure — press pack",PRESS,"Generate with bin/imagepack aliyah"),
  open(os.path.join(ROOT,"press","prompts.json"),"w"),indent=1,ensure_ascii=False)

W=lambda s:textwrap.fill(s,74)
out=["ALIYAH: THE ADVENTURE — COPY-PASTE PROMPT PACK (fully inlined)",
"="*66,
W("Every prompt below is self-contained: style guide and avoid-list are already merged in. Copy one whole block (between the ---- lines) and paste it into ChatGPT (image mode), Gemini, or Adobe Firefly. Attach the reference sheet the prompt names when it names one."),
"",
"REVIEW BRIEF (paste this first, once, then run the prompts)",
"-"*66,
W("You are the art director for ALIYAH: THE ADVENTURE, a free mobile browser game on miklatgames.fun. Play the test build first: https://claude.ai/code/artifact/6fc572c2-105b-411f-9a73-c294bb9cd02c . The design spec is in the repo at .claude/os/games/ALIYAH.md and the world bible at aliyah/WORLD.md. Review for: (1) does the art direction below read as one world across all ten missions, (2) any character or scene that would read as a caricature to an Israeli or a religious player, (3) anything a Nefesh B'Nefesh reviewer would flag as factually off. Then generate the prompts below in order, reference sheets first."),
"",
"RULES THAT MAKE IT WORK",
"1. Run the prompts IN ORDER. Character sheets first (prompts 1-6).",
"2. From prompt 7 onward, ATTACH the sheets the prompt names.",
"3. One prompt = one generation. Save every keeper; it is the next reference.",
"4. Sprites must land on FLAT magenta #ff00ff or the game cannot key them.",
"Aspect ratios: sheets 1:1 · game backdrops 9:16 · key art 16:9 ·",
"poster 9:16 · itch cover 4:3 · banner 21:9 · share card 4:5.",
""]
n=0
for section,items in (("GAMEPLAY PACK → aliyah/assets/",GAMEPLAY),("PRESS PACK → aliyah/press/",PRESS)):
    out+=["","#"*66,section,"#"*66]
    for it in items:
        n+=1
        refs=""
        if it["file"] in("keyart.png","poster.png","cover-itch.png"):refs=" ATTACH: hero-gap-sheet.png"+(", hero-fam-sheet.png" if it["file"]=="cover-itch.png" else "")+(", savta-sheet.png" if it["file"]!="poster.png" else ", savta-sheet.png")
        out+=["","-"*66,f"PROMPT {n} — {it['file']} — {it['ar']}","-"*66,W("STYLE: "+STYLE),"",W(it["prompt"]+refs),"",W(AVOID)]
open(os.path.join(ROOT,"PROMPTS-COPYPASTE.txt"),"w").write("\n".join(out)+"\n")
print(f"wrote {len(GAMEPLAY)} gameplay + {len(PRESS)} press prompts")
