# Style : Infographic Bleu & Données (`infographic-bleu`)

> Structure claire et pédagogique inspirée des présentations par cartes, jauges et graphiques isométriques. Parfait pour la formation, décryptages techniques et synthèses de données.

---

## 1. Identité & Cible
- **Clients recommandés** : Fintechs, universités, formateurs en ligne, rapports annuels, télécoms.
- **Durée idéale** : 30 à 90 secondes
- **Formats supportés** : 9:16 (Carrousel vidéo) et 16:9 (Conférence/Web)
- **Vidéos de référence sources** : `4d1ba867 (Mezes), ef127773 (Optisite), v14044g50`
- **Niveau de confiance** : Élevé (⭐⭐⭐⭐⭐)

## 2. Palette & Rôles
- **Primaire (Marque/Action)** : `#1E40AF`
- **Primaire Profonde** : `#1E3A8A`
- **Accent (Highlight/Badge)** : `#0D9488`
- **Arrière-plan (Fond)** : `#F8FAFC`
- **Surfaces (Cartes/Modales)** : `#FFFFFF`
- **Encre (Titres)** : `#0F172A`
- **Texte secondaire / Mute** : `#64748B`
- **Bordures & Séparateurs** : `#CBD5E1`

## 3. Typographie
- **Famille principale** : `Inter, sans-serif`
- **Fontsource Slug** : `inter`
- **Tailles conseillées (1080p)** :
  - Titre principal : 92–130px (Graisse 800)
  - Sous-titre : 36–48px (Graisse 600)
  - Corps / Labels : 24–30px (Graisse 400–500)

## 4. Animation & Mouvement
- **Entrées** : expo-out `Easing.bezier(0.16, 1, 0.3, 1)` sur 20 frames.
- **Décalage (Stagger)** : 5 frames entre éléments frères.
- **Transitions** : Sweeps de 28 frames avec whoosh synchronisé.
- **Caméra** : Zoom avant continu 1.00x → 1.05x par scène.

## 5. Sound Design & Voix Off
- **Musique** : Minimal techno ou ambient structuré, régulier, 105-115 BPM
- **Effets sonores (SFX)** : Tics de compteur kilométrique, swipe de carte, validation ding
- **Style de voix off & Débit** : Ton professoral, clair, articulé, précis, 120-130 mots/min
- **Ducking de la musique** : baisse à 15% du volume pendant les prises de parole.

## 6. Bonnes Pratiques

### 5 « À faire »
1. Afficher un compteur progressif (ex: 01 / 10 slides) en haut
2. Utiliser des barres de progression synchronisées sur les séquences
3. Encadrer les chiffres clés dans des cartouches contrastés
4. Accompagner chaque chiffre qui monte d'un son de défilement
5. Présenter des comparaisons A vs B bien alignées

### 5 « À éviter »
1. Ne pas dépasser 4 données chiffrées par écran
2. Éviter les transitions en rotation 3D complexe qui fatiguent l'œil
3. Ne pas masquer les légendes d'unités (%, FCFA, Go)
4. Ne pas utiliser de dégradés trop vifs sur les fonds
5. Éviter le texte justifié
