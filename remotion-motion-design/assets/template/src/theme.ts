// ───────── Identité & timeline : LE fichier à adapter en premier ─────────
export const BRAND_NAME = 'Ma Marque';
export const FPS = 30;
export const W = 1920;
export const H = 1080;

// Police (slug Fontsource). L'init copie les woff2 dans public/fonts. Famille CSS interne : 'Brand'.
export const FONT_SLUG = 'plus-jakarta-sans';
export const FONT_WEIGHTS = [400, 500, 600, 700, 800];
export const FONT = "'Brand', system-ui, sans-serif";

export const C = {
  primary: '#2563EB',
  primaryDeep: '#1D4ED8',
  primaryLight: '#60A5FA',
  primarySoft: '#DBEAFE',
  accent: '#22C55E',
  ink: '#0F172A',
  navy: '#070B14',
  mute: '#64748B',
  mute2: '#94A3B8',
  bg: '#F4F8FB',
  line: '#E2E8F0',
  white: '#FFFFFF',
};

// Timeline ABSOLUE : [début, durée] en frames. Une seule source de vérité.
// Les cuts (transitions) sont déduits automatiquement du début de chaque scène.
export const SCENES = {
  intro: {from: 0, dur: 90},
  content: {from: 90, dur: 150},
  outro: {from: 240, dur: 90},
} as const;

export const TOTAL = Math.max(...Object.values(SCENES).map((s) => s.from + s.dur));
export const CUTS = Object.values(SCENES).slice(1).map((s) => s.from);

export const SHADOW = '0 1px 2px rgba(15,23,42,.04), 0 12px 32px -8px rgba(15,23,42,.10), 0 32px 64px -24px rgba(37,99,235,.14)';
export const SHADOW_SM = '0 1px 2px rgba(15,23,42,.05), 0 8px 24px -10px rgba(15,23,42,.14)';
