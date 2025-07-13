import React from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSpace } from "@/components/ui/ad-space";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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

          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              이용약관
            </h1>

            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  제1조 (목적)
                </h2>
                <p>
                  본 약관은 성격 분석 테스트 서비스(이하 "서비스")의 이용조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  제2조 (서비스의 제공)
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>AI 기반 동물상 분석 서비스</li>
                  <li>MBTI 성격 유형 테스트</li>
                  <li>에네아그램 성격 테스트</li>
                  <li>AI 손금 분석 서비스</li>
                  <li>성격 분석 결과 제공</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  제3조 (서비스 이용)
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>본 서비스는 무료로 제공됩니다</li>
                  <li>회원가입 없이 누구나 이용 가능합니다</li>
                  <li>테스트 결과는 참고용으로만 사용하시기 바랍니다</li>
                  <li>상업적 목적으로 결과를 사용하는 것은 금지됩니다</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  제4조 (개인정보 보호)
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>개인정보는 수집하지 않습니다</li>
                  <li>업로드된 이미지는 분석 후 즉시 삭제됩니다</li>
                  <li>테스트 결과는 서버에 저장되지 않습니다</li>
                  <li>모든 처리는 사용자의 브라우저 내에서 이루어집니다</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  제5조 (서비스 이용 제한)
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>타인의 개인정보를 무단으로 이용하는 행위</li>
                  <li>서비스의 정상적인 운영을 방해하는 행위</li>
                  <li>공공질서 및 미풍양속을 해치는 행위</li>
                  <li>법령에 위반되는 행위</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  제6조 (면책사항)
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>테스트 결과는 참고용이며 절대적인 기준이 아닙니다</li>
                  <li>AI 분석 결과의 정확성을 보장하지 않습니다</li>
                  <li>서비스 이용으로 인한 직·간접적 손해에 대해 책임지지 않습니다</li>
                  <li>사용자가 업로드한 이미지의 내용에 대해 책임지지 않습니다</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  제7조 (광고 서비스)
                </h2>
                <p>
                  본 서비스는 운영을 위해 구글 애드센스, 알리익스프레스 등의 광고를 게재할 수 있습니다.
                  광고 내용에 대한 책임은 해당 광고주에게 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  제8조 (약관의 변경)
                </h2>
                <p>
                  본 약관은 법령이나 서비스의 변경사항을 반영하기 위해 수정될 수 있습니다.
                  변경 시 웹사이트를 통해 공지하겠습니다.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                최근 업데이트: 2024년 7월 10일
              </p>
            </div>
          </div>

          {/* Rectangle Ad */}
          <div className="mt-8">
            <AdSpace type="rectangle" />
          </div>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <div className="w-full py-4 bg-white dark:bg-gray-900 border-t">
        <AdSpace type="banner" className="px-4" />
      </div>
    </div>
  );
}