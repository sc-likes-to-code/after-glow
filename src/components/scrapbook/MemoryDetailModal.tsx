'use client';

import React, { useState, useEffect } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { MOODS } from '@/lib/constants';
import { WashiTape, MoodBadge, Paperclip, PostmarkBadge, TinyHeart } from './Decorations';
import { FlowerIllustration } from './FlowerIllustration';
import { ConfirmDialog } from './ConfirmDialog';
import { format } from 'date-fns';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
  MapPin,
  Calendar,
  Clock,
  Folder,
  Tag,
  Sparkles,
} from 'lucide-react';

export function MemoryDetailModal() {
  const {
    selectedMemoryId,
    setSelectedMemoryId,
    memories,
    collections,
    openCaptureModal,
    deleteMemory,
    toggleFavorite,
  } = useMemoryStore();

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Deactivate background screen scrolling when modal is open
  useEffect(() => {
    if (selectedMemoryId) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [selectedMemoryId]);

  if (!selectedMemoryId) return null;

  const currentIndex = memories.findIndex((m) => m.id === selectedMemoryId);
  const memory = memories[currentIndex];

  if (!memory) return null;

  const collection = collections.find((c) => c.id === memory.collectionId);
  const moodMeta = MOODS[memory.mood] || MOODS.peaceful;

  const formattedDate = memory.date
    ? format(new Date(memory.date + 'T00:00:00'), 'EEEE, MMMM d, yyyy')
    : '';

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedMemoryId(memories[currentIndex - 1].id);
      setActivePhotoIndex(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < memories.length - 1) {
      setSelectedMemoryId(memories[currentIndex + 1].id);
      setActivePhotoIndex(0);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleteDialogOpen(false);
    await deleteMemory(memory.id);
  };

  const handleEdit = () => {
    openCaptureModal(memory);
  };

  const photos = memory.photos || [];
  const currentPhoto = photos[activePhotoIndex] || photos[0];
  const hasPhotos = photos.length > 0;

  return (
    <div
      onClick={() => setSelectedMemoryId(null)}
      className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-[var(--ag-card-bg)] border border-[var(--ag-border)] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrapbook Top Bar */}
        <div className="relative px-4 sm:px-6 py-2.5 bg-[var(--ag-surface)] border-b border-[var(--ag-border)] flex items-center justify-between shrink-0">
          <div className="absolute -top-3 left-1/3 pointer-events-none hidden sm:block">
            <WashiTape color="blush" width="w-24" angle={-2} />
          </div>

          {/* Prev / Next Memory Navigation */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              className="p-1 rounded-full hover:bg-[var(--ag-card-bg)] text-[var(--ag-secondary-text)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
              title="Previous memory"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-[var(--ag-muted-text)]">
              {currentIndex + 1} of {memories.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex >= memories.length - 1}
              className="p-1 rounded-full hover:bg-[var(--ag-card-bg)] text-[var(--ag-secondary-text)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
              title="Next memory"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Actions & Close */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(memory.id)}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                memory.isFavorite
                  ? 'bg-[var(--ag-accent-secondary)] text-[var(--ag-accent-primary)]'
                  : 'hover:bg-[var(--ag-card-bg)] text-[var(--ag-muted-text)]'
              }`}
              title="Favorite"
            >
              <TinyHeart className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleEdit}
              className="p-1.5 rounded-full hover:bg-[var(--ag-card-bg)] text-[var(--ag-secondary-text)] transition-colors cursor-pointer"
              title="Edit memory"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="p-1.5 rounded-full hover:bg-rose-500/20 text-rose-500 transition-colors cursor-pointer"
              title="Delete memory"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-4 bg-[var(--ag-border)] mx-1" />
            <button
              type="button"
              onClick={() => setSelectedMemoryId(null)}
              className="p-1.5 rounded-full hover:bg-[var(--ag-card-bg)] text-[var(--ag-secondary-text)] transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic 2-Column Responsive Scrapbook Spread */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden min-h-0">
          {/* Left Column: Visual Showcase (Photo Gallery or Botanical Illustration) */}
          <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-center items-center bg-[var(--ag-surface)]/50 p-3 sm:p-5 border-b md:border-b-0 md:border-r border-[var(--ag-border)]/80 min-h-0 overflow-hidden">
            {hasPhotos ? (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 min-h-0">
                <div className="relative w-full flex-1 flex items-center justify-center rounded-sm bg-[var(--ag-card-bg)] p-2 border border-[var(--ag-border)] shadow-xs min-h-0 overflow-hidden">
                  <img
                    src={currentPhoto?.dataUrl}
                    alt={memory.title}
                    className="w-auto h-auto max-w-full max-h-[calc(85vh-150px)] object-contain rounded-xs shadow-xs transition-transform duration-300"
                  />
                  {currentPhoto?.caption && (
                    <span className="absolute bottom-2 left-2 right-2 text-center font-caveat text-xs text-[var(--ag-primary-text)] bg-[var(--ag-card-bg)]/85 backdrop-blur-xs px-2 py-0.5 rounded-xs">
                      {currentPhoto.caption}
                    </span>
                  )}
                </div>

                {/* Thumbnail strip if multiple photos */}
                {photos.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto max-w-full py-1 shrink-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {photos.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-11 h-11 shrink-0 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                          activePhotoIndex === idx
                            ? 'border-[var(--ag-accent-primary)] shadow-xs scale-105'
                            : 'border-transparent opacity-65 hover:opacity-100'
                        }`}
                      >
                        <img src={p.dataUrl} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Botanical sanctuary artwork if no photo attached */
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-24 h-24 flex items-center justify-center">
                  <FlowerIllustration mood={memory.mood} size={84} animate={true} />
                </div>
                <h3 className="font-fraunces text-lg text-[var(--ag-primary-text)] font-semibold">
                  A Quiet Written Moment
                </h3>
                <p className="font-caveat text-lg text-[var(--ag-muted-text)] max-w-xs">
                  &ldquo;Some memories are painted in words and quiet feelings.&rdquo;
                </p>
                <PostmarkBadge dateText={memory.date} city={memory.location || 'AFTERGLOW'} />
              </div>
            )}
          </div>

          {/* Right Column: Editorial Journal Content */}
          <div className="md:col-span-6 lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto min-h-0 no-scrollbar space-y-4">
            <div className="space-y-3">
              {/* Mood & Collection Badges */}
              <div className="flex flex-wrap items-center gap-1.5">
                <MoodBadge mood={memory.mood} showDescription={false} />
                {collection && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--ag-surface)] text-xs text-[var(--ag-secondary-text)] border border-[var(--ag-border)]">
                    <Folder className="w-3 h-3 text-[var(--ag-accent-primary)]" />
                    {collection.name}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="font-fraunces text-xl sm:text-2xl lg:text-3xl font-bold text-[var(--ag-primary-text)] leading-snug">
                {memory.title}
              </h1>

              {/* Date, Time & Location Details */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-[var(--ag-muted-text)] pb-1 border-b border-[var(--ag-border)]/60">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
                  {formattedDate}
                </span>
                {memory.time && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
                    {memory.time}
                  </span>
                )}
                {memory.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" />
                    {memory.location}
                  </span>
                )}
              </div>

              {/* Handwritten Scrapbook Note */}
              {memory.handwrittenNote && (
                <div className="relative py-1.5 px-3 rounded-md bg-[var(--ag-surface)] border-l-3 border-[var(--ag-accent-primary)]">
                  <p className="font-caveat text-lg sm:text-xl text-[var(--ag-primary-text)] leading-snug">
                    &ldquo;{memory.handwrittenNote}&rdquo;
                  </p>
                </div>
              )}

              {/* Diary Lined Paper Journal */}
              <div className="lined-paper p-3.5 sm:p-4 rounded-md border border-[var(--ag-border)]/80 bg-[var(--ag-surface)]/20 shadow-2xs">
                <p className="font-nunito text-[var(--ag-primary-text)] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {memory.journal}
                </p>
              </div>
            </div>

            {/* Bottom Footer: Tags & Postmark Stamp */}
            <div className="pt-2 border-t border-[var(--ag-border)]/60 flex items-center justify-between gap-2 shrink-0">
              <div className="flex flex-wrap items-center gap-1">
                {memory.tags?.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[var(--ag-surface)] text-[11px] text-[var(--ag-secondary-text)] border border-[var(--ag-border)]"
                  >
                    <Tag className="w-2.5 h-2.5 text-[var(--ag-accent-primary)]" />#{t}
                  </span>
                ))}
              </div>

              {hasPhotos && (
                <div className="shrink-0 scale-75 origin-right">
                  <PostmarkBadge dateText={memory.date} city={memory.location || 'AFTERGLOW'} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrapbook Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Let this memory gently fade?"
        description="Are you sure you want to let this moment slip away from your scrapbook? Once it fades, it cannot be recovered."
        note="some moments are gone, but never truly forgotten"
        confirmLabel="Yes, let it fade"
        cancelLabel="Keep this memory ♡"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
}
