# ElevenLabs Voiceover — Guide & Workflow Intégré

Ce document décrit le pipeline automatisé de synthèse vocale avec ElevenLabs, alignement mot-par-mot et génération de sous-titres dynamiques.

---

## 1. Configuration requise

Les secrets doivent impérativement résider dans un fichier `.env` à la racine :

```env
ELEVENLABS_API_KEY=sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM   # Ou ID de votre voix custom
```

> [!CAUTION]
> N'affichez jamais votre clé API dans les logs, le code source ni les commits. Le fichier `.env` doit être ignoré par git (`.gitignore`).

---

## 2. Structure d'une entrée de script

Découpez la narration en scènes (une idée forte par scène) dans un fichier `script-vo.json` :

```json
[
  {
    "id": "01",
    "text": "Fatigué de perdre du temps sur des tableaux de bord interminables ?"
  },
  {
    "id": "02",
    "text": "Découvrez aLance, la solution tout-en-un pensée pour vos équipes terrain."
  },
  {
    "id": "03",
    "text": "Planifiez, suivez et encaissez vos missions en un instant."
  }
]
```

### Règles d'écriture pour le TTS :
- **Écrire les nombres en toutes lettres** : « quatre-vingt-quatre mille francs CFA » au lieu de « 84 000 FCFA ».
- **Optimiser la prononciation des marques** : écrire « Alance » si « aLance » est mal interprété.
- **Régler la respiration** : utiliser des virgules et des points pour marquer les pauses naturelles.

---

## 3. Génération avec `voiceover.mjs`

Le script gère le cache par hash SHA-256 du texte et des paramètres (évitant toute surconsommation de crédits), les réessais en cas de rate-limit (429) et le mode `--dry-run` :

```bash
# Mode simulation sans consommer de crédits :
node scripts/voiceover.mjs --script script-vo.json --output voice/ --dry-run

# Mode production réel :
node scripts/voiceover.mjs --script script-vo.json --output voice/ --stability 0.45 --similarity 0.80 --style 0.25
```

Fichiers produits pour chaque phrase :
- `voice/scene_XX.mp3` : le fichier audio haute fidélité.
- `voice/scene_XX.alignment.json` : les timestamps exacts caractère par caractère retournés par l'API ElevenLabs `/with-timestamps`.
- `voice/cache.json` : registre de mise en cache.

---

## 4. Synchronisation automatique des scènes avec `sync_scenes.mjs`

Ce script analyse les fichiers audio réels via `ffprobe`, ajoute une marge de respiration naturelle (`0.3s`), et calcule la timeline exacte en frames pour Remotion :

```bash
node scripts/sync_scenes.mjs --voice voice/ --fps 30 --breath 0.3 --output timeline.json --captions captions.json
```

Sorties produites :
- `timeline.json` : durées exactes et frames de départ/fin de chaque scène, à intégrer directement dans `SCENES` (`theme.ts`).
- `captions.json` : sous-titres découpés mot-par-mot avec frames d'apparition précises pour animer le kinetic text.

---

## 5. Mode dégradé (Offline / Absence de clé)

Si le réseau est indisponible ou en l'absence de clé dans `.env` :
1. Le script fonctionne en mode `--dry-run` ou avec une voix témoin silencieuse.
2. La durée des scènes est estimée sur la base d'une cadence de lecture naturelle de **15 caractères par seconde** (ou ~2,5 mots/seconde).
3. L'agent signale explicitement dans le rapport de livraison : « Voix off simulée en mode dégradé ».
