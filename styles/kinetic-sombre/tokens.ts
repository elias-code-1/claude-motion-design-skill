/**
 * tokens.ts — Tokens de design pour le style 'Kinetic Typo Sombre & Cosmique' (kinetic-sombre)
 * Export prêt pour les compositions Remotion.
 */

export const THEME_KINETIC_SOMBRE = {
  id: 'kinetic-sombre',
  name: 'Kinetic Typo Sombre & Cosmique',
  
  // Palette de couleurs
  colors: {
    primary: '#F5F5F5',
    primaryDeep: '#E2E8F0',
    primaryLight: '#FFFFFF',
    primarySoft: '#334155',
    accent: '#EF4444',
    bg: '#0D131F',
    surface: '#1E293B',
    ink: '#FFFFFF',
    navy: '#0F172A',
    mute: '#94A3B8',
    line: '#334155',
  },

  // Typographie
  typography: {
    fontFamily: 'Inter, sans-serif',
    fontDisplay: 'Inter, sans-serif',
    fontSlug: 'inter',
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
    pop: { damping: 14, stiffness: 200, mass: 0.8 },
    soft: { damping: 25, stiffness: 90, mass: 1.2 },
    snappy: { damping: 10, stiffness: 250, mass: 0.4 },
  },

  // Durées en frames (base 30 fps)
  timing: {
    enterFrames: 16,
    staggerFrames: 4,
    transitionFrames: 24,
  },

  // Zones de sécurité (Safe Zones)
  safeZones: {
    landscape: { top: 80, bottom: 120, left: 100, right: 100 },
    vertical: { top: 250, bottom: 380, left: 60, right: 120 },
    square: { top: 80, bottom: 80, left: 80, right: 80 },
  },
} as const;

export type ThemeTokens = typeof THEME_KINETIC_SOMBRE;
export default THEME_KINETIC_SOMBRE;
