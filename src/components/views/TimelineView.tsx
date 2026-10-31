'use client';

import React, { useState, useMemo } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { PolaroidCard } from '@/components/scrapbook/PolaroidCard';
import { MoodBadge, WashiTape, TinySparkle, TinyFlower } from '@/components/scrapbook/Decorations';
import { MOODS } from '@/lib/constants';
import { MoodType, Memory } from '@/types/memory';
import { format, parseISO } from 'date-fns';
import {
  Calendar,
  Grid,
  List,
  Filter,
  Search,
  Folder,
  Tag,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

export function TimelineView() {
  const {
    memories,
    collections,
    filterMood,
    setFilterMood,
    filterCollectionId,
    setFilterCollectionId,
    filterTag,
    setFilterTag,
    timelineViewMode,
    setTimelineViewMode,
    setSelectedMemoryId,
    openCaptureModal,
  } = useMemoryStore();

  const [localSearch, setLocalSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<string | 'all'>('all');

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    memories.forEach((m) => m.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [memories]);

  // Filter memories
  const filteredMemories = useMemo(() => {
    return memories.filter((m) => {
      // Mood filter
      if (filterMood !== 'all' && m.mood !== filterMood) return false;

      // Collection filter
      if (filterCollectionId !== 'all' && m.collectionId !== filterCollectionId) return false;

      // Tag filter
      if (filterTag && !m.tags?.includes(filterTag)) return false;

      // Year filter
      if (selectedYear !== 'all' && !m.date.startsWith(selectedYear)) return false;

      // Search query
      if (localSearch.trim()) {
        const query = localSearch.toLowerCase();
        const inTitle = m.title.toLowerCase().includes(query);
        const inJournal = m.journal.toLowerCase().includes(query);
        const inLocation = m.location?.toLowerCase().includes(query) || false;
        const inTags = m.tags?.some((t) => t.toLowerCase().includes(query)) || false;
        if (!inTitle && !inJournal && !inLocation && !inTags) return false;
      }

      return true;
    });
  }, [memories, filterMood, filterCollectionId, filterTag, selectedYear, localSearch]);

  // Group chronologically: Year -> Month
  const groupedTimeline = useMemo(() => {
    const groups: {
      year: string;
      months: {
        monthKey: string;
        monthName: string;
        memories: Memory[];
      }[];
    }[] = [];

    const yearsMap: Record<string, Record<string, Memory[]>> = {};

    filteredMemories.forEach((m) => {
      const year = m.date.substring(0, 4);
      const monthKey = m.date.substring(0, 7);

      if (!yearsMap[year]) {
        yearsMap[year] = {};
      }
      if (!yearsMap[year][monthKey]) {
        yearsMap[year][monthKey] = [];
      }
      yearsMap[year][monthKey].push(m);
    });

    // Sort years descending
    const sortedYears = Object.keys(yearsMap).sort((a, b) => b.localeCompare(a));

    sortedYears.forEach((year) => {
      const sortedMonths = Object.keys(yearsMap[year]).sort((a, b) => b.localeCompare(a));
      const monthItems = sortedMonths.map((mKey) => {
        const sampleDate = parseISO(mKey + '-01');
        return {
          monthKey: mKey,
          monthName: format(sampleDate, 'MMMM yyyy'),
          memories: yearsMap[year][mKey],
        };
      });

      groups.push({
        year,
        months: monthItems,
      });
    });

    return groups;
  }, [filteredMemories]);

  // Unique years for year navigation
  const availableYears = useMemo(() => {
    const set = new Set<string>();
    memories.forEach((m) => set.add(m.date.substring(0, 4)));
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [memories]);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* TIMELINE HEADER */}
      <div className="relative pt-2 pb-6 border-b border-[var(--ag-border)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-[var(--ag-accent-primary)]" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--ag-muted-text)]">
                Chronological Memory Book
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--ag-primary-text)]">
              My Timeline
            </h1>
            <p className="font-caveat text-xl text-[var(--ag-muted-text)]">
              a life slowly unfolding in little moments
            </p>
          </div>

          {/* View Switcher (Masonry Scrapbook vs List View) */}
          <div className="flex items-center gap-2 bg-[var(--ag-surface)] p-1 rounded-lg border border-[var(--ag-border)] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setTimelineViewMode('masonry')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                timelineViewMode === 'masonry'
                  ? 'bg-[var(--ag-card-bg)] text-[var(--ag-primary-text)] shadow-2xs'
                  : 'text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Scrapbook Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setTimelineViewMode('chronological')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                timelineViewMode === 'chronological'
                  ? 'bg-[var(--ag-card-bg)] text-[var(--ag-primary-text)] shadow-2xs'
                  : 'text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)]'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Chronological List</span>
            </button>
          </div>
        </div>

        {/* FILTER CONTROLS BAR */}
        <div className="mt-6 pt-5 border-t border-[var(--ag-border)] space-y-3">
          {/* Search & Quick Year Jump */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <Search className="w-4 h-4 text-[var(--ag-muted-text)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter moments by keyword, place, tag..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-full bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
              />
            </div>

            {/* Year Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-[var(--ag-muted-text)] font-mono mr-1">Year:</span>
              <button
                type="button"
                onClick={() => setSelectedYear('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  selectedYear === 'all'
                    ? 'bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                    : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-border)]'
                }`}
              >
                All
              </button>
              {availableYears.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                    selectedYear === yr
                      ? 'bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-bold'
                      : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-border)]'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Mood Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 text-xs">
            <span className="text-[var(--ag-muted-text)] text-xs font-serif mr-1 shrink-0">Mood:</span>
            <button
              type="button"
              onClick={() => setFilterMood('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors cursor-pointer ${
                filterMood === 'all'
                  ? 'bg-[var(--ag-primary-text)] text-[var(--ag-bg)] font-semibold'
                  : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-border)]'
              }`}
            >
              All Moods
            </button>
            {(Object.keys(MOODS) as MoodType[]).map((mKey) => {
              const meta = MOODS[mKey];
              const isSelected = filterMood === mKey;
              return (
                <button
                  key={mKey}
                  type="button"
                  onClick={() => setFilterMood(isSelected ? 'all' : mKey)}
                  style={{
                    backgroundColor: isSelected ? meta.bgColor : undefined,
                    borderColor: isSelected ? meta.borderColor : undefined,
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs shrink-0 flex items-center gap-1 transition-colors border cursor-pointer ${
                    isSelected
                      ? 'font-bold text-[#55483F] shadow-2xs'
                      : 'bg-[var(--ag-surface)]/60 border-transparent text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)]'
                  }`}
                >
                  <span>{meta.emoji}</span>
                  <span>{meta.label}</span>
                </button>
              );
            })}
          </div>

          {/* Collection & Active Tag Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--ag-muted-text)] text-xs font-serif mr-1">Collection:</span>
              <select
                value={filterCollectionId}
                onChange={(e) => setFilterCollectionId(e.target.value)}
                className="px-2.5 py-1 text-xs rounded-full bg-[var(--ag-surface)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] focus:outline-hidden"
              >
                <option value="all">All Collections</option>
                {collections.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag Filter Pills */}
            {filterTag && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--ag-accent-secondary)] text-xs text-[var(--ag-primary-text)]">
                <span>#{filterTag}</span>
                <button
                  type="button"
                  onClick={() => setFilterTag(null)}
                  className="font-bold hover:text-black ml-1 cursor-pointer"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TIMELINE CONTENT: GROUPED BY YEAR & MONTH */}
      {groupedTimeline.length > 0 ? (
        <div className="space-y-12">
          {groupedTimeline.map((yearGroup) => (
            <div key={yearGroup.year} className="space-y-8">
              {/* Year Marker */}
              <div className="flex items-center gap-3">
                <span className="font-fraunces text-3xl sm:text-4xl font-bold text-[var(--ag-primary-text)] tracking-tight">
                  {yearGroup.year}
                </span>
                <div className="h-px bg-[var(--ag-border)] flex-1" />
              </div>

              {/* Month Subgroups */}
              {yearGroup.months.map((monthGroup) => (
                <div key={monthGroup.monthKey} className="space-y-5 pl-2 sm:pl-4 border-l-2 border-[var(--ag-accent-secondary)]/50 ml-2">
                  {/* Month Heading with Washi accent */}
                  <div className="flex items-center gap-2 -ml-4 sm:-ml-6">
                    <div className="w-3.5 h-3.5 rounded-full bg-[var(--ag-accent-primary)] border-2 border-[var(--ag-bg)]" />
                    <h3 className="font-fraunces text-xl font-semibold text-[var(--ag-primary-text)]">
                      {monthGroup.monthName}
                    </h3>
                    <span className="text-xs font-mono text-[var(--ag-muted-text)]">
                      ({monthGroup.memories.length} moment{monthGroup.memories.length > 1 ? 's' : ''})
                    </span>
                  </div>

                  {/* Render based on view mode */}
                  {timelineViewMode === 'masonry' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">
                      {monthGroup.memories.map((m, idx) => {
                        const rotations = [-1.5, 1, -0.5, 2, -1, 0];
                        return (
                          <PolaroidCard
                            key={m.id}
                            memory={m}
                            rotation={rotations[idx % rotations.length]}
                            hasTape={idx % 2 === 0}
                            tapeColor={idx % 4 === 0 ? 'blush' : idx % 4 === 1 ? 'sage' : 'butter'}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    /* Chronological List View */
                    <div className="space-y-3 pt-1">
                      {monthGroup.memories.map((m) => (
                        <div
                          key={m.id}
                          onClick={() => setSelectedMemoryId(m.id)}
                          className="p-4 rounded-md bg-[var(--ag-card-bg)] border border-[var(--ag-border)] hover:bg-[var(--ag-surface)] cursor-pointer transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                        >
                          <div className="flex items-start gap-4">
                            {m.photos?.[0] ? (
                              <div className="w-16 h-16 rounded-xs overflow-hidden bg-[var(--ag-surface)] shrink-0 border border-[var(--ag-border)]">
                                <img
                                  src={m.photos[0].dataUrl}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-xs bg-[var(--ag-surface)] flex items-center justify-center text-[var(--ag-accent-primary)] shrink-0 border border-[var(--ag-border)]">
                                <Sparkles className="w-5 h-5" />
                              </div>
                            )}

                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <MoodBadge mood={m.mood} />
                                <span className="text-xs font-mono text-[var(--ag-muted-text)]">{m.date}</span>
                              </div>
                              <h4 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)]">
                                {m.title}
                              </h4>
                              <p className="font-sans text-xs text-[var(--ag-secondary-text)] line-clamp-1 mt-0.5">
                                {m.handwrittenNote || m.journal}
                              </p>
                            </div>
                          </div>

                          {m.location && (
                            <div className="flex items-center gap-1 text-xs text-[var(--ag-muted-text)] shrink-0">
                              <MapPin className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
                              <span>{m.location}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 rounded-lg bg-[var(--ag-card-bg)] border border-dashed border-[var(--ag-border)] text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[var(--ag-accent-secondary)]/40 flex items-center justify-center text-[var(--ag-primary-text)]">
            <TinyFlower className="w-6 h-6 text-[var(--ag-accent-primary)]" />
          </div>
          <h3 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)]">
            No moments match your current filter
          </h3>
          <p className="font-caveat text-lg text-[var(--ag-muted-text)] max-w-sm">
            Try resetting your filters or write down a brand new memory to fill this page.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setFilterMood('all');
                setFilterCollectionId('all');
                setFilterTag(null);
                setSelectedYear('all');
                setLocalSearch('');
              }}
              className="px-4 py-2 rounded-full bg-[var(--ag-surface)] hover:bg-[var(--ag-border)] text-xs font-semibold text-[var(--ag-primary-text)] cursor-pointer transition-colors"
            >
              Reset all filters
            </button>
            <button
              type="button"
              onClick={() => openCaptureModal()}
              className="px-5 py-2 rounded-full bg-[var(--ag-accent-primary)] hover:opacity-90 text-white text-xs font-semibold shadow-xs cursor-pointer transition-opacity"
            >
              + Capture a moment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
