# AFTERGLOW 🌸

> *"Some moments are too beautiful to let them fade."*  
> Tagline: *a little place for the moments that matter.*

AFTERGLOW is a personal visual diary, photographic journal, and vintage scrapbook digital sanctuary. It merges the intimate warmth of a handwritten diary with the tactile nostalgia of a vintage scrapbook and the modern elegance of a Pinterest-style memory collection.

---

## 🎨 Creative Direction & Aesthetic Identity

- **Design Philosophy**: Cute but not childish, minimal but not empty, elegant but not corporate, nostalgic but not outdated.
- **Palette**: Warm Ivory (`#FAF7F0`), Soft Parchment (`#F4EFE6`), Blush Pink (`#EBCFD3`), Dusty Rose (`#D9AEB5`), Lavender (`#E6DFF0`), Sage Green (`#DCE5D7`), Butter Yellow (`#F2E8BF`), Warm Brown (`#75665A`), Primary Text (`#55483F`), and Secondary Text (`#998A7F`).
- **Typography**:
  - `Fraunces`: Expressive editorial serif headings and titles.
  - `Nunito Sans`: Clean, comforting body typography and navigation.
  - `Caveat`: Handwritten personal annotations, quotes, captions, and microcopy.
- **Scrapbook Motifs**: Washi tape strips with jagged edges, Polaroid photo borders with subtle organic tilt, vintage postmark stamps, brass paperclips, pressed botanical flower illustrations, and lined paper diary pages.

---

## ✨ Features & Experiences

1. **Home — Your Little Corner**
   - Time-of-day contextual greeting (*Good morning, sunshine ☀* / *Good evening, gentle soul ✨*).
   - Editorial date format with calming handwritten reminder (*"take a breath. you're doing just fine."*).
   - **Today's Moments**: Memories recorded today, or a sweet invitation to write on today's clean page.
   - **Recently Remembered**: Asymmetric Pinterest scrapbook grid with Polaroid tilts, washi tape, and paperclip accents.
   - **A Little While Ago**: Horizontal visual strip of older memories.
   - **This Month's Little Story**: Memory count, blooming mood flower, collection counts, and monthly photo collage.
   - **On This Day...**: Resurfaces memories from this calendar date across past years.
   - **A Gentle Reminder**: Interactive rotating comforting thoughts on click.

2. **Capture a Memory (The Heart of AFTERGLOW)**
   - Distraction-free diary page writing experience with Fraunces title and lined paper journal text area.
   - Multiple photo uploads with drag-and-drop, previews, and cover indicator.
   - 11 distinct mood cards (*Happy ☀, Peaceful 🌿, Excited ✨, Grateful ♡, Nostalgic 🌷, Loved 💗, Melancholic 🌧, Adventurous 🦋, Tired ☁, Inspired 🌼, Curious 🐚*).
   - Date, optional time, location, collection selector, tag pills, and handwritten scrapbook annotation.
   - *"Keep this memory ♡"* action with sparkling celebration confetti.

3. **My Timeline — A Life in Little Moments**
   - Immersive chronological timeline grouped by **Year → Month → Date** (newest first).
   - Toggle between **Scrapbook Masonry Grid** and **Chronological List View**.
   - Year jump pills, mood filter pills, collection filter, and tag filter pills.
   - Full-page detail modal with photo gallery lightbox, prev/next navigation, edit, and delete.

4. **Mood Garden — Your Emotions, Visualised**
   - Interactive botanical meadow where each recorded mood sprouts a blooming illustrated flower (*Sunflower, Lavender, Buttercup, Peony, Wild Tulip, Blush Rose, Forget-me-not, Morning Glory, Chamomile, Daisy, Bluebell*).
   - **Floral Mood Calendar**: Monthly calendar where recorded days blossom with flower markers.
   - **Flower Breakdown**: Frequency breakdown of moods and percentages.
   - Click any flower or mood to filter and browse corresponding memories.

5. **Collections — Little Worlds of Their Own**
   - 8 seeded default collections (*Little Joys, People I Love, Adventures, Food Diaries, Places & Travels, Everyday Magic, Milestones, Random Things*).
   - Create, edit, rename, change cover colors and icons.
   - Dedicated album view for browsing memories within any collection.

6. **Search — Find a Memory Again**
   - Global instant search across titles, journals, locations, tags, and collections.
   - Quick filters (*All matches, With Photographs, Favorites Only*).
   - Recent search query history and clickable theme pills.

7. **Settings & Sanctuary**
   - Custom display name, default mood, and botanical avatar seals.
   - **100% Private Local Storage**: Uses browser IndexedDB via Dexie.js. No cloud dependencies or external trackers.
   - Storage meter: Memory count, photo count, and estimated database size.
   - Export structured JSON backup with embedded photo data.
   - Import & restore backup file.
   - Clear sample memories or restore starter kit anytime.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router) & React 19
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4 with custom scrapbook themes and CSS utilities
- **Typography**: `next/font/google` (`Fraunces`, `Nunito_Sans`, `Caveat`)
- **State Management**: Zustand
- **Local Persistence**: Dexie.js (IndexedDB)
- **Icons**: Lucide React
- **Celebration Effects**: `canvas-confetti`

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
