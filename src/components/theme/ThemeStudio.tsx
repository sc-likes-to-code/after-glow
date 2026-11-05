'use client';

import React, { useState } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { THEMES, FONT_PAIRINGS, ACCENT_PRESETS } from '@/lib/themes';
import {
  ThemeId,
  FontPairingId,
  CardAppearance,
  BackgroundStyle,
  DecorationStyle,
  InterfaceDensity,
} from '@/types/theme';
import { ThemeLivePreview } from './ThemeLivePreview';
import { WashiTape, TinySparkle, TinyFlower, TinyHeart } from '@/components/scrapbook/Decorations';
import {
  Palette,
  Type,
  Layout,
  Sparkles,
  RotateCcw,
  Check,
  Sliders,
  Paintbrush,
  Sun,
  Moon,
} from 'lucide-react';

export function ThemeStudio() {
  const { themeCustomization, updateThemeCustomization, resetThemeCustomization, previewConfig } = useMemoryStore();

  const [activeTab, setActiveTab] = useState<'themes' | 'customize'>('themes');

  const activeThemeId = (previewConfig?.themeId as ThemeId) || themeCustomization.themeId || 'vanilla-dreams';
  const currentTheme = THEMES[activeThemeId] || THEMES['vanilla-dreams'];

  const [customColorInput, setCustomColorInput] = useState(
    themeCustomization.customAccentColor || currentTheme.palette.accentPrimary
  );

  React.useEffect(() => {
    setCustomColorInput(themeCustomization.customAccentColor || currentTheme.palette.accentPrimary);
  }, [themeCustomization.customAccentColor, currentTheme.palette.accentPrimary]);

  const handleSelectTheme = async (themeId: ThemeId) => {
    const targetTheme = THEMES[themeId];
    await updateThemeCustomization({
      themeId,
      fontPairing: targetTheme.recommendedFont,
      cardAppearance: targetTheme.recommendedCardStyle,
      decorationStyle: targetTheme.recommendedDecor,
      backgroundStyle: 'solid',
      customAccentColor: undefined, // Reset custom color to embrace new theme's palette
    });
  };

  const handleFontSelect = async (fontPairing: FontPairingId) => {
    await updateThemeCustomization({ fontPairing });
  };

  const handleCardStyleSelect = async (cardAppearance: CardAppearance) => {
    await updateThemeCustomization({ cardAppearance });
  };

  const handleBgStyleSelect = async (backgroundStyle: BackgroundStyle) => {
    await updateThemeCustomization({ backgroundStyle });
  };

  const handleDecorSelect = async (decorationStyle: DecorationStyle) => {
    await updateThemeCustomization({ decorationStyle });
  };

  const handleDensitySelect = async (density: InterfaceDensity) => {
    await updateThemeCustomization({ density });
  };

  const handleAccentPresetSelect = async (hex: string) => {
    setCustomColorInput(hex);
    await updateThemeCustomization({ customAccentColor: hex });
  };

  const handleCustomColorChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomColorInput(val);
    await updateThemeCustomization({ customAccentColor: val });
  };

  const handleReset = async () => {
    if (window.confirm('Reset all appearance settings back to Vanilla Dreams?')) {
      await resetThemeCustomization();
      setCustomColorInput('#D9AEB5');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* BOUTIQUE HEADER */}
      <div className="relative pt-2 pb-6 border-b border-[var(--ag-border)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--ag-accent-secondary)] border border-[var(--ag-border)] text-xs font-semibold text-[var(--ag-secondary-text)] mb-2">
              <Palette className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
              <span>AFTERGLOW Theme Studio</span>
            </div>
            <h1 className="font-fraunces text-3xl sm:text-4xl font-bold text-[var(--ag-primary-text)] tracking-tight">
              Make this little space yours ♡
            </h1>
            <p className="font-caveat text-xl text-[var(--ag-muted-text)] mt-1">
              Choose the atmosphere that feels like home.
            </p>
          </div>

          {/* Reset Appearance Button */}
          <button
            type="button"
            onClick={handleReset}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--ag-secondary-text)] bg-[var(--ag-surface)] hover:bg-[var(--ag-border)] border border-[var(--ag-border)] transition-colors cursor-pointer shadow-2xs"
            title="Reset to Vanilla Dreams default"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset appearance</span>
          </button>
        </div>

        {/* Studio Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('themes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'themes'
                ? 'bg-[var(--ag-accent-primary)] text-white shadow-xs'
                : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-border)]'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Curated Atmospheres ({Object.keys(THEMES).length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('customize')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeTab === 'customize'
                ? 'bg-[var(--ag-accent-primary)] text-white shadow-xs'
                : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-border)]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Fine-Tune & Details</span>
          </button>
        </div>
      </div>

      {/* LIVE INTERACTIVE SHOWCASE PREVIEW */}
      <ThemeLivePreview
        theme={currentTheme}
        customization={{ ...themeCustomization, themeId: activeThemeId }}
      />

      {/* TAB 1: CURATED THEMES GALLERY */}
      {activeTab === 'themes' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--ag-accent-primary)]" />
              <span>Select an Atmosphere</span>
            </h2>
            <span className="text-xs text-[var(--ag-muted-text)] font-sans">
              Click any card to instantly transform your diary
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {(Object.keys(THEMES) as ThemeId[]).map((tKey) => {
              const th = THEMES[tKey];
              const isSelected = activeThemeId === tKey;

              return (
                <div
                  key={tKey}
                  onClick={() => handleSelectTheme(tKey)}
                  style={{
                    backgroundColor: th.palette.cardBg,
                    borderColor: isSelected ? th.palette.accentPrimary : th.palette.border,
                  }}
                  className={`group relative cursor-pointer p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-md hover:-translate-y-1 ${
                    isSelected ? 'ring-2 ring-[var(--ag-accent-primary)] shadow-md' : ''
                  }`}
                >
                  {/* Theme Badge & Selected Checkmark */}
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{th.badgeSymbol}</span>
                    {isSelected ? (
                      <span
                        style={{
                          backgroundColor: th.palette.accentPrimary,
                          color: '#FFFFFF',
                        }}
                        className="p-1 rounded-full shadow-xs text-xs font-bold"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      th.isDark && (
                        <span
                          style={{
                            backgroundColor: th.palette.surface,
                            color: th.palette.mutedText,
                          }}
                          className="px-2 py-0.5 rounded-full text-[10px] font-mono border"
                        >
                          Dark
                        </span>
                      )
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1 mb-3">
                    <h3
                      style={{ color: th.palette.primaryText }}
                      className="font-fraunces text-base font-bold truncate"
                    >
                      {th.name}
                    </h3>
                    <p
                      style={{ color: th.palette.accentPrimary }}
                      className="text-[11px] font-caveat line-clamp-1"
                    >
                      {th.tagline}
                    </p>
                    <p
                      style={{ color: th.palette.mutedText }}
                      className="text-[11px] leading-relaxed line-clamp-2"
                    >
                      {th.description}
                    </p>
                  </div>

                  {/* Miniature Palette Swatches */}
                  <div className="pt-2 border-t flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {th.previewColors.map((hex, i) => (
                        <div
                          key={i}
                          style={{ backgroundColor: hex }}
                          className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                          title={hex}
                        />
                      ))}
                    </div>

                    <span
                      style={{ color: isSelected ? th.palette.accentPrimary : th.palette.mutedText }}
                      className="text-[10px] font-semibold tracking-wider uppercase font-mono"
                    >
                      {isSelected ? 'Applied' : 'Select'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 2: INDEPENDENT CUSTOMIZATION CONTROLS */}
      {activeTab === 'customize' && (
        <div className="space-y-8">
          {/* SECTION A: TYPOGRAPHY PAIRINGS */}
          <div className="p-5 sm:p-6 rounded-xl bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-[var(--ag-accent-primary)]" />
              <h3 className="font-fraunces text-lg font-bold text-[var(--ag-primary-text)]">
                Typography System
              </h3>
            </div>
            <p className="text-xs text-[var(--ag-secondary-text)]">
              Choose an expressive serif heading font and clean body companion:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {(Object.keys(FONT_PAIRINGS) as FontPairingId[]).map((fKey) => {
                const fp = FONT_PAIRINGS[fKey];
                const isSelected = themeCustomization.fontPairing === fKey;

                return (
                  <button
                    key={fKey}
                    type="button"
                    onClick={() => handleFontSelect(fKey)}
                    className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-surface)] ring-1 ring-[var(--ag-accent-primary)] shadow-xs'
                        : 'border-[var(--ag-border)] bg-[var(--ag-surfaceElevated)] hover:bg-[var(--ag-surface)]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-[var(--ag-primary-text)]">
                          {fp.name}
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
                        )}
                      </div>
                      <p
                        className={`text-base font-bold text-[var(--ag-primary-text)] ${fp.headingClass} mb-1`}
                      >
                        Memory & Time
                      </p>
                      <p className={`text-xs text-[var(--ag-secondary-text)] ${fp.bodyClass} line-clamp-1`}>
                        {fp.previewText}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION B: CARD APPEARANCE & SHAPE */}
          <div className="p-5 sm:p-6 rounded-xl bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <Layout className="w-4 h-4 text-[var(--ag-accent-primary)]" />
              <h3 className="font-fraunces text-lg font-bold text-[var(--ag-primary-text)]">
                Memory Card Appearance
              </h3>
            </div>
            <p className="text-xs text-[var(--ag-secondary-text)]">
              Select how your photographs and journal cards present themselves:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  id: 'polaroid' as CardAppearance,
                  label: 'Polaroid',
                  desc: 'Classic scrapbook tilt & white photo border',
                },
                {
                  id: 'soft-rounded' as CardAppearance,
                  label: 'Soft Rounded',
                  desc: 'Modern pill corners & warm diffused border',
                },
                {
                  id: 'editorial' as CardAppearance,
                  label: 'Editorial',
                  desc: 'Crisp magazine lines & tailored borders',
                },
                {
                  id: 'minimal' as CardAppearance,
                  label: 'Minimal',
                  desc: 'Borderless elevated surfaces with soft shadows',
                },
              ].map((c) => {
                const isSelected = themeCustomization.cardAppearance === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleCardStyleSelect(c.id)}
                    className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-surface)] ring-1 ring-[var(--ag-accent-primary)] shadow-xs'
                        : 'border-[var(--ag-border)] bg-[var(--ag-surfaceElevated)] hover:bg-[var(--ag-surface)]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[var(--ag-primary-text)]">
                        {c.label}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--ag-muted-text)] leading-tight">
                      {c.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION C: BACKGROUND TEXTURE & DECORATION STYLE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Background Style */}
            <div className="p-5 sm:p-6 rounded-xl bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-2xs space-y-3">
              <h3 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)]">
                Background Texture
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'solid' as BackgroundStyle, label: 'Solid' },
                  { id: 'subtle-gradient' as BackgroundStyle, label: 'Gradient' },
                  { id: 'paper-texture' as BackgroundStyle, label: 'Paper Grid' },
                ].map((b) => {
                  const isSelected = themeCustomization.backgroundStyle === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => handleBgStyleSelect(b.id)}
                      className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-all ${
                        isSelected
                          ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-surface)] font-bold shadow-2xs'
                          : 'border-[var(--ag-border)] hover:bg-[var(--ag-surface)]'
                      }`}
                    >
                      {b.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Decoration Style */}
            <div className="p-5 sm:p-6 rounded-xl bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-2xs space-y-3">
              <h3 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)]">
                Decorative Language
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {[
                  { id: 'scrapbook' as DecorationStyle, label: 'Scrapbook', icon: '📎' },
                  { id: 'botanical' as DecorationStyle, label: 'Botanical', icon: '🌿' },
                  { id: 'celestial' as DecorationStyle, label: 'Celestial', icon: '✨' },
                  { id: 'floral' as DecorationStyle, label: 'Floral', icon: '🌸' },
                  { id: 'minimal' as DecorationStyle, label: 'Minimal', icon: '·' },
                ].map((d) => {
                  const isSelected = themeCustomization.decorationStyle === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => handleDecorSelect(d.id)}
                      className={`p-2 rounded-lg border text-center text-xs transition-all flex flex-col items-center gap-0.5 ${
                        isSelected
                          ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-surface)] font-bold shadow-2xs'
                          : 'border-[var(--ag-border)] hover:bg-[var(--ag-surface)]'
                      }`}
                    >
                      <span className="text-sm">{d.icon}</span>
                      <span className="text-[10px]">{d.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SECTION D: ACCENT COLOR PICKER & DENSITY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Custom Accent Color */}
            <div className="p-5 sm:p-6 rounded-xl bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)] flex items-center gap-1.5">
                  <Paintbrush className="w-4 h-4 text-[var(--ag-accent-primary)]" />
                  <span>Custom Accent Colour</span>
                </h3>
                {themeCustomization.customAccentColor && (
                  <button
                    type="button"
                    onClick={() => updateThemeCustomization({ customAccentColor: undefined })}
                    className="text-[11px] text-[var(--ag-muted-text)] hover:underline"
                  >
                    Reset to theme default
                  </button>
                )}
              </div>

              {/* Accent Presets */}
              <div className="flex flex-wrap gap-2 pt-1">
                {ACCENT_PRESETS.map((p) => (
                  <button
                    key={p.hex}
                    type="button"
                    onClick={() => handleAccentPresetSelect(p.hex)}
                    style={{ backgroundColor: p.hex }}
                    className={`w-7 h-7 rounded-full border border-black/10 transition-all ${
                      themeCustomization.customAccentColor === p.hex
                        ? 'ring-2 ring-[var(--ag-primary-text)] scale-110 shadow-xs'
                        : 'hover:scale-105'
                    }`}
                    title={p.label}
                  />
                ))}

                {/* HTML Color Picker */}
                <label className="relative w-7 h-7 rounded-full border border-[var(--ag-border)] flex items-center justify-center cursor-pointer bg-conic from-red-500 via-green-500 to-blue-500 overflow-hidden shadow-2xs">
                  <input
                    type="color"
                    value={customColorInput}
                    onChange={handleCustomColorChange}
                    className="opacity-0 absolute inset-0 cursor-pointer"
                  />
                </label>
              </div>
            </div>

            {/* Interface Density */}
            <div className="p-5 sm:p-6 rounded-xl bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-2xs space-y-3">
              <h3 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)]">
                Interface Density
              </h3>
              <p className="text-xs text-[var(--ag-secondary-text)]">
                Adjust padding and whitespace throughout the scrapbook:
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {[
                  { id: 'comfortable' as InterfaceDensity, label: 'Comfortable', desc: 'Relaxed & airy' },
                  { id: 'compact' as InterfaceDensity, label: 'Compact', desc: 'Information dense' },
                ].map((den) => {
                  const isSelected = themeCustomization.density === den.id;
                  return (
                    <button
                      key={den.id}
                      type="button"
                      onClick={() => handleDensitySelect(den.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-surface)] font-bold shadow-2xs'
                          : 'border-[var(--ag-border)] hover:bg-[var(--ag-surface)]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs">{den.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />}
                      </div>
                      <span className="text-[10px] text-[var(--ag-muted-text)] font-normal block mt-0.5">
                        {den.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
