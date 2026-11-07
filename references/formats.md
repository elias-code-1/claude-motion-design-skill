# Formats, Ratios & Zones de Sécurité (Safe Zones)

Guide de référence pour la production multi-format avec Remotion.

---

## 1. Tableau synthétique des formats

| Format | Ratio | Dimensions standard | Dimensions 4K / High | Usages & Plateformes | Cible Loudness |
|---|---|---|---|---|---|
| **Paysage (Landscape)** | 16:9 | 1920 × 1080 | 3840 × 2160 | YouTube, Site Web, Démo client, LinkedIn, Présentation | −16 LUFS |
| **Vertical (Story / Reel)** | 9:16 | 1080 × 1920 | 2160 × 3840 | TikTok, Instagram Reels, YouTube Shorts, WhatsApp Status | −14 LUFS |
| **Carré (Square)** | 1:1 | 1080 × 1080 | 2160 × 2160 | Feed Instagram, Facebook, LinkedIn post carré | −14 LUFS |
| **Portrait Feed** | 4:5 | 1080 × 1350 | — | Instagram Feed (optimisation de surface d'écran) | −14 LUFS |

---

## 2. Zones de sécurité (Safe Zones)

### A. Vertical 9:16 (TikTok, Reels, Shorts)
Les applications mobiles superposent de nombreux éléments interactifs (boutons d'action, description de profil, musique, barre de navigation, icônes système).

- **Haut de l'écran** : laisser au moins **250 px libres** (caméra frontale / punch hole, onglets « Pour toi » / « Abonnements »).
- **Bas de l'écran** : laisser au moins **380 px libres** (zone de description, pseudo, bouton son, zone de sous-titres natifs).
- **Côté droit** : laisser **120 px libres** sur les 60 % inférieurs (boutons Like, Commentaire, Partage, Profil).
- **Côté gauche** : laisser au moins **60 px** de marge intérieure.
- **Zone utile garantie** : boîte centrale `960 × 1290 px`.

```
+------------------------------------+
|        HAUT LIBRE (250 px)         |
+------------------------------------+
|                                    |
|         ZONE SÉCURISÉE             |  BOUTONS
|            CENTRALE                |  INTERACTIFS
|          (960 × 1290)              |  (120 px)
|                                    |
+------------------------------------+
|        BAS LIBRE (380 px)          |
|    (Description, Musique, CTA)     |
+------------------------------------+
```

### B. Paysage 16:9 (1920 × 1080)
- **Marges de sécurité globales** : 100 à 120 px de chaque côté (Action Safe / Title Safe 90%).
- **Zone basse sous-titres** : toujours réserver **120 px libres en bas** si des sous-titres sont affichés.
- **Éléments interactifs YouTube** : attention aux overlays YouTube (cartes de fin de vidéo, logo de chaîne en bas à droite).

### C. Carré 1:1 (1080 × 1080)
- Marge périphérique homogène de **80 px**.
- Centrage visuel et optique obligatoire.

---

## 3. Adaptations de code dans Remotion

Dans `src/Root.tsx`, déclarer les compositions cibles :

```tsx
<Composition id="Film" component={Film} width={1920} height={1080} fps={30} durationInFrames={TOTAL} />
<Composition id="FilmVertical" component={Film} width={1080} height={1920} fps={30} durationInFrames={TOTAL} />
<Composition id="FilmSquare" component={Film} width={1080} height={1080} fps={30} durationInFrames={TOTAL} />
```

Dans les scènes ou composants UI, détecter l'orientation :

```tsx
import { useVideoConfig } from 'remotion';

export const MyScene: React.FC = () => {
  const { width, height } = useVideoConfig();
  const isVertical = height > width;
  const isSquare = width === height;

  const titleSize = isVertical ? 64 : 96;
  const paddingX = isVertical ? 60 : 120;
  const paddingBottom = isVertical ? 380 : 120;

  return (
    <AbsoluteFill style={{ paddingLeft: paddingX, paddingRight: paddingX, paddingBottom }}>
      {/* Contenu responsive */}
    </AbsoluteFill>
  );
};
```
