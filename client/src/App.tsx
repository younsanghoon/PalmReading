import React, { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import Home from "./pages/home";
import AnimalTest from "./pages/animal-test";
import MbtiTest from "./pages/mbti-test";
import EnneagramTest from "./pages/enneagram-test";
import PalmTest from "./pages/palm-test";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsOfService from "./pages/terms-of-service";
import Contact from "./pages/contact";
import NotFound from "./pages/not-found";

function App() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // 현재 경로 로깅
    console.log("Current location:", location);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* PalmReading 경로도 유지하여 이전 링크 호환성 확보 */}
      <Route path="/PalmReading" component={Home} />
      <Route path="/PalmReading/" component={Home} />
      
      <Route path="/animal-test" component={AnimalTest} />
      <Route path="/PalmReading/animal-test" component={AnimalTest} />
      
      <Route path="/mbti-test" component={MbtiTest} />
      <Route path="/PalmReading/mbti-test" component={MbtiTest} />
      
      <Route path="/enneagram-test" component={EnneagramTest} />
      <Route path="/PalmReading/enneagram-test" component={EnneagramTest} />
      
      <Route path="/palm-test" component={PalmTest} />
      <Route path="/PalmReading/palm-test" component={PalmTest} />
      
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/PalmReading/privacy-policy" component={PrivacyPolicy} />
      
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/PalmReading/terms-of-service" component={TermsOfService} />
      
      <Route path="/contact" component={Contact} />
      <Route path="/PalmReading/contact" component={Contact} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
