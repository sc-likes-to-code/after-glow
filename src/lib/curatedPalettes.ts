import { SavedPalette } from '@/types/atelier';

export const CURATED_PALETTES: SavedPalette[] = [
  {
    id: 'palette-pastel-stationery',
    name: 'Pastel Stationery',
    description: 'Soft pastel highlighters, cream paper, and gentle peach tones.',
    colors: {
      bg: '#FAF8F5',
      surface: '#F4ECE4',
      surfaceElevated: '#FFFFFF',
      cardBg: '#FFFFFF',
      sidebarBg: '#F4ECE4',
      primaryText: '#4E4239',
      secondaryText: '#7A6B61',
      mutedText: '#A19187',
      accentPrimary: '#E89C92',
      accentHover: '#D5857B',
      accentSecondary: '#F9D8D3',
      border: '#E8DDD4',
      inputBg: '#FFFFFF',
      buttonBg: '#E89C92',
      buttonText: '#FFFFFF',
    },
  },
  {
    id: 'palette-vintage-roses',
    name: 'Vintage Roses',
    description: 'Antique rose petals, faded lace, sepia leaves, and warm parchment.',
    colors: {
      bg: '#FDF7F8',
      surface: '#F6EAEB',
      surfaceElevated: '#FFFFFF',
      cardBg: '#FFFFFF',
      sidebarBg: '#F6EAEB',
      primaryText: '#523B42',
      secondaryText: '#7B5A64',
      mutedText: '#A5838D',
      accentPrimary: '#C97787',
      accentHover: '#B56373',
      accentSecondary: '#F0CCD3',
      border: '#EAD3D7',
      inputBg: '#FFFFFF',
      buttonBg: '#C97787',
      buttonText: '#FFFFFF',
    },
  },
  {
    id: 'palette-botanical-gardens',
    name: 'Botanical Gardens',
    description: 'Earthy moss, sage foliage, quiet greenhouse glass, and fresh eucalyptus.',
    colors: {
      bg: '#F4F7F2',
      surface: '#E7EDE4',
      surfaceElevated: '#FCFDFB',
      cardBg: '#FCFDFB',
      sidebarBg: '#E7EDE4',
      primaryText: '#374730',
      secondaryText: '#546A4B',
      mutedText: '#7D9474',
      accentPrimary: '#6E8B61',
      accentHover: '#5B774E',
      accentSecondary: '#C5D6BD',
      border: '#D0DFCB',
      inputBg: '#FCFDFB',
      buttonBg: '#6E8B61',
      buttonText: '#FFFFFF',
    },
  },
  {
    id: 'palette-lavender-skies',
    name: 'Lavender Skies',
    description: 'Twilight clouds, wisteria haze, soft amethyst, and dreamy stardust.',
    colors: {
      bg: '#F8F5FD',
      surface: '#EFE7FA',
      surfaceElevated: '#FFFFFF',
      cardBg: '#FFFFFF',
      sidebarBg: '#EFE7FA',
      primaryText: '#44365C',
      secondaryText: '#635182',
      mutedText: '#907FAE',
      accentPrimary: '#9577C2',
      accentHover: '#8163AE',
      accentSecondary: '#D9C8F3',
      border: '#E0D2F4',
      inputBg: '#FFFFFF',
      buttonBg: '#9577C2',
      buttonText: '#FFFFFF',
    },
  },
  {
    id: 'palette-warm-sunsets',
    name: 'Warm Sunsets',
    description: 'Golden hour amber, sweet apricot, terracotta roofs, and evening tea.',
    colors: {
      bg: '#FFF8F2',
      surface: '#FDEAE0',
      surfaceElevated: '#FFFFFF',
      cardBg: '#FFFFFF',
      sidebarBg: '#FDEAE0',
      primaryText: '#5A3728',
      secondaryText: '#7E503D',
      mutedText: '#AA7C69',
      accentPrimary: '#E87D5D',
      accentHover: '#D46949',
      accentSecondary: '#F9C9B7',
      border: '#F2D3C4',
      inputBg: '#FFFFFF',
      buttonBg: '#E87D5D',
      buttonText: '#FFFFFF',
    },
  },
  {
    id: 'palette-midnight-skies',
    name: 'Midnight Skies',
    description: 'Deep navy velvet, twilight stars, frosted silver, and quiet ink.',
    colors: {
      bg: '#111522',
      surface: '#1A2033',
      surfaceElevated: '#222940',
      cardBg: '#1A2033',
      sidebarBg: '#151A2B',
      primaryText: '#E6ECF5',
      secondaryText: '#BFCCE0',
      mutedText: '#8797B2',
      accentPrimary: '#9D85E0',
      accentHover: '#B29DF2',
      accentSecondary: '#364063',
      border: '#2A3350',
      inputBg: '#151A2B',
      buttonBg: '#9D85E0',
      buttonText: '#111522',
    },
  },
];

/**
 * Converts a hex code (#RRGGBB) to RGB and HSL strings for visual inspection.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number; text: string } {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(cleanHex.length === 3 ? cleanHex.split('').map((c) => c + c).join('') : cleanHex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return { r, g, b, text: `rgb(${r}, ${g}, ${b})` };
}

export function hexToHsl(hex: string): { h: number; s: number; l: number; text: string } {
  const { r: rRaw, g: gRaw, b: bRaw } = hexToRgb(hex);
  const r = rRaw / 255;
  const g = gRaw / 255;
  const b = bRaw / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);

  return { h: hDeg, s: sPct, l: lPct, text: `hsl(${hDeg}, ${sPct}%, ${lPct}%)` };
}
