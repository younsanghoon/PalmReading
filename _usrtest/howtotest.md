# PalmReading 프로젝트 테스트 가이드

이 문서는 PalmReading 프로젝트의 GitHub 호스팅 및 Google Play 스토어 등록을 위한 테스트 방법을 설명합니다.

## 1. PWA 테스트

### 1.1. Lighthouse 검사
1. Chrome 브라우저에서 개발자 도구 열기 (F12 또는 Ctrl+Shift+I)
2. Lighthouse 탭 선택
3. 다음 설정 선택:
   - Device: Mobile
   - Categories: Progressive Web App
   - Throttling: Simulated Fast 3G, 4x CPU Slowdown
4. "Generate report" 클릭
5. PWA 점수 및 개선 사항 확인

### 1.2. PWA 설치 테스트
1. 프로젝트를 로컬에서 실행 (`npm run dev`)
2. Chrome 브라우저에서 접속 (http://localhost:3000)
3. 주소 표시줄 오른쪽의 설치 아이콘 확인
4. 설치 버튼 클릭 및 설치 과정 확인
5. 설치된 앱 실행 및 기능 테스트

### 1.3. 오프라인 기능 테스트
1. 프로젝트를 로컬에서 실행
2. Chrome 개발자 도구의 Network 탭에서 "Offline" 체크
3. 페이지 새로고침
4. 오프라인 페이지 또는 캐시된 콘텐츠 표시 확인

## 2. GitHub Pages 배포 테스트

### 2.1. 로컬 빌드 테스트
```bash
# 프로젝트 빌드
npm run build

# 빌드 결과물 확인
ls -la dist/
```

### 2.2. GitHub Actions 워크플로우 테스트
1. `.github/workflows/deploy.yml` 파일 생성 후 커밋
2. GitHub 레포지토리에 푸시
3. GitHub 레포지토리의 "Actions" 탭에서 워크플로우 실행 확인
4. 빌드 및 배포 과정 모니터링
5. 배포 완료 후 `https://사용자이름.github.io/palm-reading-app/` 접속하여 확인

### 2.3. 배포된 사이트 기능 테스트
1. 모든 페이지 접속 및 라우팅 확인
2. 각 테스트 기능 실행 확인
3. PWA 설치 기능 확인
4. 모바일 기기에서 접속 및 반응형 디자인 확인

## 3. TWA(Trusted Web Activity) 테스트

### 3.1. Bubblewrap 빌드 테스트
```bash
# TWA 프로젝트 디렉토리로 이동
cd palm-reading-twa

# 앱 빌드
bubblewrap build
```

### 3.2. 생성된 APK 테스트
1. 생성된 APK 파일을 Android 기기에 설치
   ```bash
   # ADB를 사용한 설치 (기기 연결 필요)
   adb install app-release-signed.apk
   ```
2. 앱 실행 및 기능 테스트
3. 오프라인 모드에서 테스트
4. 앱 성능 및 사용자 경험 확인

### 3.3. Digital Asset Links 테스트
1. 배포된 웹사이트에서 `.well-known/assetlinks.json` 파일 접근 확인
   ```
   https://사용자이름.github.io/palm-reading-app/.well-known/assetlinks.json
   ```
2. JSON 내용이 올바르게 표시되는지 확인
3. TWA 앱에서 "앱으로 열기" 옵션 확인

## 4. 성능 및 호환성 테스트

### 4.1. 다양한 기기 테스트
- 다양한 Android 기기에서 테스트 (다른 화면 크기, 해상도)
- 다양한 iOS 기기에서 웹 버전 테스트
- 태블릿 및 데스크톱에서 테스트

### 4.2. 브라우저 호환성 테스트
- Chrome, Firefox, Safari, Edge 등 다양한 브라우저에서 테스트
- 구형 브라우저에서의 폴백 동작 확인

### 4.3. 성능 테스트
- 초기 로딩 시간 측정
- 인터랙션 지연 시간 측정
- 메모리 사용량 모니터링

## 5. 보안 테스트

### 5.1. HTTPS 설정 확인
- 모든 리소스가 HTTPS를 통해 로드되는지 확인
- 혼합 콘텐츠 경고 확인

### 5.2. 권한 확인
- 앱이 요청하는 권한이 적절한지 확인
- 불필요한 권한 요청이 없는지 확인

## 6. 테스트 자동화 (선택사항)

### 6.1. 자동화된 테스트 설정
```bash
# Jest 테스트 실행
npm test

# E2E 테스트 설정 (Cypress 등)
npm run test:e2e
```

### 6.2. CI/CD 파이프라인에 테스트 통합
GitHub Actions 워크플로우에 테스트 단계 추가:

```yaml
# .github/workflows/deploy.yml 내부에 추가
- name: Run Tests
  run: npm test
```

## 7. 테스트 결과 문서화

### 7.1. 테스트 결과 기록
- 발견된 문제점 기록
- 수정 사항 추적
- 테스트 환경 정보 기록

### 7.2. 스크린샷 및 동영상 캡처
- 주요 기능의 스크린샷 캡처
- 사용자 흐름 동영상 녹화
- Google Play 스토어 등록용 스크린샷 준비 