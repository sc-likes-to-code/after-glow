'use client';

import React from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { ActiveTab } from '@/types/memory';
import { THEMES } from '@/lib/themes';
import { TinyFlower, TinySparkle } from '@/components/scrapbook/Decorations';
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

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'timeline', label: 'My Timeline', icon: <Clock className="w-4 h-4" /> },
    { id: 'garden', label: 'Mood Garden', icon: <Flower2 className="w-4 h-4" /> },
    { id: 'collections', label: 'Collections', icon: <FolderHeart className="w-4 h-4" /> },
    { id: 'search', label: 'Search', icon: <Search className="w-4 h-4" /> },
    { id: 'atelier', label: 'Atelier', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col justify-between border-r border-[var(--ag-border)] bg-[var(--ag-nav-bg)] backdrop-blur-md min-h-screen p-5 sticky top-0 h-screen select-none transition-colors duration-250">
        {/* Brand Wordmark & Flourish */}
        <div>
          <div
            onClick={() => setActiveTab('home')}
            className="cursor-pointer group flex items-center gap-2 mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--ag-accent-secondary)] flex items-center justify-center text-[var(--ag-secondary-text)] border border-[var(--ag-border)] group-hover:rotate-12 transition-transform duration-300">
              <span className="text-base">{activeSymbol}</span>
            </div>
            <div>
              <span className="font-heading text-xl font-bold tracking-wider text-[var(--ag-primary-text)] uppercase block">
                Afterglow
              </span>
              <span className="font-caveat text-xs text-[var(--ag-muted-text)] block -mt-1 tracking-normal line-clamp-1 max-w-[150px]">
                {previewConfig.identity?.appSubtitle || 'a little place for the moments'}
              </span>
            </div>
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
      <header className="md:hidden sticky top-0 z-40 bg-[var(--ag-nav-bg)] backdrop-blur-md border-b border-[var(--ag-border)] px-4 py-3 flex items-center justify-between transition-colors duration-250">
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-[var(--ag-accent-secondary)] flex items-center justify-center text-[var(--ag-secondary-text)] border border-[var(--ag-border)]">
            <span className="text-sm">{currentTheme.badgeSymbol}</span>
          </div>
          <div>
            <span className="font-heading text-lg font-bold tracking-wider text-[var(--ag-primary-text)] uppercase">
              Afterglow
            </span>
          </div>
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

      {/* MOBILE FLOATING BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[var(--ag-nav-bg)] backdrop-blur-md border border-[var(--ag-border)] rounded-2xl shadow-xl px-2 py-2 flex items-center justify-around transition-colors duration-250">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] transition-colors duration-100 ${
                isActive
                  ? 'text-[var(--ag-primary-text)] bg-[var(--ag-accent-secondary)] font-semibold'
                  : 'text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)]'
              }`}
            >
              <span>{item.icon}</span>
              <span className="truncate max-w-[50px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
