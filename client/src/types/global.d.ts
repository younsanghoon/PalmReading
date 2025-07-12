// 카메라 캡처 관련 타입 정의
interface CameraCaptureOptions {
  videoElement: HTMLVideoElement | null;
  canvasElement: HTMLCanvasElement | null;
  photoElement: HTMLImageElement | null;
  startButton: HTMLButtonElement | null;
  captureButton: HTMLButtonElement | null;
  switchButton: HTMLButtonElement | null;
  cameraSelect: HTMLSelectElement | null;
  onPhotoCapture: (dataUrl: string) => void;
}

interface CameraCapture {
  initialize(): Promise<void>;
  startCamera(deviceId?: string): Promise<boolean>;
  stopCamera(): void;
  capturePhoto(): string | null;
  switchCamera(): void;
  dispose(): void;
}

interface CameraCaptureConstructor {
  new(options: CameraCaptureOptions): CameraCapture;
}

// 전역 Window 인터페이스 확장
declare global {
  interface Window {
    CameraCapture: CameraCaptureConstructor;
    __spaDebug: any;
    __SPA_ROUTES: string[];
    __IS_DEV: boolean;
    __debugRouter?: any;
    __spaRouteDebug: any;
  }
}

export {}; 