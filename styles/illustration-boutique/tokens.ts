/**
 * tokens.ts — Tokens de design pour le style 'Illustration Boutique & PME Afrique' (illustration-boutique)
 * Export prêt pour les compositions Remotion.
 */

export const THEME_ILLUSTRATION_BOUTIQUE = {
  id: 'illustration-boutique',
  name: 'Illustration Boutique & PME Afrique',
  
  // Palette de couleurs
  colors: {
    primary: '#15803D',
    primaryDeep: '#166534',
    primaryLight: '#86EFAC',
    primarySoft: '#F0FDF4',
    accent: '#EAB308',
    bg: '#FAF9F6',
    surface: '#FFFFFF',
    ink: '#1E293B',
    navy: '#0F172A',
    mute: '#64748B',
    line: '#E2E8F0',
  },

  // Typographie
  typography: {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
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
    pop: { damping: 11, stiffness: 210, mass: 0.6 },
    soft: { damping: 20, stiffness: 120, mass: 1.0 },
    snappy: { damping: 9, stiffness: 260, mass: 0.5 },
  },

  // Durées en frames (base 30 fps)
  timing: {
    enterFrames: 18,
    staggerFrames: 5,
    transitionFrames: 26,
  },

  // Zones de sécurité (Safe Zones)
  safeZones: {
    landscape: { top: 80, bottom: 120, left: 100, right: 100 },
    vertical: { top: 250, bottom: 380, left: 60, right: 120 },
    square: { top: 80, bottom: 80, left: 80, right: 80 },
  },
} as const;

export type ThemeTokens = typeof THEME_ILLUSTRATION_BOUTIQUE;
export default THEME_ILLUSTRATION_BOUTIQUE;
