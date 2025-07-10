import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSpace } from "@/components/ui/ad-space";
import { PalmReadingTest } from "@/components/personality-tests/palm-reading-test";

export default function PalmTestPage() {
  const [isTestOpen, setIsTestOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
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
                  AI 손금 분석 테스트
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  5가지 손금선으로 나의 운명과 성격을 알아보세요
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
                  <p>• 손바닥 사진을 업로드하여 AI가 5가지 손금선을 분석</p>
                  <p>• 생명선: 건강과 생명력 분석</p>
                  <p>• 감정선: 감정 표현과 인간관계 분석</p>
                  <p>• 지능선: 사고력과 판단력 분석</p>
                  <p>• 운명선: 인생의 방향과 성공 가능성 분석</p>
                  <p>• 능력선: 특별한 재능과 능력 분석</p>
                  <p>• 개인정보는 저장되지 않으며, 분석 후 즉시 삭제됩니다</p>
                </div>
              </div>

              {/* Rectangle Ad */}
              <AdSpace type="rectangle" />

              {/* Start Test Button */}
              <div className="text-center">
                <Button
                  onClick={() => setIsTestOpen(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 text-lg"
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
      <PalmReadingTest open={isTestOpen} onOpenChange={setIsTestOpen} />
    </div>
  );
}