'use client';

import React, { useState, useEffect } from 'react';
import { useMemoryStore } from '@/store/useMemoryStore';
import { Collection } from '@/types/memory';
import { PolaroidCard } from '@/components/scrapbook/PolaroidCard';
import { WashiTape, TinyFlower, TinySparkle } from '@/components/scrapbook/Decorations';
import { ConfirmDialog } from '@/components/scrapbook/ConfirmDialog';
import {
  FolderHeart,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Image as ImageIcon,
  Check,
  X,
} from 'lucide-react';

export function CollectionsView() {
  const {
    collections,
    memories,
    saveCollection,
    deleteCollection,
    openCaptureModal,
    setSelectedMemoryId,
  } = useMemoryStore();

  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#EBCFD3');
  const [icon, setIcon] = useState('✨');

  // Deactivate main screen scroller when collection modal is open
  useEffect(() => {
    if (isCreateModalOpen) {
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
  }, [isCreateModalOpen]);

  const paletteColors = [
    { label: 'Blush Pink', hex: '#EBCFD3' },
    { label: 'Dusty Rose', hex: '#D9AEB5' },
    { label: 'Sage Green', hex: '#DCE5D7' },
    { label: 'Butter Yellow', hex: '#F2E8BF' },
    { label: 'Lavender', hex: '#E6DFF0' },
    { label: 'Warm Brown', hex: '#75665A' },
    { label: 'Soft Parchment', hex: '#E8DFD1' },
    { label: 'Seashell', hex: '#E0DFE5' },
  ];

  const iconOptions = ['✨', '💗', '🦋', '☕', '🌿', '🕯', '🌸', '🐚', '📖', '🍵', '🎨', '🍂'];

  const openCreateModal = (colToEdit?: Collection) => {
    if (colToEdit) {
      setEditingCollection(colToEdit);
      setName(colToEdit.name);
      setDescription(colToEdit.description || '');
      setColor(colToEdit.color);
      setIcon(colToEdit.icon || '✨');
    } else {
      setEditingCollection(null);
      setName('');
      setDescription('');
      setColor('#EBCFD3');
      setIcon('✨');
    }
    setIsCreateModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await saveCollection(
      {
        name: name.trim(),
        description: description.trim() || undefined,
        color,
        icon,
      },
      editingCollection?.id
    );

    setIsCreateModalOpen(false);
  };

  const activeCollection = collections.find((c) => c.id === activeCollectionId);
  const activeMemories = activeCollectionId
    ? memories.filter((m) => m.collectionId === activeCollectionId)
    : [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* If inside an active collection album */}
      {activeCollection ? (
        <div className="space-y-8">
          {/* Back button & Album Banner */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setActiveCollectionId(null)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C525D] hover:underline cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all collections</span>
            </button>

            {/* Scrapbook Album Cover Header */}
            <div
              style={{ backgroundColor: activeCollection.color }}
              className="p-8 rounded-xl border border-[var(--ag-border)] shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="absolute top-2 right-8 pointer-events-none">
                <WashiTape color="parchment" width="w-28" angle={-3} />
              </div>

              <div className="space-y-1.5 z-10">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{activeCollection.icon || '✨'}</span>
                  <h1 className="font-fraunces text-2xl sm:text-4xl font-bold text-[#3B3029]">
                    {activeCollection.name}
                  </h1>
                </div>
                {activeCollection.description && (
                  <p className="font-caveat text-xl text-[#55483F]">
                    {activeCollection.description}
                  </p>
                )}
                <span className="text-xs font-mono text-[#75665A] block pt-1">
                  {activeMemories.length} preserved moment{activeMemories.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={() => openCreateModal(activeCollection)}
                  className="px-3 py-2 rounded-full bg-[var(--ag-card-bg)]/90 hover:bg-[var(--ag-card-bg)] border border-[var(--ag-border)] text-xs font-semibold text-[var(--ag-primary-text)] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit album</span>
                </button>
                <button
                  type="button"
                  onClick={() => openCaptureModal()}
                  className="px-4 py-2 rounded-full bg-[var(--ag-accent-primary)] hover:opacity-90 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer transition-opacity"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add moment here</span>
                </button>
              </div>
            </div>
          </div>

          {/* Memories inside this Collection */}
          {activeMemories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {activeMemories.map((m, idx) => (
                <PolaroidCard
                  key={m.id}
                  memory={m}
                  rotation={idx % 2 === 0 ? -1 : 1.5}
                  hasTape={idx % 3 === 0}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-lg bg-[var(--ag-card-bg)] border border-dashed border-[var(--ag-border)] text-center space-y-3">
              <FolderHeart className="w-10 h-10 text-[var(--ag-accent-primary)] mx-auto opacity-70" />
              <h3 className="font-fraunces text-lg font-bold text-[var(--ag-primary-text)]">
                This album is currently empty
              </h3>
              <p className="font-caveat text-lg text-[var(--ag-muted-text)]">
                Capture a memory and tuck it into this collection.
              </p>
              <button
                type="button"
                onClick={() => openCaptureModal()}
                className="mt-2 px-5 py-2.5 rounded-full bg-[var(--ag-accent-primary)] text-white text-xs font-semibold hover:opacity-90 cursor-pointer transition-opacity"
              >
                + Add first moment
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ALL COLLECTIONS GALLERY */
        <div className="space-y-8">
          <div className="relative pt-2 pb-6 border-b border-[var(--ag-border)]/80 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FolderHeart className="w-4 h-4 text-[var(--ag-accent-primary)]" />
                <span className="text-xs uppercase tracking-widest font-semibold text-[var(--ag-muted-text)]">
                  Scrapbook Albums
                </span>
              </div>
              <h1 className="font-fraunces text-3xl sm:text-4xl font-bold text-[var(--ag-primary-text)]">
                Collections
              </h1>
              <p className="font-caveat text-xl text-[var(--ag-muted-text)]">
                little worlds of their own, kept safe between book covers
              </p>
            </div>

            <button
              type="button"
              onClick={() => openCreateModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--ag-accent-primary)] hover:opacity-90 text-white text-xs font-semibold shadow-xs transition-opacity cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Collection</span>
            </button>
          </div>

          {/* Collections Scrapbook Covers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((col, idx) => {
              const colMemories = memories.filter((m) => m.collectionId === col.id);
              const previewPhoto = colMemories.find((m) => m.photos?.length > 0)?.photos[0]?.dataUrl;

              return (
                <div
                  key={col.id}
                  onClick={() => setActiveCollectionId(col.id)}
                  style={{ backgroundColor: col.color }}
                  className="group relative cursor-pointer p-4 rounded-xl border border-[var(--ag-border)] shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between min-h-[220px]"
                >
                  {/* Decorative Washi Tape on top edge */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 pointer-events-none">
                    <WashiTape
                      color={idx % 2 === 0 ? 'blush' : 'butter'}
                      width="w-16"
                      angle={idx % 2 === 0 ? -2 : 2}
                    />
                  </div>

                  {/* Album Cover Photo Thumbnail or Icon */}
                  <div className="w-full aspect-4/3 rounded-md overflow-hidden bg-[var(--ag-card-bg)]/85 border border-[var(--ag-border)] mb-3 flex items-center justify-center relative">
                    {previewPhoto ? (
                      <img
                        src={previewPhoto}
                        alt={col.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-[var(--ag-muted-text)]">
                        <span className="text-3xl mb-1">{col.icon || '✨'}</span>
                        <span className="font-caveat text-sm text-[var(--ag-secondary-text)]">blank album</span>
                      </div>
                    )}

                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[var(--ag-card-bg)]/95 text-[10px] font-mono text-[var(--ag-primary-text)] shadow-2xs border border-[var(--ag-border)]">
                      {colMemories.length} item{colMemories.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Collection Info */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-base">{col.icon || '✨'}</span>
                      <h3 className="font-fraunces text-base font-bold text-[#3B3029] truncate">
                        {col.name}
                      </h3>
                    </div>
                    {col.description && (
                      <p className="font-sans text-[11px] text-[#55483F] line-clamp-2 leading-relaxed">
                        {col.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CREATE / EDIT COLLECTION MODAL */}
      {isCreateModalOpen && (
        <div
          onClick={() => setIsCreateModalOpen(false)}
          className="fixed inset-0 z-[70] overflow-hidden bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            className="w-full max-w-md bg-[var(--ag-surface)] rounded-lg border border-[var(--ag-border)] shadow-xl p-6 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--ag-border)]">
              <h3 className="font-fraunces text-lg font-bold text-[var(--ag-primary-text)]">
                {editingCollection ? 'Edit Collection' : 'Create New Collection'}
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[var(--ag-muted-text)] hover:text-[var(--ag-primary-text)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1">
                  Collection Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sunday Walks, Poetry Books"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-sm text-[var(--ag-primary-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="A little note about what lives here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[var(--ag-input-bg)] border border-[var(--ag-border)] text-xs text-[var(--ag-primary-text)] focus:outline-hidden focus:border-[var(--ag-accent-primary)]"
                />
              </div>

              {/* Icon selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1">
                  Album Icon
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {iconOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setIcon(opt)}
                      className={`w-8 h-8 rounded-md flex items-center justify-center text-base border transition-all cursor-pointer ${
                        icon === opt
                          ? 'border-[var(--ag-accent-primary)] bg-[var(--ag-accent-secondary)]/40 scale-105'
                          : 'border-[var(--ag-border)] bg-[var(--ag-card-bg)] hover:bg-[var(--ag-surface)]'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[var(--ag-secondary-text)] mb-1">
                  Cover Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {paletteColors.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setColor(c.hex)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-7 h-7 rounded-full border transition-all cursor-pointer ${
                        color === c.hex ? 'ring-2 ring-[var(--ag-primary-text)] scale-110' : 'border-[var(--ag-border)]'
                      }`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--ag-border)] flex items-center justify-between">
                {editingCollection && !editingCollection.isDefault ? (
                  <button
                    type="button"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="text-xs text-[#E06D6D] hover:underline cursor-pointer"
                  >
                    Delete album
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-[var(--ag-secondary-text)] hover:bg-[var(--ag-surface)] rounded-md cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-full bg-[var(--ag-accent-primary)] hover:opacity-90 text-white text-xs font-semibold shadow-xs cursor-pointer transition-opacity"
                  >
                    Save Collection
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Collection Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete this album?"
        description={`Are you sure you want to delete the "${editingCollection?.name || 'collection'}" album? Any memories inside will be safely moved to "Little Joys".`}
        note="albums may go, but memories remain safe"
        confirmLabel="Yes, delete album"
        cancelLabel="Keep album"
        onConfirm={async () => {
          if (editingCollection) {
            await deleteCollection(editingCollection.id);
            setIsDeleteDialogOpen(false);
            setIsCreateModalOpen(false);
            setActiveCollectionId(null);
          }
        }}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
}
