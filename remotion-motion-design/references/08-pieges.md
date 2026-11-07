# 08 — Pièges & dépannage (leçons réelles)

Format : **symptôme → cause → solution**.

## Environnement / installation
- **`Remotion needs typescript.sys` / bundle qui plante** → TypeScript 7 (réécrit en natif) n'expose plus l'API JS → `npm i --save-exact typescript@5.6.3`.
- **`tsc` affiche l'aide et ne vérifie rien** → pas de `tsconfig.json` → toujours `npx tsc -p tsconfig.json --noEmit` ; vérifie qu'il existe (`ls`).
- **Un fichier n'a pas été créé, sans erreur visible** → dans une chaîne `a && b && cat > fichier <<EOF`, si `b` échoue, tout le reste est sauté. Sépare les commandes critiques, ou relis `ls` après. Le shell du sandbox est `sh` : **pas de `{a,b,c}`** (brace expansion) → boucle `for`.
- **`Maximum for --concurrency is N`** → on a forcé une concurrence > nb de cœurs (souvent `Config.setConcurrency(4)` dans `remotion.config.ts`) → supprimer, laisser auto.
- **Aucun Chrome** → voir `07-render-qa.md §6`.
- **`Could not find composition with ID …`** → un script a un ID codé en dur → `COMP=Film` (stills.mjs le gère).
- **404 `audio/vo/manifest.json` dans les logs** → normal sans VO.
- **pip/npm lent ou bloqué** → réseau restreint ; installer seulement le nécessaire.

## Rendu visuel
- **Police par défaut qui clignote** → police non chargée → `delayRender` (fonts.ts) ; noms de fichiers woff2 corrects.
- **Texte qui déborde du cadre** → taille trop grande → estimer largeur ≈ n × 0,52 × taille ; réduire ; contrôler par image.
- **Prix qui sort de sa carte** → réduire la taille + padding + `whiteSpace:'nowrap'` + largeur de carte.
- **Contenu d'un panneau coupé en bas** → somme des hauteurs > hauteur du panneau → resserrer marges/hauteurs, ou agrandir le panneau.
- **Item de sidebar sur 2 lignes** (« Se déconnecter ») → largeur de sidebar + `whiteSpace:'nowrap'` + police 22.
- **Sous-titres qui masquent le contenu** → laisser 120 px libres en bas ; sous-titres sur 1 ligne (≤ 90 caractères) ; remonter les blocs.
- **Rectangle gris étrange sur un reflet** → `mixBlendMode:'overlay'` sur un élément étroit → utiliser un dégradé blanc translucide + léger blur.
- **Conflit transform/translate** → utiliser la propriété CSS `translate` séparée pour le déplacement et `transform` pour le skew/scale.
- **Hat/tête coupée net en haut** (image source rognée) → masque dégradé sur 3–4 % du haut, ou cadrage.
- **Lucide : icône introuvable** → `tsc` l'indique → choisir un nom existant (ne pas deviner).
- **`Img` sans effet / image absente** → utiliser `staticFile('img/x.png')` depuis `public/`.

## Animation
- **Rendu différent à chaque exécution** → `Math.random`/horloge/CSS transition → `rnd(seed)`, tout dérivé de `f`.
- **Élément qui apparaît pendant le sweep (invisible)** → animations démarrées à la frame locale < 8 → démarrer après 8.
- **SFX décalé** → mélange frames locales/absolues ; Sfx dans la scène = local ; `script.json` = absolu.
- **Curseur qui rate sa cible** → coordonnées supposées → rendre une image au moment du clic et ajuster.
- **`spring` instable avant son départ** → clamp `Math.max(0, f-delay)`.
- **Ligne qui s'insère écrase les autres** → les autres doivent *descendre* de `rowHeight` (interpolation `inOut`).
- **Compteur qui saute** → arrondir `Math.round(to * p(...))` et formater `toLocaleString('fr-FR')` (remplacer l'espace insécable).

## Assets
- **Pastilles fantômes autour d'un sujet détouré** → recadrage incluant des fragments d'UI → effacer par boîtes exactes ; sinon demander l'original.
- **Reconstruction de zone manquante moche (miroir/inpainting)** → ne pas insister ; demander le fichier source ou masquer avec un élément de design.
- **Logo sombre sur fond sombre** → version claire.
- **Captures floues** → reconstruire en code.

## Audio
- **VO trop longue** → raccourcir le texte (pas accélérer à l'extrême) ; `npm run vo` signale les dépassements.
- **Musique trop forte avec la voix** → ducking actif ? `voIds` rempli ? (manifest présent).
- **Musique plus courte/longue que la vidéo** → `npm run sfx` relit `theme.ts` (durée + 1 s) ; sinon `python3 scripts/gen_audio.py <secondes>`.
- **`reverb` erreur de broadcast** → longueurs de tableaux différentes → `np.pad(x,(0,len(y)-len(x)))`.
- **Rien d'audible dans le sandbox** → normal : on ne peut pas écouter ; mesurer (`volumedetect`).

## Honnêteté
- **Données inventées** (noms, montants, références) → les lister explicitement à l'utilisateur.
- **Rendu complet non réalisé** → l'écrire, ne pas laisser croire que la vidéo a été vue en mouvement.
