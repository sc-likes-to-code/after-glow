import { AtelierConfiguration, DEFAULT_ATELIER_CONFIG, CustomTheme, CustomThemeSchema, ThemeExportPackageSchema } from '@/types/atelier';
import { THEMES } from './themes';
import { ThemeId } from '@/types/theme';

export const ATELIER_STORAGE_KEY = 'afterglow_atelier_active_config';
export const ATELIER_CUSTOM_THEMES_KEY = 'afterglow_custom_themes_list';

/**
 * Generates an inline SVG data URI for textures and patterns
 */
export function getTextureOrPatternSvg(type: string, color: string = '#55483F', opacity: number = 0.12): string {
  let svgContent = '';

  switch (type) {
    case 'paper':
      // Subtle fiber and grain noise
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/></filter><rect width="80" height="80" filter="url(#n)" opacity="${opacity * 0.7}"/></svg>`;
      break;

    case 'linen':
      // Cross-weave pattern
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M0 10h20M10 0v20" stroke="${color}" stroke-width="0.7" opacity="${opacity}" fill="none"/></svg>`;
      break;

    case 'canvas':
      // Diagonal fabric weave
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M0 0l16 16M16 0L0 16" stroke="${color}" stroke-width="0.6" opacity="${opacity * 0.9}" fill="none"/></svg>`;
      break;

    case 'grain':
      // Fine fleck grain
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><circle cx="10" cy="15" r="0.7" fill="${color}" opacity="${opacity}"/><circle cx="35" cy="40" r="0.6" fill="${color}" opacity="${opacity * 0.8}"/><circle cx="50" cy="20" r="0.8" fill="${color}" opacity="${opacity}"/><circle cx="20" cy="50" r="0.7" fill="${color}" opacity="${opacity * 0.9}"/><circle cx="45" cy="5" r="0.6" fill="${color}" opacity="${opacity * 0.7}"/></svg>`;
      break;

    case 'vintage-parchment':
      // Aged paper stains and flecks
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><path d="M10 20 Q 30 10 50 30 T 90 20 T 110 50" stroke="${color}" stroke-width="0.5" fill="none" opacity="${opacity * 0.5}"/><circle cx="25" cy="80" r="1.5" fill="${color}" opacity="${opacity * 0.6}"/><circle cx="95" cy="90" r="1.2" fill="${color}" opacity="${opacity * 0.6}"/><circle cx="65" cy="45" r="0.8" fill="${color}" opacity="${opacity * 0.5}"/></svg>`;
      break;

    case 'flowers':
      // Little five-petal hand-drawn botanical blossom
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M12 9a3 3 0 100 6 3 3 0 000-6z" fill="${color}" opacity="${opacity * 0.8}"/><circle cx="12" cy="5" r="2.2" fill="${color}" opacity="${opacity}"/><circle cx="12" cy="19" r="2.2" fill="${color}" opacity="${opacity}"/><circle cx="5" cy="12" r="2.2" fill="${color}" opacity="${opacity}"/><circle cx="19" cy="12" r="2.2" fill="${color}" opacity="${opacity}"/></svg>`;
      break;

    case 'stars':
      // Delicate four-pointed celestial sparkles
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12 2l1.8 7.2L21 11l-7.2 1.8L12 20l-1.8-7.2L3 11l7.2-1.8z" fill="${color}" opacity="${opacity}"/></svg>`;
      break;

    case 'polka-dots':
      // Gentle rounded dots
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="2" fill="${color}" opacity="${opacity}"/></svg>`;
      break;

    case 'botanical-leaves':
      // Tiny leafy sprig
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path d="M6 18c4-4 9-5 13-5-1 4-2 9-6 13M12 12c-2-3-2-6 0-8 3 0 5 2 4 5M15 15c2 2 5 2 7 0 0-3-2-5-5-4" stroke="${color}" stroke-width="1.2" fill="none" opacity="${opacity}"/></svg>`;
      break;

    case 'clouds':
      // Soft puffy cloud motif
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24"><path d="M6.5 17h11a3.5 3.5 0 00.5-6.9 4.5 4.5 0 00-8.5-1.5A3.5 3.5 0 006.5 17z" stroke="${color}" stroke-width="1" fill="none" opacity="${opacity}"/></svg>`;
      break;

    case 'hearts':
      // Tiny scrapbook heart outline
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${color}" opacity="${opacity}"/></svg>`;
      break;

    case 'geometric':
      // Subtle vintage art-deco diamond lattice
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"><path d="M15 0L30 15L15 30L0 15Z" stroke="${color}" stroke-width="0.6" fill="none" opacity="${opacity}"/></svg>`;
      break;

    default:
      svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><circle cx="12" cy="12" r="1" fill="${color}" opacity="${opacity}"/></svg>`;
  }

  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}")`;
}

/**
 * Completely applies the AtelierConfiguration to the live DOM:
 * sets data-* attributes, computes custom CSS properties, updates backgrounds, typography, cards, and density.
 */
export function applyAtelierConfigToDOM(config: AtelierConfiguration): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  const baseThemeId = (config.themeId as ThemeId) || 'vanilla-dreams';
  const baseTheme = THEMES[baseThemeId] || THEMES['vanilla-dreams'];

  // 1. Root data attributes
  root.setAttribute('data-theme', baseThemeId);
  root.setAttribute('data-font-pairing', config.typography.pairingId);
  root.setAttribute('data-card-style', config.card.style);
  root.setAttribute('data-bg-style', config.background.mode);
  root.setAttribute('data-decor-style', config.decorations.style);
  root.setAttribute('data-density', config.layout.density);
  root.setAttribute('data-nav-style', config.layout.navStyle);
  root.setAttribute('data-button-shape', config.components.buttonShape);
  root.setAttribute('data-radius-system', config.layout.borderRadiusSystem);

  if (config.identity?.badgeSymbol) {
    root.style.setProperty('--ag-badge-symbol', `"${config.identity.badgeSymbol}"`);
  } else {
    root.style.removeProperty('--ag-badge-symbol');
  }

  // 2. Custom Color Palette Overrides
  const colors = config.colors || {};

  // Backgrounds & Surfaces
  if (colors.bg) root.style.setProperty('--ag-bg', colors.bg);
  else root.style.removeProperty('--ag-bg');

  if (colors.surface) root.style.setProperty('--ag-surface', colors.surface);
  else root.style.removeProperty('--ag-surface');

  if (colors.surfaceElevated) root.style.setProperty('--ag-surface-elevated', colors.surfaceElevated);
  else root.style.removeProperty('--ag-surface-elevated');

  if (colors.cardBg) root.style.setProperty('--ag-card-bg', colors.cardBg);
  else root.style.removeProperty('--ag-card-bg');

  if (colors.sidebarBg) root.style.setProperty('--ag-nav-bg', colors.sidebarBg);
  else root.style.removeProperty('--ag-nav-bg');

  if (colors.inputBg) root.style.setProperty('--ag-input-bg', colors.inputBg);
  else root.style.removeProperty('--ag-input-bg');

  // Typography Text Colors
  if (colors.primaryText) root.style.setProperty('--ag-primary-text', colors.primaryText);
  else root.style.removeProperty('--ag-primary-text');

  if (colors.secondaryText) root.style.setProperty('--ag-secondary-text', colors.secondaryText);
  else root.style.removeProperty('--ag-secondary-text');

  if (colors.mutedText) root.style.setProperty('--ag-muted-text', colors.mutedText);
  else root.style.removeProperty('--ag-muted-text');

  // Accents & Buttons
  if (colors.accentPrimary) {
    root.style.setProperty('--ag-accent-primary', colors.accentPrimary);
    root.style.setProperty('--ag-accent-hover', colors.accentHover || adjustBrightness(colors.accentPrimary, -15));
  } else {
    root.style.removeProperty('--ag-accent-primary');
    root.style.removeProperty('--ag-accent-hover');
  }

  if (colors.accentSecondary) root.style.setProperty('--ag-accent-secondary', colors.accentSecondary);
  else root.style.removeProperty('--ag-accent-secondary');

  if (colors.border) root.style.setProperty('--ag-border', colors.border);
  else root.style.removeProperty('--ag-border');

  if (colors.borderSubtle) root.style.setProperty('--ag-border-subtle', colors.borderSubtle);
  else root.style.removeProperty('--ag-border-subtle');

  // 3. Background Engine (Solid, Gradient, Texture, Pattern, Custom Image)
  const bgMode = config.background.mode;
  const currentAccent = colors.accentPrimary || baseTheme.palette.accentPrimary;
  const currentMuted = colors.mutedText || baseTheme.palette.mutedText;

  if (bgMode === 'gradient') {
    const grad = config.gradient.enabled ? config.gradient : config.background.gradient;
    if (grad && grad.stops && grad.stops.length > 0) {
      const stopList = grad.stops.map((s) => `${s.color} ${s.offset}%`).join(', ');
      const gradCss = grad.type === 'linear'
        ? `linear-gradient(${grad.angle}deg, ${stopList})`
        : `radial-gradient(circle at center, ${stopList})`;
      document.body.style.backgroundImage = gradCss;
      document.body.style.backgroundAttachment = 'fixed';
    }
  } else if (bgMode === 'texture') {
    const texSvg = getTextureOrPatternSvg(config.background.texture, currentMuted, 0.12);
    document.body.style.backgroundImage = texSvg;
    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundSize = 'auto';
  } else if (bgMode === 'pattern') {
    const patSvg = getTextureOrPatternSvg(config.background.pattern, currentAccent, config.background.patternOpacity || 0.15);
    document.body.style.backgroundImage = patSvg;
    document.body.style.backgroundRepeat = 'repeat';
    document.body.style.backgroundSize = 'auto';
  } else if (bgMode === 'image' && config.background.image?.dataUrl) {
    const imgCfg = config.background.image;
    document.body.style.backgroundImage = `url("${imgCfg.dataUrl}")`;
    document.body.style.backgroundSize = imgCfg.repeat === 'cover' ? 'cover' : `${imgCfg.scale}%`;
    document.body.style.backgroundPosition = imgCfg.position;
    document.body.style.backgroundRepeat = imgCfg.repeat;
    document.body.style.backgroundAttachment = 'fixed';
  } else {
    // Solid background
    document.body.style.backgroundImage = 'none';
  }

  // 4. Memory Card Custom Properties
  if (config.card.borderRadius !== undefined) {
    root.style.setProperty('--ag-card-radius', `${config.card.borderRadius}px`);
  }
  if (config.card.borderWidth !== undefined) {
    root.style.setProperty('--ag-card-border-width', `${config.card.borderWidth}px`);
  }
  if (config.card.borderColor) {
    root.style.setProperty('--ag-card-border-color', config.card.borderColor);
  } else {
    root.style.removeProperty('--ag-card-border-color');
  }

  // Shadow intensity
  const shadowMap: Record<string, string> = {
    none: 'none',
    subtle: '0 2px 8px -2px rgba(0,0,0,0.05)',
    soft: '0 6px 18px -3px rgba(0,0,0,0.08)',
    dramatic: '0 12px 28px -4px rgba(0,0,0,0.18)',
  };
  if (config.card.shadowIntensity) {
    root.style.setProperty('--ag-card-shadow', shadowMap[config.card.shadowIntensity] || shadowMap.soft);
  }

  // 5. Layout Widths & Density
  const sidebarWidthMap = {
    compact: '220px',
    normal: '256px',
    wide: '290px',
  };
  root.style.setProperty('--ag-sidebar-width', sidebarWidthMap[config.layout.sidebarWidth] || '256px');

  const contentWidthMap = {
    narrow: '900px',
    normal: '1152px',
    wide: '1360px',
    full: '100%',
  };
  root.style.setProperty('--ag-content-max-width', contentWidthMap[config.layout.contentMaxWidth] || '1152px');

  // 6. Typography Scale & Weights
  const headingScaleMap = {
    compact: '0.9',
    normal: '1.0',
    expressive: '1.15',
  };
  root.style.setProperty('--ag-heading-scale', headingScaleMap[config.typography.headingScale] || '1.0');

  // Persist into localStorage for zero-flash startup
  try {
    if (config.themeId) {
      localStorage.setItem('afterglow_active_theme_id', config.themeId);
    }
    localStorage.setItem(ATELIER_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to persist active atelier configuration to localStorage:', e);
  }
}

/**
 * Reads the active AtelierConfiguration from localStorage, falling back to defaults.
 */
export function getStoredAtelierConfig(): AtelierConfiguration {
  if (typeof window === 'undefined') return DEFAULT_ATELIER_CONFIG;

  try {
    const raw = localStorage.getItem(ATELIER_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_ATELIER_CONFIG,
        ...parsed,
        colors: { ...DEFAULT_ATELIER_CONFIG.colors, ...parsed.colors },
        typography: { ...DEFAULT_ATELIER_CONFIG.typography, ...parsed.typography },
        background: { ...DEFAULT_ATELIER_CONFIG.background, ...parsed.background },
        card: { ...DEFAULT_ATELIER_CONFIG.card, ...parsed.card },
        decorations: { ...DEFAULT_ATELIER_CONFIG.decorations, ...parsed.decorations },
        layout: { ...DEFAULT_ATELIER_CONFIG.layout, ...parsed.layout },
        components: { ...DEFAULT_ATELIER_CONFIG.components, ...parsed.components },
        calendarTimeline: { ...DEFAULT_ATELIER_CONFIG.calendarTimeline, ...parsed.calendarTimeline },
        homepage: { ...DEFAULT_ATELIER_CONFIG.homepage, ...parsed.homepage },
        identity: { ...DEFAULT_ATELIER_CONFIG.identity, ...parsed.identity },
      };
    }
  } catch (e) {
    // Ignore error
  }

  return DEFAULT_ATELIER_CONFIG;
}

/**
 * Exports a theme as a formatted JSON package
 */
export function exportThemeToJson(theme: CustomTheme): string {
  const exportPackage = {
    app: 'AFTERGLOW',
    kind: 'custom-theme',
    version: 1,
    exportedAt: new Date().toISOString(),
    theme,
  };
  return JSON.stringify(exportPackage, null, 2);
}

/**
 * Validates and imports a custom theme from a JSON string using Zod schema
 */
export function importThemeFromJson(jsonString: string): {
  success: boolean;
  theme?: CustomTheme;
  error?: string;
} {
  try {
    const parsed = JSON.parse(jsonString);

    // Support both wrapped export packages and bare theme JSON objects
    const candidateTheme = parsed.kind === 'custom-theme' && parsed.theme ? parsed.theme : parsed;

    const validation = CustomThemeSchema.safeParse(candidateTheme);

    if (!validation.success) {
      const issues = validation.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
      return {
        success: false,
        error: `Theme format is invalid (${issues})`,
      };
    }

    const validTheme: CustomTheme = {
      ...validation.data,
      id: validation.data.id.startsWith('custom-') ? validation.data.id : `custom-${Date.now()}`,
      updatedAt: Date.now(),
      config: validation.data.config as AtelierConfiguration,
    };

    return {
      success: true,
      theme: validTheme,
    };
  } catch (e) {
    return {
      success: false,
      error: `Could not parse JSON: ${(e as Error).message}`,
    };
  }
}

/**
 * Adjust hex color brightness by percentage
 */
function adjustBrightness(hex: string, percent: number): string {
  const cleanHex = hex.replace('#', '');
  const num = parseInt(cleanHex.length === 3 ? cleanHex.split('').map((c) => c + c).join('') : cleanHex, 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}
