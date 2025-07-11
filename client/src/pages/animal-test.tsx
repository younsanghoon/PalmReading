import React, { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSpace } from "@/components/ui/ad-space";
import { AnimalFaceTest } from "@/components/personality-tests/animal-face-test";

export default function AnimalTestPage() {
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [_, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Top Ad Banner */}
      <div className="w-full py-4 bg-white dark:bg-gray-900 border-b">
        <AdSpace type="banner" className="px-4" />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로
            </Button>
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
                  동물상 분석 테스트
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  AI가 분석하는 나의 동물상을 알아보세요
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
                  <p>• 얼굴 사진을 업로드하거나 카메라로 촬영하세요</p>
                  <p>• AI가 얼굴 특징을 분석하여 동물상을 판단합니다</p>
                  <p>• 강아지상, 고양이상, 곰상, 여우상, 원숭이상, 토끼상 중 분석</p>
                  <p>• 개인정보는 저장되지 않으며, 분석 후 즉시 삭제됩니다</p>
                </div>
              </div>

              {/* Rectangle Ad */}
              <AdSpace type="rectangle" />

              {/* Start Test Button */}
              <div className="text-center">
                <Button
                  onClick={() => setIsTestOpen(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
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
      <AnimalFaceTest open={isTestOpen} onOpenChange={setIsTestOpen} />
    </div>
  );
}