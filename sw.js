/* MIKLAT GAMES portal — offline-first service worker.
   Caches the portal shell ONLY. Game scopes are bypassed —
   each game ships its own SW and owns its own cache. */
const CACHE = 'miklat-portal-v12';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './og.jpg',
  './assets/hero-bg.webp',
  './assets/irondome-cover.webp',
  './assets/balagan-cover.webp',
  './assets/fabatollah-cover.webp',
  './assets/shukshopper-cover.svg',
  './assets/miklatdigger-cover.svg',
  './assets/dome-arc.svg',
  './mamaddash/art/hero.webp',
  './mamaddash/art/icon.png',
  './whackamullah/cover.png'
];
const GAME_SCOPES = ['/irondome/', '/mamaddash/', '/shukshopper/', '/changinghistory/', '/whackamullah/'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const path = new URL(e.request.url).pathname;
  // hands off the games — their own SWs own those scopes
  // (one exception: the two mamaddash art files the portal itself shows)
  const isPortalAsset = ASSETS.some(a => a !== './' && path.endsWith(a.slice(1)));
  if (!isPortalAsset && GAME_SCOPES.some(s => path.startsWith(s))) return;
  const isNav = e.request.mode === 'navigate' || e.request.destination === 'document';
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fresh = fetch(e.request)
        .then(res => {
          if (res && res.ok && new URL(e.request.url).origin === location.origin) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
            return res;
          }
          return cached || res;
        })
        .catch(() => cached || Response.error());
      if (!isNav) return cached || fresh;
      if (!cached) return fresh;
      const hangGuard = new Promise(res => setTimeout(() => res(cached), 3000));
      return Promise.race([fresh.then(r => r || cached), hangGuard]);
    })
  );
});
