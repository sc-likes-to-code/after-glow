'use client';

import React, { useState } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { AtelierCategory, CustomTheme } from '@/types/atelier';
import { AtelierLivePreview } from './AtelierLivePreview';
import { MyThemesPanel } from './panels/MyThemesPanel';
import { ColourStudioPanel } from './panels/ColourStudioPanel';
import { TypographyStudioPanel } from './panels/TypographyStudioPanel';
import { BackgroundStudioPanel } from './panels/BackgroundStudioPanel';
import { MemoryCardDesignerPanel } from './panels/MemoryCardDesignerPanel';
import { DecorationsStudioPanel } from './panels/DecorationsStudioPanel';
import { LayoutNavigationPanel } from './panels/LayoutNavigationPanel';
import { ComponentsStudioPanel } from './panels/ComponentsStudioPanel';
import { CalendarTimelinePanel } from './panels/CalendarTimelinePanel';
import { HomepagePersonalizationPanel } from './panels/HomepagePersonalizationPanel';
import { PersonalIdentityPanel } from './panels/PersonalIdentityPanel';
import { ConfirmDialog } from '@/components/scrapbook/ConfirmDialog';
import { WashiTape, TinyFlower, TinySparkle } from '@/components/scrapbook/Decorations';
import {
  Palette,
  Type,
  Image as ImageIcon,
  Frame,
  Sparkles,
  Layout,
  Component,
  Calendar as CalendarIcon,
  Home,
  User,
  Layers,
  Save,
  RotateCcw,
  Check,
  X,
  AlertCircle,
  Undo2,
} from 'lucide-react';

export function AtelierView() {
  const {
    isAtelierDirty,
    applyAtelierChanges,
    discardAtelierChanges,
    saveAsNewCustomTheme,
    updateActiveCustomTheme,
    deleteCustomTheme,
    renameCustomTheme,
    activeCustomThemeId,
    customThemes,
    resetAllAtelier,
  } = useMemoryStore();

  const [activeCategory, setActiveCategory] = useState<AtelierCategory>('my-themes');

  // Modals state
  const [isCreateThemeOpen, setIsCreateThemeOpen] = useState(false);
  const [newThemeName, setNewThemeName] = useState('');
  const [newThemeDesc, setNewThemeDesc] = useState('');

  const [themeToRename, setThemeToRename] = useState<CustomTheme | null>(null);
  const [renamedName, setRenamedName] = useState('');

  const [themeToDelete, setThemeToDelete] = useState<CustomTheme | null>(null);

  const [appliedFeedback, setAppliedFeedback] = useState(false);

  const categories: {
    id: AtelierCategory;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }[] = [
    { id: 'my-themes', label: 'My Themes', icon: <Layers className="w-4 h-4" /> },
    { id: 'colour-studio', label: 'Colour Studio', icon: <Palette className="w-4 h-4" /> },
    { id: 'typography-studio', label: 'Typography Studio', icon: <Type className="w-4 h-4" /> },
    { id: 'background-studio', label: 'Background Studio', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'card-designer', label: 'Memory Card Designer', icon: <Frame className="w-4 h-4" /> },
    { id: 'decorations-studio', label: 'Decorations Studio', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'layout-navigation', label: 'Layout & Navigation', icon: <Layout className="w-4 h-4" /> },
    { id: 'components-studio', label: 'Components Studio', icon: <Component className="w-4 h-4" /> },
    { id: 'calendar-timeline', label: 'Calendar & Timeline', icon: <CalendarIcon className="w-4 h-4" /> },
    { id: 'homepage-studio', label: 'Homepage Studio', icon: <Home className="w-4 h-4" /> },
    { id: 'personal-identity', label: 'Personal Identity', icon: <User className="w-4 h-4" /> },
  ];

  const handleApply = async () => {
    await applyAtelierChanges();
    setAppliedFeedback(true);
    setTimeout(() => setAppliedFeedback(false), 2500);
  };

  const handleSaveThemeConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThemeName.trim()) return;

    await saveAsNewCustomTheme(newThemeName.trim(), newThemeDesc.trim());
    setIsCreateThemeOpen(false);
    setNewThemeName('');
    setNewThemeDesc('');
  };

  const handleRenameConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!themeToRename || !renamedName.trim()) return;

    await renameCustomTheme(themeToRename.id, renamedName.trim());
    setThemeToRename(null);
    setRenamedName('');
  };

  const handleDeleteConfirm = async () => {
    if (!themeToDelete) return;
    await deleteCustomTheme(themeToDelete.id);
    setThemeToDelete(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24">
      {/* 1. ATELIER BANNER & TOP ACTION CONTROL BAR */}
      <div className="relative pt-2 pb-6 border-b border-[var(--ag-border)]/80 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[var(--ag-accent-primary)]" />
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--ag-muted-text)]">
              Afterglow Atelier • Design Studio
            </span>
          </div>
          <h1 className="font-fraunces text-3xl sm:text-4xl font-bold text-[var(--ag-primary-text)]">
            Your little world, your way ♡
          </h1>
          <p className="font-caveat text-xl text-[var(--ag-muted-text)]">
            Make every little detail feel like you.
          </p>
        </div>

        {/* Global Save / Apply / Discard Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {isAtelierDirty && (
            <button
              type="button"
              onClick={discardAtelierChanges}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] border border-[var(--ag-border)] transition-colors cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Discard</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsCreateThemeOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--ag-surface)] hover:bg-[var(--ag-border)] text-xs font-semibold text-[var(--ag-primary-text)] border border-[var(--ag-border)] transition-colors cursor-pointer shadow-2xs"
          >
            <Save className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
            <span>Save as Theme</span>
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[var(--ag-accent-primary)] hover:opacity-90 active:scale-98 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{appliedFeedback ? 'Applied to Sanctuary!' : 'Apply Changes'}</span>
          </button>
        </div>
      </div>

      {/* UNSAVED CHANGES REMINDER BANNER */}
      {isAtelierDirty && (
        <div className="p-3 rounded-xl bg-[var(--ag-accent-secondary)]/35 border border-[var(--ag-accent-primary)]/40 flex items-center justify-between gap-3 text-xs text-[var(--ag-primary-text)] animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--ag-accent-primary)] animate-ping" />
            <span className="font-semibold">You have unapplied design experiments in the Atelier.</span>
            <span className="text-[var(--ag-muted-text)] hidden sm:inline">
              Preview updates live on the right. Click &ldquo;Apply Changes&rdquo; when ready.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={discardAtelierChanges}
              className="hover:underline text-[var(--ag-secondary-text)] font-medium cursor-pointer"
            >
              Discard
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-3 py-1 rounded-full bg-[var(--ag-accent-primary)] text-white font-semibold cursor-pointer"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}

      {/* 2. THE MAIN TWO-COLUMN STUDIO LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: ATELIER CATEGORY RAIL & ACTIVE STUDIO PANEL */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          {/* CATEGORIES HORIZONTAL NAVIGATION PILLS */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[var(--ag-border)]">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] shadow-2xs font-bold'
                      : 'border-transparent text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] hover:text-[var(--ag-primary-text)]'
                  }`}
                >
                  <span className={isActive ? 'text-[var(--ag-accent-primary)]' : 'text-[var(--ag-muted-text)]'}>
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* ACTIVE STUDIO PANEL */}
          <div className="bg-[var(--ag-card-bg)] rounded-2xl border border-[var(--ag-border)] p-5 sm:p-7 shadow-2xs">
            {activeCategory === 'my-themes' && (
              <MyThemesPanel
                onOpenCreateDialog={() => setIsCreateThemeOpen(true)}
                onOpenRenameDialog={(theme) => {
                  setThemeToRename(theme);
                  setRenamedName(theme.name);
                }}
                onOpenDeleteDialog={(theme) => setThemeToDelete(theme)}
              />
            )}
            {activeCategory === 'colour-studio' && <ColourStudioPanel />}
            {activeCategory === 'typography-studio' && <TypographyStudioPanel />}
            {activeCategory === 'background-studio' && <BackgroundStudioPanel />}
            {activeCategory === 'card-designer' && <MemoryCardDesignerPanel />}
            {activeCategory === 'decorations-studio' && <DecorationsStudioPanel />}
            {activeCategory === 'layout-navigation' && <LayoutNavigationPanel />}
            {activeCategory === 'components-studio' && <ComponentsStudioPanel />}
            {activeCategory === 'calendar-timeline' && <CalendarTimelinePanel />}
            {activeCategory === 'homepage-studio' && <HomepagePersonalizationPanel />}
            {activeCategory === 'personal-identity' && <PersonalIdentityPanel />}
          </div>
        </div>

        {/* RIGHT COLUMN: PERSISTENT INTERACTIVE LIVE PREVIEW */}
        <div className="lg:col-span-5 xl:col-span-4">
          <AtelierLivePreview />
        </div>
      </div>

      {/* CREATE NEW THEME DIALOG */}
      {isCreateThemeOpen && (
        <div
          onClick={() => setIsCreateThemeOpen(false)}
          className="fixed inset-0 z-[80] overflow-hidden bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[var(--ag-surfaceElevated)] border border-[var(--ag-border)] rounded-xl shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--ag-border)]">
              <h3 className="font-fraunces text-lg font-bold text-[var(--ag-primary-text)]">
                Save as New Custom Theme
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateThemeOpen(false)}
                className="text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveThemeConfirm} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
                  Theme Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. My Sunday Journal, Autumn Leaves"
                  value={newThemeName}
                  onChange={(e) => setNewThemeName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
                  Description / Memory Feeling
                </label>
                <input
                  type="text"
                  placeholder="A warm and gentle atmosphere for rainy days..."
                  value={newThemeDesc}
                  onChange={(e) => setNewThemeDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[var(--ag-border)]">
                <button
                  type="button"
                  onClick={() => setIsCreateThemeOpen(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-[var(--ag-accent-primary)] hover:opacity-90 text-white text-xs font-semibold shadow-xs"
                >
                  Save Theme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RENAME THEME DIALOG */}
      {themeToRename && (
        <div
          onClick={() => setThemeToRename(null)}
          className="fixed inset-0 z-[80] overflow-hidden bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-[var(--ag-surfaceElevated)] border border-[var(--ag-border)] rounded-xl shadow-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--ag-border)]">
              <h3 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)]">
                Rename Custom Theme
              </h3>
              <button
                type="button"
                onClick={() => setThemeToRename(null)}
                className="text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRenameConfirm} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
                  New Theme Title
                </label>
                <input
                  type="text"
                  required
                  value={renamedName}
                  onChange={(e) => setRenamedName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] focus:outline-hidden"
                  autoFocus
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[var(--ag-border)]">
                <button
                  type="button"
                  onClick={() => setThemeToRename(null)}
                  className="px-3 py-1.5 text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full bg-[var(--ag-accent-primary)] hover:opacity-90 text-white text-xs font-semibold shadow-xs"
                >
                  Save Title
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM DIALOG */}
      <ConfirmDialog
        isOpen={Boolean(themeToDelete)}
        title="Delete this custom theme?"
        description={`Are you sure you want to remove "${themeToDelete?.name}"? You can always recreate or re-import it later.`}
        note="memories and diary photographs remain safe"
        confirmLabel="Yes, delete theme"
        cancelLabel="Keep theme"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setThemeToDelete(null)}
      />
    </div>
  );
}
