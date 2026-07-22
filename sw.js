const CACHE_NAME = 'papilab-contato-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './papijunior-logo.png',
  './logoPorta192.png',
  './logoPorta512.png',
  './qrcode-cartao-digital.png',
  './paulo-teodoro-pinto-junior.vcf'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
