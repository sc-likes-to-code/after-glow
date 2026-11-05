'use client';

import React from 'react';
import { ThemeDefinition, ThemeCustomization } from '@/types/theme';
import { FONT_PAIRINGS } from '@/lib/themes';
import { SAMPLE_PHOTOS } from '@/lib/samplePhotos';
import { Sparkles, Heart, Plus, Calendar, MapPin } from 'lucide-react';

interface ThemeLivePreviewProps {
  theme: ThemeDefinition;
  customization: ThemeCustomization;
}

export function ThemeLivePreview({ theme, customization }: ThemeLivePreviewProps) {
  const fontConfig = FONT_PAIRINGS[customization.fontPairing] || FONT_PAIRINGS['fraunces-nunito'];
  const palette = theme.palette;
  const isDark = theme.isDark;

  // Active accent color (accounting for optional custom accent)
  const activeAccent = customization.customAccentColor || palette.accentPrimary;

  // Card appearance styling based on cardAppearance setting
  const getCardStyle = () => {
    switch (customization.cardAppearance) {
      case 'soft-rounded':
        return 'rounded-2xl p-3 shadow-md border';
      case 'editorial':
        return 'rounded-xs p-2.5 shadow-none border border-current';
      case 'minimal':
        return 'rounded-lg p-2.5 shadow-sm border border-transparent';
      case 'polaroid':
      default:
        return 'rounded-sm p-2 pb-4 shadow-md border rotate-[-1deg]';
    }
  };

  return (
    <div className="relative rounded-2xl p-4 sm:p-6 border border-[var(--ag-border)] bg-[var(--ag-surface)]/60 shadow-inner overflow-hidden">
      {/* Label Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" /> Live Atmosphere Showcase
        </span>
        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[var(--ag-card-bg)] border border-[var(--ag-border)] text-[var(--ag-muted-text)]">
          {theme.name} • {fontConfig.name.split('+')[0].trim()}
        </span>
      </div>

      {/* Miniature AFTERGLOW App Window Mockup */}
      <div
        style={{
          backgroundColor: palette.bg,
          color: palette.primaryText,
          borderColor: palette.border,
        }}
        className="relative w-full rounded-xl border shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[300px] transition-colors duration-300"
      >
        {/* Mini Sidebar */}
        <div
          style={{
            backgroundColor: palette.surface,
            borderColor: palette.border,
          }}
          className="w-full md:w-44 p-3.5 border-b md:border-b-0 md:border-r flex flex-col justify-between shrink-0 select-none"
        >
          <div>
            {/* Wordmark */}
            <div className="flex items-center gap-1.5 mb-4">
              <span className="text-base">{theme.badgeSymbol}</span>
              <div>
                <span
                  style={{ color: palette.primaryText }}
                  className={`text-xs font-bold tracking-wider uppercase block ${fontConfig.headingClass}`}
                >
                  Afterglow
                </span>
                <span
                  style={{ color: palette.mutedText }}
                  className="text-[9px] font-caveat block -mt-0.5"
                >
                  moments that matter
                </span>
              </div>
            </div>

            {/* Mini Nav Links */}
            <div className="space-y-1">
              {[
                { label: 'Home', active: true },
                { label: 'My Timeline', active: false },
                { label: 'Mood Garden', active: false },
                { label: 'Collections', active: false },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: item.active ? palette.accentSecondary : 'transparent',
                    color: item.active ? palette.primaryText : palette.secondaryText,
                    borderColor: item.active ? activeAccent : 'transparent',
                  }}
                  className="px-2.5 py-1.5 rounded-md text-[11px] font-medium flex items-center justify-between border"
                >
                  <span>{item.label}</span>
                  {item.active && <span className="text-[10px]">★</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Mini Capture Button */}
          <button
            type="button"
            style={{
              backgroundColor: activeAccent,
              color: isDark ? '#FFFFFF' : '#FFFFFF',
            }}
            className="w-full mt-3 py-1.5 px-2.5 rounded-full text-[11px] font-semibold flex items-center justify-center gap-1 shadow-xs transition-opacity hover:opacity-90"
          >
            <Plus className="w-3 h-3" />
            <span>Capture</span>
          </button>
        </div>

        {/* Mini Main Content Sanctuary */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
          {/* Mini Header Greeting */}
          <div className="mb-3">
            <div className="flex items-center gap-1.5 mb-1">
              <span
                style={{
                  backgroundColor: palette.accentSecondary,
                  color: palette.secondaryText,
                  borderColor: palette.border,
                }}
                className="text-[9px] px-2 py-0.5 rounded-full border"
              >
                Saturday, October 31
              </span>
            </div>

            <h3
              style={{ color: palette.primaryText }}
              className={`text-base sm:text-lg font-bold leading-tight ${fontConfig.headingClass}`}
            >
              {isDark ? 'Good evening, starry sky 🌙' : 'Good morning, sunshine ☀'}
            </h3>

            <p
              style={{ color: activeAccent }}
              className="font-caveat text-xs sm:text-sm -mt-0.5"
            >
              take a breath. you&apos;re doing just fine ♡
            </p>
          </div>

          {/* Miniature Memory Card Preview */}
          <div
            style={{
              backgroundColor: palette.cardBg,
              borderColor: palette.border,
            }}
            className={`relative max-w-sm w-full mx-auto sm:mx-0 ${getCardStyle()}`}
          >
            {/* Washi Tape if Scrapbook style */}
            {customization.decorationStyle === 'scrapbook' && (
              <div
                style={{
                  backgroundColor: palette.washiTape,
                  borderColor: palette.washiBorder,
                }}
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-3 rounded-xs border shadow-2xs rotate-1"
              />
            )}

            {/* Photo Preview */}
            <div
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.borderSubtle,
              }}
              className="aspect-16/9 w-full rounded-xs overflow-hidden border mb-2 relative flex items-center justify-center"
            >
              <img
                src={SAMPLE_PHOTOS.sundayMorningCoffee}
                alt=""
                className="w-full h-full object-cover"
              />
              <div
                style={{
                  backgroundColor: palette.surfaceElevated,
                  color: activeAccent,
                }}
                className="absolute top-1.5 right-1.5 p-1 rounded-full shadow-xs"
              >
                <Heart className="w-2.5 h-2.5 fill-current" />
              </div>
            </div>

            {/* Memory Card Details */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span
                  style={{ color: palette.primaryText }}
                  className={`text-xs font-bold truncate ${fontConfig.headingClass}`}
                >
                  A quiet Sunday morning
                </span>
                <span
                  style={{ color: palette.mutedText }}
                  className="text-[9px] font-mono shrink-0"
                >
                  08:45
                </span>
              </div>

              <p
                style={{ color: palette.secondaryText }}
                className="font-caveat text-xs italic truncate"
              >
                &ldquo;warm cup, still heart and morning light&rdquo;
              </p>

              <div className="pt-1 flex items-center justify-between text-[9px]">
                <span
                  style={{
                    backgroundColor: palette.accentSecondary,
                    color: palette.primaryText,
                    borderColor: palette.borderSubtle,
                  }}
                  className="px-2 py-0.5 rounded-full border font-medium"
                >
                  🌿 Peaceful
                </span>
                <span
                  style={{ color: palette.mutedText }}
                  className="flex items-center gap-0.5"
                >
                  <MapPin className="w-2.5 h-2.5" /> Kitchen window
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
