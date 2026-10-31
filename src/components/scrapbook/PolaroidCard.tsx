import React from 'react';
import { Memory } from '@/types/memory';
import { useMemoryStore } from '@/store/useMemoryStore';
import { WashiTape, Paperclip, MoodBadge, TinyHeart } from './Decorations';
import { format } from 'date-fns';
import { MapPin, Sparkles } from 'lucide-react';

interface PolaroidCardProps {
  memory: Memory;
  rotation?: number;
  tapeColor?: 'blush' | 'sage' | 'butter' | 'lavender' | 'parchment' | 'rose';
  hasTape?: boolean;
  hasPaperclip?: boolean;
}

export function PolaroidCard({
  memory,
  rotation = 0,
  tapeColor = 'blush',
  hasTape = false,
  hasPaperclip = false,
}: PolaroidCardProps) {
  const { setSelectedMemoryId, toggleFavorite, themeCustomization } = useMemoryStore();

  const cardStyle = themeCustomization.cardAppearance;
  const decorStyle = themeCustomization.decorationStyle;

  const primaryPhoto = memory.photos?.[0]?.dataUrl;
  const formattedDate = memory.date ? format(new Date(memory.date + 'T00:00:00'), 'MMM d, yyyy') : '';

  // Calculate rotation: only apply rotation in polaroid mode
  const effectiveRotation = cardStyle === 'polaroid' ? rotation : 0;

  // Render decorations only if not minimal
  const showDecorations = decorStyle !== 'minimal';

  return (
    <div
      style={{
        transform: effectiveRotation !== 0 ? `rotate(${effectiveRotation}deg)` : undefined,
      }}
      onClick={() => setSelectedMemoryId(memory.id)}
      className="polaroid-card group relative cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
    >
      {/* Decorative Washi Tape or Paperclip */}
      {showDecorations && hasTape && (
        <div className="decor-accent absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <WashiTape color={tapeColor} width="w-20" angle={effectiveRotation ? -effectiveRotation : -1} />
        </div>
      )}

      {showDecorations && hasPaperclip && (
        <div className="decor-accent absolute -top-4 right-5 z-20 pointer-events-none">
          <Paperclip />
        </div>
      )}

      {/* Photo Frame Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xs bg-[var(--ag-surface)] border border-[var(--ag-border-subtle)] flex items-center justify-center transition-colors">
        {primaryPhoto ? (
          <img
            src={primaryPhoto}
            alt={memory.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-[var(--ag-muted-text)] p-4 text-center">
            <Sparkles className="w-6 h-6 text-[var(--ag-accent-primary)] mb-1.5 opacity-60" />
            <span className="font-hand text-lg text-[var(--ag-secondary-text)]">a quiet memory</span>
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          type="button"
          aria-label="Favorite memory"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(memory.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-xs transition-colors duration-200 z-10 ${
            memory.isFavorite
              ? 'bg-[var(--ag-accent-secondary)] text-[var(--ag-accent-primary)] shadow-xs'
              : 'bg-[var(--ag-bg)]/80 text-[var(--ag-muted-text)] hover:bg-[var(--ag-bg)] hover:text-[var(--ag-primary-text)]'
          }`}
        >
          <TinyHeart
            className={`w-3.5 h-3.5 ${
              memory.isFavorite ? 'text-[var(--ag-accent-primary)]' : 'text-[var(--ag-secondary-text)]'
            }`}
          />
        </button>

        {/* Sample indicator if sample memory */}
        {memory.isSample && (
          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[var(--ag-bg)]/90 backdrop-blur-xs border border-[var(--ag-border)] text-[10px] font-mono text-[var(--ag-secondary-text)]">
            sample
          </div>
        )}
      </div>

      {/* Card Content & Details */}
      <div className="pt-3 px-1 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-heading text-base font-semibold text-[var(--ag-primary-text)] group-hover:text-[var(--ag-accent-primary)] line-clamp-1 transition-colors">
            {memory.title}
          </h3>
          <span className="text-[11px] font-body font-medium text-[var(--ag-muted-text)] whitespace-nowrap pt-0.5">
            {formattedDate}
          </span>
        </div>

        {/* Short excerpt / handwritten annotation */}
        {memory.handwrittenNote ? (
          <p className="font-caveat text-base text-[var(--ag-secondary-text)] leading-snug line-clamp-1 italic mb-2">
            &ldquo;{memory.handwrittenNote}&rdquo;
          </p>
        ) : (
          <p className="font-body text-xs text-[var(--ag-muted-text)] leading-relaxed line-clamp-2 mb-2">
            {memory.journal}
          </p>
        )}

        {/* Card Footer: Mood & Location */}
        <div className="mt-auto pt-2 border-t border-[var(--ag-border-subtle)] flex items-center justify-between text-xs text-[var(--ag-muted-text)]">
          <MoodBadge mood={memory.mood} />
          {memory.location && (
            <div className="flex items-center gap-1 text-[11px] text-[var(--ag-muted-text)] truncate max-w-[45%]">
              <MapPin className="w-3 h-3 text-[var(--ag-accent-primary)] shrink-0" />
              <span className="truncate">{memory.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
