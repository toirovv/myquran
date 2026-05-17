import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200/70 dark:border-slate-800/80 bg-slate-50/90 dark:bg-[#0B0F19]/80 backdrop-blur-md">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            MyQuran
          </span>
          <span className="text-slate-500 dark:text-slate-600">|</span>
          <span>
            © {new Date().getFullYear()} Barcha huquqlar himoyalangan.
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-50/80 dark:bg-slate-900/40 px-4 py-2 rounded-xl border border-slate-200/70 dark:border-slate-800/50 backdrop-blur-sm">
          <span>Yaratuvchi:</span>
          <span className="font-medium text-slate-700 dark:text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer">
            Asadbek
          </span>
          <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20 animate-pulse" />
        </div>
      </div>
    </footer>
  );
}
