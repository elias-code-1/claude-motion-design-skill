# 06 — Assets : analyse, reconstruction, détourage, logo

## Sommaire
1. Analyser ce que l'utilisateur envoie
2. Captures d'écran → UI reconstruite
3. Photos & détourage
4. Logo
5. Polices & couleurs
6. Vidéos, Lottie, 3D
7. Pièges réels

## 1. Analyser

```bash
python3 scripts/analyze_assets.py fichier.zip ./analyse
```
Sort : nombre d'images, tailles, **doublons** (un export de vidéo contient souvent 2× les mêmes frames), fichiers avec alpha, **planches contact** `sheetN.png`. **Ouvre-les avec `view`**, puis zoome (crop + resize ×2) sur : textes exacts, chiffres, noms, couleurs, logo, état des écrans. Les captures d'une vidéo d'écran contiennent souvent la barre du navigateur, un curseur, des états de chargement (spinners) : ne pas les reproduire.

## 2. Captures → UI

Voir `04-design.md §5`. Résumé : **reconstruire en code**, relever textes/couleurs/structure, éviter les éléments tiers (captcha), signaler l'inventé. N'utilise une capture en plein écran que si elle est **≥ 1920 px** et propre.

## 3. Photos & détourage

**Préfère toujours le PNG détouré fourni** (alpha). Vérifie : `Image.open(f).mode`, % de pixels transparents, recadre à la boîte englobante (`getbbox` sur l'alpha), réduis à ≤ 1700 px de large (un PNG 4104 px pèse inutilement).

Si seul un JPG existe (fond uni) : `python3 scripts/cutout.py in.jpg out.png --crop x0,y0,x1,y1`.
- flood-fill depuis les bords (préserve le blanc *dans* le sujet) · plus grand composant seulement (supprime ombres/poussières) · alpha adouci · upscale LANCZOS ×3 + unsharp.
- **Toujours prévisualiser sur fond coloré** (bleu clair) pour voir les halos.
- **Un recadrage de capture embarque des fragments d'UI** (pastilles, ombres, texte) → efface-les en remplissant leur boîte exacte (détecte les pastilles blanches par composants connexes, +4 px de marge).
- Si l'effacement mord dans le sujet, **n'essaie pas de reconstruire** (le miroir donne un motif « kaléidoscope », l'inpainting OpenCV bave en beige) : **demande la photo d'origine**, ou cache la zone avec un élément du design (pastille, carte), ou recadre plus serré.
- Sujet coupé net (casque, tête) : masque en dégradé sur 3–4 % du bord ou cadrage qui laisse le bord hors-champ.

## 4. Logo

- Demande SVG/PNG transparent HD. Un logo redessiné « de mémoire » est une **approximation** : à signaler.
- Version claire pour fonds sombres : recolorer les pixels bleus (`b > r+60 & b > g+20`) en bleu clair (110,168,255) en gardant les autres couleurs (ex. flèche verte).
- Animation : wipe gauche→droite (masque `linear-gradient`) + léger scale ; un SVG simple peut utiliser `pathLength`/`strokeDasharray` pour se « dessiner ».
- Wordmark = texte en police de marque si le logo n'inclut pas le nom (« a » sombre + « Lance » coloré).

## 5. Polices & couleurs

- Police : identifie visuellement → Fontsource (`@fontsource/<slug>`) ; sinon demande les fichiers `.woff2`.
- Couleurs : échantillonne les pixels (boutons, logo, badges) : `Image.getpixel`. Conserve la valeur exacte du bleu de marque ; dérive `deep/light/soft` par ±15 % de luminosité.

## 6. Vidéos, Lottie, 3D

- Clips : `<OffthreadVideo src={staticFile('clip.mp4')} />` (pas `<video>`), `startFrom`, `playbackRate`, `muted`.
- Lottie : `@remotion/lottie` + JSON (animations d'icônes, check, confettis).
- 3D : `@remotion/three` (three.js) pour objets/produits — coûteux en rendu.
- Illustrations vectorielles : SVG inline animables (`pathLength`).

## 7. Pièges réels

| Symptôme | Cause | Solution |
|---|---|---|
| Pastilles « fantômes » autour du sujet | recadrage d'une capture contenant l'UI | effacer les boîtes, ou photo d'origine |
| Rectangle visible derrière la photo | fond de capture ≠ fond de scène | détourer (alpha) ; jamais `multiply` sur un rectangle |
| Halo clair autour des cheveux | seuil trop bas / fond clair | seuil 52, alpha adouci, fond de scène clair |
| Logo illisible sur fond sombre | bleu foncé | version claire |
| Captures floues | trop petites (1092 px) | reconstruire en code |
