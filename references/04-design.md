# 04 — Direction artistique

## Sommaire
1. Tokens
2. Typographie
3. Couleur & contraste
4. Composition & zones de sécurité
5. Recréer une interface à partir de captures
6. Photos, logo, icônes
7. Finition (grain, vignette, ombres)
8. Rythme visuel
9. Checklist DA

## 1. Tokens (theme.ts)

`primary / primaryDeep / primaryLight / primarySoft / accent / ink / navy / mute / line / bg`. Les extraire **des assets du client** (échantillonne les pixels du logo/boutons) plutôt que d'inventer. Ombres : `SHADOW` (cartes, large et douce, teintée de la couleur de marque) et `SHADOW_SM` (pastilles). Rayons : 14–20 (champs), 24–40 (cartes), 999 (pastilles/boutons).

## 2. Typographie (cadre 1080p)

| Rôle | Taille | Graisse | Letter-spacing |
|---|---|---|---|
| Titre héros | 92–150 | 800 | −3 à −5 px |
| Titre de scène | 80–112 | 800 | −3 px |
| Sous-titre | 34–44 | 500 | 0 |
| Corps | 28–34 | 400–500 | 0 |
| Labels UI | 19–24 | 600–800 | +1 à +2 px (majuscules) |
| **Minimum absolu** | 20 | — | — |

- **Identifie la police du client** (sur les captures) — très souvent Plus Jakarta Sans, Inter, Poppins, Manrope, DM Sans (toutes sur Fontsource). Sinon une grotesque géométrique.
- Largeur : mesure avant de figer. 196 px débordait sur « Arrêtez d'improviser. » → 150 px. Estimation : largeur ≈ nb_caractères × 0,52 × taille. Contrôle toujours par image.
- Interligne titres : 1.04–1.08 ; corps 1.5–1.6.

## 3. Couleur & contraste

- Règle 60/30/10 : fond neutre 60 %, surfaces/texte 30 %, accent 10 %.
- Un seul mot-clé coloré par titre.
- Fond sombre : jamais noir pur (`#070B14`) + halos de la couleur de marque. Fond clair : dégradé très léger + blobs de marque à 14 %.
- Logo bleu sur fond sombre = illisible → **version claire** du logo (recolorer le bleu en bleu clair) ou tuile blanche.
- Texte ≥ 4,5:1 de contraste ; vérifie les sous-titres sur fond clair ET sombre.

## 4. Composition & zones de sécurité

- Marges 5–6 % (≈ 100–120 px). **120 px libres en bas** (sous-titres).
- Un point focal ; la règle des tiers ; le texte du côté opposé à la photo/le visuel.
- **Vertical 9:16** : 250 px libres en haut, 380 px en bas ; texte centré ; éléments empilés.
- Les éléments qui **débordent volontairement** du cadre (photo coupée en bas) donnent de la profondeur ; les débordements accidentels sont des bugs → vérifie.

## 5. Recréer une interface à partir de captures

Pourquoi : captures petites, barre de navigateur, états de chargement, curseur, pas animables. Reconstruire en React = net, animable, cohérent.

1. Relève **textes exacts**, structure, couleurs, rayons, icônes (lucide ≈ équivalent), états.
2. Reproduis fidèlement la **mise en page** (sidebar + contenu, cartes de stats, listes), simplifie les détails inutiles.
3. **Ne copie pas** des éléments tiers à marque déposée (captcha, logos de partenaires) : remplace par un équivalent générique (« Je suis un humain »).
4. Ce que tu inventes (libellés de stats, noms, montants, références) : **note-le** et signale-le à la livraison.
5. Mets l'app dans une **fenêtre arrondie** (`AppShell`, rayon 34, ombre) ; sidebar 330 px, `whiteSpace:'nowrap'` sur les items.
6. Anime les états : chiffres qui comptent, ligne qui s'insère, badge qui change, panneaux qui se succèdent.

## 6. Photos, logo, icônes

- **Photo détourée** (PNG alpha) : place-la en bas, coupée par le bord du cadre ; **halo circulaire** de la couleur douce derrière + anneau fin ; `filter: drop-shadow(0 40px 50px rgba(15,23,42,.22))` ; entrée = glisse du bas + fondu. Masque en dégradé sur 3–4 % du haut si le sujet est coupé net (casque, tête).
- **Pastilles** qui chevauchent la photo (bénéfices) avec bobbing.
- **Logo** : PNG transparent (idéalement SVG) ; version claire pour fond sombre ; révélation en wipe gauche→droite ; impact sonore au verrouillage.
- **Icônes** : `lucide-react` (cohérent, trait homogène). Taille 26–34 px dans des pastilles rondes teintées.

## 7. Finition

`Finish` : grain SVG `feTurbulence` (opacité .07, `multiply`, `seed={f%6}` pour le scintillement) + vignette radiale. `Bg` : 2 blobs qui dérivent (`sin/cos`), grille de points avec masque radial. Ça coûte peu et change tout.

## 8. Rythme visuel

Alterner sombre / clair ; alterner « scène dense » (UI) et « scène aérée » (grand titre) ; une scène « moment fort » (impact + titre) tous les ~15 s ; finir par un sombre calme avec CTA.

## 9. Checklist DA

- [ ] Un point focal par scène · [ ] Aucun texte < 20 px · [ ] Marque lisible sur fond sombre
- [ ] 120 px libres en bas · [ ] Pas de débordement involontaire · [ ] Couleurs issues de la marque
- [ ] Chaque scène a mouvement de caméra + fond animé · [ ] Alternance clair/sombre
