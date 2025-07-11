# GitHub 호스팅 및 Google Play 스토어 등록 요약

이 문서는 PalmReading 프로젝트를 GitHub Pages에 호스팅하고 Google Play 스토어에 등록하는 전체 과정을 요약합니다.

## 1. GitHub 호스팅 과정

### 1.1. 준비 단계
1. GitHub 계정 생성 및 로그인
2. 새 레포지토리 생성 (public 설정)
3. 로컬 프로젝트를 GitHub에 연결 및 푸시

### 1.2. 빌드 설정
1. `vite.config.ts` 파일 수정 - base 경로 설정
2. SPA 라우팅을 위한 404.html 및 리다이렉트 스크립트 추가
3. PWA 설정 최적화 (서비스 워커, 매니페스트 파일)

### 1.3. GitHub Actions 설정
1. `.github/workflows/deploy.yml` 파일 생성
2. 자동 빌드 및 배포 워크플로우 구성
3. GitHub Pages 활성화 (Settings > Pages)

### 1.4. 배포 및 확인
1. 코드 푸시 시 자동 배포 확인
2. `https://사용자이름.github.io/레포지토리명/` 접속 확인
3. 모든 기능 테스트 및 검증

## 2. Google Play 스토어 등록 과정

### 2.1. PWA 최적화
1. 웹 매니페스트 파일 업데이트
   - 필수 속성 추가 (name, icons, start_url 등)
   - 추가 속성 구성 (shortcuts, screenshots 등)
2. 서비스 워커 개선
   - 오프라인 지원 강화
   - 캐싱 전략 최적화
3. 설치 가능성(Installability) 구현
   - 설치 버튼 컴포넌트 추가
   - 사용자 경험 개선

### 2.2. TWA(Trusted Web Activity) 설정
1. 개발 환경 준비
   - Android Studio 설치
   - Bubblewrap CLI 설치
   - JDK 설치
2. TWA 프로젝트 초기화
   - `bubblewrap init` 명령으로 프로젝트 생성
   - 앱 정보 설정 (이름, 패키지명 등)
3. 앱 서명 키 생성
   - 키스토어 생성 및 관리
4. Digital Asset Links 설정
   - SHA-256 인증서 지문 생성
   - assetlinks.json 파일 생성 및 배포

### 2.3. 앱 빌드 및 테스트
1. `bubblewrap build` 명령으로 APK 생성
2. 생성된 APK 테스트
3. 기능 및 성능 검증

### 2.4. Google Play 개발자 계정 설정
1. 개발자 계정 생성 (25달러 등록비 지불)
2. 개발자 정보 설정 및 계약 동의

### 2.5. 앱 등록 및 출시
1. 앱 정보 설정
   - 앱 이름, 설명, 카테고리 등
2. 그래픽 자산 업로드
   - 아이콘, 스크린샷, 기능 그래픽 등
3. 콘텐츠 등급 설정
4. 개인정보처리방침 URL 제공
5. APK 업로드 및 릴리스 노트 작성
6. 검토 및 출시 시작

## 3. 유지 관리 및 업데이트

### 3.1. GitHub 호스팅 유지 관리
1. 코드 업데이트 시 자동 배포
2. HTTPS 인증서 자동 갱신 (GitHub Pages에서 처리)
3. 도메인 설정 관리 (필요한 경우)

### 3.2. Google Play 앱 업데이트
1. PWA 업데이트 (웹 코드 변경)
   - 자동으로 TWA 앱에 반영됨
2. 앱 패키지 업데이트 (필요한 경우)
   - 버전 코드 증가
   - 새 APK 빌드 및 업로드
3. 릴리스 노트 작성 및 출시 관리

## 4. 주요 파일 및 디렉토리

### 4.1. GitHub 호스팅 관련 파일
- `vite.config.ts`: 빌드 설정
- `client/public/404.html`: SPA 라우팅 지원
- `client/public/manifest.json`: PWA 매니페스트
- `client/public/sw.js`: 서비스 워커
- `.github/workflows/deploy.yml`: GitHub Actions 워크플로우

### 4.2. TWA 관련 파일
- `palm-reading-twa/`: TWA 프로젝트 디렉토리
- `client/public/.well-known/assetlinks.json`: Digital Asset Links
- `android-app-key.keystore`: 앱 서명 키스토어

## 5. 참고 자료

### 5.1. GitHub 호스팅 관련
- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [SPA 라우팅 가이드](https://github.com/rafgraph/spa-github-pages)

### 5.2. Google Play 스토어 등록 관련
- [PWA 개발 가이드](https://web.dev/progressive-web-apps/)
- [TWA 문서](https://developers.google.com/web/android/trusted-web-activity)
- [Bubblewrap 문서](https://github.com/GoogleChromeLabs/bubblewrap)
- [Google Play 개발자 정책](https://play.google.com/about/developer-content-policy/)
- [PWA Builder](https://www.pwabuilder.com/) 