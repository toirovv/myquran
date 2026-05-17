import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* --- BACKGROUND DECOR (Neon doiralar) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Orqa fondagi katta 404 matni */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <h1 className="text-[20rem] md:text-[30rem] font-black text-white leading-none">
          404
        </h1>
      </div>

      <div className="max-w-xl w-full relative z-10 text-center">
        {/* --- ICON ANIMATION --- */}
        <div className="relative inline-block mb-10">
          <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative w-24 h-24 bg-white/5 border border-white/10 rounded-[32px] flex items-center justify-center backdrop-blur-xl">
            <Ghost className="w-12 h-12 text-emerald-400 animate-bounce" />
          </div>
        </div>

        {/* --- TEXT SECTION --- */}
        <div className="space-y-4 mb-12">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            Adashib{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              qoldingizmi?
            </span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-md mx-auto">
            Siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga
            ko'chirilgan. Keling, biz sizga yo'l ko'rsatamiz.
          </p>
        </div>

        {/* --- BUTTONS --- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="group relative w-full sm:w-auto px-8 py-4 bg-emerald-500 rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center justify-center gap-2 text-slate-950 font-black uppercase tracking-wider text-sm">
              <Home className="w-4 h-4" /> Bosh sahifa
            </span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" /> Orqaga qaytish
          </button>
        </div>
      </div>
    </div>
  );
}
