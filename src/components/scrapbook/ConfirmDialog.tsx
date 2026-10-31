'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WashiTape, TinyFlower, TinyHeart } from './Decorations';
import { Trash2, Heart, Sparkles, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  note?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title = 'Let this memory gently fade?',
  description = 'Are you sure you want to remove this moment from your memory book? Once it slips away, it cannot be recovered.',
  note = 'some moments are gone, but never truly forgotten',
  confirmLabel = 'Yes, let it fade',
  cancelLabel = 'Keep this memory ♡',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[80] overflow-hidden bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-[var(--ag-card-bg)] border border-[var(--ag-border)] rounded-2xl shadow-2xl p-6 sm:p-7 text-center overflow-hidden"
          >
            {/* Cute Decorative Washi Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none">
              <WashiTape color="rose" width="w-24" angle={-1.5} />
            </div>

            {/* Close Cross */}
            <button
              type="button"
              onClick={onCancel}
              className="absolute top-3 right-3 p-1.5 rounded-full text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] hover:bg-[var(--ag-surface)] transition-colors cursor-pointer"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Botanical Icon Badge */}
            <div className="w-14 h-14 mx-auto mb-3.5 rounded-full bg-[var(--ag-accent-secondary)]/50 border border-[var(--ag-accent-primary)]/40 flex items-center justify-center text-[var(--ag-accent-primary)] shadow-2xs">
              <Trash2 className="w-6 h-6 stroke-[1.75]" />
            </div>

            {/* Title */}
            <h3 className="font-fraunces text-xl sm:text-2xl font-bold text-[var(--ag-primary-text)] mb-2 leading-tight">
              {title}
            </h3>

            {/* Description */}
            <p className="font-nunito text-xs sm:text-sm text-[var(--ag-secondary-text)] leading-relaxed mb-3">
              {description}
            </p>

            {/* Handwritten Comforting Microcopy */}
            {note && (
              <div className="mb-5 py-1 px-3 rounded-md bg-[var(--ag-surface)] border border-[var(--ag-border)]/60 inline-block">
                <span className="font-caveat text-sm sm:text-base text-[var(--ag-muted-text)] italic">
                  &ldquo;{note}&rdquo;
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={onCancel}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-full bg-[var(--ag-surface)] hover:bg-[var(--ag-border)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] font-medium text-xs shadow-2xs transition-colors cursor-pointer"
              >
                {cancelLabel}
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className="w-full sm:flex-1 py-2.5 px-4 rounded-full bg-[var(--ag-accent-primary)] hover:opacity-90 text-white font-medium text-xs shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
