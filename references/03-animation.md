# 03 — Animation : principes, helpers et recettes

## Sommaire
1. Principes (les 12 principes appliqués au code)
2. Helpers (anim.ts)
3. Tableau des timings (30 fps)
4. Recettes (code) : texte · pop/chips · compteur · graphique · saisie · signature · curseur · 3D · caméra · transition · notification · insertion de ligne · onglets · tampon · flash · particules · aspiration
5. Performance & déterminisme

## 1. Principes

- **Easing expo-out** (`Easing.bezier(0.16,1,0.3,1)`) pour les entrées : départ vif, arrivée douce. `inOut` pour les déplacements d'un point A à B. `inn` (ease-in) pour ce qui **sort/est aspiré**.
- **Stagger** : décale les éléments d'une même famille de 4–9 frames. Jamais tous ensemble.
- **Overshoot** (`pop`, spring peu amorti) pour badges, chips, boutons : sensation d'élasticité.
- **Anticipation / suite** : un bouton s'enfonce (`scale .95`) puis relâche ; un halo s'étend après le clic.
- **Mouvement secondaire** : bobbing des chips (`Math.sin(f/16)`), léger flottement 3D, particules.
- **Flou d'entrée** : `filter: blur((1-t)*14px)` sur le texte qui arrive = effet « mise au point » premium.
- **Arcs** : le curseur ne va pas en ligne droite (sinus latéral).
- **Hiérarchie du mouvement** : un seul élément principal bouge fort à la fois ; le reste est calme.
- **Chaque scène a une caméra** (`Cam`) : zoom lent 1 → 1.045.

## 2. Helpers (`anim.ts`)

```ts
p(f, start, dur, easing=out)   // 0→1 entre start et start+dur (clampé)
pop(f, delay)                  // spring avec overshoot (badges)
soft(f, delay)                 // spring sans rebond (cartes, panneaux)
typed(str, f, start, cps)      // machine à écrire
lerp(a,b,t)  ·  rnd(seed)      // rnd = pseudo-aléatoire DÉTERMINISTE
```
Toujours dériver l'état de `f`. Aucun `useState`.

## 3. Timings (30 fps)

| Action | Durée |
|---|---|
| Entrée d'un élément | 18–24 f |
| Stagger entre éléments | 4–9 f |
| Clic (ripple) | 16 f ; press du bouton ±5 f |
| Compteur de chiffre | 30–40 f (ease-out cubique) |
| Déplacement curseur A→B | 25–50 f |
| Sweep de transition | 36 f (cut au milieu) |
| Texte important : temps de lecture | ≥ 30 f une fois entièrement visible |
| Carte/fenêtre 3D qui se redresse | 40–55 f |
| Machine à écrire | 18–55 caractères/s |

## 4. Recettes

### Révélation de texte par mots (`WordReveal`)
Chaque mot : `opacity=t`, `translateY((1-t)*size*0.6)`, `blur((1-t)*14)`, `t=p(f,start+i*step,22)`. Mot-clé en couleur d'accent via `accentWords={[idx]}`.

### Révélation par lignes avec masque
```tsx
<div style={{overflow:'hidden'}}>
  <div style={{transform:`translateY(${(1-t)*120}%)`}}>Ligne</div>
</div>
```

### Pop de pastilles + flottement
```tsx
const s = pop(f, at);
<div style={{transform:`scale(${s})`, opacity:Math.min(1,s*1.5), top: y + Math.sin(f/16+phase)*10}}>
  <Chip icon={…} label="Suivi en temps réel"/>
</div>
<Sfx at={at} name="pop"/>
```

### Compteur
`<Counter to={10590} start={90} suffix=" FCFA"/>` + une série de `tick` SFX toutes les 3 frames pendant le comptage, puis `ding` à la fin.

### Graphique en barres
Chaque barre : `h = (v/max) * H * p(f, 18+i*6, 30)`. Barre mise en avant : gradient + ombre colorée + étiquette qui compte (`Math.round(v*g)`). Lignes de grille en pointillés.

### Saisie dans un champ
`typed(EMAIL, f, 16, 18)` ; champ « focus » = bordure + halo `0 0 0 6px rgba(…,.12)` tant que `f` est dans la fenêtre de saisie ; caret clignotant `Math.floor(f/8)%2`. Mot de passe : `'•'.repeat(n)` avec `n` fonction de `f`. SFX `tick` ×N (un par ~3 frames).

### Signature / tracé
```tsx
<path d="…" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - progress} strokeLinecap="round"/>
```
Même technique pour dessiner un logo ou une ligne de connexion.

### Curseur (`Cursor`)
`keys=[[frame,x,y],…]` (frames locales), `clicks=[frame…]`. Cale `Sfx click` sur **la même frame** que le clic. **Les coordonnées doivent viser le centre réel de l'élément** : calcule-les depuis la mise en page ou, mieux, rends une image et ajuste. Cible la zone *cliquable*, pas le bord.

### Fenêtre 3D (`Tilt3D`)
`perspective` + `rotateX/rotateY` qui tendent vers ~1.5° + scale 0.82 → 1. Ajoute un léger flottement `Math.sin(f/40)*0.6`.

### Caméra (`Cam`)
Zoom lent par scène ; `from>to` (dézoom) pour une intro. Origine (`ox/oy`) vers la zone d'intérêt pour un push-in dirigé.

### Transition sweep
Deux panneaux inclinés (`skewX(-14deg)`) de 170 % de large, translation de −108 % à +62 % avec `bezier(.7,0,.3,1)`, le second décalé de 0,09. À `t=0.5` l'écran est couvert : c'est là que le cut a lieu (`CUTS`). SFX `whoosh` à `c-18`. Utilise `translate` (propriété CSS séparée) + `transform: skewX` pour éviter les conflits d'ordre.

### Notification / toast
Carte sombre glisse depuis +400 px avec `soft(f, t0)`, SFX `notif`. Sur la même frame +8 : l'élément correspondant apparaît dans la liste.

### Insertion d'une ligne dans une liste
Positions absolues ; ligne nouvelle : `opacity=ins`, `translateX((1-ins)*120)` ; **les autres lignes descendent** de `shift = inOut(clamp((f-t0)/22)) * rowHeight`. Surbrillance bleue qui s'éteint après ~40 f.

### Onglets / panneaux qui changent (`act`)
```ts
const act = (f,i)=> p(f, S[i]-6, 14, inOut) * (1 - (i<last ? p(f, S[i+1]-6, 14, inOut) : 0));
```
Chaque panneau : `opacity=act`, `translateY((1-act)*36)`. L'onglet actif : fond blanc, bordure gauche colorée, titre en couleur. Le curseur clique l'onglet quelques frames **avant** le changement.

### Tampon / validation
`pop(f,t)` + `rotate(-6deg)` + bordure épaisse + texte espacé (« ENVOYÉE ») ; SFX `success`.

### Flash photo
Overlay blanc `opacity = max(0, 1 - |f - t0|/5)` + SFX `shutter`, puis le contenu change (placeholder → photo).

### Particules / étincelles
18 éléments sur un cercle : angle `i/18*2π + rnd(i)*0.4`, distance `p(burst,0,26)*(150+rnd(i+9)*150)`, taille 12–22, opacité `1 - p(...)`, rotation `burst*12`. Déclenche sur l'événement (badge, prix) + SFX `shimmer`/`ding`.

### Aspiration du chaos
Éléments éparpillés (jitter sinusoïdal) puis, sur 20 frames avec `inn` : `translate` vers le centre + `scale → 0` + rotation. SFX `whoosh_rev`. Immédiatement après : **le titre arrive avec un `impact`** — c'est le moment fort de la vidéo.

## 5. Performance & déterminisme

- `filter: blur()` sur de **grandes surfaces** et `backdrop-filter` ralentissent le rendu : limite-les (texte, petites cartes).
- Pas de `Math.random`, pas d'horloge. `rnd(seed)` seulement.
- Préfère `transform`/`opacity` ; évite d'animer `width/height` de gros blocs (ça va, pour des barres).
- Images lourdes : redimensionne (hero ≤ 1700 px de large).
- Beaucoup de petits `<Audio>` (SFX) : OK (plusieurs dizaines), reste raisonnable (< ~150).
