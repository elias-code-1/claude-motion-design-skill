/**
 * tokens.ts — Tokens de design pour le style 'SaaS Corporate Clair' (saas-clair-fr)
 * Export prêt pour les compositions Remotion.
 */

export const THEME_SAAS_CLAIR_FR = {
  id: 'saas-clair-fr',
  name: 'SaaS Corporate Clair',
  
  // Palette de couleurs
  colors: {
    primary: '#2563EB',
    primaryDeep: '#1D4ED8',
    primaryLight: '#DBEAFE',
    primarySoft: '#EFF6FF',
    accent: '#22C55E',
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    ink: '#0F172A',
    navy: '#1E293B',
    mute: '#64748B',
    line: '#E2E8F0',
  },

  // Typographie
  typography: {
    fontFamily: 'Plus Jakarta Sans, -apple-system, sans-serif',
    fontDisplay: 'Plus Jakarta Sans, sans-serif',
    fontSlug: 'plus-jakarta-sans',
    sizes: {
      titleHero: 110,
      titleScene: 84,
      subtitle: 40,
      body: 28,
      badge: 20,
    },
    weights: {
      regular: 400,
      medium: 500,
      bold: 700,
      black: 800,
    },
  },

  // Paramètres Spring Remotion
  springs: {
    pop: { damping: 12, stiffness: 180, mass: 0.6 },
    soft: { damping: 20, stiffness: 110, mass: 1.0 },
    snappy: { damping: 15, stiffness: 220, mass: 0.5 },
  },

  // Durées en frames (base 30 fps)
  timing: {
    enterFrames: 22,
    staggerFrames: 6,
    transitionFrames: 32,
  },

  // Zones de sécurité (Safe Zones)
  safeZones: {
    landscape: { top: 80, bottom: 120, left: 100, right: 100 },
    vertical: { top: 250, bottom: 380, left: 60, right: 120 },
    square: { top: 80, bottom: 80, left: 80, right: 80 },
  },
} as const;

export type ThemeTokens = typeof THEME_SAAS_CLAIR_FR;
export default THEME_SAAS_CLAIR_FR;
