import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSpace } from "@/components/ui/ad-space";
import { EnneagramTest } from "@/components/personality-tests/enneagram-test";

export default function EnneagramTestPage() {
  const [isTestOpen, setIsTestOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
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
                  에겐-테토 성격 테스트
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  주도적(에겐) vs 수용적(테토) 성향을 발견하세요
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
                  <p>• 총 25개의 랜덤 질문으로 구성된 정밀한 에겐-테토 테스트</p>
                  <p>• 주도적(에겐) vs 수용적(테토) 성향 분석</p>
                  <p>• 성별에 따른 세분화된 결과 제공</p>
                  <p>• 다른 성격 유형과의 궁합 분석 포함</p>
                  <p>• 개인정보는 저장되지 않으며, 테스트 결과만 표시됩니다</p>
                </div>
              </div>

              {/* Rectangle Ad */}
              <AdSpace type="rectangle" />

              {/* Start Test Button */}
              <div className="text-center">
                <Button
                  onClick={() => setIsTestOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 text-lg"
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
      <EnneagramTest open={isTestOpen} onOpenChange={setIsTestOpen} />
    </div>
  );
}