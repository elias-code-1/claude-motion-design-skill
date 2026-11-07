/**
 * tokens.ts — Tokens de design pour le style 'Néo-Brutaliste Papier & Tech' (paper-brutalist-tech)
 * Export prêt pour les compositions Remotion.
 */

export const THEME_PAPER_BRUTALIST_TECH = {
  id: 'paper-brutalist-tech',
  name: 'Néo-Brutaliste Papier & Tech',
  
  // Palette de couleurs
  colors: {
    primary: '#E04434',
    primaryDeep: '#C23324',
    primaryLight: '#FCDCD9',
    primarySoft: '#FDF2F0',
    accent: '#1A1A1A',
    bg: '#F5F2EB',
    gridColor: 'rgba(0, 0, 0, 0.06)',
    surface: '#FFFFFF',
    ink: '#1A1A1A',
    navy: '#2B2B2B',
    mute: '#6B655B',
    line: '#1A1A1A',
  },

  // Style néo-brutaliste
  borders: {
    width: '3px',
    color: '#1A1A1A',
    hardShadow: '4px 4px 0px #1A1A1A',
    radius: '4px',
  },

  // Typographie
  typography: {
    fontFamily: 'Archivo Black, Montserrat, sans-serif',
    fontDisplay: 'Archivo Black, sans-serif',
    fontSlug: 'archivo-black',
    sizes: {
      titleHero: 110,
      titleScene: 84,
      subtitle: 40,
      body: 30,
      badge: 22,
    },
    weights: {
      regular: 400,
      medium: 500,
      bold: 700,
      black: 900,
    },
  },

  // Paramètres Spring Remotion
  springs: {
    pop: { damping: 10, stiffness: 240, mass: 0.5 },
    soft: { damping: 18, stiffness: 130, mass: 0.9 },
    snappy: { damping: 8, stiffness: 280, mass: 0.4 },
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

export type ThemeTokens = typeof THEME_PAPER_BRUTALIST_TECH;
export default THEME_PAPER_BRUTALIST_TECH;
