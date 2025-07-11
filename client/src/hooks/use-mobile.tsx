import { useState, useEffect } from 'react';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileDevice = mobileRegex.test(userAgent);
      
      const isSmallScreen = window.innerWidth < 768;
      
      const result = isMobileDevice || isSmallScreen;
      console.log('[useMobile] Device detection:', { 
        userAgent, 
        isMobileDevice, 
        isSmallScreen, 
        result 
      });
      
      setIsMobile(result);
    };

    // 초기 체크
    checkMobile();

    // 화면 크기 변경 시 체크
    window.addEventListener('resize', checkMobile);

    // 클린업
    return () => {
      window.removeEventListener('resize', checkMobile);
      console.log('[useMobile] Cleanup: removed resize listener');
    };
  }, []);

  return isMobile;
}
