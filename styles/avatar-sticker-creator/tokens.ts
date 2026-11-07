/**
 * tokens.ts — Tokens de design pour le style 'Avatar Sticker & Grilles Créateur' (avatar-sticker-creator)
 * Export prêt pour les compositions Remotion.
 */

export const THEME_AVATAR_STICKER_CREATOR = {
  id: 'avatar-sticker-creator',
  name: 'Avatar Sticker & Grilles Créateur',
  
  // Palette de couleurs
  colors: {
    primary: '#E04434',
    primaryDeep: '#B82F20',
    primaryLight: '#FCDCD9',
    primarySoft: '#FDF2F0',
    accent: '#2563EB',
    bg: '#F5F2EB',
    gridColor: 'rgba(0, 0, 0, 0.05)',
    surface: '#FFFFFF',
    ink: '#1A1A1A',
    navy: '#2B2B2B',
    mute: '#78716C',
    line: '#1A1A1A',
  },

  // Style néo-brutaliste
  borders: {
    width: '3px',
    color: '#1A1A1A',
    hardShadow: '3px 3px 0px #1A1A1A',
    radius: '4px',
  },

  // Typographie
  typography: {
    fontFamily: 'Montserrat, Poppins, sans-serif',
    fontDisplay: 'Montserrat, sans-serif',
    fontSlug: 'montserrat',
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
    pop: { damping: 11, stiffness: 220, mass: 0.6 },
    soft: { damping: 20, stiffness: 120, mass: 1.0 },
    snappy: { damping: 9, stiffness: 260, mass: 0.5 },
  },

  // Durées en frames (base 30 fps)
  timing: {
    enterFrames: 16,
    staggerFrames: 4,
    transitionFrames: 20,
  },

  // Zones de sécurité (Safe Zones)
  safeZones: {
    landscape: { top: 80, bottom: 120, left: 100, right: 100 },
    vertical: { top: 250, bottom: 380, left: 60, right: 120 },
    square: { top: 80, bottom: 80, left: 80, right: 80 },
  },
} as const;

export type ThemeTokens = typeof THEME_AVATAR_STICKER_CREATOR;
export default THEME_AVATAR_STICKER_CREATOR;
