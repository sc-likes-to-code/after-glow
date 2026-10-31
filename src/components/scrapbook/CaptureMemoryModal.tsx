'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { MoodType, MemoryPhoto } from '@/types/memory';
import { MOODS } from '@/lib/constants';
import { WashiTape, TinySparkle, TinyFlower } from './Decorations';
import { X, Upload, Image as ImageIcon, Trash2, MapPin, Tag, Folder, Calendar, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function CaptureMemoryModal() {
  const {
    isCaptureModalOpen,
    editingMemory,
    closeCaptureModal,
    saveMemory,
    collections,
    settings,
  } = useMemoryStore();

  const [title, setTitle] = useState('');
  const [journal, setJournal] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(() => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  });
  const [mood, setMood] = useState<MoodType>(settings.defaultMood || 'peaceful');
  const [location, setLocation] = useState('');
  const [collectionId, setCollectionId] = useState('col-little-joys');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [photos, setPhotos] = useState<MemoryPhoto[]>([]);
  const [handwrittenNote, setHandwrittenNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Deactivate main screen scroller while modal is open
  useEffect(() => {
    if (isCaptureModalOpen) {
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
  }, [isCaptureModalOpen]);

  // Sync state if editing
  useEffect(() => {
    if (editingMemory) {
      setTitle(editingMemory.title || '');
      setJournal(editingMemory.journal || '');
      setDate(editingMemory.date || new Date().toISOString().split('T')[0]);
      setTime(editingMemory.time || '');
      setMood(editingMemory.mood || 'peaceful');
      setLocation(editingMemory.location || '');
      setCollectionId(editingMemory.collectionId || collections[0]?.id || 'col-little-joys');
      setTags(editingMemory.tags || []);
      setPhotos(editingMemory.photos || []);
      setHandwrittenNote(editingMemory.handwrittenNote || '');
    } else {
      // Fresh memory defaults
      setTitle('');
      setJournal('');
      setDate(new Date().toISOString().split('T')[0]);
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`);
      setMood(settings.defaultMood || 'peaceful');
      setLocation('');
      setCollectionId(collections[0]?.id || 'col-little-joys');
      setTags([]);
      setPhotos([]);
      setHandwrittenNote('');
    }
  }, [editingMemory, collections, settings, isCaptureModalOpen]);

  if (!isCaptureModalOpen) return null;

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          const newPhoto: MemoryPhoto = {
            id: 'photo-' + Math.random().toString(36).substring(2, 9),
            dataUrl: result,
            caption: '',
            aspectRatio: 'square',
          };
          setPhotos((prev) => [...prev, newPhoto]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(/^#/, '');
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !journal.trim() && photos.length === 0) {
      alert('Please add a title, thought, or photo to preserve this memory.');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveMemory(
        {
          title: title.trim() || 'A gentle moment',
          journal: journal.trim(),
          photos,
          date,
          time: time || undefined,
          mood,
          location: location.trim() || undefined,
          collectionId,
          tags,
          handwrittenNote: handwrittenNote.trim() || undefined,
        },
        editingMemory?.id
      );

      // Trigger warm confetti
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EBCFD3', '#D9AEB5', '#DCE5D7', '#F2E8BF', '#FAF7F0'],
      });

      closeCaptureModal();
    } catch (err) {
      console.error('Error preserving memory:', err);
      alert('Could not save memory. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] overflow-hidden bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={closeCaptureModal}
    >
      <div
        className="relative w-full max-w-3xl bg-[var(--ag-surface)] border border-[var(--ag-border)] rounded-lg shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Diary Washi Tape */}
        <div className="relative pt-6 px-6 pb-4 bg-[var(--ag-card-bg)] border-b border-[var(--ag-border)] flex items-center justify-between">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 pointer-events-none">
            <WashiTape color="sage" width="w-32" angle={-1} />
          </div>

          <div className="flex items-center gap-2">
            <TinyFlower className="w-5 h-5 text-[var(--ag-accent-primary)]" />
            <div>
              <h2 className="font-fraunces text-xl sm:text-2xl font-bold text-[var(--ag-primary-text)]">
                {editingMemory ? 'Edit Memory' : 'Capture a Moment'}
              </h2>
              <p className="font-caveat text-sm sm:text-base text-[var(--ag-muted-text)] -mt-1">
                Tell me about this little moment...
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCaptureModal}
            className="p-2 rounded-full hover:bg-[var(--ag-surface)] text-[var(--ag-secondary-text)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Scroll Area */}
        <form onSubmit={handleSubmit} className="overflow-y-auto no-scrollbar p-5 sm:p-7 space-y-6 flex-1">
          {/* Title & Short Handwritten Note */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1.5">
                Memory Title
              </label>
              <input
                type="text"
                placeholder="e.g. A quiet Sunday morning, coffee & poetry"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-primary-text)] font-fraunces text-lg placeholder:text-[var(--ag-muted-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1.5">
                Handwritten Scrapbook Annotation{' '}
                <span className="font-caveat normal-case text-sm text-[var(--ag-muted-text)]">(a tiny personal note)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. warm cup, still heart ♡"
                value={handwrittenNote}
                onChange={(e) => setHandwrittenNote(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-[var(--ag-secondary-text)] font-caveat text-xl placeholder:text-[var(--ag-muted-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
              />
            </div>
          </div>

          {/* Journal Entry (Diary lined page feel) */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1.5">
              Journal Entry
            </label>
            <div className="relative rounded-md border border-[var(--ag-border)] overflow-hidden">
              <textarea
                rows={5}
                placeholder="What did the air smell like? What made you smile? Write down whatever little details you want to hold onto..."
                value={journal}
                onChange={(e) => setJournal(e.target.value)}
                className="w-full p-4 font-nunito text-[var(--ag-primary-text)] bg-[var(--ag-input-bg)] text-base leading-relaxed placeholder:text-[var(--ag-muted-text)] focus:outline-hidden resize-none"
              />
            </div>
          </div>

          {/* Photos Upload & Previews */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)]">
                Photographs & Snapshots
              </label>
              <span className="text-xs text-[var(--ag-muted-text)] font-caveat text-sm">
                Stored safely in your browser database
              </span>
            </div>

            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFileUpload(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/20'
                  : 'border-[var(--ag-border)] bg-[var(--ag-surface)]/50 hover:bg-[var(--ag-surface)]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <div className="flex flex-col items-center justify-center gap-1.5">
                <Upload className="w-5 h-5 text-[var(--ag-accent-primary)]" />
                <p className="text-sm font-medium text-[var(--ag-primary-text)]">
                  Click or drag and drop photos here
                </p>
                <p className="text-xs text-[var(--ag-muted-text)]">
                  Supports JPG, PNG, WEBP, GIF
                </p>
              </div>
            </div>

            {/* Photo Previews */}
            {photos.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                {photos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className="relative group aspect-square rounded-sm overflow-hidden border border-[var(--ag-border)] bg-[var(--ag-card-bg)] p-1 shadow-xs"
                  >
                    <img
                      src={photo.dataUrl}
                      alt="Uploaded memory"
                      className="w-full h-full object-cover rounded-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(photo.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-600 cursor-pointer"
                      title="Remove photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-xs bg-[var(--ag-surface)]/90 text-[10px] font-medium text-[var(--ag-primary-text)]">
                        Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mood Selector (All 11 Moods as beautiful cards) */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-2">
              How did this moment feel?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {(Object.keys(MOODS) as MoodType[]).map((mKey) => {
                const meta = MOODS[mKey];
                const isSelected = mood === mKey;
                return (
                  <button
                    key={mKey}
                    type="button"
                    onClick={() => setMood(mKey)}
                    style={{
                      backgroundColor: isSelected ? meta.bgColor : 'var(--ag-card-bg)',
                      borderColor: isSelected ? meta.borderColor : 'var(--ag-border)',
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-md border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-[var(--ag-accent-primary)] shadow-xs'
                        : 'hover:bg-[var(--ag-surface)] opacity-85 hover:opacity-100'
                    }`}
                  >
                    <span className="text-xl shrink-0">{meta.emoji}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#55483F] truncate">
                        {meta.label}
                      </div>
                      <div className="text-[10px] text-[#75665A] font-serif italic truncate">
                        {meta.flower}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date, Time, Location & Collection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date & Time */}
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" /> Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-xs font-sans text-[var(--ag-primary-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
                />
              </div>

              <div className="w-28">
                <label className="flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1.5">
                  <Clock className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" /> Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-xs font-sans text-[var(--ag-primary-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
                />
              </div>
            </div>

            {/* Collection */}
            <div>
              <label className="flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1.5">
                <Folder className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" /> Collection
              </label>
              <select
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-xs font-sans text-[var(--ag-primary-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
              >
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" /> Location{' '}
                <span className="text-[10px] text-[var(--ag-muted-text)] font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Cozy Corner Cafe, By the Lake"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-xs font-sans text-[var(--ag-primary-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1.5">
                <Tag className="w-3.5 h-3.5 text-[var(--ag-accent-primary)]" /> Tags
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="e.g. coffee, sunshine"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-xs font-sans text-[var(--ag-primary-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 rounded-md bg-[var(--ag-surface)] hover:bg-[var(--ag-border)] text-xs font-semibold text-[var(--ag-primary-text)] transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>

              {/* Tag Pills */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--ag-accent-secondary)]/50 text-xs text-[var(--ag-primary-text)] border border-[var(--ag-accent-primary)]/40"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        className="text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-[var(--ag-border)] flex items-center justify-between">
            <button
              type="button"
              onClick={closeCaptureModal}
              className="px-4 py-2.5 rounded-md text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--ag-accent-primary)] hover:opacity-90 text-white font-medium text-sm shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Preserving...' : 'Keep this memory ♡'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
