# Style : Fenêtres Rétro OS & Productivité (`retro-os-productivity`)

> Interface nostalgique inspirée des premiers systèmes d'exploitation (Macintosh System 7 / Windows 95) revisitée en mode néo-brutaliste. Boîtes fenêtres avec barre de titre carrée, listes d'items structurées, cases à cocher et fenêtres vidéo incrustées. Idéal pour les démonstrations de productivité, workflows et hacks logiciels.

---

## 1. Identité & Cibles
- **Clients recommandés** : Créateurs de contenu productivité, éditeurs de logiciels no-code, agences de montage vidéo, SaaS d'organisation.
- **Durée idéale** : 25 à 75 secondes
- **Formats supportés** : 9:16 (TikTok, Reels, Shorts) et 16:9 (Démos web, YouTube)
- **Vidéo de référence source** : `Download (2).mp4 (@ledevultime — 'J'ai monté 4h de vidéo en 30 min')`
- **Niveau de confiance** : Élevé (⭐⭐⭐⭐⭐)

## 2. Questions de Brief Spécifiques à Poser au Client
Posez ces questions précises pour calibrer le contenu selon ce style :
1. **Quel est le gain ou le résultat spectaculaire à annoncer en titre (ex: '4h de vidéo en 30 min', '10k abonnés en 7 jours') ?**
2. **Quelles sont les étapes du process à afficher sous forme de liste ou fenêtre OS ?**
3. **Avez-vous des extraits vidéos ou captures d'écran réelles à insérer dans les vignettes ?**
4. **Quel intitulé donner à la fenêtre rétro (ex: '□ □ □ ENREGISTREMENT', '□ □ □ MES NOTES') ?**

## 3. Assets Requis & Recommandés
- `Composant de fenêtre OS avec barre de titre à pastilles carrées '□ □ □'`
- `Extraits vidéos MP4 courts ou captures pour les vignettes de fichiers`
- `Icônes de dossiers, disquettes ou curseurs rétro monochromes`
- `Boîtes de dialogue avec boutons d'action 'OK / ANNULER' à contour noir`

## 4. Palette de Couleurs & Rôles
- **Arrière-plan (Fond papier quadrillé)** : `#F5F2EB`
- **Couleur de la grille** : `rgba(0, 0, 0, 0.05)`
- **Surfaces (Cartouches / Fenêtres)** : `#FFFFFF`
- **Encre (Titres / Textes majeurs)** : `#1A1A1A`
- **Accent Signature (Mots-clés / Highlights)** : `#E04434`
- **Bordures & Traits** : `#1A1A1A` (Épaisseur `3px`)
- **Ombre Dure Portée (Brutaliste)** : `5px 5px 0px #1A1A1A`

## 5. Typographie
- **Famille principale** : `Archivo Black, Inter, sans-serif`
- **Fontsource Slug** : `archivo-black`
- **Tailles conseillées (1080p vertical)** :
  - Titre Accroche : 96–130px (Graisse 900 Black)
  - Labels de Cartouches : 36–48px (Majuscules)
  - Textes de Liste : 28–34px

## 6. Animation & Mouvement
- **Entrées** : Springs vifs `{ damping: 10, stiffness: 250, mass: 0.5 }` sur 18 frames.
- **Décalage (Stagger)** : 5 frames entre éléments frères.
- **Transitions** : Cuts nets ou pop-out rapide (22 frames max).
- **Caméra** : Fixe ou micro-travelling vertical continu.

## 7. Sound Design & Voix Off
- **Musique** : Lofi ou synthwave discret, tempo régulier et posé, 95-105 BPM
- **Effets sonores (SFX)** : Bruits de clics souris rétro mécanique, son de validation de case à cocher, bip système rétro
- **Style de voix off & Débit** : Ton pragmatique, efficace, pédagogue, orienté solution, ~130 mots/min
- **Ducking de la musique** : baisse à 15% du volume pendant les prises de parole.

## 8. Bonnes Pratiques

### 5 « À faire »
1. Créer la barre de titre de la fenêtre avec les 3 petits carrés à gauche (□ □ □) et titre en gras
2. Animer l'ouverture de la fenêtre avec un léger rebond élastique
3. Insérer les éléments de liste les uns après les autres avec décalage de 4-6 frames
4. Utiliser des encadrements noirs nets autour des vignettes de vidéos ou captures
5. Afficher un titre fort en cartouche inversé (fond noir texte blanc) en accroche

### 5 « À éviter »
1. Ne pas utiliser de fenêtres modernes macOS translucides floutées (rester dans le look rétro noir et blanc)
2. Éviter les bordures trop fines (<2px) qui se perdent sur smartphone
3. Ne pas mettre plus de 4 à 5 lignes par fenêtre pour conserver la lisibilité mobile
4. Ne pas oublier l'ombre portée noire décalée sous la fenêtre principale
5. Éviter les transitions en rotation 3D qui briseraient l'esprit 2D rétro
