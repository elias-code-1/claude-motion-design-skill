---
name: remotion-motion-design
description: Crée des vidéos motion design de niveau agence avec Remotion (React) — du brief aux assets, sélection de style, storyboard, animations fluides, sound design (SFX + musique), voix off ElevenLabs synchronisée mot-par-mot, sous-titres, contrôle qualité par images et rendu MP4 multi-format. Utilise ce skill dès que l'utilisateur parle de motion design, vidéo animée, promo SaaS, teaser, explainer, reels/TikTok/shorts, animation de logo, kinetic typography ou voix off.
---

# Remotion Motion Design — Guide Opérationnel v2

Ce skill formalise un workflow de production vidéo de qualité agence éprouvé sur le terrain. Il s'appuie sur une bibliothèque de styles modulaires inspirés de références réelles, un pipeline voix off ElevenLabs synchronisé à la frame et un protocole strict de contrôle qualité visuel.

---

## 🏛️ Les 8 Piliers de la Qualité Agence

1. **Une idée par scène, un point focal par écran** : pas de surcharge visuelle ; l'œil sait immédiatement où regarder.
2. **Mouvement continu et fluide** : caméra en travelling lent (`scale 1.00 → 1.05`), entrées en easing expo-out, décalages (stagger). Aucune image figée > 0,5 s.
3. **Hiérarchie typographique forte** : titres percutants (80–140 px), corps aéré (≥ 28 px), mot-clé d'accentuation en couleur de marque.
4. **Design System cohérent par tokens** : palette contrastée (règle 60/30/10), ombres diffuses, rayons harmonisés et tokens importables.
5. **Finition « filmée »** : fond animé (blobs organiques), grain léger imperceptible, micro-vignette, flou de mise au point à l'apparition du texte.
6. **Transitions au cut masqué** : balayages diagonaux (sweeps) ou masques synchronisés avec whoosh sonore.
7. **Sound design frame-exact** : chaque événement visuel (clic, notification, compteur, verrouillage) possède son son placé à la frame exacte.
8. **Contrôle qualité automatisé par images** : validation obligatoire par extraction de frames et planches contact avant toute livraison.

---

## 🧭 Protocole de Choix de Style (Phase 0)

À chaque nouvelle demande de vidéo, l'agent exécute rigoureusement les étapes suivantes :

1. **Lecture de l'index des styles** : consulter `styles/INDEX.md`.
2. **Brief cadré en 4 questions maximum** (regroupées en une seule intervention) :
   - *Objectif & Message clé* : que vend-on / explique-t-on ?
   - *Cible & Plateforme* : B2B / réseaux sociaux / grand public ?
   - *Format & Durée* : 16:9 (web, YouTube), 9:16 (TikTok, Reels, Shorts), 1:1 ? Durée visée ?
   - *Narration & Audio* : Voix off souhaitée (oui/non), musique seule ?
3. **Recommandation de 2 à 4 styles classés par pertinence** :
   - Proposer les styles avec une justification claire d'une ligne pour chacun.
   - Toujours inclure l'option « *Autre / Je choisis dans la liste complète* » ou la possibilité de répondre « **auto** ».
4. **Validation** :
   - Attendre le retour de l'utilisateur ou appliquer le style n°1 si la commande « auto » est reçue.
   - Confirmer le style retenu et les tokens associés avant de démarrer la production.

---

## 🔄 Workflow Complet de Production

```
Brief & Choix Style ➔ Storyboard & Script VO ➔ Synthèse Audio & Sync ➔ Composition Remotion (Tokens) ➔ Contrôle Qualité ➔ Rendu & Livraison
```

### Étape 1 : Storyboard & Découpage Narrative
- Produire un tableau : `Scène # | Début/Durée (frames) | Message | Visuels | Animations | SFX | Phrase VO`.
- Règle de narration : 1 scène = 1 idée = 1 phrase de voix off = 3 à 8 secondes.
- Cadence voix off : ~2,5 mots par seconde (15 caractères/seconde).

### Étape 2 : Voix Off & Alignement Temporel (ElevenLabs)
- Écrire le texte découpé dans `script-vo.json` (nombres en toutes lettres, acronymes phonétiques).
- Exécuter la synthèse vocale avec gestion de cache et alignement mot-par-mot :
  ```bash
  node scripts/voiceover.mjs --script script-vo.json --output voice/
  ```
  *(En cas d'absence de clé dans `.env`, utiliser le mode `--dry-run`).*
- Calculer la timeline exacte et générer les sous-titres :
  ```bash
  node scripts/sync_scenes.mjs --voice voice/ --fps 30 --breath 0.3 --output timeline.json --captions captions.json
  ```
- Les durées calculées dans `timeline.json` sont directement injectées dans `src/theme.ts` (`SCENES`).

### Étape 3 : Initialisation & Application des Tokens
- Initialiser le projet avec versions épinglées stables :
  ```bash
  bash scripts/init_project.sh ./mon-projet
  ```
- Importer les tokens du style choisi (`styles/<style-id>/tokens.ts`) dans `src/theme.ts`.

### Étape 4 : Développement Scène par Scène
- Une scène = un fichier `src/scenes/X.tsx` enregistré dans le registre `Film.tsx`.
- Utiliser les composants réutilisables de `src/ui.tsx` (`Cam`, `WordReveal`, `Chip`, `Counter`, `Cursor`, `Tilt3D`, `Sweeps`, `Sfx`).
- Placer les SFX locaux sur la frame exacte de chaque interaction.

### Étape 5 : Contrôle Qualité Automatisé (QA)
- Exécuter la routine de validation visuelle :
  ```bash
  bash scripts/qc_frames.sh ./mon-projet Film
  ```
- Vérifier la planche contact générée (`out/qc_contact_sheet.png`) selon la checklist de `references/qc-checklist.md` :
  - Débordements de texte ou césures inattendues.
  - Respect scrupuleux des safe zones (120 px bas en 16:9, 250 px haut / 380 px bas en 9:16).
  - Contraste et lisibilité de la marque.

### Étape 6 : Rendu & Livraison
- Lancer le rendu haute fidélité avec normalisation audio automatique :
  ```bash
  bash scripts/render.sh Film out/video.mp4 16
  ```
- Pour la déclinaison verticale 9:16 :
  ```bash
  bash scripts/render.sh FilmVertical out/vertical.mp4 16
  ```

---

## 🛠️ Gestion de la Bibliothèque de Styles

La bibliothèque réside dans `styles/`. Chaque style est autonome :

```
styles/
  INDEX.md                   # Catalogue complet
  <style-id>/
    STYLE.md                 # Fiche de style, cas d'usage, do's & don'ts
    tokens.ts                # Objet typé prêt pour Remotion
    preview/                 # Frames clés de prévisualisation
```

- **Ajouter un style** : créer le sous-dossier, rédiger `STYLE.md`, exporter `tokens.ts`, et ajouter une ligne dans `INDEX.md`.
- **Modifier un style** : adapter les tokens ou les consignes dans le dossier du style concerné.
- **Supprimer un style** : retirer le dossier et mettre à jour `INDEX.md`.

---

## 📐 Règles Techniques Non Négociables

1. **Déterminisme absolu** : tout est fonction de `useCurrentFrame()`. Jamais de `Math.random()` (utiliser `rnd(seed)`), jamais de `Date.now()`, jamais de transitions CSS asynchrones.
2. **Frames locales vs absolues** :
   - Dans une scène (`<Sequence>`), `useCurrentFrame()` redémarre à 0 (SFX en frames locales).
   - Les sous-titres globaux et la voix off sont calés en frames absolues.
3. **Sécurité des springs** : toujours clamper la frame (`Math.max(0, f - delay)`).
4. **TypeScript épinglé** : rester impérativement en TypeScript 5.6.3 (TS 7 casse l'API bundler de Remotion).

---

## 📚 Index des Références

| Fichier | Objet & Contenu |
|---|---|
| `references/formats.md` | Ratios 16:9, 9:16, 1:1, 4:5 et safe zones TikTok / Reels / YouTube |
| `references/remotion-patterns.md` | Recettes de code React / Remotion pour animations réutilisables |
| `references/elevenlabs-voiceover.md` | Guide détaillé du pipeline voix off, timestamps et TTS |
| `references/qc-checklist.md` | Grille d'évaluation stricte avant validation de livraison |
| `references/01-brief-storyboard.md` | Méthodologie narrative et gabarits de storyboard |
| `references/02-architecture.md` | Architecture du projet Remotion et source unique de vérité |
| `references/03-animation.md` | Catalogue des courbes d'easing et helpers d'animation |
| `references/04-design.md` | Principes de direction artistique, contraste et composition |
| `references/05-audio.md` | Sound design, mixage, ducking et catalogue des SFX procéduraux |
| `references/07-render-qa.md` | Procédure de rendu, optimisation et options Chromium |
| `references/08-pieges.md` | Dépannage rapide : cause → symptôme → solution |
