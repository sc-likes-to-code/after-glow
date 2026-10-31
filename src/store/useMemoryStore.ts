import { create } from 'zustand';
import { Memory, Collection, UserSettings, ActiveTab, MoodType } from '@/types/memory';
import { ThemeCustomization, DEFAULT_THEME_CUSTOMIZATION, ThemeId } from '@/types/theme';
import {
  AtelierConfiguration,
  DEFAULT_ATELIER_CONFIG,
  CustomTheme,
  AtelierCategory,
  BackgroundMode,
  ExtendedDecorStyle,
} from '@/types/atelier';
import { applyThemeToDOM, getStoredThemeCustomization } from '@/lib/themeEngine';
import {
  applyAtelierConfigToDOM,
  getStoredAtelierConfig,
  exportThemeToJson,
  importThemeFromJson,
} from '@/lib/atelierEngine';
import {
  db,
  initializeDatabase,
  getStorageStats,
  getDbCustomThemes,
  saveDbCustomTheme,
  deleteDbCustomTheme,
  saveDbMediaAsset,
} from '@/lib/db';
import { DEFAULT_USER_SETTINGS } from '@/lib/constants';
import { INITIAL_SAMPLE_MEMORIES } from '@/lib/sampleMemories';
import { THEMES } from '@/lib/themes';

interface MemoryStoreState {
  // Navigation & View
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Selected memory for full-page modal/view
  selectedMemoryId: string | null;
  setSelectedMemoryId: (id: string | null) => void;

  // Capture / Edit Modal
  isCaptureModalOpen: boolean;
  editingMemory: Memory | null;
  openCaptureModal: (memoryToEdit?: Memory) => void;
  closeCaptureModal: () => void;

  // Data
  memories: Memory[];
  collections: Collection[];
  settings: UserSettings;
  themeCustomization: ThemeCustomization;
  atelierConfig: AtelierConfiguration;
  previewConfig: AtelierConfiguration;
  isAtelierDirty: boolean;
  customThemes: CustomTheme[];
  activeCustomThemeId: string | null;
  previewViewport: 'desktop' | 'mobile';
  setPreviewViewport: (viewport: 'desktop' | 'mobile') => void;
  isLoading: boolean;
  storageStats: { memoryCount: number; photoCount: number; estimatedBytes: number };

  // Filters for Timeline
  filterMood: MoodType | 'all';
  setFilterMood: (mood: MoodType | 'all') => void;
  filterCollectionId: string | 'all';
  setFilterCollectionId: (colId: string | 'all') => void;
  filterTag: string | null;
  setFilterTag: (tag: string | null) => void;
  timelineViewMode: 'masonry' | 'chronological';
  setTimelineViewMode: (mode: 'masonry' | 'chronological') => void;

  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Actions
  loadInitialData: () => Promise<void>;
  saveMemory: (memory: Omit<Memory, 'id' | 'createdAt' | 'updatedAt'>, existingId?: string) => Promise<Memory>;
  deleteMemory: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;

  // Collection management
  saveCollection: (col: Omit<Collection, 'id' | 'createdAt'>, existingId?: string) => Promise<Collection>;
  deleteCollection: (id: string) => Promise<void>;

  // Settings & Theme management
  updateSettings: (newSettings: Partial<UserSettings>) => Promise<void>;
  updateThemeCustomization: (customization: Partial<ThemeCustomization>) => Promise<void>;
  resetThemeCustomization: () => Promise<void>;

  // Atelier Advanced Actions
  setPreviewConfig: (
    updater:
      | Partial<AtelierConfiguration>
      | ((prev: AtelierConfiguration) => AtelierConfiguration)
  ) => void;
  applyAtelierChanges: () => Promise<void>;
  discardAtelierChanges: () => void;
  saveAsNewCustomTheme: (name: string, description?: string) => Promise<CustomTheme>;
  updateActiveCustomTheme: () => Promise<void>;
  deleteCustomTheme: (id: string) => Promise<void>;
  duplicateTheme: (themeId: string, newName?: string) => Promise<CustomTheme>;
  renameCustomTheme: (id: string, newName: string) => Promise<void>;
  importCustomTheme: (jsonString: string) => Promise<{ success: boolean; error?: string }>;
  exportCustomTheme: (themeId: string) => Promise<string>;
  resetAtelierCategory: (category: AtelierCategory) => void;
  resetAllAtelier: () => Promise<void>;
  uploadBackgroundImage: (file: File) => Promise<void>;

  // Data helpers
  clearSampleMemories: () => Promise<void>;
  restoreSampleMemories: () => Promise<void>;
  exportDataJson: () => Promise<string>;
  importDataJson: (jsonString: string) => Promise<boolean>;
  refreshStats: () => Promise<void>;
}

export const useMemoryStore = create<MemoryStoreState>((set, get) => ({
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),

  selectedMemoryId: null,
  setSelectedMemoryId: (id) => set({ selectedMemoryId: id }),

  isCaptureModalOpen: false,
  editingMemory: null,
  openCaptureModal: (memoryToEdit) =>
    set({
      isCaptureModalOpen: true,
      editingMemory: memoryToEdit || null,
    }),
  closeCaptureModal: () =>
    set({
      isCaptureModalOpen: false,
      editingMemory: null,
    }),

  memories: [],
  collections: [],
  settings: DEFAULT_USER_SETTINGS,
  themeCustomization: DEFAULT_THEME_CUSTOMIZATION,
  atelierConfig: DEFAULT_ATELIER_CONFIG,
  previewConfig: DEFAULT_ATELIER_CONFIG,
  isAtelierDirty: false,
  customThemes: [],
  activeCustomThemeId: null,
  previewViewport: 'desktop',
  setPreviewViewport: (viewport) => set({ previewViewport: viewport }),
  isLoading: true,
  storageStats: { memoryCount: 0, photoCount: 0, estimatedBytes: 0 },

  filterMood: 'all',
  setFilterMood: (mood) => set({ filterMood: mood }),
  filterCollectionId: 'all',
  setFilterCollectionId: (colId) => set({ filterCollectionId: colId }),
  filterTag: null,
  setFilterTag: (tag) => set({ filterTag: tag }),
  timelineViewMode: 'masonry',
  setTimelineViewMode: (mode) => set({ timelineViewMode: mode }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  recentSearches: ['Sunday morning', 'coffee', 'sunset', 'quiet moments'],
  addRecentSearch: (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const current = get().recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
    set({ recentSearches: [trimmed, ...current].slice(0, 8) });
  },
  clearRecentSearches: () => set({ recentSearches: [] }),

  loadInitialData: async () => {
    if (typeof window === 'undefined') return;
    set({ isLoading: true });
    try {
      await initializeDatabase();
      if (!db) return;

      const memories = await db.memories.orderBy('date').reverse().toArray();
      const collections = await db.collections.toArray();
      const storedSettings = await db.settings.get('user_settings');
      const customThemes = await getDbCustomThemes();

      // Read Atelier configuration or merge from current themeCustomization
      const storedThemeCustomization = storedSettings?.value?.themeCustomization || getStoredThemeCustomization();
      let activeAtelier = storedSettings?.value?.atelierConfig || getStoredAtelierConfig();

      if (storedThemeCustomization && storedThemeCustomization.themeId) {
        activeAtelier = {
          ...activeAtelier,
          themeId: storedThemeCustomization.themeId,
          typography: {
            ...activeAtelier.typography,
            pairingId: storedThemeCustomization.fontPairing || activeAtelier.typography.pairingId,
          },
          card: {
            ...activeAtelier.card,
            style: storedThemeCustomization.cardAppearance || activeAtelier.card.style,
          },
          decorations: {
            ...activeAtelier.decorations,
            style:
              storedThemeCustomization.decorationStyle === 'scrapbook'
                ? 'vintage-scrapbook'
                : (storedThemeCustomization.decorationStyle as ExtendedDecorStyle) || activeAtelier.decorations.style,
          },
          layout: {
            ...activeAtelier.layout,
            density: storedThemeCustomization.density || activeAtelier.layout.density,
          },
          colors: {
            ...activeAtelier.colors,
            ...(storedThemeCustomization.customAccentColor ? { accentPrimary: storedThemeCustomization.customAccentColor } : {}),
          },
        };
      }

      applyAtelierConfigToDOM(activeAtelier);

      const stats = await getStorageStats();

      set({
        memories,
        collections,
        settings: storedSettings?.value || DEFAULT_USER_SETTINGS,
        themeCustomization: storedSettings?.value?.themeCustomization || DEFAULT_THEME_CUSTOMIZATION,
        atelierConfig: activeAtelier,
        previewConfig: activeAtelier,
        isAtelierDirty: false,
        customThemes,
        activeCustomThemeId: activeAtelier.activeCustomThemeId || null,
        storageStats: stats,
        isLoading: false,
      });
    } catch (err) {
      console.error('Error loading Afterglow data:', err);
      set({ isLoading: false });
    }
  },

  saveMemory: async (data, existingId) => {
    if (!db) throw new Error('Database not initialized');

    const nowTime = Date.now();
    let memoryToSave: Memory;

    if (existingId) {
      const prev = await db.memories.get(existingId);
      memoryToSave = {
        ...data,
        id: existingId,
        createdAt: prev?.createdAt || nowTime,
        updatedAt: nowTime,
      };
      await db.memories.put(memoryToSave);
    } else {
      const newId = 'mem-' + Math.random().toString(36).substring(2, 9) + '-' + nowTime;
      memoryToSave = {
        ...data,
        id: newId,
        createdAt: nowTime,
        updatedAt: nowTime,
      };
      await db.memories.add(memoryToSave);
    }

    // Refresh list in memory
    const updated = await db.memories.orderBy('date').reverse().toArray();
    const stats = await getStorageStats();
    set({ memories: updated, storageStats: stats });

    return memoryToSave;
  },

  deleteMemory: async (id: string) => {
    if (!db) return;
    await db.memories.delete(id);
    const updated = await db.memories.orderBy('date').reverse().toArray();
    const stats = await getStorageStats();
    set((state) => ({
      memories: updated,
      storageStats: stats,
      selectedMemoryId: state.selectedMemoryId === id ? null : state.selectedMemoryId,
    }));
  },

  toggleFavorite: async (id: string) => {
    if (!db) return;
    const item = await db.memories.get(id);
    if (!item) return;
    const updatedItem = { ...item, isFavorite: !item.isFavorite, updatedAt: Date.now() };
    await db.memories.put(updatedItem);
    const updated = await db.memories.orderBy('date').reverse().toArray();
    set({ memories: updated });
  },

  saveCollection: async (colData, existingId) => {
    if (!db) throw new Error('Database not initialized');
    const nowTime = Date.now();
    let colToSave: Collection;

    if (existingId) {
      const prev = await db.collections.get(existingId);
      colToSave = {
        ...colData,
        id: existingId,
        createdAt: prev?.createdAt || nowTime,
      };
      await db.collections.put(colToSave);
    } else {
      const newId = 'col-' + Math.random().toString(36).substring(2, 9);
      colToSave = {
        ...colData,
        id: newId,
        createdAt: nowTime,
      };
      await db.collections.add(colToSave);
    }

    const cols = await db.collections.toArray();
    set({ collections: cols });
    return colToSave;
  },

  deleteCollection: async (id: string) => {
    if (!db) return;
    await db.collections.delete(id);
    // Move any memories in this collection to default 'col-little-joys'
    const memoriesInCol = await db.memories.where('collectionId').equals(id).toArray();
    for (const m of memoriesInCol) {
      await db.memories.update(m.id, { collectionId: 'col-little-joys' });
    }
    const cols = await db.collections.toArray();
    const memories = await db.memories.orderBy('date').reverse().toArray();
    set({ collections: cols, memories });
  },

  updateSettings: async (newSettings) => {
    if (!db) return;
    const current = get().settings;
    const merged = { ...current, ...newSettings };
    await db.settings.put({ key: 'user_settings', value: merged });
    set({ settings: merged });
  },

  updateThemeCustomization: async (partial) => {
    const current = get().themeCustomization;
    const merged: ThemeCustomization = { ...current, ...partial };
    applyThemeToDOM(merged);
    set({ themeCustomization: merged });

    const currentAtelier = get().atelierConfig;
    const updatedAtelier: AtelierConfiguration = {
      ...currentAtelier,
      themeId: merged.themeId,
      typography: {
        ...currentAtelier.typography,
        pairingId: merged.fontPairing || currentAtelier.typography.pairingId,
      },
      card: {
        ...currentAtelier.card,
        style: merged.cardAppearance || currentAtelier.card.style,
      },
      background: {
        ...currentAtelier.background,
        mode:
          merged.backgroundStyle === 'paper-texture'
            ? 'texture'
            : merged.backgroundStyle === 'subtle-gradient'
            ? 'gradient'
            : 'solid',
      },
      decorations: {
        ...currentAtelier.decorations,
        style:
          merged.decorationStyle === 'scrapbook'
            ? 'vintage-scrapbook'
            : (merged.decorationStyle as ExtendedDecorStyle) || currentAtelier.decorations.style,
      },
      layout: {
        ...currentAtelier.layout,
        density: merged.density || currentAtelier.layout.density,
      },
      colors: {
        ...currentAtelier.colors,
        ...(merged.customAccentColor ? { accentPrimary: merged.customAccentColor } : {}),
      },
    };
    applyAtelierConfigToDOM(updatedAtelier);
    set({ atelierConfig: updatedAtelier, previewConfig: updatedAtelier });

    if (db) {
      const currentSettings = get().settings;
      const updatedSettings = {
        ...currentSettings,
        themeCustomization: merged,
        atelierConfig: updatedAtelier,
      };
      await db.settings.put({ key: 'user_settings', value: updatedSettings });
      set({ settings: updatedSettings });
    }
  },

  resetThemeCustomization: async () => {
    applyThemeToDOM(DEFAULT_THEME_CUSTOMIZATION);
    set({ themeCustomization: DEFAULT_THEME_CUSTOMIZATION });

    if (db) {
      const currentSettings = get().settings;
      const updatedSettings = {
        ...currentSettings,
        themeCustomization: DEFAULT_THEME_CUSTOMIZATION,
      };
      await db.settings.put({ key: 'user_settings', value: updatedSettings });
      set({ settings: updatedSettings });
    }
  },

  // ==========================================
  // ATELIER STUDIO ACTIONS
  // ==========================================
  setPreviewConfig: (updater) => {
    const current = get().previewConfig;
    const next = typeof updater === 'function' ? updater(current) : { ...current, ...updater };
    applyAtelierConfigToDOM(next);
    set({ previewConfig: next, isAtelierDirty: true });
  },

  applyAtelierChanges: async () => {
    const currentPreview = get().previewConfig;
    applyAtelierConfigToDOM(currentPreview);

    const syncedTheme: ThemeCustomization = {
      themeId: (currentPreview.themeId as ThemeId) || 'vanilla-dreams',
      fontPairing: currentPreview.typography.pairingId,
      cardAppearance: (currentPreview.card.style as any) || 'polaroid',
      backgroundStyle: (currentPreview.background.mode as any) || 'solid',
      decorationStyle: (currentPreview.decorations.style as any) || 'floral',
      density: currentPreview.layout.density,
      customAccentColor: currentPreview.colors?.accentPrimary,
    };
    applyThemeToDOM(syncedTheme);

    set({ atelierConfig: currentPreview, themeCustomization: syncedTheme, isAtelierDirty: false });

    if (db) {
      const currentSettings = get().settings;
      const updatedSettings = {
        ...currentSettings,
        atelierConfig: currentPreview,
        themeCustomization: syncedTheme,
      };
      await db.settings.put({ key: 'user_settings', value: updatedSettings });
      set({ settings: updatedSettings });
    }
  },

  discardAtelierChanges: () => {
    const active = get().atelierConfig;
    applyAtelierConfigToDOM(active);
    set({ previewConfig: active, isAtelierDirty: false });
  },

  saveAsNewCustomTheme: async (name: string, description?: string) => {
    const preview = get().previewConfig;
    const parentId = (preview.themeId as ThemeId) || 'vanilla-dreams';
    const parentTheme = THEMES[parentId] || THEMES['vanilla-dreams'];

    const newTheme: CustomTheme = {
      id: 'custom-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: name.trim() || 'My Custom Theme',
      tagline: parentTheme.tagline || 'Crafted in Afterglow Atelier',
      description: description?.trim() || 'A personalized atmosphere designed in the Atelier.',
      parentThemeId: parentId,
      badgeSymbol: preview.identity.badgeSymbol || '✨',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
      config: { ...preview, activeCustomThemeId: null },
    };

    await saveDbCustomTheme(newTheme);
    const updatedCustomThemes = await getDbCustomThemes();

    const updatedConfig = {
      ...preview,
      activeCustomThemeId: newTheme.id,
    };
    newTheme.config = updatedConfig;
    await saveDbCustomTheme(newTheme);

    applyAtelierConfigToDOM(updatedConfig);

    set({
      customThemes: updatedCustomThemes,
      atelierConfig: updatedConfig,
      previewConfig: updatedConfig,
      activeCustomThemeId: newTheme.id,
      isAtelierDirty: false,
    });

    if (db) {
      const currentSettings = get().settings;
      await db.settings.put({
        key: 'user_settings',
        value: { ...currentSettings, atelierConfig: updatedConfig },
      });
    }

    return newTheme;
  },

  updateActiveCustomTheme: async () => {
    const activeId = get().activeCustomThemeId;
    if (!activeId) return;

    const existing = get().customThemes.find((t) => t.id === activeId);
    if (!existing) return;

    const preview = get().previewConfig;
    const updated: CustomTheme = {
      ...existing,
      updatedAt: Date.now(),
      config: preview,
    };

    await saveDbCustomTheme(updated);
    const customThemes = await getDbCustomThemes();

    applyAtelierConfigToDOM(preview);
    set({
      customThemes,
      atelierConfig: preview,
      previewConfig: preview,
      isAtelierDirty: false,
    });
  },

  deleteCustomTheme: async (id: string) => {
    await deleteDbCustomTheme(id);
    const customThemes = await getDbCustomThemes();

    let nextActiveId = get().activeCustomThemeId;
    let nextConfig = get().atelierConfig;

    if (nextActiveId === id) {
      nextActiveId = null;
      nextConfig = {
        ...DEFAULT_ATELIER_CONFIG,
        themeId: 'vanilla-dreams',
      };
      applyAtelierConfigToDOM(nextConfig);
    }

    set({
      customThemes,
      activeCustomThemeId: nextActiveId,
      atelierConfig: nextConfig,
      previewConfig: nextConfig,
      isAtelierDirty: false,
    });

    if (db) {
      const currentSettings = get().settings;
      await db.settings.put({
        key: 'user_settings',
        value: { ...currentSettings, atelierConfig: nextConfig },
      });
    }
  },

  duplicateTheme: async (themeId: string, newName?: string) => {
    // Can duplicate built-in theme or an existing custom theme
    let sourceConfig: AtelierConfiguration;
    let parentThemeId: ThemeId;
    let sourceName = '';

    const customSource = get().customThemes.find((t) => t.id === themeId);
    if (customSource) {
      sourceConfig = customSource.config;
      parentThemeId = customSource.parentThemeId;
      sourceName = customSource.name;
    } else {
      const builtInId = (themeId as ThemeId) in THEMES ? (themeId as ThemeId) : 'vanilla-dreams';
      const builtIn = THEMES[builtInId];
      parentThemeId = builtInId;
      sourceName = builtIn.name;
      sourceConfig = {
        ...DEFAULT_ATELIER_CONFIG,
        themeId: builtInId,
        typography: {
          ...DEFAULT_ATELIER_CONFIG.typography,
          pairingId: builtIn.recommendedFont,
        },
        card: {
          ...DEFAULT_ATELIER_CONFIG.card,
          style: builtIn.recommendedCardStyle as any,
        },
        decorations: {
          ...DEFAULT_ATELIER_CONFIG.decorations,
          style: builtIn.recommendedDecor as any,
        },
        identity: {
          ...DEFAULT_ATELIER_CONFIG.identity,
          badgeSymbol: builtIn.badgeSymbol,
        },
      };
    }

    const duplicated: CustomTheme = {
      id: 'custom-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: newName || `${sourceName} (Copy)`,
      tagline: 'Duplicated in Afterglow Atelier',
      description: `A customized variation inspired by ${sourceName}.`,
      parentThemeId,
      badgeSymbol: sourceConfig.identity?.badgeSymbol || '✨',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
      config: sourceConfig,
    };

    await saveDbCustomTheme(duplicated);
    const customThemes = await getDbCustomThemes();

    set({ customThemes });
    return duplicated;
  },

  renameCustomTheme: async (id: string, newName: string) => {
    const existing = get().customThemes.find((t) => t.id === id);
    if (!existing) return;

    const updated = { ...existing, name: newName.trim(), updatedAt: Date.now() };
    await saveDbCustomTheme(updated);
    const customThemes = await getDbCustomThemes();
    set({ customThemes });
  },

  importCustomTheme: async (jsonString: string) => {
    const result = importThemeFromJson(jsonString);
    if (!result.success || !result.theme) {
      return { success: false, error: result.error || 'Failed to import theme.' };
    }

    await saveDbCustomTheme(result.theme);
    const customThemes = await getDbCustomThemes();

    const configToApply = result.theme.config || {
      ...DEFAULT_ATELIER_CONFIG,
      themeId: result.theme.parentThemeId,
    };
    configToApply.activeCustomThemeId = result.theme.id;

    applyAtelierConfigToDOM(configToApply);

    set({
      customThemes,
      atelierConfig: configToApply,
      previewConfig: configToApply,
      activeCustomThemeId: result.theme.id,
      isAtelierDirty: false,
    });

    if (db) {
      const currentSettings = get().settings;
      await db.settings.put({
        key: 'user_settings',
        value: { ...currentSettings, atelierConfig: configToApply },
      });
    }

    return { success: true };
  },

  exportCustomTheme: async (themeId: string) => {
    const custom = get().customThemes.find((t) => t.id === themeId);
    if (custom) {
      return exportThemeToJson(custom);
    }

    // If built-in, build a theme package for it
    const builtInId = (themeId as ThemeId) in THEMES ? (themeId as ThemeId) : 'vanilla-dreams';
    const builtIn = THEMES[builtInId];
    const syntheticTheme: CustomTheme = {
      id: `custom-export-${builtInId}`,
      name: builtIn.name,
      tagline: builtIn.tagline,
      description: builtIn.description,
      parentThemeId: builtInId,
      badgeSymbol: builtIn.badgeSymbol,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
      config: {
        ...DEFAULT_ATELIER_CONFIG,
        themeId: builtInId,
      },
    };
    return exportThemeToJson(syntheticTheme);
  },

  resetAtelierCategory: (category: AtelierCategory) => {
    const current = get().previewConfig;
    let updated = { ...current };

    switch (category) {
      case 'colour-studio':
        updated = { ...updated, colors: {}, gradient: DEFAULT_ATELIER_CONFIG.gradient };
        break;
      case 'typography-studio':
        updated = { ...updated, typography: DEFAULT_ATELIER_CONFIG.typography };
        break;
      case 'background-studio':
        updated = { ...updated, background: DEFAULT_ATELIER_CONFIG.background };
        break;
      case 'card-designer':
        updated = { ...updated, card: DEFAULT_ATELIER_CONFIG.card };
        break;
      case 'decorations-studio':
        updated = { ...updated, decorations: DEFAULT_ATELIER_CONFIG.decorations };
        break;
      case 'layout-navigation':
        updated = { ...updated, layout: DEFAULT_ATELIER_CONFIG.layout };
        break;
      case 'components-studio':
        updated = { ...updated, components: DEFAULT_ATELIER_CONFIG.components };
        break;
      case 'calendar-timeline':
        updated = { ...updated, calendarTimeline: DEFAULT_ATELIER_CONFIG.calendarTimeline };
        break;
      case 'homepage-studio':
        updated = { ...updated, homepage: DEFAULT_ATELIER_CONFIG.homepage };
        break;
      case 'personal-identity':
        updated = { ...updated, identity: DEFAULT_ATELIER_CONFIG.identity };
        break;
      default:
        break;
    }

    applyAtelierConfigToDOM(updated);
    set({ previewConfig: updated, isAtelierDirty: true });
  },

  resetAllAtelier: async () => {
    applyAtelierConfigToDOM(DEFAULT_ATELIER_CONFIG);
    set({
      atelierConfig: DEFAULT_ATELIER_CONFIG,
      previewConfig: DEFAULT_ATELIER_CONFIG,
      activeCustomThemeId: null,
      isAtelierDirty: false,
    });

    if (db) {
      const currentSettings = get().settings;
      await db.settings.put({
        key: 'user_settings',
        value: {
          ...currentSettings,
          atelierConfig: DEFAULT_ATELIER_CONFIG,
          themeCustomization: DEFAULT_THEME_CUSTOMIZATION,
        },
      });
    }
  },

  uploadBackgroundImage: async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const dataUrl = reader.result as string;
          const assetId = 'bg-asset-' + Date.now();
          await saveDbMediaAsset(assetId, dataUrl, file.name);

          const current = get().previewConfig;
          const updated: AtelierConfiguration = {
            ...current,
            background: {
              ...current.background,
              mode: 'image',
              image: {
                ...current.background.image,
                dataUrl,
              },
            },
          };

          applyAtelierConfigToDOM(updated);
          set({ previewConfig: updated, isAtelierDirty: true });
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  clearSampleMemories: async () => {
    if (!db) return;
    const all = await db.memories.toArray();
    for (const m of all) {
      if (m.isSample) {
        await db.memories.delete(m.id);
      }
    }
    const updated = await db.memories.orderBy('date').reverse().toArray();
    const stats = await getStorageStats();
    set({ memories: updated, storageStats: stats });
  },

  restoreSampleMemories: async () => {
    if (!db) return;
    for (const sm of INITIAL_SAMPLE_MEMORIES) {
      await db.memories.put(sm);
    }
    const updated = await db.memories.orderBy('date').reverse().toArray();
    const stats = await getStorageStats();
    set({ memories: updated, storageStats: stats });
  },

  exportDataJson: async () => {
    if (!db) return '{}';
    const memories = await db.memories.toArray();
    const collections = await db.collections.toArray();
    const settings = get().settings;

    const exportPayload = {
      app: 'AFTERGLOW',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      settings,
      collections,
      memories,
    };
    return JSON.stringify(exportPayload, null, 2);
  },

  importDataJson: async (jsonString: string) => {
    if (!db) return false;
    try {
      const data = JSON.parse(jsonString);
      if (!data.memories || !Array.isArray(data.memories)) return false;

      // Import collections
      if (data.collections && Array.isArray(data.collections)) {
        for (const c of data.collections) {
          await db.collections.put(c);
        }
      }

      // Import memories
      for (const m of data.memories) {
        await db.memories.put(m);
      }

      // Import settings
      if (data.settings) {
        await db.settings.put({ key: 'user_settings', value: data.settings });
      }

      await get().loadInitialData();
      return true;
    } catch (e) {
      console.error('Failed to parse and import JSON backup:', e);
      return false;
    }
  },

  refreshStats: async () => {
    const stats = await getStorageStats();
    set({ storageStats: stats });
  },
}));
