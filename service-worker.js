const CACHE_NAME = 'workout-pwa-v1';
const urlsToCache = [
  './index.html',
  './style.css',
  './exercises.js',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
];

// Встановлення і кешування файлів
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Віддача файлів без інтернету
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response; // Якщо є в кеші (немає інтернету)
        return fetch(event.request);   // Якщо є інтернет
      })
  );
});