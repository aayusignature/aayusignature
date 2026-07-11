// sw.js
const CACHE_NAME = 'aayu-sig-v1';
const ASSETS = [
    './',
    './index.html',
    './songs.html',
    './videos.html',
    './lyrics.html',
    './about.html',
    './contact.html',
    './css/style.css',
    './js/config.js',
    './js/api.js',
    './js/app.js'
];

// Cache core assets on Install
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activation logic to clear old cache
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

// Fetch strategy: Cache falling back to Network
self.addEventListener('fetch', (e) => {
    // Only handle http/https requests
    if (!e.request.url.startsWith('http')) return;
    
    e.respondWith(
        caches.match(e.request).then((cachedResponse) => {
            return cachedResponse || fetch(e.request).catch(() => {
                // Completely offline safety handler
            });
        })
    );
});

