import React, { useEffect } from 'react';
import { Link, useLocation } from "wouter";
import { TestCard } from "@/components/ui/test-card";
import { AdSpace } from "@/components/ui/ad-space";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Brain, Camera, Eye, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { t } = useLanguage();
  const [location, navigate] = useLocation();
  
  useEffect(() => {
    console.log("[Home] Component mounted, current location:", location);
    console.log("[Home] Window location pathname:", window.location.pathname);
    console.log("[Home] Window location href:", window.location.href);
    
    // 라우팅 상태 디버깅
    if ((window as any).__debugRouter) {
      console.log("[Home] Debug router state:");
      (window as any).__debugRouter.logRouteState();
    }
    
    return () => {
      console.log("[Home] Component unmounted");
    };
  }, [location]);
  
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

  const handleTestClick = (href: string) => {
    console.log("[Home] Test card clicked, navigating to:", href);
    console.log("[Home] Current location before navigation:", location);
    console.log("[Home] Window location before navigation:", window.location.href);
    
    // 경로가 슬래시로 시작하는지 확인하고, 시작하지 않으면 슬래시 추가
    const normalizedHref = href.startsWith('/') ? href : `/${href}`;
    console.log("[Home] Normalized href:", normalizedHref);
    
    // 개발 환경 확인
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    console.log("[Home] Environment:", isDev ? "development" : "production");
    
    // 현재 위치와 목적지가 같은지 확인
    if (location === normalizedHref) {
      console.log("[Home] Already at this location, forcing page reload");
      window.location.href = normalizedHref;
      return;
    }
    
    // 네비게이션 시도 전 상태 로깅
    console.log("[Home] Navigation attempt - Details:");
    console.log("[Home] - Target href:", normalizedHref);
    console.log("[Home] - Current location:", location);
    console.log("[Home] - Window location:", window.location.href);
    console.log("[Home] - Window pathname:", window.location.pathname);
    
    try {
      // 디버그용 전역 함수가 있으면 사용
      if ((window as any).__debugRouter) {
        console.log("[Home] Debug router detected, using it for navigation");
        try {
          (window as any).__debugRouter.goTo(normalizedHref);
          console.log("[Home] Debug router navigation completed");
          
          // 디버그 라우터 상태 확인
          setTimeout(() => {
            console.log("[Home] Debug router state after navigation:");
            (window as any).__debugRouter.logRouteState();
          }, 100);
          
          return;
        } catch (debugError) {
          console.error("[Home] Debug router navigation failed:", debugError);
        }
      }
      
      // wouter의 navigate 함수 시도
      console.log("[Home] Attempting to use wouter navigate");
      try {
        navigate(normalizedHref);
        console.log("[Home] Wouter navigation completed");
        
        // 네비게이션 후 경로 확인
        setTimeout(() => {
          console.log("[Home] Location after wouter navigation:", window.location.pathname);
          
          // 경로가 변경되지 않았으면 직접 URL 변경
          if (window.location.pathname !== normalizedHref) {
            console.log("[Home] Wouter navigation did not update URL, using direct navigation");
            window.location.href = normalizedHref;
          }
        }, 100);
        
        return;
      } catch (wouterError) {
        console.error("[Home] Wouter navigation failed:", wouterError);
      }
      
      // 마지막 방법: 직접 URL 변경
      console.log("[Home] Using direct URL navigation to:", normalizedHref);
      window.location.href = normalizedHref;
    } catch (error) {
      console.error("[Home] Navigation error:", error);
      // 오류 발생 시 직접 URL 변경
      console.log("[Home] Falling back to direct URL change after error");
      window.location.href = normalizedHref;
    }
  };

  // 푸터 링크 네비게이션 함수
  const handleFooterNavigation = (path: string) => {
    console.log("[Home] Footer navigation to:", path);
    
    try {
      // 디버그용 전역 함수가 있으면 사용
      if ((window as any).__debugRouter) {
        console.log("[Home] Using debug router for footer navigation");
        (window as any).__debugRouter.goTo(path);
      } else {
        // 직접 URL 변경
        console.log("[Home] Using direct URL for footer navigation");
        window.location.href = path;
      }
    } catch (error) {
      console.error("[Home] Footer navigation error:", error);
      window.location.href = path;
    }
  };

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
                  <div key={test.id} onClick={() => handleTestClick(test.href)}>
                    <TestCard
                      title={test.title}
                      description={test.description}
                      icon={test.icon}
                      duration={test.duration}
                      tags={test.tags}
                      onClick={() => handleTestClick(test.href)}
                      className="cursor-pointer test-card animate-slide-up"
                    />
                  </div>
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400 hover:text-white"
                  onClick={() => handleFooterNavigation("/privacy-policy")}
                >
                  개인정보 보호정책
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400 hover:text-white"
                  onClick={() => handleFooterNavigation("/terms-of-service")}
                >
                  이용약관
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-400 hover:text-white"
                  onClick={() => handleFooterNavigation("/contact")}
                >
                  문의하기
                </Button>
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