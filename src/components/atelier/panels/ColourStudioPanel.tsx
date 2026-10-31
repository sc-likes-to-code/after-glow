'use client';

import React, { useState } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { THEMES } from '@/lib/themes';
import { ThemeId } from '@/types/theme';
import { CURATED_PALETTES, hexToRgb, hexToHsl } from '@/lib/curatedPalettes';
import { CustomColorPalette } from '@/types/atelier';
import { TinyFlower, TinySparkle } from '@/components/scrapbook/Decorations';
import {
  Palette,
  Sliders,
  Sparkles,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  ChevronDown,
} from 'lucide-react';

export function ColourStudioPanel() {
  const { previewConfig, setPreviewConfig, resetAtelierCategory } = useMemoryStore();
  const baseTheme = THEMES[previewConfig.themeId as ThemeId] || THEMES['vanilla-dreams'];

  const [activeColorKey, setActiveColorKey] = useState<keyof CustomColorPalette>('accentPrimary');
  const [paletteSavedNotice, setPaletteSavedNotice] = useState(false);

  const colors = previewConfig.colors || {};

  const tokenList: {
    key: keyof CustomColorPalette;
    label: string;
    description: string;
    defaultVal: string;
  }[] = [
    { key: 'bg', label: 'Main Background', description: 'Application backdrop atmosphere', defaultVal: baseTheme.palette.bg },
    { key: 'surface', label: 'Secondary Background', description: 'Navigation rails, panels & grouped cards', defaultVal: baseTheme.palette.surface },
    { key: 'surfaceElevated', label: 'Primary Surface', description: 'Modal spreads and elevated sheets', defaultVal: baseTheme.palette.surfaceElevated },
    { key: 'sidebarBg', label: 'Sidebar Background', description: 'Left scrapbook navigation shelf', defaultVal: baseTheme.palette.navBg.replace(/rgba\(.*?\)/, baseTheme.palette.surface) },
    { key: 'cardBg', label: 'Memory Card Background', description: 'Polaroids, photo sheets & diary pads', defaultVal: baseTheme.palette.cardBg },
    { key: 'primaryText', label: 'Primary Text', description: 'Titles, journal body & editorial headers', defaultVal: baseTheme.palette.primaryText },
    { key: 'secondaryText', label: 'Secondary Text', description: 'Captions, notes & subtitle labels', defaultVal: baseTheme.palette.secondaryText },
    { key: 'mutedText', label: 'Muted Text', description: 'Timestamps, counters & subtle metadata', defaultVal: baseTheme.palette.mutedText },
    { key: 'accentPrimary', label: 'Primary Accent', description: 'Signature buttons, active tabs & sparkles', defaultVal: baseTheme.palette.accentPrimary },
    { key: 'accentSecondary', label: 'Secondary Accent', description: 'Washi tape, badges & highlights', defaultVal: baseTheme.palette.accentSecondary },
    { key: 'border', label: 'Border & Separators', description: 'Card outlines and subtle scrapbook lines', defaultVal: baseTheme.palette.border },
    { key: 'inputBg', label: 'Input Background', description: 'Search bars, journal writing fields', defaultVal: baseTheme.palette.inputBg },
    { key: 'buttonBg', label: 'Button Background', description: 'Primary action buttons and pills', defaultVal: baseTheme.palette.accentPrimary },
    { key: 'buttonText', label: 'Button Text', description: 'Text inside primary action buttons', defaultVal: '#FFFFFF' },
    { key: 'decorativeColor', label: 'Decorative Elements', description: 'Botanical flora, stars & seals', defaultVal: baseTheme.palette.accentPrimary },
  ];

  const currentColorVal = colors[activeColorKey] || tokenList.find((t) => t.key === activeColorKey)?.defaultVal || '#D9AEB5';

  const rgbInfo = hexToRgb(currentColorVal);
  const hslInfo = hexToHsl(currentColorVal);

  const handleColorChange = (key: keyof CustomColorPalette, val: string) => {
    setPreviewConfig((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: val,
      },
    }));
  };

  const handleApplyCuratedPalette = (palette: (typeof CURATED_PALETTES)[0]) => {
    setPreviewConfig((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        ...palette.colors,
      },
    }));
  };

  const handleGradientToggle = (enabled: boolean) => {
    setPreviewConfig((prev) => ({
      ...prev,
      gradient: {
        ...prev.gradient,
        enabled,
      },
      background: {
        ...prev.background,
        mode: enabled ? 'gradient' : 'solid',
      },
    }));
  };

  const handleGradientAngleChange = (angle: number) => {
    setPreviewConfig((prev) => ({
      ...prev,
      gradient: {
        ...prev.gradient,
        angle,
      },
    }));
  };

  const handleAddGradientStop = () => {
    setPreviewConfig((prev) => {
      const currentStops = prev.gradient.stops || [];
      const newStop = { color: prev.colors.accentPrimary || '#D9AEB5', offset: 50 };
      return {
        ...prev,
        gradient: {
          ...prev.gradient,
          stops: [...currentStops, newStop].sort((a, b) => a.offset - b.offset),
        },
      };
    });
  };

  const handleUpdateGradientStop = (index: number, color: string, offset: number) => {
    setPreviewConfig((prev) => {
      const updatedStops = [...prev.gradient.stops];
      updatedStops[index] = { color, offset };
      return {
        ...prev,
        gradient: {
          ...prev.gradient,
          stops: updatedStops,
        },
      };
    });
  };

  const handleRemoveGradientStop = (index: number) => {
    setPreviewConfig((prev) => {
      if (prev.gradient.stops.length <= 2) return prev;
      const updatedStops = prev.gradient.stops.filter((_, i) => i !== index);
      return {
        ...prev,
        gradient: {
          ...prev.gradient,
          stops: updatedStops,
        },
      };
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--ag-border)]">
        <div>
          <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
            <Palette className="w-5 h-5 text-[var(--ag-accent-primary)]" />
            Colour Studio
          </h2>
          <p className="font-caveat text-base text-[var(--ag-muted-text)]">
            Tailor each background, surface, text tone, and accent with millimeter precision.
          </p>
        </div>

        <button
          type="button"
          onClick={() => resetAtelierCategory('colour-studio')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] border border-[var(--ag-border)] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Palette</span>
        </button>
      </div>

      {/* 1. CURATED PALETTES CAROUSEL */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)]">
            Curated Inspiration Palettes
          </span>
          <span className="text-xs font-caveat text-[var(--ag-muted-text)]">
            click to apply a hand-blended color story
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CURATED_PALETTES.map((cp) => (
            <div
              key={cp.id}
              onClick={() => handleApplyCuratedPalette(cp)}
              className="p-3.5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] hover:bg-[var(--ag-surface)] transition-all cursor-pointer shadow-2xs space-y-2 group hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-fraunces text-sm font-bold text-[var(--ag-primary-text)]">
                  {cp.name}
                </h4>
                <div className="flex items-center gap-1">
                  {['bg', 'surface', 'accentPrimary', 'primaryText'].map((k) => (
                    <div
                      key={k}
                      style={{ backgroundColor: cp.colors[k as keyof CustomColorPalette] }}
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-xs"
                    />
                  ))}
                </div>
              </div>
              <p className="text-[11px] font-sans text-[var(--ag-muted-text)] line-clamp-1">
                {cp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. THE TOKEN PICKER & DETAILED INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
        {/* Left: Swatch Selector Grid */}
        <div className="lg:col-span-7 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block mb-1">
            Choose Token to Customize
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {tokenList.map((token) => {
              const currentVal = colors[token.key] || token.defaultVal;
              const isSelected = activeColorKey === token.key;

              return (
                <div
                  key={token.key}
                  onClick={() => setActiveColorKey(token.key)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/30 ring-2 ring-[var(--ag-accent-primary)] shadow-2xs'
                      : 'border-[var(--ag-border)] bg-[var(--ag-card-bg)] hover:bg-[var(--ag-surface)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      style={{ backgroundColor: currentVal }}
                      className="w-7 h-7 rounded-full border border-[var(--ag-border)] shadow-xs shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[var(--ag-primary-text)] block truncate">
                        {token.label}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--ag-muted-text)] block">
                        {currentVal}
                      </span>
                    </div>
                  </div>

                  <input
                    type="color"
                    value={currentVal.startsWith('#') && currentVal.length === 7 ? currentVal : '#D9AEB5'}
                    onChange={(e) => handleColorChange(token.key, e.target.value)}
                    className="w-6 h-6 rounded-md cursor-pointer border-0 bg-transparent shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active Token Detail Editor (HEX, RGB, HSL, Swatch) */}
        <div className="lg:col-span-5 p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-5 self-start">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--ag-muted-text)] block">
              Currently Editing
            </span>
            <h3 className="font-fraunces text-lg font-bold text-[var(--ag-primary-text)]">
              {tokenList.find((t) => t.key === activeColorKey)?.label}
            </h3>
            <p className="text-xs text-[var(--ag-secondary-text)] mt-0.5">
              {tokenList.find((t) => t.key === activeColorKey)?.description}
            </p>
          </div>

          {/* Large Live Color Swatch Banner */}
          <div
            style={{ backgroundColor: currentColorVal }}
            className="w-full h-16 rounded-lg border border-[var(--ag-border)] shadow-inner flex items-center justify-center relative overflow-hidden"
          >
            <span
              style={{
                color: hslInfo.l > 55 ? '#2B231D' : '#FFFFFF',
              }}
              className="font-mono text-sm font-bold tracking-wider uppercase px-3 py-1 rounded-md bg-black/15 backdrop-blur-xs"
            >
              {currentColorVal}
            </span>
          </div>

          {/* HEX Input Field & Native Picker Button */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
                HEX Value
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={currentColorVal}
                  onChange={(e) => handleColorChange(activeColorKey, e.target.value)}
                  placeholder="#FAF7F0"
                  className="flex-1 px-3 py-2 text-xs font-mono rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
                />
                <input
                  type="color"
                  value={currentColorVal.startsWith('#') && currentColorVal.length === 7 ? currentColorVal : '#D9AEB5'}
                  onChange={(e) => handleColorChange(activeColorKey, e.target.value)}
                  className="w-9 h-9 rounded-md border border-[var(--ag-border)] cursor-pointer"
                />
              </div>
            </div>

            {/* RGB & HSL Live Readout */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded-md bg-[var(--ag-surface)] border border-[var(--ag-border)]">
                <span className="text-[10px] text-[var(--ag-muted-text)] block font-sans">RGB</span>
                <span className="text-[var(--ag-primary-text)] font-semibold">{rgbInfo.text}</span>
              </div>

              <div className="p-2 rounded-md bg-[var(--ag-surface)] border border-[var(--ag-border)]">
                <span className="text-[10px] text-[var(--ag-muted-text)] block font-sans">HSL</span>
                <span className="text-[var(--ag-primary-text)] font-semibold">{hslInfo.text}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MULTI-STOP GRADIENT BUILDER */}
      <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--ag-accent-primary)]" />
              Custom Gradient Atmosphere Builder
            </h3>
            <p className="font-caveat text-sm text-[var(--ag-muted-text)]">
              Blend multiple colors smoothly across the whole digital journal.
            </p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs font-semibold text-[var(--ag-secondary-text)]">
              Enable Gradient
            </span>
            <input
              type="checkbox"
              checked={previewConfig.gradient.enabled}
              onChange={(e) => handleGradientToggle(e.target.checked)}
              className="rounded-sm accent-[var(--ag-accent-primary)] cursor-pointer w-4 h-4"
            />
          </label>
        </div>

        {previewConfig.gradient.enabled && (
          <div className="space-y-4 pt-2 border-t border-[var(--ag-border)]/80 animate-in fade-in duration-150">
            {/* Gradient Angle Slider & Type */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[var(--ag-secondary-text)]">Type:</span>
                <button
                  type="button"
                  onClick={() =>
                    setPreviewConfig((prev) => ({
                      ...prev,
                      gradient: { ...prev.gradient, type: 'linear' },
                    }))
                  }
                  className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                    previewConfig.gradient.type === 'linear'
                      ? 'bg-[var(--ag-accent-primary)] text-white'
                      : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  Linear
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPreviewConfig((prev) => ({
                      ...prev,
                      gradient: { ...prev.gradient, type: 'radial' },
                    }))
                  }
                  className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                    previewConfig.gradient.type === 'radial'
                      ? 'bg-[var(--ag-accent-primary)] text-white'
                      : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  Radial
                </button>
              </div>

              {previewConfig.gradient.type === 'linear' && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[var(--ag-secondary-text)]">
                    Angle: {previewConfig.gradient.angle}°
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={previewConfig.gradient.angle}
                    onChange={(e) => handleGradientAngleChange(parseInt(e.target.value))}
                    className="w-32 accent-[var(--ag-accent-primary)] cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Gradient Stops List */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--ag-secondary-text)]">
                  Gradient Color Stops ({previewConfig.gradient.stops.length})
                </span>
                <button
                  type="button"
                  onClick={handleAddGradientStop}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--ag-accent-primary)] hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Stop</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {previewConfig.gradient.stops.map((stop, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-[var(--ag-border)] bg-[var(--ag-surface)] flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={stop.color.startsWith('#') ? stop.color : '#D9AEB5'}
                        onChange={(e) => handleUpdateGradientStop(idx, e.target.value, stop.offset)}
                        className="w-7 h-7 rounded-sm border-0 cursor-pointer"
                      />
                      <span className="text-xs font-mono text-[var(--ag-primary-text)] font-semibold">
                        {stop.offset}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.offset}
                      onChange={(e) => handleUpdateGradientStop(idx, stop.color, parseInt(e.target.value))}
                      className="w-20 accent-[var(--ag-accent-primary)]"
                    />

                    {previewConfig.gradient.stops.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveGradientStop(idx)}
                        className="text-[var(--ag-muted-text)] hover:text-rose-500 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
