# Skill Claude Code — remotion-motion-design

Crée des vidéos motion design de niveau agence avec Remotion : brief → assets → storyboard → animations → sound design → voix off → sous-titres → contrôle qualité → rendu.

## Installation

**Pour toi, sur tous tes projets** :
```bash
mkdir -p ~/.claude/skills
cp -r remotion-motion-design ~/.claude/skills/
```
**Pour un seul projet** : copie le dossier dans `<ton-projet>/.claude/skills/`.

Relance Claude Code : le skill se déclenche tout seul dès que tu parles de motion design / vidéo animée / Remotion.

## Prérequis sur la machine
- Node.js 18+ (npm) · Python 3 avec `numpy scipy pillow` (`pip install numpy scipy pillow`) · ffmpeg
- (Optionnel) clé API ElevenLabs pour la voix off automatique

## Utilisation rapide
Dans Claude Code :
> Crée-moi une vidéo motion design Remotion de 45 s pour [produit]. Mes assets sont dans ./assets.

Ou à la main :
```bash
bash ~/.claude/skills/remotion-motion-design/scripts/init_project.sh ./ma-video
cd ma-video && npm run dev        # prévisualisation
npm run render                    # → out/video.mp4
```

## Contenu
- `SKILL.md` — workflow en 9 phases + règles
- `references/` — 10 guides détaillés (brief, architecture, animations, design, audio, assets, rendu/QA, pièges, catalogue de vidéos, prompts/pédagogie)
- `assets/template/` — projet Remotion générique (compile et se rend)
- `scripts/` — init, analyse d'assets, détourage, contrôle qualité
