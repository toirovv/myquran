import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RandomPairs from "./pages/RandomPairs";
import ReadingHistory from "./pages/ReadingHistory";
import NotFound from "./pages/NotFound";
import { SelectedSurahProvider } from "./context/SelectedSurahContext";

// 1. Yangi va noodatiy "Glow/Neon" dizayndagi Spinner komponenti
const ModernSpinner = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black transition-colors duration-300">
      <div className="relative flex h-20 w-20 items-center justify-center">
        {/* Tashqi aylanuvchi va porlovchi halqa */}
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-transparent border-t-purple-600 border-b-cyan-400 dark:border-t-purple-400 dark:border-b-cyan-400 blur-[2px]"></div>

        {/* Ichki qarama-qarshi aylanuvchi halqa */}
        <div className="absolute h-14 w-14 animate-[spin_1.5s_linear_infinite_reverse] rounded-full border-4 border-transparent border-r-pink-500 border-l-indigo-500"></div>

        {/* Markazdagi pulsatsiya bo'luvchi nuqta */}
        <div className="h-4 w-4 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_15px_#22d3ee]"></div>
      </div>
      <p className="mt-6 text-sm font-semibold tracking-widest text-gray-500 dark:text-gray-400 uppercase animate-pulse">
        Yuklanmoqda...
      </p>
    </div>
  );
};

// 2. Sahifalar almashishini nazorat qiluvchi komponent
const NavigationWatcher = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Sahifa o'zgarganda spinnerni yoqamiz
    setLoading(true);

    // Kichik taymer (masalan, 600ms) o'tib spinnerni o'chiramiz.
    // Bu foydalanuvchiga spinnerni chiroyli ko'rinib o'tishini ta'minlaydi.
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Har safar URL o'zgarganda ishlaydi

  if (loading) {
    return <ModernSpinner />;
  }

  return children;
};

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <SelectedSurahProvider>
      <BrowserRouter>
        {/* NavigationWatcher barcha Route'larni o'rab turadi */}
        <NavigationWatcher>
          <Routes>
            <Route element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
              <Route path="/" element={<Home />} />
              <Route path="/random-pairs" element={<RandomPairs />} />
              <Route path="/reading-history" element={<ReadingHistory />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </NavigationWatcher>
      </BrowserRouter>
    </SelectedSurahProvider>
  );
}
