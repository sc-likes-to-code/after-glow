'use client';

import React, { useState, useMemo } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { FlowerIllustration } from '@/components/scrapbook/FlowerIllustration';
import { MoodBadge, WashiTape, TinyFlower, TinySparkle } from '@/components/scrapbook/Decorations';
import { MOODS } from '@/lib/constants';
import { MoodType, Memory } from '@/types/memory';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
} from 'date-fns';
import {
  Flower2,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react';

export function MoodGardenView() {
  const { memories, setSelectedMemoryId, openCaptureModal } = useMemoryStore();

  const [currentCalendarMonth, setCurrentCalendarMonth] = useState<Date>(() => new Date());
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<MoodType | null>(null);
  const [selectedDayMemories, setSelectedDayMemories] = useState<Memory[] | null>(null);

  // Calculate mood counts
  const moodDistribution = useMemo(() => {
    const counts: Partial<Record<MoodType, number>> = {};
    (Object.keys(MOODS) as MoodType[]).forEach((m) => (counts[m] = 0));

    memories.forEach((mem) => {
      counts[mem.mood] = (counts[mem.mood] || 0) + 1;
    });

    return counts;
  }, [memories]);

  // Most frequent mood
  const mostFrequentMood = useMemo(() => {
    let top: MoodType = 'peaceful';
    let max = -1;
    for (const [key, val] of Object.entries(moodDistribution)) {
      if ((val || 0) > max) {
        max = val || 0;
        top = key as MoodType;
      }
    }
    return { mood: top, count: max, meta: MOODS[top] || MOODS.peaceful };
  }, [moodDistribution]);

  // Calendar dates for current month
  const monthStart = startOfMonth(currentCalendarMonth);
  const monthEnd = endOfMonth(currentCalendarMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  // Offset to align starting day of week
  const startDayOfWeek = monthStart.getDay(); // 0 is Sunday

  // Memories filtered by selected mood
  const moodFilteredMemories = useMemo(() => {
    if (!selectedMoodFilter) return [];
    return memories.filter((m) => m.mood === selectedMoodFilter);
  }, [memories, selectedMoodFilter]);

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-16">
      {/* HEADER SECTION */}
      <div className="relative pt-2 pb-6 border-b border-[var(--ag-border)]/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flower2 className="w-4 h-4 text-[var(--ag-accent-primary)]" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--ag-muted-text)]">
                Your Emotional Meadow
              </span>
            </div>
            <h1 className="font-fraunces text-3xl sm:text-4xl font-bold text-[var(--ag-primary-text)]">
              Mood Garden
            </h1>
            <p className="font-caveat text-xl text-[var(--ag-muted-text)]">
              every feeling planted, blooming like wild flora in the sun
            </p>
          </div>

          {/* Top Mood Highlight Banner */}
          {memories.length > 0 && (
            <div className="flex items-center gap-3 p-3.5 rounded-lg bg-[var(--ag-surface)] border border-[var(--ag-border)] shadow-2xs">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <FlowerIllustration mood={mostFrequentMood.mood} size={48} animate={true} />
              </div>
              <div>
                <span className="text-[11px] font-sans text-[var(--ag-muted-text)] block uppercase tracking-wider">
                  Most Frequent Bloom
                </span>
                <span className="font-fraunces text-base font-bold text-[var(--ag-primary-text)]">
                  {mostFrequentMood.meta.label} ({mostFrequentMood.meta.flower})
                </span>
                <span className="text-xs font-caveat text-[var(--ag-secondary-text)] block">
                  {mostFrequentMood.count} blooming moment{mostFrequentMood.count > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* THE INTERACTIVE BOTANICAL GARDEN MEADOW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TinyFlower className="w-4 h-4 text-[var(--ag-accent-primary)]" />
            <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)]">
              The Meadow
            </h2>
          </div>
          <span className="text-xs font-caveat text-base text-[var(--ag-muted-text)]">
            Click any flower to wander through that moment
          </span>
        </div>

        {/* Illustrated Garden Plot */}
        <div className="relative w-full rounded-xl bg-gradient-to-b from-[var(--ag-bg)] via-[var(--ag-surface)] to-[var(--ag-border)] border border-[var(--ag-border)] p-6 sm:p-10 shadow-sm overflow-hidden min-h-[380px] flex flex-col justify-end">
          {/* Subtle Sunbeams in Garden Background */}
          <div className="absolute top-0 right-10 w-72 h-72 bg-gradient-to-b from-[var(--ag-accent-secondary)]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Decorative Washi Tape */}
          <div className="absolute top-4 left-6 pointer-events-none">
            <WashiTape color="sage" width="w-24" angle={-2} />
          </div>

          {/* The Blooming Flower Stems planted in soil */}
          {memories.length > 0 ? (
            <div className="relative z-10 flex flex-wrap items-end justify-center gap-4 sm:gap-7 pb-4">
              {memories.map((m, idx) => {
                const meta = MOODS[m.mood] || MOODS.peaceful;
                const heights = [70, 85, 95, 65, 80, 90, 75];
                const height = heights[idx % heights.length];

                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMemoryId(m.id)}
                    className="group relative cursor-pointer flex flex-col items-center transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* Hover tooltip card */}
                    <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30 bg-[var(--ag-card-bg)] p-2 rounded-md shadow-lg border border-[var(--ag-border)] whitespace-nowrap text-center">
                      <span className="font-fraunces text-xs font-bold text-[var(--ag-primary-text)] block">
                        {m.title}
                      </span>
                      <span className="text-[10px] text-[var(--ag-muted-text)] font-mono">
                        {m.date} • {meta.label}
                      </span>
                    </div>

                    {/* Flower Graphic */}
                    <div className="w-14 sm:w-16 h-18 sm:h-20 flex items-end justify-center">
                      <FlowerIllustration mood={m.mood} size={height} animate={true} />
                    </div>

                    {/* Soil Mound */}
                    <div className="w-10 h-2 rounded-full bg-[var(--ag-muted-text)]/30 -mt-1 group-hover:bg-[var(--ag-muted-text)]/50 transition-colors" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 space-y-3 z-10">
              <Flower2 className="w-10 h-10 text-[var(--ag-accent-primary)] mx-auto opacity-70" />
              <h3 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)]">
                Your garden is quietly resting
              </h3>
              <p className="font-caveat text-lg text-[var(--ag-muted-text)]">
                Record a memory to plant your first blooming flower.
              </p>
              <button
                type="button"
                onClick={() => openCaptureModal()}
                className="mt-2 px-5 py-2.5 rounded-full bg-[var(--ag-accent-primary)] text-white text-xs font-semibold shadow-xs hover:opacity-90 cursor-pointer transition-opacity"
              >
                + Plant a moment
              </button>
            </div>
          )}

          {/* Garden Earthen Soil Bed Baseline */}
          <div className="w-full h-4 rounded-sm bg-[var(--ag-border)]/60 border-t border-[var(--ag-border)] mt-2" />
        </div>
      </section>

      {/* FLORAL MOOD CALENDAR & FLOWER DISTRIBUTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FLORAL MOOD CALENDAR */}
        <div className="p-6 rounded-lg bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-2xs relative">
          <div className="absolute -top-3 right-6 pointer-events-none">
            <WashiTape color="blush" width="w-20" angle={2} />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[var(--ag-accent-primary)]" />
              <h3 className="font-fraunces text-lg font-bold text-[var(--ag-primary-text)]">
                Floral Mood Calendar
              </h3>
            </div>

            {/* Month Nav Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentCalendarMonth((prev) => subMonths(prev, 1))}
                className="p-1 rounded-full hover:bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-fraunces text-sm font-semibold text-[var(--ag-primary-text)] min-w-[120px] text-center">
                {format(currentCalendarMonth, 'MMMM yyyy')}
              </span>
              <button
                type="button"
                onClick={() => setCurrentCalendarMonth((prev) => addMonths(prev, 1))}
                className="p-1 rounded-full hover:bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px] text-[var(--ag-muted-text)] mb-2 font-bold">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Empty slots before day 1 */}
            {Array.from({ length: startDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}

            {/* Days in Month */}
            {daysInMonth.map((day) => {
              const dayStr = format(day, 'yyyy-MM-dd');
              const dayMemories = memories.filter((m) => m.date === dayStr);
              const hasMemories = dayMemories.length > 0;
              const primaryMood = dayMemories[0]?.mood;

              return (
                <div
                  key={dayStr}
                  onClick={() => {
                    if (hasMemories) {
                      setSelectedDayMemories(dayMemories);
                    }
                  }}
                  className={`aspect-square rounded-sm border p-1 flex flex-col justify-between items-center transition-all ${
                    hasMemories
                      ? 'bg-[var(--ag-surface)] border-[var(--ag-accent-primary)] cursor-pointer hover:scale-105 shadow-2xs text-[var(--ag-primary-text)]'
                      : 'bg-transparent border-transparent text-[var(--ag-muted-text)]/60'
                  }`}
                >
                  <span className="text-[10px] font-mono">{format(day, 'd')}</span>
                  {hasMemories && primaryMood && (
                    <div className="w-5 h-5 flex items-center justify-center">
                      <FlowerIllustration mood={primaryMood} size={18} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Selected Day Memories Preview popup if day clicked */}
          {selectedDayMemories && (
            <div className="mt-4 p-3 bg-[var(--ag-surface)] rounded-md border border-[var(--ag-border)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[var(--ag-primary-text)]">
                  Moments from {selectedDayMemories[0].date}:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedDayMemories(null)}
                  className="text-xs text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] cursor-pointer"
                >
                  Close
                </button>
              </div>
              <div className="space-y-1.5">
                {selectedDayMemories.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMemoryId(m.id)}
                    className="p-2 bg-[var(--ag-card-bg)] rounded-xs border border-[var(--ag-border)] cursor-pointer hover:bg-[var(--ag-surface)] flex items-center justify-between text-xs"
                  >
                    <span className="font-fraunces font-semibold text-[var(--ag-primary-text)] truncate">
                      {m.title}
                    </span>
                    <MoodBadge mood={m.mood} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FLOWER DISTRIBUTION & BOUQUET BREAKDOWN */}
        <div className="p-6 rounded-lg bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-2xs relative">
          <div className="absolute -top-3 left-6 pointer-events-none">
            <WashiTape color="butter" width="w-20" angle={-1} />
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-fraunces text-lg font-bold text-[var(--ag-primary-text)]">
              The Flower Breakdown
            </h3>
            <span className="text-xs font-serif text-[var(--ag-muted-text)]">
              {memories.length} total blossoms
            </span>
          </div>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {(Object.keys(MOODS) as MoodType[]).map((mKey) => {
              const meta = MOODS[mKey];
              const count = moodDistribution[mKey] || 0;
              const percentage = memories.length > 0 ? Math.round((count / memories.length) * 100) : 0;
              const isSelected = selectedMoodFilter === mKey;

              return (
                <div
                  key={mKey}
                  onClick={() => setSelectedMoodFilter(isSelected ? null : mKey)}
                  className={`p-2.5 rounded-md border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/30 shadow-xs'
                      : 'border-[var(--ag-border)]/60 bg-[var(--ag-surface)]/60 hover:bg-[var(--ag-surface)]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 flex items-center justify-center">
                      <FlowerIllustration mood={mKey} size={26} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[var(--ag-primary-text)] block">
                        {meta.label}{' '}
                        <span className="font-serif italic font-normal text-[var(--ag-muted-text)]">
                          ({meta.flower})
                        </span>
                      </span>
                      <span className="text-[10px] text-[var(--ag-muted-text)] block line-clamp-1">
                        {meta.description}
                      </span>
                    </div>
                  </div>

                  <div className="text-right pl-2">
                    <span className="font-mono text-xs font-bold text-[var(--ag-primary-text)]">
                      {count}
                    </span>
                    <span className="text-[10px] text-[var(--ag-muted-text)] block font-mono">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FILTERED MEMORIES LIST WHEN A MOOD IS CLICKED */}
      {selectedMoodFilter && (
        <section className="p-6 rounded-lg bg-[var(--ag-surface)] border border-[var(--ag-border)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FlowerIllustration mood={selectedMoodFilter} size={32} />
              <h3 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)]">
                Memories with {MOODS[selectedMoodFilter].label} ({MOODS[selectedMoodFilter].flower})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setSelectedMoodFilter(null)}
              className="text-xs font-semibold text-[var(--ag-accent-primary)] hover:underline cursor-pointer"
            >
              Clear filter
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {moodFilteredMemories.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMemoryId(m.id)}
                className="p-3 bg-[var(--ag-card-bg)] rounded-md border border-[var(--ag-border)] cursor-pointer hover:shadow-xs transition-shadow flex items-center gap-3"
              >
                {m.photos?.[0] && (
                  <div className="w-12 h-12 rounded-xs overflow-hidden shrink-0 border border-[var(--ag-border)]">
                    <img src={m.photos[0].dataUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-fraunces text-sm font-semibold text-[var(--ag-primary-text)] truncate">
                    {m.title}
                  </h4>
                  <span className="text-[10px] font-mono text-[var(--ag-muted-text)]">{m.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
