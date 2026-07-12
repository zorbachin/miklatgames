/* PORTAL PALS — offline-first service worker (owns its own scope) */
const CACHE = 'portalpals-v1';
const PREFIX = 'portalpals-'; /* only touch our own caches — CacheStorage is origin-wide */
const ASSETS = ['./','./index.html','./manifest.webmanifest',
  './assets/bg_lot.jpg','./assets/cover.jpg','./assets/icon.png',
  './assets/max_idle.png','./assets/max_run.png','./assets/max_jump.png','./assets/max_act.png','./assets/max_hit.png','./assets/max_win.png',
  './assets/scut_o_run.png','./assets/scut_o_alert.png','./assets/scut_c_hop.png','./assets/scut_c_alert.png','./assets/scut_sit.png',
  './assets/portal_0.png','./assets/portal_1.png','./assets/portal_2.png','./assets/portal_3.png',
  './assets/pk_heart.png','./assets/pk_gem.png','./assets/pk_orb.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return;
  const isNav = e.request.mode === 'navigate' || e.request.destination === 'document';
  e.respondWith(caches.match(e.request).then(cached => {
    const fresh = fetch(e.request).then(res => {
      if (res && res.ok) { const clone = res.clone(); caches.open(CACHE).then(c => c.put(e.request, clone)); return res; }
      return cached || res;
    }).catch(() => cached || Response.error());
    if (!isNav) return cached || fresh;
    if (!cached) return fresh;
    const hangGuard = new Promise(res => setTimeout(() => res(cached), 3000));
    return Promise.race([fresh.then(r => r || cached), hangGuard]);
  }));
});
