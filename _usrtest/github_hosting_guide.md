# GitHub 호스팅 가이드

이 가이드는 PalmReading 프로젝트를 GitHub Pages를 통해 무료로 호스팅하는 방법을 설명합니다.

## 1. GitHub 레포지토리 설정

### 1.1. GitHub 계정 및 레포지토리 생성
1. [GitHub](https://github.com/)에 로그인 또는 계정 생성
2. 우측 상단의 '+' 아이콘 클릭 → 'New repository' 선택
3. 레포지토리 이름 입력 (예: `palm-reading-app`)
4. 설명(Description) 추가 (선택사항)
5. 공개(Public) 레포지토리로 설정 (GitHub Pages는 무료 계정에서 공개 레포만 가능)
6. README 파일 생성 체크 (선택사항)
7. 'Create repository' 클릭

### 1.2. 로컬 프로젝트를 GitHub에 연결
```bash
# 현재 디렉토리에서 Git 초기화 (이미 초기화되어 있다면 생략)
git init

# 원격 저장소 추가
git remote add origin https://github.com/사용자이름/palm-reading-app.git

# 모든 파일 스테이징
git add .

# 커밋 생성
git commit -m "Initial commit"

# main 브랜치로 푸시
git push -u origin main
```

## 2. 프론트엔드 빌드 설정

### 2.1. 빌드 설정 최적화
프로젝트의 `vite.config.ts` 파일을 확인하고 필요한 경우 수정:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/palm-reading-app/', // GitHub 레포지토리 이름으로 설정
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
```

### 2.2. 라우팅 설정 조정
GitHub Pages는 SPA 라우팅을 기본적으로 지원하지 않으므로, 404 페이지를 활용한 리다이렉트 설정이 필요합니다.

`public` 폴더에 `404.html` 파일 생성:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>성격 분석 테스트 센터</title>
  <script type="text/javascript">
    // SPA 라우팅을 위한 리다이렉트
    var pathSegmentsToKeep = 1;
    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body>
  리다이렉트 중...
</body>
</html>
```

`index.html`에 다음 스크립트 추가:

```html
<!-- 기존 index.html 내부의 <head> 태그 안에 추가 -->
<script type="text/javascript">
  // GitHub Pages에서 SPA 라우팅 지원
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) { 
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

## 3. GitHub Actions를 통한 자동 배포 설정

### 3.1. GitHub Actions 워크플로우 파일 생성
프로젝트 루트에 `.github/workflows` 디렉토리 생성 후 `deploy.yml` 파일 생성:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages
```

## 4. GitHub Pages 활성화

### 4.1. GitHub Pages 설정
1. GitHub 레포지토리 페이지에서 'Settings' 탭 클릭
2. 왼쪽 사이드바에서 'Pages' 클릭
3. 'Source' 섹션에서 'Deploy from a branch' 선택
4. 'Branch' 드롭다운에서 'gh-pages' 선택 (GitHub Actions에서 생성)
5. 'Save' 클릭

## 5. PWA 설정 최적화

### 5.1. 서비스 워커 업데이트
`client/public/sw.js` 파일을 수정하여 GitHub Pages 경로를 고려한 캐싱 설정:

```javascript
const CACHE_NAME = 'personality-test-v1';
const urlsToCache = [
  '/palm-reading-app/', // 레포지토리 이름으로 경로 조정
  '/palm-reading-app/index.html',
  '/palm-reading-app/static/js/main.js',
  '/palm-reading-app/static/css/main.css',
  '/palm-reading-app/manifest.json'
];

// 나머지 코드는 동일하게 유지
```

### 5.2. 매니페스트 파일 경로 조정
`client/public/manifest.json` 파일의 경로 설정:

```json
{
  "name": "성격 분석 테스트 센터",
  "short_name": "성격테스트",
  "start_url": "/palm-reading-app/",
  "icons": [
    {
      "src": "/palm-reading-app/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/palm-reading-app/icon-512.png", 
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  // 나머지 설정은 동일하게 유지
}
```

## 6. 백엔드 서비스 분리 (필요한 경우)

GitHub Pages는 정적 파일만 호스팅할 수 있으므로, 백엔드가 필요한 경우 다음 옵션을 고려하세요:

### 6.1. 서버리스 함수 활용
- [Netlify Functions](https://www.netlify.com/products/functions/)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [AWS Lambda](https://aws.amazon.com/lambda/)

### 6.2. 별도 백엔드 호스팅
- [Render](https://render.com/)
- [Railway](https://railway.app/)
- [Fly.io](https://fly.io/)

## 7. 커스텀 도메인 설정 (선택사항)

### 7.1. 도메인 설정
1. 도메인 제공업체에서 도메인 구매
2. GitHub 레포지토리의 'Settings' → 'Pages'로 이동
3. 'Custom domain' 섹션에 도메인 입력 후 'Save'
4. DNS 제공업체에서 다음 설정 추가:
   - 'A' 레코드: GitHub Pages IP 주소 지정
   - 'CNAME' 레코드: 서브도메인을 사용하는 경우

## 8. 배포 테스트 및 확인

### 8.1. 배포 확인
1. GitHub Actions 워크플로우가 성공적으로 완료되었는지 확인
2. `https://사용자이름.github.io/palm-reading-app/` 접속하여 사이트 확인
3. 모든 페이지가 올바르게 로드되는지 확인
4. PWA 기능이 제대로 작동하는지 확인 (설치 가능, 오프라인 작동 등)

### 8.2. Lighthouse 검사
Google Chrome의 개발자 도구에서 Lighthouse 검사를 실행하여 PWA 점수 확인 및 개선점 파악 