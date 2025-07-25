import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, Share2 } from "lucide-react";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useTeachableMachine } from "@/hooks/use-teachable-machine";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ResultChart } from "@/components/ui/result-chart";
import { useLanguage } from "@/lib/i18n";
import { ANIMAL_PERSONALITIES } from "@/lib/personality-data";
import type { ModelPrediction } from "@/lib/ai-models";

// 동물상 언어 데이터 타입 정의
// Type definition for animal face language data
// 動物顔の言語データの型定義
// 动物相语言数据类型定义
// Definisi tipe data bahasa wajah hewan
// คำจำกัดความประเภทข้อมูลภาษาใบหน้าสัตว์
// Định nghĩa kiểu dữ liệu ngôn ngữ khuôn mặt động vật
interface AnimalLanguageData {
  traits: string[];
  description: string;
  personality: string;
  charm: string;
  dating: string;
}

// 카메라 캡처 타입 정의
// Type definition for camera capture
// カメラキャプチャの型定義
// 相机捕获类型定义
// Definisi tipe penangkapan kamera
// คำจำกัดความประเภทการจับภาพกล้อง
// Định nghĩa kiểu chụp camera
interface CameraCapture {
  start: () => void;
  stop: () => void;
}

interface CameraCaptureOptions {
  videoElement: HTMLVideoElement;
  canvasElement: HTMLCanvasElement;
  photoElement: HTMLImageElement;
  selectElement: HTMLSelectElement | null;
  startButton: HTMLButtonElement | null;
  captureButton: HTMLButtonElement | null;
  switchButton: HTMLButtonElement | null;
  onCaptured: (dataUrl: string) => void;
  onError: (error: Error) => void;
}

// 전역으로 CameraCapture 타입 선언
// Global declaration of CameraCapture type
// CameraCapture型のグローバル宣言
// 全局声明CameraCapture类型
// Deklarasi global tipe CameraCapture
// การประกาศประเภท CameraCapture แบบทั่วโลก
// Khai báo toàn cục kiểu CameraCapture
declare global {
  interface Window {
    CameraCapture: {
      new (options: CameraCaptureOptions): CameraCapture;
    };
  }
}

interface AnimalFaceTestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AnimalResult {
  animalType: string;
  confidence: number;
  personality: string;
  charm: string;
  dating: string;
  traits: string[];
  predictions: ModelPrediction[];
}

export function AnimalFaceTest({ open, onOpenChange }: AnimalFaceTestProps) {
  const [currentStep, setCurrentStep] = useState<'upload' | 'camera' | 'analyzing' | 'result'>('upload');
  const [result, setResult] = useState<AnimalResult | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const { t, language } = useLanguage();
  
  // 카메라 관련 상태 및 참조
  // Camera-related states and references
  // カメラ関連の状態と参照
  // 相机相关状态和引用
  // Status dan referensi terkait kamera
  // สถานะและการอ้างอิงที่เกี่ยวข้องกับกล้อง
  // Trạng thái và tham chiếu liên quan đến camera
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const cameraInstanceRef = useRef<CameraCapture | null>(null);
  
  const { 
    imageUrl, 
    uploadImage, 
    clearImage, 
    createImageElement,
    setImageUrl,
    isUploading,
    error: uploadError 
  } = useImageUpload();
  
  // 모델 URL 정의
  // Model URL definition
  // モデルURLの定義
  // 模型URL定义
  // Definisi URL model
  // การกำหนด URL ของโมเดล
  // Định nghĩa URL mô hình
  const modelURL = '/attached_assets/model_1752161703239.json';
  const metadataURL = '/attached_assets/metadata_1752161703239.json';
  
  // 모델 URL 로깅
  // Model URL logging
  // モデルURLのロギング
  // 模型URL日志记录
  // Pencatatan URL model
  // การบันทึก URL ของโมเดล
  // Ghi nhật ký URL mô hình
  useEffect(() => {
    console.log('[AnimalFaceTest] Using model URL:', modelURL);
    console.log('[AnimalFaceTest] Using metadata URL:', metadataURL);
  }, []);
  
  const { 
    model,
    predictAnimal,
    isLoading: isAnalyzing, 
    error: analysisError 
  } = useTeachableMachine({ modelURL, metadataURL });

  // 모델 로드 상태 체크
  useEffect(() => {
    if (model) {
      console.log('[AnimalFaceTest] Model loaded successfully');
      setModelLoaded(true);
    }
  }, [model]);

  // 언어 변경 이벤트 리스너
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      console.log('[AnimalFaceTest] Language change detected', (event as CustomEvent).detail);
      // 언어 변경 시 필요한 상태 업데이트
      if (result) {
        // 결과가 있는 경우 결과 텍스트 업데이트
        const updatedResult = {
          ...result
        };
        setResult(updatedResult);
      }
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [result]);

  // 카메라 초기화
  const initCamera = () => {
    setCurrentStep('camera');
    
    // 이미 카메라 인스턴스가 있으면 제거
    if (cameraInstanceRef.current) {
      cameraInstanceRef.current.stop();
      cameraInstanceRef.current = null;
    }
    
    // 카메라 기능 초기화
    if (typeof window !== 'undefined' && videoRef.current && canvasRef.current && photoRef.current) {
      // 카메라 캡처 스크립트 로드
      const script = document.createElement('script');
      script.src = '/PalmReading/camera-capture.js';
      script.onload = () => {
        if (!window.CameraCapture) {
          console.error('CameraCapture not found in window');
          return;
        }
        
        const cameraOptions: CameraCaptureOptions = {
          videoElement: videoRef.current!,
          canvasElement: canvasRef.current!,
          photoElement: photoRef.current!,
          selectElement: document.getElementById('cameraSelect') as HTMLSelectElement,
          startButton: document.getElementById('startCameraButton') as HTMLButtonElement,
          captureButton: document.getElementById('captureCameraButton') as HTMLButtonElement,
          switchButton: document.getElementById('switchCameraButton') as HTMLButtonElement,
          onCaptured: (dataUrl: string) => {
            setImageUrl(dataUrl);
            setCurrentStep('upload');
          },
          onError: (error: Error) => {
            console.error('Camera error:', error);
            setCurrentStep('upload');
          }
        };
        
        cameraInstanceRef.current = new window.CameraCapture(cameraOptions);
        cameraInstanceRef.current.start();
      };
      
      script.onerror = (err) => {
        console.error('Failed to load camera script:', err);
        setCurrentStep('upload');
      };
      
      document.body.appendChild(script);
    }
  };

  // 이미지 업로드 처리
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      await uploadImage(event.target.files[0]);
    }
  };

  // 이미지 분석 처리
  const handleAnalyze = async () => {
    if (!imageUrl || !modelLoaded) return;
    
    setCurrentStep('analyzing');
    
    try {
      // 이미지 요소 생성
      const imageElement = await createImageElement(imageUrl);
      
      // 동물상 예측
      if (imageElement) {
        const predictions = await predictAnimal(imageElement);
        console.log('[AnimalFaceTest] All predictions:', predictions);
        
        if (predictions && predictions.length > 0) {
          // 가장 높은 확률의 예측 찾기
          const topPrediction = predictions.reduce((max, pred) => 
            pred.probability > max.probability ? pred : max, predictions[0]);
          
          const animalType = topPrediction.className;
          const koreanAnimalType = getAnimalTypeInKorean(animalType);
          const confidence = topPrediction.probability * 100;
          
          console.log('[AnimalFaceTest] Top prediction:', animalType, 'Korean type:', koreanAnimalType);
          console.log('[AnimalFaceTest] Available animal types in ANIMAL_PERSONALITIES:', Object.keys(ANIMAL_PERSONALITIES));
          
          // 동물상에 따른 성격 정보 가져오기
          const animalInfo = ANIMAL_PERSONALITIES[koreanAnimalType as keyof typeof ANIMAL_PERSONALITIES];
          
          if (!animalInfo) {
            console.error(`[AnimalFaceTest] No data found for animal type: ${koreanAnimalType}`);
            console.error(`[AnimalFaceTest] Available types: ${Object.keys(ANIMAL_PERSONALITIES).join(', ')}`);
            
            // 대체 동물상 사용 (가장 높은 확률의 유효한 동물상)
            const validPredictions = predictions.filter(p => {
              const koreanType = getAnimalTypeInKorean(p.className);
              return ANIMAL_PERSONALITIES[koreanType as keyof typeof ANIMAL_PERSONALITIES] !== undefined;
            });
            
            console.log('[AnimalFaceTest] Valid predictions:', validPredictions);
            
            if (validPredictions.length > 0) {
              // 유효한 예측 중 가장 높은 확률의 예측 사용
              const validTopPrediction = validPredictions[0];
              const validAnimalType = validTopPrediction.className;
              const validKoreanType = getAnimalTypeInKorean(validAnimalType);
              
              console.log(`[AnimalFaceTest] Using alternative valid prediction: ${validAnimalType} (${validKoreanType})`);
              
              // 결과 설정 업데이트
              const validAnimalInfo = ANIMAL_PERSONALITIES[validKoreanType as keyof typeof ANIMAL_PERSONALITIES];
              
              if (validAnimalInfo) {
                setResult({
                  animalType: validAnimalType,
                  confidence: validTopPrediction.probability * 100,
                  personality: getAnimalInfo(validAnimalType, 'personality'),
                  charm: getAnimalInfo(validAnimalType, 'charm'),
                  dating: getAnimalInfo(validAnimalType, 'dating'),
                  traits: getAnimalInfo(validAnimalType, 'traits').split(','),
                  predictions
                });
                
                setCurrentStep('result');
                return;
              }
            }
          }
          
          // 기본 정보 설정
          let traits = ['특징 정보 없음'];
          let personality = '성격 정보가 없습니다';
          let charm = '매력 정보가 없습니다';
          let dating = '연애 정보가 없습니다';
          
          // 동물상 정보가 있으면 해당 정보 사용
          if (animalInfo) {
            traits = animalInfo.traits;
            personality = animalInfo.personality;
            charm = animalInfo.charm;
            dating = animalInfo.dating;
            
            // 현재 언어에 맞는 번역이 있는지 확인
            if (language !== 'ko') {
              const langData = animalInfo[language];
              if (langData && typeof langData === 'object') {
                const typedLangData = langData as AnimalLanguageData;
                if ('traits' in typedLangData) traits = typedLangData.traits;
                if ('personality' in typedLangData) personality = typedLangData.personality;
                if ('charm' in typedLangData) charm = typedLangData.charm;
                if ('dating' in typedLangData) dating = typedLangData.dating;
              }
            }
          }
          
          // 결과 설정
          setResult({
            animalType,
            confidence,
            personality,
            charm,
            dating,
            traits,
            predictions
          });
          
          setCurrentStep('result');
        } else {
          console.error('[AnimalFaceTest] No predictions returned');
          setCurrentStep('upload');
        }
      }
    } catch (error) {
      console.error('[AnimalFaceTest] Analysis error:', error);
      setCurrentStep('upload');
    }
  };

  // 초기화 함수
  const handleReset = () => {
    setCurrentStep('upload');
    setResult(null);
    clearImage();
    
    // 카메라 인스턴스 정리
    if (cameraInstanceRef.current) {
      cameraInstanceRef.current.stop();
      cameraInstanceRef.current = null;
    }
  };

  // 결과 공유 함수
  const handleShare = async () => {
    if (!result) return;
    
    const koreanAnimalType = getAnimalTypeInKorean(result.animalType);
    const shareText = `내 동물상 결과: ${koreanAnimalType} (${result.confidence.toFixed(1)}%)\n${window.location.href}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: '동물상 테스트 결과',
          text: shareText,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert('클립보드에 복사되었습니다.');
      }
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  // 동물상 타입 영어를 한글로 변환
  const getAnimalTypeInKorean = (animalType: string): string => {
    // 기본값 설정 (유효하지 않은 타입일 경우)
    if (!animalType || typeof animalType !== 'string') {
      console.warn(`[AnimalFaceTest] Invalid animal type: ${animalType}, using default 'unknown'`);
      return '알 수 없는 동물상';
    }
    
    const animalTypeMap: Record<string, string> = {
      'dog': '강아지상',
      'cat': '고양이상',
      'rabbit': '토끼상',
      'dinosaur': '공룡상',
      'bear': '곰상',
      'deer': '사슴상',
      'fox': '여우상',
      'monkey': '원숭이상',
      'unknown': '알 수 없는 동물상'
    };
    
    // 소문자로 변환하여 일관성 유지
    const lowerCaseType = animalType.toLowerCase();
    
    // 매핑된 한글 타입 또는 알 수 없는 동물상 반환
    const koreanType = animalTypeMap[lowerCaseType] || '알 수 없는 동물상';
    console.log(`[AnimalFaceTest] Converting ${animalType} to ${koreanType}`);
    
    return koreanType;
  };

  // 결과 표시 부분 개선
  const getAnimalInfo = (animalType: string, field: keyof AnimalLanguageData): string => {
    // 기본값 설정 (유효하지 않은 타입일 경우)
    if (!animalType || typeof animalType !== 'string') {
      console.warn(`[AnimalFaceTest] Invalid animal type in getAnimalInfo: ${animalType}, using default 'dog'`);
      animalType = 'dog';
    }
    
    const koreanType = getAnimalTypeInKorean(animalType);
    const animalInfo = ANIMAL_PERSONALITIES[koreanType as keyof typeof ANIMAL_PERSONALITIES];
    
    if (!animalInfo) {
      console.warn(`[AnimalFaceTest] No data found for animal type: ${koreanType}`);
      
      // 기본 동물상 정보 사용 (강아지상)
      const defaultAnimalInfo = ANIMAL_PERSONALITIES['강아지상'];
      if (defaultAnimalInfo) {
        console.log(`[AnimalFaceTest] Using default animal info: 강아지상`);
        
        // 기본값은 한국어 데이터
        let value = defaultAnimalInfo[field] as string;
        
        // 현재 언어에 맞는 번역이 있는지 확인
        if (language !== 'ko') {
          const langData = defaultAnimalInfo[language];
          if (langData && typeof langData === 'object' && field in langData) {
            const typedLangData = langData as AnimalLanguageData;
            value = typedLangData[field] as string;
          }
        }
        
        return value;
      }
      
      return field === 'traits' ? '특징 정보 없음' : '정보가 없습니다';
    }
    
    // 기본값은 한국어 데이터
    let value = animalInfo[field] as string;
    
    // 현재 언어에 맞는 번역이 있는지 확인
    if (language !== 'ko') {
      const langData = animalInfo[language];
      if (langData && typeof langData === 'object') {
        const typedLangData = langData as AnimalLanguageData;
        if (field in typedLangData) {
          value = typedLangData[field] as string;
          console.log(`[AnimalFaceTest] Using translated ${field} for ${animalType} in ${language}:`, value);
        } else {
          console.warn(`[AnimalFaceTest] Missing translation for field '${field}' in language '${language}' for animal type '${animalType}'`);
        }
      } else {
        console.warn(`[AnimalFaceTest] No translation data found for language '${language}' for animal type '${animalType}'`);
      }
    }
    
    return value;
  };

  // 차트 데이터 생성
  const getChartData = () => {
    if (!result?.predictions) return null;
    
    // 각 동물상 타입에 대한 현재 언어의 번역 이름 가져오기
    const getLocalizedAnimalName = (animalType: string): string => {
      const koreanType = getAnimalTypeInKorean(animalType);
      
      // 현재 언어가 한국어면 한글 이름 그대로 사용
      if (language === 'ko') {
        return koreanType;
      }
      
      // 영어 동물 이름 매핑
      const englishNames: Record<string, string> = {
        '강아지상': 'Dog',
        '고양이상': 'Cat',
        '토끼상': 'Rabbit',
        '공룡상': 'Dinosaur',
        '곰상': 'Bear',
        '사슴상': 'Deer',
        '여우상': 'Fox',
        '원숭이상': 'Monkey',
        '알 수 없는 동물상': 'Unknown'
      };
      
      // 일본어 동물 이름 매핑
      const japaneseNames: Record<string, string> = {
        '강아지상': '犬顔',
        '고양이상': '猫顔',
        '토끼상': 'ウサギ顔',
        '공룡상': '恐竜顔',
        '곰상': 'クマ顔',
        '사슴상': '鹿顔',
        '여우상': 'キツネ顔',
        '원숭이상': 'サル顔',
        '알 수 없는 동물상': '不明な動物顔'
      };
      
      // 중국어 동물 이름 매핑
      const chineseNames: Record<string, string> = {
        '강아지상': '狗脸',
        '고양이상': '猫脸',
        '토끼상': '兔子脸',
        '공룡상': '恐龙脸',
        '곰상': '熊脸',
        '사슴상': '鹿脸',
        '여우상': '狐狸脸',
        '원숭이상': '猴子脸',
        '알 수 없는 동물상': '未知动物脸'
      };
      
      // 인도네시아어 동물 이름 매핑
      const indonesianNames: Record<string, string> = {
        '강아지상': 'Wajah Anjing',
        '고양이상': 'Wajah Kucing',
        '토끼상': 'Wajah Kelinci',
        '공룡상': 'Wajah Dinosaurus',
        '곰상': 'Wajah Beruang',
        '사슴상': 'Wajah Rusa',
        '여우상': 'Wajah Rubah',
        '원숭이상': 'Wajah Monyet',
        '알 수 없는 동물상': 'Wajah Hewan Tidak Dikenal'
      };
      
      // 태국어 동물 이름 매핑
      const thaiNames: Record<string, string> = {
        '강아지상': 'หน้าสุนัข',
        '고양이상': 'หน้าแมว',
        '토끼상': 'หน้ากระต่าย',
        '공룡상': 'หน้าไดโนเสาร์',
        '곰상': 'หน้าหมี',
        '사슴상': 'หน้ากวาง',
        '여우상': 'หน้าจิ้งจอก',
        '원숭이상': 'หน้าลิง',
        '알 수 없는 동물상': 'หน้าสัตว์ที่ไม่รู้จัก'
      };
      
      // 베트남어 동물 이름 매핑
      const vietnameseNames: Record<string, string> = {
        '강아지상': 'Mặt Chó',
        '고양이상': 'Mặt Mèo',
        '토끼상': 'Mặt Thỏ',
        '공룡상': 'Mặt Khủng Long',
        '곰상': 'Mặt Gấu',
        '사슴상': 'Mặt Hươu',
        '여우상': 'Mặt Cáo',
        '원숭이상': 'Mặt Khỉ',
        '알 수 없는 동물상': 'Mặt Động Vật Không Xác Định'
      };
      
      // 현재 언어에 맞는 이름 매핑 선택
      let nameMap: Record<string, string>;
      switch (language) {
        case 'en': nameMap = englishNames; break;
        case 'ja': nameMap = japaneseNames; break;
        case 'zh': nameMap = chineseNames; break;
        case 'id': nameMap = indonesianNames; break;
        case 'th': nameMap = thaiNames; break;
        case 'vi': nameMap = vietnameseNames; break;
        default: nameMap = englishNames; // 기본값은 영어
      }
      
      return nameMap[koreanType] || koreanType;
    };
    
    return {
      labels: result.predictions.map((p: ModelPrediction) => getLocalizedAnimalName(p.className)),
      datasets: [
        {
          label: t.animalResult,
          data: result.predictions.map((p: ModelPrediction) => (p.probability * 100).toFixed(1)),
          backgroundColor: 'rgba(147, 51, 234, 0.5)',
          borderColor: 'rgb(147, 51, 234)',
          borderWidth: 1
        }
      ]
    };
  };

  // 동물상 궁합 정보
  const getAnimalCompatibility = (animalType: string) => {
    // 영어 동물상을 한글로 변환
    const koreanAnimalType = getAnimalTypeInKorean(animalType);
    
    const compatibilityData: Record<string, { best: string[], good: string[], description: string }> = {
      '강아지상': {
        best: ['고양이상', '토끼상'],
        good: ['곰상'],
        description: '강아지상은 고양이상, 토끼상과 최고의 궁합을 이룹니다.'
      },
      '고양이상': {
        best: ['강아지상', '여우상'],
        good: ['원숭이상'],
        description: '고양이상은 강아지상, 여우상과 최고의 궁합을 이룹니다.'
      }
    };
    
    return compatibilityData[koreanAnimalType] || {
      best: ['모든 동물상'],
      good: ['모든 동물상'],
      description: '모든 동물상과 좋은 관계를 형성할 수 있습니다.'
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {t.animalTestTitle}
          </DialogTitle>
        </DialogHeader>

        {currentStep === 'upload' && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t.uploadImage}
              </h3>
              <p className="text-gray-600">
                {t.animalTestDesc}
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => document.getElementById('animalImageInput')?.click()}
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isUploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {t.uploadImage}
              </Button>
              <Button
                variant="outline"
                onClick={initCamera}
              >
                <Camera className="w-4 h-4 mr-2" />
                {t.takePhoto}
              </Button>
            </div>

            <input
              id="animalImageInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />

            {imageUrl && (
              <div className="text-center">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="max-w-md mx-auto rounded-lg shadow-lg"
                />
                <Button
                  onClick={handleAnalyze}
                  className="mt-4 bg-primary hover:bg-primary/90"
                  disabled={isAnalyzing || !modelLoaded}
                >
                  {isAnalyzing ? (
                    <>
                      <LoadingSpinner className="mr-2" />
                      {t.analyzing}
                    </>
                  ) : !modelLoaded ? (
                    <>
                      <LoadingSpinner className="mr-2" />
                      {t.loadingAIModel}
                    </>
                  ) : (
                    t.start
                  )}
                </Button>
                {!modelLoaded && (
                  <p className="text-sm text-gray-500 mt-2">
                    {t.loadingAIModel}
                  </p>
                )}
              </div>
            )}

            {uploadError && (
              <div className="text-center text-red-500">
                {uploadError}
              </div>
            )}
          </div>
        )}

        {currentStep === 'camera' && (
          <div className="camera-container">
            <div className="camera-preview">
              <video ref={videoRef} className="camera-video" autoPlay playsInline></video>
              <canvas ref={canvasRef} className="camera-canvas"></canvas>
            </div>
            
            <img ref={photoRef} className="camera-photo" alt={t.capturedPhoto} />
            
            <select id="cameraSelect" className="camera-select mt-4"></select>
            
            <div className="camera-controls">
              <button id="startCameraButton" className="camera-button">
                {t.startCamera}
              </button>
              <button id="captureCameraButton" className="camera-button capture">
                {t.takePhoto}
              </button>
              <button id="switchCameraButton" className="camera-button switch">
                {t.switchCamera}
              </button>
              <Button onClick={() => setCurrentStep('upload')} variant="outline">
                {t.previous}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'analyzing' && (
          <div className="text-center py-12">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t.analyzing}
            </h3>
            <p className="text-gray-600">
              {t.loading}
            </p>
          </div>
        )}

        {currentStep === 'result' && result && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t.animalResult}: <span className="text-purple-600">{getChartData()?.labels[0]}</span>
              </h3>
              <p className="text-gray-600">
                {t.personalityAnalysis}: {result.confidence.toFixed(1)}%
              </p>
              {/* 디버깅 정보 (개발 모드에서만 표시) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-2 p-2 bg-gray-100 rounded text-xs text-left">
                  <p><strong>원본 타입:</strong> {result.animalType}</p>
                  <p><strong>한글 타입:</strong> {getAnimalTypeInKorean(result.animalType)}</p>
                  <p><strong>모든 예측:</strong> 
                    {result.predictions.map(p => 
                      `${getAnimalTypeInKorean(p.className)}(${(p.probability * 100).toFixed(1)}%) `
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{t.result}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <img
                        src={imageUrl}
                        alt="Uploaded"
                        className="max-w-full rounded-lg shadow-sm mx-auto"
                      />
                    </div>
                    <ResultChart data={getChartData()} />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{getChartData()?.labels[0]} {t.traits}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900">{t.personalityAnalysis}</h4>
                        <p className="text-gray-600">
                          {result.personality || getAnimalInfo(result.animalType, 'personality')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{t.traits}</h4>
                        <p className="text-gray-600">
                          {result.charm || getAnimalInfo(result.animalType, 'charm')}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{t.description}</h4>
                        <p className="text-gray-600">
                          {result.dating || getAnimalInfo(result.animalType, 'dating')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={handleReset} variant="outline">
                {t.restart}
              </Button>
              <Button onClick={handleShare} className="bg-purple-600 hover:bg-purple-700">
                <Share2 className="w-4 h-4 mr-2" />
                {t.share}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
