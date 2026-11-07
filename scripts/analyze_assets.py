#!/usr/bin/env python3
"""Analyse un dossier ou un .zip d'images (captures d'écran, frames vidéo, logos…).
Usage: python3 analyze_assets.py <zip|dossier> [dossier_sortie=./assets_analysis]
Produit : liste des tailles, doublons (md5), transparence, et des planches contact numérotées
(sheet0.png, sheet1.png…) à OUVRIR avec l'outil `view` pour comprendre le produit avant de designer.
"""
import sys, os, glob, hashlib, zipfile, collections
from PIL import Image, ImageDraw

src = sys.argv[1]
out = sys.argv[2] if len(sys.argv) > 2 else 'assets_analysis'
os.makedirs(out, exist_ok=True)
folder = src
if src.lower().endswith('.zip'):
    folder = os.path.join(out, 'raw')
    with zipfile.ZipFile(src) as z: z.extractall(folder)
exts = ('*.png', '*.jpg', '*.jpeg', '*.webp')
files = sorted(f for e in exts for f in glob.glob(os.path.join(folder, '**', e), recursive=True))
print(f'{len(files)} images trouvées')
sizes, seen, uniq = collections.Counter(), {}, []
for f in files:
    im = Image.open(f); sizes[im.size] += 1
    d = hashlib.md5(open(f, 'rb').read()).hexdigest()
    if d not in seen: seen[d] = f; uniq.append(f)
    a = im.mode in ('RGBA', 'LA') or 'transparency' in im.info
    if a: print(f'  [alpha] {os.path.basename(f)} {im.size}')
print('Tailles:', dict(sizes))
print(f'Uniques: {len(uniq)} / {len(files)}  (les doublons sont des frames identiques)')
print('⚠ Si <1500px de large : ne PAS utiliser en plein écran, reconstruire l\'UI en code.' if sizes and max(s[0] for s in sizes) < 1500 else '')
tw, th, cols = 364, 205, 3
for k in range(0, len(uniq), 18):
    chunk = uniq[k:k + 18]; rows = (len(chunk) + cols - 1) // cols
    S = Image.new('RGB', (cols * tw, rows * th), 'white')
    for i, f in enumerate(chunk):
        im = Image.open(f).convert('RGB'); im.thumbnail((tw, th))
        d = ImageDraw.Draw(im); d.rectangle((0, 0, 60, 14), fill='black'); d.text((2, 2), os.path.basename(f)[-12:-4], fill='white')
        S.paste(im, ((i % cols) * tw, (i // cols) * th))
    S.save(os.path.join(out, f'sheet{k // 18}.png'))
print('Planches contact →', out)
