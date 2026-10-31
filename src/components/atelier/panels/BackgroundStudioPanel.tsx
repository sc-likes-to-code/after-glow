'use client';

import React, { useRef, useState } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { BackgroundMode, TextureType, PatternType } from '@/types/atelier';
import {
  Image as ImageIcon,
  RotateCcw,
  Sparkles,
  Upload,
  Trash2,
  Grid,
  Layers,
  Sliders,
} from 'lucide-react';

export function BackgroundStudioPanel() {
  const { previewConfig, setPreviewConfig, resetAtelierCategory, uploadBackgroundImage } =
    useMemoryStore();
  const background = previewConfig.background;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const modes: { id: BackgroundMode; label: string; desc: string }[] = [
    { id: 'solid', label: 'Solid Color', desc: 'Minimal clean ivory or theme tint' },
    { id: 'gradient', label: 'Atmospheric Gradient', desc: 'Dynamic linear or radial blend' },
    { id: 'texture', label: 'Paper & Linen Texture', desc: 'Authentic parchment and canvas tactile feel' },
    { id: 'pattern', label: 'Illustrated Pattern', desc: 'Delicate stars, floral sprigs, and dots' },
    { id: 'image', label: 'Custom Wallpaper', desc: 'Upload your own image stored in IndexedDB' },
  ];

  const textures: { id: TextureType; label: string }[] = [
    { id: 'paper', label: 'Handmade Paper' },
    { id: 'linen', label: 'Woven Linen' },
    { id: 'canvas', label: 'Artist Canvas' },
    { id: 'grain', label: 'Fine Fleck Grain' },
    { id: 'vintage-parchment', label: 'Aged Parchment' },
  ];

  const patterns: { id: PatternType; label: string; icon: string }[] = [
    { id: 'flowers', label: 'Tiny Flowers', icon: '🌸' },
    { id: 'stars', label: 'Celestial Stars', icon: '✨' },
    { id: 'polka-dots', label: 'Gentle Dots', icon: '•' },
    { id: 'botanical-leaves', label: 'Botanical Leaves', icon: '🌿' },
    { id: 'clouds', label: 'Drifting Clouds', icon: '☁' },
    { id: 'hearts', label: 'Scrapbook Hearts', icon: '♡' },
    { id: 'geometric', label: 'Deco Lattice', icon: '◇' },
  ];

  const handleModeChange = (mode: BackgroundMode) => {
    setPreviewConfig((prev) => ({
      ...prev,
      background: {
        ...prev.background,
        mode,
      },
    }));
  };

  const handleTextureChange = (texture: TextureType) => {
    setPreviewConfig((prev) => ({
      ...prev,
      background: {
        ...prev.background,
        mode: 'texture',
        texture,
      },
    }));
  };

  const handlePatternChange = (pattern: PatternType) => {
    setPreviewConfig((prev) => ({
      ...prev,
      background: {
        ...prev.background,
        mode: 'pattern',
        pattern,
      },
    }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadBackgroundImage(file);
    } catch (err) {
      alert('Failed to upload background image: ' + (err as Error).message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    setPreviewConfig((prev) => ({
      ...prev,
      background: {
        ...prev.background,
        mode: 'solid',
        image: {
          ...prev.background.image,
          dataUrl: undefined,
        },
      },
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--ag-border)]">
        <div>
          <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[var(--ag-accent-primary)]" />
            Background Studio
          </h2>
          <p className="font-caveat text-base text-[var(--ag-muted-text)]">
            Textures, gradients, delicate botanical motifs, and custom wallpapers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => resetAtelierCategory('background-studio')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] border border-[var(--ag-border)] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Background</span>
        </button>
      </div>

      {/* 1. BACKGROUND MODE SELECTOR */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
          Background Material & Atmosphere
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {modes.map((m) => {
            const isSelected = background.mode === m.id;

            return (
              <div
                key={m.id}
                onClick={() => handleModeChange(m.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-1 ${
                  isSelected
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/30 ring-2 ring-[var(--ag-accent-primary)] shadow-2xs'
                    : 'border-[var(--ag-border)] bg-[var(--ag-card-bg)] hover:bg-[var(--ag-surface)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-fraunces text-sm font-bold text-[var(--ag-primary-text)]">
                    {m.label}
                  </h4>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[var(--ag-accent-primary)]" />
                  )}
                </div>
                <p className="text-xs text-[var(--ag-muted-text)] line-clamp-1">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. TEXTURE PRESETS (When Texture mode is active) */}
      {background.mode === 'texture' && (
        <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)]">
              Paper & Fabric Textures
            </span>
            <span className="text-xs font-caveat text-[var(--ag-muted-text)]">
              authentic tactility crafted for high DPI displays
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {textures.map((tex) => {
              const isSelected = background.texture === tex.id;

              return (
                <button
                  key={tex.id}
                  type="button"
                  onClick={() => handleTextureChange(tex.id)}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] font-bold text-[var(--ag-primary-text)] shadow-xs'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-card-bg)]'
                  }`}
                >
                  <span className="text-xs block">{tex.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. PATTERN MOTIFS (When Pattern mode is active) */}
      {background.mode === 'pattern' && (
        <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)]">
              Illustrated Micro-Patterns
            </span>
            <span className="text-xs font-caveat text-[var(--ag-muted-text)]">
              restrained botanical & celestial motifs
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {patterns.map((pat) => {
              const isSelected = background.pattern === pat.id;

              return (
                <button
                  key={pat.id}
                  type="button"
                  onClick={() => handlePatternChange(pat.id)}
                  className={`p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    isSelected
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] font-bold text-[var(--ag-primary-text)] shadow-xs'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-card-bg)]'
                  }`}
                >
                  <span className="text-xl">{pat.icon}</span>
                  <span className="text-[11px] block">{pat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Pattern Opacity Slider */}
          <div className="pt-2 flex items-center justify-between gap-4 max-w-sm">
            <span className="text-xs font-semibold text-[var(--ag-secondary-text)]">
              Pattern Visibility / Opacity
            </span>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="5"
                max="60"
                value={Math.round((background.patternOpacity || 0.15) * 100)}
                onChange={(e) =>
                  setPreviewConfig((prev) => ({
                    ...prev,
                    background: {
                      ...prev.background,
                      patternOpacity: parseInt(e.target.value) / 100,
                    },
                  }))
                }
                className="w-28 accent-[var(--ag-accent-primary)] cursor-pointer"
              />
              <span className="text-xs font-mono text-[var(--ag-muted-text)] w-8">
                {Math.round((background.patternOpacity || 0.15) * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 4. CUSTOM IMAGE WALLPAPER (Stored in IndexedDB) */}
      {background.mode === 'image' && (
        <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)]">
              IndexedDB Image Wallpaper
            </span>
            <span className="text-xs font-caveat text-[var(--ag-muted-text)]">
              safely persisted locally inside your browser database
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {background.image?.dataUrl ? (
            <div className="space-y-4">
              {/* Preview Thumbnail */}
              <div className="flex items-center gap-4 p-3 rounded-lg bg-[var(--ag-surface)] border border-[var(--ag-border)]">
                <div className="w-20 h-14 rounded-md overflow-hidden bg-black/10 border border-[var(--ag-border)] shrink-0">
                  <img
                    src={background.image.dataUrl}
                    alt="Active wallpaper"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-bold text-[var(--ag-primary-text)] block truncate">
                    Custom Wallpaper Active
                  </span>
                  <span className="text-[10px] font-mono text-[var(--ag-muted-text)] block">
                    Mode: {background.image.repeat} • Scale: {background.image.scale}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-full bg-[var(--ag-surfaceElevated)] hover:bg-[var(--ag-border)] text-xs font-semibold text-[var(--ag-primary-text)] border border-[var(--ag-border)]"
                  >
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="p-1.5 rounded-full text-rose-500 hover:bg-rose-50"
                    title="Remove wallpaper"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Image Controls: Scale, Position, Repeat */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
                    Image Repeat Style
                  </label>
                  <select
                    value={background.image.repeat}
                    onChange={(e) =>
                      setPreviewConfig((prev) => ({
                        ...prev,
                        background: {
                          ...prev.background,
                          image: {
                            ...prev.background.image,
                            repeat: e.target.value as any,
                          },
                        },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-md bg-[var(--ag-surface)] border border-[var(--ag-border)] text-[var(--ag-primary-text)]"
                  >
                    <option value="cover">Full Cover (Bleed)</option>
                    <option value="no-repeat">Centered (No Repeat)</option>
                    <option value="repeat">Tiled Repeat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
                    Wallpaper Scale ({background.image.scale}%)
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={background.image.scale}
                    onChange={(e) =>
                      setPreviewConfig((prev) => ({
                        ...prev,
                        background: {
                          ...prev.background,
                          image: {
                            ...prev.background.image,
                            scale: parseInt(e.target.value),
                          },
                        },
                      }))
                    }
                    className="w-full accent-[var(--ag-accent-primary)] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
                    Position Alignment
                  </label>
                  <select
                    value={background.image.position}
                    onChange={(e) =>
                      setPreviewConfig((prev) => ({
                        ...prev,
                        background: {
                          ...prev.background,
                          image: {
                            ...prev.background.image,
                            position: e.target.value as any,
                          },
                        },
                      }))
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-md bg-[var(--ag-surface)] border border-[var(--ag-border)] text-[var(--ag-primary-text)]"
                  >
                    <option value="center">Center</option>
                    <option value="top">Top Aligned</option>
                    <option value="bottom">Bottom Aligned</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 rounded-xl border-2 border-dashed border-[var(--ag-border)] bg-[var(--ag-surface)]/60 text-center space-y-3 cursor-pointer hover:bg-[var(--ag-surface)] transition-colors"
            >
              <Upload className="w-8 h-8 text-[var(--ag-accent-primary)] mx-auto" />
              <div>
                <h4 className="font-fraunces text-sm font-bold text-[var(--ag-primary-text)]">
                  {isUploading ? 'Saving image to IndexedDB...' : 'Click to Upload Wallpaper Image'}
                </h4>
                <p className="text-xs text-[var(--ag-muted-text)] mt-0.5">
                  Supports PNG, JPG, WEBP, SVG • Stored in offline browser storage
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
