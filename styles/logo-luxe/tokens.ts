/**
 * tokens.ts — Tokens de design pour le style 'Logo Luxe Rouge & Or' (logo-luxe)
 * Export prêt pour les compositions Remotion.
 */

export const THEME_LOGO_LUXE = {
  id: 'logo-luxe',
  name: 'Logo Luxe Rouge & Or',
  
  // Palette de couleurs
  colors: {
    primary: '#BE123C',
    primaryDeep: '#881337',
    primaryLight: '#FDA4AF',
    primarySoft: '#4C0519',
    accent: '#F59E0B',
    bg: '#0B0508',
    surface: '#1A0A10',
    ink: '#FFF1F2',
    navy: '#2E0A16',
    mute: '#E2E8F0',
    line: 'rgba(245, 158, 11, 0.25)',
  },

  // Typographie
  typography: {
    fontFamily: 'Cinzel, Cormorant Garamond, serif',
    fontDisplay: 'Playfair Display, serif',
    fontSlug: 'cinzel',
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
    pop: { damping: 18, stiffness: 120, mass: 1.2 },
    soft: { damping: 28, stiffness: 70, mass: 1.5 },
    snappy: { damping: 14, stiffness: 160, mass: 0.9 },
  },

  // Durées en frames (base 30 fps)
  timing: {
    enterFrames: 32,
    staggerFrames: 8,
    transitionFrames: 40,
  },

  // Zones de sécurité (Safe Zones)
  safeZones: {
    landscape: { top: 80, bottom: 120, left: 100, right: 100 },
    vertical: { top: 250, bottom: 380, left: 60, right: 120 },
    square: { top: 80, bottom: 80, left: 80, right: 80 },
  },
} as const;

export type ThemeTokens = typeof THEME_LOGO_LUXE;
export default THEME_LOGO_LUXE;
