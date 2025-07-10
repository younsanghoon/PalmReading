import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ResultChart } from "@/components/ui/result-chart";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useTeachableMachine } from "@/hooks/use-teachable-machine";
import { ANIMAL_PERSONALITIES } from "@/lib/personality-data";
import { Camera, Upload, Share2, RotateCcw, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnimalFaceTestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AnimalFaceTest({ open, onOpenChange }: AnimalFaceTestProps) {
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
    predictAnimal, 
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
    
    const predictions = await predictAnimal(imageElement);
    if (predictions) {
      // Find the highest probability result
      const topPrediction = predictions.reduce((max, pred) => 
        pred.probability > max.probability ? pred : max
      );
      
      const animalType = topPrediction.className;
      const personality = ANIMAL_PERSONALITIES[animalType as keyof typeof ANIMAL_PERSONALITIES];
      
      setResult({
        animalType,
        confidence: topPrediction.probability * 100,
        predictions,
        ...personality
      });
      
      // Save to localStorage
      const results = JSON.parse(localStorage.getItem('personalityResults') || '{}');
      results.animal = {
        result: animalType,
        confidence: topPrediction.probability * 100,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('personalityResults', JSON.stringify(results));
      
      setCurrentStep('result');
    } else {
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
          title: 'AI 동물상 분석 결과',
          text: `나의 동물상은 ${result.animalType}입니다!`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Sharing failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 클립보드에 복사되었습니다!');
      } catch (err) {
        console.log('Copy failed:', err);
      }
    }
  };

  const getChartData = () => {
    if (!result?.predictions) return null;
    
    return {
      labels: result.predictions.map((p: any) => p.className),
      datasets: [{
        label: '확률 (%)',
        data: result.predictions.map((p: any) => (p.probability * 100).toFixed(1)),
        backgroundColor: [
          '#6366f1', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#f97316'
        ],
        borderWidth: 1
      }]
    };
  };

  const getAnimalCompatibility = (animalType: string) => {
    const compatibilityData: Record<string, { best: string[], good: string[], description: string }> = {
      '강아지상': {
        best: ['고양이상', '곰상', 'ESFJ', 'ISFJ', '에겐남', '에겐녀'],
        good: ['토끼상', '여우상', 'ENFP', 'ESFP', '테토남', '테토녀'],
        description: '강아지상은 충성스럽고 친근한 성격으로 안정적이고 따뜻한 상대와 잘 어울립니다.'
      },
      '고양이상': {
        best: ['강아지상', '여우상', 'INFJ', 'INTJ', '테토남', '테토녀'],
        good: ['곰상', '원숭이상', 'ISFP', 'INFP', '에겐남', '에겐녀'],
        description: '고양이상은 독립적이고 신비로운 매력으로 이해심 깊은 상대와 깊은 유대를 형성합니다.'
      },
      '곰상': {
        best: ['토끼상', '강아지상', 'ISFJ', 'ESFJ', '테토남', '테토녀'],
        good: ['고양이상', '여우상', 'INFP', 'ENFP', '에겐남', '에겐녀'],
        description: '곰상은 든든하고 포용력 있는 성격으로 순수하고 따뜻한 마음과 조화를 이룹니다.'
      },
      '여우상': {
        best: ['원숭이상', '고양이상', 'ENTP', 'ENFJ', '에겐남', '에겐녀'],
        good: ['강아지상', '곰상', 'INTJ', 'INFJ', '테토남', '테토녀'],
        description: '여우상은 영리하고 매혹적인 매력으로 창의적이고 지적인 상대와 흥미로운 관계를 만듭니다.'
      },
      '원숭이상': {
        best: ['여우상', '토끼상', 'ENFP', 'ESFP', '에겐남', '에겐녀'],
        good: ['강아지상', '고양이상', 'ENTP', 'ESTP', '테토남', '테토녀'],
        description: '원숭이상은 재미있고 창의적인 성격으로 활발하고 유머러스한 상대와 즐거운 시간을 보냅니다.'
      },
      '토끼상': {
        best: ['곰상', '원숭이상', 'ISFP', 'INFP', '테토남', '테토녀'],
        good: ['강아지상', '고양이상', 'ISFJ', 'ESFJ', '에겐남', '에겐녀'],
        description: '토끼상은 온순하고 섬세한 성격으로 보호받을 수 있는 안전한 관계를 선호합니다.'
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
            동물상 AI 분석
          </DialogTitle>
        </DialogHeader>

        {currentStep === 'upload' && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                얼굴 사진을 업로드하세요
              </h3>
              <p className="text-gray-600">
                정면을 바라보는 깔끔한 사진을 업로드하면 더 정확한 분석이 가능합니다.
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={() => document.getElementById('animalImageInput')?.click()}
                className="bg-purple-600 hover:bg-purple-700"
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
            <LoadingSpinner className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              AI가 분석 중입니다...
            </h3>
            <p className="text-gray-600">잠시만 기다려 주세요.</p>
          </div>
        )}

        {currentStep === 'result' && result && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🐾</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                당신의 동물상은...
              </h3>
              <div className="bg-purple-50 rounded-2xl p-6 mb-6">
                <h4 className="text-3xl font-bold text-purple-600 mb-2">
                  {result.animalType}
                </h4>
                <p className="text-lg text-gray-700 mb-4">
                  {result.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {result.traits.map((trait: string, index: number) => (
                    <span
                      key={index}
                      className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {getChartData() && (
              <div className="mb-6">
                <ResultChart
                  data={getChartData()}
                  type="bar"
                  title="동물상 확률 분석"
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
                  const compatibility = getAnimalCompatibility(result.animalType);
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
