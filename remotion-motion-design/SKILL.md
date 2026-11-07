---
name: remotion-motion-design
description: Crée des vidéos motion design de niveau agence avec Remotion (React) — du brief aux assets, storyboard, animations, sound design (SFX + musique), voix off ElevenLabs, sous-titres, contrôle qualité par images et rendu MP4. Utilise ce skill dès que l'utilisateur parle de motion design, vidéo animée, vidéo promo / pub / teaser / explainer / démo produit / présentation animée, animation de logo, kinetic typography, reel / TikTok / short animé, vidéo SaaS, "fais-moi une vidéo avec Remotion", d'effets sonores, de voix off, ou fournit des captures d'écran / logos / photos "pour en faire une vidéo" — même s'il ne prononce pas le mot "Remotion". Couvre aussi la correction, l'amélioration ou l'extension d'un projet Remotion existant (nouvelle scène, version verticale, nouveaux sons, bug de rendu).
---

# Remotion Motion Design — Skill complet

Ce skill capture un workflow **éprouvé de bout en bout** (vidéo SaaS de 50 s, 8 scènes, 15 SFX, musique, voix off, sous-titres) et le généralise à n'importe quel motion design : promo produit, explainer, pub réseaux sociaux, logo sting, data-viz, tutoriel, teaser d'événement.

Le résultat visé : une vidéo qui paraît faite par une agence — pas un diaporama animé. La différence vient de **8 choses** (voir « Les 8 piliers ») et d'une **discipline de contrôle qualité** (voir Phase 7).

## Comment utiliser ce skill

1. Lis ce fichier en entier (workflow + règles).
2. Charge les références **au moment où tu en as besoin** (index en bas). Ne les charge pas toutes d'avance.
3. Pars toujours du template : `bash scripts/init_project.sh <dossier>` — il installe des versions **épinglées qui marchent**, génère l'audio et vérifie le typage. Ne réécris pas l'infrastructure.

Langue : réponds dans la langue de l'utilisateur (par défaut le français). Le code reste en anglais/TypeScript, les commentaires et textes à l'écran dans la langue de la vidéo.

---

## Les 8 piliers (ce qui fait « agence »)

1. **Une idée par scène, un point focal par image.** Si l'œil hésite, la scène est trop chargée.
2. **Mouvement continu et fluide.** Chaque élément entre avec un easing expo-out + décalage (stagger) ; rien n'apparaît d'un coup ; chaque scène a un mouvement de caméra lent (zoom 1 → 1.05). Jamais d'image figée > 0,5 s.
3. **Hiérarchie typographique forte.** Titres 90–150 px en graisse 800, corps ≥ 28 px, un mot-clé en couleur d'accent.
4. **Design system cohérent.** Quelques tokens (couleurs, ombres, rayons) réutilisés partout ; alternance scènes claires / sombres pour le rythme.
5. **Finition « filmée »** : fond animé (blobs), grain léger, vignette, ombres douces, flou de mise au point à l'entrée du texte.
6. **Transitions de scène masquant le cut** (sweep diagonal) avec un whoosh.
7. **Sound design synchronisé à l'image près** : chaque événement visuel (pop, clic, notification, chiffre qui s'affiche) a son son, posé sur la frame exacte. Le son = la moitié de la qualité perçue.
8. **Contrôle qualité par rendu d'images** : on ne livre jamais sans avoir *vu* des frames de chaque scène.

---

## Workflow en 9 phases

Chaque phase a un **livrable** et une **porte de sortie** : ne passe pas à la suivante tant qu'elle n'est pas franchie.

### Phase 0 — Brief (2 min)
Détermine avec l'utilisateur (demande seulement ce qui manque, **une question à la fois maximum**, et avance avec des hypothèses annoncées si la réponse ne vient pas) :
objectif & cible · durée (défaut 45–60 s promo, 15–30 s social) · format (16:9 / 9:16 / 1:1) · assets fournis · voix off oui/non · ton · langue · CTA.
→ Détail : `references/01-brief-storyboard.md`
**Porte** : tu peux résumer la vidéo en une phrase + public + CTA.

### Phase 1 — Analyse des assets
Lance `python3 scripts/analyze_assets.py <zip|dossier>` puis **ouvre les planches contact avec `view`** : comprends le produit, relève les textes exacts, couleurs, police (identifie-la), structure des écrans, états de chargement à éviter.
Règle : des captures < 1500 px de large ne s'utilisent **pas** en plein écran → on **reconstruit l'UI en code** (net en 4K, animable). Seuls logos et photos détourées restent des images.
→ Détail : `references/06-assets.md`
**Porte** : liste écrite de ce qui est *réel* (repris des assets) vs *inventé* (à signaler à l'utilisateur à la livraison).

### Phase 2 — Storyboard + timeline + script voix off
Produis un tableau : scène · début/durée (frames) · message · visuels · animations clés · SFX · phrase VO. Calcule la timeline **en frames** (30 fps) et écris-la dans `theme.ts` (`SCENES`) — **source unique de vérité**.
Règles de durée : ~2,5 mots/s en voix off FR ; chaque phrase doit tenir dans sa scène avec 10 % de marge ; 1 scène = 3 à 9 s.
→ `references/01-brief-storyboard.md`
**Porte** : le storyboard est montré à l'utilisateur en 10 lignes max, puis tu enchaînes (ne bloque pas, sauf si le brief est ambigu).

### Phase 3 — Initialisation du projet
```bash
bash <skill>/scripts/init_project.sh ./mon-projet [font-slug-fontsource]
```
Puis adapte `src/theme.ts` (marque, couleurs, police, `SCENES`), remplace `public/img/logo.*`, `src/script.json`.
→ `references/02-architecture.md`
**Porte** : `npm run typecheck` passe.

### Phase 4 — Construction scène par scène
Une scène = un fichier `src/scenes/X.tsx` + une entrée dans `SCENES` et dans `REGISTRY` (Film.tsx). Utilise les composants de `ui.tsx` (WordReveal, Chip, Counter, Cursor, Tilt3D, Particles, Cam, Bg…) et les recettes de `references/03-animation.md`. **Place les SFX dans la scène** (frames locales) au moment où tu écris l'animation, pas après.
→ `references/03-animation.md`, `references/04-design.md`
**Porte** : après chaque 2–3 scènes, rends des images (Phase 7) — ne construis pas 8 scènes à l'aveugle.

### Phase 5 — Audio
Musique + SFX : `npm run sfx` (synthèse procédurale, durée lue dans `theme.ts`). Voix off : fournis le **tableau de script** à l'utilisateur (voir livraison) et/ou `npm run vo` (ElevenLabs). Ducking automatique de la musique.
→ `references/05-audio.md`
**Porte** : chaque événement visuel notable a un son ; la voix ne dépasse pas sa fenêtre.

### Phase 6 — Sous-titres
Activés par défaut depuis `script.json` (1 ligne, ≤ 90 caractères, bas d'écran, 120 px libres en bas du cadre).

### Phase 7 — Contrôle qualité (OBLIGATOIRE)
```bash
CHROME=/chemin/chromium bash scripts/check_project.sh   # typage + 1 image par scène
node scripts/stills.mjs 60 235 645 …                      # images précises (frames ABSOLUES)
```
Ouvre les images avec `view`, assemble-les en planche (PIL) pour en voir 6–8 d'un coup. Utilise la checklist de `references/07-render-qa.md` (débordements, texte coupé, sous-titres qui masquent, contraste, position du curseur…). **Corrige puis re-rends** : au moins 2 boucles.
**Porte** : toutes les scènes vues, aucun défaut de la checklist.

### Phase 8 — Rendu & livraison
- Machine de l'utilisateur : `npm run render` (MP4 H.264).
- Dans un sandbox mono-cœur le rendu complet est irréaliste (~4,5 s/image) : **ne le lance pas**, livre le projet zippé + images de contrôle + instructions. Dis-le franchement.
- Livre : zip du projet (sans `node_modules`/`out`), README, **tableau du script VO** (voir ci-dessous), liste des éléments inventés à vérifier, et ce qui n'a pas pu être vérifié.

### Livrer la voix off (format exact)
Donne à l'utilisateur un tableau `N° | texte à lire | durée max`, **un fichier audio par phrase**, texte optimisé TTS (nombres en toutes lettres, marque en phonétique : « Alance », « point pro »), puis la procédure : fichiers `01.mp3…` dans `public/audio/vo/` + `manifest.json` = `["01","02",…]` (ou `npm run vo` avec clé ElevenLabs).

---

## Règles techniques Remotion (non négociables)

- **Tout est piloté par la frame** (`useCurrentFrame`). Interdits : `transition`/`animation` CSS, `setTimeout`, `Math.random()` (utilise `rnd(seed)`), `Date.now()`. Sinon le rendu diffère d'une image à l'autre.
- `Img`/`Audio`/`Video` de `remotion` (jamais `<img>`), fichiers via `staticFile()` depuis `public/`. Vidéos : `OffthreadVideo`.
- **Frames locales vs absolues** : dans une `<Sequence from=X>`, `useCurrentFrame()` repart de 0. Les SFX d'une scène se placent en frames **locales** ; les sous-titres/VO (`script.json`) en frames **absolues**. Pour regarder une image précise d'une scène : absolue = `SCENES.x.from + locale`.
- **Polices** chargées avec `delayRender` avant le 1er rendu (déjà dans le template).
- **Ne pas forcer `--concurrency`** au-delà du nb de cœurs (erreur), ne pas le fixer dans `remotion.config.ts`.
- **TypeScript épinglé en 5.6.3** : TS 7 casse le bundler Remotion (`typescript.sys`). Toujours `npx tsc -p tsconfig.json` (un `tsc` nu affiche l'aide si le tsconfig manque).
- Un `spring` avec frame négative doit être clampé (`Math.max(0, f - delay)`) — déjà fait dans `pop()`/`soft()`.
- `lucide-react` pour les icônes : si un nom n'existe pas, `tsc` le dit — corrige, n'invente pas.
- Dimensions pensées en px pour 1920×1080 ; pour le vertical, vérifie chaque scène avec `COMP=FilmVertical`.

## Honnêteté de livraison

Distingue toujours : **vérifié** (vu en image / compilé) · **non vérifié** (animations en mouvement, audio non écouté, rendu complet) · **inventé** (textes, chiffres, noms, logo redessiné). Ne prétends jamais avoir « testé la vidéo » si tu n'as vu que des images fixes. Ne fabrique pas de données qui ressemblent à du réel sans les signaler.

## Environnement sandbox (Claude.ai / conteneurs)

- Pas de Chrome préinstallé ni de téléchargement Chrome Remotion : `npm i @sparticuz/chromium@131` dans un dossier à part, puis `node -e "import('@sparticuz/chromium').then(async m=>console.log(await m.default.executablePath()))"` → binaire `/tmp/chromium`. Utilise-le via `CHROME=/tmp/chromium` (stills) ou `--browser-executable=/tmp/chromium --gl=swangle --concurrency=1` (render).
- Pas de TTS réaliste → ne promets pas de voix off générée ; fournis le script.
- Réseau limité (npm/pip/github OK). Fontsource (npm) fournit les polices Google en woff2 hors-ligne.
- Python : `numpy scipy pillow` + `ffmpeg` requis pour l'audio ; `opencv-python-headless` seulement si besoin.

---

## Index des références (à charger selon la phase)

| Fichier | Quand le lire |
|---|---|
| `references/01-brief-storyboard.md` | Phase 0–2 : questions du brief, structure narrative, tableau de storyboard, règles de script VO, budget de timeline |
| `references/02-architecture.md` | Phase 3–4 : arbo du projet, theme/SCENES, Film/REGISTRY, compositions multiples (vertical), props, VO auto |
| `references/03-animation.md` | Phase 4 : helpers, easing, timings, **toutes les recettes d'animation** avec code |
| `references/04-design.md` | Phase 4 : tokens, typographie, zones de sécurité, reconstruire une UI, traitement photo/logo |
| `references/05-audio.md` | Phase 5 : catalogue SFX, synchro, musique, ducking, loudness, voix off ElevenLabs |
| `references/06-assets.md` | Phase 1 : captures → UI, détourage, logo, polices, pièges d'assets |
| `references/07-render-qa.md` | Phase 7–8 : protocole QA, checklist, commandes de rendu, formats, performance |
| `references/08-pieges.md` | En cas de bug : symptôme → cause → solution (leçons réelles) |
| `references/09-catalogue-videos.md` | Choisir la structure selon le type de vidéo (promo, pub 15 s, explainer, logo sting, data-viz…) |
| `references/10-prompts-formation.md` | Prompts types à donner à Claude Code + progression pédagogique d'exercices |

## Fichiers du skill

- `assets/template/` — projet Remotion générique complet (compile et se rend) : `theme.ts`, `anim.ts`, `ui.tsx`, `Film.tsx`, 3 scènes-patrons, scripts audio/VO/stills.
- `scripts/init_project.sh` — crée le projet. `scripts/analyze_assets.py` — planches contact d'un zip d'images. `scripts/cutout.py` — détourage fond uni. `scripts/check_project.sh` — typage + image par scène.
