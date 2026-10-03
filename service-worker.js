const CACHE_NAME = 'workout-app-v1';
const assetsToCache = [
    './',
    './index.html',
    './style.css',
    './exercises.js',
    './manifest.json',
    './icon.png',
    'https://cdn.jsdelivr.net/npm/chart.js'
];

// Встановлення сервіс-воркера і кешування файлів
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(assetsToCache);
        })
    );
});

// Активація та видалення старих кешів
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

// Перехоплення запитів з мережі
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});