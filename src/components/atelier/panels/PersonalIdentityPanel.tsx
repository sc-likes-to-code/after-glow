'use client';

import React from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { FlowerIllustration } from '@/components/scrapbook/FlowerIllustration';
import { MoodType } from '@/types/memory';
import {
  User,
  RotateCcw,
  Sparkles,
  Heart,
  Feather,
  Smile,
} from 'lucide-react';

export function PersonalIdentityPanel() {
  const { previewConfig, setPreviewConfig, resetAtelierCategory } = useMemoryStore();
  const identity = previewConfig.identity;

  const symbols = ['🌸', '✨', '🌿', '☀', '☕', '🌙', '☁', '🌹', '🦋', '🍵', '🕯', '🐚', '🍂', '🎨'];

  const avatars = [
    { id: 'flower-rose', label: 'Blush Rose', mood: 'loved' as MoodType },
    { id: 'flower-sun', label: 'Sunflower', mood: 'happy' as MoodType },
    { id: 'flower-lavender', label: 'Lavender', mood: 'peaceful' as MoodType },
    { id: 'flower-daisy', label: 'Daisy', mood: 'inspired' as MoodType },
    { id: 'flower-bluebell', label: 'Bluebell', mood: 'curious' as MoodType },
  ];

  const updateIdentity = (partial: Partial<typeof identity>) => {
    setPreviewConfig((prev) => ({
      ...prev,
      identity: {
        ...prev.identity,
        ...partial,
      },
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--ag-border)]">
        <div>
          <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
            <User className="w-5 h-5 text-[var(--ag-accent-primary)]" />
            Personal Identity Studio
          </h2>
          <p className="font-caveat text-base text-[var(--ag-muted-text)]">
            Your name, seal symbol, botanical avatar, signature, and digital bookplate.
          </p>
        </div>

        <button
          type="button"
          onClick={() => resetAtelierCategory('personal-identity')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] border border-[var(--ag-border)] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Identity</span>
        </button>
      </div>

      {/* 1. MONIKER & SEAL SYMBOL */}
      <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
          Bookplate Moniker & Symbol
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
              Your Diary Moniker / Display Name
            </label>
            <input
              type="text"
              value={identity.displayName || ''}
              onChange={(e) => updateIdentity({ displayName: e.target.value })}
              placeholder="Dear Soul"
              className="w-full px-3 py-2 text-xs rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] font-fraunces text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1">
              Application Subtitle
            </label>
            <input
              type="text"
              value={identity.appSubtitle || ''}
              onChange={(e) => updateIdentity({ appSubtitle: e.target.value })}
              placeholder="a little place for the moments that matter ♡"
              className="w-full px-3 py-2 text-xs rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)]"
            />
          </div>
        </div>

        {/* Favorite Decorative Symbol */}
        <div>
          <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-2">
            Signature Badge Symbol (Shown in Sidebar & App Bar)
          </label>
          <div className="flex flex-wrap gap-2">
            {symbols.map((sym) => {
              const isSelected = identity.badgeSymbol === sym;

              return (
                <button
                  key={sym}
                  type="button"
                  onClick={() => updateIdentity({ badgeSymbol: sym })}
                  className={`w-9 h-9 rounded-lg border text-lg flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] scale-110 shadow-xs'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] hover:bg-[var(--ag-card-bg)]'
                  }`}
                >
                  {sym}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. BOTANICAL AVATAR SEAL */}
      <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
          Botanical Avatar Seal
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {avatars.map((av) => {
            const isSelected = identity.avatar === av.id;

            return (
              <button
                key={av.id}
                type="button"
                onClick={() => updateIdentity({ avatar: av.id })}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  isSelected
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] shadow-xs font-semibold text-[var(--ag-primary-text)]'
                    : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] hover:bg-[var(--ag-card-bg)]'
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <FlowerIllustration mood={av.mood} size={36} />
                </div>
                <span className="text-xs">{av.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. PERSONAL HANDWRITTEN SIGNATURE */}
      <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
            Handwritten Monogram / Signature
          </span>
          <span className="text-xs font-caveat text-[var(--ag-muted-text)]">
            appended warmly to your memory entries
          </span>
        </div>

        <input
          type="text"
          value={identity.signature || ''}
          onChange={(e) => updateIdentity({ signature: e.target.value })}
          placeholder="e.g. — yours always, S."
          className="w-full px-3 py-2 text-xs rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] font-caveat text-lg"
        />

        {identity.signature && (
          <div className="p-3 rounded-md bg-[var(--ag-surface)] border border-[var(--ag-border)]">
            <span className="font-caveat text-xl text-[var(--ag-primary-text)] block">
              {identity.signature}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
