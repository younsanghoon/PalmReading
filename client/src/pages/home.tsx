import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { TestCard } from "@/components/ui/test-card";
import { AnimalFaceTest } from "@/components/personality-tests/animal-face-test";
import { MBTITest } from "@/components/personality-tests/mbti-test";
import { EnneagramTest } from "@/components/personality-tests/enneagram-test";
import { PalmReadingTest } from "@/components/personality-tests/palm-reading-test";
import { initializeModels } from "@/lib/ai-models";
import { Camera, Users, Zap, Hand, Brain, Shield, Bot, TrendingUp } from "lucide-react";

type TestType = 'animal' | 'mbti' | 'enneagram' | 'palm' | null;

export default function Home() {
  const [currentTest, setCurrentTest] = useState<TestType>(null);

  useEffect(() => {
    // Initialize AI models on component mount
    initializeModels();
  }, []);

  const scrollToTests = () => {
    const testsSection = document.getElementById('tests');
    if (testsSection) {
      testsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const testCards = [
    {
      id: 'animal',
      title: '동물상 AI 분석',
      description: '얼굴 사진으로 당신의 동물상을 분석하여 성격 특성을 알아보세요.',
      icon: <Camera className="w-8 h-8 text-purple-600" />,
      duration: '2-3분',
      tags: ['강아지상', '고양이상', '여우상'],
      className: 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100'
    },
    {
      id: 'mbti',
      title: 'MBTI 성격 테스트',
      description: '16가지 성격 유형 중 당신의 유형을 찾아보세요.',
      icon: <Users className="w-8 h-8 text-blue-600" />,
      duration: '5-7분',
      tags: ['INFP', 'ENFJ', 'ISTJ'],
      className: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100'
    },
    {
      id: 'enneagram',
      title: '에겐-테토 테스트',
      description: '에너지 유형과 행동 패턴을 분석하여 성격을 파악합니다.',
      icon: <Zap className="w-8 h-8 text-green-600" />,
      duration: '3-4분',
      tags: ['에겐형', '테토형'],
      className: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100'
    },
    {
      id: 'palm',
      title: 'AI 손금 분석',
      description: '손바닥 사진으로 성격과 특성을 재미있게 분석해보세요.',
      icon: <Hand className="w-8 h-8 text-amber-600" />,
      duration: '2-3분',
      tags: ['생명선', '감정선', '지능선'],
      className: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100'
    }
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: '개인정보 보호',
      description: '모든 분석이 브라우저에서 진행되어 개인정보가 외부로 전송되지 않습니다.'
    },
    {
      icon: <Bot className="w-8 h-8 text-secondary" />,
      title: '최신 AI 기술',
      description: 'Google Teachable Machine을 활용한 정교한 이미지 분석 기술을 사용합니다.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: '종합적 분석',
      description: '다양한 테스트 결과를 통합하여 보다 정확한 성격 분석을 제공합니다.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-primary mr-3" />
              <span className="text-xl font-bold text-gray-900">AI 성격 진단</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                홈
              </button>
              <button 
                onClick={scrollToTests}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                테스트
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-primary via-secondary to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              나만의 성격을 발견하세요
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              AI 기반 동물상 분석부터 전문적인 심리 테스트까지, 
              다양한 방법으로 당신의 진짜 모습을 찾아보세요.
            </p>
            <Button 
              onClick={scrollToTests}
              className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              지금 시작하기
            </Button>
          </div>
        </div>
      </section>

      {/* Tests Section */}
      <section id="tests" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              4가지 성격 진단 테스트
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              최신 AI 기술과 검증된 심리학 이론을 결합한 다양한 테스트로 당신의 성격을 종합적으로 분석합니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testCards.map((test) => (
              <TestCard
                key={test.id}
                title={test.title}
                description={test.description}
                icon={test.icon}
                duration={test.duration}
                tags={test.tags}
                onClick={() => setCurrentTest(test.id as TestType)}
                className={test.className}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 우리 서비스를 선택해야 할까요?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                AI와 심리학의 만남
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                최신 인공지능 기술과 검증된 심리학 이론을 결합하여, 
                당신의 성격을 다각도로 분석합니다. 
              </p>
              <p className="text-lg text-gray-600 mb-6">
                단순한 재미를 넘어서 실제로 자신을 이해하는 데 도움이 되는 
                인사이트를 제공하고자 합니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToTests}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  테스트 시작하기
                </Button>
                <Button 
                  variant="outline"
                  className="border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  더 알아보기
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 text-center">
                  <Brain className="w-24 h-24 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    과학적 분석
                  </h3>
                  <p className="text-gray-600">
                    AI 기술과 심리학의 결합으로 정확한 성격 분석을 제공합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Brain className="w-8 h-8 text-primary mr-3" />
                <span className="text-xl font-bold">AI 성격 진단</span>
              </div>
              <p className="text-gray-400">
                AI 기술과 심리학의 만남으로 더 정확한 성격 분석을 제공합니다.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">테스트</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => setCurrentTest('animal')}
                    className="hover:text-white transition-colors"
                  >
                    동물상 AI 분석
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTest('mbti')}
                    className="hover:text-white transition-colors"
                  >
                    MBTI 테스트
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTest('enneagram')}
                    className="hover:text-white transition-colors"
                  >
                    에겐-테토 테스트
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentTest('palm')}
                    className="hover:text-white transition-colors"
                  >
                    AI 손금 분석
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">정보</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">개인정보 보호정책</a></li>
                <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
                <li><a href="#" className="hover:text-white transition-colors">문의하기</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI 성격 진단. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>

      {/* Test Modals */}
      <AnimalFaceTest 
        open={currentTest === 'animal'} 
        onOpenChange={(open) => !open && setCurrentTest(null)} 
      />
      <MBTITest 
        open={currentTest === 'mbti'} 
        onOpenChange={(open) => !open && setCurrentTest(null)} 
      />
      <EnneagramTest 
        open={currentTest === 'enneagram'} 
        onOpenChange={(open) => !open && setCurrentTest(null)} 
      />
      <PalmReadingTest 
        open={currentTest === 'palm'} 
        onOpenChange={(open) => !open && setCurrentTest(null)} 
      />
    </div>
  );
}
