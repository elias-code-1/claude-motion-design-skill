# Style : Néo-Brutaliste Papier & Tech (`paper-brutalist-tech`)

> Esthétique papier quadrillé avec typographie massive noire, cartouches à contours noirs épais (3-4px), ombres dures décalées et accent rouge corail. Inspiré du créateur @ledevultime pour vulgariser des concepts tech, des listes 'Top 3' et des tutoriels SaaS.

---

## 1. Identité & Cibles
- **Clients recommandés** : Créateurs tech, développeurs, formateurs en ligne, startups SaaS expliquant un concept complexe.
- **Durée idéale** : 30 à 90 secondes
- **Formats supportés** : 9:16 (TikTok, Reels, Shorts) et 16:9 (YouTube explainer)
- **Vidéo de référence source** : `Download.mp4 (@ledevultime — 'C'est quoi un SaaS ?')`
- **Niveau de confiance** : Élevé (⭐⭐⭐⭐⭐)

## 2. Questions de Brief Spécifiques à Poser au Client
Posez ces questions précises pour calibrer le contenu selon ce style :
1. **Quel est le concept clé ou le problème à vulgariser (ex: 'C'est quoi une API ?', 'Top 3 des outils IA') ?**
2. **Avez-vous une liste d'étapes ou d'arguments numérotés (Étape 1, 2, 3) ?**
3. **Quel est le mot d'impact ou le chiffre choc à mettre en rouge corail ?**
4. **Préférez-vous un ton direct/provocateur (ex: 'Arrête de coder comme en 2015') ou pédagogique ?**

## 3. Assets Requis & Recommandés
- `Texture SVG de fond quadrillé / millimétré (inclus en token ou CSS)`
- `Logos tech simplifiés ou icônes SVG en aplat noir`
- `Pastilles carrées avec bordure noire (3px) et ombre dure décalée (4px 4px 0px #000)`
- `Capture d'écran simplifiée ou schémas en blocs géométriques`

## 4. Palette de Couleurs & Rôles
- **Arrière-plan (Fond papier quadrillé)** : `#F5F2EB`
- **Couleur de la grille** : `rgba(0, 0, 0, 0.06)`
- **Surfaces (Cartouches / Fenêtres)** : `#FFFFFF`
- **Encre (Titres / Textes majeurs)** : `#1A1A1A`
- **Accent Signature (Mots-clés / Highlights)** : `#E04434`
- **Bordures & Traits** : `#1A1A1A` (Épaisseur `3px`)
- **Ombre Dure Portée (Brutaliste)** : `4px 4px 0px #1A1A1A`

## 5. Typographie
- **Famille principale** : `Archivo Black, Montserrat, sans-serif`
- **Fontsource Slug** : `archivo-black`
- **Tailles conseillées (1080p vertical)** :
  - Titre Accroche : 96–130px (Graisse 900 Black)
  - Labels de Cartouches : 36–48px (Majuscules)
  - Textes de Liste : 28–34px

## 6. Animation & Mouvement
- **Entrées** : Springs vifs `{ damping: 8, stiffness: 280, mass: 0.4 }` sur 14 frames.
- **Décalage (Stagger)** : 3 frames entre éléments frères.
- **Transitions** : Cuts nets ou pop-out rapide (18 frames max).
- **Caméra** : Fixe ou micro-travelling vertical continu.

## 7. Sound Design & Voix Off
- **Musique** : Lofi hip-hop énergique ou boom-bap feutré, sans chant, 90-100 BPM
- **Effets sonores (SFX)** : Pop de feutre, bruit d'écriture marqueur sur papier, click brutaliste
- **Style de voix off & Débit** : Ton direct, rythmé, dynamique, percutant, ~140-150 mots/min
- **Ducking de la musique** : baisse à 15% du volume pendant les prises de parole.

## 8. Bonnes Pratiques

### 5 « À faire »
1. Utiliser l'ombre portée dure (box-shadow: 4px 4px 0px #1A1A1A) sur tous les cartouches
2. Mettre les mots clés forts en capitales géantes avec la couleur rouge corail #E04434
3. Garder le fond papier millimétré beige clair visible sur toutes les scènes
4. Créer des entrées très sèches et rapides (snappy springs de 12 à 16 frames)
5. Utiliser des séparateurs et bordures noirs nets de 3px ou 4px sans adoucissement

### 5 « À éviter »
1. Ne jamais utiliser d'ombres floues douces (box-shadow avec blur interdit ici)
2. Éviter les coins trop arrondis (border-radius maximum 4px ou 0px carré strict)
3. Ne pas utiliser de dégradés modernes (uniquement des aplats francs)
4. Ne pas surcharger de texte : privilégier 3 à 5 mots géants par écran
5. Ne pas faire de transitions lentes en fondu enchaîné (utiliser des cuts ou des pop-outs secs)
