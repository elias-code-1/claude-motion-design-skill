# Index des styles — remotion-motion-design v2

> Dernière mise à jour : 2026-11-07 · 10 styles disponibles (8 extraits de références réelles + 2 génériques agence)

## Comment utiliser cet index

L'agent lit ce fichier lors du **protocole de choix de style** (Phase 0 du SKILL.md). Il pose au maximum 4 questions de brief et propose 2 à 4 styles classés par pertinence. Si l'utilisateur répond **« auto »**, il applique le style le plus pertinent.

## Tableau des styles

| ID | Nom | Ambiance | Formats | Durée idéale | Usages principaux | Confiance |
|---|---|---|---|---|---|---|
| `paper-brutalist-tech` | **Néo-Brutaliste Papier & Tech** | Éducatif, punchy, brutaliste | 9:16 + 16:9 | 30–90 s | Vulgarisation tech, Top 3, SaaS explainer, dev hacks | ⭐⭐⭐⭐⭐ |
| `avatar-sticker-creator` | **Avatar Sticker & Grilles** | Pop, incarné, communauté | 9:16 | 20–60 s | Créateurs solo, influenceurs, annonces, drapeaux/outils | ⭐⭐⭐⭐⭐ |
| `retro-os-productivity` | **Fenêtres Rétro OS** | Nostalgie 90s, efficace, tech | 9:16 + 16:9 | 25–75 s | Démos de productivité, workflows vidéo, no-code, process | ⭐⭐⭐⭐⭐ |
| `saas-clair-fr` | **SaaS Corporate Clair** | Professionnel, moderne, épuré | 16:9 + 9:16 | 30–60 s | Logiciels SaaS, démo produit B2B, landing animée | ⭐⭐⭐⭐⭐ |
| `kinetic-sombre` | **Kinetic Typo Sombre** | Percutant, cosmique, émotionnel | 9:16 | 15–45 s | Personal branding, motivation, hooks de rupture | ⭐⭐⭐⭐⭐ |
| `energie-vert` | **Énergie Vert Social** | Dynamique, conversion, bulles | 9:16 | 10–25 s | Promo WhatsApp, e-commerce, livraison, concours | ⭐⭐⭐⭐ |
| `infographic-bleu` | **Infographic Bleu & Données** | Pédagogique, structuré, slides | 9:16 + 16:9 | 30–90 s | Formations, fintechs, carrousels animés, rapports | ⭐⭐⭐⭐ |
| `logo-luxe` | **Logo Luxe Rouge & Or** | Cinématique, prestigieux, feutré | 16:9 + 9:16 | 10–30 s | Gastronomie, hôtellerie, marques de prestige Lomé/Afrique | ⭐⭐⭐⭐ |
| `cartoon-dark` | **Cartoon Sombre Storytelling** | Illustré 2D, dialogue, narratif | 9:16 + 16:9 | 45–120 s | Cybersécurité, vulgarisation longue, storytelling | ⭐⭐⭐ |
| `illustration-boutique` | **Illustration Boutique Afrique** | Chaleureux, commerce, devises | 9:16 + 16:9 | 30–60 s | PME locales, fintechs (FCFA, Mobile Money), microfinance | ⭐⭐⭐⭐ |

## Guide de sélection rapide par besoin

```
Vulgariser un concept tech / 'C'est quoi un SaaS ?' → paper-brutalist-tech
Vidéo incarnée avec avatar cartoon / sticker / personal branding → avatar-sticker-creator
Montrer un workflow / 'J'ai monté 4h en 30 min' / Productivité → retro-os-productivity
Logiciel B2B / SaaS / Démo fonctionnelle épurée → saas-clair-fr
Message fort / hook émotionnel / phrase choc → kinetic-sombre
Conversion WhatsApp / offre flash / service dynamique → energie-vert
Carrousel chiffré / slides pédagogiques / fintech → infographic-bleu
Restaurant / hôtel de luxe / bijouterie / marque prestige → logo-luxe
Storytelling de dialogue / pédagogie animée longue → cartoon-dark
Application mobile commerçant / gestion en FCFA / Afrique → illustration-boutique
```

## Ajouter un style

1. Crée `styles/<nouveau-id>/STYLE.md` (avec questions de brief, assets, palette, règles)
2. Crée `styles/<nouveau-id>/tokens.ts` (export typé des tokens)
3. Ajoute des images de prévisualisation dans `styles/<nouveau-id>/preview/`
4. Ajoute une ligne dans ce tableau et documente dans `CHANGELOG.md`
