import React from 'react';
import { MoodType } from '@/types/memory';
import { MOODS } from '@/lib/constants';

interface FlowerProps {
  mood: MoodType;
  size?: number;
  className?: string;
  animate?: boolean;
}

export function FlowerIllustration({ mood, size = 64, className = '', animate = false }: FlowerProps) {
  const meta = MOODS[mood] || MOODS.peaceful;

  switch (mood) {
    case 'happy': // Sunflower
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`overflow-visible ${animate ? 'hover:scale-110 transition-transform duration-300' : ''} ${className}`}
        >
          {/* Stem & Leaves */}
          <path d="M50,55 Q50,75 52,98" stroke="#6C8A59" strokeWidth="4" fill="none" strokeLinecap="round" />
          <ellipse cx="60" cy="78" rx="8" ry="4" fill="#7C9C66" transform="rotate(-15 60 78)" />
          {/* Petals */}
          <g fill="#F5C744" stroke="#E6AE26" strokeWidth="0.8">
            <ellipse cx="50" cy="20" rx="6" ry="14" />
            <ellipse cx="50" cy="64" rx="6" ry="14" />
            <ellipse cx="28" cy="42" rx="14" ry="6" />
            <ellipse cx="72" cy="42" rx="14" ry="6" />
            <ellipse cx="35" cy="27" rx="7" ry="14" transform="rotate(-45 35 27)" />
            <ellipse cx="65" cy="27" rx="7" ry="14" transform="rotate(45 65 27)" />
            <ellipse cx="35" cy="57" rx="7" ry="14" transform="rotate(45 35 57)" />
            <ellipse cx="65" cy="57" rx="7" ry="14" transform="rotate(-45 65 57)" />
          </g>
          {/* Center disk with seed texture */}
          <circle cx="50" cy="42" r="14" fill="#5A3A1E" />
          <circle cx="50" cy="42" r="11" fill="#7A4E2B" />
          <circle cx="50" cy="42" r="6" fill="#432812" />
        </svg>
      );

    case 'peaceful': // Lavender
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`overflow-visible ${animate ? 'hover:scale-110 transition-transform duration-300' : ''} ${className}`}
        >
          {/* Stem */}
          <path d="M50,30 Q48,60 50,96" stroke="#688C64" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Narrow leaves */}
          <path d="M50,75 Q62,70 70,74 Q60,78 50,80" fill="#7A9E76" />
          <path d="M50,65 Q38,60 30,64 Q40,68 50,70" fill="#7A9E76" />
          {/* Lavender florets layered upwards */}
          <g fill="#A892C8">
            <ellipse cx="50" cy="18" rx="4" ry="7" />
            <ellipse cx="44" cy="25" rx="5" ry="4" />
            <ellipse cx="56" cy="25" rx="5" ry="4" />
            <ellipse cx="43" cy="32" rx="6" ry="5" fill="#957CB9" />
            <ellipse cx="57" cy="32" rx="6" ry="5" fill="#957CB9" />
            <ellipse cx="42" cy="40" rx="6" ry="5" fill="#B39DD4" />
            <ellipse cx="58" cy="40" rx="6" ry="5" fill="#B39DD4" />
            <ellipse cx="44" cy="48" rx="5" ry="4" fill="#A189C3" />
            <ellipse cx="56" cy="48" rx="5" ry="4" fill="#A189C3" />
            <ellipse cx="46" cy="55" rx="4" ry="3.5" fill="#B7A3D7" />
            <ellipse cx="54" cy="55" rx="4" ry="3.5" fill="#B7A3D7" />
          </g>
        </svg>
      );

    case 'loved': // Blush Rose
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`overflow-visible ${animate ? 'hover:scale-110 transition-transform duration-300' : ''} ${className}`}
        >
          {/* Stem & Leaves */}
          <path d="M50,56 Q48,76 50,98" stroke="#5F835A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <ellipse cx="38" cy="74" rx="9" ry="5" fill="#759B70" transform="rotate(-30 38 74)" />
          {/* Petal swirls */}
          <g fill="#EBA4B0" stroke="#D88A97" strokeWidth="1">
            <circle cx="50" cy="40" r="22" fill="#F4BAC3" />
            <path d="M36,36 C36,24 64,24 64,36 C64,52 36,52 36,36 Z" fill="#E896A4" />
            <path d="M42,32 C42,26 58,26 58,32 C58,42 42,42 42,32 Z" fill="#D87889" />
            <path d="M46,30 C46,26 54,26 54,30 C54,36 46,36 46,30 Z" fill="#BE5668" />
          </g>
        </svg>
      );

    case 'inspired': // Daisy
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`overflow-visible ${animate ? 'hover:scale-110 transition-transform duration-300' : ''} ${className}`}
        >
          {/* Stem & Leaves */}
          <path d="M50,52 Q52,74 50,98" stroke="#6B8D62" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <ellipse cx="62" cy="72" rx="8" ry="4" fill="#7E9F74" transform="rotate(25 62 72)" />
          {/* White / Cream Petals */}
          <g fill="#FFFDF8" stroke="#E8E1CE" strokeWidth="1">
            <ellipse cx="50" cy="22" rx="5" ry="13" />
            <ellipse cx="50" cy="62" rx="5" ry="13" />
            <ellipse cx="30" cy="42" rx="13" ry="5" />
            <ellipse cx="70" cy="42" rx="13" ry="5" />
            <ellipse cx="36" cy="28" rx="6" ry="13" transform="rotate(-45 36 28)" />
            <ellipse cx="64" cy="28" rx="6" ry="13" transform="rotate(45 64 28)" />
            <ellipse cx="36" cy="56" rx="6" ry="13" transform="rotate(45 36 56)" />
            <ellipse cx="64" cy="56" rx="6" ry="13" transform="rotate(-45 64 56)" />
          </g>
          {/* Golden Center */}
          <circle cx="50" cy="42" r="10" fill="#F7CA4F" />
          <circle cx="50" cy="42" r="7" fill="#E6B533" />
        </svg>
      );

    case 'grateful': // Peony
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`overflow-visible ${animate ? 'hover:scale-110 transition-transform duration-300' : ''} ${className}`}
        >
          <path d="M50,58 Q50,78 50,98" stroke="#60825B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <ellipse cx="62" cy="76" rx="8" ry="4" fill="#779972" transform="rotate(20 62 76)" />
          {/* Fluffy peony petals */}
          <circle cx="50" cy="38" r="23" fill="#FCE4E8" stroke="#EBA7B3" strokeWidth="0.8" />
          <circle cx="43" cy="34" r="14" fill="#F7CAD2" />
          <circle cx="57" cy="34" r="14" fill="#F7CAD2" />
          <circle cx="50" cy="44" r="13" fill="#F1B0BC" />
          <circle cx="50" cy="35" r="9" fill="#E88F9F" />
        </svg>
      );

    case 'nostalgic': // Wild Tulip
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`overflow-visible ${animate ? 'hover:scale-110 transition-transform duration-300' : ''} ${className}`}
        >
          <path d="M50,56 Q48,76 50,98" stroke="#6B8862" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M50,85 Q35,70 30,50 Q45,65 50,85" fill="#7B9972" />
          {/* Tulip Cup Petals */}
          <path d="M34,44 C32,24 45,20 48,38 C42,48 34,44 34,44 Z" fill="#E4A0A4" stroke="#CC8286" strokeWidth="0.8" />
          <path d="M66,44 C68,24 55,20 52,38 C58,48 66,44 66,44 Z" fill="#E4A0A4" stroke="#CC8286" strokeWidth="0.8" />
          <path d="M38,48 C42,56 58,56 62,48 C66,32 50,22 50,22 C50,22 34,32 38,48 Z" fill="#F0B5B9" stroke="#DB9196" strokeWidth="0.8" />
        </svg>
      );

    case 'excited': // Buttercup
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`overflow-visible ${animate ? 'hover:scale-110 transition-transform duration-300' : ''} ${className}`}
        >
          <path d="M50,52 Q52,74 50,98" stroke="#6C8D60" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* 5 Glossy petals */}
          <g fill="#FFAE42" stroke="#E59424" strokeWidth="1">
            <circle cx="50" cy="27" r="11" />
            <circle cx="63" cy="37" r="11" />
            <circle cx="58" cy="51" r="11" />
            <circle cx="42" cy="51" r="11" />
            <circle cx="37" cy="37" r="11" />
          </g>
          <circle cx="50" cy="40" r="7" fill="#885215" />
          <circle cx="50" cy="40" r="4" fill="#FFC966" />
        </svg>
      );

    case 'melancholic': // Forget-me-not
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`overflow-visible ${animate ? 'hover:scale-110 transition-transform duration-300' : ''} ${className}`}
        >
          <path d="M50,52 Q48,74 50,98" stroke="#657E7E" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* 5 gentle sky-blue petals */}
          <g fill="#8EAFD1" stroke="#7193B6" strokeWidth="0.8">
            <circle cx="50" cy="27" r="9" />
            <circle cx="62" cy="36" r="9" />
            <circle cx="57" cy="49" r="9" />
            <circle cx="43" cy="49" r="9" />
            <circle cx="38" cy="36" r="9" />
          </g>
          {/* Yellow eye */}
          <circle cx="50" cy="39" r="5" fill="#F7DE74" />
          <circle cx="50" cy="39" r="2" fill="#FFF5BD" />
        </svg>
      );

    case 'adventurous': // Morning Glory
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`overflow-visible ${animate ? 'hover:scale-110 transition-transform duration-300' : ''} ${className}`}
        >
          {/* Twisting vine stem */}
          <path d="M50,56 Q40,75 55,88 Q62,94 50,100" stroke="#5F8858" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="38" cy="74" rx="7" ry="4" fill="#759E6D" transform="rotate(-25 38 74)" />
          {/* Funnel bloom */}
          <polygon points="50,56 30,30 70,30" fill="#90BFE3" />
          <ellipse cx="50" cy="30" rx="22" ry="10" fill="#78A8D1" stroke="#5C8EB8" strokeWidth="1" />
          <ellipse cx="50" cy="30" rx="13" ry="6" fill="#FBF6DE" />
          <circle cx="50" cy="30" r="3" fill="#D67586" />
        </svg>
      );

    case 'tired': // Chamomile
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`overflow-visible ${animate ? 'hover:scale-110 transition-transform duration-300' : ''} ${className}`}
        >
          <path d="M50,54 Q48,74 50,98" stroke="#7E8F7A" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Drooping relaxed petals */}
          <g fill="#F5F1E9" stroke="#DBD4C7" strokeWidth="0.8">
            <ellipse cx="34" cy="44" rx="10" ry="4" transform="rotate(-20 34 44)" />
            <ellipse cx="66" cy="44" rx="10" ry="4" transform="rotate(20 66 44)" />
            <ellipse cx="38" cy="54" rx="10" ry="4" transform="rotate(25 38 54)" />
            <ellipse cx="62" cy="54" rx="10" ry="4" transform="rotate(-25 62 54)" />
            <ellipse cx="50" cy="58" rx="4" ry="10" />
            <ellipse cx="50" cy="30" rx="4" ry="8" />
          </g>
          {/* Domed yellow-brown center */}
          <ellipse cx="50" cy="40" rx="12" ry="9" fill="#D4B662" />
          <ellipse cx="50" cy="38" rx="8" ry="6" fill="#F0D47C" />
        </svg>
      );

    case 'curious': // Bluebell
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`overflow-visible ${animate ? 'hover:scale-110 transition-transform duration-300' : ''} ${className}`}
        >
          {/* Arching stem */}
          <path d="M50,98 Q48,60 62,35 Q68,20 60,15" stroke="#688A6E" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Hanging bells */}
          <g fill="#9FA8DA" stroke="#8791C9" strokeWidth="0.8">
            {/* Bell 1 */}
            <path d="M58,22 Q50,28 42,32 Q38,38 44,42 Q52,38 58,28 Z" fill="#9FA8DA" />
            {/* Bell 2 */}
            <path d="M54,40 Q46,46 38,50 Q34,56 40,60 Q48,56 54,46 Z" fill="#8C96CC" />
            {/* Bell 3 */}
            <path d="M50,58 Q44,64 36,68 Q34,72 38,76 Q44,72 50,64 Z" fill="#A4ADDD" />
          </g>
        </svg>
      );
  }
}
