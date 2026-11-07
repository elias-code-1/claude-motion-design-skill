# Remotion Motion Design Patterns

Patrons de conception React & Remotion éprouvés pour des animations fluides et modulaires.

---

## 1. Intégration des Tokens de Style

Chaque projet importe ses tokens de style depuis la bibliothèque `styles/` :

```tsx
import { THEME_SAAS_CLAIR_FR as theme } from '../styles/saas-clair-fr/tokens';

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 24,
        padding: 32,
        border: `1px solid ${theme.colors.line}`,
        boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
      }}
    >
      {children}
    </div>
  );
};
```

---

## 2. Animation par Spring Déterministe

Ne jamais appeler un spring avec une frame négative :

```tsx
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const useClampedSpring = (delayFrames: number, config?: any) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - delayFrames);
  return spring({ frame: localFrame, fps, config });
};
```

---

## 3. Révélation de Texte Mot-par-Mot (Kinetic Word Highlight)

À partir des timestamps générés par `sync_scenes.mjs` :

```tsx
interface WordItem {
  word: string;
  from: number;
  to: number;
}

export const KineticSentence: React.FC<{ words: WordItem[] }> = ({ words }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {words.map((w, idx) => {
        const isActive = frame >= w.from && frame <= w.to;
        const hasPassed = frame > w.to;

        return (
          <span
            key={idx}
            style={{
              color: isActive ? '#2563EB' : hasPassed ? '#0F172A' : '#94A3B8',
              transform: isActive ? 'scale(1.08)' : 'scale(1.0)',
              transition: 'transform 0.1s ease',
              fontWeight: 800,
            }}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
};
```

---

## 4. Caméra Fluide Continue (`Cam`)

Applique un zoom avant continu imperceptible pour maintenir le dynamisme visuel :

```tsx
import { interpolate, useCurrentFrame } from 'remotion';

export const Cam: React.FC<{
  dur: number;
  scaleTo?: number;
  children: React.ReactNode;
}> = ({ dur, scaleTo = 1.05, children }) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, dur], [1.0, scaleTo], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
    >
      {children}
    </div>
  );
};
```
