# Checklist de Contrôle Qualité (Quality Assurance)

À exécuter rigoureusement avant chaque validation ou livraison de projet.

---

## 1. Typographie & Lisibilité
- [ ] **Débordement de texte** : aucun titre ni paragraphe ne sort de l'écran ou ne passe sur une ligne inattendue.
- [ ] **Taille minimale** : aucun texte fonctionnel n'est inférieur à 20px (pour un rendu 1080p).
- [ ] **Contraste texte/fond** : contraste supérieur ou égal à 4.5:1 (respect des normes WCAG).
- [ ] **Gestion des devises & chiffres** : espace insécable entre les nombres et les unités (ex: « 84 000 FCFA »).
- [ ] **Chargement des polices** : toutes les polices sont préchargées avec `delayRender()` sans scintillement (FOUT).

---

## 2. Safe Zones & Ratios
- [ ] **Sous-titres** : 120 px entièrement libres en bas de l'écran en 16:9.
- [ ] **Vertical 9:16 (TikTok/Reels/Shorts)** :
  - 250 px libres en haut (UI d'application, caméra).
  - 380 px libres en bas (description, son, profil).
  - 120 px libres à droite (boutons likes/commentaires).
- [ ] **Éléments coupés involontairement** : les débordements sont intentionnels (fond coupé net, tête masquée en dégradé).

---

## 3. Animation & Timing
- [ ] **Fluidité des transitions** : les sweeps ou fondus couvrent parfaitement le changement de scène (cut à la frame centrale).
- [ ] **Aucune image figée** : zoom de caméra continu (`Cam`) ou flottement secondaire permanent.
- [ ] **Stagger appliqué** : décalage systématique de 3 à 8 frames entre éléments d'un même groupe.
- [ ] **Déterminisme** : absence totale de `Math.random()`, `Date.now()` ou animations CSS asynchrones ; tout est dérivé de `useCurrentFrame()`.

---

## 4. Sound Design & Audio
- [ ] **Synchronisation frame-exacte** : chaque SFX (click, pop, notif) tombe sur la frame exacte de l'action visuelle.
- [ ] **Ducking musical** : le volume de la musique s'abaisse automatiquement (à ~15%) pendant la voix off.
- [ ] **Loudness conforme** : mixage final mesuré entre −14 et −16 LUFS (crête crête TP ≤ −1.5 dB).
- [ ] **Absence de saturation** : pas de clipping audible sur les impacts sonores.

---

## 5. Intégrité des Données & Transparence
- [ ] Les éléments inventés (chiffres fictifs, faux noms) sont documentés et signalés au client.
- [ ] Le projet est testé et validé via `bash scripts/qc_frames.sh`.
