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

// 카메라 캡처 타입 정의
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
  const modelURL = '/PalmReading/attached_assets/model_1752161703239.json';
  const metadataURL = '/PalmReading/attached_assets/metadata_1752161703239.json';
  
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
        
        if (predictions && predictions.length > 0) {
          // 가장 높은 확률의 예측 찾기
          const topPrediction = predictions.reduce((max, pred) => 
            pred.probability > max.probability ? pred : max, predictions[0]);
          
          const animalType = topPrediction.className;
          const confidence = topPrediction.probability * 100;
          
          // 동물상에 따른 성격 정보 가져오기
          const animalInfo = ANIMAL_PERSONALITIES[animalType as keyof typeof ANIMAL_PERSONALITIES] || {
            traits: ['특징 정보 없음'],
            description: '정보가 없습니다',
            personality: '성격 정보가 없습니다',
            charm: '매력 정보가 없습니다',
            dating: '연애 정보가 없습니다'
          };
          
          // 결과 설정
          setResult({
            animalType,
            confidence,
            personality: animalInfo.personality,
            charm: animalInfo.charm,
            dating: animalInfo.dating,
            traits: animalInfo.traits,
            predictions
          });
          
          setCurrentStep('result');
        }
      }
    } catch (error) {
      console.error('Analysis error:', error);
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
    
    const shareText = `내 동물상 결과: ${result.animalType} (${result.confidence.toFixed(1)}%)\n${window.location.href}`;
    
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

  // 차트 데이터 생성
  const getChartData = () => {
    if (!result?.predictions) return null;
    
    return {
      labels: result.predictions.map((p: ModelPrediction) => p.className),
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
    const compatibilityData: Record<string, { best: string[], good: string[], description: string }> = {
      강아지상: {
        best: ['고양이상', '토끼상'],
        good: ['곰상'],
        description: '강아지상은 고양이상, 토끼상과 최고의 궁합을 이룹니다.'
      },
      고양이상: {
        best: ['강아지상', '여우상'],
        good: ['원숭이상'],
        description: '고양이상은 강아지상, 여우상과 최고의 궁합을 이룹니다.'
      }
    };
    
    return compatibilityData[animalType] || {
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
                {t.animalResult}: <span className="text-purple-600">{result.animalType}</span>
              </h3>
              <p className="text-gray-600">
                {t.personalityAnalysis}: {result.confidence.toFixed(1)}%
              </p>
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
                    <CardTitle>{result.animalType} {t.traits}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900">{t.personalityAnalysis}</h4>
                        <p className="text-gray-600">
                          {language === 'en' && ANIMAL_PERSONALITIES[result.animalType as keyof typeof ANIMAL_PERSONALITIES]?.en?.personality
                            ? ANIMAL_PERSONALITIES[result.animalType as keyof typeof ANIMAL_PERSONALITIES].en.personality
                            : result.personality}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{t.traits}</h4>
                        <p className="text-gray-600">
                          {language === 'en' && ANIMAL_PERSONALITIES[result.animalType as keyof typeof ANIMAL_PERSONALITIES]?.en?.charm
                            ? ANIMAL_PERSONALITIES[result.animalType as keyof typeof ANIMAL_PERSONALITIES].en.charm
                            : result.charm}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{t.description}</h4>
                        <p className="text-gray-600">
                          {language === 'en' && ANIMAL_PERSONALITIES[result.animalType as keyof typeof ANIMAL_PERSONALITIES]?.en?.dating
                            ? ANIMAL_PERSONALITIES[result.animalType as keyof typeof ANIMAL_PERSONALITIES].en.dating
                            : result.dating}
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
