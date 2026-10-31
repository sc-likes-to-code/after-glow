'use client';

import React, { useState } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { FONT_PAIRINGS } from '@/lib/themes';
import { FontPairingId } from '@/types/theme';
import {
  Type,
  RotateCcw,
  AlignLeft,
  AlignCenter,
  Italic,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export function TypographyStudioPanel() {
  const { previewConfig, setPreviewConfig, resetAtelierCategory } = useMemoryStore();
  const typography = previewConfig.typography;

  const [samplePhrase, setSamplePhrase] = useState(
    'Some moments are too beautiful to let them fade.'
  );

  const pairingIds = Object.keys(FONT_PAIRINGS) as FontPairingId[];

  const handleSelectPairing = (pairingId: FontPairingId) => {
    const p = FONT_PAIRINGS[pairingId];
    setPreviewConfig((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        pairingId,
        headingFontName: p.headingFontName,
        bodyFontName: p.bodyFontName,
        handFontName: p.handFontName,
      },
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--ag-border)]">
        <div>
          <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
            <Type className="w-5 h-5 text-[var(--ag-accent-primary)]" />
            Typography Studio
          </h2>
          <p className="font-caveat text-base text-[var(--ag-muted-text)]">
            Editorial serifs, readable body text, and handwritten annotations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => resetAtelierCategory('typography-studio')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] border border-[var(--ag-border)] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Fonts</span>
        </button>
      </div>

      {/* 1. CURATED FONT PAIRINGS */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
          Editorial Font Pairings (5 Presets)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pairingIds.map((pId) => {
            const p = FONT_PAIRINGS[pId];
            const isSelected = typography.pairingId === pId;

            return (
              <div
                key={pId}
                onClick={() => handleSelectPairing(pId)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 group ${
                  isSelected
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/30 ring-2 ring-[var(--ag-accent-primary)] shadow-2xs'
                    : 'border-[var(--ag-border)] bg-[var(--ag-card-bg)] hover:bg-[var(--ag-surface)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-fraunces text-sm font-bold text-[var(--ag-primary-text)]">
                    {p.name}
                  </h4>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full bg-[var(--ag-accent-primary)] text-white text-[9px] font-bold">
                      Active
                    </span>
                  )}
                </div>

                <div className="space-y-1 py-1">
                  <div className={`text-base font-bold text-[var(--ag-primary-text)] ${p.headingClass}`}>
                    Afterglow Diary
                  </div>
                  <div className={`text-xs text-[var(--ag-secondary-text)] ${p.bodyClass}`}>
                    {p.previewText}
                  </div>
                  <div className={`text-sm text-[var(--ag-muted-text)] ${p.handClass}`}>
                    &ldquo;handwritten memories ♡&rdquo;
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. ADVANCED TYPOGRAPHY CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)]">
        {/* Scale & Sizes */}
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
            Scale & Sizing Metrics
          </span>

          {/* Heading Scale */}
          <div>
            <label className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] mb-1.5 font-medium">
              <span>Heading Scale</span>
              <span className="font-mono text-[var(--ag-muted-text)] capitalize">
                {typography.headingScale}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['compact', 'normal', 'expressive'] as const).map((sc) => (
                <button
                  key={sc}
                  type="button"
                  onClick={() =>
                    setPreviewConfig((prev) => ({
                      ...prev,
                      typography: { ...prev.typography, headingScale: sc },
                    }))
                  }
                  className={`py-1.5 text-xs rounded-md border font-medium capitalize transition-colors ${
                    typography.headingScale === sc
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {sc}
                </button>
              ))}
            </div>
          </div>

          {/* Body Font Size */}
          <div>
            <label className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] mb-1.5 font-medium">
              <span>Body Text Size</span>
              <span className="font-mono text-[var(--ag-muted-text)] capitalize">
                {typography.fontSize}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['small', 'medium', 'large'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() =>
                    setPreviewConfig((prev) => ({
                      ...prev,
                      typography: { ...prev.typography, fontSize: sz },
                    }))
                  }
                  className={`py-1.5 text-xs rounded-md border font-medium capitalize transition-colors ${
                    typography.fontSize === sz
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Heading Weight */}
          <div>
            <label className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] mb-1.5 font-medium">
              <span>Heading Weight</span>
              <span className="font-mono text-[var(--ag-muted-text)] capitalize">
                {typography.headingWeight}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['normal', 'semibold', 'bold'] as const).map((wt) => (
                <button
                  key={wt}
                  type="button"
                  onClick={() =>
                    setPreviewConfig((prev) => ({
                      ...prev,
                      typography: { ...prev.typography, headingWeight: wt },
                    }))
                  }
                  className={`py-1.5 text-xs rounded-md border font-medium capitalize transition-colors ${
                    typography.headingWeight === wt
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {wt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Spacing & Alignment */}
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
            Rhythm & Styling
          </span>

          {/* Line Height */}
          <div>
            <label className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] mb-1.5 font-medium">
              <span>Line Height</span>
              <span className="font-mono text-[var(--ag-muted-text)] capitalize">
                {typography.lineHeight}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['tight', 'normal', 'relaxed'] as const).map((lh) => (
                <button
                  key={lh}
                  type="button"
                  onClick={() =>
                    setPreviewConfig((prev) => ({
                      ...prev,
                      typography: { ...prev.typography, lineHeight: lh },
                    }))
                  }
                  className={`py-1.5 text-xs rounded-md border font-medium capitalize transition-colors ${
                    typography.lineHeight === lh
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {lh}
                </button>
              ))}
            </div>
          </div>

          {/* Letter Spacing */}
          <div>
            <label className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] mb-1.5 font-medium">
              <span>Letter Spacing</span>
              <span className="font-mono text-[var(--ag-muted-text)] capitalize">
                {typography.letterSpacing}
              </span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['tight', 'normal', 'wide'] as const).map((ls) => (
                <button
                  key={ls}
                  type="button"
                  onClick={() =>
                    setPreviewConfig((prev) => ({
                      ...prev,
                      typography: { ...prev.typography, letterSpacing: ls },
                    }))
                  }
                  className={`py-1.5 text-xs rounded-md border font-medium capitalize transition-colors ${
                    typography.letterSpacing === ls
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {ls}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles: Italic & Decorative */}
          <div className="pt-1 space-y-2">
            <label className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] font-medium cursor-pointer">
              <span>Italic Headings</span>
              <input
                type="checkbox"
                checked={typography.italicHeadings}
                onChange={(e) =>
                  setPreviewConfig((prev) => ({
                    ...prev,
                    typography: { ...prev.typography, italicHeadings: e.target.checked },
                  }))
                }
                className="w-4 h-4 rounded-sm accent-[var(--ag-accent-primary)]"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-[var(--ag-secondary-text)] font-medium cursor-pointer">
              <span>Decorative Headings & Flourishes</span>
              <input
                type="checkbox"
                checked={typography.decorativeHeadings}
                onChange={(e) =>
                  setPreviewConfig((prev) => ({
                    ...prev,
                    typography: { ...prev.typography, decorativeHeadings: e.target.checked },
                  }))
                }
                className="w-4 h-4 rounded-sm accent-[var(--ag-accent-primary)]"
              />
            </label>
          </div>
        </div>
      </div>

      {/* 3. LIVE INTERACTIVE TYPOGRAPHY TESTER */}
      <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-surface)] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
            Live Specimen Test
          </span>
          <span className="text-xs font-caveat text-[var(--ag-muted-text)]">
            Type anything to test the typeface
          </span>
        </div>

        <input
          type="text"
          value={samplePhrase}
          onChange={(e) => setSamplePhrase(e.target.value)}
          className="w-full px-3.5 py-2 text-xs rounded-md bg-[var(--ag-card-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] font-sans"
        />

        <div className="p-4 rounded-lg bg-[var(--ag-card-bg)] border border-[var(--ag-border)] space-y-2">
          <div
            style={{
              fontStyle: typography.italicHeadings ? 'italic' : 'normal',
              fontWeight: typography.headingWeight === 'bold' ? 700 : typography.headingWeight === 'semibold' ? 600 : 400,
              letterSpacing: typography.letterSpacing === 'wide' ? '0.05em' : typography.letterSpacing === 'tight' ? '-0.02em' : 'normal',
            }}
            className="font-heading text-2xl text-[var(--ag-primary-text)]"
          >
            {samplePhrase}
          </div>
          <div className="font-body text-xs text-[var(--ag-secondary-text)] leading-relaxed">
            Every memory is stamped with a date, written down slowly on digital paper, and sealed with quiet satisfaction.
          </div>
          <div className="font-hand text-lg text-[var(--ag-accent-primary)]">
            ~ handwritten with love in Afterglow
          </div>
        </div>
      </div>
    </div>
  );
}
