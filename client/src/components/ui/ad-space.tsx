import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AdSpaceProps {
  type?: 'banner' | 'rectangle' | 'skyscraper' | 'mobile' | 'affiliate';
  className?: string;
}

export function AdSpace({ type = 'rectangle', className }: AdSpaceProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    console.log('[AdSpace] Initializing ad space of type:', type);
    
    // 광고 로딩 시뮬레이션
    const timer = setTimeout(() => {
      console.log('[AdSpace] Ad loaded for type:', type);
      setIsLoaded(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      console.log('[AdSpace] Cleaning up ad space of type:', type);
    };
  }, [type]);

  const handleAdError = () => {
    console.error('[AdSpace] Failed to load ad content for type:', type);
    setAdError(true);
  };

  // 광고 타입에 따른 클래스 및 크기 설정
  const adClasses = cn(
    'bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden',
    {
      'w-full h-24': type === 'banner',
      'w-full sm:w-[336px] h-[280px]': type === 'rectangle',
      'w-[120px] h-[600px]': type === 'skyscraper',
      'w-full h-[100px]': type === 'mobile',
      'w-full sm:w-[468px] h-[60px]': type === 'affiliate',
    },
    className
  );

  // 광고 준비 중 표시
  if (!isLoaded) {
    return (
      <div className={adClasses}>
        <div className="text-sm text-gray-400 animate-pulse">광고 준비 중...</div>
      </div>
    );
  }

  // 광고 로드 실패 시 표시
  if (adError) {
    return (
      <div className={adClasses}>
        <div className="text-sm text-gray-400">광고를 불러올 수 없습니다</div>
      </div>
    );
  }

  // 실제 광고 콘텐츠 (현재는 플레이스홀더)
  return (
    <div className={adClasses}>
      <div className="text-center text-sm text-gray-500">
        <span className="block font-medium">광고 영역</span>
        <span className="text-xs">준비 중</span>
      </div>
    </div>
  );
}