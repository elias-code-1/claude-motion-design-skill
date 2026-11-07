# AUDIT — remotion-motion-design v1
> Date : 2026-11-07 | Auditeur : Antigravity

## 1. Ce qui existe (inventaire complet)

### SKILL.md (point d'entrée)
- ✅ Workflow en 9 phases clair et bien structuré
- ✅ Les 8 piliers bien définis
- ✅ Règles Remotion non-négociables documentées
- ✅ Index des références bien organisé
- ✅ Section environnement sandbox (sparticuz/chromium)
- ✅ Honnêteté de livraison mentionnée

### Références (11 fichiers)
| Fichier | Contenu | État |
|---|---|---|
| 01-brief-storyboard.md | Questions de brief, structure narrative, storyboard, script VO | ✅ Complet |
| 02-architecture.md | Arbo projet, theme.ts, Film.tsx, anatomie scène, compositions multiples | ✅ Complet |
| 03-animation.md | Helpers, timings, 15 recettes d'animation avec code | ✅ Très riche |
| 04-design.md | Tokens, typographie, couleur, composition, reconstruire UI, finition | ✅ Complet |
| 05-audio.md | Catalogue SFX, synchro, musique, ducking, voix off ElevenLabs | ✅ Complet |
| 06-assets.md | Captures → UI, détourage, logo, pièges | ✅ Présent |
| 07-render-qa.md | Protocole QA, checklist, commandes rendu, formats, Chromium sandbox | ✅ Complet |
| 08-pieges.md | Pièges réels (symptôme → cause → solution) | ✅ Très utile |
| 09-catalogue-videos.md | 12 types de vidéos avec structures | ✅ Complet |
| 10-prompts-formation.md | Prompts types + progression d'exercices | ✅ Présent |
| 11-github-actions.md | CI/CD render cloud | ✅ Complet |

### Scripts (4 fichiers)
| Script | Fonction | État |
|---|---|---|
| init_project.sh | Crée projet Remotion depuis template | ✅ Fonctionnel |
| analyze_assets.py | Planches contact depuis zip d'images | ✅ Présent |
| cutout.py | Détourage fond uni | ✅ Présent |
| check_project.sh | Typage + 1 image par scène | ✅ Présent |

### Template (assets/template/)
- ✅ Structure complète : theme.ts, anim.ts, ui.tsx, Film.tsx, 3 scènes, scripts audio/VO/stills
- ✅ GitHub Actions workflow inclus
- ✅ Remotion épinglé en 4.0.250, TypeScript en 5.6.3

## 2. Ce qui manque (trous identifiés)

### Trous critiques
- ❌ **Pas de système de styles/thèmes réutilisables** : chaque projet repart de zéro sans base de styles éprouvés extraits de références réelles.
- ❌ **Pas de script voix off autonome** : `generate-vo.mjs` dans le template est minimal — pas de cache, pas de retry, pas de mode dry-run, pas de timestamps pour sous-titres mot/mot.
- ❌ **Pas de script sync_scenes** : rien pour calculer automatiquement les durées de scènes depuis les audios générés.
- ❌ **Pas de qc_frames.sh** : le QA est manuel et non scriptable.
- ❌ **Pas de render.sh** : les commandes de rendu sont documentées mais non scriptées avec gestion d'erreur.
- ❌ **Pas de protocole de choix de style** : l'agent doit deviner les tokens de chaque nouveau projet sans référence.
- ❌ **Pas d'analyse vidéo de référence** : scripts pour analyser les vidéos existantes (palette, rythme, mouvement) manquent.
- ❌ **Pas de formats.md** : les zones de sécurité sont éparpillées dans plusieurs références.

### Trous modérés
- ⚠️ **README.md** : présent mais minimal (non vérifié en détail).
- ⚠️ **Pas de CHANGELOG.md** : pas de traçabilité des modifications.
- ⚠️ **Voix off ElevenLabs** : documentée dans 05-audio.md mais sans script production-ready (cache, retry, timestamps).
- ⚠️ **Pas de tokens.ts par style** : les tokens sont dans theme.ts mais non modulaires par style.

## 3. Doublons et contradictions

| Item | Doublon/Contradiction | Résolution |
|---|---|---|
| Voix off documentée dans SKILL.md + 05-audio.md | Redondance partielle, niveaux de détail différents | ✅ OK : SKILL.md = résumé, 05-audio.md = détail |
| Chromium sandbox : SKILL.md §12 + 07-render-qa.md §6 | Redondance, légèrement différente | Harmoniser (fait dans v2) |
| `npm run vo` cité dans SKILL.md mais `generate-vo.mjs` peu documenté | Incohérence de niveau de détail | Remplacé par voiceover.mjs complet |
| "une question à la fois max" dans brief vs "4 questions max" dans protocole de choix | Contradiction intentionnelle à gérer | Résolu : 4 questions en 1 bloc au brief |

## 4. Risques identifiés

| Risque | Niveau | Description |
|---|---|---|
| TypeScript 7 | 🔴 Élevé | TS 7 casse Remotion bundler. Script init_project.sh épingle TS 5.6.3 mais pas le SKILL.md explicitement |
| Remotion 4.0.250 | 🟡 Moyen | Épinglé dans init mais pas documenté dans SKILL.md comme immuable |
| `--concurrency` | 🟡 Moyen | Interdit dans remotion.config.ts mais pas de garde dans les scripts |
| Chemins en dur | 🟢 Faible | Pas de chemin en dur détecté (tout relatif via `$HERE`) |
| sparticuz/chromium@131 | 🟡 Moyen | Version épinglée mais peut devenir incompatible avec Remotion futur |
| `Math.random()` dans rendu | 🟢 Faible | Interdit et documenté dans 08-pieges.md |
| Dépendances Python | 🟡 Moyen | gen_audio.py requiert numpy/scipy mais pas vérifiés à l'install |

## 5. Environnement vérifié (2026-11-07)

| Outil | Version | État |
|---|---|---|
| Node.js | v24.21.0 | ✅ Disponible |
| npm | 11.19.0 | ✅ Disponible |
| Python | 3.12.3 | ✅ Disponible |
| ffmpeg | 7.0.2 (static) | ✅ Disponible |
| ffprobe | 7.0.2 (static) | ✅ Disponible |
| librosa | — | ⚠️ Installé via pip --break-system-packages |
| numpy | — | ⚠️ Installé via pip --break-system-packages |
| pillow | — | ⚠️ Installé via pip --break-system-packages |
| scikit-learn | — | ⚠️ Installé via pip --break-system-packages |
| scipy | — | ⚠️ Installé via pip --break-system-packages |
| Chromium | non installé | ⚠️ sparticuz/chromium sera installé à la demande |
| ElevenLabs API | non testée | ℹ️ Mode dry-run par défaut (pas de clé fournie) |

## 6. Plan de modification (v2)

1. **Backup** ✅ fait → `remotion-motion-design_backup_20261107/`
2. **Analyse des 18 vidéos de référence** → `analysis/<id>/` + `STYLE_REPORT.md` par vidéo
3. **Bibliothèque de styles** → `styles/` : 1 dossier par style avec `STYLE.md` + `tokens.ts` + `preview/`
4. **Index des styles** → `styles/INDEX.md` pour le protocole de choix
5. **SKILL.md refondu** : protocole de choix intégré, voix off ElevenLabs documentée, pipeline complet
6. **Nouveaux scripts** : `voiceover.mjs` (cache+dry-run), `sync_scenes.mjs`, `qc_frames.sh`, `render.sh`, `analyze_video.py`
7. **Nouvelle référence** : `references/formats.md` (zones de sécurité centralisées)
8. **CHANGELOG.md**, **README.md** mis à jour
9. **Tests** : protocole de choix sur faux brief, dry-run voix off 3 scènes
10. **Zip livrable** + rapport final

---

*Audit complet. Aucun contenu existant supprimé sans signalement.*
