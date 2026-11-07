// Rend des images de contrôle sans rendre toute la vidéo (1 bundle, N images).
// Usage:  node scripts/stills.mjs 30 120 220            → composition "Film"
//         COMP=FilmVertical node scripts/stills.mjs 60   → autre composition
//         CHROME=/chemin/chromium node scripts/stills.mjs …  (si Chrome auto indisponible)
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';
const frames = process.argv.slice(2).map(Number);
const id = process.env.COMP || 'Film';
const browserExecutable = process.env.CHROME || undefined;
fs.mkdirSync('out', {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id, browserExecutable});
for (const frame of frames) {
  const output = `out/still_${frame}.png`;
  await renderStill({composition, serveUrl, frame, output, browserExecutable, chromiumOptions: {gl: 'swangle'}, imageFormat: 'png'});
  console.log('ok', output);
}
