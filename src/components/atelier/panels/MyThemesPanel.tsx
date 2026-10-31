'use client';

import React, { useState, useRef } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { THEMES } from '@/lib/themes';
import { ThemeId } from '@/types/theme';
import { CustomTheme } from '@/types/atelier';
import { WashiTape, TinyFlower, TinySparkle } from '@/components/scrapbook/Decorations';
import {
  Palette,
  Plus,
  Copy,
  Trash2,
  Edit2,
  Download,
  Upload,
  RotateCcw,
  Check,
  Sparkles,
  Layers,
} from 'lucide-react';

interface MyThemesPanelProps {
  onOpenCreateDialog: () => void;
  onOpenRenameDialog: (theme: CustomTheme) => void;
  onOpenDeleteDialog: (theme: CustomTheme) => void;
}

export function MyThemesPanel({
  onOpenCreateDialog,
  onOpenRenameDialog,
  onOpenDeleteDialog,
}: MyThemesPanelProps) {
  const {
    previewConfig,
    setPreviewConfig,
    customThemes,
    activeCustomThemeId,
    duplicateTheme,
    exportCustomTheme,
    importCustomTheme,
    resetAllAtelier,
  } = useMemoryStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const builtInThemeIds = Object.keys(THEMES) as ThemeId[];

  const handleSelectBuiltIn = (themeId: ThemeId) => {
    const theme = THEMES[themeId];
    setPreviewConfig((prev) => ({
      ...prev,
      themeId,
      activeCustomThemeId: null,
      colors: {}, // Clear overrides to adopt clean theme palette
      typography: {
        ...prev.typography,
        pairingId: theme.recommendedFont,
      },
      card: {
        ...prev.card,
        style: theme.recommendedCardStyle as any,
      },
      decorations: {
        ...prev.decorations,
        style: theme.recommendedDecor as any,
      },
      identity: {
        ...prev.identity,
        badgeSymbol: theme.badgeSymbol,
      },
    }));
  };

  const handleSelectCustom = (theme: CustomTheme) => {
    setPreviewConfig(() => ({
      ...theme.config,
      activeCustomThemeId: theme.id,
      themeId: theme.parentThemeId,
    }));
  };

  const handleDuplicate = async (themeId: string) => {
    const newTheme = await duplicateTheme(themeId);
    handleSelectCustom(newTheme);
  };

  const handleExport = async (themeId: string, name: string) => {
    const json = await exportCustomTheme(themeId);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `afterglow_theme_${name.toLowerCase().replace(/\s+/g, '_')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const res = await importCustomTheme(text);
      if (res.success) {
        setImportStatus('Theme imported successfully!');
      } else {
        setImportStatus(res.error || 'Failed to import theme');
      }
      setTimeout(() => setImportStatus(null), 3500);
    } catch (err) {
      setImportStatus('Could not read JSON file: ' + (err as Error).message);
      setTimeout(() => setImportStatus(null), 3500);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* HEADER & TOP ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--ag-border)]">
        <div>
          <h2 className="font-fraunces text-xl sm:text-2xl font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
            <Palette className="w-5 h-5 text-[var(--ag-accent-primary)]" />
            Theme Library & Creations
          </h2>
          <p className="font-caveat text-base text-[var(--ag-muted-text)] mt-0.5">
            Switch between 8 curated atmospheres or craft and save your own personal themes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Hidden File Input for JSON import */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportFile}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--ag-surface)] hover:bg-[var(--ag-border)] text-xs font-semibold text-[var(--ag-primary-text)] border border-[var(--ag-border)] transition-colors cursor-pointer"
            title="Import a theme from JSON package"
          >
            <Upload className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
            <span>Import JSON</span>
          </button>

          <button
            type="button"
            onClick={onOpenCreateDialog}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--ag-accent-primary)] hover:opacity-90 text-white text-xs font-semibold shadow-xs transition-opacity cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Theme</span>
          </button>
        </div>
      </div>

      {/* Import Status Alert */}
      {importStatus && (
        <div className="p-3 rounded-lg bg-[var(--ag-accent-secondary)]/50 border border-[var(--ag-accent-primary)]/40 text-xs font-medium text-[var(--ag-primary-text)] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--ag-accent-primary)]" />
          <span>{importStatus}</span>
        </div>
      )}

      {/* SECTION 1: CUSTOM THEMES CREATED BY USER */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[var(--ag-accent-primary)]" />
            <h3 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)]">
              Your Custom Themes ({customThemes.length})
            </h3>
          </div>
          <span className="text-xs font-caveat text-[var(--ag-muted-text)]">
            handmade atmospheres saved in your browser
          </span>
        </div>

        {customThemes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {customThemes.map((ct) => {
              const isSelected = activeCustomThemeId === ct.id;
              const parentTheme = THEMES[ct.parentThemeId] || THEMES['vanilla-dreams'];

              return (
                <div
                  key={ct.id}
                  onClick={() => handleSelectCustom(ct)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                    isSelected
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/25 shadow-xs ring-2 ring-[var(--ag-accent-primary)]'
                      : 'border-[var(--ag-border)] bg-[var(--ag-card-bg)] hover:bg-[var(--ag-surface)]'
                  }`}
                >
                  <div>
                    {/* Header: Name + Badge */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{ct.badgeSymbol || '✨'}</span>
                        <div>
                          <h4 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)]">
                            {ct.name}
                          </h4>
                          <span className="text-[10px] font-mono text-[var(--ag-muted-text)] block">
                            Derived from {parentTheme.name}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--ag-accent-primary)] text-white text-[10px] font-bold">
                          <Check className="w-3 h-3" /> Active
                        </span>
                      )}
                    </div>

                    <p className="font-sans text-xs text-[var(--ag-secondary-text)] line-clamp-2 leading-relaxed">
                      {ct.description || 'Personal customized theme configuration.'}
                    </p>
                  </div>

                  {/* Actions Bar for custom theme */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--ag-border)]/80">
                    <span className="text-[10px] font-mono text-[var(--ag-muted-text)]">
                      {new Date(ct.updatedAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleExport(ct.id, ct.name)}
                        className="p-1 rounded-md text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] hover:bg-[var(--ag-surface)]"
                        title="Export JSON"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDuplicate(ct.id)}
                        className="p-1 rounded-md text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] hover:bg-[var(--ag-surface)]"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenRenameDialog(ct)}
                        className="p-1 rounded-md text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] hover:bg-[var(--ag-surface)]"
                        title="Rename"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenDeleteDialog(ct)}
                        className="p-1 rounded-md text-[var(--ag-muted-text)] hover:text-rose-500 hover:bg-rose-50"
                        title="Delete theme"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-[var(--ag-surface)]/50 border border-dashed border-[var(--ag-border)] text-center space-y-2">
            <TinyFlower className="w-6 h-6 text-[var(--ag-accent-primary)] mx-auto opacity-70" />
            <h4 className="font-fraunces text-sm font-semibold text-[var(--ag-primary-text)]">
              No custom themes created yet
            </h4>
            <p className="font-caveat text-sm text-[var(--ag-muted-text)] max-w-sm mx-auto">
              Experiment with colors, fonts, or cards in any studio category, then click &ldquo;Save as New Theme&rdquo;.
            </p>
          </div>
        )}
      </div>

      {/* SECTION 2: THE EIGHT BUILT-IN ART-DIRECTED PRESETS */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)]">
            Built-in Art-Directed Themes (8)
          </h3>
          <span className="text-xs font-mono text-[var(--ag-muted-text)]">Permanent Presets</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {builtInThemeIds.map((tId) => {
            const theme = THEMES[tId];
            const isSelected = previewConfig.themeId === tId && !activeCustomThemeId;

            return (
              <div
                key={tId}
                onClick={() => handleSelectBuiltIn(tId)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1 ${
                  isSelected
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-card-bg)] shadow-md ring-2 ring-[var(--ag-accent-primary)]'
                    : 'border-[var(--ag-border)] bg-[var(--ag-card-bg)] hover:bg-[var(--ag-surface)] shadow-2xs'
                }`}
              >
                <div>
                  {/* Badge & Name */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{theme.badgeSymbol}</span>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-[var(--ag-accent-primary)] text-white text-[10px] font-bold">
                        Selected
                      </span>
                    )}
                  </div>

                  <h4 className="font-fraunces text-base font-bold text-[var(--ag-primary-text)] mb-0.5">
                    {theme.name}
                  </h4>
                  <span className="text-[10px] font-mono text-[var(--ag-muted-text)] block mb-2 uppercase tracking-wide">
                    {theme.tagline}
                  </span>

                  {/* 5-Color Palette Swatch */}
                  <div className="flex items-center gap-1.5 mb-3">
                    {theme.previewColors.map((color, idx) => (
                      <div
                        key={idx}
                        style={{ backgroundColor: color }}
                        className="w-4 h-4 rounded-full border border-[var(--ag-border)]/80 shadow-2xs shrink-0"
                      />
                    ))}
                  </div>

                  <p className="font-sans text-[11px] text-[var(--ag-secondary-text)] line-clamp-2 leading-relaxed">
                    {theme.description}
                  </p>
                </div>

                {/* Duplicate / Export Actions for built-in theme */}
                <div
                  className="flex items-center justify-between pt-3 mt-3 border-t border-[var(--ag-border)]/60"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => handleDuplicate(tId)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--ag-secondary-text)] hover:text-[var(--ag-primary-text)] cursor-pointer"
                  >
                    <Copy className="w-3 h-3 text-[var(--ag-accent-primary)]" />
                    <span>Duplicate</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleExport(tId, theme.name)}
                    className="inline-flex items-center gap-1 text-[11px] text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>JSON</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
