import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

interface AdSpaceProps {
  type: 'banner' | 'rectangle' | 'skyscraper' | 'mobile' | 'affiliate';
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

export function AdSpace({ type, className, position = 'center' }: AdSpaceProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Google AdSense 광고 로드
    if (type !== 'affiliate' && adRef.current && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [type]);

  const getSizeClasses = () => {
    switch (type) {
      case 'banner':
        return 'w-full h-20 max-w-4xl'; // 728x90
      case 'rectangle':
        return 'w-80 h-64'; // 320x250
      case 'skyscraper':
        return 'w-40 h-96'; // 160x600
      case 'mobile':
        return 'w-full h-12 max-w-sm'; // 320x50
      case 'affiliate':
        return 'w-full max-w-md'; // 어필리에이트 광고
      default:
        return 'w-80 h-64';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'justify-start';
      case 'bottom':
        return 'justify-end';
      case 'left':
        return 'justify-start';
      case 'right':
        return 'justify-end';
      case 'center':
      default:
        return 'justify-center';
    }
  };

  if (type === 'affiliate') {
    return (
      <div className={cn("flex flex-col items-center p-4", getPositionClasses(), className)}>
        <div className={cn(
          "border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-md",
          "text-gray-800 dark:text-gray-200",
          getSizeClasses()
        )}>
          <h3 className="font-bold text-lg mb-2">베스트 세일 상품 추천!</h3>
          <p className="mb-3">AULA F108 pro 무선 블루투스 키보드 매크로 게임용 키보드 가스켓 TFT 스마트 디스플레이가 장착된 핫스왑 풀 사이즈 키보드</p>
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold text-red-600 dark:text-red-400">USD 45.38</span>
            <span className="line-through text-sm text-gray-500">USD 49.77 (9% 할인)</span>
          </div>
          <p className="text-sm mb-3">사용 가능한 혜택: JL25863, USD2.00 할인</p>
          <a 
            href="https://s.click.aliexpress.com/e/_opex1Vi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
          >
            클릭하고 구매하기
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", getPositionClasses(), className)}>
      <div 
        ref={adRef}
        className={cn(
          getSizeClasses()
        )}
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-6706508307630636"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}