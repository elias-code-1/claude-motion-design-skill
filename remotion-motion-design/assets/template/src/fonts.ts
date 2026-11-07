import {continueRender, delayRender, staticFile} from 'remotion';
import {FONT_SLUG, FONT_WEIGHTS} from './theme';

// Charge la police AVANT le premier rendu (sinon flash de police par défaut dans la vidéo).
const handle = delayRender('Chargement de la police');
Promise.all(
  FONT_WEIGHTS.map((w) => {
    const face = new FontFace('Brand', `url(${staticFile(`fonts/${FONT_SLUG}-latin-${w}-normal.woff2`)})`, {weight: String(w)});
    return face.load().then(() => (document.fonts as unknown as {add: (f: FontFace) => void}).add(face));
  })
)
  .then(() => continueRender(handle))
  .catch((e) => {
    console.error(e);
    continueRender(handle);
  });
