#!/usr/bin/env bash
# render.sh — Script de rendu vidéo complet Remotion avec gestion multi-format et normalisation audio
# Usage: bash render.sh [Film|FilmVertical|FilmSquare] [out/video.mp4] [crf=16]
set -euo pipefail

COMP="${1:-Film}"
OUT_FILE="${2:-out/final_${COMP}.mp4}"
CRF="${3:-16}"

mkdir -p "$(dirname "$OUT_FILE")"

echo "🎬 === RENDU MOTION DESIGN REMOTION ==="
echo "   Composition : $COMP"
echo "   Sortie      : $OUT_FILE"
echo "   CRF         : $CRF (qualité optimale)"

# Vérifier typage
if [ -f "tsconfig.json" ]; then
  echo "▶ Validation typage TypeScript..."
  npx tsc -p tsconfig.json --noEmit
fi

# Détecter Chrome
CHROME_FLAG=""
if [ -n "${CHROME:-}" ]; then
  CHROME_FLAG="--browser-executable=$CHROME"
elif command -v chromium >/dev/null 2>&1; then
  CHROME_FLAG="--browser-executable=$(command -v chromium)"
elif command -v google-chrome >/dev/null 2>&1; then
  CHROME_FLAG="--browser-executable=$(command -v google-chrome)"
elif [ -f "/tmp/chromium" ]; then
  CHROME_FLAG="--browser-executable=/tmp/chromium"
fi

echo "▶ Démarrage du rendu Remotion..."
npx remotion render "$COMP" "$OUT_FILE" \
  --codec=h264 \
  --crf="$CRF" \
  --audio-codec=aac \
  $CHROME_FLAG \
  --gl=swangle

echo "▶ Vérification et normalisation audio (cible -16 LUFS pour le web)..."
if command -v ffmpeg >/dev/null 2>&1 && [ -f "$OUT_FILE" ]; then
  NORM_OUT="${OUT_FILE%.mp4}_normalized.mp4"
  ffmpeg -y -i "$OUT_FILE" -af "loudnorm=I=-16:TP=-1.5:LRA=11" -c:v copy -c:a aac -b:a 192k "$NORM_OUT" 2>/dev/null && {
    mv "$NORM_OUT" "$OUT_FILE"
    echo "✔ Audio normalisé avec succès (-16 LUFS)."
  } || echo "ℹ Rendu conservé sans normalisation supplémentaire."
fi

DUR=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$OUT_FILE" 2>/dev/null || echo "inconnue")
SIZE=$(du -h "$OUT_FILE" | cut -f1)
echo "✅ Export réussi : $OUT_FILE (Taille: $SIZE, Durée: ${DUR}s)"
