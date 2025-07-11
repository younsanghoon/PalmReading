// 서비스 워커 버전 관리
const CACHE_NAME = 'palm-reading-v1';

// 캐시할 파일 목록
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/animal-test',
  '/mbti-test',
  '/enneagram-test',
  '/palm-test',
  '/privacy-policy',
  '/terms-of-service',
  '/contact'
];

// SPA 라우트 목록 (네비게이션 요청 처리용)
const spaRoutes = [
  '/',
  '/animal-test',
  '/mbti-test',
  '/enneagram-test',
  '/palm-test',
  '/privacy-policy',
  '/terms-of-service',
  '/contact'
];

// 디버깅 유틸리티
const debug = {
  log: (message, ...args) => {
    console.log(`[ServiceWorker] ${message}`, ...args);
  },
  error: (message, ...args) => {
    console.error(`[ServiceWorker] ${message}`, ...args);
  },
  isSpaRoute: (url) => {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    const isSpa = spaRoutes.includes(path);
    debug.log(`Checking if ${path} is SPA route: ${isSpa}`);
    return isSpa;
  },
  logRequest: (request) => {
    debug.log(`Request details:`, {
      url: request.url,
      method: request.method,
      mode: request.mode,
      headers: [...request.headers],
      cache: request.cache,
      redirect: request.redirect
    });
  }
};

// 서비스 워커 설치 이벤트
self.addEventListener('install', (event) => {
  debug.log(`Install event fired`, new Date().toISOString());
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        debug.log(`Caching app shell files`);
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        debug.log(`All required resources cached`);
        return self.skipWaiting();
      })
      .catch((error) => {
        debug.error(`Cache failed:`, error);
      })
  );
});

// 서비스 워커 활성화 이벤트
self.addEventListener('activate', (event) => {
  debug.log(`Activate event fired`, new Date().toISOString());
  
  // 이전 캐시 삭제
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            debug.log(`Removing old cache:`, cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      debug.log(`Claiming clients`);
      return self.clients.claim();
    })
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  debug.log(`Fetch event for:`, event.request.url);
  debug.log(`Request pathname:`, url.pathname);
  debug.log(`Request mode:`, event.request.mode);
  
  // SPA 라우트 처리 (네비게이션 요청)
  if (event.request.mode === 'navigate') {
    debug.log(`Navigation request detected`);
    
    // 현재 경로가 SPA 라우트인지 확인
    const isSpaRoute = spaRoutes.includes(url.pathname);
    debug.log(`Is SPA route:`, isSpaRoute);
    
    if (isSpaRoute) {
      debug.log(`Handling SPA route:`, url.pathname);
    }
  }
  
  event.respondWith(
    // 네트워크 우선, 실패 시 캐시 사용
    fetch(event.request)
      .then((response) => {
        debug.log(`Network request succeeded for:`, event.request.url);
        
        // 유효한 응답인지 확인
        if (!response || response.status !== 200 || response.type !== 'basic') {
          debug.log(`Response details:`, {
            status: response.status,
            type: response.type,
            ok: response.ok,
            redirected: response.redirected,
            url: response.url
          });
          return response;
        }

        // 응답 복제 (스트림은 한 번만 사용 가능)
        const responseToCache = response.clone();

        // 캐시에 응답 저장
        caches.open(CACHE_NAME)
          .then((cache) => {
            debug.log(`Caching new resource:`, event.request.url);
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch((error) => {
        debug.log(`Network request failed, falling back to cache for:`, event.request.url);
        debug.error(`Network error:`, error);
        
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              debug.log(`Found in cache:`, event.request.url);
              return response;
            }
            
            // HTML 요청에 대해 오프라인 페이지 제공
            if (event.request.mode === 'navigate') {
              debug.log(`Serving offline page for navigation request`);
              return caches.match('/offline.html');
            }
            
            debug.log(`Resource not in cache and offline:`, event.request.url);
            return new Response('Network error happened', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});

// 푸시 알림 이벤트
self.addEventListener('push', (event) => {
  debug.log(`Push received:`, event);
  
  const title = '성격 분석 테스트';
  const options = {
    body: event.data ? event.data.text() : '새로운 알림이 있습니다.',
    icon: '/icon-192.png',
    badge: '/icon-192.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
      .then(() => {
        debug.log(`Notification displayed`);
      })
  );
});

// 알림 클릭 이벤트
self.addEventListener('notificationclick', (event) => {
  debug.log(`Notification clicked:`, event.notification.tag);
  
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        // 이미 열린 창이 있으면 포커스
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            debug.log(`Focusing existing client`);
            return client.focus();
          }
        }
        
        // 없으면 새 창 열기
        if (clients.openWindow) {
          debug.log(`Opening new client`);
          return clients.openWindow('/');
        }
      })
  );
});

// 백그라운드 동기화 이벤트
self.addEventListener('sync', (event) => {
  debug.log(`Sync event fired:`, event.tag);
  
  if (event.tag === 'sync-results') {
    event.waitUntil(
      // 여기에 결과 동기화 코드 추가
      debug.log(`Syncing results`)
    );
  }
});