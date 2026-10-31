'use client';

import React from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { HomepageSectionVisibility, HomepageLayout } from '@/types/atelier';
import {
  Home,
  RotateCcw,
  Sparkles,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Quote,
} from 'lucide-react';

export function HomepagePersonalizationPanel() {
  const { previewConfig, setPreviewConfig, resetAtelierCategory } = useMemoryStore();
  const hp = previewConfig.homepage;

  const updateHP = (partial: Partial<typeof hp>) => {
    setPreviewConfig((prev) => ({
      ...prev,
      homepage: {
        ...prev.homepage,
        ...partial,
      },
    }));
  };

  const sectionLabels: Record<keyof HomepageSectionVisibility, string> = {
    todaysMoments: "Today's Moments",
    recentlyRemembered: 'Recently Remembered',
    aLittleWhileAgo: 'A Little While Ago',
    monthlyStory: "This Month's Little Story",
    onThisDay: 'On This Day Flashback',
    gentleReminder: 'Gentle Comfort Reminder',
  };

  const toggleSection = (sectionKey: keyof HomepageSectionVisibility) => {
    updateHP({
      visibleSections: {
        ...hp.visibleSections,
        [sectionKey]: !hp.visibleSections[sectionKey],
      },
    });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const order = [...hp.sectionOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= order.length) return;

    const temp = order[index];
    order[index] = order[targetIndex];
    order[targetIndex] = temp;

    updateHP({ sectionOrder: order });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--ag-border)]">
        <div>
          <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
            <Home className="w-5 h-5 text-[var(--ag-accent-primary)]" />
            Homepage Personalization
          </h2>
          <p className="font-caveat text-base text-[var(--ag-muted-text)]">
            Tailor greetings, editorial quotes, section ordering, and curate your front sanctuary.
          </p>
        </div>

        <button
          type="button"
          onClick={() => resetAtelierCategory('homepage-studio')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] border border-[var(--ag-border)] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restore Default Home</span>
        </button>
      </div>

      {/* 1. GREETING & EDITORIAL MESSAGES */}
      <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
          Hero Greeting & Editorial Whispers
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
              Main Greeting Title
            </label>
            <input
              type="text"
              value={hp.customGreeting || ''}
              onChange={(e) => updateHP({ customGreeting: e.target.value })}
              placeholder="Good morning, sunshine ☀"
              className="w-full px-3 py-2 text-xs rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
              Subtitle Sentiment
            </label>
            <input
              type="text"
              value={hp.customSubtitle || ''}
              onChange={(e) => updateHP({ customSubtitle: e.target.value })}
              placeholder="A gentle place for the moments that matter"
              className="w-full px-3 py-2 text-xs rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
              Introductory Memory Quote
            </label>
            <input
              type="text"
              value={hp.customIntroQuote || ''}
              onChange={(e) => updateHP({ customIntroQuote: e.target.value })}
              placeholder="We do not remember days, we remember moments."
              className="w-full px-3 py-2 text-xs rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
              Footer Comfort Whisper
            </label>
            <input
              type="text"
              value={hp.customFooterMessage || ''}
              onChange={(e) => updateHP({ customFooterMessage: e.target.value })}
              placeholder="Some moments are too beautiful to let them fade ♡"
              className="w-full px-3 py-2 text-xs rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)]"
            />
          </div>
        </div>
      </div>

      {/* 2. SECTION ORDER & VISIBILITY MANAGER */}
      <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)]">
            Homepage Section Sequence & Visibility
          </span>
          <span className="text-xs font-caveat text-[var(--ag-muted-text)]">
            re-order sections with up / down arrows
          </span>
        </div>

        <div className="space-y-2">
          {hp.sectionOrder.map((sectionKey, idx) => {
            const isVisible = hp.visibleSections[sectionKey];

            return (
              <div
                key={sectionKey}
                className={`p-3 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                  isVisible
                    ? 'border-[var(--ag-border)] bg-[var(--ag-surface)]'
                    : 'border-[var(--ag-border)]/50 bg-[var(--ag-surface)]/40 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--ag-muted-text)] w-4 text-center">
                    {idx + 1}
                  </span>
                  <span className="font-fraunces text-sm font-semibold text-[var(--ag-primary-text)]">
                    {sectionLabels[sectionKey]}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Visibility Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleSection(sectionKey)}
                    className="p-1 rounded-md text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] hover:bg-[var(--ag-card-bg)]"
                    title={isVisible ? 'Hide Section' : 'Show Section'}
                  >
                    {isVisible ? <Eye className="w-4 h-4 text-[var(--ag-accent-primary)]" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  {/* Re-order Up */}
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveSection(idx, 'up')}
                    className="p-1 rounded-md text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] hover:bg-[var(--ag-card-bg)] disabled:opacity-20 cursor-pointer"
                    title="Move up"
                  >
                    <MoveUp className="w-4 h-4" />
                  </button>

                  {/* Re-order Down */}
                  <button
                    type="button"
                    disabled={idx === hp.sectionOrder.length - 1}
                    onClick={() => moveSection(idx, 'down')}
                    className="p-1 rounded-md text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] hover:bg-[var(--ag-card-bg)] disabled:opacity-20 cursor-pointer"
                    title="Move down"
                  >
                    <MoveDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. HOMEPAGE LAYOUT ARCHETYPES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)]">
        {[
          { id: 'scrapbook', label: 'Vintage Scrapbook', desc: 'Organic rotations, floral dividers, and washi paper accents' },
          { id: 'editorial', label: 'Editorial Journal', desc: 'Museum white margins, crisp serif layout, minimal clutter' },
          { id: 'magazine', label: 'Photo Magazine', desc: 'High visual density, large cover cards, storytelling focus' },
        ].map((lay) => (
          <div
            key={lay.id}
            onClick={() => updateHP({ layout: lay.id as HomepageLayout })}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
              hp.layout === lay.id
                ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/30 ring-2 ring-[var(--ag-accent-primary)] shadow-2xs'
                : 'border-[var(--ag-border)] bg-[var(--ag-surface)] hover:bg-[var(--ag-card-bg)]'
            }`}
          >
            <h4 className="font-fraunces text-sm font-bold text-[var(--ag-primary-text)]">
              {lay.label}
            </h4>
            <p className="text-xs text-[var(--ag-muted-text)] leading-relaxed">{lay.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
