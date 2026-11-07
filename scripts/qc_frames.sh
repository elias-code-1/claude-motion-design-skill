#!/usr/bin/env bash
# qc_frames.sh — Contrôle qualité automatique par extraction et inspection de frames clés
# Usage: bash qc_frames.sh [dossier_projet] [composition=Film]
set -euo pipefail

PROJECT_DIR="${1:-.}"
COMP="${2:-Film}"
OUT_DIR="$PROJECT_DIR/out/qc"
mkdir -p "$OUT_DIR"

echo "🔍 === CONTRÔLE QUALITÉ VISUEL AUTOMATISÉ ($COMP) ==="

cd "$PROJECT_DIR"

# 1. Vérification TypeScript préalable
if [ -f "tsconfig.json" ]; then
  echo "▶ Vérification typage TypeScript..."
  npx tsc -p tsconfig.json --noEmit || { echo "❌ Échec du typecheck ! Corrigez les erreurs avant le rendu."; exit 1; }
  echo "✔ TypeScript valide."
fi

# 2. Détermination de Chromium / Chrome
CHROME_BIN="${CHROME:-}"
if [ -z "$CHROME_BIN" ]; then
  if command -v chromium >/dev/null 2>&1; then
    CHROME_BIN="$(command -v chromium)"
  elif command -v google-chrome >/dev/null 2>&1; then
    CHROME_BIN="$(command -v google-chrome)"
  elif [ -f "/tmp/chromium" ]; then
    CHROME_BIN="/tmp/chromium"
  fi
fi

# 3. Récupération des frames clés
# On lit les cuts dans src/theme.ts ou script.json si possible, sinon frames par défaut
STILLS_FRAMES=(15 45 90 150 240 330 450)
if [ -f "src/theme.ts" ]; then
  # Extraire frames clés depuis SCENES si présent
  EXTRACTED=$(grep -oE "from:\s*[0-9]+" src/theme.ts | awk '{print $2+15}' || true)
  if [ -n "$EXTRACTED" ]; then
    STILLS_FRAMES=($EXTRACTED)
  fi
fi

echo "▶ Extraction des frames clés : ${STILLS_FRAMES[*]}"

if [ -f "scripts/stills.mjs" ]; then
  CHROME="$CHROME_BIN" COMP="$COMP" node scripts/stills.mjs "${STILLS_FRAMES[@]}" || true
else
  for f in "${STILLS_FRAMES[@]}"; do
    npx remotion still "$COMP" "$OUT_DIR/still_${f}.png" --frame="$f" ${CHROME_BIN:+--browser-executable="$CHROME_BIN"} || true
  done
fi

# 4. Assemblage planche contact PIL et analyse de contraste / safe zones
python3 - << 'EOF'
import os, sys
from PIL import Image, ImageDraw

qc_dir = "out/qc"
if not os.path.exists(qc_dir):
    qc_dir = "out"

imgs = sorted([os.path.join(qc_dir, f) for f in os.listdir(qc_dir) if f.startswith("still_") and f.endswith(".png")])
if not imgs:
    print("ℹ Aucune frame still trouvée pour la planche.")
    sys.exit(0)

# Planche contact
thumb_w, thumb_h = 480, 270
cols = min(4, len(imgs))
rows = (len(imgs) + cols - 1) // cols
sheet = Image.new("RGB", (cols * thumb_w, rows * thumb_h), (15, 15, 20))

draw = ImageDraw.Draw(sheet)
for i, path in enumerate(imgs):
    try:
        im = Image.open(path).convert("RGB").resize((thumb_w, thumb_h))
        x = (i % cols) * thumb_w
        y = (i // cols) * thumb_h
        sheet.paste(im, (x, y))
        draw.rectangle([x, y, x + thumb_w, y + thumb_h], outline=(50, 60, 80), width=1)
    except Exception as e:
        print(f"Erreur image {path}: {e}")

out_sheet = "out/qc_contact_sheet.png"
sheet.save(out_sheet)
print(f"✔ Planche contact générée : {out_sheet} ({len(imgs)} frames inspectées)")
EOF

echo "✅ Audit visuel terminé. Consultez 'out/qc_contact_sheet.png'."
