# Remotion Motion Design — Skill v2

Module d'automatisation et de production vidéo motion design de niveau agence pour Remotion (React) avec synthèse vocale ElevenLabs synchronisée mot-par-mot.

---

## 🚀 Installation & Prérequis

### 1. Prérequis Système
- **Node.js** v18+ (testé sur Node 20 & 24)
- **Python** 3.10+ avec les bibliothèques d'analyse :
  ```bash
  pip install numpy scipy pillow scikit-learn librosa
  ```
- **FFmpeg & FFprobe** installés et accessibles dans le `PATH`.
- **Chromium / Google Chrome** (requis pour le rendu Remotion) :
  ```bash
  # En environnement sans navigateur graphique préinstallé :
  npx @sparticuz/chromium
  ```

### 2. Configuration des Secrets (.env)
Créez un fichier `.env` à la racine de votre projet vidéo ou dans le dossier du skill :

```env
ELEVENLABS_API_KEY=sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
```

> [!IMPORTANT]
> Ne commitez jamais votre fichier `.env`. Il est déjà inscrit dans le `.gitignore`. Si vous ne disposez pas de clé API, le pipeline fonctionne de manière autonome grâce au mode `--dry-run`.

---

## 🎬 Démarrer un Projet Vidéo en 4 Commandes

### 1. Initialiser le projet depuis le template
```bash
bash scripts/init_project.sh ./mon-projet-video plus-jakarta-sans
cd ./mon-projet-video
```

### 2. Générer la Voix Off & Aligner les Scènes
Rédigez votre script dans `script-vo.json` :
```json
[
  { "id": "01", "text": "Bienvenue sur notre plateforme nouvelle génération." },
  { "id": "02", "text": "Simplifiez vos opérations en quelques clics." }
]
```

Lancez la génération vocale et la synchronisation automatique :
```bash
# Génération ElevenLabs avec cache
node ../scripts/voiceover.mjs --script script-vo.json --output voice/

# Calcul des durées et des sous-titres mot-par-mot
node ../scripts/sync_scenes.mjs --voice voice/ --fps 30 --output timeline.json --captions captions.json
```

### 3. Prévisualiser en direct
Lancez le studio de développement Remotion :
```bash
npm run dev
```

### 4. Contrôle Qualité & Export MP4
```bash
# Contrôle qualité par frames
bash ../scripts/qc_frames.sh . Film

# Rendu final MP4 normalisé à -16 LUFS
bash ../scripts/render.sh Film out/video_finale.mp4 16
```

---

## 🎨 Utiliser et Étendre la Bibliothèque de Styles

La bibliothèque réside dans `styles/`. Chaque style est autonome et contient :
- `STYLE.md` : direction artistique, palette, typographies, règles de montage, do's & don'ts.
- `tokens.ts` : constantes prêtes à importer dans vos composants Remotion.
- `preview/` : images représentatives du rendu.

### Liste des styles prêts à l'emploi :
- `saas-clair-fr` : SaaS corporate moderne, fond épuré, cartes blanches et accents bleus.
- `kinetic-sombre` : Typographie cosmique géante, fond nuit et particules, hooks percutants.
- `energie-vert` : Ambiance WhatsApp/social, bulles glassmorphism et vert dynamique.
- `infographic-bleu` : Cartes de données, compteurs et schémas isométriques.
- `logo-luxe` : Tracé calligraphique, dégradés carmin/dorés, hôtellerie et gastronomie.
- `cartoon-dark` : Vulgarisation illustrée 2D et storytelling avec sous-titres animés.
- `illustration-boutique` : Commerce de proximité, fintech africaine et devises en FCFA.

### Ajouter votre propre style :
1. Créez un dossier `styles/<mon-style>/`.
2. Définissez vos constantes dans `tokens.ts` en vous basant sur un style existant.
3. Rédigez la fiche `STYLE.md`.
4. Ajoutez votre style dans `styles/INDEX.md`.

---

## 📁 Structure du Skill

```
remotion-motion-design/
├── SKILL.md                 # Point d'entrée agent & workflow complet
├── styles/                  # Bibliothèque de styles réutilisables
│   ├── INDEX.md             # Catalogue et guide de choix
│   └── <style-id>/          # Fiches de styles, tokens.ts et previews
├── references/              # Guides techniques (formats, patterns, audio, QA)
├── scripts/                 # Scripts d'automatisation (voiceover, sync, qc, render)
├── templates/               # Compositions et scènes prêtes à l'emploi
├── analysis/                # Rapports d'analyse des vidéos de référence
├── CHANGELOG.md             # Historique des versions
└── README.md                # Guide de prise en main
```
