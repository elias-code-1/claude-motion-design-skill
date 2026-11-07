/**
 * tokens.ts — Tokens de design pour le style 'Énergie Vert Social Media' (energie-vert)
 * Export prêt pour les compositions Remotion.
 */

export const THEME_ENERGIE_VERT = {
  id: 'energie-vert',
  name: 'Énergie Vert Social Media',
  
  // Palette de couleurs
  colors: {
    primary: '#22C55E',
    primaryDeep: '#15803D',
    primaryLight: '#86EFAC',
    primarySoft: '#DCFCE7',
    accent: '#FACC15',
    bg: '#0D2E12',
    surface: 'rgba(255, 255, 255, 0.15)',
    ink: '#FFFFFF',
    navy: '#14532D',
    mute: '#BBF7D0',
    line: 'rgba(255, 255, 255, 0.2)',
  },

  // Typographie
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontDisplay: 'Poppins, sans-serif',
    fontSlug: 'poppins',
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
    pop: { damping: 9, stiffness: 240, mass: 0.5 },
    soft: { damping: 16, stiffness: 140, mass: 0.8 },
    snappy: { damping: 8, stiffness: 300, mass: 0.4 },
  },

  // Durées en frames (base 30 fps)
  timing: {
    enterFrames: 14,
    staggerFrames: 3,
    transitionFrames: 18,
  },

  // Zones de sécurité (Safe Zones)
  safeZones: {
    landscape: { top: 80, bottom: 120, left: 100, right: 100 },
    vertical: { top: 250, bottom: 380, left: 60, right: 120 },
    square: { top: 80, bottom: 80, left: 80, right: 80 },
  },
} as const;

export type ThemeTokens = typeof THEME_ENERGIE_VERT;
export default THEME_ENERGIE_VERT;
