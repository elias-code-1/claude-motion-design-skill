/**
 * tokens.ts — Tokens de design pour le style 'Infographic Bleu & Données' (infographic-bleu)
 * Export prêt pour les compositions Remotion.
 */

export const THEME_INFOGRAPHIC_BLEU = {
  id: 'infographic-bleu',
  name: 'Infographic Bleu & Données',
  
  // Palette de couleurs
  colors: {
    primary: '#1E40AF',
    primaryDeep: '#1E3A8A',
    primaryLight: '#93C5FD',
    primarySoft: '#EFF6FF',
    accent: '#0D9488',
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    ink: '#0F172A',
    navy: '#1E293B',
    mute: '#64748B',
    line: '#CBD5E1',
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
    pop: { damping: 15, stiffness: 170, mass: 0.7 },
    soft: { damping: 22, stiffness: 100, mass: 1.1 },
    snappy: { damping: 12, stiffness: 210, mass: 0.6 },
  },

  // Durées en frames (base 30 fps)
  timing: {
    enterFrames: 20,
    staggerFrames: 5,
    transitionFrames: 28,
  },

  // Zones de sécurité (Safe Zones)
  safeZones: {
    landscape: { top: 80, bottom: 120, left: 100, right: 100 },
    vertical: { top: 250, bottom: 380, left: 60, right: 120 },
    square: { top: 80, bottom: 80, left: 80, right: 80 },
  },
} as const;

export type ThemeTokens = typeof THEME_INFOGRAPHIC_BLEU;
export default THEME_INFOGRAPHIC_BLEU;
