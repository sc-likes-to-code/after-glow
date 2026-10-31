'use client';

import React, { useState, useRef } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { MOODS } from '@/lib/constants';
import { MoodType } from '@/types/memory';
import { WashiTape, TinyFlower, TinySparkle } from '@/components/scrapbook/Decorations';
import { FlowerIllustration } from '@/components/scrapbook/FlowerIllustration';
import { ConfirmDialog } from '@/components/scrapbook/ConfirmDialog';
import { ThemeStudio } from '@/components/theme/ThemeStudio';
import {
  Settings,
  User,
  HardDrive,
  Download,
  Upload,
  Trash2,
  RefreshCw,
  Check,
  Palette,
  Heart,
  Sliders,
  Sparkles,
} from 'lucide-react';

export function SettingsView() {
  const {
    settings,
    updateSettings,
    storageStats,
    exportDataJson,
    importDataJson,
    clearSampleMemories,
    restoreSampleMemories,
    refreshStats,
    setActiveTab,
  } = useMemoryStore();

  const [activeSettingsTab, setActiveSettingsTab] = useState<'theme-studio' | 'profile' | 'storage' | 'sample-data'>('theme-studio');

  const [displayName, setDisplayName] = useState(settings.displayName || 'Dear Soul');
  const [greeting, setGreeting] = useState(settings.greeting || 'Good morning, sunshine ☀');
  const [defaultMood, setDefaultMood] = useState<MoodType>(settings.defaultMood || 'peaceful');
  const [isSaved, setIsSaved] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isClearSamplesOpen, setIsClearSamplesOpen] = useState(false);
  const [pendingImportText, setPendingImportText] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatarOptions = [
    { id: 'flower-rose', label: 'Blush Rose', mood: 'loved' as MoodType },
    { id: 'flower-sun', label: 'Sunflower', mood: 'happy' as MoodType },
    { id: 'flower-lavender', label: 'Lavender', mood: 'peaceful' as MoodType },
    { id: 'flower-daisy', label: 'Daisy', mood: 'inspired' as MoodType },
    { id: 'flower-bluebell', label: 'Bluebell', mood: 'curious' as MoodType },
  ];

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      displayName: displayName.trim(),
      greeting: greeting.trim(),
      defaultMood,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const json = await exportDataJson();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `afterglow_memories_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      setPendingImportText(text);
    } catch (err) {
      alert('Could not read file: ' + (err as Error).message);
    }
  };

  const handleConfirmImport = async () => {
    if (!pendingImportText) return;
    setIsImporting(true);
    try {
      const success = await importDataJson(pendingImportText);
      if (success) {
        alert('Backup successfully imported into Afterglow!');
      } else {
        alert('Could not parse the backup file. Please check that it is a valid Afterglow JSON export.');
      }
    } catch (err) {
      alert('Error importing backup: ' + (err as Error).message);
    } finally {
      setIsImporting(false);
      setPendingImportText(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* ATELIER PROMO BANNER */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[var(--ag-accent-secondary)] to-[var(--ag-surface)] border border-[var(--ag-accent-primary)]/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[var(--ag-accent-primary)] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
              <span>AFTERGLOW ATELIER</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--ag-accent-primary)]/15 text-[var(--ag-accent-primary)] uppercase tracking-wider">
                Studio Suite
              </span>
            </h3>
            <p className="text-xs text-[var(--ag-secondary-text)] font-sans">
              11 comprehensive studios for colours, typography pairings, wallpaper textures, card styling, and component tokens.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('atelier')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--ag-accent-primary)] hover:bg-[var(--ag-accent-hover)] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Open Atelier Studio ♡</span>
        </button>
      </div>

      {/* SETTINGS MAIN TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[var(--ag-border)]">
        <button
          type="button"
          onClick={() => setActiveSettingsTab('theme-studio')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeSettingsTab === 'theme-studio'
              ? 'bg-[var(--ag-accent-primary)] text-white shadow-xs'
              : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-border)]'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Theme Studio 🎨</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSettingsTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeSettingsTab === 'profile'
              ? 'bg-[var(--ag-accent-primary)] text-white shadow-xs'
              : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-border)]'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Profile & Identity</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSettingsTab('storage')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeSettingsTab === 'storage'
              ? 'bg-[var(--ag-accent-primary)] text-white shadow-xs'
              : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-border)]'
          }`}
        >
          <HardDrive className="w-3.5 h-3.5" />
          <span>Storage & Backup</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSettingsTab('sample-data')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeSettingsTab === 'sample-data'
              ? 'bg-[var(--ag-accent-primary)] text-white shadow-xs'
              : 'bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-border)]'
          }`}
        >
          <TinyFlower className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
          <span>Starter Kit</span>
        </button>
      </div>

      {/* RENDER THEME STUDIO */}
      {activeSettingsTab === 'theme-studio' && <ThemeStudio />}

      {/* RENDER PROFILE & IDENTITY */}
      {activeSettingsTab === 'profile' && (
        <section className="p-6 sm:p-8 rounded-xl bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-2xs relative space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[var(--ag-accent-primary)]" />
            <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)]">
              Your Profile & Identity
            </h2>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1.5">
                  Display Name / Moniker
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-sm text-[var(--ag-primary-text)] font-fraunces focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1.5">
                  Default Mood for New Moments
                </label>
                <select
                  value={defaultMood}
                  onChange={(e) => setDefaultMood(e.target.value as MoodType)}
                  className="w-full px-3.5 py-2.5 rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-xs font-sans text-[var(--ag-primary-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
                >
                  {(Object.keys(MOODS) as MoodType[]).map((mKey) => (
                    <option key={mKey} value={mKey}>
                      {MOODS[mKey].emoji} {MOODS[mKey].label} ({MOODS[mKey].flower})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botanical Avatar Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-2">
                Botanical Avatar Seal
              </label>
              <div className="flex flex-wrap gap-3">
                {avatarOptions.map((opt) => {
                  const isSelected = settings.avatar === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => updateSettings({ avatar: opt.id })}
                      className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                        isSelected
                          ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] shadow-2xs'
                          : 'border-[var(--ag-border)] bg-[var(--ag-surfaceElevated)] hover:bg-[var(--ag-surface)]'
                      }`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        <FlowerIllustration mood={opt.mood} size={28} />
                      </div>
                      <span className="text-xs font-semibold text-[var(--ag-primary-text)] pr-1">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {isSaved ? (
                <span className="inline-flex items-center gap-1 text-xs text-[#6A8E6B] font-semibold">
                  <Check className="w-4 h-4" /> Preferences saved warmly
                </span>
              ) : (
                <div />
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[var(--ag-accent-primary)] hover:bg-[var(--ag-accent-hover)] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </form>
        </section>
      )}

      {/* RENDER STORAGE SANCTUARY */}
      {activeSettingsTab === 'storage' && (
        <section className="p-6 sm:p-8 rounded-xl bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-2xs relative space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[var(--ag-accent-primary)]" />
              <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)]">
                Local Storage Sanctuary
              </h2>
            </div>
            <button
              type="button"
              onClick={refreshStats}
              className="p-1.5 text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] rounded-full hover:bg-[var(--ag-surface)]"
              title="Refresh storage meter"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          <p className="font-sans text-xs text-[var(--ag-secondary-text)] leading-relaxed">
            AFTERGLOW runs entirely inside your device using browser IndexedDB. Your photographs and diary
            entries are never transmitted to external cloud servers, keeping your sanctuary 100% private.
          </p>

          {/* Storage Meter Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-[var(--ag-surface)] border border-[var(--ag-border)]">
              <span className="block font-fraunces text-2xl font-bold text-[var(--ag-primary-text)]">
                {storageStats.memoryCount}
              </span>
              <span className="text-xs text-[var(--ag-muted-text)]">Preserved Memories</span>
            </div>

            <div className="p-4 rounded-lg bg-[var(--ag-surface)] border border-[var(--ag-border)]">
              <span className="block font-fraunces text-2xl font-bold text-[var(--ag-primary-text)]">
                {storageStats.photoCount}
              </span>
              <span className="text-xs text-[var(--ag-muted-text)]">Stored Photographs</span>
            </div>

            <div className="p-4 rounded-lg bg-[var(--ag-surface)] border border-[var(--ag-border)]">
              <span className="block font-fraunces text-2xl font-bold text-[var(--ag-primary-text)]">
                {formatBytes(storageStats.estimatedBytes)}
              </span>
              <span className="text-xs text-[var(--ag-muted-text)]">Estimated Database Size</span>
            </div>
          </div>

          {/* Backup & Restore Controls */}
          <div className="pt-4 border-t border-[var(--ag-border)] flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--ag-surface)] hover:bg-[var(--ag-border)] text-xs font-semibold text-[var(--ag-primary-text)] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
              <span>{isExporting ? 'Generating JSON...' : 'Export Complete Backup (.json)'}</span>
            </button>

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
              disabled={isImporting}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--ag-surface)] hover:bg-[var(--ag-border)] text-xs font-semibold text-[var(--ag-primary-text)] transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
              <span>{isImporting ? 'Restoring...' : 'Restore from Backup (.json)'}</span>
            </button>
          </div>
        </section>
      )}

      {/* RENDER SAMPLE DATA */}
      {activeSettingsTab === 'sample-data' && (
        <section className="p-6 sm:p-8 rounded-xl bg-[var(--ag-card-bg)] border border-[var(--ag-border)] shadow-2xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <TinyFlower className="w-4 h-4 text-[var(--ag-accent-primary)]" />
            <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)]">
              Sample Memories & Starter Kit
            </h2>
          </div>

          <p className="font-sans text-xs text-[var(--ag-secondary-text)] leading-relaxed">
            Need a fresh start without the sample diary entries, or want to restore them to explore the scrapbook design? You can manage sample data here without affecting your own personal memories.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsClearSamplesOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ag-surface)] hover:bg-[var(--ag-accent-secondary)] text-xs font-semibold text-[#8B4545] border border-[var(--ag-border)] transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Sample Memories</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                await restoreSampleMemories();
                alert('Sample starter memories restored to your timeline.');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--ag-surface)] hover:bg-[var(--ag-border)] text-xs font-semibold text-[var(--ag-primary-text)] border border-[var(--ag-border)] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
              <span>Restore Sample Memories</span>
            </button>
          </div>
        </section>
      )}

      {/* Confirm Clear Samples Dialog */}
      <ConfirmDialog
        isOpen={isClearSamplesOpen}
        title="Clear sample starter moments?"
        description="This will gently remove the pre-loaded starter memories from your diary. Any memories you created yourself will remain completely safe."
        note="starting fresh on a clean diary page"
        confirmLabel="Yes, clear samples"
        cancelLabel="Keep them"
        onConfirm={async () => {
          await clearSampleMemories();
          setIsClearSamplesOpen(false);
        }}
        onCancel={() => setIsClearSamplesOpen(false)}
      />

      {/* Confirm Import Backup Dialog */}
      <ConfirmDialog
        isOpen={Boolean(pendingImportText)}
        title="Import and merge diary backup?"
        description="This will restore and merge all preserved memories, collections, and settings from this backup archive into your diary."
        note="welcoming cherished moments back home"
        confirmLabel="Yes, restore memories"
        cancelLabel="Cancel"
        onConfirm={handleConfirmImport}
        onCancel={() => {
          setPendingImportText(null);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }}
      />
    </div>
  );
}
