import { z } from 'zod';
import { ThemeId, FontPairingId, CardAppearance, BackgroundStyle, DecorationStyle, InterfaceDensity } from './theme';

// ==========================================
// 1. COLOUR STUDIO TYPES
// ==========================================
export interface CustomColorPalette {
  bg?: string;
  surface?: string;
  surfaceElevated?: string;
  sidebarBg?: string;
  cardBg?: string;
  primaryText?: string;
  secondaryText?: string;
  mutedText?: string;
  accentPrimary?: string;
  accentHover?: string;
  accentSecondary?: string;
  border?: string;
  borderSubtle?: string;
  inputBg?: string;
  buttonBg?: string;
  buttonText?: string;
  decorativeColor?: string;
}

export interface GradientStop {
  color: string;
  offset: number; // 0 to 100
}

export interface GradientConfig {
  enabled: boolean;
  type: 'linear' | 'radial';
  angle: number; // 0 to 360
  stops: GradientStop[];
}

export interface SavedPalette {
  id: string;
  name: string;
  description?: string;
  colors: CustomColorPalette;
}

// ==========================================
// 2. TYPOGRAPHY STUDIO TYPES
// ==========================================
export type TextFontSize = 'small' | 'medium' | 'large';
export type HeadingWeight = 'normal' | 'semibold' | 'bold';
export type LetterSpacing = 'tight' | 'normal' | 'wide';
export type LineHeight = 'tight' | 'normal' | 'relaxed';
export type HeadingScale = 'compact' | 'normal' | 'expressive';

export interface TypographyConfig {
  pairingId: FontPairingId;
  headingFontName: string;
  bodyFontName: string;
  handFontName: string;
  fontSize: TextFontSize;
  headingWeight: HeadingWeight;
  letterSpacing: LetterSpacing;
  lineHeight: LineHeight;
  headingScale: HeadingScale;
  textAlign: 'left' | 'center';
  italicHeadings: boolean;
  decorativeHeadings: boolean;
}

// ==========================================
// 3. BACKGROUND STUDIO TYPES
// ==========================================
export type BackgroundMode = 'solid' | 'gradient' | 'texture' | 'pattern' | 'image';
export type TextureType = 'paper' | 'linen' | 'canvas' | 'grain' | 'vintage-parchment';
export type PatternType = 'flowers' | 'stars' | 'polka-dots' | 'botanical-leaves' | 'clouds' | 'hearts' | 'geometric';

export interface ImageBackgroundConfig {
  dataUrl?: string;
  scale: number; // 50 to 200
  position: 'center' | 'top' | 'bottom' | 'repeat';
  opacity: number; // 0.05 to 1.0
  repeat: 'repeat' | 'no-repeat' | 'cover';
}

export interface BackgroundConfig {
  mode: BackgroundMode;
  solidColor?: string;
  gradient: GradientConfig;
  texture: TextureType;
  pattern: PatternType;
  patternOpacity: number; // 0.05 to 0.8
  image: ImageBackgroundConfig;
}

// ==========================================
// 4. MEMORY CARD DESIGNER TYPES
// ==========================================
export type ExtendedCardStyle =
  | 'polaroid'
  | 'soft-rounded'
  | 'editorial'
  | 'minimal'
  | 'vintage-postcard'
  | 'scrapbook-collage';

export type ShadowIntensity = 'none' | 'subtle' | 'soft' | 'dramatic';
export type RotationIntensity = 'none' | 'subtle' | 'playful';
export type CardPadding = 'compact' | 'comfortable' | 'generous';
export type CardAspectRatio = 'square' | 'portrait' | 'landscape' | 'natural';
export type CardHoverEffect = 'lift' | 'tilt' | 'glow' | 'none';

export interface MemoryCardConfig {
  style: ExtendedCardStyle;
  borderRadius: number; // px 0 to 32
  borderWidth: number; // px 0 to 4
  borderColor?: string;
  shadowIntensity: ShadowIntensity;
  rotationIntensity: RotationIntensity;
  padding: CardPadding;
  aspectRatio: CardAspectRatio;
  imagePosition: 'top' | 'center';
  captionPosition: 'bottom' | 'overlay' | 'hidden';
  titleFont: 'heading' | 'hand' | 'body';
  dateAppearance: 'badge' | 'minimal' | 'postmark';
  moodBadgeAppearance: 'pill' | 'flower-only' | 'hidden';
  hoverEffect: CardHoverEffect;
}

// ==========================================
// 5. DECORATION STUDIO TYPES
// ==========================================
export type DecorationCategory =
  | 'flowers'
  | 'stars'
  | 'hearts'
  | 'butterflies'
  | 'leaves'
  | 'clouds'
  | 'moons'
  | 'sparkles'
  | 'doodles'
  | 'paper-clips'
  | 'washi-tape'
  | 'stamps'
  | 'ribbons'
  | 'botanicals';

export type ExtendedDecorStyle =
  | 'floral'
  | 'botanical'
  | 'celestial'
  | 'vintage-scrapbook'
  | 'minimal'
  | 'playful';

export type DecorIntensity = 'subtle' | 'balanced' | 'rich';

export interface DecorationConfig {
  enabled: boolean;
  style: ExtendedDecorStyle;
  activeCategories: DecorationCategory[];
  intensity: DecorIntensity;
  opacity: number; // 0.1 to 1.0
  scale: number; // 0.5 to 1.5
  customColor?: string;
  floatingAnimation: boolean;
  cornerIllustrations: boolean;
  headingIllustrations: boolean;
  pageDividers: boolean;
  washiTapeEnabled: boolean;
  paperclipsEnabled: boolean;
  stampsEnabled: boolean;
}

// ==========================================
// 6. LAYOUT & NAVIGATION TYPES
// ==========================================
export type SidebarPosition = 'left' | 'right';
export type SidebarWidth = 'compact' | 'normal' | 'wide';
export type NavStyle = 'classic' | 'minimal' | 'floating' | 'top';
export type ContentMaxWidth = 'narrow' | 'normal' | 'wide' | 'full';
export type PagePadding = 'compact' | 'normal' | 'spacious';
export type BorderRadiusSystem = 'sharp' | 'soft' | 'rounded' | 'pill';

export interface LayoutConfig {
  sidebarPosition: SidebarPosition;
  sidebarWidth: SidebarWidth;
  sidebarCollapsible: boolean;
  navStyle: NavStyle;
  contentMaxWidth: ContentMaxWidth;
  pagePadding: PagePadding;
  sectionSpacing: 'compact' | 'normal' | 'relaxed';
  cardSpacing: 'tight' | 'normal' | 'airy';
  density: InterfaceDensity;
  borderRadiusSystem: BorderRadiusSystem;
}

// ==========================================
// 7. COMPONENTS STUDIO TYPES
// ==========================================
export type ButtonShape = 'pill' | 'rounded' | 'square';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonFill = 'solid' | 'soft' | 'outline';
export type InputBorder = 'subtle' | 'standard' | 'pronounced';
export type InputRadius = 'sharp' | 'rounded' | 'pill';
export type ModalRadius = 'soft' | 'curved' | 'expressive';
export type BadgeShape = 'pill' | 'rounded' | 'flag';
export type IconStyle = 'minimal' | 'delicate' | 'bold';

export interface ComponentsConfig {
  buttonShape: ButtonShape;
  buttonSize: ButtonSize;
  buttonFill: ButtonFill;
  inputBorder: InputBorder;
  inputRadius: InputRadius;
  inputBackground: 'pure' | 'subtle' | 'elevated';
  modalRadius: ModalRadius;
  modalBackdropOpacity: number; // 0.2 to 0.8
  badgeShape: BadgeShape;
  iconStyle: IconStyle;
  controlToggleStyle: 'pill' | 'vintage-switch' | 'minimal';
}

// ==========================================
// 8. CALENDAR & TIMELINE TYPES
// ==========================================
export type WeekStartDay = 'sunday' | 'monday';
export type DateFormatStyle = 'relative' | 'standard' | 'poetic';
export type TimelineLayout = 'masonry' | 'chronological' | 'compact-feed';
export type TimelineConnector = 'solid' | 'dashed' | 'botanical' | 'washi';

export interface CalendarTimelineConfig {
  weekStart: WeekStartDay;
  dateFormat: DateFormatStyle;
  monthHeadingFont: 'heading' | 'hand' | 'body';
  moodIndicators: 'blossom' | 'pill' | 'glow';
  timelineLayout: TimelineLayout;
  timelineConnector: TimelineConnector;
  dateSeparators: 'washi' | 'line' | 'botanical';
  columnCount: 'auto' | 2 | 3 | 4;
  photoDensity: 'compact' | 'balanced' | 'showcase';
  timelineSpacing: 'tight' | 'normal' | 'relaxed';
}

// ==========================================
// 9. HOMEPAGE PERSONALIZATION TYPES
// ==========================================
export interface HomepageSectionVisibility {
  todaysMoments: boolean;
  recentlyRemembered: boolean;
  aLittleWhileAgo: boolean;
  monthlyStory: boolean;
  onThisDay: boolean;
  gentleReminder: boolean;
}

export type HomepageLayout = 'editorial' | 'magazine' | 'scrapbook';

export interface HomepageConfig {
  customGreeting?: string;
  customSubtitle?: string;
  customFooterMessage?: string;
  customIntroQuote?: string;
  customCoverBanner?: string;
  layout: HomepageLayout;
  visibleSections: HomepageSectionVisibility;
  sectionOrder: (keyof HomepageSectionVisibility)[];
  gridDensity: 'compact' | 'comfortable' | 'spacious';
}

// ==========================================
// 10. PERSONAL IDENTITY TYPES
// ==========================================
export interface IdentityConfig {
  displayName: string;
  avatar: string;
  signature?: string;
  badgeSymbol: string;
  greetingMessage?: string;
  appSubtitle: string;
  favoriteAccentColor?: string;
}

// ==========================================
// 11. THE COMPLETE ATELIER CONFIGURATION
// ==========================================
export interface AtelierConfiguration {
  version: number;
  themeId: string; // Base built-in theme ID or 'custom'
  activeCustomThemeId?: string | null;
  colors: CustomColorPalette;
  gradient: GradientConfig;
  typography: TypographyConfig;
  background: BackgroundConfig;
  card: MemoryCardConfig;
  decorations: DecorationConfig;
  layout: LayoutConfig;
  components: ComponentsConfig;
  calendarTimeline: CalendarTimelineConfig;
  homepage: HomepageConfig;
  identity: IdentityConfig;
}

// ==========================================
// CUSTOM SAVED THEME MODEL
// ==========================================
export interface CustomTheme {
  id: string; // e.g. 'custom-123456'
  name: string;
  tagline: string;
  description: string;
  parentThemeId: ThemeId;
  badgeSymbol: string;
  createdAt: number;
  updatedAt: number;
  version: number;
  config: AtelierConfiguration;
}

export type AtelierCategory =
  | 'my-themes'
  | 'colour-studio'
  | 'typography-studio'
  | 'background-studio'
  | 'card-designer'
  | 'decorations-studio'
  | 'layout-navigation'
  | 'components-studio'
  | 'calendar-timeline'
  | 'homepage-studio'
  | 'personal-identity';

// ==========================================
// DEFAULT ATELIER CONFIGURATION
// ==========================================
export const DEFAULT_ATELIER_CONFIG: AtelierConfiguration = {
  version: 1,
  themeId: 'vanilla-dreams',
  activeCustomThemeId: null,
  colors: {},
  gradient: {
    enabled: false,
    type: 'linear',
    angle: 135,
    stops: [
      { color: '#FAF7F0', offset: 0 },
      { color: '#F4EFE6', offset: 100 },
    ],
  },
  typography: {
    pairingId: 'fraunces-nunito',
    headingFontName: 'Fraunces',
    bodyFontName: 'Nunito Sans',
    handFontName: 'Caveat',
    fontSize: 'medium',
    headingWeight: 'bold',
    letterSpacing: 'normal',
    lineHeight: 'normal',
    headingScale: 'normal',
    textAlign: 'left',
    italicHeadings: false,
    decorativeHeadings: true,
  },
  background: {
    mode: 'solid',
    texture: 'paper',
    pattern: 'flowers',
    patternOpacity: 0.15,
    gradient: {
      enabled: false,
      type: 'linear',
      angle: 135,
      stops: [
        { color: '#FAF7F0', offset: 0 },
        { color: '#F4EFE6', offset: 100 },
      ],
    },
    image: {
      scale: 100,
      position: 'center',
      opacity: 0.2,
      repeat: 'cover',
    },
  },
  card: {
    style: 'polaroid',
    borderRadius: 4,
    borderWidth: 1,
    shadowIntensity: 'soft',
    rotationIntensity: 'subtle',
    padding: 'comfortable',
    aspectRatio: 'square',
    imagePosition: 'top',
    captionPosition: 'bottom',
    titleFont: 'heading',
    dateAppearance: 'badge',
    moodBadgeAppearance: 'pill',
    hoverEffect: 'lift',
  },
  decorations: {
    enabled: true,
    style: 'floral',
    activeCategories: ['flowers', 'washi-tape', 'stamps', 'sparkles'],
    intensity: 'balanced',
    opacity: 0.85,
    scale: 1.0,
    floatingAnimation: true,
    cornerIllustrations: true,
    headingIllustrations: true,
    pageDividers: true,
    washiTapeEnabled: true,
    paperclipsEnabled: true,
    stampsEnabled: true,
  },
  layout: {
    sidebarPosition: 'left',
    sidebarWidth: 'normal',
    sidebarCollapsible: false,
    navStyle: 'classic',
    contentMaxWidth: 'normal',
    pagePadding: 'normal',
    sectionSpacing: 'normal',
    cardSpacing: 'normal',
    density: 'comfortable',
    borderRadiusSystem: 'soft',
  },
  components: {
    buttonShape: 'pill',
    buttonSize: 'medium',
    buttonFill: 'solid',
    inputBorder: 'standard',
    inputRadius: 'rounded',
    inputBackground: 'pure',
    modalRadius: 'curved',
    modalBackdropOpacity: 0.45,
    badgeShape: 'pill',
    iconStyle: 'delicate',
    controlToggleStyle: 'pill',
  },
  calendarTimeline: {
    weekStart: 'sunday',
    dateFormat: 'standard',
    monthHeadingFont: 'heading',
    moodIndicators: 'blossom',
    timelineLayout: 'masonry',
    timelineConnector: 'washi',
    dateSeparators: 'washi',
    columnCount: 'auto',
    photoDensity: 'balanced',
    timelineSpacing: 'normal',
  },
  homepage: {
    customGreeting: 'Good morning, sunshine ☀',
    customSubtitle: 'A gentle place for the moments that matter',
    customFooterMessage: 'Some moments are too beautiful to let them fade ♡',
    customIntroQuote: 'We do not remember days, we remember moments.',
    layout: 'scrapbook',
    visibleSections: {
      todaysMoments: true,
      recentlyRemembered: true,
      aLittleWhileAgo: true,
      monthlyStory: true,
      onThisDay: true,
      gentleReminder: true,
    },
    sectionOrder: [
      'todaysMoments',
      'recentlyRemembered',
      'aLittleWhileAgo',
      'monthlyStory',
      'onThisDay',
      'gentleReminder',
    ],
    gridDensity: 'comfortable',
  },
  identity: {
    displayName: 'Dear Soul',
    avatar: 'flower-rose',
    badgeSymbol: '🌸',
    appSubtitle: 'a little place for the moments that matter ♡',
  },
};

// ==========================================
// ZOD VALIDATION SCHEMA FOR IMPORT/EXPORT
// ==========================================
export const CustomThemeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Theme name is required'),
  tagline: z.string().optional().default(''),
  description: z.string().optional().default(''),
  parentThemeId: z.enum([
    'vanilla-dreams',
    'lavender-haze',
    'botanical-garden',
    'peachy-summer',
    'cocoa-letters',
    'midnight-reverie',
    'cloud-nine',
    'rosewater',
  ]),
  badgeSymbol: z.string().default('✨'),
  createdAt: z.number().default(() => Date.now()),
  updatedAt: z.number().default(() => Date.now()),
  version: z.number().default(1),
  config: z.record(z.string(), z.any()),
});

export const ThemeExportPackageSchema = z.object({
  app: z.literal('AFTERGLOW'),
  kind: z.literal('custom-theme'),
  version: z.number(),
  exportedAt: z.string(),
  theme: CustomThemeSchema,
});
