# 10 — Prompts types & progression pédagogique

## Prompts à donner à Claude Code

**Démarrage complet**
> Crée une vidéo motion design Remotion de 45 s pour [marque/produit]. Voici mes assets : [dossier/zip]. Cible : [public]. CTA : [url]. Utilise le skill remotion-motion-design : analyse mes assets, propose un storyboard en 10 lignes, puis construis, contrôle chaque scène par images, et livre le projet + le script voix off.

**Sans assets**
> Fais un motion design de 30 s pour [idée]. Choisis une identité (couleurs, police) cohérente avec le secteur, annonce tes hypothèses, puis construis.

**Version verticale**
> Adapte la vidéo en 9:16 pour Reels (même contenu, zones de sécurité, texte plus gros) et contrôle chaque scène avec `COMP=FilmVertical`.

**Ajouter une scène**
> Ajoute une scène « témoignage » de 5 s entre la scène 4 et 5, avec le portrait fourni, et recale la timeline + les phrases VO.

**Sound design**
> Ajoute des SFX à toutes les interactions (clics, notifications, compteurs) et vérifie la synchro frame par frame. Régénère la musique pour la nouvelle durée.

**Correction**
> La scène 3 déborde et le texte est coupé. Rends les images de contrôle, corrige, re-rends, montre-moi.

**Voix off**
> Donne-moi le tableau de script voix off optimisé ElevenLabs (nombres en lettres, durée max par phrase) puis intègre mes mp3.

## Progression d'exercices (formation)

| Niveau | Exercice | Compétences |
|---|---|---|
| 1 | Logo sting de 5 s (template `Intro`) | Remotion de base, `p()`, tracé, SFX impact |
| 2 | Titre qui se révèle + 3 bénéfices + CTA 15 s | `WordReveal`, `pop`, `Chip`, stagger |
| 3 | Promo 30 s avec une UI reconstruite (1 écran) | Reconstruction d'UI, `Counter`, `Cursor`, `Cam` |
| 4 | Promo 45–60 s complète, 6–8 scènes | Timeline `SCENES`, sweeps, alternance clair/sombre |
| 5 | Sound design complet + musique + ducking | `Sfx`, synchro à la frame, loudness |
| 6 | Voix off ElevenLabs + sous-titres | script TTS, `manifest.json`, durées |
| 7 | Déclinaison verticale + QA par images | Compositions multiples, zones de sécurité, checklist |
| 8 | Projet client réel de A à Z | brief, assets, livraison honnête |

## Critères d'évaluation d'un rendu

Hiérarchie claire · mouvement fluide (stagger, easing) · cohérence DA · synchro son/image · lisibilité (taille, contraste, sous-titres) · propreté (pas de débordement/fragments) · respect du brief · honnêteté de livraison (inventé vs réel).
