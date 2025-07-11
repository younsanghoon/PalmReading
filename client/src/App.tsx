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
    // 루트 경로('/')에 접속했을 때 자동으로 홈페이지로 리다이렉트
    if (location === "/" || location === "/PalmReading" || location === "/PalmReading/") {
      console.log("Redirecting to home page");
    }
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/PalmReading" component={Home} />
      <Route path="/PalmReading/" component={Home} />
      <Route path="/animal-test" component={AnimalTest} />
      <Route path="/mbti-test" component={MbtiTest} />
      <Route path="/enneagram-test" component={EnneagramTest} />
      <Route path="/palm-test" component={PalmTest} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
