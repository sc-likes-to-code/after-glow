export type ThemeId =
  | 'vanilla-dreams'
  | 'lavender-haze'
  | 'botanical-garden'
  | 'peachy-summer'
  | 'cocoa-letters'
  | 'midnight-reverie'
  | 'cloud-nine'
  | 'rosewater';

export type FontPairingId =
  | 'fraunces-nunito'
  | 'playfair-dmsans'
  | 'cormorant-lato'
  | 'dmserif-manrope'
  | 'lora-nunito';

export type CardAppearance = 'polaroid' | 'soft-rounded' | 'editorial' | 'minimal';
export type BackgroundStyle = 'solid' | 'subtle-gradient' | 'paper-texture';
export type DecorationStyle = 'botanical' | 'celestial' | 'floral' | 'minimal' | 'scrapbook';
export type InterfaceDensity = 'comfortable' | 'compact';

export interface ThemePalette {
  bg: string;
  surface: string;
  surfaceElevated: string;
  primaryText: string;
  secondaryText: string;
  mutedText: string;
  accentPrimary: string;
  accentHover: string;
  accentSecondary: string;
  border: string;
  borderSubtle: string;
  cardBg: string;
  inputBg: string;
  navBg: string;
  washiTape: string;
  washiBorder: string;
  shadow: string;
}

export interface ThemeDefinition {
  id: ThemeId;
  name: string;
  tagline: string;
  description: string;
  isDark?: boolean;
  palette: ThemePalette;
  previewColors: string[];
  recommendedFont: FontPairingId;
  recommendedCardStyle: CardAppearance;
  recommendedDecor: DecorationStyle;
  badgeSymbol: string;
  postmarkCity: string;
}

export interface ThemeCustomization {
  themeId: ThemeId;
  fontPairing: FontPairingId;
  cardAppearance: CardAppearance;
  backgroundStyle: BackgroundStyle;
  decorationStyle: DecorationStyle;
  density: InterfaceDensity;
  customAccentColor?: string;
}

export const DEFAULT_THEME_CUSTOMIZATION: ThemeCustomization = {
  themeId: 'vanilla-dreams',
  fontPairing: 'fraunces-nunito',
  cardAppearance: 'polaroid',
  backgroundStyle: 'solid',
  decorationStyle: 'scrapbook',
  density: 'comfortable',
};
