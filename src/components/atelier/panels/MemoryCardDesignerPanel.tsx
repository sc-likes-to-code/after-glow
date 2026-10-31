'use client';

import React from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import {
  ExtendedCardStyle,
  ShadowIntensity,
  RotationIntensity,
  CardPadding,
  CardAspectRatio,
  CardHoverEffect,
} from '@/types/atelier';
import {
  Frame,
  RotateCcw,
  Sparkles,
  Sliders,
  Maximize2,
  Calendar,
  Layers,
} from 'lucide-react';

export function MemoryCardDesignerPanel() {
  const { previewConfig, setPreviewConfig, resetAtelierCategory } = useMemoryStore();
  const card = previewConfig.card;

  const cardStyles: { id: ExtendedCardStyle; label: string; desc: string }[] = [
    { id: 'polaroid', label: 'Vintage Polaroid', desc: 'Classic white border with handwritten bottom lip' },
    { id: 'soft-rounded', label: 'Soft Rounded', desc: 'Gentle 20px corners, delicate pastel curves' },
    { id: 'editorial', label: 'Editorial Fine Art', desc: 'Crisp thin hairline border with museum feel' },
    { id: 'minimal', label: 'Modern Minimal', desc: 'Frameless subtle float with focus on photography' },
    { id: 'vintage-postcard', label: 'Vintage Postcard', desc: 'Textured paper edge with travel stamp aesthetic' },
    { id: 'scrapbook-collage', label: 'Scrapbook Collage', desc: 'Dashed stitch borders with eclectic charm' },
  ];

  const updateCard = (partial: Partial<typeof card>) => {
    setPreviewConfig((prev) => ({
      ...prev,
      card: {
        ...prev.card,
        ...partial,
      },
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--ag-border)]">
        <div>
          <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
            <Frame className="w-5 h-5 text-[var(--ag-accent-primary)]" />
            Memory Card Designer
          </h2>
          <p className="font-caveat text-base text-[var(--ag-muted-text)]">
            Shape how moments, polaroid frames, and diary snapshots are rendered everywhere.
          </p>
        </div>

        <button
          type="button"
          onClick={() => resetAtelierCategory('card-designer')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] border border-[var(--ag-border)] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Card Design</span>
        </button>
      </div>

      {/* 1. CARD STYLE ARCHETYPES */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
          Card Archetype Presets (6 Styles)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {cardStyles.map((cs) => {
            const isSelected = card.style === cs.id;

            return (
              <div
                key={cs.id}
                onClick={() => {
                  const radiusMap: Record<ExtendedCardStyle, number> = {
                    polaroid: 4,
                    'soft-rounded': 20,
                    editorial: 2,
                    minimal: 12,
                    'vintage-postcard': 6,
                    'scrapbook-collage': 8,
                  };
                  updateCard({ style: cs.id, borderRadius: radiusMap[cs.id] });
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/30 ring-2 ring-[var(--ag-accent-primary)] shadow-2xs'
                    : 'border-[var(--ag-border)] bg-[var(--ag-card-bg)] hover:bg-[var(--ag-surface)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-fraunces text-sm font-bold text-[var(--ag-primary-text)]">
                    {cs.label}
                  </h4>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[var(--ag-accent-primary)]" />
                  )}
                </div>
                <p className="text-xs text-[var(--ag-muted-text)] leading-relaxed">{cs.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. GEOMETRY & BORDER METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)]">
        {/* Sliders Column */}
        <div className="space-y-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
            Borders & Geometry
          </span>

          {/* Corner Radius */}
          <div>
            <div className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] mb-1 font-medium">
              <span>Corner Radius</span>
              <span className="font-mono text-[var(--ag-primary-text)] font-bold">
                {card.borderRadius ?? 4}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="32"
              value={card.borderRadius ?? 4}
              onChange={(e) => updateCard({ borderRadius: parseInt(e.target.value) })}
              className="w-full accent-[var(--ag-accent-primary)] cursor-pointer"
            />
          </div>

          {/* Border Thickness */}
          <div>
            <div className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] mb-1 font-medium">
              <span>Border Thickness</span>
              <span className="font-mono text-[var(--ag-primary-text)] font-bold">
                {card.borderWidth ?? 1}px
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              value={card.borderWidth ?? 1}
              onChange={(e) => updateCard({ borderWidth: parseInt(e.target.value) })}
              className="w-full accent-[var(--ag-accent-primary)] cursor-pointer"
            />
          </div>

          {/* Custom Border Color */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-[var(--ag-secondary-text)] font-medium">
              Card Border Color
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={card.borderColor || '#E8DFD1'}
                onChange={(e) => updateCard({ borderColor: e.target.value })}
                className="w-8 h-8 rounded-sm border-0 cursor-pointer"
              />
              {card.borderColor && (
                <button
                  type="button"
                  onClick={() => updateCard({ borderColor: undefined })}
                  className="text-[10px] text-[var(--ag-muted-text)] hover:underline"
                >
                  Theme Default
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Shadows, Rotations, Padding */}
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
            Depth & Physics
          </span>

          {/* Shadow Intensity */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Shadow Intensity
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['none', 'subtle', 'soft', 'dramatic'] as ShadowIntensity[]).map((sh) => (
                <button
                  key={sh}
                  type="button"
                  onClick={() => updateCard({ shadowIntensity: sh })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    card.shadowIntensity === sh
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {sh}
                </button>
              ))}
            </div>
          </div>

          {/* Rotation Intensity */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Organic Tilted Angle
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['none', 'subtle', 'playful'] as RotationIntensity[]).map((rot) => (
                <button
                  key={rot}
                  type="button"
                  onClick={() => updateCard({ rotationIntensity: rot })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    card.rotationIntensity === rot
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {rot}
                </button>
              ))}
            </div>
          </div>

          {/* Internal Padding */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Internal Padding
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['compact', 'comfortable', 'generous'] as CardPadding[]).map((pad) => (
                <button
                  key={pad}
                  type="button"
                  onClick={() => updateCard({ padding: pad })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    card.padding === pad
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {pad}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. PHOTO ASPECT RATIO & LABELS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)]">
        {/* Photo Aspect Ratio */}
        <div>
          <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1.5">
            Snapshot Aspect Ratio
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {(['square', 'landscape', 'portrait', 'natural'] as CardAspectRatio[]).map((ar) => (
              <button
                key={ar}
                type="button"
                onClick={() => updateCard({ aspectRatio: ar })}
                className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                  card.aspectRatio === ar
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                    : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                }`}
              >
                {ar}
              </button>
            ))}
          </div>
        </div>

        {/* Title Font in Card */}
        <div>
          <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1.5">
            Card Title Typography
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['heading', 'hand', 'body'] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => updateCard({ titleFont: tf })}
                className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                  card.titleFont === tf
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                    : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Hover Animation Effect */}
        <div>
          <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1.5">
            Hover Animation Effect
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {(['lift', 'tilt', 'glow', 'none'] as CardHoverEffect[]).map((he) => (
              <button
                key={he}
                type="button"
                onClick={() => updateCard({ hoverEffect: he })}
                className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                  card.hoverEffect === he
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                    : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                }`}
              >
                {he}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
