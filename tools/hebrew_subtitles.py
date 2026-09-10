#!/usr/bin/env python3
"""Generate Hebrew/English .srt subtitles from a video using Whisper large-v3.

For a local machine with a GPU (or patience on CPU). Colab users: use
hebrew-subtitles.ipynb instead — no install required.

    pip install -U faster-whisper
    python hebrew_subtitles.py movie.mp4

Writes english.srt (Hebrew -> English) and hebrew.srt (Hebrew captions)
next to the input file.
"""
import sys
import os
from faster_whisper import WhisperModel


def ts(t):
    h = int(t // 3600); m = int(t % 3600 // 60); s = int(t % 60); ms = int((t - int(t)) * 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"


def write_srt(segs, out):
    with open(out, "w", encoding="utf-8") as f:
        for i, s in enumerate(segs, 1):
            f.write(f"{i}\n{ts(s.start)} --> {ts(s.end)}\n{s.text.strip()}\n\n")
    print("wrote", out)


def main():
    if len(sys.argv) < 2:
        sys.exit("usage: python hebrew_subtitles.py <video-or-audio-file>")
    media = sys.argv[1]
    base = os.path.dirname(os.path.abspath(media))

    try:
        import torch
        gpu = torch.cuda.is_available()
    except ImportError:
        gpu = False
    print("GPU:", gpu)

    model = WhisperModel("large-v3",
                         device="cuda" if gpu else "cpu",
                         compute_type="float16" if gpu else "int8")

    # English translation (auto-detect source so non-Hebrew dialogue passes through)
    segs, _ = model.transcribe(media, task="translate", vad_filter=True, beam_size=5)
    write_srt(segs, os.path.join(base, "english.srt"))

    # Hebrew captions (force Hebrew)
    segs, _ = model.transcribe(media, task="transcribe", language="he", vad_filter=True, beam_size=5)
    write_srt(segs, os.path.join(base, "hebrew.srt"))


if __name__ == "__main__":
    main()
