# Style : Avatar Sticker & Grilles Créateur (`avatar-sticker-creator`)

> Mise en scène incarnée avec avatar ou photo détourée en style autocollant (Sticker die-cut : contour blanc épais 6-8px et ombre décalée), sur fond papier quadrillé avec grilles d'éléments pop. Conçu pour le personal branding, les créateurs de contenu et les annonces de communauté.

---

## 1. Identité & Cibles
- **Clients recommandés** : Créateurs TikTok/YouTube, influenceurs tech, formateurs solo, entrepreneurs qui incarnent leur marque.
- **Durée idéale** : 20 à 60 secondes
- **Formats supportés** : 9:16 (TikTok, Instagram Reels, Shorts)
- **Vidéo de référence source** : `Download (1).mp4 (@ledevultime — 'Quel que soit... / Avatar')`
- **Niveau de confiance** : Élevé (⭐⭐⭐⭐⭐)

## 2. Questions de Brief Spécifiques à Poser au Client
Posez ces questions précises pour calibrer le contenu selon ce style :
1. **Avez-vous un avatar cartoon (Bitmoji, illustration) ou une photo portrait haute résolution à détourer ?**
2. **Quel univers ou groupe d'éléments souhaitez-vous faire apparaître en grille (ex: drapeaux, outils, logos, chiffres) ?**
3. **Quelle est l'émotion principale véhiculée par l'avatar (surprise, réflexion, autorité, enthousiasme) ?**
4. **Quel est le call-to-action final (suivre le compte, lien en bio, commentaire) ?**

## 3. Assets Requis & Recommandés
- `Avatar ou portrait détouré au format PNG transparent (haute résolution min 1000px)`
- `Série d'icônes ou drapeaux au ratio 3:2 avec contour noir uniforme 2px`
- `Texture de fond papier quadrillé / ligné`
- `Badges d'annotation 'warning', 'check' ou flèches dessinées à la main`

## 4. Palette de Couleurs & Rôles
- **Arrière-plan (Fond papier quadrillé)** : `#F5F2EB`
- **Couleur de la grille** : `rgba(0, 0, 0, 0.05)`
- **Surfaces (Cartouches / Fenêtres)** : `#FFFFFF`
- **Encre (Titres / Textes majeurs)** : `#1A1A1A`
- **Accent Signature (Mots-clés / Highlights)** : `#E04434`
- **Bordures & Traits** : `#1A1A1A` (Épaisseur `3px`)
- **Ombre Dure Portée (Brutaliste)** : `3px 3px 0px #1A1A1A`

## 5. Typographie
- **Famille principale** : `Montserrat, Poppins, sans-serif`
- **Fontsource Slug** : `montserrat`
- **Tailles conseillées (1080p vertical)** :
  - Titre Accroche : 96–130px (Graisse 900 Black)
  - Labels de Cartouches : 36–48px (Majuscules)
  - Textes de Liste : 28–34px

## 6. Animation & Mouvement
- **Entrées** : Springs vifs `{ damping: 9, stiffness: 260, mass: 0.5 }` sur 16 frames.
- **Décalage (Stagger)** : 4 frames entre éléments frères.
- **Transitions** : Cuts nets ou pop-out rapide (20 frames max).
- **Caméra** : Fixe ou micro-travelling vertical continu.

## 7. Sound Design & Voix Off
- **Musique** : Beat instrumental rythmé et entraînant, groove moderne, 105-115 BPM
- **Effets sonores (SFX)** : Pop de bulle, bruit de sticker qu'on colle, whoosh léger d'apparition
- **Style de voix off & Débit** : Voix humaine très incarnée, ton conversationnel et direct, ~135 mots/min
- **Ducking de la musique** : baisse à 15% du volume pendant les prises de parole.

## 8. Bonnes Pratiques

### 5 « À faire »
1. Appliquer l'effet sticker sur l'avatar (bordure blanche 6-8px + filtre drop-shadow)
2. Animer de légers mouvements de respiration ou flottement sur l'avatar (Math.sin)
3. Organiser les items secondaires en grilles bien alignées (ex: 2 rangées de 5 drapeaux)
4. Utiliser des staggers courts (2 à 4 frames) pour faire 'popper' les éléments de grille en cascade
5. Faire correspondre le regard ou la gestuelle de l'avatar avec le texte affiché

### 5 « À éviter »
1. Ne pas masquer les 380px inférieurs réservés à l'interface TikTok / Reels
2. Éviter les avatars mal détourés avec franges blanches pixelisées
3. Ne pas surcharger l'écran : laisser respirer le centre autour de l'avatar
4. Ne pas laisser l'avatar totalement statique pendant plus de 2 secondes
5. Éviter les polices avec empattements (serif) qui briseraient le look cartoon / pop
