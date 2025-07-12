const CACHE_NAME = 'personality-test-v1';
const urlsToCache = [
  '/PalmReading/',
  '/PalmReading/index.html',
  '/PalmReading/static/js/bundle.js',
  '/PalmReading/static/css/main.css',
  '/PalmReading/manifest.json',
  '/PalmReading/icon-192.png',
  '/PalmReading/icon-512.png',
  '/PalmReading/offline.html'
];

// AdSense 관련 URL 패턴
const adsenseUrls = [
  'pagead2.googlesyndication.com',
  'googleads.g.doubleclick.net',
  'tpc.googlesyndication.com',
  'www.googletagservices.com'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  // AdSense 관련 요청은 네트워크로 직접 전달
  const url = new URL(event.request.url);
  if (adsenseUrls.some(adsUrl => url.hostname.includes(adsUrl))) {
    console.log('[SW] Bypassing AdSense request:', url.hostname);
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 캐시에서 발견되면 반환
        if (response) {
          return response;
        }
        return fetch(event.request)
          .catch(function() {
            // 오프라인이고 페이지 요청인 경우 오프라인 페이지 제공
            if (event.request.mode === 'navigate') {
              return caches.match('/PalmReading/offline.html');
            }
          });
      })
  );
});