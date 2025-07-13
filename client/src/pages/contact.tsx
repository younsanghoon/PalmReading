import React from "react";
import { Link } from "wouter";
import { ArrowLeft, Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdSpace } from "@/components/ui/ad-space";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
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

          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                문의하기
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                궁금한 점이나 문제가 있으시면 언제든지 연락해 주세요
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    이메일 문의
                  </CardTitle>
                  <CardDescription>
                    자세한 문의사항은 이메일로 보내주세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        이메일 주소:
                      </p>
                      <p className="font-mono text-blue-600 dark:text-blue-400">
                        yjhyjh671@naver.com
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <p>• 일반 문의: 24시간 이내 답변</p>
                      <p>• 기술 문의: 48시간 이내 답변</p>
                      <p>• 광고 문의: 영업일 기준 3일 이내 답변</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    자주 묻는 질문
                  </CardTitle>
                  <CardDescription>
                    빠른 답변을 위한 FAQ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Q: 개인정보가 저장되나요?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        A: 아니요, 모든 테스트는 브라우저에서만 실행되며 개인정보는 저장되지 않습니다.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Q: 테스트 결과는 정확한가요?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        A: AI 분석 결과는 참고용이며, 전문적인 상담을 대체하지 않습니다.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Q: 모바일에서도 이용할 수 있나요?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        A: 네, 모든 기기에서 이용 가능합니다.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Rectangle Ad */}
            <div className="flex justify-center">
              <AdSpace type="rectangle" />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>서비스 이용 안내</CardTitle>
                <CardDescription>
                  원활한 서비스 이용을 위한 정보
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">지원 브라우저</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• Chrome (권장)</li>
                      <li>• Firefox</li>
                      <li>• Safari</li>
                      <li>• Edge</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">최적 환경</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <li>• 안정적인 인터넷 연결</li>
                      <li>• 카메라 사용 권한 허용</li>
                      <li>• JavaScript 활성화</li>
                      <li>• 쿠키 허용</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              <p>
                문의 전 개인정보 보호정책과 이용약관을 확인해 주세요.
              </p>
            </div>
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
