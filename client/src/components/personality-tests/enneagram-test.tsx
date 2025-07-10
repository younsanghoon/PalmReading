import { useState, useEffect } from 'react';
import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ResultChart } from "@/components/ui/result-chart";
import { getRandomEnneagramQuestions, calculateEnneagram } from "@/lib/personality-data";
import { Question } from "@/types/personality";
import { ChevronLeft, ChevronRight, Share2, RotateCcw, User, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EnneagramTestProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Gender = 'male' | 'female' | null;

export function EnneagramTest({ open, onOpenChange }: EnneagramTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const [gender, setGender] = useState<Gender>(null);
  const [genderSelected, setGenderSelected] = useState(false);
  const [randomizedQuestions, setRandomizedQuestions] = useState<Question[]>([]);

  // 테스트 시작/재시작 시 질문 랜덤화 함수
  const generateRandomQuestions = () => {
    const questions = getRandomEnneagramQuestions();
    return questions.map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5) // 옵션 순서도 랜덤화
    }));
  };

  // 컴포넌트 초기화 또는 다이얼로그가 열릴 때 질문 생성
  React.useEffect(() => {
    if (open) {
      // 다이얼로그가 열릴 때마다 완전히 새로운 질문 세트 생성
      setCurrentQuestion(0);
      setAnswers([]);
      setCurrentAnswer('');
      setResult(null);
      setShowResult(false);
      setGender(null);
      setGenderSelected(false);
      setRandomizedQuestions(generateRandomQuestions());
    }
  }, [open]);

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
    setGenderSelected(true);
  };

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
      const enneagramResult = calculateEnneagram(newAnswers);
      
      // 성별에 따라 결과 타입 수정
      let genderedType = enneagramResult.type;
      if (gender === 'male') {
        genderedType = enneagramResult.type === 'egen' ? '에겐남' : '테토남';
      } else if (gender === 'female') {
        genderedType = enneagramResult.type === 'egen' ? '에겐녀' : '테토녀';
      }

      const finalResult = {
        ...enneagramResult,
        type: genderedType,
        gender: gender
      };

      setResult(finalResult);
      
      // Save to localStorage
      const results = JSON.parse(localStorage.getItem('personalityResults') || '{}');
      results.enneagram = {
        result: finalResult.type,
        score: finalResult.score,
        gender: gender,
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
    setGender(null);
    setGenderSelected(false);
    // 완전히 새로운 랜덤 질문 세트 생성
    setRandomizedQuestions(generateRandomQuestions());
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '에겐-테토 테스트 결과',
          text: `나는 ${result.type}입니다! (${result.score}%)`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Sharing failed:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`나는 ${result.type}입니다! (${result.score}%) - ${window.location.href}`);
    }
  };

  const getCompatibility = (userType: string) => {
    const baseType = userType.includes('에겐') ? 'egen' : 'teto';
    const compatibilityData = {
      egen: {
        best: ['테토남', '테토녀', 'ISFJ', 'ISFP', '토끼상'],
        good: ['에겐남', '에겐녀', 'ENTJ', 'ENFJ', '강아지상'],
        description: '에겐형은 테토형과 균형을 이루며, 온순한 성격과 잘 어울립니다.'
      },
      teto: {
        best: ['에겐남', '에겐녀', 'ENTJ', 'ESTJ', '곰상'],
        good: ['테토남', '테토녀', 'ISFJ', 'INFP', '고양이상'],
        description: '테토형은 에겐형의 리더십을 존중하며, 안정적인 관계를 선호합니다.'
      }
    };

    return compatibilityData[baseType as keyof typeof compatibilityData];
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            에겐-테토 성격 테스트
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {!genderSelected ? (
            // 성별 선택 화면
            <div className="text-center space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">성별을 선택해주세요</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  더 정확한 결과를 위해 성별을 선택해주세요
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-blue-500"
                  onClick={() => handleGenderSelect('male')}
                >
                  <CardContent className="p-6 text-center">
                    <User className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                    <h4 className="font-semibold">남성</h4>
                  </CardContent>
                </Card>
                
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-pink-500"
                  onClick={() => handleGenderSelect('female')}
                >
                  <CardContent className="p-6 text-center">
                    <User className="w-12 h-12 mx-auto mb-3 text-pink-500" />
                    <h4 className="font-semibold">여성</h4>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : !showResult ? (
            // 질문 화면
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  질문 {currentQuestion + 1} / {randomizedQuestions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {gender === 'male' ? '남성' : '여성'} 모드
                </span>
              </div>
              
              <ProgressBar 
                value={Math.round(((currentQuestion + 1) / randomizedQuestions.length) * 100)} 
                className="mb-6"
              />
              
              <div className="space-y-6">
                <h3 className="text-xl font-semibold leading-relaxed">
                  {randomizedQuestions[currentQuestion]?.question}
                </h3>
                
                <RadioGroup value={currentAnswer} onValueChange={handleAnswerChange}>
                  <div className="space-y-4">
                    {randomizedQuestions[currentQuestion]?.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <RadioGroupItem value={option.value} id={`option-${index}`} />
                        <Label 
                          htmlFor={`option-${index}`} 
                          className="flex-1 text-base leading-relaxed cursor-pointer"
                        >
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  onClick={handlePrevious} 
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  이전
                </Button>
                
                <Button 
                  onClick={handleNext} 
                  disabled={!currentAnswer}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  {currentQuestion === randomizedQuestions.length - 1 ? '결과 보기' : '다음'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            // 결과 화면
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {result.type.includes('에겐') ? 'E' : 'T'}
                  </span>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-2">{result.type}</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    {Math.round(result.score)}% 확률
                  </p>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>성격 분석</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {result.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">주요 특징:</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.traits.map((trait: string, index: number) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                    const compatibility = getCompatibility(result.type);
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
              
              <div className="flex justify-center gap-3 pt-4">
                <Button 
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
                >
                  <Share2 className="w-4 h-4" />
                  공유하기
                </Button>
                
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  다시 하기
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}