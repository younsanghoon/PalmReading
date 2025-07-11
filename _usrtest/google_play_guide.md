# Google Play 스토어 등록 가이드

이 가이드는 PalmReading PWA(Progressive Web App)를 Google Play 스토어에 등록하는 방법을 설명합니다. PWA를 Android 앱으로 패키징하여 Google Play 스토어에 등록하기 위해 TWA(Trusted Web Activity)를 사용합니다.

## 1. 사전 준비 사항

### 1.1. 필수 요구사항 확인
- HTTPS로 호스팅된 PWA (GitHub Pages는 HTTPS 제공)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) 검사에서 PWA 점수가 높아야 함
- 웹 매니페스트 파일 (`manifest.json`)이 올바르게 구성되어 있어야 함
- 서비스 워커가 제대로 구현되어 있어야 함

### 1.2. 개발자 계정 준비
1. [Google Play 개발자 계정](https://play.google.com/console/signup) 생성 (25달러 일회성 등록비 필요)
2. 개발자 계정 정보 입력 및 설정 완료

## 2. PWA 최적화

### 2.1. 웹 매니페스트 파일 업데이트
`client/public/manifest.json` 파일을 업데이트하여 다음 속성 추가:

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
  "dir": "ltr",
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

### 2.2. 서비스 워커 개선
`client/public/sw.js` 파일을 업데이트하여 오프라인 지원 강화:

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

### 2.3. 오프라인 페이지 추가
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

## 3. TWA(Trusted Web Activity) 설정

### 3.1. Android Studio 설치
1. [Android Studio](https://developer.android.com/studio) 다운로드 및 설치
2. Android SDK 설치 (Android Studio 설치 과정에서 함께 설치)

### 3.2. Bubblewrap CLI 설치
Bubblewrap은 PWA를 Android 앱으로 패키징하는 도구입니다.

```bash
# Node.js와 npm이 설치되어 있어야 합니다
npm install -g @bubblewrap/cli
```

### 3.3. Java 개발 키트 설치
1. [JDK 11 이상](https://adoptopenjdk.net/) 설치
2. 환경 변수 설정 (JAVA_HOME)

### 3.4. TWA 프로젝트 초기화
```bash
# 프로젝트 디렉토리 생성
mkdir palm-reading-twa
cd palm-reading-twa

# Bubblewrap 초기화 (대화형 프롬프트 진행)
bubblewrap init --manifest="https://사용자이름.github.io/palm-reading-app/manifest.json"
```

초기화 과정에서 다음 정보를 입력해야 합니다:
- 호스트 URL: `https://사용자이름.github.io/palm-reading-app/`
- 앱 이름: `성격 분석 테스트 센터`
- 짧은 이름: `성격테스트`
- 패키지 이름: `com.yourname.palmreading` (고유한 이름 사용)
- 버전 코드: `1`
- 아이콘 파일 경로: 프로젝트의 아이콘 파일 경로

### 3.5. 앱 서명 키 생성
```bash
bubblewrap build
```

이 명령을 실행하면 첫 빌드 시 키스토어 생성 과정이 시작됩니다:
- 키스토어 암호 설정
- 키 별칭 및 암호 설정
- 개인 정보 입력 (이름, 조직, 지역 등)

생성된 키스토어 파일(.keystore)은 안전하게 보관하세요. 이후 앱 업데이트에 필요합니다.

## 4. Digital Asset Links 설정

### 4.1. SHA-256 인증서 지문 생성
```bash
# 키스토어에서 인증서 정보 추출
keytool -list -v -keystore ./android-app-key.keystore -alias key
```

출력된 정보에서 SHA-256 지문을 복사합니다.

### 4.2. assetlinks.json 파일 생성
웹사이트의 `.well-known` 디렉토리에 `assetlinks.json` 파일 생성:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.yourname.palmreading",
    "sha256_cert_fingerprints": ["YOUR_SHA256_FINGERPRINT_HERE"]
  }
}]
```

### 4.3. assetlinks.json 파일 배포
GitHub Pages의 경우, `client/public/.well-known/` 디렉토리를 생성하고 그 안에 `assetlinks.json` 파일을 배치합니다.

## 5. 앱 빌드 및 테스트

### 5.1. 앱 빌드
```bash
bubblewrap build
```

이 명령은 서명된 APK 파일을 생성합니다.

### 5.2. 앱 테스트
1. 생성된 APK 파일을 Android 기기에 설치
2. 앱이 제대로 실행되는지 확인
3. PWA 기능이 올바르게 작동하는지 테스트 (오프라인 작동, 설치 등)

## 6. Google Play 스토어 등록

### 6.1. 개발자 콘솔 설정
1. [Google Play 개발자 콘솔](https://play.google.com/console)에 로그인
2. "앱 만들기" 클릭
3. 앱 세부 정보 입력:
   - 앱 이름: "성격 분석 테스트 센터"
   - 기본 언어: "한국어"
   - 앱 또는 게임: "앱" 선택
   - 무료 또는 유료: "무료" 선택
   - 개발자 프로그램 정책 동의

### 6.2. 앱 콘텐츠 설정
1. 앱 카테고리 선택: "라이프스타일" 또는 "교육"
2. 이메일 주소 입력
3. 개인정보처리방침 URL 입력 (GitHub Pages에 호스팅된 개인정보처리방침 페이지 URL)

### 6.3. 스토어 등록 정보 설정
1. 앱 설명 작성 (짧은 설명 80자 이내, 전체 설명 4000자 이내)
2. 그래픽 자산 업로드:
   - 앱 아이콘 (512x512 PNG)
   - 기능 그래픽 (1024x500 PNG)
   - 스크린샷 (최소 2장, 16:9 비율 권장)
   - 프로모션 그래픽 (선택사항)

### 6.4. 앱 릴리스 설정
1. "프로덕션" 트랙 선택
2. 새 릴리스 만들기
3. APK 또는 AAB(Android App Bundle) 업로드
4. 릴리스 노트 작성
5. 저장 및 검토

### 6.5. 콘텐츠 등급 설정
1. 설문지 작성
2. 콘텐츠 등급 확인
3. 대상 연령층 설정

### 6.6. 앱 가격 및 배포 설정
1. 앱 가격 설정 (무료)
2. 배포 국가 선택
3. "저장 및 다음 단계로 이동" 클릭

### 6.7. 앱 검토 및 출시
1. 모든 설정 검토
2. "출시 시작" 클릭

## 7. 앱 유지 관리 및 업데이트

### 7.1. 앱 업데이트 방법
1. PWA 업데이트: 웹사이트 코드 업데이트 후 GitHub Pages에 배포
2. 앱 패키지 업데이트 (필요한 경우):
   ```bash
   # 버전 코드 업데이트
   bubblewrap update --appVersionCode=2
   
   # 앱 다시 빌드
   bubblewrap build
   ```
3. Google Play 개발자 콘솔에서 새 APK 업로드

### 7.2. 성능 모니터링
1. Google Play 개발자 콘솔에서 앱 성능 및 사용자 피드백 모니터링
2. Lighthouse를 사용하여 PWA 성능 정기적으로 확인

## 8. 추가 리소스

- [PWA 개발 가이드](https://web.dev/progressive-web-apps/)
- [TWA 문서](https://developers.google.com/web/android/trusted-web-activity)
- [Bubblewrap 문서](https://github.com/GoogleChromeLabs/bubblewrap)
- [Google Play 개발자 정책](https://play.google.com/about/developer-content-policy/)
- [PWA Builder](https://www.pwabuilder.com/) - 대안 도구 