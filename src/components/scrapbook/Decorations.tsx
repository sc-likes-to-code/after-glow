import React from 'react';
import { MoodType } from '@/types/memory';
import { MOODS } from '@/lib/constants';

// Washi Tape Component
interface WashiTapeProps {
  color?: 'blush' | 'sage' | 'butter' | 'lavender' | 'parchment' | 'rose';
  className?: string;
  angle?: number;
  width?: string;
}

export function WashiTape({ color = 'blush', className = '', angle = -2, width = 'w-24' }: WashiTapeProps) {
  const bgStyles = {
    blush: 'bg-[#EBCFD3]/80 border-[#D9AEB5]/40 text-[#D9AEB5]',
    sage: 'bg-[#DCE5D7]/85 border-[#C4D4BD]/40 text-[#758A6E]',
    butter: 'bg-[#F2E8BF]/80 border-[#E5D79B]/40 text-[#D3B96A]',
    lavender: 'bg-[#E6DFF0]/80 border-[#D1C3E2]/40 text-[#A08EC3]',
    parchment: 'bg-[#E8DFD1]/85 border-[#D5C7B2]/40 text-[#B8A68F]',
    rose: 'bg-[#D9AEB5]/75 border-[#C8949D]/40 text-[#BA7D87]',
  };

  return (
    <div
      style={{ transform: `rotate(${angle}deg)` }}
      className={`h-4.5 ${width} ${bgStyles[color]} shadow-[0_1px_3px_rgba(85,72,63,0.1)] backdrop-blur-[1px] relative inline-block z-10 ${className}`}
    >
      {/* Torn jagged edges on both sides */}
      <div className="absolute -left-1 top-0 bottom-0 w-1.5 flex flex-col justify-between overflow-hidden opacity-80 pointer-events-none">
        <svg viewBox="0 0 4 20" className="h-full w-full fill-current">
          <path d="M4,0 L0,3 L4,7 L0,11 L4,15 L0,18 L4,20 Z" />
        </svg>
      </div>
      <div className="absolute -right-1 top-0 bottom-0 w-1.5 flex flex-col justify-between overflow-hidden opacity-80 pointer-events-none">
        <svg viewBox="0 0 4 20" className="h-full w-full fill-current">
          <path d="M0,0 L4,3 L0,7 L4,11 L0,15 L4,18 L0,20 Z" />
        </svg>
      </div>
    </div>
  );
}

// Brass Paperclip Component
export function Paperclip({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-4 h-8 text-[#A89278] drop-shadow-[0_1px_2px_rgba(85,72,63,0.2)] ${className}`}
    >
      <path
        d="M8 12V38C8 42.4183 11.5817 46 16 46C20.4183 46 24 42.4183 24 38V6C24 3.79086 22.2091 2 20 2C17.7909 2 16 3.79086 16 6V36C16 38.2091 14.2091 40 12 40C9.79086 40 8 38.2091 8 36V12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Vintage Postmark Stamp Badge
export function PostmarkBadge({ dateText, city = 'MEMORIES' }: { dateText?: string; city?: string }) {
  return (
    <div className="relative inline-flex flex-col items-center justify-center p-2 rounded-full border-2 border-dashed border-[#D9AEB5] text-[#998A7F] text-[9px] uppercase tracking-widest font-mono select-none opacity-80 rotate-[-8deg] pointer-events-none">
      <div className="w-16 h-16 rounded-full border border-[#D9AEB5]/60 flex flex-col items-center justify-center text-center p-1">
        <span className="text-[8px] font-bold text-[#75665A]">{city}</span>
        <span className="text-[7px] text-[#998A7F] my-0.5">{dateText || 'AFTERGLOW'}</span>
        <span className="text-[8px] text-[#D9AEB5]">★ ★ ★</span>
      </div>
    </div>
  );
}

// Mood Badge with matching flower accent
export function MoodBadge({ mood, showDescription = false }: { mood: MoodType; showDescription?: boolean }) {
  const meta = MOODS[mood] || MOODS.peaceful;

  return (
    <div
      style={{
        backgroundColor: meta.bgColor,
        borderColor: meta.borderColor,
      }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium text-[#55483F] shadow-xs transition-colors"
    >
      <span className="text-sm leading-none">{meta.emoji}</span>
      <span className="font-sans font-medium">{meta.label}</span>
      <span className="text-[10px] text-[#998A7F] font-serif italic hidden sm:inline">({meta.flower})</span>
      {showDescription && (
        <span className="text-[11px] text-[#75665A] border-l border-[#55483F]/15 pl-2 ml-1">
          {meta.description}
        </span>
      )}
    </div>
  );
}

// Tiny Botanical Flowers and Sparkles SVG Icons
export function TinySparkle({ className = 'w-3.5 h-3.5 text-[#E5C370]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );
}

export function TinyFlower({ className = 'w-4 h-4 text-[#D9AEB5]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      {/* 5 rounded petals */}
      <circle cx="12" cy="7" r="4" opacity="0.9" />
      <circle cx="16.5" cy="10.5" r="4" opacity="0.9" />
      <circle cx="15" cy="16" r="4" opacity="0.9" />
      <circle cx="9" cy="16" r="4" opacity="0.9" />
      <circle cx="7.5" cy="10.5" r="4" opacity="0.9" />
      {/* Golden center */}
      <circle cx="12" cy="12" r="3" fill="#F2D379" />
    </svg>
  );
}

export function TinyHeart({ className = 'w-3.5 h-3.5 text-[#D9AEB5]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}
