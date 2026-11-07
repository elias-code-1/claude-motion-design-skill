import {Easing, interpolate, spring} from 'remotion';

export const clampOpts = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const out = Easing.bezier(0.16, 1, 0.3, 1);
export const inOut = Easing.bezier(0.65, 0, 0.35, 1);
export const inn = Easing.bezier(0.7, 0, 0.84, 0);

/** progression 0→1 entre start et start+dur */
export const p = (f: number, start: number, dur: number, easing: (t: number) => number = out) =>
  interpolate(f, [start, start + dur], [0, 1], {...clampOpts, easing});

/** pop avec léger overshoot */
export const pop = (f: number, delay: number, fps = 30) =>
  spring({frame: Math.max(0, f - delay), fps, config: {damping: 11, stiffness: 170, mass: 0.8}});

/** spring doux, sans rebond */
export const soft = (f: number, delay: number, fps = 30) =>
  spring({frame: Math.max(0, f - delay), fps, config: {damping: 200, stiffness: 120}});

export const typed = (s: string, f: number, start: number, cps = 22, fps = 30) =>
  s.slice(0, Math.max(0, Math.min(s.length, Math.floor(((f - start) / fps) * cps))));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** pseudo-random déterministe */
export const rnd = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};
