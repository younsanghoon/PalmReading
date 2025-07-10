import React from 'react';
import { Link } from "wouter";
import { TestCard } from "@/components/ui/test-card";
import { AdSpace } from "@/components/ui/ad-space";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Brain, Camera, Eye, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { t } = useLanguage();
  
  const tests = [
    {
      id: 'animal' as const,
      title: t.animalTest,
      description: t.animalTestDesc,
      icon: <Camera className="w-6 h-6" />,
      duration: "2-3분",
      tags: ["AI", "Face", "Animal"],
      href: "/animal-test"
    },
    {
      id: 'mbti' as const,
      title: t.mbtiTest,
      description: t.mbtiTestDesc,
      icon: <Brain className="w-6 h-6" />,
      duration: "5-10분",
      tags: ["MBTI", "Psychology", "Personality"],
      href: "/mbti-test"
    },
    {
      id: 'enneagram' as const,
      title: t.enneagramTest,
      description: t.enneagramTestDesc,
      icon: <Eye className="w-6 h-6" />,
      duration: "5-7분",
      tags: ["Enneagram", "Behavior", "Compatibility"],
      href: "/enneagram-test"
    },
    {
      id: 'palm' as const,
      title: t.palmTest,
      description: t.palmTestDesc,
      icon: <Hand className="w-6 h-6" />,
      duration: "3-5분",
      tags: ["AI", "Palm", "Fortune"],
      href: "/palm-test"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Top Ad Banner */}
      <div className="w-full py-4 bg-white dark:bg-gray-900 border-b">
        <div className="flex justify-between items-center px-4">
          <AdSpace type="banner" />
          <LanguageSelector />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar Ad */}
            <div className="hidden lg:block lg:w-48">
              <div className="sticky top-8">
                <AdSpace type="skyscraper" />
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-5xl font-bold gradient-text mb-6">
                  {t.language === 'ko' ? '성격 분석 테스트' : 
                   t.language === 'en' ? 'Personality Analysis Tests' :
                   t.language === 'ja' ? '性格分析テスト' :
                   t.language === 'zh' ? '性格分析测试' :
                   t.language === 'id' ? 'Tes Analisis Kepribadian' :
                   t.language === 'th' ? 'การทดสอบวิเคราะห์บุคลิกภาพ' :
                   t.language === 'vi' ? 'Bài Test Phân Tích Tính Cách' : '성격 분석 테스트'}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  {t.language === 'ko' ? 'AI와 심리학이 만나 더 정확한 성격 분석을 제공합니다. 나를 더 잘 이해하고 성장할 수 있는 인사이트를 얻어보세요.' :
                   t.language === 'en' ? 'AI and psychology combine to provide more accurate personality analysis. Gain insights to better understand yourself and grow.' :
                   t.language === 'ja' ? 'AIと心理学が組み合わさり、より正確な性格分析を提供します。自分をよりよく理解し、成長するためのインサイトを得ましょう。' :
                   t.language === 'zh' ? 'AI与心理学结合，提供更准确的性格分析。获得洞察，更好地了解自己并成长。' :
                   t.language === 'id' ? 'AI dan psikologi bergabung untuk memberikan analisis kepribadian yang lebih akurat. Dapatkan wawasan untuk memahami diri sendiri dengan lebih baik dan berkembang.' :
                   t.language === 'th' ? 'AI และจิตวิทยารวมกันเพื่อให้การวิเคราะห์บุคลิกภาพที่แม่นยำยิ่งขึ้น รับข้อมูลเชิงลึกเพื่อเข้าใจตัวเองได้ดีขึ้นและเติบโต' :
                   t.language === 'vi' ? 'AI và tâm lý học kết hợp để cung cấp phân tích tính cách chính xác hơn. Nhận được những hiểu biết sâu sắc để hiểu bản thân tốt hơn và phát triển.' :
                   'AI와 심리학이 만나 더 정확한 성격 분석을 제공합니다.'}
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-6"></div>
              </div>

              {/* Mobile Ad */}
              <div className="lg:hidden mb-8">
                <AdSpace type="mobile" />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {tests.map((test) => (
                  <Link key={test.id} href={test.href}>
                    <TestCard
                      title={test.title}
                      description={test.description}
                      icon={test.icon}
                      duration={test.duration}
                      tags={test.tags}
                      onClick={() => {}}
                      className="cursor-pointer test-card animate-slide-up"
                    />
                  </Link>
                ))}
              </div>

              {/* Rectangle Ad */}
              <div className="flex justify-center mb-8">
                <AdSpace type="rectangle" />
              </div>

              <div className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-4">안전한 테스트 환경</h2>
                  <div className="text-gray-600 dark:text-gray-300 space-y-2">
                    <p>🔒 개인정보 수집 및 저장 안 함</p>
                    <p>🧠 모든 분석은 브라우저에서 실행</p>
                    <p>📱 모든 기기에서 이용 가능</p>
                    <p>⚡ 즉시 결과 확인</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar Ad */}
            <div className="hidden lg:block lg:w-48">
              <div className="sticky top-8">
                <AdSpace type="skyscraper" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <div className="w-full py-4 bg-white dark:bg-gray-900 border-t">
        <AdSpace type="banner" className="px-4" />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-lg font-semibold mb-2">성격 분석 테스트</h3>
                <p className="text-gray-400 text-sm">
                  AI 기반 성격 분석으로 나를 더 잘 이해하세요
                </p>
              </div>
              <div className="flex gap-4">
                <Link href="/privacy-policy">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    개인정보 보호정책
                  </Button>
                </Link>
                <Link href="/terms-of-service">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    이용약관
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                    문의하기
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800 text-center text-sm text-gray-400">
              <p>&copy; 2024 성격 분석 테스트. 모든 권리 보유.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}