// 카메라 캡처 기능 구현
class CameraCapture {
  constructor(options = {}) {
    // 기본 설정
    this.options = {
      videoElement: null,
      canvasElement: null,
      photoElement: null,
      startButton: null,
      captureButton: null,
      switchButton: null,
      cameraSelect: null,
      onPhotoCapture: null,
      ...options
    };

    // 상태 변수
    this.stream = null;
    this.facingMode = 'user'; // 전면 카메라가 기본값
    this.videoDevices = [];
    this.isInitialized = false;

    // 요소 가져오기
    this.video = this.options.videoElement;
    this.canvas = this.options.canvasElement;
    this.photo = this.options.photoElement;
    this.startButton = this.options.startButton;
    this.captureButton = this.options.captureButton;
    this.switchButton = this.options.switchButton;
    this.cameraSelect = this.options.cameraSelect;

    // 이벤트 바인딩
    if (this.startButton) {
      this.startButton.addEventListener('click', () => this.startCamera());
    }
    
    if (this.captureButton) {
      this.captureButton.addEventListener('click', () => this.capturePhoto());
    }
    
    if (this.switchButton) {
      this.switchButton.addEventListener('click', () => this.switchCamera());
    }
    
    if (this.cameraSelect) {
      this.cameraSelect.addEventListener('change', (e) => {
        if (e.target.value) {
          this.startCamera(e.target.value);
        }
      });
    }

    // 브라우저 호환성 확인
    this.checkBrowserSupport();
  }

  // 브라우저 지원 확인
  checkBrowserSupport() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error('이 브라우저는 카메라 접근을 지원하지 않습니다.');
      return false;
    }
    return true;
  }

  // 초기화
  async initialize() {
    if (this.isInitialized) return;
    
    try {
      await this.getCameraDevices();
      this.isInitialized = true;
    } catch (error) {
      console.error('카메라 초기화 오류:', error);
    }
  }

  // 사용 가능한 카메라 장치 가져오기
  async getCameraDevices() {
    if (!this.checkBrowserSupport()) return;

    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      // 카메라 선택 옵션 추가
      if (this.cameraSelect) {
        this.cameraSelect.innerHTML = '<option value="">카메라 선택</option>';
        this.videoDevices.forEach((device, index) => {
          const option = document.createElement('option');
          option.value = device.deviceId;
          option.text = device.label || `카메라 ${index + 1}`;
          this.cameraSelect.appendChild(option);
        });
      }
      
      // 카메라가 2개 이상이면 전환 버튼 표시
      if (this.switchButton && this.videoDevices.length > 1) {
        this.switchButton.style.display = 'inline-block';
      }

      return this.videoDevices;
    } catch (error) {
      console.error('카메라 장치를 가져오는 중 오류 발생:', error);
      return [];
    }
  }
  
  // 카메라 시작
  async startCamera(deviceId = null) {
    if (!this.checkBrowserSupport()) return;
    
    try {
      const constraints = {
        video: deviceId 
          ? { deviceId: { exact: deviceId } } 
          : { facingMode: this.facingMode }
      };
      
      // 이전 스트림이 있으면 중지
      this.stopCamera();
      
      // 새 스트림 시작
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (this.video) {
        this.video.srcObject = this.stream;
        this.video.style.display = 'block';
        
        // 비디오가 로드되면 캡처 버튼 활성화
        this.video.onloadedmetadata = () => {
          if (this.captureButton) {
            this.captureButton.disabled = false;
          }
        };
      }
      
      // 카메라 시작 후 장치 정보 업데이트
      if (!deviceId && !this.isInitialized) {
        await this.getCameraDevices();
      }

      return true;
    } catch (error) {
      console.error('카메라 접근 오류:', error);
      alert('카메라에 접근할 수 없습니다. 카메라 권한을 확인해주세요.');
      return false;
    }
  }
  
  // 카메라 중지
  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    if (this.video) {
      this.video.srcObject = null;
    }
  }
  
  // 사진 촬영
  capturePhoto() {
    if (!this.video || !this.canvas || !this.stream) {
      console.error('비디오 또는 캔버스 요소가 없거나 카메라가 시작되지 않았습니다.');
      return null;
    }
    
    const context = this.canvas.getContext('2d');
    
    // 비디오 크기에 맞게 캔버스 설정
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
    
    // 비디오 프레임을 캔버스에 그리기
    context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
    
    // 캔버스의 이미지를 데이터 URL로 변환
    const dataUrl = this.canvas.toDataURL('image/png');
    
    // 이미지 표시
    if (this.photo) {
      this.photo.src = dataUrl;
      this.photo.style.display = 'block';
    }
    
    // 콜백 함수 호출
    if (typeof this.options.onPhotoCapture === 'function') {
      this.options.onPhotoCapture(dataUrl);
    }
    
    return dataUrl;
  }
  
  // 카메라 전환 (전면/후면)
  switchCamera() {
    this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
    this.startCamera();
  }
  
  // 리소스 정리
  dispose() {
    this.stopCamera();
    
    // 이벤트 리스너 제거
    if (this.startButton) {
      this.startButton.removeEventListener('click', () => this.startCamera());
    }
    
    if (this.captureButton) {
      this.captureButton.removeEventListener('click', () => this.capturePhoto());
    }
    
    if (this.switchButton) {
      this.switchButton.removeEventListener('click', () => this.switchCamera());
    }
    
    if (this.cameraSelect) {
      this.cameraSelect.removeEventListener('change', () => {});
    }
  }
}

// 전역 객체로 노출
window.CameraCapture = CameraCapture; 