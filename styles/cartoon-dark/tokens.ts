/**
 * tokens.ts — Tokens de design pour le style 'Cartoon Sombre Storytelling' (cartoon-dark)
 * Export prêt pour les compositions Remotion.
 */

export const THEME_CARTOON_DARK = {
  id: 'cartoon-dark',
  name: 'Cartoon Sombre Storytelling',
  
  // Palette de couleurs
  colors: {
    primary: '#3B82F6',
    primaryDeep: '#1D4ED8',
    primaryLight: '#93C5FD',
    primarySoft: '#1E293B',
    accent: '#EF4444',
    bg: '#0B132B',
    surface: '#1C2541',
    ink: '#FFFFFF',
    navy: '#1E293B',
    mute: '#94A3B8',
    line: '#3A506B',
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
    pop: { damping: 10, stiffness: 220, mass: 0.5 },
    soft: { damping: 18, stiffness: 120, mass: 0.9 },
    snappy: { damping: 8, stiffness: 280, mass: 0.4 },
  },

  // Durées en frames (base 30 fps)
  timing: {
    enterFrames: 18,
    staggerFrames: 4,
    transitionFrames: 22,
  },

  // Zones de sécurité (Safe Zones)
  safeZones: {
    landscape: { top: 80, bottom: 120, left: 100, right: 100 },
    vertical: { top: 250, bottom: 380, left: 60, right: 120 },
    square: { top: 80, bottom: 80, left: 80, right: 80 },
  },
} as const;

export type ThemeTokens = typeof THEME_CARTOON_DARK;
export default THEME_CARTOON_DARK;
