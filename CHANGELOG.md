# Changelog — remotion-motion-design

Toutes les modifications notables apportées au skill sont consignées dans ce document.

---

## [2.0.0] — 2026-11-07

### ✨ Nouveautés majeures

- **Bibliothèque de Styles Réutilisables (`styles/`)** :
  - Création de 7 styles clés complets avec fiches de style détaillées (`STYLE.md`), tokens typés Remotion (`tokens.ts`) et captures clés de prévisualisation (`preview/`) :
    1. `saas-clair-fr` : SaaS B2B épuré, fond clair avec micro-grille et cartes 3D (issu d'aLance).
    2. `kinetic-sombre` : Typographie cosmique monumentale ultra-bold, fond nuit profond et nébuleuses (issu de Paresseux).
    3. `energie-vert` : Ambiance dynamique, bulles WhatsApp glassmorphism et bokeh vert (issu de Calus Smart).
    4. `infographic-bleu` : Cartes de données, compteurs et schémas isométriques (issu de Mezes et Optisite).
    5. `logo-luxe` : Tracé de logo calligraphique, particules carmin et doré (issu de Café Paris Lomé).
    6. `cartoon-dark` : Storytelling 2D illustré avec dialogue et sous-titrage mot par mot (issu de code100bug).
    7. `illustration-boutique` : Commerce de proximité, fintech africaine et devises locales en FCFA (issu de Kontra Africa).
  - Index centralisé `styles/INDEX.md` avec tableau de sélection rapide.

- **Protocole de Choix de Style Cadré (Phase 0)** :
  - Procédure standardisée intégrée dans `SKILL.md` : brief ciblé en 4 questions maximum, recommandation de 2 à 4 styles avec justification, support du choix automatique (`auto`).

- **Pipeline Voix Off ElevenLabs Professionnel (`scripts/voiceover.mjs`)** :
  - Gestion sécurisée des identifiants via `.env` (`ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`).
  - Cache déterministe par empreinte SHA-256 du texte et des paramètres (aucun crédit gaspillé).
  - Gestion de la limitation de débit (HTTP 429) avec backoff exponentiel.
  - Récupération des timestamps caractère par caractère via l'endpoint `/with-timestamps`.
  - Mode simulation complet `--dry-run` pour travailler hors ligne ou sans clé.

- **Synchronisation Automatique & Kinetic Captions (`scripts/sync_scenes.mjs`)** :
  - Calcul automatique de la durée de chaque scène depuis les fichiers audio réels via `ffprobe`.
  - Marge de respiration configurable (défaut `0.3s`) et compensation du balayage de transition (sweep).
  - Génération de `timeline.json` (durées en frames) et `captions.json` (sous-titrage mot-par-mot).

- **Scripts de Contrôle Qualité et de Rendu** :
  - `scripts/qc_frames.sh` : extraction automatique des frames clés, vérification TypeScript préalable et assemblage de planches contact comparatives via PIL.
  - `scripts/render.sh` : moteur de rendu MP4 H.264 / AAC avec normalisation audio automatique à −16 LUFS via filtre ffmpeg `loudnorm`.
  - `scripts/analyze_video.py` : outil d'audit vidéo (ffprobe, k-means palette, scene detection, BPM, loudnorm).

- **Nouvelles Références Normatives** :
  - `references/formats.md` : synthèse des ratios (16:9, 9:16, 1:1, 4:5) et safe zones strictes pour TikTok, Reels et YouTube.
  - `references/elevenlabs-voiceover.md` : guide d'intégration audio et bonnes pratiques TTS.
  - `references/qc-checklist.md` : grille d'audit qualité avant validation de livraison.
  - `references/remotion-patterns.md` : patrons de conception React et hooks Remotion réutilisables.

### 🛡️ Sécurité & Robustesse

- Exclusion stricte de tout secret dans le code ou les commits (fichiers `.env` systématiquement ignorés).
- Maintien des versions épinglées stables (TypeScript 5.6.3 pour éviter l'incompatibilité TS 7 avec le bundler Remotion).
- Création d'un backup intégral de la v1 avant refonte (`remotion-motion-design_backup_20261107/`).
