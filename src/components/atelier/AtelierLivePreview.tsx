'use client';

import React, { useState } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { THEMES } from '@/lib/themes';
import { ThemeId } from '@/types/theme';
import { MOODS } from '@/lib/constants';
import { FlowerIllustration } from '@/components/scrapbook/FlowerIllustration';
import { WashiTape, TinyFlower, TinySparkle, TinyHeart, PostmarkBadge } from '@/components/scrapbook/Decorations';
import {
  Monitor,
  Smartphone,
  Eye,
  Heart,
  Calendar,
  MapPin,
  Sparkles,
  Search,
  Check,
  Tag,
} from 'lucide-react';

export function AtelierLivePreview() {
  const { previewConfig, previewViewport, setPreviewViewport } = useMemoryStore();
  const [previewTab, setPreviewTab] = useState<'card' | 'home' | 'components'>('card');

  const baseTheme = THEMES[previewConfig.themeId as ThemeId] || THEMES['vanilla-dreams'];
  const sampleMood = MOODS.peaceful;

  // Active custom colors or theme fallback
  const colors = previewConfig.colors || {};
  const primaryAccent = colors.accentPrimary || baseTheme.palette.accentPrimary;
  const secondaryAccent = colors.accentSecondary || baseTheme.palette.accentSecondary;
  const primaryText = colors.primaryText || baseTheme.palette.primaryText;
  const secondaryText = colors.secondaryText || baseTheme.palette.secondaryText;
  const mutedText = colors.mutedText || baseTheme.palette.mutedText;
  const cardBg = colors.cardBg || baseTheme.palette.cardBg;
  const surface = colors.surface || baseTheme.palette.surface;
  const border = colors.border || baseTheme.palette.border;

  // Card appearance settings
  const card = previewConfig.card;
  const cardRadius = card.borderRadius !== undefined ? `${card.borderRadius}px` : '4px';
  const cardBorderWidth = card.borderWidth !== undefined ? `${card.borderWidth}px` : '1px';
  const cardBorderColor = card.borderColor || border;

  // Shadow
  const shadowMap: Record<string, string> = {
    none: 'none',
    subtle: '0 2px 8px -2px rgba(0,0,0,0.06)',
    soft: '0 6px 18px -3px rgba(0,0,0,0.1)',
    dramatic: '0 14px 30px -4px rgba(0,0,0,0.22)',
  };
  const cardShadow = shadowMap[card.shadowIntensity] || shadowMap.soft;

  // Rotation
  const rotationMap: Record<string, string> = {
    none: 'rotate(0deg)',
    subtle: 'rotate(-1deg)',
    playful: 'rotate(-2.5deg)',
  };
  const cardRotation = rotationMap[card.rotationIntensity] || rotationMap.subtle;

  return (
    <div className="bg-[var(--ag-card-bg)] rounded-2xl border border-[var(--ag-border)] p-4 sm:p-5 shadow-sm space-y-4 sticky top-6">
      {/* PREVIEW HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--ag-border)]">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-[var(--ag-accent-primary)]" />
          <span className="font-fraunces text-sm font-bold text-[var(--ag-primary-text)]">
            Live Sanctuary Preview
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)]">
            Realtime
          </span>
        </div>

        {/* Viewport switch: Desktop vs Mobile */}
        <div className="flex items-center gap-1 bg-[var(--ag-surface)] p-1 rounded-lg border border-[var(--ag-border)]">
          <button
            type="button"
            onClick={() => setPreviewViewport('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              previewViewport === 'desktop'
                ? 'bg-[var(--ag-card-bg)] text-[var(--ag-primary-text)] shadow-2xs font-semibold'
                : 'text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)]'
            }`}
            title="Desktop canvas preview"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setPreviewViewport('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
              previewViewport === 'mobile'
                ? 'bg-[var(--ag-card-bg)] text-[var(--ag-primary-text)] shadow-2xs font-semibold'
                : 'text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)]'
            }`}
            title="Mobile device preview"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      {/* MINI PREVIEW TABS: Memory Card / Home / UI Controls */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[var(--ag-muted-text)] font-serif text-[11px]">Showcase:</span>
        <button
          type="button"
          onClick={() => setPreviewTab('card')}
          className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
            previewTab === 'card'
              ? 'bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
              : 'text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)]'
          }`}
        >
          Memory Card
        </button>
        <button
          type="button"
          onClick={() => setPreviewTab('home')}
          className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
            previewTab === 'home'
              ? 'bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
              : 'text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)]'
          }`}
        >
          Mini Sanctuary
        </button>
        <button
          type="button"
          onClick={() => setPreviewTab('components')}
          className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
            previewTab === 'components'
              ? 'bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
              : 'text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)]'
          }`}
        >
          UI Components
        </button>
      </div>

      {/* THE DEVICE VIEWPORT STAGE */}
      <div
        className={`mx-auto rounded-xl border border-[var(--ag-border)] overflow-hidden transition-all duration-300 relative ${
          previewViewport === 'mobile'
            ? 'max-w-[320px] shadow-lg border-2'
            : 'w-full shadow-inner'
        }`}
        style={{
          backgroundColor: colors.bg || baseTheme.palette.bg,
        }}
      >
        {/* Device Frame Top Notch / Speaker if mobile */}
        {previewViewport === 'mobile' && (
          <div className="w-full py-1.5 bg-[var(--ag-surface)] flex justify-center items-center border-b border-[var(--ag-border)]">
            <div className="w-16 h-1 rounded-full bg-[var(--ag-border)]" />
          </div>
        )}

        <div className="p-4 sm:p-5 space-y-4">
          {/* TAB 1: MEMORY CARD SHOWCASE */}
          {previewTab === 'card' && (
            <div className="flex flex-col items-center justify-center py-4">
              {/* The Styled Memory Card */}
              <div
                style={{
                  backgroundColor: cardBg,
                  borderRadius: cardRadius,
                  borderWidth: cardBorderWidth,
                  borderColor: cardBorderColor,
                  borderStyle: card.style === 'scrapbook-collage' ? 'dashed' : 'solid',
                  boxShadow: cardShadow,
                  transform: cardRotation,
                  padding: card.padding === 'compact' ? '8px' : card.padding === 'generous' ? '18px' : '12px',
                }}
                className="w-full max-w-[280px] relative transition-transform duration-300"
              >
                {/* Washi Tape Accent if enabled */}
                {previewConfig.decorations.washiTapeEnabled && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
                    <WashiTape color="blush" width="w-20" angle={-1} />
                  </div>
                )}

                {/* Sample Photo */}
                <div
                  className={`w-full overflow-hidden rounded-xs bg-[var(--ag-surface)] border border-[var(--ag-border)]/60 mb-2 relative ${
                    card.aspectRatio === 'square'
                      ? 'aspect-square'
                      : card.aspectRatio === 'landscape'
                      ? 'aspect-4/3'
                      : card.aspectRatio === 'portrait'
                      ? 'aspect-3/4'
                      : 'aspect-square'
                  }`}
                >
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80"
                    alt="Sample memory snapshot"
                    className="w-full h-full object-cover"
                  />

                  {/* Mood Badge on Card */}
                  {card.moodBadgeAppearance !== 'hidden' && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[var(--ag-surface)]/90 backdrop-blur-xs text-[10px] font-medium text-[var(--ag-primary-text)] border border-[var(--ag-border)]/60 shadow-2xs flex items-center gap-1">
                      <span>{sampleMood.emoji}</span>
                      {card.moodBadgeAppearance === 'pill' && <span>{sampleMood.label}</span>}
                    </div>
                  )}
                </div>

                {/* Card Editorial Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[var(--ag-muted-text)] font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5 text-[var(--ag-accent-primary)]" />
                      Sunday, October 25
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-[var(--ag-accent-primary)]" />
                      Little Cafe
                    </span>
                  </div>

                  <h4
                    style={{ color: primaryText }}
                    className={`text-sm leading-snug ${
                      card.titleFont === 'hand'
                        ? 'font-caveat text-base'
                        : card.titleFont === 'body'
                        ? 'font-body font-semibold'
                        : 'font-heading font-bold'
                    }`}
                  >
                    Morning coffee & handwritten letters
                  </h4>

                  <p style={{ color: secondaryText }} className="font-caveat text-sm leading-tight line-clamp-2">
                    &ldquo;The sunlight fell right across the table. Warm tea, slow hours, quiet peace.&rdquo;
                  </p>
                </div>

                {/* Card Tag list */}
                <div className="flex items-center gap-1 pt-2">
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] border border-[var(--ag-border)]/80">
                    #quiet-hours
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] border border-[var(--ag-border)]/80">
                    #autumn
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MINI SANCTUARY (HOME EXPERIENCE) */}
          {previewTab === 'home' && (
            <div className="space-y-3">
              {/* Mini App Header */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--ag-surface)] border border-[var(--ag-border)]">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{previewConfig.identity.badgeSymbol || '🌸'}</span>
                  <div>
                    <span className="font-heading text-xs font-bold text-[var(--ag-primary-text)] uppercase block">
                      Afterglow
                    </span>
                    <span className="font-caveat text-[10px] text-[var(--ag-muted-text)] block -mt-0.5">
                      {previewConfig.identity.appSubtitle || 'a little place for the moments'}
                    </span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-[var(--ag-accent-secondary)] flex items-center justify-center text-[10px]">
                  <span>{previewConfig.identity.displayName?.[0] || 'D'}</span>
                </div>
              </div>

              {/* Mini Hero Greeting Card */}
              <div className="p-3 rounded-lg bg-[var(--ag-card-bg)] border border-[var(--ag-border)] space-y-1">
                <span className="text-[10px] font-mono text-[var(--ag-accent-primary)] uppercase tracking-wider block">
                  Sunday Sanctuary
                </span>
                <h3 className="font-heading text-sm font-bold text-[var(--ag-primary-text)]">
                  {previewConfig.homepage.customGreeting || 'Good morning, sunshine ☀'}
                </h3>
                <p className="font-caveat text-xs text-[var(--ag-secondary-text)]">
                  {previewConfig.homepage.customSubtitle || 'A gentle place for the moments that matter'}
                </p>
              </div>

              {/* Mini Preserved Memory Snippet */}
              <div className="p-2.5 rounded-lg bg-[var(--ag-card-bg)] border border-[var(--ag-border)] flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xs bg-[var(--ag-surface)] overflow-hidden shrink-0 border border-[var(--ag-border)]">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop&q=80"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-heading text-xs font-semibold text-[var(--ag-primary-text)] truncate block">
                    Ocean breeze and seashells
                  </span>
                  <span className="font-caveat text-xs text-[var(--ag-secondary-text)] truncate block">
                    quiet horizon, salty air
                  </span>
                </div>
                <TinyFlower className="w-3.5 h-3.5 text-[var(--ag-accent-primary)] shrink-0" />
              </div>
            </div>
          )}

          {/* TAB 3: UI COMPONENTS LIVE SWATCHES */}
          {previewTab === 'components' && (
            <div className="space-y-3">
              {/* Button Shape & Fill Showcase */}
              <div className="p-3 rounded-lg bg-[var(--ag-card-bg)] border border-[var(--ag-border)] space-y-2">
                <span className="text-[10px] font-mono text-[var(--ag-muted-text)] uppercase block">
                  Buttons & CTAs
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    style={{
                      backgroundColor: primaryAccent,
                      borderRadius: previewConfig.components.buttonShape === 'pill' ? '9999px' : previewConfig.components.buttonShape === 'rounded' ? '8px' : '2px',
                    }}
                    className="px-3 py-1.5 text-white text-xs font-semibold shadow-xs flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Primary Action</span>
                  </button>

                  <button
                    type="button"
                    style={{
                      borderRadius: previewConfig.components.buttonShape === 'pill' ? '9999px' : previewConfig.components.buttonShape === 'rounded' ? '8px' : '2px',
                    }}
                    className="px-3 py-1.5 rounded-full bg-[var(--ag-surface)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] text-xs font-semibold"
                  >
                    Secondary
                  </button>
                </div>
              </div>

              {/* Form Input Showcase */}
              <div className="p-3 rounded-lg bg-[var(--ag-card-bg)] border border-[var(--ag-border)] space-y-2">
                <span className="text-[10px] font-mono text-[var(--ag-muted-text)] uppercase block">
                  Text Input & Search
                </span>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[var(--ag-muted-text)] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    readOnly
                    value="Filter through memories..."
                    style={{
                      borderRadius: previewConfig.components.inputRadius === 'pill' ? '9999px' : previewConfig.components.inputRadius === 'rounded' ? '6px' : '2px',
                    }}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Badges & Tags */}
              <div className="p-3 rounded-lg bg-[var(--ag-card-bg)] border border-[var(--ag-border)] space-y-2">
                <span className="text-[10px] font-mono text-[var(--ag-muted-text)] uppercase block">
                  Mood & Category Badges
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] text-[10px] font-medium flex items-center gap-1 border border-[var(--ag-accent-primary)]/40">
                    <TinyHeart className="w-2.5 h-2.5 text-[var(--ag-accent-primary)]" />
                    <span>Loved</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] text-[10px] font-medium border border-[var(--ag-border)]">
                    #poetry
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] text-[10px] font-medium border border-[var(--ag-border)]">
                    #morning
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* QUICK FOOTER SUMMARY IN PREVIEW */}
      <div className="pt-2 text-center">
        <span className="font-caveat text-sm text-[var(--ag-muted-text)]">
          {previewConfig.identity.displayName || 'Dear Soul'}’s Afterglow Diary • {baseTheme.name}
        </span>
      </div>
    </div>
  );
}
