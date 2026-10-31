'use client';

import React from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import {
  ButtonShape,
  ButtonSize,
  ButtonFill,
  InputBorder,
  InputRadius,
  ModalRadius,
  BadgeShape,
  IconStyle,
} from '@/types/atelier';
import {
  Component,
  RotateCcw,
  Sparkles,
  Sliders,
  Check,
  Search,
  Heart,
  ChevronDown,
} from 'lucide-react';

export function ComponentsStudioPanel() {
  const { previewConfig, setPreviewConfig, resetAtelierCategory } = useMemoryStore();
  const comps = previewConfig.components;

  const updateComps = (partial: Partial<typeof comps>) => {
    setPreviewConfig((prev) => ({
      ...prev,
      components: {
        ...prev.components,
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
            <Component className="w-5 h-5 text-[var(--ag-accent-primary)]" />
            Components Studio
          </h2>
          <p className="font-caveat text-base text-[var(--ag-muted-text)]">
            Tailor tactile buttons, form controls, modal radii, and pill badges.
          </p>
        </div>

        <button
          type="button"
          onClick={() => resetAtelierCategory('components-studio')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] border border-[var(--ag-border)] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Components</span>
        </button>
      </div>

      {/* 1. BUTTONS CONTROLS & LIVE SPECIMEN */}
      <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)]">
            Buttons & Interactive Triggers
          </span>
          <span className="text-xs font-caveat text-[var(--ag-muted-text)]">
            affects all primary & secondary actions
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Button Shape */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Button Shape
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['pill', 'rounded', 'square'] as ButtonShape[]).map((shape) => (
                <button
                  key={shape}
                  type="button"
                  onClick={() => updateComps({ buttonShape: shape })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    comps.buttonShape === shape
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>

          {/* Button Fill */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Button Fill Style
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['solid', 'soft', 'outline'] as ButtonFill[]).map((fill) => (
                <button
                  key={fill}
                  type="button"
                  onClick={() => updateComps({ buttonFill: fill })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    comps.buttonFill === fill
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {fill}
                </button>
              ))}
            </div>
          </div>

          {/* Button Size */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Button Sizing
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['small', 'medium', 'large'] as ButtonSize[]).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => updateComps({ buttonSize: sz })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    comps.buttonSize === sz
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Buttons Swatch */}
        <div className="p-3.5 rounded-lg bg-[var(--ag-surface)] border border-[var(--ag-border)] flex flex-wrap items-center gap-3">
          <button
            type="button"
            style={{
              borderRadius: comps.buttonShape === 'pill' ? '9999px' : comps.buttonShape === 'rounded' ? '8px' : '2px',
            }}
            className="px-4 py-2 bg-[var(--ag-accent-primary)] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Primary Button</span>
          </button>

          <button
            type="button"
            style={{
              borderRadius: comps.buttonShape === 'pill' ? '9999px' : comps.buttonShape === 'rounded' ? '8px' : '2px',
            }}
            className="px-4 py-2 bg-[var(--ag-card-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] text-xs font-semibold shadow-2xs hover:bg-[var(--ag-surface)] cursor-pointer"
          >
            Secondary Button
          </button>
        </div>
      </div>

      {/* 2. FORM INPUTS & SEARCH */}
      <div className="p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)] space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
          Inputs & Text Fields
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Input Radius */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Input Curvature
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['sharp', 'rounded', 'pill'] as InputRadius[]).map((rad) => (
                <button
                  key={rad}
                  type="button"
                  onClick={() => updateComps({ inputRadius: rad })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    comps.inputRadius === rad
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {rad}
                </button>
              ))}
            </div>
          </div>

          {/* Input Border Stance */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Border Prominence
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['subtle', 'standard', 'pronounced'] as InputBorder[]).map((ib) => (
                <button
                  key={ib}
                  type="button"
                  onClick={() => updateComps({ inputBorder: ib })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    comps.inputBorder === ib
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {ib}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Input Specimen */}
        <div className="p-3.5 rounded-lg bg-[var(--ag-surface)] border border-[var(--ag-border)]">
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--ag-muted-text)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              readOnly
              value="Filter memories by keyword, place, or mood..."
              style={{
                borderRadius: comps.inputRadius === 'pill' ? '9999px' : comps.inputRadius === 'rounded' ? '8px' : '2px',
                borderWidth: comps.inputBorder === 'pronounced' ? '2px' : '1px',
              }}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)]"
            />
          </div>
        </div>
      </div>

      {/* 3. MODALS, BADGES & TOGGLES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)]">
        {/* Modal Radius */}
        <div>
          <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1.5">
            Modal Window Radius
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['soft', 'curved', 'expressive'] as ModalRadius[]).map((mr) => (
              <button
                key={mr}
                type="button"
                onClick={() => updateComps({ modalRadius: mr })}
                className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                  comps.modalRadius === mr
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                    : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                }`}
              >
                {mr}
              </button>
            ))}
          </div>
        </div>

        {/* Badge Shape */}
        <div>
          <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1.5">
            Badge & Tag Shape
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['pill', 'rounded', 'flag'] as BadgeShape[]).map((bs) => (
              <button
                key={bs}
                type="button"
                onClick={() => updateComps({ badgeShape: bs })}
                className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                  comps.badgeShape === bs
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                    : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                }`}
              >
                {bs}
              </button>
            ))}
          </div>
        </div>

        {/* Icon Stroke Stance */}
        <div>
          <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1.5">
            Icon Line Weight
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['delicate', 'minimal', 'bold'] as IconStyle[]).map((is) => (
              <button
                key={is}
                type="button"
                onClick={() => updateComps({ iconStyle: is })}
                className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                  comps.iconStyle === is
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                    : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                }`}
              >
                {is}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
