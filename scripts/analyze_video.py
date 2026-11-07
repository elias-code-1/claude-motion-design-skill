#!/usr/bin/env python3
"""
analyze_video.py — Analyse complète d'une vidéo motion design de référence
Métadonnées, scene detection, k-means palette, audio (loudness, BPM), typographie et mouvement.
"""

import sys
import os
import json
import subprocess
import math
from collections import Counter

def run_cmd(cmd):
    p = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return p.stdout, p.stderr, p.returncode

def get_metadata(video_path):
    cmd = f'ffprobe -v quiet -print_format json -show_streams -show_format "{video_path}"'
    stdout, _, code = run_cmd(cmd)
    if code != 0 or not stdout:
        return {}
    data = json.loads(stdout)
    v_streams = [s for s in data.get("streams", []) if s.get("codec_type") == "video"]
    a_streams = [s for s in data.get("streams", []) if s.get("codec_type") == "audio"]
    
    meta = {
        "duration": float(data.get("format", {}).get("duration", 0)),
        "size_bytes": int(data.get("format", {}).get("size", 0)),
        "has_audio": len(a_streams) > 0
    }
    if v_streams:
        vs = v_streams[0]
        meta["width"] = int(vs.get("width", 0))
        meta["height"] = int(vs.get("height", 0))
        meta["codec"] = vs.get("codec_name", "unknown")
        fps_str = vs.get("r_frame_rate", "30/1")
        try:
            n, d = fps_str.split("/")
            meta["fps"] = round(float(n) / float(d), 2)
        except Exception:
            meta["fps"] = 30.0
        g = math.gcd(meta["width"], meta["height"]) if meta["width"] and meta["height"] else 1
        meta["ratio"] = f"{meta['width']//g}:{meta['height']//g}" if g > 0 else "unknown"
    return meta

def extract_scenes(video_path, threshold=0.3):
    cmd = f'ffmpeg -i "{video_path}" -vf "select=\'gt(scene,{threshold})\',showinfo" -vsync vfr -f null - 2>&1'
    _, stderr, _ = run_cmd(cmd)
    lines = [l for l in stderr.splitlines() if "showinfo" in l]
    return len(lines)

def extract_palette(frames_dir, n_colors=5):
    try:
        from PIL import Image
        import numpy as np
        from sklearn.cluster import KMeans
    except ImportError:
        return []

    images = [os.path.join(frames_dir, f) for f in os.listdir(frames_dir) if f.endswith((".jpg", ".png"))]
    if not images:
        return []

    sampled_pixels = []
    # Prendre jusqu'à 8 frames
    step = max(1, len(images) // 8)
    for img_p in images[::step][:8]:
        try:
            im = Image.open(img_p).convert("RGB").resize((120, 120))
            arr = np.array(im).reshape(-1, 3)
            sampled_pixels.append(arr[::5]) # subsample
        except Exception:
            continue

    if not sampled_pixels:
        return []

    all_px = np.concatenate(sampled_pixels, axis=0)
    kmeans = KMeans(n_clusters=n_colors, random_state=42, n_init=3)
    kmeans.fit(all_px)
    centers = kmeans.cluster_centers_.astype(int)
    labels = kmeans.labels_
    counts = Counter(labels)
    total = len(all_px)

    res = []
    for i, c in enumerate(centers):
        hx = "#{:02X}{:02X}{:02X}".format(*c)
        pct = round(counts[i] / total * 100, 1)
        res.append((hx, pct))
    return sorted(res, key=lambda x: -x[1])

def get_audio_stats(video_path):
    stats = {"loudness_lufs": None, "bpm": None}
    # Loudnorm check
    cmd = f'ffmpeg -i "{video_path}" -af loudnorm=print_format=json -f null - 2>&1'
    _, stderr, _ = run_cmd(cmd)
    try:
        idx = stderr.rfind("{")
        if idx != -1:
            j = json.loads(stderr[idx:stderr.rfind("}")+1])
            stats["loudness_lufs"] = float(j.get("input_i", -99))
    except Exception:
        pass

    # BPM via librosa
    try:
        import librosa
        import numpy as np
        # Extraire wav temporaire
        tmp_wav = f"/tmp/audio_bpm_{os.getpid()}.wav"
        cmd_wav = f'ffmpeg -y -i "{video_path}" -vn -ar 22050 -ac 1 "{tmp_wav}" 2>/dev/null'
        run_cmd(cmd_wav)
        if os.path.exists(tmp_wav):
            y, sr = librosa.load(tmp_wav, sr=22050, duration=30)
            tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
            if hasattr(tempo, "__iter__"):
                tempo = float(tempo[0])
            stats["bpm"] = round(float(tempo), 1)
            os.remove(tmp_wav)
    except Exception:
        pass

    return stats

def analyze(video_path, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    frames_dir = os.path.join(out_dir, "frames")
    os.makedirs(frames_dir, exist_ok=True)

    meta = get_metadata(video_path)
    cuts = extract_scenes(video_path)
    dur = meta.get("duration", 1)
    cuts_per_10s = round((cuts / dur) * 10, 2) if dur > 0 else 0
    avg_shot_dur = round(dur / (cuts + 1), 2) if dur > 0 else 0

    # Frames si pas déjà fait
    if len(os.listdir(frames_dir)) < 3:
        run_cmd(f'ffmpeg -y -i "{video_path}" -vf "fps=1/2" -q:v 2 "{frames_dir}/frame_%04d.jpg" 2>/dev/null')

    palette = extract_palette(frames_dir)
    audio = get_audio_stats(video_path) if meta.get("has_audio") else {"loudness_lufs": None, "bpm": None}

    report = {
        "video": os.path.basename(video_path),
        "metadata": meta,
        "editing": {
            "scene_cuts": cuts,
            "cuts_per_10s": cuts_per_10s,
            "avg_shot_duration_s": avg_shot_dur
        },
        "palette": palette,
        "audio": audio
    }

    with open(os.path.join(out_dir, "report.json"), "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    return report

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 analyze_video.py <video_path> <output_dir>")
        sys.exit(1)
    rep = analyze(sys.argv[1], sys.argv[2])
    print(f"✅ Analyse terminée pour {sys.argv[1]}")
