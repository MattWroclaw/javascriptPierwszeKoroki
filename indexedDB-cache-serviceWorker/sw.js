// self oznacza że to donosi się globalnie

self.addEventListener('install', function (ev) {
    ev.waitUntil(
        cach+-es.open('video-store')
            .then(function (cache) {
                return cache.addAll([
                    '/',
                    'inex.html',
                    'style.css',
                    'index.js'
                ])
            })
    )
});

self.addEventListener('fetch', function (ev){
    console.log(ev.request.url);
    ev.respondWith(
        caches.match(ev.request).then(function (response){
            return response || fetch(ev.request);
        })
    )
})