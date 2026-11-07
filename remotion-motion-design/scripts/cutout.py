#!/usr/bin/env python3
"""Détourage d'une photo sur fond UNI (clair) → PNG transparent. Pour les cas où on n'a PAS le PNG détouré d'origine.
Usage: python3 cutout.py in.jpg out.png [--bg R,G,B] [--tol 52] [--crop x0,y0,x1,y1] [--scale 3]
- flood-fill depuis les bords (ne supprime PAS le blanc situé à l'intérieur du sujet)
- ne garde que le plus grand composant (supprime ombres/poussières isolées)
- alpha adouci (anti-aliasing), upscale LANCZOS + unsharp léger
⚠ Toujours préférer le PNG détouré d'origine fourni par le client. Vérifier le résultat sur fond coloré.
"""
import sys, argparse
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as ndi

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('dst')
ap.add_argument('--bg', default=None); ap.add_argument('--tol', type=float, default=52)
ap.add_argument('--crop', default=None); ap.add_argument('--scale', type=int, default=3)
a = ap.parse_args()
im = Image.open(a.src).convert('RGB')
if a.crop: im = im.crop(tuple(int(v) for v in a.crop.split(',')))
arr = np.array(im).astype(np.float32)
bg = np.array([float(v) for v in a.bg.split(',')]) if a.bg else np.median(np.concatenate([arr[0], arr[-1], arr[:, 0], arr[:, -1]]), axis=0)
d = np.sqrt(((arr - bg) ** 2).sum(-1))
lab, _ = ndi.label(d < a.tol)
edge = set(lab[0, :]) | set(lab[-1, :]) | set(lab[:, 0]) | set(lab[:, -1]); edge.discard(0)
fg = ~np.isin(lab, list(edge))
l2, n = ndi.label(fg)
if n: fg = l2 == (1 + int(np.argmax(ndi.sum(fg, l2, range(1, n + 1)))))
fg = ndi.binary_fill_holes(fg)
alpha = np.clip((ndi.gaussian_filter(fg.astype(np.float32), 0.9) - 0.3) / 0.55, 0, 1)
out = Image.fromarray(np.dstack([arr, alpha * 255]).astype(np.uint8), 'RGBA')
if a.scale > 1:
    out = out.resize((out.width * a.scale, out.height * a.scale), Image.LANCZOS)
    rgb = out.convert('RGB').filter(ImageFilter.UnsharpMask(radius=2.2, percent=70, threshold=2))
    out = Image.merge('RGBA', (*rgb.split(), out.split()[3]))
out.save(a.dst); print('→', a.dst, out.size)
