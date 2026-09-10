# Hebrew movie subtitles

Tooling to generate accurate `.srt` subtitles for the Hebrew (and other)
spoken parts of a video, using OpenAI Whisper `large-v3` — currently the
best free option for Hebrew speech.

Each run produces two files:

- **`english.srt`** — Hebrew speech translated to English. The safe single
  file for a mixed-language audience: non-Hebrew dialogue passes through to
  English too.
- **`hebrew.srt`** — Hebrew captions of what is spoken (accessibility / a
  Hebrew-reading audience).

## Fastest path — one click, free GPU

Open the notebook directly in Google Colab:

**https://colab.research.google.com/github/zorbachin/miklatgames/blob/claude/hebrew-movie-subtitles-gj7hxv/tools/hebrew-subtitles.ipynb**

Then: **Runtime → Change runtime type → GPU (T4) → Save**, then
**Runtime → Run all**. The notebook is pre-filled with the Drive file ID, so
it downloads the video, transcribes it, and offers the two `.srt` files for
download. A short clip finishes in a couple of minutes.

(If the Drive link's sharing is off, the notebook's cell 2 has commented
fallbacks to upload the file or mount your Drive instead.)

## Local machine

```bash
pip install -U faster-whisper
python tools/hebrew_subtitles.py path/to/movie.mp4
```

Writes `english.srt` and `hebrew.srt` next to the input. Whisper reads the
`.mp4` directly — no separate audio extraction needed. A GPU is much faster
but CPU works (int8) for short clips.

## Using the subtitles

Play the video in **VLC** → **Subtitle → Add Subtitle File** → pick the
`.srt`. Nothing is re-encoded. To burn them in permanently:

```bash
ffmpeg -i movie.mp4 -vf subtitles=english.srt out.mp4
```

The `.srt` timestamps line up only with the exact copy of the video you
transcribed — screen that same file.
