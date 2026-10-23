import { useEffect } from "react";
import Home from "./pages/Home";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound";
import { initializeAnalytics } from "./lib/analytics";
export default function App({ path = "/" }: { path?: string }) {
  const language = path.startsWith("/en/") || path === "/en" ? "en" : "hi";
  const route = language === "en" ? path.slice(3) || "/" : path;
  useEffect(() => initializeAnalytics(), []);
  if (route === "/") return <Home language={language} />;
  if (route === "/privacy" || route === "/terms" || route === "/cookies")
    return (
      <LegalPage
        language={language}
        kind={route.slice(1) as "privacy" | "terms" | "cookies"}
      />
    );
  return <NotFound language={language} />;
}
