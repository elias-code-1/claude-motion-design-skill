#!/usr/bin/env python3
"""Génère tous les effets sonores + la musique de fond (100% procédural, libre de droits).
Usage:  npm run sfx
"""
import os, subprocess, wave
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')
SFX = os.path.join(OUT, 'sfx')
os.makedirs(SFX, exist_ok=True)
rng = np.random.default_rng(7)


def t_(d): return np.arange(int(SR * d)) / SR
def noise(d): return rng.standard_normal(int(SR * d))
def norm(x, peak=0.9): return x / (np.max(np.abs(x)) + 1e-9) * peak
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], 'bandpass', fs=SR, output='sos'), x)
def lp(x, f): return sosfilt(butter(2, f, 'lowpass', fs=SR, output='sos'), x)
def hp(x, f): return sosfilt(butter(2, f, 'highpass', fs=SR, output='sos'), x)
def fade(x, a=0.005, r=0.02):
    n = len(x); y = x.copy()
    na, nr = int(a * SR), int(r * SR)
    y[:na] *= np.linspace(0, 1, na); y[-nr:] *= np.linspace(1, 0, nr); return y


def reverb(x, t=1.2, wet=0.3):
    n = int(SR * t)
    ir = rng.standard_normal(n) * np.exp(-np.linspace(0, 7, n))
    ir = lp(ir, 5000)
    y = fftconvolve(x, ir)
    y /= np.max(np.abs(y)) + 1e-9
    x2 = np.pad(x, (0, len(y) - len(x)))
    return x2 * (1 - wet) + y * wet * np.max(np.abs(x2))


def sweep_noise(d, f0, f1, width=0.5, seed_off=0):
    """bruit filtré dont le centre glisse f0→f1 (traitement par blocs)"""
    n = int(SR * d); x = noise(d); y = np.zeros(n); B = 1024
    for i in range(0, n, B):
        fc = f0 * (f1 / f0) ** (i / n)
        lo, hi = max(40, fc * (1 - width)), min(SR / 2 - 100, fc * (1 + width))
        seg = x[max(0, i - 256): i + B]
        yb = bp(seg, lo, hi)[256 if i else 0:]
        y[i: i + len(yb)] = yb[: n - i]
    return y


def stereo(x, width=0.012):
    d = int(SR * width)
    return np.stack([x, np.roll(x, d) * 0.9], axis=1)


def write(name, x, peak=0.9):
    x = norm(x, peak)
    if x.ndim == 1: x = stereo(x)
    pcm = (np.clip(x, -1, 1) * 32767).astype('<i2')
    with wave.open(os.path.join(SFX, name + '.wav'), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())


def bell(f, d, partials=((1, 1), (2.01, .5), (3.02, .28), (4.2, .15), (5.4, .08)), dec=4.0):
    t = t_(d); y = np.zeros_like(t)
    for r, a in partials: y += a * np.sin(2 * np.pi * f * r * t) * np.exp(-t * dec * (0.6 + r * 0.4))
    return fade(y, 0.002, 0.05)


# ───────── SFX ─────────
def whoosh(d=0.8, f0=250, f1=3800, big=False):
    n = sweep_noise(d, f0, f1, 0.7)
    t = t_(d); env = np.sin(np.pi * np.clip(t / d, 0, 1) ** 0.8) ** 2
    y = n * env
    if big:
        sub = np.sin(2 * np.pi * (50 + 60 * (t / d)) * t) * env * 0.5
        y = y + sub * np.max(np.abs(y))
    return fade(y)


write('whoosh', whoosh(0.8), 0.7)
write('whoosh_big', reverb(whoosh(1.1, 140, 5200, True), 1.4, .25), 0.85)
rev = sweep_noise(0.7, 4200, 220, 0.6); t = t_(0.7)
write('whoosh_rev', fade(rev * (np.clip(t / 0.7, 0, 1) ** 1.6)), 0.7)

# impact
d = 1.6; t = t_(d)
sub = np.sin(2 * np.pi * (34 + 60 * np.exp(-t * 14)) * t) * np.exp(-t * 2.6)
thump = lp(noise(d), 300) * np.exp(-t * 18) * 1.2
click = hp(noise(d), 2000) * np.exp(-t * 90) * 0.5
write('impact', reverb(fade(sub + thump + click), 1.2, .25), 0.95)

# pop (bulle)
t = t_(0.18); write('pop', fade(np.sin(2 * np.pi * (260 + 520 * np.exp(-t * 38)) * t) * np.exp(-t * 22), .001, .02), 0.7)
# click
t = t_(0.09); write('click', fade(hp(noise(0.09), 1800) * np.exp(-t * 120) + np.sin(2 * np.pi * 1500 * t) * np.exp(-t * 90) * 0.6, .0005, .01), 0.75)
# tick clavier
t = t_(0.05); write('tick', fade(bp(noise(0.05), 1200, 6000) * np.exp(-t * 160) + np.sin(2 * np.pi * 820 * t) * np.exp(-t * 120) * .5, .0005, .01), 0.5)
# ding + success + notif
write('ding', reverb(bell(1568, 1.6, dec=3.2), 1.0, .22), 0.65)
a = np.pad(bell(1046, 1.2), (0, int(SR * .5))); b = bell(1568, 1.4); y = a.copy(); y[int(SR * .11):int(SR * .11) + len(b)] += b[: len(y) - int(SR * .11)]
write('success', reverb(y, 1.2, .25), 0.7)
a = bell(880, 0.5, dec=6); b = bell(1318, 0.7, dec=5); y = np.zeros(int(SR * 1.0)); y[:len(a)] += a; y[int(SR * .12):int(SR * .12) + len(b)] += b
write('notif', reverb(y, .8, .2), 0.65)
# riser
d = 1.6; t = t_(d); r = hp(noise(d), 800) * (t / d) ** 2.2
tone = np.sin(2 * np.pi * (180 * (1 + 5 * (t / d) ** 2)) * t) * (t / d) ** 2.5 * 0.4
write('riser', fade(r * 0.6 + tone, 0.01, 0.04), 0.7)
# shimmer
d = 1.4; t = t_(d); y = np.zeros_like(t)
for i in range(14):
    f = rng.choice([2093, 2349, 2637, 3136, 3520, 4186]); s = rng.uniform(0, .6)
    e = np.exp(-np.clip(t - s, 0, None) * 7) * (t > s); y += np.sin(2 * np.pi * f * t) * e * rng.uniform(.3, 1)
write('shimmer', reverb(fade(y), 1.0, .35), 0.5)
# shutter / pen
t = t_(0.2); y = np.zeros_like(t)
for off in (0, .055): m = (t >= off) * np.exp(-np.clip(t - off, 0, None) * 70); y += hp(noise(0.2), 900) * m
write('shutter', fade(y), 0.6)
d = 0.9; t = t_(d); pen = bp(noise(d), 2500, 7500) * (0.5 + 0.5 * np.sin(2 * np.pi * 9 * t)) * np.sin(np.pi * t / d) ** 0.7
write('pen', fade(pen), 0.28)
# sting de fin : accord A add9 + impact
d = 4.0; t = t_(d); y = np.zeros_like(t)
for f, a in [(110, 1), (220, .8), (329.6, .6), (440, .7), (554.4, .5), (659.3, .5), (740, .3)]:
    y += a * (np.sin(2 * np.pi * f * t) + .3 * np.sin(2 * np.pi * f * 2 * t)) * np.exp(-t * 0.9) * (1 - np.exp(-t * 60))
y += lp(noise(d), 400) * np.exp(-t * 8) * 1.0 + np.sin(2 * np.pi * 40 * t) * np.exp(-t * 3)
write('sting', reverb(fade(y, .002, .5), 2.2, .35), 0.9)

# ───────── MUSIQUE (durée = vidéo, 108 BPM, La mineur) ─────────
import re, sys
def _duration():
    """Durée de la vidéo : argument CLI (secondes) sinon lue dans src/theme.ts (SCENES + FPS), sinon 50 s."""
    if len(sys.argv) > 1: return float(sys.argv[1])
    try:
        th = open(os.path.join(os.path.dirname(__file__), '..', 'src', 'theme.ts')).read()
        fps = int(re.search(r'FPS = (\d+)', th).group(1))
        ends = [int(a) + int(b) for a, b in re.findall(r'from: (\d+), dur: (\d+)', th)]
        return max(ends) / fps
    except Exception:
        return 50.0
BPM = 108; beat = 60 / BPM; DUR = _duration() + 1.0; n = int(SR * DUR); t = np.arange(n) / SR
bars = int(DUR / (beat * 4)) + 1
chords = [  # Am – F – C – G
    ([57, 60, 64, 69], 45), ([53, 57, 60, 65], 41), ([48, 52, 55, 60], 48), ([55, 59, 62, 67], 43)]
mf = lambda m: 440 * 2 ** ((m - 69) / 12)
mix = np.zeros(n)

def add(x, start):
    i = int(start * SR); e = min(n, i + len(x))
    if i < n: mix[i:e] += x[: e - i]

def pad(notes, d):
    tt = t_(d); y = np.zeros_like(tt)
    for m in notes:
        for det in (-0.07, 0, 0.07):
            f = mf(m) * (1 + det * 0.01 * 3); ph = 2 * np.pi * f * tt
            y += (2 * ((f * tt) % 1) - 1) * .5 + np.sin(ph) * .5
    y = lp(y, 1400)
    return y * np.minimum(1, tt / 0.6) * np.minimum(1, (d - tt) / 0.5) * 0.045

def pluck(m, d=0.4):
    tt = t_(d); f = mf(m)
    return (np.sin(2 * np.pi * f * tt) + .35 * np.sin(2 * np.pi * 2 * f * tt)) * np.exp(-tt * 9) * 0.10

def kick():
    tt = t_(0.35); return np.sin(2 * np.pi * (45 + 90 * np.exp(-tt * 35)) * tt) * np.exp(-tt * 9) * .75

def hat():
    tt = t_(0.06); return hp(noise(0.06), 7000) * np.exp(-tt * 70) * 0.06

def bass(m, d):
    tt = t_(d); f = mf(m - 12)
    return np.sin(2 * np.pi * f * tt) * np.minimum(1, (d - tt) / 0.08) * 0.20

for b in range(bars):
    notes, root = chords[b % 4]; s = b * beat * 4
    add(pad(notes, beat * 4 + .3), s)
    r = b / max(1, bars - 1)                # position relative dans la vidéo (0 → 1)
    energy = 0 if r < 0.08 else (1 if r < 0.22 else 2)
    if 0.68 <= r < 0.78: energy = 0         # respiration avant le final
    if r >= 0.78: energy = 3                # lift final
    if energy >= 1:
        for k in range(8):
            add(pluck(notes[(k * 3) % 4] + (12 if k % 2 else 12)), s + k * beat / 2)
    if energy >= 2:
        for k in range(4): add(kick() if energy >= 2 else 0, s + k * beat)
        for k in range(8): add(hat(), s + k * beat / 2 + beat / 4 * (k % 2 == 0) * 0)
        add(bass(root, beat * 4), s)
    if energy >= 3:
        for k in range(4): add(hat() * 1.4, s + k * beat + beat / 2)
        add(pluck(notes[3] + 24, 0.5) * 1.2, s + beat * 3.5)

mix = reverb(mix, 1.6, .22)[:n]
fi = np.minimum(1, t / 1.2); fo = np.clip((DUR - t) / min(2.5, DUR / 4), 0, 1); mix *= fi * fo
mix = norm(mix, 0.8)
wav = os.path.join(OUT, 'music.wav')
st = np.stack([mix, np.roll(mix, int(SR * .01))], axis=1)
with wave.open(wav, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(st, -1, 1) * 32767).astype('<i2').tobytes())
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-b:a', '192k', os.path.join(OUT, 'music.mp3')], check=True)
os.remove(wav)
print('SFX + musique générés dans', os.path.abspath(OUT))
