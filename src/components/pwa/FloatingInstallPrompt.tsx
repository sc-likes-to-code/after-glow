'use client';

import React, { useState } from 'react';
import { usePwaInstall } from '@/hooks/usePwaInstall';
import { AfterglowLogo } from '@/components/brand/AfterglowLogo';
import { Download, X, Share, PlusSquare, Sparkles, Check, ArrowRight } from 'lucide-react';

export function FloatingInstallPrompt() {
  const {
    isInstalled,
    isInstallable,
    isIos,
    isDismissed,
    promptInstall,
    dismissPrompt,
  } = usePwaInstall();

  const [showIosGuide, setShowIosGuide] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // If already installed or dismissed by user or not installable, do not render
  if (isInstalled || isDismissed || (!isInstallable && !isIos)) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosGuide(true);
      return;
    }

    const result = await promptInstall();
    if (result === 'accepted') {
      setInstallSuccess(true);
      setTimeout(() => setInstallSuccess(false), 3000);
    }
  };

  return (
    <>
      {/* FLOATING INSTALL PILL (BOTTOM-RIGHT) */}
      <aside
        aria-label="Install AFTERGLOW as an App"
        className="fixed bottom-24 md:bottom-6 right-4 sm:right-6 z-40 max-w-[340px] w-auto animate-in fade-in slide-in-from-bottom-5 duration-300"
      >
        <div className="relative p-3.5 sm:p-4 rounded-2xl bg-[var(--ag-surface)]/95 backdrop-blur-md border border-[var(--ag-border)] shadow-xl text-[var(--ag-primary-text)] flex items-center gap-3.5 group">
          {/* Decorative Corner Sparkle */}
          <div className="absolute -top-1.5 -left-1.5 w-4 h-4 text-[var(--ag-accent-primary)] pointer-events-none">
            <Sparkles className="w-full h-full" />
          </div>

          {/* App Keepsake Icon */}
          <div className="shrink-0">
            <AfterglowLogo variant="symbol" size="sm" />
          </div>

          {/* Text Content */}
          <div className="min-w-0 flex-1 pr-1">
            <div className="flex items-center gap-1.5">
              <h4 className="font-heading text-xs font-bold text-[var(--ag-primary-text)] tracking-tight">
                Install AFTERGLOW
              </h4>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-[var(--ag-accent-secondary)] text-[var(--ag-secondary-text)]">
                App
              </span>
            </div>
            <p className="font-caveat text-xs text-[var(--ag-secondary-text)] leading-tight truncate mt-0.5">
              Keep your memories one tap away ♡
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--ag-accent-primary)] hover:bg-[var(--ag-accent-hover)] active:scale-95 text-white text-[11px] font-semibold shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              {installSuccess ? (
                <>
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  <span>Installed!</span>
                </>
              ) : (
                <>
                  <Download className="w-3 h-3" />
                  <span>Install</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={dismissPrompt}
              aria-label="Dismiss installation prompt"
              className="w-6 h-6 rounded-full flex items-center justify-center text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] hover:bg-[var(--ag-card-bg)] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* iOS SAFARI INSTALLATION GUIDE MODAL */}
      {showIosGuide && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowIosGuide(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-[var(--ag-surface)] border border-[var(--ag-border)] p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <AfterglowLogo variant="symbol" size="sm" />
                <div>
                  <h3 className="font-heading text-base font-bold text-[var(--ag-primary-text)]">
                    Install on iOS / Safari
                  </h3>
                  <p className="font-caveat text-xs text-[var(--ag-secondary-text)]">
                    Add AFTERGLOW directly to your iPhone or iPad
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowIosGuide(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] hover:bg-[var(--ag-card-bg)] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step-by-step Visual Instructions */}
            <div className="space-y-3 pt-1">
              {/* Step 1 */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--ag-card-bg)] border border-[var(--ag-border)]">
                <div className="w-8 h-8 rounded-full bg-[var(--ag-accent-secondary)] flex items-center justify-center text-[var(--ag-accent-primary)] shrink-0 font-mono text-xs font-bold">
                  1
                </div>
                <div className="text-xs text-[var(--ag-primary-text)] flex-1">
                  <span>Tap the </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[var(--ag-accent-primary)]">
                    <Share className="w-3.5 h-3.5 inline" />
                    Share button
                  </span>
                  <span> in Safari&apos;s bottom toolbar.</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--ag-card-bg)] border border-[var(--ag-border)]">
                <div className="w-8 h-8 rounded-full bg-[var(--ag-accent-secondary)] flex items-center justify-center text-[var(--ag-accent-primary)] shrink-0 font-mono text-xs font-bold">
                  2
                </div>
                <div className="text-xs text-[var(--ag-primary-text)] flex-1">
                  <span>Scroll down the share sheet and tap </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[var(--ag-accent-primary)]">
                    <PlusSquare className="w-3.5 h-3.5 inline" />
                    Add to Home Screen
                  </span>
                  <span>.</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--ag-card-bg)] border border-[var(--ag-border)]">
                <div className="w-8 h-8 rounded-full bg-[var(--ag-accent-secondary)] flex items-center justify-center text-[var(--ag-accent-primary)] shrink-0 font-mono text-xs font-bold">
                  3
                </div>
                <div className="text-xs text-[var(--ag-primary-text)] flex-1">
                  <span>Confirm by tapping </span>
                  <strong className="font-semibold text-[var(--ag-accent-primary)]">Add</strong>
                  <span> in the top-right corner. Enjoy the native app!</span>
                </div>
              </div>
            </div>

            {/* Dismiss action */}
            <button
              type="button"
              onClick={() => {
                setShowIosGuide(false);
                dismissPrompt();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[var(--ag-accent-primary)] hover:bg-[var(--ag-accent-hover)] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span>Got it, thank you ♡</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
