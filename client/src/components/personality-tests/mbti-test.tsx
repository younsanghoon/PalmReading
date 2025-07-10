import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ResultChart } from "@/components/ui/result-chart";
import { MBTI_QUESTIONS, calculateMBTI, MBTI_TYPES } from "@/lib/personality-data";
import { ChevronLeft, ChevronRight, Share2, RotateCcw } from "lucide-react";

interface MBTITestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MBTITest({ open, onOpenChange }: MBTITestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerChange = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = currentAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < MBTI_QUESTIONS.length - 1) {
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

  const currentQ = MBTI_QUESTIONS[currentQuestion];
  const mbtiInfo = result ? MBTI_TYPES[result.type as keyof typeof MBTI_TYPES] : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            MBTI 성격 테스트
          </DialogTitle>
        </DialogHeader>

        {!showResult ? (
          <div className="space-y-8">
            <ProgressBar 
              value={currentQuestion} 
              max={MBTI_QUESTIONS.length}
              className="mb-6"
            />

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  질문 {currentQuestion + 1}
                </h3>
                <p className="text-lg text-gray-700 mb-6">
                  {currentQ.question}
                </p>
              </div>

              <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
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
                이전
              </Button>
              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === MBTI_QUESTIONS.length - 1 ? '결과 보기' : '다음'}
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
                당신의 MBTI는...
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
