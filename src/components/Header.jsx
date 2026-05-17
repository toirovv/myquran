import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, Search, Settings, Moon, Sun } from "lucide-react";

export default function Header({ theme, toggleTheme }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 bg-slate-50/90 dark:bg-[#0B0F19]/60 border-slate-200/70 dark:border-slate-800/80 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 group transition-transform duration-200 active:scale-95"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-[0_0_20px_rgba(52,211,153,0.25)] transition-transform duration-300 group-hover:scale-105">
            <HomeIcon className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-600 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-400">
              MyQuran
            </span>
            <span className="text-[10px] text-emerald-400 tracking-widest uppercase font-semibold">
              Surah Picker
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1.5 bg-slate-50/90 dark:bg-slate-900/50 p-1.5 rounded-full border border-slate-200/70 dark:border-slate-800/60 backdrop-blur-sm">
          <Link
            to="/"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/")
                ? "text-emerald-500 bg-emerald-500/10 shadow-[inset_0_1px_1px_rgba(52,211,153,0.1)]"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            Home
          </Link>
          <Link
            to="/random-pairs"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/random-pairs")
                ? "text-emerald-500 bg-emerald-500/10"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            Random Pairs
          </Link>
          <Link
            to="/reading-history"
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/reading-history")
                ? "text-emerald-500 bg-emerald-500/10"
                : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            Reading History
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/70 border border-slate-300/70 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
            <Search className="w-5 h-5" />
          </button>

          <button className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/70 border border-slate-300/70 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
            <Settings className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
