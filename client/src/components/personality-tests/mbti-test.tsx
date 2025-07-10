import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ResultChart } from "@/components/ui/result-chart";
import { getRandomMBTIQuestions, calculateMBTI, MBTI_TYPES } from "@/lib/personality-data";
import { Question } from "@/types/personality";
import { ChevronLeft, ChevronRight, Share2, RotateCcw, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";

interface MBTITestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MBTITest({ open, onOpenChange }: MBTITestProps) {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>([]);

  // 테스트 시작/재시작 시 질문 랜덤화 함수
  const generateRandomQuestions = () => {
    const questions = getRandomMBTIQuestions();
    return questions.map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5)
    }));
  };

  // 컴포넌트 초기화 또는 다이얼로그가 열릴 때 질문 생성
  useEffect(() => {
    if (open) {
      // 다이얼로그가 열릴 때마다 완전히 새로운 질문 세트 생성
      setCurrentQuestion(0);
      setAnswers([]);
      setCurrentAnswer('');
      setResult(null);
      setShowResult(false);
      setRandomizedQuestions(generateRandomQuestions());
    }
  }, [open]);

  // 질문이 없을 때 초기화
  useEffect(() => {
    if (randomizedQuestions.length === 0) {
      setRandomizedQuestions(generateRandomQuestions());
    }
  }, []);

  const handleAnswerChange = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = currentAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < randomizedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer(newAnswers[currentQuestion + 1] || '');
    } else {
      // Calculate result
      const mbtiResult = calculateMBTI(newAnswers);
      setResult(mbtiResult);
      
      // Save to localStorage
      const results = JSON.parse(localStorage.getItem('personalityResults') || '{}');
      results.mbti = {
        result: mbtiResult.type,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('personalityResults', JSON.stringify(results));
      
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setCurrentAnswer(answers[currentQuestion - 1] || '');
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setCurrentAnswer('');
    setResult(null);
    setShowResult(false);
    // 완전히 새로운 랜덤 질문 세트 생성
    setRandomizedQuestions(generateRandomQuestions());
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MBTI 성격 테스트 결과',
          text: `나의 MBTI는 ${result.type}(${MBTI_TYPES[result.type as keyof typeof MBTI_TYPES]?.name})입니다!`,
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
    if (!result?.dimensions) return null;
    
    return {
      labels: ['외향성(E)', '내향성(I)', '감각형(S)', '직관형(N)', '사고형(T)', '감정형(F)', '판단형(J)', '인식형(P)'],
      datasets: [{
        label: '성향 점수',
        data: [
          result.dimensions.E_I > 0 ? Math.abs(result.dimensions.E_I) * 25 : 0,
          result.dimensions.E_I < 0 ? Math.abs(result.dimensions.E_I) * 25 : 0,
          result.dimensions.S_N > 0 ? Math.abs(result.dimensions.S_N) * 25 : 0,
          result.dimensions.S_N < 0 ? Math.abs(result.dimensions.S_N) * 25 : 0,
          result.dimensions.T_F > 0 ? Math.abs(result.dimensions.T_F) * 25 : 0,
          result.dimensions.T_F < 0 ? Math.abs(result.dimensions.T_F) * 25 : 0,
          result.dimensions.J_P > 0 ? Math.abs(result.dimensions.J_P) * 25 : 0,
          result.dimensions.J_P < 0 ? Math.abs(result.dimensions.J_P) * 25 : 0
        ],
        backgroundColor: [
          '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#f97316', '#06b6d4', '#84cc16'
        ],
        borderWidth: 1
      }]
    };
  };

  const getMBTICompatibility = (userType: string) => {
    const compatibilityData: Record<string, { best: string[], good: string[], description: string }> = {
      'INTJ': {
        best: ['ENFP', 'ENTP', 'INFP', 'ISFP'],
        good: ['ENTJ', 'INFJ', 'ISFJ', 'ISTJ'],
        description: 'INTJ는 창의적이고 열정적인 성격과 잘 어울리며, 서로의 다른 관점을 존중합니다.'
      },
      'INTP': {
        best: ['ENFJ', 'ENTJ', 'INFJ', 'INTJ'],
        good: ['ENTP', 'INFP', 'ISFP', 'ISTP'],
        description: 'INTP는 직관적이고 이해심 많은 파트너와 깊은 연결을 형성합니다.'
      },
      'ENTJ': {
        best: ['INFP', 'INTP', 'ENFP', 'ENTP'],
        good: ['INTJ', 'ISFP', 'ESFP', 'ESTJ'],
        description: 'ENTJ는 창의적이고 독립적인 성격과 균형을 이루며 성장합니다.'
      },
      'ENTP': {
        best: ['INFJ', 'INTJ', 'ENFJ', 'ENTJ'],
        good: ['ENFP', 'INTP', 'ISFJ', 'ESFJ'],
        description: 'ENTP는 직관적이고 체계적인 파트너와 아이디어를 발전시킵니다.'
      },
      'INFJ': {
        best: ['ENFP', 'ENTP', 'INFP', 'ENFJ'],
        good: ['INTJ', 'ISFP', 'ESFP', 'ISFJ'],
        description: 'INFJ는 따뜻하고 이해심 많은 성격과 깊은 유대를 형성합니다.'
      },
      'INFP': {
        best: ['ENFJ', 'ENTJ', 'ENFP', 'ESFJ'],
        good: ['INFJ', 'ISFJ', 'ESFP', 'ISFP'],
        description: 'INFP는 격려해주고 이해해주는 파트너와 진정한 자아를 발견합니다.'
      },
      'ENFJ': {
        best: ['INFP', 'ISFP', 'INTP', 'INFJ'],
        good: ['ENFP', 'ESFP', 'ISFJ', 'ESFJ'],
        description: 'ENFJ는 진실하고 깊이 있는 성격과 의미 있는 관계를 만듭니다.'
      },
      'ENFP': {
        best: ['INTJ', 'INFJ', 'ISFJ', 'ISTJ'],
        good: ['ENFJ', 'ESFJ', 'INFP', 'ISFP'],
        description: 'ENFP는 안정적이고 신뢰할 수 있는 파트너와 조화를 이룹니다.'
      },
      'ISTJ': {
        best: ['ESFP', 'ESTP', 'ENFP', 'ESFJ'],
        good: ['ISFJ', 'ESTJ', 'ISFP', 'ISTP'],
        description: 'ISTJ는 활발하고 사교적인 성격과 균형을 이루며 새로운 경험을 합니다.'
      },
      'ISFJ': {
        best: ['ESFP', 'ESTP', 'ENFP', 'ESFJ'],
        good: ['ISTJ', 'ISFP', 'INFJ', 'INFP'],
        description: 'ISFJ는 따뜻하고 감사할 줄 아는 파트너와 안정적인 관계를 유지합니다.'
      },
      'ESTJ': {
        best: ['ISFP', 'ISTP', 'INTP', 'INFP'],
        good: ['ESFJ', 'ISTJ', 'ESTP', 'ESFP'],
        description: 'ESTJ는 유연하고 적응적인 성격과 서로 보완하며 성장합니다.'
      },
      'ESFJ': {
        best: ['ISFP', 'ISTP', 'INFP', 'INTP'],
        good: ['ESFP', 'ISFJ', 'ESTJ', 'ENFJ'],
        description: 'ESFJ는 독립적이고 창의적인 파트너와 다양한 관점을 나눕니다.'
      },
      'ISTP': {
        best: ['ESFJ', 'ESTJ', 'ENFJ', 'ESFP'],
        good: ['ISFP', 'ESTP', 'INFP', 'ENTP'],
        description: 'ISTP는 사교적이고 표현력 풍부한 성격과 감정적 연결을 형성합니다.'
      },
      'ISFP': {
        best: ['ESFJ', 'ESTJ', 'ENFJ', 'ENTJ'],
        good: ['ISFJ', 'INFJ', 'ESFP', 'INFP'],
        description: 'ISFP는 격려해주고 이끌어주는 파트너와 자신감을 키웁니다.'
      },
      'ESTP': {
        best: ['ISFJ', 'ISTJ', 'INFJ', 'INTJ'],
        good: ['ESFP', 'ISTP', 'ENFP', 'ENTP'],
        description: 'ESTP는 안정적이고 계획적인 성격과 균형을 이루며 발전합니다.'
      },
      'ESFP': {
        best: ['ISFJ', 'ISTJ', 'INFJ', 'INTJ'],
        good: ['ESFJ', 'ESTP', 'ENFP', 'ISFP'],
        description: 'ESFP는 차분하고 신중한 파트너와 안정감을 찾습니다.'
      }
    };

    return compatibilityData[userType] || {
      best: ['모든 유형'],
      good: ['모든 유형'],
      description: '모든 MBTI 유형과 좋은 관계를 형성할 수 있습니다.'
    };
  };

  const currentQ = randomizedQuestions[currentQuestion];
  const mbtiInfo = result ? MBTI_TYPES[result.type as keyof typeof MBTI_TYPES] : null;

  // 질문이 로드되지 않았을 때 로딩 표시
  if (randomizedQuestions.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              MBTI 성격 테스트
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center h-32">
            <div className="text-lg text-gray-600">{t.preparingQuestions}</div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {t.mbtiTitle}
          </DialogTitle>
        </DialogHeader>

        {!showResult ? (
          <div className="space-y-8">
            <ProgressBar 
              value={Math.round(((currentQuestion + 1) / randomizedQuestions.length) * 100)}
              className="mb-6"
            />

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {t.question} {currentQuestion + 1} {t.of} {randomizedQuestions.length}
                  </h3>
                </div>
                <p className="text-lg text-gray-700 mb-6">
                  {currentQ?.question || t.loading}
                </p>
              </div>

              <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
                <div className="space-y-3">
                  {currentQ?.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <RadioGroupItem value={option.value} id={`option-${index}`} />
                      <Label 
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer text-gray-700"
                      >
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {t.previous}
              </Button>
              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === randomizedQuestions.length - 1 ? t.result : t.next}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t.yourMBTI}
              </h3>
              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <h4 className="text-3xl font-bold text-blue-600 mb-2">
                  {result.type}
                </h4>
                <h5 className="text-xl font-semibold text-blue-700 mb-4">
                  {mbtiInfo?.name}
                </h5>
                <p className="text-lg text-gray-700 mb-4">
                  {result.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {result.traits.map((trait: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm"
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
                  title="MBTI 성향 분석"
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
                  const compatibility = getMBTICompatibility(result.type);
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
