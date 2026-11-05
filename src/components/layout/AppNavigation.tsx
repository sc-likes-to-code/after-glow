'use client';

import React from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { ActiveTab } from '@/types/memory';
import { THEMES } from '@/lib/themes';
import { TinyFlower, TinySparkle } from '@/components/scrapbook/Decorations';
import { AfterglowLogo } from '@/components/brand/AfterglowLogo';
import {
  Home,
  Clock,
  Flower2,
  FolderHeart,
  Search,
  Settings,
  Plus,
  Sparkles,
} from 'lucide-react';

export function AppNavigation() {
  const { activeTab, setActiveTab, openCaptureModal, themeCustomization, previewConfig } = useMemoryStore();

  const currentTheme = THEMES[previewConfig.themeId as keyof typeof THEMES] || THEMES['vanilla-dreams'];
  const activeSymbol = previewConfig.identity?.badgeSymbol || currentTheme.badgeSymbol;

  const navItems: { id: ActiveTab; label: string; shortLabel?: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', shortLabel: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'timeline', label: 'My Timeline', shortLabel: 'Timeline', icon: <Clock className="w-4 h-4" /> },
    { id: 'garden', label: 'Mood Garden', shortLabel: 'Garden', icon: <Flower2 className="w-4 h-4" /> },
    { id: 'collections', label: 'Collections', shortLabel: 'Collections', icon: <FolderHeart className="w-4 h-4" /> },
    { id: 'search', label: 'Search', shortLabel: 'Search', icon: <Search className="w-4 h-4" /> },
    { id: 'atelier', label: 'Atelier', shortLabel: 'Atelier', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', shortLabel: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        suppressHydrationWarning
        className="hidden md:flex w-64 shrink-0 flex-col justify-between border-r border-[var(--ag-border)] bg-[var(--ag-nav-bg)] backdrop-blur-md min-h-screen p-5 sticky top-0 h-screen select-none transition-colors duration-250"
      >
        {/* Brand Wordmark & Flourish */}
        <div>
          <div
            onClick={() => setActiveTab('home')}
            className="cursor-pointer group flex items-center mb-7"
          >
            <AfterglowLogo
              variant="compact"
              size="sm"
              taglineText={previewConfig.identity?.appSubtitle || 'moments that matter ♡'}
            />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-left transition-colors duration-100 border ${
                    isActive
                      ? 'bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold border-[var(--ag-accent-primary)] shadow-xs'
                      : 'text-[var(--ag-secondary-text)] border-transparent hover:bg-[var(--ag-surfaceElevated)] hover:text-[var(--ag-primary-text)]'
                  }`}
                >
                  <span className={isActive ? 'text-[var(--ag-accent-primary)]' : 'text-[var(--ag-muted-text)]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto">
                      <TinySparkle className="w-3 h-3 text-[var(--ag-accent-primary)]" />
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Quote & Capture Button */}
        <div className="space-y-4 pt-4 border-t border-[var(--ag-border)]">
          {/* Handwritten Quote Card */}
          <div className="bg-[var(--ag-card-bg)] p-3 rounded-md border border-[var(--ag-border)] text-center shadow-2xs transition-colors duration-250">
            <p className="font-caveat text-sm text-[var(--ag-secondary-text)] leading-snug">
              &ldquo;Some moments are too beautiful to let them fade.&rdquo;
            </p>
          </div>

          {/* Prominent "Capture a moment" Button */}
          <button
            type="button"
            onClick={() => openCaptureModal()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[var(--ag-accent-primary)] hover:bg-[var(--ag-accent-hover)] active:scale-98 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Capture a moment</span>
          </button>
        </div>
      </aside>

      {/* MOBILE TOP HEADER */}
      <header
        suppressHydrationWarning
        className="md:hidden sticky top-0 z-40 bg-[var(--ag-nav-bg)] backdrop-blur-md border-b border-[var(--ag-border)] px-4 py-3 flex items-center justify-between transition-colors duration-250"
      >
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center cursor-pointer"
        >
          <AfterglowLogo
            variant="compact"
            size="xs"
            taglineText={previewConfig.identity?.appSubtitle || 'moments that matter ♡'}
          />
        </div>

        <button
          type="button"
          onClick={() => openCaptureModal()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--ag-accent-primary)] text-white font-medium text-xs shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Capture</span>
        </button>
      </header>

      {/* MOBILE FLOATING BOTTOM NAVIGATION (Active-Only Pill) */}
      <nav
        aria-label="Mobile Navigation"
        suppressHydrationWarning
        className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[var(--ag-nav-bg)]/95 backdrop-blur-md border border-[var(--ag-border)] rounded-2xl shadow-xl px-2 py-1.5 flex items-center justify-between transition-colors duration-250 select-none"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              aria-label={item.label}
              className={`flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] border border-[var(--ag-accent-primary)]/40 shadow-xs px-3 py-1.5 rounded-xl gap-1.5 shrink-0'
                  : 'text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] p-2 rounded-xl shrink-0 active:scale-95'
              }`}
            >
              <span className={isActive ? 'text-[var(--ag-accent-primary)]' : ''}>
                {item.icon}
              </span>
              {isActive && (
                <span className="text-xs font-semibold whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                  {item.shortLabel || item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}
