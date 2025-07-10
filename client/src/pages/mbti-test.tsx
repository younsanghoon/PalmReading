import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSpace } from "@/components/ui/ad-space";
import { MBTITest } from "@/components/personality-tests/mbti-test";

export default function MBTITestPage() {
  const [isTestOpen, setIsTestOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Top Ad Banner */}
      <div className="w-full py-4 bg-white dark:bg-gray-900 border-b">
        <AdSpace type="banner" className="px-4" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로
              </Button>
            </Link>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar Ad */}
            <div className="hidden lg:block">
              <AdSpace type="skyscraper" />
            </div>

            {/* Content Area */}
            <div className="flex-1 space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  MBTI 성격 유형 테스트
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  16가지 성격 유형 중 나의 유형을 찾아보세요
                </p>
              </div>

              {/* Mobile Ad */}
              <div className="lg:hidden">
                <AdSpace type="mobile" />
              </div>

              {/* Test Description */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">테스트 안내</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>• 총 40개의 질문으로 구성된 정밀한 MBTI 테스트</p>
                  <p>• 외향성(E) vs 내향성(I)</p>
                  <p>• 감각(S) vs 직관(N)</p>
                  <p>• 사고(T) vs 감정(F)</p>
                  <p>• 판단(J) vs 인식(P)</p>
                  <p>• 개인정보는 저장되지 않으며, 테스트 결과만 표시됩니다</p>
                </div>
              </div>

              {/* Rectangle Ad */}
              <AdSpace type="rectangle" />

              {/* Start Test Button */}
              <div className="text-center">
                <Button
                  onClick={() => setIsTestOpen(true)}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 text-lg"
                >
                  테스트 시작하기
                </Button>
              </div>
            </div>

            {/* Right Sidebar Ad */}
            <div className="hidden lg:block">
              <AdSpace type="skyscraper" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <div className="w-full py-4 bg-white dark:bg-gray-900 border-t">
        <AdSpace type="banner" className="px-4" />
      </div>

      {/* Test Modal */}
      <MBTITest open={isTestOpen} onOpenChange={setIsTestOpen} />
    </div>
  );
}