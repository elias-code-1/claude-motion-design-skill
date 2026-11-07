/**
 * tokens.ts — Tokens de design pour le style 'Fenêtres Rétro OS & Productivité' (retro-os-productivity)
 * Export prêt pour les compositions Remotion.
 */

export const THEME_RETRO_OS_PRODUCTIVITY = {
  id: 'retro-os-productivity',
  name: 'Fenêtres Rétro OS & Productivité',
  
  // Palette de couleurs
  colors: {
    primary: '#E04434',
    primaryDeep: '#C23324',
    primaryLight: '#FCDCD9',
    primarySoft: '#FDF2F0',
    accent: '#000000',
    bg: '#F5F2EB',
    gridColor: 'rgba(0, 0, 0, 0.05)',
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
    hardShadow: '5px 5px 0px #1A1A1A',
    radius: '4px',
  },

  // Typographie
  typography: {
    fontFamily: 'Archivo Black, Inter, sans-serif',
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
    pop: { damping: 12, stiffness: 210, mass: 0.6 },
    soft: { damping: 22, stiffness: 100, mass: 1.1 },
    snappy: { damping: 10, stiffness: 250, mass: 0.5 },
  },

  // Durées en frames (base 30 fps)
  timing: {
    enterFrames: 18,
    staggerFrames: 5,
    transitionFrames: 22,
  },

  // Zones de sécurité (Safe Zones)
  safeZones: {
    landscape: { top: 80, bottom: 120, left: 100, right: 100 },
    vertical: { top: 250, bottom: 380, left: 60, right: 120 },
    square: { top: 80, bottom: 80, left: 80, right: 80 },
  },
} as const;

export type ThemeTokens = typeof THEME_RETRO_OS_PRODUCTIVITY;
export default THEME_RETRO_OS_PRODUCTIVITY;
