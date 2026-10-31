import Dexie, { type EntityTable } from 'dexie';
import { Memory, Collection, UserSettings } from '@/types/memory';
import { CustomTheme } from '@/types/atelier';
import { DEFAULT_COLLECTIONS, DEFAULT_USER_SETTINGS } from './constants';
import { INITIAL_SAMPLE_MEMORIES } from './sampleMemories';

export class AfterglowDB extends Dexie {
  memories!: EntityTable<Memory, 'id'>;
  collections!: EntityTable<Collection, 'id'>;
  settings!: EntityTable<{ key: string; value: any }, 'key'>;
  customThemes!: EntityTable<CustomTheme, 'id'>;
  mediaAssets!: EntityTable<{ id: string; dataUrl: string; name?: string; createdAt: number }, 'id'>;

  constructor() {
    super('afterglow_diary_db');
    this.version(1).stores({
      memories: 'id, date, mood, collectionId, createdAt, updatedAt, *tags',
      collections: 'id, name, createdAt',
      settings: 'key',
    });
    this.version(2).stores({
      customThemes: 'id, name, parentThemeId, createdAt, updatedAt',
      mediaAssets: 'id, createdAt',
    });
  }
}

export const db = typeof window !== 'undefined' ? new AfterglowDB() : (null as any);

let initPromise: Promise<void> | null = null;

export async function initializeDatabase(): Promise<void> {
  if (typeof window === 'undefined' || !db) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      await db.open();

      // Check if collections are populated
      const colCount = await db.collections.count();
      if (colCount === 0) {
        await db.collections.bulkPut(DEFAULT_COLLECTIONS);
      }

      // Check if settings exist
      const userSettings = await db.settings.get('user_settings');
      if (!userSettings) {
        await db.settings.put({
          key: 'user_settings',
          value: DEFAULT_USER_SETTINGS,
        });
      }

      // Check if initial sample memories need to be seeded
      const memoryCount = await db.memories.count();
      const seededFlag = await db.settings.get('has_seeded_samples');
      if (memoryCount === 0 && !seededFlag?.value) {
        await db.memories.bulkPut(INITIAL_SAMPLE_MEMORIES);
        await db.settings.put({
          key: 'has_seeded_samples',
          value: true,
        });
      }
    } catch (error) {
      console.error('Failed to initialize Afterglow database:', error);
    }
  })();

  return initPromise;
}

export async function getStorageStats() {
  if (typeof window === 'undefined' || !db) return { memoryCount: 0, photoCount: 0, estimatedBytes: 0 };
  const memories = await db.memories.toArray();
  let photoCount = 0;
  let estimatedBytes = 0;

  for (const m of memories) {
    photoCount += m.photos?.length || 0;
    // rough byte estimation
    estimatedBytes += (m.title?.length || 0) * 2;
    estimatedBytes += (m.journal?.length || 0) * 2;
    if (m.photos) {
      for (const p of m.photos) {
        estimatedBytes += (p.dataUrl?.length || 0) * 2;
      }
    }
  }

  return {
    memoryCount: memories.length,
    photoCount,
    estimatedBytes,
  };
}

export async function getDbCustomThemes(): Promise<CustomTheme[]> {
  if (typeof window === 'undefined' || !db) return [];
  try {
    return await db.customThemes.toArray();
  } catch (e) {
    console.error('Failed to load custom themes from Dexie:', e);
    return [];
  }
}

export async function saveDbCustomTheme(theme: CustomTheme): Promise<void> {
  if (typeof window === 'undefined' || !db) return;
  try {
    await db.customThemes.put(theme);
  } catch (e) {
    console.error('Failed to save custom theme to Dexie:', e);
  }
}

export async function deleteDbCustomTheme(id: string): Promise<void> {
  if (typeof window === 'undefined' || !db) return;
  try {
    await db.customThemes.delete(id);
  } catch (e) {
    console.error('Failed to delete custom theme from Dexie:', e);
  }
}

export async function saveDbMediaAsset(id: string, dataUrl: string, name?: string): Promise<void> {
  if (typeof window === 'undefined' || !db) return;
  try {
    await db.mediaAssets.put({
      id,
      dataUrl,
      name,
      createdAt: Date.now(),
    });
  } catch (e) {
    console.error('Failed to save media asset to Dexie:', e);
  }
}

export async function getDbMediaAsset(id: string): Promise<{ id: string; dataUrl: string } | undefined> {
  if (typeof window === 'undefined' || !db) return undefined;
  try {
    return await db.mediaAssets.get(id);
  } catch (e) {
    console.error('Failed to retrieve media asset from Dexie:', e);
    return undefined;
  }
}
