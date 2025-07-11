import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 전역 에러 핸들러 설정
const originalConsoleError = console.error;
console.error = (...args) => {
  // 원래 에러 로깅 유지
  originalConsoleError(...args);
  
  // 추가 로깅 또는 에러 추적
  console.log('[Global Error]', new Date().toISOString(), ...args);
  
  // 여기에 에러 추적 서비스 호출 코드를 추가할 수 있음
  // 예: errorTrackingService.captureError(args);
};

// 처리되지 않은 Promise 에러 캐치
window.addEventListener('unhandledrejection', (event) => {
  console.log('[Unhandled Promise Rejection]', event.reason);
});

// 전역 에러 캐치
window.addEventListener('error', (event) => {
  console.log('[Global Error Event]', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error
  });
});

// 개발 환경 확인
const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// 앱 초기화 로깅
console.log('[App] Initializing application');
console.log('[App] Environment:', isDev ? 'development' : 'production');
console.log('[App] User Agent:', navigator.userAgent);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// 앱 로드 완료 로깅
console.log('[App] Application rendered');

// 서비스 워커 등록 (PWA 지원)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    console.log('[ServiceWorker] Registering service worker');
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('[ServiceWorker] Registration successful:', registration.scope);
      })
      .catch(error => {
        console.error('[ServiceWorker] Registration failed:', error);
      });
  });
}
