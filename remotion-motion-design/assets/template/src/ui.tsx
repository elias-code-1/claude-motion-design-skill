import React from 'react';
import {Audio, Easing, Img, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {BRAND_NAME, C, CUTS, FONT, SHADOW_SM} from './theme';
import {clampOpts, lerp, out, p, rnd} from './anim';

/* ═════════ SFX : un son = une <Sequence> placée sur la frame de l'événement visuel ═════════ */
export const Sfx: React.FC<{at: number; name: string; vol?: number}> = ({at, name, vol = 0.8}) => (
  <Sequence from={Math.max(0, Math.round(at))} layout="none">
    <Audio src={staticFile(`audio/sfx/${name}.wav`)} volume={vol} />
  </Sequence>
);

/* ═════════ Fonds animés (jamais statiques : ça "vit" sans distraire) ═════════ */
export const Bg: React.FC<{dark?: boolean; tint?: string}> = ({dark, tint}) => {
  const f = useCurrentFrame();
  const a = Math.sin(f / 70);
  const b = Math.cos(f / 90);
  const blob = (size: number, style: React.CSSProperties, color: string) => (
    <div style={{position: 'absolute', width: size, height: size, borderRadius: '50%', background: `radial-gradient(circle, ${color} 0%, transparent 65%)`, ...style}} />
  );
  if (dark) {
    return (
      <div style={{position: 'absolute', inset: 0, background: C.navy, overflow: 'hidden'}}>
        {blob(1400, {left: 260 + a * 60, top: -420 + b * 40}, 'rgba(37,99,235,.55)')}
        {blob(900, {left: -200 - a * 50, top: 500}, 'rgba(96,165,250,.22)')}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, #000 20%, transparent 75%)',
          }}
        />
      </div>
    );
  }
  return (
    <div style={{position: 'absolute', inset: 0, background: tint ?? 'linear-gradient(160deg, #F8FBFE 0%, #EEF4FD 60%, #E6EFFD 100%)', overflow: 'hidden'}}>
      {blob(1100, {right: -260 + a * 40, top: -380 + b * 30}, 'rgba(37,99,235,.14)')}
      {blob(800, {left: -240 - b * 30, bottom: -300}, 'rgba(96,165,250,.16)')}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(15,23,42,.08) 1.2px, transparent 1.2px)',
          backgroundSize: '44px 44px',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 45%, #000 10%, transparent 72%)',
        }}
      />
    </div>
  );
};

/** Grain de pellicule + vignette : donne le côté "filmé" qui sépare un motion pro d'un montage PowerPoint. */
export const Finish: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <>
      <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07, mixBlendMode: 'multiply', pointerEvents: 'none'}}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={f % 6} />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1.2 -0.1" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 50%, transparent 62%, rgba(7,11,20,.16) 100%)'}} />
    </>
  );
};

/** Caméra : zoom lent sur toute la durée de la scène. Une scène sans mouvement paraît morte. */
export const Cam: React.FC<{dur: number; from?: number; to?: number; ox?: string; oy?: string; children: React.ReactNode}> = ({dur, from = 1, to = 1.045, ox = '50%', oy = '50%', children}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, dur], [from, to], {...clampOpts, easing: Easing.bezier(0.45, 0, 0.55, 1)});
  return <div style={{position: 'absolute', inset: 0, transform: `scale(${s})`, transformOrigin: `${ox} ${oy}`}}>{children}</div>;
};

/* ═════════ Logo : PNG/SVG transparent révélé en wipe (public/img/logo.svg ou logo.png) ═════════ */
export const LogoMark: React.FC<{height?: number; draw?: number; src?: string}> = ({height = 120, draw = 1, src = 'img/logo.svg'}) => (
  <div
    style={{
      height,
      WebkitMaskImage: `linear-gradient(90deg, #000 ${draw * 100 - 12}%, transparent ${draw * 100 + 2}%)`,
      opacity: Math.min(1, draw * 3),
    }}
  >
    <Img src={staticFile(src)} style={{height: '100%', objectFit: 'contain'}} />
  </div>
);

/* ═════════ Texte : révélation mot par mot (flou + montée + fondu) ═════════ */
export const WordReveal: React.FC<{text: string; start?: number; step?: number; size?: number; color?: string; accentWords?: number[]; accent?: string; weight?: number; align?: 'left' | 'center'}> = ({
  text,
  start = 0,
  step = 5,
  size = 96,
  color = C.ink,
  accentWords = [],
  accent = C.primary,
  weight = 800,
  align = 'center',
}) => {
  const f = useCurrentFrame();
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: `0 ${size * 0.25}px`, justifyContent: align === 'center' ? 'center' : 'flex-start', fontFamily: FONT, fontSize: size, fontWeight: weight, letterSpacing: -size * 0.035, lineHeight: 1.05}}>
      {text.split(' ').map((w, i) => {
        const t = p(f, start + i * step, 22);
        return (
          <span key={i} style={{display: 'inline-block', opacity: t, transform: `translateY(${(1 - t) * size * 0.6}px)`, filter: `blur(${(1 - t) * 14}px)`, color: accentWords.includes(i) ? accent : color}}>
            {w}
          </span>
        );
      })}
    </div>
  );
};

/** Compteur animé (ex: 0 → 10 590). Format français par défaut. */
export const Counter: React.FC<{to: number; start: number; dur?: number; suffix?: string; style?: React.CSSProperties}> = ({to, start, dur = 36, suffix = '', style}) => {
  const f = useCurrentFrame();
  const v = Math.round(to * p(f, start, dur, (t) => 1 - Math.pow(1 - t, 3)));
  return <span style={style}>{v.toLocaleString('fr-FR').replace(/[\u202f\u00a0]/g, ' ')}{suffix}</span>;
};

/** Pastille flottante (bénéfices, badges, "notifications"). */
export const Chip: React.FC<{icon?: React.ReactNode; label: string; size?: number; style?: React.CSSProperties}> = ({icon, label, size = 30, style}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: size * 0.5, padding: `${size * 0.42}px ${size * 0.7}px ${size * 0.42}px ${size * 0.42}px`, background: '#fff', borderRadius: 999, boxShadow: SHADOW_SM, fontFamily: FONT, fontWeight: 600, fontSize: size * 0.72, color: C.ink, whiteSpace: 'nowrap', ...style}}>
    {icon && <div style={{width: size * 1.35, height: size * 1.35, borderRadius: '50%', background: C.primarySoft, color: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>}
    {label}
  </div>
);

/* ═════════ Curseur animé : trajectoire en arc + ripple au clic + léger "press" ═════════ */
export const Cursor: React.FC<{keys: [number, number, number][]; clicks?: number[]; scale?: number}> = ({keys, clicks = [], scale = 1.6}) => {
  const f = useCurrentFrame();
  let x = keys[0][1];
  let y = keys[0][2];
  for (let i = 0; i < keys.length - 1; i++) {
    const [f0, x0, y0] = keys[i];
    const [f1, x1, y1] = keys[i + 1];
    if (f >= f0 && f <= f1) {
      const t = Easing.bezier(0.45, 0, 0.2, 1)((f - f0) / Math.max(1, f1 - f0));
      x = lerp(x0, x1, t);
      y = lerp(y0, y1, t) - Math.sin(t * Math.PI) * 18;
    } else if (f > f1) {
      x = x1;
      y = y1;
    }
  }
  const appear = p(f, keys[0][0] - 8, 8);
  const press = clicks.reduce((m, c) => Math.max(m, 1 - Math.min(1, Math.abs(f - (c + 2)) / 4)), 0);
  return (
    <div style={{position: 'absolute', left: 0, top: 0, transform: `translate(${x}px, ${y}px)`, opacity: appear, zIndex: 50, pointerEvents: 'none'}}>
      {clicks.map((c, i) => {
        const t = p(f, c, 16, out);
        return t > 0 && t < 1 ? <div key={i} style={{position: 'absolute', left: -30, top: -30, width: 60, height: 60, borderRadius: '50%', border: `3px solid ${C.primary}`, opacity: 1 - t, transform: `scale(${0.3 + t * 1.3})`}} /> : null;
      })}
      <svg width={26 * scale} height={30 * scale} viewBox="0 0 26 30" style={{transform: `scale(${1 - press * 0.12})`, filter: 'drop-shadow(0 3px 6px rgba(15,23,42,.35))'}}>
        <path d="M3 2 L3 23 L8.5 18 L12.5 27 L16 25.5 L12 16.8 L19.5 16.5 Z" fill="#0F172A" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

/** Fenêtre qui se redresse en 3D (perspective) : pour montrer un écran d'app avec de la profondeur. */
export const Tilt3D: React.FC<{start?: number; dur?: number; children: React.ReactNode}> = ({start = 4, dur = 50, children}) => {
  const f = useCurrentFrame();
  const s = p(f, start, dur, Easing.bezier(0.65, 0, 0.35, 1));
  return (
    <div style={{perspective: 2600}}>
      <div style={{transform: `rotateX(${(1 - s) * 16 + 1.5}deg) rotateY(${(1 - s) * -14 - 1.5 + Math.sin(f / 40) * 0.6}deg) scale(${0.82 + s * 0.18})`, opacity: p(f, start, 18)}}>{children}</div>
    </div>
  );
};

/** Particules qui montent (fonds sombres / outro). Déterministe grâce à rnd(). */
export const Particles: React.FC<{count?: number; color?: string}> = ({count = 34, color = C.primaryLight}) => {
  const f = useCurrentFrame();
  return (
    <>
      {Array.from({length: count}).map((_, i) => {
        const x = rnd(i) * 1920;
        const sp = 0.6 + rnd(i + 3) * 1.4;
        const y = 1160 - ((f * sp * 2.2 + rnd(i + 7) * 1400) % 1300);
        const s = 4 + rnd(i + 11) * 8;
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%', background: color, opacity: 0.18 + rnd(i + 5) * 0.4}} />;
      })}
    </>
  );
};

/* ═════════ Transition "sweep" : bandeau diagonal qui masque le cut entre 2 scènes ═════════
   Le cut réel a lieu à la frame centrale (t = 0.5) quand l'écran est 100 % couvert.            */
const SweepInner: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 36;
  const e = Easing.bezier(0.7, 0, 0.3, 1);
  const x = (tt: number) => interpolate(e(Math.min(1, Math.max(0, tt))), [0, 1], [-108, 62]);
  const common: React.CSSProperties = {position: 'absolute', top: -80, bottom: -80, left: 0, width: '170%', transform: 'skewX(-14deg)'};
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 100, pointerEvents: 'none'}}>
      <div style={{...common, background: C.navy, translate: `${x(t - 0.09)}% 0`}} />
      <div style={{...common, background: `linear-gradient(90deg, ${C.primaryDeep}, ${C.primary} 60%, ${C.primaryLight})`, translate: `${x(t)}% 0`, boxShadow: '0 0 120px rgba(96,165,250,.6)'}} />
    </div>
  );
};

export const Sweeps: React.FC = () => (
  <>
    {CUTS.map((c) => (
      <Sequence key={c} from={c - 18} durationInFrames={36} layout="none">
        <SweepInner />
        <Sfx at={0} name="whoosh" vol={0.7} />
      </Sequence>
    ))}
  </>
);

export const BrandWord: React.FC<{size?: number; dark?: boolean}> = ({size = 60, dark}) => (
  <div style={{fontFamily: FONT, fontWeight: 800, fontSize: size, letterSpacing: -size * 0.03, color: dark ? '#fff' : C.ink}}>{BRAND_NAME}</div>
);
