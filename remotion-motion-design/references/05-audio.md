# 05 — Sound design, musique, voix off

## Sommaire
1. Principes
2. Catalogue des SFX fournis
3. Règles de synchronisation
4. Niveaux & mixage
5. Musique (synthétisée ou sous licence)
6. Ducking
7. Voix off (ElevenLabs & alternatives)
8. Loudness & vérifications
9. Ajouter un SFX

## 1. Principes

Une vidéo muette-animée paraît « amateur » ; la même vidéo avec des SFX précis paraît « agence ». Trois couches : **voix** (au premier plan) > **SFX** (ponctuation) > **musique** (tapis, basse). Chaque son sert un événement visuel ; pas de son décoratif sans image.

## 2. Catalogue (`npm run sfx` → `public/audio/sfx/*.wav`, 100 % synthétisés, libres de droits)

| Nom | Quand l'utiliser | Volume typique |
|---|---|---|
| `whoosh` | transition de scène (auto dans `Sweeps`), entrée de panneau | 0.35–0.7 |
| `whoosh_big` | transition vers l'outro, gros mouvement | 0.45–0.85 |
| `whoosh_rev` | aspiration / disparition (chaos qui disparaît) | 0.55 |
| `impact` | moment fort : logo qui se verrouille, titre qui claque | 0.65–0.9 |
| `riser` | montée avant un impact (intro, outro) | 0.45–0.55 |
| `pop` | apparition d'une pastille / badge / carte | 0.45–0.7 |
| `click` | clic de souris (même frame que le ripple) | 0.75–0.85 |
| `tick` | frappe clavier, compteur qui défile (×N) | 0.22–0.35 |
| `notif` | notification / message reçu | 0.4–0.8 |
| `success` | validation, tampon, envoi réussi | 0.45–0.65 |
| `ding` | résultat final d'un compteur, bouton | 0.35–0.75 |
| `shimmer` | brillance, étincelles | 0.35–0.5 |
| `shutter` | photo prise | 0.7 |
| `pen` | signature / tracé | 0.8 |
| `sting` | accord final de l'outro | 0.9 |

## 3. Synchronisation (la règle d'or)

- **Un son à la frame de l'événement visuel**, jamais « à peu près » : `<Sfx at={128} name="click"/>` = même frame que `clicks={[128]}`.
- Sons à **montée** (`whoosh`, `riser`) : démarre-les **3–8 frames avant** le pic visuel pour que le pic tombe sur le son.
- `impact` : pile sur la frame où le titre/logo atteint sa taille finale.
- Série de `tick` (frappe, compteur) : un `Sfx` toutes les 3 frames (≈ 10 par seconde) ; baisse le volume (0.25).
- Pas deux sons forts sur la même frame ; décale de 2–4 frames (`click` puis `ding`).
- **Frames locales** dans une scène (le `Sequence` de scène décale tout seul).

## 4. Niveaux & mixage

- Musique : volume 0.5 sans VO, 0.38 avec VO, **0.15 pendant la voix** (ducking), fade-in 20 f, fade-out 50 f.
- Voix : 1.0. SFX : voir tableau ; si la VO parle, baisse les SFX de 20–30 % ou garde-les discrets.
- Évite les fréquences qui se battent avec la voix (200–4000 Hz) : musique sans lead au-dessus de la voix.

## 5. Musique

- **Synthétisée** (`gen_audio.py`) : pad + pluck en arpège + kick + hats + basse, La mineur 108 BPM ; **durée = durée de la vidéo + 1 s**, structure relative (intro pad → montée → plein → respiration → lift final). Idéal pour avoir zéro souci de droits ; son « corporate discret ». Suffisant en maquette/pitch.
- **Production finale** : propose à l'utilisateur une musique sous licence (Epidemic Sound, Artlist, Musicbed, YouTube Audio Library, Pixabay — **vérifier la licence commerciale**), à déposer en `public/audio/music.mp3` (même nom → rien à changer). Cherche « corporate / tech / upbeat, 100–120 BPM, sans voix ».
- Ne jamais intégrer de musique commerciale connue sans licence.

## 6. Ducking (déjà dans Film.tsx)

`volume={(f)=>…}` : pour chaque phrase `l`, `k = interpolate(f,[l.from-10,l.from,l.to,l.to+14],[0,1,1,0])`, `v = min(v, base-(base-duck)*k)`. Descente 10 f avant, remontée 14 f après.

## 7. Voix off

### Procédure standard (fournir à l'utilisateur)
1. Tableau `N° | texte | durée max` (depuis `script.json`, texte « optimisé TTS »).
2. Dans ElevenLabs : **modèle Multilingual v2**, voix française, **un fichier par phrase**. Réglages indicatifs : stability 0.45, similarity 0.8, style 0.25, speaker boost on. Si une phrase dépasse sa durée : vitesse 1.1 ou raccourcir.
3. Fichiers `01.mp3…` → `public/audio/vo/` + `manifest.json` = `["01","02",…]`.
4. `npm run render`. (La VO est détectée toute seule.)

### Automatisé
`ELEVENLABS_API_KEY=… VOICE_ID=… npm run vo` : appelle l'API pour chaque ligne, écrit les mp3 + manifest, **mesure la durée (ffprobe) et signale** celles qui dépassent.

### Règles
- Ne dis jamais que tu as « généré la voix » si tu ne l'as pas fait.
- Phrase trop longue → raccourcis le texte plutôt que d'accélérer la voix à l'extrême.
- La voix commence ~0,3–0,5 s après le début de la scène (après le sweep) : mets `from` en conséquence.
- Voix humaine enregistrée : mêmes noms de fichiers, normalise à −16 LUFS, coupe les silences de tête.
- Plusieurs langues : un dossier `vo/fr`, `vo/en` + une prop `lang` (extension simple).

## 8. Loudness & vérifications

- Cible mix final : **−14 LUFS** (réseaux), **−16 LUFS** (YouTube/web), crête ≤ −1 dBTP.
- Mesurer : `ffmpeg -i video.mp4 -af loudnorm=print_format=summary -f null -`
- Normaliser si besoin : `ffmpeg -i in.mp4 -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:v copy out.mp4`
- Vérifier la musique : `ffmpeg -i music.mp3 -af volumedetect -f null -` (mean ≈ −17 dB, max ≈ −2 dB OK).
- **Tu ne peux pas écouter** : dis-le (« audio généré et mesuré, non écouté ») et invite à vérifier.

## 9. Ajouter un SFX

Dans `scripts/gen_audio.py` : écrire une fonction qui crée un `np.ndarray` mono (sinus + enveloppe exponentielle, bruit filtré `bp/lp/hp`, `reverb()`), puis `write('nom', signal, 0.7)`. Utilise-le avec `<Sfx name="nom"/>`. Recettes : *bulle* = sinus 260→780 Hz en chute rapide ; *clic* = bruit passe-haut 8 ms + sinus 1.5 kHz ; *cloche* = partiels inharmoniques (1, 2.01, 3.02, 4.2, 5.4) à décroissance exponentielle ; *whoosh* = bruit filtré dont la fréquence centrale glisse (balayage) × enveloppe `sin²`.
