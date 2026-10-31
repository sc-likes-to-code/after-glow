'use client';

import React from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import {
  SidebarPosition,
  SidebarWidth,
  NavStyle,
  ContentMaxWidth,
  PagePadding,
  BorderRadiusSystem,
} from '@/types/atelier';
import { InterfaceDensity } from '@/types/theme';
import {
  Layout,
  RotateCcw,
  PanelLeft,
  PanelRight,
  Maximize2,
  Grid,
  Menu,
} from 'lucide-react';

export function LayoutNavigationPanel() {
  const { previewConfig, setPreviewConfig, resetAtelierCategory } = useMemoryStore();
  const layout = previewConfig.layout;

  const updateLayout = (partial: Partial<typeof layout>) => {
    setPreviewConfig((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        ...partial,
      },
    }));
  };

  const navStyles: { id: NavStyle; label: string; desc: string }[] = [
    { id: 'classic', label: 'Classic Scrapbook Shelf', desc: 'Full-featured left sidebar with brand mark & quote' },
    { id: 'minimal', label: 'Slim Minimal Rail', desc: 'Compact icon-centric vertical strip' },
    { id: 'floating', label: 'Floating Glass Dock', desc: 'Detached floating navigation island with frosted blur' },
    { id: 'top', label: 'Top Editorial Header', desc: 'Traditional magazine masthead along the top edge' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--ag-border)]">
        <div>
          <h2 className="font-fraunces text-xl font-bold text-[var(--ag-primary-text)] flex items-center gap-2">
            <Layout className="w-5 h-5 text-[var(--ag-accent-primary)]" />
            Layout & Navigation Studio
          </h2>
          <p className="font-caveat text-base text-[var(--ag-muted-text)]">
            Configure application shelf width, positions, density, and spatial flow.
          </p>
        </div>

        <button
          type="button"
          onClick={() => resetAtelierCategory('layout-navigation')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] border border-[var(--ag-border)] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Layout</span>
        </button>
      </div>

      {/* 1. NAVIGATION STYLE ARCHETYPES */}
      <div className="space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
          Navigation Archetypes
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {navStyles.map((ns) => {
            const isSelected = layout.navStyle === ns.id;

            return (
              <div
                key={ns.id}
                onClick={() => updateLayout({ navStyle: ns.id })}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-1 ${
                  isSelected
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/30 ring-2 ring-[var(--ag-accent-primary)] shadow-2xs'
                    : 'border-[var(--ag-border)] bg-[var(--ag-card-bg)] hover:bg-[var(--ag-surface)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-fraunces text-sm font-bold text-[var(--ag-primary-text)]">
                    {ns.label}
                  </h4>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[var(--ag-accent-primary)]" />
                  )}
                </div>
                <p className="text-xs text-[var(--ag-muted-text)] leading-relaxed">{ns.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. SIDEBAR GEOMETRY & POSITION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)]">
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
            Navigation Rail Geometry
          </span>

          {/* Sidebar Position */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Desktop Sidebar Dock
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['left', 'right'] as SidebarPosition[]).map((pos) => (
                <button
                  key={pos}
                  type="button"
                  onClick={() => updateLayout({ sidebarPosition: pos })}
                  className={`py-2 text-xs rounded-md border capitalize font-medium flex items-center justify-center gap-1.5 transition-colors ${
                    layout.sidebarPosition === pos
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {pos === 'left' ? <PanelLeft className="w-3.5 h-3.5" /> : <PanelRight className="w-3.5 h-3.5" />}
                  <span>{pos === 'left' ? 'Left Dock' : 'Right Dock'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Width */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Sidebar Shelf Width
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['compact', 'normal', 'wide'] as SidebarWidth[]).map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => updateLayout({ sidebarWidth: w })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    layout.sidebarWidth === w
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Spatial Padding & Density */}
        <div className="space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ag-secondary-text)] block">
            Interface Density & Atmosphere
          </span>

          {/* Density Preset */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Visual Density
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['spacious', 'comfortable', 'compact'] as InterfaceDensity[]).map((den) => (
                <button
                  key={den}
                  type="button"
                  onClick={() => updateLayout({ density: den })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    layout.density === den
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {den}
                </button>
              ))}
            </div>
          </div>

          {/* Border Radius System */}
          <div>
            <label className="block text-xs font-medium text-[var(--ag-secondary-text)] mb-1.5">
              Corner Curvature System
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['sharp', 'soft', 'rounded', 'pill'] as BorderRadiusSystem[]).map((rad) => (
                <button
                  key={rad}
                  type="button"
                  onClick={() => updateLayout({ borderRadiusSystem: rad })}
                  className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                    layout.borderRadiusSystem === rad
                      ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                      : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                  }`}
                >
                  {rad}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. CONTENT MAX-WIDTH & PAGE PADDING */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-[var(--ag-border)] bg-[var(--ag-card-bg)]">
        <div>
          <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1.5">
            Content Reading Max-Width
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {(['narrow', 'normal', 'wide', 'full'] as ContentMaxWidth[]).map((mw) => (
              <button
                key={mw}
                type="button"
                onClick={() => updateLayout({ contentMaxWidth: mw })}
                className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                  layout.contentMaxWidth === mw
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                    : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                }`}
              >
                {mw}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[var(--ag-secondary-text)] mb-1.5">
            Outer Canvas Padding
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['compact', 'normal', 'spacious'] as PagePadding[]).map((pad) => (
              <button
                key={pad}
                type="button"
                onClick={() => updateLayout({ pagePadding: pad })}
                className={`py-1.5 text-xs rounded-md border capitalize font-medium transition-colors ${
                  layout.pagePadding === pad
                    ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)] text-[var(--ag-primary-text)] font-semibold'
                    : 'border-[var(--ag-border)] bg-[var(--ag-surface)] text-[var(--ag-secondary-text)]'
                }`}
              >
                {pad}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
