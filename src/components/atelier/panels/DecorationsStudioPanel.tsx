'use client';

import React from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import {
  DecorationCategory,
  ExtendedDecorStyle,
  DecorIntensity,
} from '@/types/atelier';
import {
  Sparkles,
  RotateCcw,
  Flower2,
  Heart,
  Moon,
  Paperclip,
  Check,
} from 'lucide-react';

export function DecorationsStudioPanel() {
  const { previewConfig, setPreviewConfig, resetAtelierCategory } = useMemoryStore();
  const decor = previewConfig.decorations;

  const decorStyles: { id: ExtendedDecorStyle; label: string; desc: string }[] = [
    { id: 'floral', label: 'Floral Romance', desc: 'Petals, blossoms, and wild roses' },
    { id: 'botanical', label: 'Botanical Sanctuary', desc: 'Pressed leaves, eucalyptus, and fern fronds' },
    { id: 'celestial', label: 'Celestial Twilight', desc: 'Moons, four-point stars, and stardust' },
    { id: 'vintage-scrapbook', label: 'Vintage Scrapbook', desc: 'Washi tapes, paperclips, and postmarks' },
    { id: 'minimal', label: 'Modern Minimal', desc: 'Restrained delicate flourishes only' },
    { id: 'playful', label: 'Playful Doodles', desc: 'Cheerful sparks, butterflies, and smiles' },
  ];

  const categories: { id: DecorationCategory; label: string; icon: string }[] = [
    { id: 'flowers', label: 'Blossoms', icon: '🌸' },
    { id: 'stars', label: 'Stars & Sparkles', icon: '✨' },
    { id: 'hearts', label: 'Tiny Hearts', icon: '♡' },
    { id: 'butterflies', label: 'Butterflies', icon: '🦋' },
    { id: 'leaves', label: 'Foliage & Leaves', icon: '🌿' },
    { id: 'clouds', label: 'Puffy Clouds', icon: '☁' },
    { id: 'moons', label: 'Crescent Moons', icon: '🌙' },
    { id: 'doodles', label: 'Hand Doodles', icon: '✏' },
    { id: 'paper-clips', label: 'Paper Clips', icon: '📎' },
    { id: 'washi-tape', label: 'Washi Tape', icon: '🏷' },
    { id: 'stamps', label: 'Postage Stamps', icon: '📮' },
    { id: 'ribbons', label: 'Silk Ribbons', icon: '🎀' },
    { id: 'botanicals', label: 'Pressed Herbs', icon: '🍃' },
  ];

  const updateDecor = (partial: Partial<typeof decor>) => {
    setPreviewConfig((prev) => ({
      ...prev,
      decorations: {
        ...prev.decorations,
        ...partial,
      },
    }));
  };

  const toggleCategory = (catId: DecorationCategory) => {
    const current = decor.activeCategories || [];
    const exists = current.includes(catId);
    const updated = exists ? current.filter((c) => c !== catId) : [...current, catId];
    updateDecor({ activeCategories: updated });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--ag-border)]">
        <div>
          <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--ag-accent-primary)]" />
            Decoration Studio
          </h2>
          <p className="font-caveat text-base text-[var(--ag-muted-text)]">
            Hand-drawn botanicals, washi tape, stamps, celestial sparkles, and scrapbook stickers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => resetAtelierCategory('decorations-studio')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] border border-[var(--ag-border)] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Decor</span>
        </button>
      </div>

      {/* MASTER ENABLE TOGGLE */}
      <div className="p-4 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] flex items-center justify-between">
        <div>
          <h3 className="font-fraunces text-sm font-bold text-[var(--ag-primary-text)]">
            Enable Decorative Flourishes
          </h3>
          <p className="text-xs text-[var(--ag-muted-text)]">
            Turn on or off all scrapbook stickers, tapes, and illustrations application-wide.
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={decor.enabled}
            onChange={(e) => updateDecor({ enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-[var(--ag-border)] peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--ag-accent-primary)]" />
        </label>
      </div>

      {decor.enabled && (
        <div className="space-y-6">
          {/* 1. DECORATION STYLE ARCHETYPES */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
              Decorative Aesthetic Theme
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {decorStyles.map((ds) => {
                const isSelected = decor.style === ds.id;

                return (
                  <div
                    key={ds.id}
                    onClick={() => updateDecor({ style: ds.id })}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                      isSelected
                        ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/30 ring-2 ring-[var(--ag-accent-primary)] shadow-2xs'
                        : 'border-[var(--ag-border)] bg-[var(--ag-card-bg)] hover:bg-[var(--ag-surface)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-fraunces text-sm font-bold text-[var(--ag-primary-text)]">
                        {ds.label}
                      </h4>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[var(--ag-accent-primary)]" />
                      )}
                    </div>
                    <p className="text-xs text-[var(--ag-muted-text)]">{ds.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. ACTIVE ASSET CATEGORIES CHECKBOXES */}
          <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)]">
                Active Asset Categories
              </span>
              <span className="text-xs font-caveat text-[var(--ag-muted-text)]">
                toggle elements you want to appear
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {categories.map((cat) => {
                const isChecked = (decor.activeCategories || []).includes(cat.id);

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`p-2.5 rounded-lg border text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                      isChecked
                        ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/30 font-semibold text-[var(--ag-primary-text)]'
                        : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{cat.icon}</span>
                      <span>{cat.label}</span>
                    </div>
                    {isChecked && <Check className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. INTENSITY, SCALE & ANIMATION CONTROLS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)]">
            {/* Sliders */}
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
                Visual Density & Metrics
              </span>

              {/* Intensity */}
              <div>
                <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
                  Decoration Density
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['subtle', 'balanced', 'rich'] as DecorIntensity[]).map((int) => (
                    <button
                      key={int}
                      type="button"
                      onClick={() => updateDecor({ intensity: int })}
                      className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                        decor.intensity === int
                          ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                          : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                      }`}
                    >
                      {int}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scale */}
              <div>
                <div className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] mb-1 font-medium">
                  <span>Decoration Size Scale</span>
                  <span className="font-mono text-[var(--ag-primary-text)] font-bold">
                    {Math.round((decor.scale || 1.0) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={Math.round((decor.scale || 1.0) * 100)}
                  onChange={(e) => updateDecor({ scale: parseInt(e.target.value) / 100 })}
                  className="w-full accent-[var(--ag-accent-primary)] cursor-pointer"
                />
              </div>

              {/* Opacity */}
              <div>
                <div className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] mb-1 font-medium">
                  <span>Decoration Opacity</span>
                  <span className="font-mono text-[var(--ag-primary-text)] font-bold">
                    {Math.round((decor.opacity || 0.85) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={Math.round((decor.opacity || 0.85) * 100)}
                  onChange={(e) => updateDecor({ opacity: parseInt(e.target.value) / 100 })}
                  className="w-full accent-[var(--ag-accent-primary)] cursor-pointer"
                />
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
                Placement & Motion
              </span>

              <label className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] font-medium cursor-pointer p-2 rounded-md bg-[var(--ag-surface)] border border-[var(--ag-border)]">
                <span>Floating Ambient Motion</span>
                <input
                  type="checkbox"
                  checked={decor.floatingAnimation}
                  onChange={(e) => updateDecor({ floatingAnimation: e.target.checked })}
                  className="w-4 h-4 rounded-sm accent-[var(--ag-accent-primary)]"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] font-medium cursor-pointer p-2 rounded-md bg-[var(--ag-surface)] border border-[var(--ag-border)]">
                <span>Washi Tape Edges on Cards</span>
                <input
                  type="checkbox"
                  checked={decor.washiTapeEnabled}
                  onChange={(e) => updateDecor({ washiTapeEnabled: e.target.checked })}
                  className="w-4 h-4 rounded-sm accent-[var(--ag-accent-primary)]"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] font-medium cursor-pointer p-2 rounded-md bg-[var(--ag-surface)] border border-[var(--ag-border)]">
                <span>Heading Little Flora & Sparkles</span>
                <input
                  type="checkbox"
                  checked={decor.headingIllustrations}
                  onChange={(e) => updateDecor({ headingIllustrations: e.target.checked })}
                  className="w-4 h-4 rounded-sm accent-[var(--ag-accent-primary)]"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] font-medium cursor-pointer p-2 rounded-md bg-[var(--ag-surface)] border border-[var(--ag-border)]">
                <span>Postage Stamps & Travel Seals</span>
                <input
                  type="checkbox"
                  checked={decor.stampsEnabled}
                  onChange={(e) => updateDecor({ stampsEnabled: e.target.checked })}
                  className="w-4 h-4 rounded-sm accent-[var(--ag-accent-primary)]"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
