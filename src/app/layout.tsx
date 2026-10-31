import type { Metadata, Viewport } from 'next';
import {
  Fraunces,
  Nunito_Sans,
  Caveat,
  Playfair_Display,
  DM_Sans,
  Cormorant_Garamond,
  Lato,
  DM_Serif_Display,
  Manrope,
  Lora,
} from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const nunito = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dmsans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dmserif',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AFTERGLOW — A Little Place for the Moments that Matter',
  description: 'A personal visual diary and vintage scrapbook sanctuary for your cherished memories.',
  applicationName: 'AFTERGLOW',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AFTERGLOW',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF7F0',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Early script to prevent flash of wrong theme before hydration
  const themeInitScript = `
    (function() {
      try {
        var root = document.documentElement;

        // 1. Instant check for simple active theme key
        var activeThemeId = localStorage.getItem('afterglow_active_theme_id');
        if (activeThemeId) {
          root.setAttribute('data-theme', activeThemeId);
        }

        // 2. Check full theme customization (Theme Studio)
        var themeRaw = localStorage.getItem('afterglow_theme_customization');
        if (themeRaw) {
          var tCfg = JSON.parse(themeRaw);
          if (tCfg.themeId) {
            root.setAttribute('data-theme', tCfg.themeId);
          }
          if (tCfg.fontPairing) root.setAttribute('data-font-pairing', tCfg.fontPairing);
          if (tCfg.cardAppearance) root.setAttribute('data-card-style', tCfg.cardAppearance);
          if (tCfg.backgroundStyle) root.setAttribute('data-bg-style', tCfg.backgroundStyle);
          if (tCfg.decorationStyle) root.setAttribute('data-decor-style', tCfg.decorationStyle);
          if (tCfg.density) root.setAttribute('data-density', tCfg.density);
          if (tCfg.customAccentColor) {
            root.style.setProperty('--ag-accent-primary', tCfg.customAccentColor);
          }
        }

        // 3. Check Atelier active configuration (Atelier)
        var atelierRaw = localStorage.getItem('afterglow_atelier_active_config');
        if (atelierRaw) {
          var aCfg = JSON.parse(atelierRaw);
          if (aCfg.themeId) {
            root.setAttribute('data-theme', aCfg.themeId);
          }
          if (aCfg.typography && aCfg.typography.pairingId) root.setAttribute('data-font-pairing', aCfg.typography.pairingId);
          if (aCfg.card && aCfg.card.style) root.setAttribute('data-card-style', aCfg.card.style);
          if (aCfg.background && aCfg.background.mode) root.setAttribute('data-bg-style', aCfg.background.mode);
          if (aCfg.decorations && aCfg.decorations.style) root.setAttribute('data-decor-style', aCfg.decorations.style);
          if (aCfg.layout) {
            if (aCfg.layout.density) root.setAttribute('data-density', aCfg.layout.density);
            if (aCfg.layout.navStyle) root.setAttribute('data-nav-style', aCfg.layout.navStyle);
            if (aCfg.layout.borderRadiusSystem) root.setAttribute('data-radius-system', aCfg.layout.borderRadiusSystem);
          }
          if (aCfg.components && aCfg.components.buttonShape) root.setAttribute('data-button-shape', aCfg.components.buttonShape);
          if (aCfg.identity && aCfg.identity.badgeSymbol) {
            root.style.setProperty('--ag-badge-symbol', '"' + aCfg.identity.badgeSymbol + '"');
          }

          if (aCfg.colors) {
            var col = aCfg.colors;
            if (col.bg) root.style.setProperty('--ag-bg', col.bg);
            if (col.surface) root.style.setProperty('--ag-surface', col.surface);
            if (col.surfaceElevated) root.style.setProperty('--ag-surface-elevated', col.surfaceElevated);
            if (col.cardBg) root.style.setProperty('--ag-card-bg', col.cardBg);
            if (col.sidebarBg) root.style.setProperty('--ag-nav-bg', col.sidebarBg);
            if (col.inputBg) root.style.setProperty('--ag-input-bg', col.inputBg);
            if (col.primaryText) root.style.setProperty('--ag-primary-text', col.primaryText);
            if (col.secondaryText) root.style.setProperty('--ag-secondary-text', col.secondaryText);
            if (col.mutedText) root.style.setProperty('--ag-muted-text', col.mutedText);
            if (col.accentPrimary) root.style.setProperty('--ag-accent-primary', col.accentPrimary);
            if (col.accentSecondary) root.style.setProperty('--ag-accent-secondary', col.accentSecondary);
            if (col.border) root.style.setProperty('--ag-border', col.border);
          }
        }
      } catch (e) {}

      // Remove preload class after first paint to enable smooth interactive transitions
      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            document.documentElement.classList.remove('preload');
          });
        });
      }
    })();
  `;

  return (
    <html
      lang="en"
      data-theme="vanilla-dreams"
      data-font-pairing="fraunces-nunito"
      data-card-style="polaroid"
      data-bg-style="solid"
      data-decor-style="scrapbook"
      data-density="comfortable"
      className={`
        preload
        ${fraunces.variable}
        ${nunito.variable}
        ${caveat.variable}
        ${playfair.variable}
        ${dmSans.variable}
        ${cormorant.variable}
        ${lato.variable}
        ${dmSerif.variable}
        ${manrope.variable}
        ${lora.variable}
      `}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased min-h-screen bg-[var(--ag-bg)] text-[var(--ag-text-primary)]">
        {children}
      </body>
    </html>
  );
}
