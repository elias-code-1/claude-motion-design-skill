# 07 — Contrôle qualité, rendu, formats

## Sommaire
1. Protocole de QA par images
2. Checklist de contrôle
3. Commandes de rendu
4. Formats & plateformes
5. Performance
6. Chromium en sandbox
7. Livraison

## 1. Protocole de QA

1. `npm run typecheck`.
2. **Choisis les frames** : milieu de chaque scène + chaque moment clé (clic, notification, compteur fini, titre final). Rappel : absolue = `SCENES.x.from + locale`.
3. `CHROME=… node scripts/stills.mjs 60 235 645 …` (un seul bundle, N images → `out/still_N.png`). Variante : `COMP=FilmVertical`.
4. Assemble en **planche** (PIL, 2 colonnes, 960×540 par vignette) et ouvre avec `view` ; zoome (crop) sur les détails douteux.
5. Corrige → re-rends ; **minimum 2 boucles** ; après chaque correction, re-vérifie la scène touchée *et* celles qui partagent le composant (AppShell…).
6. Dernière passe : toutes les scènes sur une planche.

```python
from PIL import Image
fs=['still_60','still_235','still_645','still_850']
S=Image.new('RGB',(960*2,540*((len(fs)+1)//2)))
for i,f in enumerate(fs): S.paste(Image.open(f'out/{f}.png').convert('RGB').resize((960,540)),((i%2)*960,(i//2)*540))
S.save('out/sheet.png')
```

## 2. Checklist

- [ ] Texte coupé / débordant (titres, prix dans les cartes, labels de sidebar qui passent à la ligne)
- [ ] Contenu masqué par les sous-titres (120 px bas) · sous-titres sur 1 ligne
- [ ] Contraste (texte clair sur fond clair ?) · logo lisible
- [ ] Curseur sur la bonne cible au moment du clic · le clic correspond au SFX
- [ ] États intermédiaires plausibles (liste qui s'insère, chiffres qui comptent)
- [ ] Éléments qui se chevauchent par erreur · débordement hors cadre involontaire
- [ ] Photo/logo nets, sans halo ni fragments · fond animé présent
- [ ] Version verticale : zones de sécurité, texte lisible
- [ ] Coupure entre scènes : le sweep couvre bien le cut (cut à la frame centrale)
- [ ] Rien d'inventé présenté comme réel

**Ce que les images fixes ne montrent pas** : fluidité, timing, audio. Dis-le dans la livraison.

## 3. Commandes de rendu

```bash
npm run dev                                            # Remotion Studio (prévisualisation, props)
npx remotion render Film out/video.mp4 --codec=h264 --crf=16   # MP4 qualité (crf 16–18)
npx remotion render FilmVertical out/vertical.mp4
npx remotion render Film out/preview.mp4 --scale=0.5 --crf=28  # aperçu rapide
npx remotion render Film out/clip.mp4 --frames=0-149           # extrait
npx remotion render Film out/video.mov --codec=prores --prores-profile=4444  # montage pro / alpha
npx remotion render Film out/video.webm --codec=vp9            # web léger (alpha possible)
npx remotion render Film out/anim.gif --every-nth-frame=2 --scale=0.5
npx remotion still Film out/poster.png --frame=60              # miniature
```
Par défaut Remotion télécharge son Chrome au 1er rendu. Pas de `--concurrency` forcé.

## 4. Formats

| Usage | Dimensions | Remarques |
|---|---|---|
| YouTube / web / LinkedIn | 1920×1080 (16:9) | −16 LUFS |
| Reels / TikTok / Shorts | 1080×1920 (9:16) | zones de sécurité ; ≤ 60 s ; −14 LUFS |
| Carré (feed) | 1080×1080 | `Composition` dédiée |
| 4K | 3840×2160 ou `--scale=2` | rendu 4× plus lent |
| 30 vs 60 fps | 30 (défaut) | 60 si beaucoup de texte qui défile |

## 5. Performance

- Machine normale : ~0,1–0,5 s/image (50 s ≈ quelques minutes). `--concurrency` auto. GPU : `--gl=angle`.
- Réduis les `blur` larges, `backdrop-filter`, images > 2000 px, SVG filtres lourds.
- Itère avec `--scale=0.5` ou des stills.
- Gros projets : Remotion Lambda (cloud).

## 6. Chromium en sandbox

```bash
mkdir chr && cd chr && npm init -y && npm i @sparticuz/chromium@131
node -e "import('@sparticuz/chromium').then(async m=>console.log(await m.default.executablePath()))"   # → /tmp/chromium
# stills :  CHROME=/tmp/chromium node scripts/stills.mjs 60 120
# render :  npx remotion render … --browser-executable=/tmp/chromium --gl=swangle --concurrency=1
```
Mesure : ~4,5 s/image sur 1 cœur → 1500 images ≈ 2 h : **ne rends pas la vidéo complète dans un sandbox**.

## 7. Livraison

- Zip du projet : exclure `node_modules/`, `out/`. Copier dans le dossier de sortie, puis `present_files`.
- Inclure : README (installation, `dev`, `render`, voix off), `script.json`, tableau VO.
- Message final : ce qui est fait · ce qui est **vérifié** · ce qui ne l'est **pas** · ce qui est **inventé** · les prochaines étapes pour l'utilisateur (3 commandes).
