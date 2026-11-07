#!/usr/bin/env bash
# Vérifie un projet Remotion : typage + 1 image de test par scène (milieu de chaque scène).
# Usage: bash check_project.sh [CHROME=/chemin/chromium]
set -e
npx tsc -p tsconfig.json --noEmit && echo "✔ typage OK"
FR=$(node -e "
const t=require('fs').readFileSync('src/theme.ts','utf8');
const m=[...t.matchAll(/from: (\d+), dur: (\d+)/g)].map(x=>Math.round(+x[1]+ +x[2]/2));
console.log(m.join(' '))")
echo "Frames de contrôle (milieu de chaque scène): $FR"
node scripts/stills.mjs $FR
echo "✔ Images dans out/still_*.png — ouvre-les avec l'outil view (assemble-les en planche si besoin)."
