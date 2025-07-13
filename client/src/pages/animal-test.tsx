import React, { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSpace } from "@/components/ui/ad-space";
import { LanguageSelector } from "@/components/ui/language-selector";
import { AnimalFaceTest } from "@/components/personality-tests/animal-face-test";
import { useLanguage } from "@/lib/i18n";

export default function AnimalTestPage() {
  const [isTestOpen, setIsTestOpen] = useState(false);
  const { t, language } = useLanguage();

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
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/PalmReading/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.home}
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
                  {t.animalTest}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  {t.animalTestDesc}
                </p>
              </div>

              {/* Mobile Ad */}
              <div className="lg:hidden">
                <AdSpace type="mobile" />
              </div>

              {/* Test Description */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">{t.animalTestTitle}</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  {language === 'ko' ? (
                    <>
                      <p>• 얼굴 사진을 업로드하거나 카메라로 촬영하세요</p>
                      <p>• AI가 얼굴 특징을 분석하여 동물상을 판단합니다</p>
                      <p>• 강아지상, 고양이상, 곰상, 여우상, 원숭이상, 토끼상 중 분석</p>
                      <p>• 개인정보는 저장되지 않으며, 분석 후 즉시 삭제됩니다</p>
                    </>
                  ) : (
                    <>
                      <p>• Upload a face photo or take one with your camera</p>
                      <p>• AI analyzes facial features to determine your animal type</p>
                      <p>• Analysis includes dog, cat, bear, fox, monkey, and rabbit types</p>
                      <p>• Your personal data is not stored and is deleted immediately after analysis</p>
                    </>
                  )}
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
                  {t.start}
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