import type { ThemeCustomization } from './theme';
import type { AtelierConfiguration, CustomTheme } from './atelier';

export type MoodType =
  | 'happy'
  | 'peaceful'
  | 'excited'
  | 'grateful'
  | 'nostalgic'
  | 'loved'
  | 'melancholic'
  | 'adventurous'
  | 'tired'
  | 'inspired'
  | 'curious';

export interface MoodMeta {
  type: MoodType;
  label: string;
  emoji: string;
  flower: string;
  flowerColor: string;
  flowerStem: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export interface MemoryPhoto {
  id: string;
  dataUrl: string;
  caption?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface Memory {
  id: string;
  title: string;
  journal: string;
  photos: MemoryPhoto[];
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  mood: MoodType;
  location?: string;
  collectionId: string;
  tags: string[];
  isFavorite?: boolean;
  isSample?: boolean;
  handwrittenNote?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  color: string;
  coverImage?: string;
  icon?: string;
  isDefault?: boolean;
  createdAt: number;
}

export interface UserSettings {
  displayName: string;
  greeting: string;
  avatar: string;
  defaultMood: MoodType;
  themePreference: 'warm-ivory' | 'soft-parchment' | 'candlelight';
  themeCustomization?: ThemeCustomization;
  atelierConfig?: AtelierConfiguration;
  hasSeededSampleData: boolean;
}

export type ActiveTab = 'home' | 'timeline' | 'garden' | 'collections' | 'search' | 'atelier' | 'settings';
