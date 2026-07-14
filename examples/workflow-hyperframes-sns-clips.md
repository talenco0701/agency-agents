# Workflow: Self-Driving SNS Clips with HyperFrames

> Drop a long recording, kick it off once, and get a set of ready-to-post
> vertical SNS clips — highlights picked, captions synced, exported — without
> babysitting each step.

## The Scenario

You have a long recording (a webinar, a Zoom talk, a talking-head capture) sitting
on your machine. You want several short 9:16 clips with captions synced to the
speech, posted-ready — and you don't want to approve every cut. You want it to
**self-drive**: one instruction, then it runs to completion.

This runs in **your local Claude Code**, not in a cloud session — the tool needs
direct access to the video file on your disk.

## Agent

| Agent | Role in this workflow |
|-------|----------------------|
| HyperFrames Video Editor | Picks highlights, cuts vertical clips, generates speech-synced captions, applies your style, and exports the set autonomously |

## The Workflow

### Step 1 — Set up (Windows, first time only)

Open **PowerShell**, go to the folder holding your video, install the HyperFrames
skill, and start Claude Code there:

```powershell
# Go to the folder that contains your recording
cd C:\Users\user\.claude\movie

# Install the HyperFrames skill (one time)
npx skills add heygen-com/hyperframes

# Start Claude Code in this folder
claude
```

> macOS/Linux is identical except for the `cd` path (e.g. `cd ~/Desktop/video-project`).

### Step 2 — Kick it off (the self-driving prompt)

Paste this **one** message. It states the whole goal — format, count, length,
caption sync, safe zones, output location, and "run to completion" — so the agent
never stops to ask:

```
HyperFrames Video Editor を起動して、自走モードで進めて。

素材: 陥没事故なぜ大規模に老朽化対策のカギは「人手と教育」配管のプロと考える.mp4
やること: この録画から縦型9:16のSNS切り抜きを3〜5本つくる。
- テロップは音声にフレーム単位で同期
- 上下の約15%セーフゾーンを守る（下部三分の一にテロップ）
- 書き出しは output\ フォルダへ
- 途中で止まらず最後まで進めて。終わったら、ファイル名・尺・一言フックの一覧を出して。
```

English equivalent:

```
Activate HyperFrames Video Editor in autonomous mode.

Source: <your-video>.mp4
Goal: 3–5 vertical 9:16 SNS clips from this recording.
- Captions frame-synced to the audio
- Respect the top/bottom ~15% safe zones (lower-third captions)
- Export to an output\ folder
- Run to completion without stopping. When done, list each file, its
  duration, and its one-line hook.
```

The agent picks the highlights itself, cuts, captions, styles, self-checks, and
exports — then hands back a manifest of the finished clips.

### Step 3 — (Optional) Batch / 量産

Same recording, more clips, or several lengths at once:

```
同じ録画から、60秒の縦型を5本 + 3分の横型ダイジェスト1本を、同じスタイルで量産して。
output\ に全部書き出して、最後に一覧を出して。
```

To reuse your look on the *next* recording, just point the agent at the new file —
it keeps the style (fonts, colors, line-break rules, pacing) you dialed in, so you
don't re-specify anything.

### Step 4 — Resume if it pauses

If a render stalls or you interrupt it, one word continues from where it left off —
it never re-cuts finished clips:

```
続けて
```

(or `keep going`)

Finished clips land in the `output\` subfolder of the folder you started Claude
Code in.

## Tips

- **Long / special-character filenames**: the example filename contains `「」` and
  is long. If you hit a path error, rename the file to something short like
  `movie.mp4` and re-run — everything else stays the same.
- **Want to approve highlights first?** Add "ハイライトを先に見せて"
  ("show me the highlights first") to the kickoff prompt — that's the one case
  where the agent pauses mid-run instead of self-driving.
- **Faces optional**: add "人物は映さず" ("no on-camera person") for text-and-visuals-
  only clips, or ask for the faceless talking-head pipeline (voice clone → avatar →
  lip-sync → HyperFrames) if you want a generated presenter.
- **Multi-language**: once one version looks right, ask for
  "英語版・中国語版・韓国語版も同じレイアウトで" to fan the template out with authored
  (not auto-generated) captions.
