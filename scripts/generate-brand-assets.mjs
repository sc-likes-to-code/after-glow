import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const rootDir = process.cwd();
const iconsDir = path.join(rootDir, 'public', 'icons');
const brandDir = path.join(rootDir, 'public', 'assets', 'brand');
const publicDir = path.join(rootDir, 'public');

fs.mkdirSync(iconsDir, { recursive: true });
fs.mkdirSync(brandDir, { recursive: true });

// 1. Standalone Keepsake Icon SVG (Square 512x512)
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background rounded square gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="50%" stop-color="#FAF5EC" />
      <stop offset="100%" stop-color="#F2EAE0" />
    </linearGradient>

    <!-- Polaroid inner photo sky gradient -->
    <linearGradient id="photoSky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E9E0F2" />
      <stop offset="42%" stop-color="#F5D7DC" />
      <stop offset="80%" stop-color="#FCEFD8" />
      <stop offset="100%" stop-color="#FDF4DE" />
    </linearGradient>

    <!-- Flower petal gradient -->
    <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#FFF7F8" />
    </linearGradient>

    <!-- Golden sun / glow -->
    <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFEAA7" stop-opacity="0.85" />
      <stop offset="60%" stop-color="#F8D395" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#F5D7DC" stop-opacity="0" />
    </radialGradient>

    <!-- Center flower disc gradient -->
    <linearGradient id="centerDisc" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7BA4A" />
      <stop offset="100%" stop-color="#E59929" />
    </linearGradient>

    <!-- Washi tape gradient -->
    <linearGradient id="washiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EBCFD3" stop-opacity="0.94" />
      <stop offset="50%" stop-color="#F5DFE3" stop-opacity="0.97" />
      <stop offset="100%" stop-color="#E5BEC3" stop-opacity="0.92" />
    </linearGradient>

    <!-- Drop shadow for polaroid -->
    <filter id="cardShadow" x="-15%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#55483F" flood-opacity="0.14" />
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#55483F" flood-opacity="0.08" />
    </filter>
  </defs>

  <!-- Base container: Squircle badge -->
  <rect x="18" y="18" width="476" height="476" rx="108" fill="url(#bgGrad)" stroke="#E8DFD1" stroke-width="4" />

  <!-- Subtle corner sparkles on the badge -->
  <path d="M 76 80 Q 76 90 86 90 Q 76 90 76 100 Q 76 90 66 90 Q 76 90 76 80 Z" fill="#D9AEB5" opacity="0.65" />
  <path d="M 436 424 Q 436 432 444 432 Q 436 432 436 440 Q 436 432 428 432 Q 436 432 436 424 Z" fill="#E6A740" opacity="0.55" />

  <!-- Polaroid Card (slightly tilted -2.5 deg) -->
  <g transform="rotate(-2.5, 256, 260)" filter="url(#cardShadow)">
    <!-- White Polaroid Border -->
    <rect x="116" y="86" width="280" height="332" rx="14" fill="#FFFFFF" stroke="#EDE4D6" stroke-width="2" />

    <!-- Inner Photo Area -->
    <rect x="136" y="106" width="240" height="230" rx="8" fill="url(#photoSky)" />

    <!-- Soft Golden Glow in Photo -->
    <circle cx="256" cy="188" r="92" fill="url(#sunGlow)" />

    <!-- Gentle distant mountain/hill silhouette -->
    <path d="M 136 295 Q 190 270 250 285 Q 310 298 376 278 L 376 336 L 136 336 Z" fill="#E8D5CE" opacity="0.45" />

    <!-- Botanical Stem -->
    <path d="M 256 220 Q 254 265 248 300" stroke="#8A9E80" stroke-width="4.5" stroke-linecap="round" fill="none" />
    <!-- Small Leaf Left -->
    <path d="M 253 260 Q 230 252 232 268 Q 246 270 251 264" fill="#9CB292" />
    <!-- Small Leaf Right -->
    <path d="M 251 245 Q 272 238 274 252 Q 260 256 252 249" fill="#9CB292" />

    <!-- Daisy Petals (5 petals) -->
    <!-- Top -->
    <path d="M 256 156 C 248 156 244 184 256 194 C 268 184 264 156 256 156 Z" fill="url(#petalGrad)" stroke="#EBD2D7" stroke-width="1.6" />
    <!-- Right -->
    <path d="M 298 188 C 298 180 270 179 262 194 C 272 204 298 196 298 188 Z" fill="url(#petalGrad)" stroke="#EBD2D7" stroke-width="1.6" />
    <!-- Bottom-Right -->
    <path d="M 282 230 C 288 224 267 205 259 199 C 254 211 274 235 282 230 Z" fill="url(#petalGrad)" stroke="#EBD2D7" stroke-width="1.6" />
    <!-- Bottom-Left -->
    <path d="M 230 230 C 224 224 245 205 253 199 C 258 211 238 235 230 230 Z" fill="url(#petalGrad)" stroke="#EBD2D7" stroke-width="1.6" />
    <!-- Left -->
    <path d="M 214 188 C 214 180 242 179 250 194 C 240 204 214 196 214 188 Z" fill="url(#petalGrad)" stroke="#EBD2D7" stroke-width="1.6" />

    <!-- Flower Center Disc -->
    <circle cx="256" cy="194" r="14" fill="url(#centerDisc)" />
    <circle cx="256" cy="194" r="10" fill="#F9CA5A" />
    <!-- Center dots -->
    <circle cx="253" cy="192" r="1.5" fill="#B8781C" />
    <circle cx="259" cy="192" r="1.5" fill="#B8781C" />
    <circle cx="256" cy="196" r="1.5" fill="#B8781C" />

    <!-- Golden Celestial Sparkles -->
    <!-- Big 4-point Sparkle (Top-Right) -->
    <g transform="translate(330, 140)">
      <path d="M 0 -17 Q 0 0 17 0 Q 0 0 0 17 Q 0 0 -17 0 Q 0 0 0 -17 Z" fill="#F6BE46" />
      <circle cx="0" cy="0" r="3.2" fill="#FFF9EB" />
    </g>
    <!-- Little Sparkle (Left) -->
    <g transform="translate(170, 172) scale(0.68)">
      <path d="M 0 -14 Q 0 0 14 0 Q 0 0 0 14 Q 0 0 -14 0 Q 0 0 0 -14 Z" fill="#D9AEB5" />
      <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
    </g>
    <!-- Twinkle Dots -->
    <circle cx="342" cy="222" r="2.5" fill="#F6BE46" opacity="0.85" />
    <circle cx="164" cy="130" r="2.2" fill="#E8B8C0" opacity="0.75" />

    <!-- Polaroid Bottom Margin: Soft Dusty Rose Heart -->
    <g transform="translate(256, 372)">
      <path d="M 0 -5 C -4 -11 -14 -8 -14 -1 C -14 6 0 14 0 14 C 0 14 14 6 14 -1 C 14 -8 4 -11 0 -5 Z" fill="#D9AEB5" />
      <!-- Handwritten gentle underline -->
      <path d="M -26 6 Q -16 10 -6 8 M 6 8 Q 16 10 26 6" stroke="#CBB4A7" stroke-width="1.8" stroke-linecap="round" fill="none" />
    </g>

    <!-- Washi Tape at Top (tilted 3 deg) -->
    <g transform="translate(256, 86) rotate(3)">
      <rect x="-48" y="-12" width="96" height="22" rx="3" fill="url(#washiGrad)" />
      <path d="M -48 -12 l 3 4 l -3 4 l 3 4 l -3 4 l 3 3 l -3 3" stroke="#D9AEB5" stroke-width="1" fill="none" opacity="0.6" />
      <path d="M 48 -12 l -3 4 l 3 4 l -3 4 l 3 4 l -3 3 l 3 3" stroke="#D9AEB5" stroke-width="1" fill="none" opacity="0.6" />
    </g>
  </g>
</svg>`;

// 2. Maskable Icon SVG (Scaled and centered for 80% safe zone diameter = 409px)
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Full-bleed background for maskable icon -->
    <linearGradient id="mBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF9" />
      <stop offset="50%" stop-color="#FAF5EC" />
      <stop offset="100%" stop-color="#F2EAE0" />
    </linearGradient>

    <linearGradient id="mPhotoSky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E9E0F2" />
      <stop offset="42%" stop-color="#F5D7DC" />
      <stop offset="80%" stop-color="#FCEFD8" />
      <stop offset="100%" stop-color="#FDF4DE" />
    </linearGradient>

    <linearGradient id="mPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#FFF7F8" />
    </linearGradient>

    <radialGradient id="mSunGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFEAA7" stop-opacity="0.85" />
      <stop offset="60%" stop-color="#F8D395" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#F5D7DC" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="mCenterDisc" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F7BA4A" />
      <stop offset="100%" stop-color="#E59929" />
    </linearGradient>

    <linearGradient id="mWashiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EBCFD3" stop-opacity="0.95" />
      <stop offset="50%" stop-color="#F5DFE3" />
      <stop offset="100%" stop-color="#E5BEC3" stop-opacity="0.95" />
    </linearGradient>

    <filter id="mCardShadow" x="-15%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#55483F" flood-opacity="0.16" />
    </filter>
  </defs>

  <!-- Full-bleed background -->
  <rect x="0" y="0" width="512" height="512" fill="url(#mBg)" />

  <!-- Safe zone scaled graphic (scale 0.76, centered at 256, 256) -->
  <g transform="translate(61.4, 61.4) scale(0.76)">
    <!-- Subtle corner sparkles -->
    <path d="M 76 80 Q 76 90 86 90 Q 76 90 76 100 Q 76 90 66 90 Q 76 90 76 80 Z" fill="#D9AEB5" opacity="0.65" />
    <path d="M 436 424 Q 436 432 444 432 Q 436 432 436 440 Q 436 432 428 432 Q 436 432 436 424 Z" fill="#E6A740" opacity="0.55" />

    <!-- Polaroid Card -->
    <g transform="rotate(-2.5, 256, 260)" filter="url(#mCardShadow)">
      <rect x="116" y="86" width="280" height="332" rx="14" fill="#FFFFFF" stroke="#EDE4D6" stroke-width="2" />
      <rect x="136" y="106" width="240" height="230" rx="8" fill="url(#mPhotoSky)" />
      <circle cx="256" cy="188" r="92" fill="url(#mSunGlow)" />
      <path d="M 136 295 Q 190 270 250 285 Q 310 298 376 278 L 376 336 L 136 336 Z" fill="#E8D5CE" opacity="0.45" />

      <!-- Botanical Daisy -->
      <path d="M 256 220 Q 254 265 248 300" stroke="#8A9E80" stroke-width="4.5" stroke-linecap="round" fill="none" />
      <path d="M 253 260 Q 230 252 232 268 Q 246 270 251 264" fill="#9CB292" />
      <path d="M 251 245 Q 272 238 274 252 Q 260 256 252 249" fill="#9CB292" />

      <path d="M 256 156 C 248 156 244 184 256 194 C 268 184 264 156 256 156 Z" fill="url(#mPetalGrad)" stroke="#EBD2D7" stroke-width="1.6" />
      <path d="M 298 188 C 298 180 270 179 262 194 C 272 204 298 196 298 188 Z" fill="url(#mPetalGrad)" stroke="#EBD2D7" stroke-width="1.6" />
      <path d="M 282 230 C 288 224 267 205 259 199 C 254 211 274 235 282 230 Z" fill="url(#mPetalGrad)" stroke="#EBD2D7" stroke-width="1.6" />
      <path d="M 230 230 C 224 224 245 205 253 199 C 258 211 238 235 230 230 Z" fill="url(#mPetalGrad)" stroke="#EBD2D7" stroke-width="1.6" />
      <path d="M 214 188 C 214 180 242 179 250 194 C 240 204 214 196 214 188 Z" fill="url(#mPetalGrad)" stroke="#EBD2D7" stroke-width="1.6" />

      <circle cx="256" cy="194" r="14" fill="url(#mCenterDisc)" />
      <circle cx="256" cy="194" r="10" fill="#F9CA5A" />
      <circle cx="253" cy="192" r="1.5" fill="#B8781C" />
      <circle cx="259" cy="192" r="1.5" fill="#B8781C" />
      <circle cx="256" cy="196" r="1.5" fill="#B8781C" />

      <!-- Sparkles -->
      <g transform="translate(330, 140)">
        <path d="M 0 -17 Q 0 0 17 0 Q 0 0 0 17 Q 0 0 -17 0 Q 0 0 0 -17 Z" fill="#F6BE46" />
        <circle cx="0" cy="0" r="3.2" fill="#FFF9EB" />
      </g>
      <g transform="translate(170, 172) scale(0.68)">
        <path d="M 0 -14 Q 0 0 14 0 Q 0 0 0 14 Q 0 0 -14 0 Q 0 0 0 -14 Z" fill="#D9AEB5" />
        <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
      </g>

      <!-- Heart chin detail -->
      <g transform="translate(256, 372)">
        <path d="M 0 -5 C -4 -11 -14 -8 -14 -1 C -14 6 0 14 0 14 C 0 14 14 6 14 -1 C 14 -8 4 -11 0 -5 Z" fill="#D9AEB5" />
        <path d="M -26 6 Q -16 10 -6 8 M 6 8 Q 16 10 26 6" stroke="#CBB4A7" stroke-width="1.8" stroke-linecap="round" fill="none" />
      </g>

      <!-- Washi Tape -->
      <g transform="translate(256, 86) rotate(3)">
        <rect x="-48" y="-12" width="96" height="22" rx="3" fill="url(#mWashiGrad)" />
      </g>
    </g>
  </g>
</svg>`;

// 3. Compact Brand Logo SVG (Horizontal for Sidebar / Top Header)
const logoCompactSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" width="280" height="64">
  <defs>
    <linearGradient id="cSky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E9E0F2" />
      <stop offset="50%" stop-color="#F5D7DC" />
      <stop offset="100%" stop-color="#FAF1D2" />
    </linearGradient>
    <filter id="cShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#55483F" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- Left Keepsake Icon (48x48) -->
  <g transform="translate(4, 8)">
    <g transform="rotate(-3, 24, 24)" filter="url(#cShadow)">
      <!-- Polaroid miniature frame -->
      <rect x="2" y="2" width="44" height="46" rx="4" fill="#FFFFFF" stroke="#E8DFD1" stroke-width="1.2" />
      <!-- Photo area -->
      <rect x="5" y="5" width="38" height="32" rx="2" fill="url(#cSky)" />
      <!-- Tiny Daisy -->
      <circle cx="24" cy="20" r="12" fill="#FFEAA7" opacity="0.4" />
      <circle cx="24" cy="20" r="4" fill="#F7BA4A" />
      <circle cx="24" cy="13" r="2.8" fill="#FFFFFF" />
      <circle cx="31" cy="20" r="2.8" fill="#FFFFFF" />
      <circle cx="24" cy="27" r="2.8" fill="#FFFFFF" />
      <circle cx="17" cy="20" r="2.8" fill="#FFFFFF" />
      <!-- Sparkle -->
      <path d="M 36 10 Q 36 13 39 13 Q 36 13 36 16 Q 36 13 33 13 Q 36 13 36 10 Z" fill="#F6BE46" />
      <!-- Heart on chin -->
      <path d="M 24 43 C 22.5 41 18.5 42 18.5 44 C 18.5 46 24 48 24 48 C 24 48 29.5 46 29.5 44 C 29.5 42 25.5 41 24 43 Z" fill="#D9AEB5" />
    </g>
  </g>

  <!-- Right Typography Wordmark -->
  <text x="64" y="34" font-family="'Fraunces', Georgia, serif" font-size="22" font-weight="700" letter-spacing="1.5" fill="#55483F">AFTERGLOW</text>
  <text x="65" y="49" font-family="'Caveat', cursive" font-size="13" font-weight="500" fill="#998A7F" letter-spacing="0.2">moments that matter ♡</text>
</svg>`;

// 4. Full Logo SVG (Editorial presentation)
const logoFullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 120" width="540" height="120">
  <defs>
    <linearGradient id="fSky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E9E0F2" />
      <stop offset="50%" stop-color="#F5D7DC" />
      <stop offset="100%" stop-color="#FAF1D2" />
    </linearGradient>
    <filter id="fShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#55483F" flood-opacity="0.12" />
    </filter>
  </defs>

  <!-- Keepsake Icon (72x72) -->
  <g transform="translate(16, 16)">
    <g transform="rotate(-3, 44, 44)" filter="url(#fShadow)">
      <rect x="6" y="4" width="76" height="82" rx="6" fill="#FFFFFF" stroke="#E8DFD1" stroke-width="1.8" />
      <rect x="12" y="10" width="64" height="58" rx="4" fill="url(#fSky)" />
      <!-- Glow & Daisy -->
      <circle cx="44" cy="38" r="22" fill="#FFEAA7" opacity="0.4" />
      <path d="M 44 43 Q 43 56 42 66" stroke="#8A9E80" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <!-- Petals -->
      <circle cx="44" cy="30" r="5" fill="#FFFFFF" stroke="#EBD2D7" stroke-width="1" />
      <circle cx="52" cy="38" r="5" fill="#FFFFFF" stroke="#EBD2D7" stroke-width="1" />
      <circle cx="44" cy="46" r="5" fill="#FFFFFF" stroke="#EBD2D7" stroke-width="1" />
      <circle cx="36" cy="38" r="5" fill="#FFFFFF" stroke="#EBD2D7" stroke-width="1" />
      <circle cx="44" cy="38" r="6" fill="#F7BA4A" />
      <!-- Sparkle -->
      <path d="M 64 22 Q 64 27 69 27 Q 64 27 64 32 Q 64 27 59 27 Q 64 27 64 22 Z" fill="#F6BE46" />
      <path d="M 44 76 C 42 73 37 74 37 77 C 37 80 44 83 44 83 C 44 83 51 80 51 77 C 51 74 46 73 44 76 Z" fill="#D9AEB5" />
    </g>
  </g>

  <!-- Typography -->
  <text x="118" y="58" font-family="'Fraunces', Georgia, serif" font-size="36" font-weight="700" letter-spacing="3" fill="#55483F">AFTERGLOW</text>
  <text x="120" y="86" font-family="'Caveat', cursive" font-size="21" font-weight="500" fill="#998A7F" letter-spacing="0.5">a little place for the moments that matter ♡</text>
</svg>`;

// 5. Clean Favicon SVG (32x32 optimized)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <linearGradient id="favSky" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EBCFD3" />
      <stop offset="100%" stop-color="#F2E8BF" />
    </linearGradient>
  </defs>
  <!-- Rounded badge background -->
  <rect x="1" y="1" width="30" height="30" rx="8" fill="#FAF7F0" stroke="#E8DFD1" stroke-width="1" />
  <!-- Mini Polaroid frame -->
  <g transform="rotate(-2, 16, 16)">
    <rect x="5" y="4" width="22" height="24" rx="2" fill="#FFFFFF" />
    <rect x="7" y="6" width="18" height="15" rx="1.5" fill="url(#favSky)" />
    <!-- Daisy & Sparkle -->
    <circle cx="16" cy="13.5" r="3.2" fill="#F6BA46" />
    <circle cx="16" cy="9.5" r="2" fill="#FFFFFF" />
    <circle cx="20" cy="13.5" r="2" fill="#FFFFFF" />
    <circle cx="16" cy="17.5" r="2" fill="#FFFFFF" />
    <circle cx="12" cy="13.5" r="2" fill="#FFFFFF" />
    <circle cx="22" cy="8.5" r="1.2" fill="#F6BE46" />
    <!-- Heart on chin -->
    <circle cx="16" cy="24.5" r="1" fill="#D9AEB5" />
  </g>
</svg>`;

// Write SVGs
fs.writeFileSync(path.join(brandDir, 'afterglow-icon.svg'), iconSvg, 'utf8');
fs.writeFileSync(path.join(brandDir, 'afterglow-icon-maskable.svg'), maskableSvg, 'utf8');
fs.writeFileSync(path.join(brandDir, 'afterglow-logo-compact.svg'), logoCompactSvg, 'utf8');
fs.writeFileSync(path.join(brandDir, 'afterglow-logo-full.svg'), logoFullSvg, 'utf8');
fs.writeFileSync(path.join(iconsDir, 'afterglow-icon.svg'), iconSvg, 'utf8');
fs.writeFileSync(path.join(iconsDir, 'afterglow-icon-maskable.svg'), maskableSvg, 'utf8');
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg, 'utf8');

console.log('✓ Master SVG brand assets written.');

// Generate high-resolution and standard PNGs using sharp
async function generatePngs() {
  const iconBuffer = Buffer.from(iconSvg);
  const maskableBuffer = Buffer.from(maskableSvg);

  // 192x192 & 512x512 standard PWA icons
  await sharp(iconBuffer).resize(192, 192).png().toFile(path.join(iconsDir, 'icon-192.png'));
  await sharp(iconBuffer).resize(512, 512).png().toFile(path.join(iconsDir, 'icon-512.png'));

  // 192x192 & 512x512 maskable PWA icons
  await sharp(maskableBuffer).resize(192, 192).png().toFile(path.join(iconsDir, 'icon-maskable-192.png'));
  await sharp(maskableBuffer).resize(512, 512).png().toFile(path.join(iconsDir, 'icon-maskable-512.png'));

  // Apple touch icon (180x180)
  await sharp(iconBuffer).resize(180, 180).png().toFile(path.join(iconsDir, 'apple-touch-icon.png'));

  // Favicons
  await sharp(iconBuffer).resize(16, 16).png().toFile(path.join(iconsDir, 'favicon-16x16.png'));
  await sharp(iconBuffer).resize(32, 32).png().toFile(path.join(iconsDir, 'favicon-32x32.png'));
  await sharp(iconBuffer).resize(48, 48).png().toFile(path.join(iconsDir, 'favicon-48x48.png'));

  // Also write 32x32 and 48x48 directly to public for root accessibility
  await sharp(iconBuffer).resize(32, 32).png().toFile(path.join(publicDir, 'favicon.png'));
  await sharp(iconBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // Generate ICO (A valid PNG wrapped as ICO)
  const ico32Buffer = await sharp(iconBuffer).resize(32, 32).png().toBuffer();
  // Simple valid ICO header containing a single 32x32 PNG entry
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved (0)
  icoHeader.writeUInt16LE(1, 2); // Type 1 (ICO)
  icoHeader.writeUInt16LE(1, 4); // Number of images (1)

  const icoEntry = Buffer.alloc(16);
  icoEntry.writeUInt8(32, 0); // Width 32
  icoEntry.writeUInt8(32, 1); // Height 32
  icoEntry.writeUInt8(0, 2);  // Colors in palette
  icoEntry.writeUInt8(0, 3);  // Reserved
  icoEntry.writeUInt16LE(1, 4); // Color planes
  icoEntry.writeUInt16LE(32, 6); // Bits per pixel
  icoEntry.writeUInt32LE(ico32Buffer.length, 8); // Image size in bytes
  icoEntry.writeUInt32LE(6 + 16, 12); // Offset to image data (22)

  const icoFile = Buffer.concat([icoHeader, icoEntry, ico32Buffer]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoFile);

  console.log('✓ All PNG and ICO assets successfully generated with sharp.');
}

generatePngs().catch((err) => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
