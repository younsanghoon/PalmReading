import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ResultChart } from "@/components/ui/result-chart";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useTeachableMachine } from "@/hooks/use-teachable-machine";
import { Camera, Upload, Share2, RotateCcw, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PalmReadingTestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PalmReadingTest({ open, onOpenChange }: PalmReadingTestProps) {
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [result, setResult] = useState<any>(null);
  
  const { 
    imageUrl, 
    uploadImage, 
    clearImage, 
    createImageElement,
    isUploading,
    error: uploadError 
  } = useImageUpload();
  
  const { 
    predictPalm, 
    isLoading: isAnalyzing, 
    error: analysisError 
  } = useTeachableMachine();

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
    
    const predictions = await predictPalm(imageElement);
    if (predictions && Object.keys(predictions).length > 0) {
      
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
    } else {
      alert('손금 분석에 실패했습니다. 다시 시도해 주세요.');
      setCurrentStep('upload');
    }
  };

  const handleReset = () => {
    setCurrentStep('upload');
    setResult(null);
    clearImage();
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
                onClick={() => alert('웹캠 기능은 준비 중입니다.')}
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
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <LoadingSpinner className="w-4 h-4 mr-2" />
                      분석 중...
                    </>
                  ) : (
                    '분석 시작하기'
                  )}
                </Button>
              </div>
            )}

            {(uploadError || analysisError) && (
              <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
                {uploadError || analysisError}
              </div>
            )}
          </div>
        )}

        {currentStep === 'analyzing' && (
          <div className="text-center py-12">
            <LoadingSpinner className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              AI가 손금을 분석 중입니다...
            </h3>
            <p className="text-gray-600">
              생명선, 감정선, 지능선, 운명선을 종합적으로 분석하고 있습니다.
            </p>
          </div>
        )}

        {currentStep === 'result' && result && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                손금 분석 결과
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-amber-50 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-amber-700 mb-2">생명선</h4>
                  <p className="text-gray-700">{result.lifeLine}</p>
                </div>
                <div className="bg-pink-50 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-pink-700 mb-2">감정선</h4>
                  <p className="text-gray-700">{result.heartLine}</p>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-blue-700 mb-2">지능선</h4>
                  <p className="text-gray-700">{result.headLine}</p>
                </div>
                <div className="bg-green-50 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-green-700 mb-2">운명선</h4>
                  <p className="text-gray-700">{result.fateLine}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-6">
                <h4 className="text-lg font-bold text-amber-700 mb-2">종합 분석</h4>
                <p className="text-gray-700">{result.overall}</p>
              </div>
            </div>

            {getChartData() && (
              <div className="mb-6">
                <ResultChart
                  data={getChartData()}
                  type="radar"
                  title="손금 특성 분석"
                  className="h-64"
                />
              </div>
            )}

            {/* 궁합 분석 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  궁합 분석
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const compatibility = getPalmCompatibility();
                  return (
                    <div className="space-y-4">
                      <p className="text-gray-700 dark:text-gray-300">
                        {compatibility.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">최고 궁합</h4>
                          <div className="space-y-1">
                            {compatibility.best.map((type, index) => (
                              <span key={index} className="block px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-sm">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-blue-600 mb-2">좋은 궁합</h4>
                          <div className="space-y-1">
                            {compatibility.good.map((type, index) => (
                              <span key={index} className="block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={handleShare}
                className="bg-secondary hover:bg-secondary/90"
              >
                <Share2 className="w-4 h-4 mr-2" />
                결과 공유하기
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                다시 테스트
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
