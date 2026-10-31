import { ThemeCustomization, DEFAULT_THEME_CUSTOMIZATION, ThemeId } from '@/types/theme';
import { THEMES } from './themes';

export const THEME_STORAGE_KEY = 'afterglow_theme_customization';

/**
 * Apply all theme attributes and CSS variable overrides to the DOM root.
 */
export function applyThemeToDOM(customization: ThemeCustomization): void {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;
  const theme = THEMES[customization.themeId] || THEMES['vanilla-dreams'];

  // Apply data attributes
  root.setAttribute('data-theme', customization.themeId);
  root.setAttribute('data-font-pairing', customization.fontPairing);
  root.setAttribute('data-card-style', customization.cardAppearance);
  root.setAttribute('data-bg-style', customization.backgroundStyle);
  root.setAttribute('data-decor-style', customization.decorationStyle);
  root.setAttribute('data-density', customization.density);

  // If a custom accent color is specified, override the primary accent tokens
  if (customization.customAccentColor) {
    root.style.setProperty('--ag-accent-primary', customization.customAccentColor);
    root.style.setProperty('--ag-accent-hover', adjustColorBrightness(customization.customAccentColor, -15));
  } else {
    root.style.removeProperty('--ag-accent-primary');
    root.style.removeProperty('--ag-accent-hover');
  }

  // Persist into localStorage for instantaneous pre-hydration theme application
  try {
    localStorage.setItem('afterglow_active_theme_id', customization.themeId);
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(customization));
  } catch (e) {
    console.error('Failed to save theme customization to localStorage', e);
  }
}

/**
 * Utility to calculate darker or lighter tone for hover states
 */
function adjustColorBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

/**
 * Read the current stored theme customization from localStorage (fallback to defaults)
 */
export function getStoredThemeCustomization(): ThemeCustomization {
  if (typeof window === 'undefined') return DEFAULT_THEME_CUSTOMIZATION;

  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_THEME_CUSTOMIZATION,
        ...parsed,
      };
    }
  } catch (e) {
    // Ignore error
  }

  return DEFAULT_THEME_CUSTOMIZATION;
}
