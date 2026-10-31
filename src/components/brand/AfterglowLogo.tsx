'use client';

import React from 'react';

export interface AfterglowLogoProps {
  variant?: 'full' | 'compact' | 'symbol' | 'badge';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  taglineText?: string;
  customWordmarkClass?: string;
}

export function AfterglowLogo({
  variant = 'compact',
  size = 'md',
  showTagline = true,
  className = '',
  taglineText = 'moments that matter ♡',
  customWordmarkClass = '',
}: AfterglowLogoProps) {
  // Dimension mapping for the symbol
  const symbolSizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const titleSizeMap = {
    xs: 'text-sm tracking-wider',
    sm: 'text-base tracking-wider',
    md: 'text-xl tracking-widest',
    lg: 'text-3xl tracking-widest',
    xl: 'text-4xl tracking-widest',
  };

  const taglineSizeMap = {
    xs: 'text-[10px]',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };

  // Pure SVG Keepsake Symbol (Tilted Polaroid with Daisy, Golden Sparkle, and Heart)
  const KeepsakeSymbol = (
    <div
      className={`relative shrink-0 select-none ${symbolSizeMap[size]} group-hover:rotate-6 transition-transform duration-300`}
    >
      <svg
        viewBox="0 0 512 512"
        className="w-full h-full drop-shadow-xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="symBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="50%" stopColor="#FAF5EC" />
            <stop offset="100%" stopColor="#F2EAE0" />
          </linearGradient>

          <linearGradient id="symPhotoSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E9E0F2" />
            <stop offset="42%" stopColor="#F5D7DC" />
            <stop offset="80%" stopColor="#FCEFD8" />
            <stop offset="100%" stopColor="#FDF4DE" />
          </linearGradient>

          <linearGradient id="symPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF7F8" />
          </linearGradient>

          <radialGradient id="symSunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFEAA7" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#F8D395" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F5D7DC" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="symCenterDisc" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7BA4A" />
            <stop offset="100%" stopColor="#E59929" />
          </linearGradient>

          <linearGradient id="symWashiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EBCFD3" stopOpacity="0.94" />
            <stop offset="50%" stopColor="#F5DFE3" stopOpacity="0.97" />
            <stop offset="100%" stopColor="#E5BEC3" stopOpacity="0.92" />
          </linearGradient>
        </defs>

        {/* Squircle Badge Outer Container */}
        <rect
          x="20"
          y="20"
          width="472"
          height="472"
          rx="108"
          fill="url(#symBg)"
          stroke="#E8DFD1"
          strokeWidth="6"
        />

        {/* Tilted Polaroid Snapshot */}
        <g transform="rotate(-3, 256, 260)">
          {/* Card Border */}
          <rect
            x="116"
            y="86"
            width="280"
            height="332"
            rx="14"
            fill="#FFFFFF"
            stroke="#EDE4D6"
            strokeWidth="3"
          />

          {/* Inner Photo Sky */}
          <rect x="136" y="106" width="240" height="230" rx="8" fill="url(#symPhotoSky)" />
          <circle cx="256" cy="188" r="92" fill="url(#symSunGlow)" />
          <path
            d="M 136 295 Q 190 270 250 285 Q 310 298 376 278 L 376 336 L 136 336 Z"
            fill="#E8D5CE"
            opacity="0.45"
          />

          {/* Stem & Leaves */}
          <path
            d="M 256 220 Q 254 265 248 300"
            stroke="#8A9E80"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M 253 260 Q 230 252 232 268 Q 246 270 251 264" fill="#9CB292" />
          <path d="M 251 245 Q 272 238 274 252 Q 260 256 252 249" fill="#9CB292" />

          {/* Petals */}
          <path
            d="M 256 156 C 248 156 244 184 256 194 C 268 184 264 156 256 156 Z"
            fill="url(#symPetalGrad)"
            stroke="#EBD2D7"
            strokeWidth="2"
          />
          <path
            d="M 298 188 C 298 180 270 179 262 194 C 272 204 298 196 298 188 Z"
            fill="url(#symPetalGrad)"
            stroke="#EBD2D7"
            strokeWidth="2"
          />
          <path
            d="M 282 230 C 288 224 267 205 259 199 C 254 211 274 235 282 230 Z"
            fill="url(#symPetalGrad)"
            stroke="#EBD2D7"
            strokeWidth="2"
          />
          <path
            d="M 230 230 C 224 224 245 205 253 199 C 258 211 238 235 230 230 Z"
            fill="url(#symPetalGrad)"
            stroke="#EBD2D7"
            strokeWidth="2"
          />
          <path
            d="M 214 188 C 214 180 242 179 250 194 C 240 204 214 196 214 188 Z"
            fill="url(#symPetalGrad)"
            stroke="#EBD2D7"
            strokeWidth="2"
          />

          {/* Center */}
          <circle cx="256" cy="194" r="14" fill="url(#symCenterDisc)" />
          <circle cx="256" cy="194" r="10" fill="#F9CA5A" />
          <circle cx="253" cy="192" r="2" fill="#B8781C" />
          <circle cx="259" cy="192" r="2" fill="#B8781C" />
          <circle cx="256" cy="196" r="2" fill="#B8781C" />

          {/* Sparkles */}
          <g transform="translate(330, 140)">
            <path
              d="M 0 -17 Q 0 0 17 0 Q 0 0 0 17 Q 0 0 -17 0 Q 0 0 0 -17 Z"
              fill="#F6BE46"
            />
            <circle cx="0" cy="0" r="3.2" fill="#FFF9EB" />
          </g>
          <g transform="translate(170, 172) scale(0.7)">
            <path
              d="M 0 -14 Q 0 0 14 0 Q 0 0 0 14 Q 0 0 -14 0 Q 0 0 0 -14 Z"
              fill="#D9AEB5"
            />
          </g>
          <circle cx="342" cy="222" r="3" fill="#F6BE46" opacity="0.85" />

          {/* Heart on chin */}
          <g transform="translate(256, 372)">
            <path
              d="M 0 -5 C -4 -11 -14 -8 -14 -1 C -14 6 0 14 0 14 C 0 14 14 6 14 -1 C 14 -8 4 -11 0 -5 Z"
              fill="#D9AEB5"
            />
            <path
              d="M -26 6 Q -16 10 -6 8 M 6 8 Q 16 10 26 6"
              stroke="#CBB4A7"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Washi Tape */}
          <g transform="translate(256, 86) rotate(3)">
            <rect x="-48" y="-12" width="96" height="22" rx="3" fill="url(#symWashiGrad)" />
          </g>
        </g>
      </svg>
    </div>
  );

  if (variant === 'symbol') {
    return <div className={`inline-flex items-center ${className}`}>{KeepsakeSymbol}</div>;
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        {KeepsakeSymbol}
        <span
          className={`font-heading font-bold text-[var(--ag-primary-text)] uppercase ${titleSizeMap[size]} ${customWordmarkClass}`}
        >
          Afterglow
        </span>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
        {KeepsakeSymbol}
        <div>
          <span
            className={`font-heading font-bold text-[var(--ag-primary-text)] uppercase block ${titleSizeMap[size]} ${customWordmarkClass}`}
          >
            Afterglow
          </span>
          {showTagline && (
            <p className={`font-caveat text-[var(--ag-muted-text)] mt-1 ${taglineSizeMap[size]}`}>
              {taglineText}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Default: 'compact'
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {KeepsakeSymbol}
      <div className="min-w-0">
        <span
          className={`font-heading font-bold text-[var(--ag-primary-text)] uppercase block truncate ${titleSizeMap[size]} ${customWordmarkClass}`}
        >
          Afterglow
        </span>
        {showTagline && (
          <span
            className={`font-caveat text-[var(--ag-muted-text)] block -mt-1 truncate ${taglineSizeMap[size]}`}
          >
            {taglineText}
          </span>
        )}
      </div>
    </div>
  );
}
