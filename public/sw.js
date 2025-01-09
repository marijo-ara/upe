self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('glassfrog-v1').then(function (cache) {
            return cache.addAll([
                '/',
                '/products',
                '/profile',
                '/manifest.json',
                '/favicon.ico',
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('glassfrog-') && cacheName !== 'glassfrog-v1';
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

