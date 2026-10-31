// AFTERGLOW Service Worker — Resilient Offline Shell & Asset Cache
const CACHE_NAME = 'afterglow-cache-v1.0.1';

// Core Application Shell and Essential Static Assets
const PRECACHE_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-192.png',
  '/icons/icon-maskable-512.png',
  '/icons/apple-touch-icon.png',
  '/assets/brand/afterglow-icon.svg',
  '/assets/brand/afterglow-logo-compact.svg',
  '/assets/brand/afterglow-logo-full.svg'
];

// 1. Install Event: Pre-cache app shell
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use addAll with individual catch to ensure install succeeds even if one asset is missing
      return Promise.allSettled(
        PRECACHE_ASSETS.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`[SW] Pre-cache warning for ${url}:`, err);
          })
        )
      );
    })
  );
});

// 2. Activate Event: Clean up previous cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log(`[SW] Purging outdated cache: ${name}`);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Strategy:
// - Navigation requests (HTML pages): Network-first with Cache fallback (ensures fresh app on deploy, works offline)
// - Static build assets (_next/static, icons, fonts, brand): Cache-first with network background fetch
// - Images / external APIs: Network-first or Stale-While-Revalidate
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Ignore browser extensions and non-HTTP(S) schemes
  if (!url.protocol.startsWith('http')) return;

  // Ignore dynamic chrome-extension or external telemetry
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.gstatic.com') && !url.hostname.includes('fonts.googleapis.com')) {
    return;
  }

  // 3a. Navigation Requests (HTML document) -> Network First, Fallback to Cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          // If offline, serve cached root or fallback
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;
          return caches.match('/');
        })
    );
    return;
  }

  // 3b. Immutable static Next.js assets, icons, fonts -> Cache First
  const isStaticAsset =
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.ico');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Return empty or fallback if unavailable
            return new Response('', { status: 408, statusText: 'Request timed out' });
          });
      })
    );
    return;
  }

  // 3c. Default Stale-While-Revalidate for other local requests
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

// 4. Message Event: Skip waiting on update request
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
