# Index des styles — remotion-motion-design v2

> Dernière mise à jour : 2026-11-07 · 7 styles disponibles (5 extraits de références + 2 génériques)

## Comment utiliser cet index

L'agent lis ce fichier lors du **protocole de choix de style** (Phase 0 du SKILL.md). Il propose 2 à 4 styles classés par pertinence, en attendant ta sélection. Si tu dis **« auto »**, il applique le style avec le score le plus élevé.

## Tableau des styles

| ID | Nom | Ambiance | Formats | Durée idéale | Usages principaux | Confiance |
|---|---|---|---|---|---|---|
| `saas-clair-fr` | SaaS Corporate Clair | Professionnel, moderne, épuré | 16:9 + 9:16 | 30–60 s | SaaS, B2B, démo produit, explainer | ⭐⭐⭐⭐⭐ |
| `kinetic-sombre` | Kinetic Typo Sombre | Percutant, émotionnel, accrocheur | 9:16 | 15–45 s | Personal branding, coaching, contenu éducatif | ⭐⭐⭐⭐⭐ |
| `energie-vert` | Énergie Vert Social | Dynamique, communauté, conversationnel | 9:16 | 10–20 s | Social media, annonces, whatsapp/DM promo | ⭐⭐⭐⭐ |
| `infographic-bleu` | Infographic Bleu | Éducatif, structuré, data-driven | 9:16 + 16:9 | 20–60 s | Tutoriels, formation, chiffres-clés, recrutement | ⭐⭐⭐⭐ |
| `logo-luxe` | Logo Luxe Rouge | Premium, élégant, marque forte | 16:9 | 10–30 s | Restaurants, hôtels, marques luxe locale Afrique | ⭐⭐⭐⭐ |
| `cartoon-dark` | Cartoon Sombre Narratif | Storytelling, humour, pédagogique | 9:16 | 60–180 s | Formation, vulgarisation tech, contenu long | ⭐⭐⭐ |
| `illustration-boutique` | Illustration Boutique | Chaleureux, local, commerce | 9:16 + 16:9 | 20–60 s | PME, boutiques, fintech locale Afrique (FCFA) | ⭐⭐⭐⭐ |

## Guide de sélection rapide

```
Client B2B / tech / SaaS → saas-clair-fr
Contenu TikTok / coaching / message fort → kinetic-sombre
Annonce communauté / WhatsApp → energie-vert
Formation / tutoriel / chiffres → infographic-bleu
Restaurant / hôtel / marque Lomé → logo-luxe
Vulgarisation / humour / storytelling long → cartoon-dark
PME / boutique / app fintech Afrique → illustration-boutique
```

## Ajouter un style

1. Crée `styles/<nouveau-id>/STYLE.md` et `styles/<nouveau-id>/tokens.ts`
2. Optionnel : ajoute des previews dans `styles/<nouveau-id>/preview/`
3. **Ajoute une ligne** dans le tableau ci-dessus (respecter le format)
4. Note la date et l'auteur dans `CHANGELOG.md`

## Modifier un style

1. Édite `styles/<id>/STYLE.md` et/ou `styles/<id>/tokens.ts`
2. Met à jour sa ligne dans ce tableau si l'ambiance ou les usages changent
3. Note dans `CHANGELOG.md`

## Supprimer un style

1. Supprime `styles/<id>/` et son contenu
2. Supprime sa ligne dans ce tableau
3. Note dans `CHANGELOG.md` avec la raison
