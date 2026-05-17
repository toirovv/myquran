import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout({ theme, toggleTheme }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = window.setTimeout(() => setLoading(false), 250);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  const handleNavigation = () => {
    setLoading(true);
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-transparent ${
        theme === "dark" ? "text-slate-100" : "text-slate-900"
      }`}
    >
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onNavigate={handleNavigation}
      />
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/25">
          <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
