import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PWAInstallPrompt } from "@/components/pwa-install";
import Home from "@/pages/home";
import AnimalTestPage from "@/pages/animal-test";
import MBTITestPage from "@/pages/mbti-test";
import EnneagramTestPage from "@/pages/enneagram-test";
import PalmTestPage from "@/pages/palm-test";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import TermsOfServicePage from "@/pages/terms-of-service";
import ContactPage from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/animal-test" component={AnimalTestPage} />
      <Route path="/mbti-test" component={MBTITestPage} />
      <Route path="/enneagram-test" component={EnneagramTestPage} />
      <Route path="/egen-teto-test" component={EnneagramTestPage} />
      <Route path="/palm-test" component={PalmTestPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/terms-of-service" component={TermsOfServicePage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <PWAInstallPrompt />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
