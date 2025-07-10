import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSpace } from "@/components/ui/ad-space";

export default function PrivacyPolicyPage() {
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
              개인정보 보호정책
            </h1>

            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  1. 개인정보 수집 및 이용 목적
                </h2>
                <p>
                  본 서비스는 성격 분석 테스트를 제공하는 것이 목적이며, 개인정보를 수집하지 않습니다.
                  모든 테스트는 브라우저 내에서 실행되며, 결과는 사용자의 기기에만 저장됩니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  2. 수집하는 개인정보 항목
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>본 서비스는 개인정보를 수집하지 않습니다</li>
                  <li>업로드된 이미지는 분석 후 즉시 삭제됩니다</li>
                  <li>테스트 결과는 서버에 저장되지 않습니다</li>
                  <li>쿠키는 웹사이트 기능 개선을 위해서만 사용됩니다</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  3. 개인정보 보유 및 이용 기간
                </h2>
                <p>
                  개인정보를 수집하지 않으므로 보유 기간이 없습니다.
                  사용자가 업로드한 이미지는 분석 완료 후 즉시 삭제됩니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  4. 개인정보 제3자 제공
                </h2>
                <p>
                  본 서비스는 개인정보를 제3자에게 제공하지 않습니다.
                  모든 데이터 처리는 사용자의 브라우저 내에서만 이루어집니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  5. 광고 서비스
                </h2>
                <p>
                  본 서비스는 구글 애드센스, 알리익스프레스 등의 광고 서비스를 이용합니다.
                  이러한 광고 서비스는 사용자의 관심사에 맞는 광고를 제공하기 위해 쿠키를 사용할 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  6. 개인정보 보호책임자
                </h2>
                <p>
                  개인정보 보호 관련 문의사항이 있으시면 문의하기 페이지를 통해 연락해 주세요.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  7. 정책 변경
                </h2>
                <p>
                  본 개인정보 보호정책은 법령이나 서비스의 변경사항을 반영하기 위해 수정될 수 있습니다.
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