import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout({ theme, toggleTheme }) {
  return (
    <div
      className={`min-h-screen flex flex-col bg-transparent ${
        theme === "dark" ? "text-slate-100" : "text-slate-900"
      }`}
    >
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
