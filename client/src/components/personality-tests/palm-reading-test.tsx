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

interface PalmReadingTestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PalmReadingTest({ open, onOpenChange }: PalmReadingTestProps) {
  const [currentStep, setCurrentStep] = useState<'upload' | 'camera' | 'analyzing' | 'result'>('upload');
  const [result, setResult] = useState<any>(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  
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
      
      cameraInstanceRef.current = new window.CameraCapture({
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
      });
      
      cameraInstanceRef.current.initialize();
      cameraInstanceRef.current.startCamera();
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
    if (!imageElement) return;

    setCurrentStep('analyzing');
    
    try {
      // predictPalm 함수 사용
      const predictions = await predictPalm(imageElement);
      
      // Process palm reading results
      const palmResult = {
        lifeLine: '강한 생명력과 건강한 체력을 나타냅니다.',
        heartLine: '감정이 풍부하고 타인에 대한 배려가 깊습니다.',
        headLine: '분석적 사고와 창의력이 뛰어납니다.',
        fateLine: '목표 지향적이며 성취욕이 강합니다.',
        abilityLine: '특별한 재능과 잠재력을 가지고 있습니다.',
        overall: '전반적으로 균형 잡힌 성격으로 다양한 분야에서 성공할 수 있는 잠재력을 가지고 있습니다.',
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
      alert('손금 분석에 실패했습니다. 다시 시도해 주세요.');
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
          title: 'AI 손금 분석 결과',
          text: '나의 손금 분석 결과를 확인해보세요!',
          url: window.location.href
        });
      } catch (err) {
        console.log('Sharing failed:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      } catch (err) {
        console.log('Copy failed:', err);
      }
    }
  };

  const getChartData = () => {
    if (!result) return null;
    
    return {
      labels: ['생명선', '감정선', '지능선', '운명선', '능력선'],
      datasets: [{
        label: '특성 점수',
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
      description: '손금 분석에 따르면 균형잡힌 성격으로 많은 유형과 좋은 관계를 형성할 수 있습니다. 특히 안정적이고 신뢰할 수 있는 상대와 깊은 유대를 형성하며, 감정적으로 성숙한 관계를 선호합니다.'
    };
    return compatibility;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            AI 손금 분석
          </DialogTitle>
        </DialogHeader>

        {currentStep === 'upload' && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                손바닥 사진을 업로드하세요
              </h3>
              <p className="text-gray-600">
                손바닥을 편 상태로 선명하게 촬영해 주세요. 손금이 잘 보이도록 조명을 밝게 해주세요.
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => document.getElementById('palmImageInput')?.click()}
                className="bg-amber-600 hover:bg-amber-700"
                disabled={isUploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                사진 업로드
              </Button>
              <Button
                variant="outline"
                onClick={initCamera}
              >
                <Camera className="w-4 h-4 mr-2" />
                사진 촬영
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
                      분석 중...
                    </>
                  ) : !modelLoaded ? (
                    <>
                      <LoadingSpinner className="mr-2" />
                      모델 로딩 중...
                    </>
                  ) : (
                    "분석 시작하기"
                  )}
                </Button>
                {!modelLoaded && (
                  <p className="text-sm text-gray-500 mt-2">AI 모델을 로드하는 중입니다. 잠시만 기다려주세요.</p>
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
            
            <img ref={photoRef} className="camera-photo" alt="촬영된 사진" />
            
            <select id="cameraSelect" className="camera-select mt-4"></select>
            
            <div className="camera-controls">
              <button id="startCameraButton" className="camera-button">카메라 시작</button>
              <button id="captureCameraButton" className="camera-button capture">사진 촬영</button>
              <button id="switchCameraButton" className="camera-button switch">카메라 전환</button>
              <Button onClick={() => setCurrentStep('upload')} variant="outline">
                뒤로 가기
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'analyzing' && (
          <div className="text-center py-12">
            <LoadingSpinner className="mx-auto mb-4 w-16 h-16" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              AI가 당신의 손금을 분석하고 있습니다
            </h3>
            <p className="text-gray-600">
              잠시만 기다려주세요...
            </p>
          </div>
        )}

        {currentStep === 'result' && result && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                손금 분석 결과
              </h3>
              <p className="text-gray-600">
                {result.overall}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>손금 이미지</CardTitle>
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
                    <CardTitle>손금 분석</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-900">생명선</h4>
                        <p className="text-gray-600">{result.lifeLine}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">감정선</h4>
                        <p className="text-gray-600">{result.heartLine}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">지능선</h4>
                        <p className="text-gray-600">{result.headLine}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">운명선</h4>
                        <p className="text-gray-600">{result.fateLine}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">능력선</h4>
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
                결과 공유하기
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                다시 시도하기
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
