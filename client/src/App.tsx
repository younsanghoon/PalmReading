import React from "react";
import { Route, Switch, Router } from "wouter";
import { AdSpace } from "./components/ui/ad-space";
import Home from "./pages/home";
import AnimalTest from "./pages/animal-test";
import MbtiTest from "./pages/mbti-test";
import EnneagramTest from "./pages/enneagram-test";
import PalmTest from "./pages/palm-test";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";

// GitHub Pages의 base path를 처리하기 위한 hook
const useBasePath = () => {
  const [loc, setLoc] = React.useState(window.location.pathname);
  
  React.useEffect(() => {
    const handler = () => {
      console.log("[Router] PopState event triggered");
      console.log("[Router] Previous location:", loc);
      setLoc(window.location.pathname);
      console.log("[Router] Location changed:", window.location.pathname);
    };
    
    console.log("[Router] Setting up popstate event listener");
    window.addEventListener("popstate", handler);
    return () => {
      console.log("[Router] Removing popstate event listener");
      window.removeEventListener("popstate", handler);
    };
  }, [loc]);
  
  // 현재 환경 확인
  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  // 현재 실행 중인 URL의 base path 확인
  const currentUrl = window.location.origin;
  console.log("[Router] Current URL origin:", currentUrl);
  console.log("[Router] Current URL pathname:", window.location.pathname);
  console.log("[Router] Current URL search:", window.location.search);
  console.log("[Router] Current URL hash:", window.location.hash);
  
  // 개발 환경에서는 base path를 사용하지 않음
  const basePath = isDev ? "" : "/PalmReading";
  
  console.log("[Router] Environment:", isDev ? "development" : "production");
  console.log("[Router] Using base path:", basePath);
  
  // 현재 경로에서 base path 제거
  const normalizedLoc = loc.startsWith(basePath) 
    ? loc.slice(basePath.length) || "/" 
    : loc;
    
  console.log("[Router] Original location:", loc);
  console.log("[Router] Normalized location:", normalizedLoc);
    
  const navigate = (to: string) => {
    // 경로가 이미 슬래시로 시작하는지 확인
    const normalizedTo = to.startsWith('/') ? to : `/${to}`;
    console.log("[Router] Navigate called with destination:", to);
    console.log("[Router] Normalized destination:", normalizedTo);
    
    // 개발 환경에서는 base path를 추가하지 않음
    const newPath = isDev 
      ? normalizedTo 
      : (normalizedTo === "/" ? basePath : `${basePath}${normalizedTo}`);
      
    console.log("[Router] Navigating to:", normalizedTo);
    console.log("[Router] Actual path with basePath:", newPath);
    
    // 현재 경로와 새 경로가 같은지 확인
    if (loc === newPath) {
      console.log("[Router] Already at this location, forcing reload");
      window.location.href = newPath; // 강제 리로드
      return;
    }
    
    // 현재 정규화된 위치와 목적지가 같은지 확인 (중복 네비게이션 방지)
    if (normalizedLoc === normalizedTo) {
      console.log("[Router] Already at normalized location, forcing reload");
      window.location.href = newPath; // 강제 리로드
      return;
    }
      
    console.log("[Router] Pushing state to history:", newPath);
    
    try {
      window.history.pushState(null, "", newPath);
      setLoc(newPath);
      console.log("[Router] History state pushed successfully");
    } catch (error) {
      console.error("[Router] Error pushing state to history:", error);
      // 오류 발생 시 직접 URL 변경
      console.log("[Router] Falling back to direct URL change");
      window.location.href = newPath;
    }
  };
  
  return [normalizedLoc, navigate] as const;
};

// 디버깅을 위한 커스텀 라우터 래퍼
const CustomRouter: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [location, navigate] = useBasePath();
  
  console.log("[CustomRouter] Rendering with location:", location);
  
  // 라우팅 디버깅을 위한 전역 함수 추가
  React.useEffect(() => {
    console.log("[CustomRouter] Setting up debug router");
    (window as any).__debugRouter = {
      location,
      navigate,
      goTo: (path: string) => {
        console.log("[DebugRouter] Manual navigation to:", path);
        navigate(path);
      },
      getCurrentLocation: () => {
        console.log("[DebugRouter] Current location:", location);
        return location;
      },
      getFullUrl: () => {
        console.log("[DebugRouter] Full URL:", window.location.href);
        return window.location.href;
      },
      logRouteState: () => {
        console.log("[DebugRouter] === Route State Debug ===");
        console.log("[DebugRouter] window.location:", window.location.href);
        console.log("[DebugRouter] pathname:", window.location.pathname);
        console.log("[DebugRouter] normalized location:", location);
        console.log("[DebugRouter] =====================");
      }
    };
    
    console.log("[CustomRouter] Debug router initialized. Use window.__debugRouter.goTo('/path') to navigate");
    console.log("[CustomRouter] Available debug methods: getCurrentLocation(), getFullUrl(), logRouteState()");
    
    // 초기 상태 로깅
    (window as any).__debugRouter.logRouteState();
    
    return () => {
      console.log("[CustomRouter] Cleaning up debug router");
      delete (window as any).__debugRouter;
    };
  }, [location, navigate]);
  
  return (
    <Router hook={() => [location, navigate]}>
      {children}
    </Router>
  );
};

function App() {
  console.log("[App] Rendering App component");
  console.log("[App] Window location:", window.location.href);
  
  React.useEffect(() => {
    console.log("[App] Component mounted");
    
    // 현재 라우팅 상태 로깅
    console.log("[App] Current route:", window.location.pathname);
    console.log("[App] Search params:", window.location.search);
    console.log("[App] Hash:", window.location.hash);
    
    return () => {
      console.log("[App] Component unmounting");
    };
  }, []);
  
  return (
    <CustomRouter>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/animal-test" component={AnimalTest} />
          <Route path="/mbti-test" component={MbtiTest} />
          <Route path="/enneagram-test" component={EnneagramTest} />
          <Route path="/palm-test" component={PalmTest} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
        
        {/* 광고 영역 */}
        <div className="mt-8 mb-4">
          <AdSpace type="rectangle" />
        </div>
        
        {/* 알리익스프레스 어필리에이트 광고 */}
        <div className="mb-4">
          <AdSpace type="affiliate" />
        </div>
      </div>
    </CustomRouter>
  );
}

export default App;
