# PWA 최적화 가이드

이 가이드는 PalmReading 앱의 PWA(Progressive Web App) 기능을 최적화하는 방법을 설명합니다. PWA 최적화는 웹앱을 네이티브 앱과 유사한 사용자 경험으로 개선하고, Google Play 스토어 등록을 위한 필수 요구사항입니다.

## 1. PWA 핵심 요구사항

### 1.1. 필수 구성 요소
- **HTTPS 보안 연결**: 모든 PWA는 HTTPS를 통해 제공되어야 함
- **웹 앱 매니페스트**: 앱의 메타데이터를 정의하는 JSON 파일
- **서비스 워커**: 오프라인 기능 및 백그라운드 동작 지원
- **반응형 디자인**: 모든 화면 크기에 적응하는 UI
- **빠른 로딩 속도**: 초기 로딩 시간 최적화

### 1.2. PWA 점수 향상을 위한 체크리스트
- [ ] HTTPS 설정
- [ ] 웹 앱 매니페스트 완성
- [ ] 서비스 워커 구현
- [ ] 오프라인 지원
- [ ] 설치 가능성(Installability) 구현
- [ ] 성능 최적화
- [ ] 접근성 개선

## 2. 웹 앱 매니페스트 최적화

### 2.1. 기본 매니페스트 구성
`client/public/manifest.json` 파일을 다음과 같이 업데이트:

```json
{
  "name": "성격 분석 테스트 센터",
  "short_name": "성격테스트",
  "description": "AI와 심리학으로 알아보는 나의 진짜 성격",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#667eea",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icon-512.png", 
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "categories": ["lifestyle", "education", "entertainment"],
  "lang": "ko",
  "dir": "ltr"
}
```

### 2.2. 추가 매니페스트 속성
고급 PWA 기능을 위한 추가 속성:

```json
{
  // 기존 속성 유지
  "prefer_related_applications": false,
  "related_applications": [],
  "shortcuts": [
    {
      "name": "동물상 테스트",
      "short_name": "동물상",
      "description": "내 얼굴과 닮은 동물은?",
      "url": "/animal-test",
      "icons": [{ "src": "/icons/animal.png", "sizes": "96x96" }]
    },
    {
      "name": "MBTI 테스트",
      "short_name": "MBTI",
      "description": "내 성격 유형 알아보기",
      "url": "/mbti-test",
      "icons": [{ "src": "/icons/mbti.png", "sizes": "96x96" }]
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/home.png",
      "sizes": "1280x720",
      "type": "image/png"
    },
    {
      "src": "/screenshots/test.png",
      "sizes": "1280x720",
      "type": "image/png"
    }
  ]
}
```

### 2.3. 아이콘 최적화
- **마스커블 아이콘**: 다양한 기기에서 적절한 모양으로 표시
- **아이콘 크기**: 최소 192x192, 512x512 크기 필수 (더 많은 크기 권장)
- **파일 형식**: PNG 권장 (SVG도 가능)

## 3. 서비스 워커 최적화

### 3.1. 기본 서비스 워커 구현
`client/public/sw.js` 파일 업데이트:

```javascript
const CACHE_NAME = 'personality-test-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/js/main.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  // 추가 리소스 캐싱
  '/animal-test',
  '/mbti-test',
  '/enneagram-test',
  '/palm-test'
];

// 설치 시 캐시
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 캐시에서 발견되면 반환
        if (response) {
          return response;
        }
        
        // 네트워크 요청 복제
        var fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(
          function(response) {
            // 유효한 응답인지 확인
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // 응답 복제
            var responseToCache = response.clone();
            
            // 캐시에 저장
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          }
        ).catch(function() {
          // 오프라인 폴백 페이지 제공
          return caches.match('/offline.html');
        });
      })
  );
});

// 캐시 정리
self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

### 3.2. 서비스 워커 등록
`client/src/main.tsx` 파일에 서비스 워커 등록 코드 추가:

```typescript
// 기존 import 유지

// 앱 렌더링 코드

// 서비스 워커 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
```

### 3.3. 오프라인 페이지 구현
`client/public/offline.html` 파일 생성:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>오프라인 - 성격 분석 테스트 센터</title>
  <style>
    body {
      font-family: 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: linear-gradient(to bottom right, #f0f4ff, #f5f0ff);
      text-align: center;
      padding: 0 20px;
    }
    .container {
      max-width: 500px;
    }
    h1 {
      color: #4a5568;
      margin-bottom: 1rem;
    }
    p {
      color: #718096;
      margin-bottom: 1.5rem;
    }
    .btn {
      background-color: #667eea;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      text-decoration: none;
      font-weight: 600;
      transition: background-color 0.2s;
    }
    .btn:hover {
      background-color: #5a67d8;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>인터넷 연결이 필요합니다</h1>
    <p>현재 오프라인 상태입니다. 인터넷에 연결한 후 다시 시도해주세요.</p>
    <a href="/" class="btn">새로고침</a>
  </div>
</body>
</html>
```

## 4. 설치 가능성(Installability) 구현

### 4.1. 설치 버튼 컴포넌트 구현
`client/src/components/pwa-install.tsx` 파일 업데이트:

```tsx
import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
}

const PWAInstall: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 이미 설치되었는지 확인
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // 설치 프롬프트 이벤트 캡처
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    // 설치 프롬프트 표시
    await installPrompt.prompt();

    // 사용자 선택 결과 확인
    const choiceResult = await installPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('사용자가 앱 설치를 수락했습니다');
      setIsInstalled(true);
    } else {
      console.log('사용자가 앱 설치를 거부했습니다');
    }
    
    // 프롬프트 초기화
    setInstallPrompt(null);
  };

  if (isInstalled || !installPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto w-max z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center space-x-4">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            앱을 설치하고 더 편리하게 이용하세요
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            홈 화면에 추가하여 언제든지 빠르게 접근할 수 있습니다
          </p>
        </div>
        <button
          onClick={handleInstallClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          설치하기
        </button>
      </div>
    </div>
  );
};

export default PWAInstall;
```

### 4.2. 앱에 설치 버튼 통합
`client/src/App.tsx` 파일에 설치 버튼 컴포넌트 추가:

```tsx
import React from "react";
import { Route, Switch } from "wouter";
import Home from "./pages/home";
import AnimalTest from "./pages/animal-test";
import MbtiTest from "./pages/mbti-test";
import EnneagramTest from "./pages/enneagram-test";
import PalmTest from "./pages/palm-test";
import NotFound from "./pages/not-found";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import Contact from "./pages/contact";
import PWAInstall from "./components/pwa-install";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/animal-test" component={AnimalTest} />
        <Route path="/mbti-test" component={MbtiTest} />
        <Route path="/enneagram-test" component={EnneagramTest} />
        <Route path="/palm-test" component={PalmTest} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
      <PWAInstall />
    </div>
  );
}

export default App;
```

## 5. 성능 최적화

### 5.1. 이미지 최적화
- **WebP 형식 사용**: 더 작은 파일 크기로 고품질 이미지 제공
- **이미지 크기 조정**: 표시되는 크기에 맞게 이미지 리사이징
- **지연 로딩**: 화면에 보이는 이미지만 로드

### 5.2. JavaScript 최적화
- **코드 분할**: React의 `React.lazy`와 `Suspense` 활용
- **트리 쉐이킹**: 사용하지 않는 코드 제거
- **번들 크기 분석**: `webpack-bundle-analyzer` 활용

### 5.3. CSS 최적화
- **중요 CSS 인라인화**: 초기 렌더링에 필요한 CSS 인라인 포함
- **사용하지 않는 CSS 제거**: PurgeCSS 활용
- **CSS 미니파이**: 공백과 주석 제거

## 6. PWA 테스트 및 검증

### 6.1. Lighthouse 검사
1. Chrome 개발자 도구 열기 (F12)
2. Lighthouse 탭 선택
3. "Mobile" 기기 선택
4. "Progressive Web App" 카테고리 선택
5. "Generate report" 클릭

### 6.2. PWA 체크리스트 검증
- [PWA 체크리스트](https://web.dev/pwa-checklist/) 기준으로 검증
- 모든 필수 항목 충족 확인
- 권장 항목 최대한 구현

### 6.3. 다양한 기기에서 테스트
- 여러 모바일 기기에서 테스트
- 다양한 브라우저에서 테스트 (Chrome, Safari, Firefox)
- 오프라인 모드에서 테스트

## 7. 추가 개선 사항

### 7.1. 푸시 알림 구현
- **웹 푸시 API** 활용
- **Firebase Cloud Messaging** 연동

### 7.2. 백그라운드 동기화
- **Background Sync API** 활용
- 오프라인 상태에서 작업 큐 관리

### 7.3. 접근성 개선
- **ARIA 속성** 추가
- **키보드 네비게이션** 지원
- **고대비 모드** 지원

## 8. 참고 자료

- [Google PWA 가이드](https://web.dev/progressive-web-apps/)
- [MDN PWA 문서](https://developer.mozilla.org/ko/docs/Web/Progressive_web_apps)
- [Lighthouse 성능 지표](https://web.dev/lighthouse-performance/)
- [PWA Builder](https://www.pwabuilder.com/)
- [Workbox](https://developers.google.com/web/tools/workbox) - 서비스 워커 라이브러리 