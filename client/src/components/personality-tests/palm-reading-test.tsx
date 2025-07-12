import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ResultChart } from "@/components/ui/result-chart";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useTeachableMachine } from "@/hooks/use-teachable-machine";
import { Camera, Upload, Share2, RotateCcw, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { predictPalmReading } from "@/lib/ai-models";
import { useLanguage } from "@/lib/i18n";

interface PalmReadingTestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PalmReadingTest({ open, onOpenChange }: PalmReadingTestProps) {
  const [currentStep, setCurrentStep] = useState<'upload' | 'camera' | 'analyzing' | 'result'>('upload');
  const [result, setResult] = useState<any>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const { t, language } = useLanguage();
  
  // 카메라 관련 상태 및 참조
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const cameraInstanceRef = useRef<any>(null);
  
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
  const modelURL = '/attached_assets/model.json';
  const metadataURL = '/attached_assets/metadata.json';
  
  const { 
    isLoading: isAnalyzing, 
    error: analysisError,
    model,
    predictPalm
  } = useTeachableMachine({ modelURL, metadataURL });

  // 언어 변경 이벤트 리스너
  useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      console.log('[PalmReadingTest] Language change detected', (event as CustomEvent).detail);
      // 결과가 있는 경우 결과 텍스트 업데이트
      if (result) {
        // 언어에 따른 결과 텍스트 업데이트 로직
        const updatedResult = {
          ...result,
          // 필요한 경우 언어별 텍스트 업데이트
        };
        setResult(updatedResult);
      }
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [result]);

  // 모델 로드 상태 체크
  useEffect(() => {
    if (model) {
      console.log('[PalmReadingTest] Model loaded successfully');
      setModelLoaded(true);
    }
  }, [model]);

  // 카메라 스크립트 로드
  useEffect(() => {
    // 스크립트가 이미 로드되었는지 확인
    if (!document.getElementById('camera-capture-script')) {
      // CSS 로드
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/camera-capture.css';
      document.head.appendChild(link);
      
      // JS 로드
      const script = document.createElement('script');
      script.id = 'camera-capture-script';
      script.src = '/camera-capture.js';
      script.async = true;
      document.body.appendChild(script);
    }
    
    // 컴포넌트 언마운트 시 리소스 정리
    return () => {
      if (cameraInstanceRef.current) {
        cameraInstanceRef.current.dispose();
        cameraInstanceRef.current = null;
      }
    };
  }, []);

  // 카메라 초기화
  const initCamera = () => {
    setCurrentStep('camera');
    
    // 다음 렌더링 사이클에서 카메라 초기화
    setTimeout(() => {
      if (!window.CameraCapture) {
        console.error('카메라 스크립트가 로드되지 않았습니다.');
        return;
      }
      
      if (cameraInstanceRef.current) {
        cameraInstanceRef.current.dispose();
      }
      
      // 카메라 요소가 모두 존재하는지 확인
      if (!videoRef.current || !canvasRef.current || !photoRef.current) {
        console.error('카메라 요소가 준비되지 않았습니다.');
        return;
      }
      
      try {
        // 타입 캐스팅을 사용하여 타입 오류 해결
        const options = {
          videoElement: videoRef.current,
          canvasElement: canvasRef.current,
          photoElement: photoRef.current,
          startButton: document.getElementById('startCameraButton') as HTMLButtonElement | null,
          captureButton: document.getElementById('captureCameraButton') as HTMLButtonElement | null,
          switchButton: document.getElementById('switchCameraButton') as HTMLButtonElement | null,
          cameraSelect: document.getElementById('cameraSelect') as HTMLSelectElement | null,
          onPhotoCapture: (dataUrl: string) => {
            setImageUrl(dataUrl);
            // 카메라 모드 종료 후 분석 단계로 이동
            setTimeout(() => {
              setCurrentStep('upload');
            }, 500);
          }
        };
        
        cameraInstanceRef.current = new window.CameraCapture(options as any);
        cameraInstanceRef.current.initialize();
        cameraInstanceRef.current.startCamera();
      } catch (error) {
        console.error('카메라 초기화 오류:', error);
        setCurrentStep('upload');
      }
    }, 100);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  };

  const handleAnalyze = async () => {
    const imageElement = await createImageElement();
    if (!imageElement) {
      alert(t.imageRequired);
      return;
    }

    setCurrentStep('analyzing');
    
    try {
      // predictPalm 함수 사용
      const predictions = await predictPalm(imageElement);
      
      // Process palm reading results
      const palmResult = {
        lifeLine: language === 'ko' ? '강한 생명력과 건강한 체력을 나타냅니다.' : 'Shows strong vitality and healthy physical strength.',
        heartLine: language === 'ko' ? '감정이 풍부하고 타인에 대한 배려가 깊습니다.' : 'Rich in emotions and deeply considerate of others.',
        headLine: language === 'ko' ? '분석적 사고와 창의력이 뛰어납니다.' : 'Excellent analytical thinking and creativity.',
        fateLine: language === 'ko' ? '목표 지향적이며 성취욕이 강합니다.' : 'Goal-oriented with strong desire for achievement.',
        abilityLine: language === 'ko' ? '특별한 재능과 잠재력을 가지고 있습니다.' : 'Has special talents and potential.',
        overall: language === 'ko' 
          ? '전반적으로 균형 잡힌 성격으로 다양한 분야에서 성공할 수 있는 잠재력을 가지고 있습니다.' 
          : 'Overall, you have a balanced personality with the potential to succeed in various fields.',
        predictions
      };
      
      setResult(palmResult);
      
      // Save to localStorage
      const results = JSON.parse(localStorage.getItem('personalityResults') || '{}');
      results.palm = {
        result: 'palm_analysis',
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('personalityResults', JSON.stringify(results));
      
      setCurrentStep('result');
    } catch (error) {
      console.error('[PalmReadingTest] Analysis error:', error);
      alert(t.analysisError);
      setCurrentStep('upload');
    }
  };

  const handleReset = () => {
    setCurrentStep('upload');
    setResult(null);
    clearImage();
    
    // 카메라 인스턴스 정리
    if (cameraInstanceRef.current) {
      cameraInstanceRef.current.dispose();
      cameraInstanceRef.current = null;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: language === 'ko' ? 'AI 손금 분석 결과' : 'AI Palm Reading Results',
          text: language === 'ko' ? '나의 손금 분석 결과를 확인해보세요!' : 'Check out my palm reading results!',
          url: window.location.href
        });
      } catch (err) {
        console.log('Sharing failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert(language === 'ko' ? '링크가 클립보드에 복사되었습니다!' : 'Link copied to clipboard!');
      } catch (err) {
        console.log('Copy failed:', err);
      }
    }
  };

  const getChartData = () => {
    if (!result) return null;
    
    return {
      labels: [t.lifeLine, t.heartLine, t.headLine, t.fateLine, t.abilityLine],
      datasets: [{
        label: language === 'ko' ? '특성 점수' : 'Feature Score',
        data: [85, 92, 78, 88, 75], // Mock data for demonstration
        backgroundColor: [
          '#f59e0b', '#ec4899', '#6366f1', '#10b981', '#8b5cf6'
        ],
        borderWidth: 1
      }]
    };
  };

  const getPalmCompatibility = () => {
    const compatibility = {
      best: ['곰상', '강아지상', 'ISFJ', 'ESFJ', '에겐남', '에겐녀'],
      good: ['고양이상', '토끼상', 'INFP', 'ENFP', '테토남', '테토녀'],
      description: language === 'ko' 
        ? '손금 분석에 따르면 균형잡힌 성격으로 많은 유형과 좋은 관계를 형성할 수 있습니다. 특히 안정적이고 신뢰할 수 있는 상대와 깊은 유대를 형성하며, 감정적으로 성숙한 관계를 선호합니다.'
        : 'According to palm analysis, you have a balanced personality that can form good relationships with many types. You especially form deep bonds with stable and reliable partners, and prefer emotionally mature relationships.'
    };
    return compatibility;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {t.palmTestTitle}
          </DialogTitle>
        </DialogHeader>

        {currentStep === 'upload' && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t.uploadPalmImage}
              </h3>
              <p className="text-gray-600">
                {t.palmImageInstructions}
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => document.getElementById('palmImageInput')?.click()}
                className="bg-amber-600 hover:bg-amber-700"
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
              id="palmImageInput"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />

            {imageUrl && (
              <div className="text-center">
                <img
                  src={imageUrl}
                  alt="Uploaded palm"
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
                      {t.loading}
                    </>
                  ) : (
                    t.start
                  )}
                </Button>
                {!modelLoaded && (
                  <p className="text-sm text-gray-500 mt-2">
                    {language === 'ko' 
                      ? 'AI 모델을 로드하는 중입니다. 잠시만 기다려주세요.'
                      : 'Loading AI model. Please wait a moment.'}
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
            
            <img ref={photoRef} className="camera-photo" alt={language === 'ko' ? '촬영된 사진' : 'Captured photo'} />
            
            <select id="cameraSelect" className="camera-select mt-4"></select>
            
            <div className="camera-controls">
              <button id="startCameraButton" className="camera-button">
                {language === 'ko' ? '카메라 시작' : 'Start Camera'}
              </button>
              <button id="captureCameraButton" className="camera-button capture">
                {language === 'ko' ? '사진 촬영' : 'Take Photo'}
              </button>
              <button id="switchCameraButton" className="camera-button switch">
                {language === 'ko' ? '카메라 전환' : 'Switch Camera'}
              </button>
              <Button onClick={() => setCurrentStep('upload')} variant="outline">
                {t.previous}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'analyzing' && (
          <div className="text-center py-12">
            <LoadingSpinner className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'ko' 
                ? 'AI가 당신의 손금을 분석하고 있습니다'
                : 'AI is analyzing your palm lines'}
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
                {t.palmAnalysis}
              </h3>
              <p className="text-gray-600">
                {result.overall}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'ko' ? '손금 이미지' : 'Palm Image'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={imageUrl}
                      alt="Uploaded palm"
                      className="max-w-full rounded-lg shadow-sm"
                    />
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{t.palmAnalysis}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900">{t.lifeLine}</h4>
                        <p className="text-gray-600">{result.lifeLine}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{t.heartLine}</h4>
                        <p className="text-gray-600">{result.heartLine}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{t.headLine}</h4>
                        <p className="text-gray-600">{result.headLine}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{t.fateLine}</h4>
                        <p className="text-gray-600">{result.fateLine}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{t.abilityLine}</h4>
                        <p className="text-gray-600">{result.abilityLine}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={handleShare}
                variant="outline"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {t.share}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {t.restart}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
