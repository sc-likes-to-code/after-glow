'use client';

import React from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import {
  WeekStartDay,
  DateFormatStyle,
  TimelineLayout,
  TimelineConnector,
} from '@/types/atelier';
import {
  Calendar as CalendarIcon,
  RotateCcw,
  Clock,
  Grid,
  List,
  Columns,
  Sparkles,
} from 'lucide-react';

export function CalendarTimelinePanel() {
  const { previewConfig, setPreviewConfig, resetAtelierCategory } = useMemoryStore();
  const ct = previewConfig.calendarTimeline;

  const updateCT = (partial: Partial<typeof ct>) => {
    setPreviewConfig((prev) => ({
      ...prev,
      calendarTimeline: {
        ...prev.calendarTimeline,
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
            <CalendarIcon className="w-5 h-5 text-[var(--ag-accent-primary)]" />
            Calendar & Timeline Studio
          </h2>
          <p className="font-caveat text-base text-[var(--ag-muted-text)]">
            Tailor the floral calendar, chronological journals, connectors, and grid layout.
          </p>
        </div>

        <button
          type="button"
          onClick={() => resetAtelierCategory('calendar-timeline')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] border border-[var(--ag-border)] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Calendar</span>
        </button>
      </div>

      {/* 1. TIMELINE LAYOUT & CONNECTORS */}
      <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
          Timeline Display Architecture
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'masonry', label: 'Scrapbook Grid', desc: 'Tilted polaroid cards in organic multi-column grid' },
            { id: 'chronological', label: 'Chronological List', desc: 'Horizontal diary entries with thumbnails' },
            { id: 'compact-feed', label: 'Compact Feed', desc: 'Tight vertical feed for fast skimming' },
          ].map((mode) => (
            <div
              key={mode.id}
              onClick={() => updateCT({ timelineLayout: mode.id as TimelineLayout })}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                ct.timelineLayout === mode.id
                  ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/30 ring-2 ring-[var(--ag-accent-primary)] shadow-2xs'
                  : 'border-[var(--ag-border)] bg-[var(--ag-surface)] hover:bg-[var(--ag-card-bg)]'
              }`}
            >
              <h4 className="font-fraunces text-sm font-bold text-[var(--ag-primary-text)]">
                {mode.label}
              </h4>
              <p className="text-xs text-[var(--ag-muted-text)] leading-relaxed">{mode.desc}</p>
            </div>
          ))}
        </div>

        {/* Connectors & Column Count */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Timeline Connector Line */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Month Connector Line Style
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['washi', 'solid', 'dashed', 'botanical'] as TimelineConnector[]).map((conn) => (
                <button
                  key={conn}
                  type="button"
                  onClick={() => updateCT({ timelineConnector: conn })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    ct.timelineConnector === conn
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {conn}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Columns */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Grid Columns
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['auto', 2, 3, 4] as const).map((col) => (
                <button
                  key={String(col)}
                  type="button"
                  onClick={() => updateCT({ columnCount: col })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    ct.columnCount === col
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {col === 'auto' ? 'Auto' : `${col} Cols`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. CALENDAR CONTROLS & DATE FORMATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)]">
        {/* Week Start */}
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
            Calendar Preferences
          </span>

          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              First Day of the Week
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['sunday', 'monday'] as WeekStartDay[]).map((ws) => (
                <button
                  key={ws}
                  type="button"
                  onClick={() => updateCT({ weekStart: ws })}
                  className={`py-2 text-xs rounded-md border capitalize font-medium transition-colors ${
                    ct.weekStart === ws
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {ws === 'sunday' ? 'Sunday (Traditional)' : 'Monday (Calendar)'}
                </button>
              ))}
            </div>
          </div>

          {/* Date Format Style */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Date Representation
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['standard', 'relative', 'poetic'] as DateFormatStyle[]).map((df) => (
                <button
                  key={df}
                  type="button"
                  onClick={() => updateCT({ dateFormat: df })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    ct.dateFormat === df
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {df}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mood Indicators & Separators */}
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
            Day Blooms & Embellishments
          </span>

          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Calendar Mood Mark Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['blossom', 'pill', 'glow'] as const).map((mi) => (
                <button
                  key={mi}
                  type="button"
                  onClick={() => updateCT({ moodIndicators: mi })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    ct.moodIndicators === mi
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {mi === 'blossom' ? '🌸 Blossom' : mi === 'pill' ? '🏷 Pill' : '✨ Glow'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Date Separator Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['washi', 'line', 'botanical'] as const).map((ds) => (
                <button
                  key={ds}
                  type="button"
                  onClick={() => updateCT({ dateSeparators: ds })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    ct.dateSeparators === ds
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {ds}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
