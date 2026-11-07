#!/usr/bin/env bash
# Usage: bash init_project.sh <dossier-cible> [font-slug-fontsource=plus-jakarta-sans]
# Crée un projet Remotion prêt à l'emploi depuis le template du skill, installe tout, génère l'audio et vérifie le typage.
set -euo pipefail
DEST="${1:?Usage: init_project.sh <dossier> [font-slug]}"
FONT_SLUG="${2:-plus-jakarta-sans}"
HERE="$(cd "$(dirname "$0")" && pwd)"
TEMPLATE="$HERE/../assets/template"

mkdir -p "$DEST"
cp -r "$TEMPLATE/." "$DEST/"
cd "$DEST"
mkdir -p public/fonts public/audio/vo out

echo "▶ Installation des dépendances (versions épinglées compatibles)…"
npm i --silent react@18.3.1 react-dom@18.3.1 remotion@4.0.250 @remotion/cli@4.0.250 @remotion/bundler@4.0.250 @remotion/renderer@4.0.250 \
  @remotion/transitions@4.0.250 @remotion/media-utils@4.0.250 @remotion/shapes@4.0.250 lucide-react "@fontsource/$FONT_SLUG" @types/react@18
npm i --silent --save-exact typescript@5.6.3   # TS 7 casse le bundler Remotion : rester en 5.x

echo "▶ Police : $FONT_SLUG"
for w in 400 500 600 700 800; do
  f="node_modules/@fontsource/$FONT_SLUG/files/$FONT_SLUG-latin-$w-normal.woff2"
  [ -f "$f" ] && cp "$f" public/fonts/ || echo "  (graisse $w absente pour cette police)"
done
sed -i "s/export const FONT_SLUG = '.*';/export const FONT_SLUG = '$FONT_SLUG';/" src/theme.ts

echo "▶ Génération des SFX + musique…"
python3 scripts/gen_audio.py || echo "⚠ gen_audio.py a échoué (python3/numpy/scipy/ffmpeg requis) — lance 'npm run sfx' après les avoir installés"

echo "▶ Vérification du typage…"
npx tsc -p tsconfig.json --noEmit && echo "✔ Projet prêt dans $DEST  →  cd $DEST && npm run dev"
