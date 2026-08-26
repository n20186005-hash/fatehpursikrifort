/**
 * 设计提示：赤砂石的门槛——全局保持遗产编辑式的克制感；语言切换完整、即时且不混排。
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import LegalPage from "@/pages/LegalPage";
import { Route, Switch } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const GA_MEASUREMENT_ID = "G-HXM22WWPKP";

function AnalyticsGate() {
  useEffect(() => {
    if (localStorage.getItem("fs-cookie-analytics") !== "granted") return;
    if (document.querySelector(`script[data-fs-ga="${GA_MEASUREMENT_ID}"]`)) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.dataset.fsGa = GA_MEASUREMENT_ID;
    document.head.appendChild(script);
    const dataLayer = window.dataLayer ?? [];
    window.dataLayer = dataLayer;
    function gtag(...args: unknown[]) {
      dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer?: unknown[][];
  }
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={() => <LegalPage kind="privacy" />} />
      <Route path="/terms" component={() => <LegalPage kind="terms" />} />
      <Route path="/cookies" component={() => <LegalPage kind="cookies" />} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AnalyticsGate />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
