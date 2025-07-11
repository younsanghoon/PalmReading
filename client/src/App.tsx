import React from "react";
import { AdSpace } from "./components/ui/ad-space";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            손금 테스트
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            손금으로 보는 나의 운명
          </p>
          
          {/* Google AdSense 광고 */}
          <div className="mb-8">
            <AdSpace type="rectangle" />
          </div>
          
          {/* 알리익스프레스 어필리에이트 광고 */}
          <AdSpace type="affiliate" />
        </div>
      </div>
    </div>
  );
}

export default App;
