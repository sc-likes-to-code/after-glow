import { Memory } from '@/types/memory';
import { SAMPLE_PHOTOS } from './samplePhotos';

// Compute dates relative to today
const now = new Date();
const todayStr = now.toISOString().split('T')[0];

const dMinus1 = new Date(now.getTime() - 86400000 * 1).toISOString().split('T')[0];
const dMinus3 = new Date(now.getTime() - 86400000 * 3).toISOString().split('T')[0];
const dMinus5 = new Date(now.getTime() - 86400000 * 5).toISOString().split('T')[0];
const dMinus12 = new Date(now.getTime() - 86400000 * 12).toISOString().split('T')[0];
const dMinus18 = new Date(now.getTime() - 86400000 * 18).toISOString().split('T')[0];

// An "On This Day" entry from exactly 1 year ago!
const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()).toISOString().split('T')[0];

export const INITIAL_SAMPLE_MEMORIES: Memory[] = [
  {
    id: 'sample-1',
    title: 'A quiet Sunday morning',
    journal:
      'The house was still breathing softly when I woke. Pouring hot coffee while the early slant of honeyed sunlight pooled across the kitchen table. Opened Mary Oliver at random and read three poems twice. There is such profound medicine in an unhurried morning.',
    photos: [
      {
        id: 'p-1',
        dataUrl: SAMPLE_PHOTOS.sundayMorningCoffee,
        caption: 'steam rising, sunlight pooling on old wood',
        aspectRatio: 'square',
      },
    ],
    date: todayStr,
    time: '08:45',
    mood: 'peaceful',
    location: 'Kitchen table window',
    collectionId: 'col-little-joys',
    tags: ['coffee', 'morning-sun', 'reading', 'quiet-hours'],
    isFavorite: true,
    isSample: true,
    handwrittenNote: 'warm cup, still heart',
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
    updatedAt: Date.now() - 1000 * 60 * 60 * 4,
  },
  {
    id: 'sample-2',
    title: 'An evening walk by the ridge',
    journal:
      'Stepped outside just as the sky turned into peach syrup and dusty lavender. A flock of swallows cut wide circles overhead. Even the crisp autumn breeze felt like a familiar friend whispering to slow down and notice.',
    photos: [
      {
        id: 'p-2',
        dataUrl: SAMPLE_PHOTOS.eveningWalkSunset,
        caption: 'the sky looked unusually beautiful tonight',
        aspectRatio: 'square',
      },
    ],
    date: dMinus1,
    time: '18:20',
    mood: 'grateful',
    location: 'Old mill road & ridge',
    collectionId: 'col-everyday',
    tags: ['evening-walk', 'sunset', 'sky-colors', 'breathe'],
    isFavorite: true,
    isSample: true,
    handwrittenNote: 'the sky did this just for us',
    createdAt: Date.now() - 86400000 * 1,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'sample-3',
    title: 'Little cafe discovery',
    journal:
      'Tucked down a brick alleyway behind the bookstore, found this sleepy little cafe with green pothos plants trailing down from high arched windows. The barista was playing acoustic guitar softly in the corner. Had a cardamom bun that dissolved like sweet cloud.',
    photos: [
      {
        id: 'p-3',
        dataUrl: SAMPLE_PHOTOS.cozyCafeDiscovery,
        caption: 'arched windows, green leaves, quiet corners',
        aspectRatio: 'square',
      },
    ],
    date: dMinus3,
    time: '15:10',
    mood: 'inspired',
    location: 'Cafe Botanica, alleyway',
    collectionId: 'col-food',
    tags: ['cafe', 'cinnamon', 'hidden-places', 'sketchbook'],
    isFavorite: false,
    isSample: true,
    handwrittenNote: 'my new secret sanctuary',
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'sample-4',
    title: 'Rainy day thoughts',
    journal:
      'A steady rhythm of rain drumming against the window pane since noon. Lit the hazelnut vanilla candle and brewed fresh chamomile tea. There is a special kind of coziness that only arrives when the world outside is gray and wet.',
    photos: [
      {
        id: 'p-4',
        dataUrl: SAMPLE_PHOTOS.rainyDayWindow,
        caption: 'raindrops racing down the glass',
        aspectRatio: 'square',
      },
    ],
    date: dMinus5,
    time: '16:40',
    mood: 'melancholic',
    location: 'Study windowsill',
    collectionId: 'col-everyday',
    tags: ['rain', 'candlelight', 'tea', 'reflection'],
    isFavorite: false,
    isSample: true,
    handwrittenNote: 'listening to the rain whisper',
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'sample-5',
    title: 'A sunny afternoon with friends',
    journal:
      'Spread out the red gingham blanket under the grand oak tree in the park. Maya brought homemade sourdough, Clara brought fresh strawberries, and we talked until our stomachs hurt from laughing. Someone took polaroids that caught our squinting smiles.',
    photos: [
      {
        id: 'p-5',
        dataUrl: SAMPLE_PHOTOS.friendsPicnicLaughter,
        caption: 'gingham blanket, strawberries, polaroid memories',
        aspectRatio: 'square',
      },
    ],
    date: dMinus12,
    time: '14:00',
    mood: 'loved',
    location: 'Botanical Garden Lawns',
    collectionId: 'col-people',
    tags: ['friends', 'picnic', 'laughter', 'polaroids'],
    isFavorite: true,
    isSample: true,
    handwrittenNote: 'these are the good old days',
    createdAt: Date.now() - 86400000 * 12,
    updatedAt: Date.now() - 86400000 * 12,
  },
  {
    id: 'sample-6',
    title: 'A spontaneous woodland adventure',
    journal:
      'Took an unmapped side trail off the main trail just to see where the creek went. Found an ancient mossy stone bridge covered in tiny ferns, and a patch of wild bluebells. Felt like stepping into a storybook illustration.',
    photos: [
      {
        id: 'p-6',
        dataUrl: SAMPLE_PHOTOS.botanicalSpontaneousTrail,
        caption: 'dappled light through the cedar canopy',
        aspectRatio: 'square',
      },
    ],
    date: dMinus18,
    time: '11:30',
    mood: 'adventurous',
    location: 'Old Pine Creek trail',
    collectionId: 'col-adventures',
    tags: ['woods', 'creek', 'ferns', 'wandering'],
    isFavorite: false,
    isSample: true,
    handwrittenNote: 'not all who wander are lost ♡',
    createdAt: Date.now() - 86400000 * 18,
    updatedAt: Date.now() - 86400000 * 18,
  },
  {
    id: 'sample-7',
    title: 'Sunset over the low tide',
    journal:
      'Walked barefoot along the wet sands at low tide. The entire sky and ocean became an endless mirror of rose gold and lilac. Collected three smooth flat stones and one perfect spiral seashell to keep on my desk.',
    photos: [
      {
        id: 'p-7',
        dataUrl: SAMPLE_PHOTOS.goldenSunsetBeach,
        caption: 'golden water mirror and sea foam ribbons',
        aspectRatio: 'square',
      },
    ],
    date: oneYearAgo,
    time: '17:50',
    mood: 'happy',
    location: 'Whispering Cove Beach',
    collectionId: 'col-places',
    tags: ['ocean', 'barefoot', 'seashells', 'golden-hour'],
    isFavorite: true,
    isSample: true,
    handwrittenNote: 'on this day, one year ago...',
    createdAt: now.getTime() - 86400000 * 365,
    updatedAt: now.getTime() - 86400000 * 365,
  },
];
