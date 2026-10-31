'use client';

import React, { useState, useMemo } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { PolaroidCard } from '@/components/scrapbook/PolaroidCard';
import { MoodBadge, WashiTape, TinySparkle, TinyFlower } from '@/components/scrapbook/Decorations';
import { Search, Tag, MapPin, Sparkles, X, Clock, Folder } from 'lucide-react';

export function SearchView() {
  const {
    memories,
    collections,
    searchQuery,
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    setSelectedMemoryId,
  } = useMemoryStore();

  const [filterType, setFilterType] = useState<'all' | 'photos' | 'favorites'>('all');

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q && filterType === 'all') return [];

    return memories.filter((m) => {
      if (filterType === 'photos' && (!m.photos || m.photos.length === 0)) return false;
      if (filterType === 'favorites' && !m.isFavorite) return false;

      if (!q) return true;

      const titleMatch = m.title.toLowerCase().includes(q);
      const journalMatch = m.journal.toLowerCase().includes(q);
      const locationMatch = m.location?.toLowerCase().includes(q) || false;
      const tagMatch = m.tags?.some((t) => t.toLowerCase().includes(q)) || false;
      const noteMatch = m.handwrittenNote?.toLowerCase().includes(q) || false;

      const col = collections.find((c) => c.id === m.collectionId);
      const collectionMatch = col?.name.toLowerCase().includes(q) || false;

      return titleMatch || journalMatch || locationMatch || tagMatch || noteMatch || collectionMatch;
    });
  }, [memories, collections, searchQuery, filterType]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery.trim());
    }
  };

  const handleSelectRecent = (term: string) => {
    setSearchQuery(term);
    addRecentSearch(term);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* SEARCH HEADER */}
      <div className="relative pt-2 pb-6 border-b border-[var(--ag-border)]/80">
        <div className="flex items-center gap-2 mb-1">
          <Search className="w-4 h-4 text-[var(--ag-accent-primary)]" />
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--ag-muted-text)]">
            Memory Discovery
          </span>
        </div>
        <h1 className="font-fraunces text-3xl sm:text-4xl font-bold text-[var(--ag-primary-text)]">
          Search & Revisit
        </h1>
        <p className="font-caveat text-xl text-[var(--ag-muted-text)]">
          find that one quiet day, a familiar cup, or a laugh you want to hear again
        </p>

        {/* Global Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="mt-6 relative max-w-2xl">
          <Search className="w-5 h-5 text-[var(--ag-muted-text)] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by keywords, place, feelings, tags, or diary text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-full bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] font-sans text-sm placeholder:text-[var(--ag-muted-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)] shadow-xs"
            autoFocus
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </form>

        {/* Filter Quick Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-xs font-serif text-[var(--ag-muted-text)]">Show:</span>
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
              filterType === 'all'
                ? 'bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-border)]'
            }`}
          >
            All matches
          </button>
          <button
            type="button"
            onClick={() => setFilterType('photos')}
            className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
              filterType === 'photos'
                ? 'bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-border)]'
            }`}
          >
            With Photographs
          </button>
          <button
            type="button"
            onClick={() => setFilterType('favorites')}
            className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
              filterType === 'favorites'
                ? 'bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-border)]'
            }`}
          >
            Favorites Only ♡
          </button>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[var(--ag-border)]/60">
            <span className="text-[11px] font-mono text-[var(--ag-muted-text)] flex items-center gap-1">
              <Clock className="w-3 h-3" /> Recent:
            </span>
            {recentSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleSelectRecent(term)}
                className="px-2.5 py-0.5 rounded-full bg-[var(--ag-surface)] hover:bg-[var(--ag-border)] border border-[var(--ag-border)] text-[11px] text-[var(--ag-primary-text)] transition-colors cursor-pointer"
              >
                {term}
              </button>
            ))}
            <button
              type="button"
              onClick={clearRecentSearches}
              className="text-[10px] text-[var(--ag-muted-text)] hover:underline ml-1 cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* RESULTS DISPLAY */}
      {searchQuery || filterType !== 'all' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)]">
              Found {searchResults.length} memory{searchResults.length !== 1 ? 's' : ''}
            </h2>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {searchResults.map((m, idx) => (
                <PolaroidCard
                  key={m.id}
                  memory={m}
                  rotation={idx % 2 === 0 ? -1 : 1}
                  hasTape={idx % 2 === 0}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-lg bg-[var(--ag-card-bg)] border border-dashed border-[var(--ag-border)] text-center space-y-3">
              <Search className="w-10 h-10 text-[var(--ag-accent-primary)] mx-auto opacity-70" />
              <h3 className="font-fraunces text-lg font-bold text-[var(--ag-primary-text)]">
                No memories matched your query
              </h3>
              <p className="font-caveat text-lg text-[var(--ag-muted-text)]">
                Try another phrase or explore your full timeline.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Empty / Exploration state */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Inspiration tag cloud */}
          <div className="p-6 rounded-lg bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-2xs space-y-3">
            <h3 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--ag-accent-primary)]" />
              Popular Themes & Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'coffee',
                'quiet-hours',
                'reading',
                'sunset',
                'evening-walk',
                'friends',
                'picnic',
                'candlelight',
                'hidden-places',
                'ocean',
                'woods',
              ].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSearchQuery(t)}
                  className="px-3 py-1 rounded-full bg-[var(--ag-surface)] hover:bg-[var(--ag-border)] text-xs text-[var(--ag-primary-text)] border border-[var(--ag-border)] transition-colors cursor-pointer"
                >
                  #{t}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Search Tip */}
          <div className="p-6 rounded-lg bg-[var(--ag-surface)] border border-[var(--ag-border)] shadow-2xs flex flex-col justify-center text-center space-y-2">
            <TinyFlower className="w-6 h-6 text-[var(--ag-accent-primary)] mx-auto" />
            <h3 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)]">
              Search through time
            </h3>
            <p className="font-caveat text-lg text-[var(--ag-secondary-text)]">
              Every journal line, location, and scrapbook annotation is indexed instantly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
