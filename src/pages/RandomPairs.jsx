import React, { useState, useMemo } from "react";
import { RefreshCw, ChevronDown, Check, BookOpen, Clock } from "lucide-react";
import prayerData from "../data/prayerData";

export default function PremiumSurahPicker() {
  const [selectedPrayer, setSelectedPrayer] = useState("Witr");
  const [isOpen, setIsOpen] = useState(false);

  const currentSurahs = useMemo(
    () => prayerData[selectedPrayer] || [],
    [selectedPrayer],
  );

  return (
    <div className=" text-slate-200 font-sans p-4 md:p-12 selection:bg-emerald-500/30">
      {/* --- FO'N UCHUN DEKORATIV NUR (GLOW) --- */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold tracking-[0.2em] text-xs uppercase">
              <Clock className="w-4 h-4" />
              Spiritual Selection
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Random{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                Surah Pair
              </span>
            </h1>
          </div>

          {/* CUSTOM DROPDOWN (MODERN VERSION) */}
          <div className="relative min-w-[200px]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between gap-4 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl hover:bg-white/10 transition-all active:scale-95 shadow-xl"
            >
              <span className="font-semibold text-white">{selectedPrayer}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="absolute top-full left-0 w-full mt-3 bg-[#0D1117] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                {Object.keys(prayerData).map((p) => (
                  <div
                    key={p}
                    onClick={() => {
                      setSelectedPrayer(p);
                      setIsOpen(false);
                    }}
                    className="px-5 py-3 hover:bg-emerald-500/10 flex items-center justify-between text-sm cursor-pointer transition-colors"
                  >
                    <span
                      className={
                        selectedPrayer === p
                          ? "text-emerald-400 font-bold"
                          : "text-slate-300"
                      }
                    >
                      {p}
                    </span>
                    {selectedPrayer === p && (
                      <Check className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* --- SURAH CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentSurahs.map((surah) => (
            <div
              key={surah.id}
              className="group relative p-8 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.06] hover:border-emerald-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Card Decor */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />

              <div className="flex justify-between items-start relative z-10 mb-8">
                <div>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded-md">
                    Surah {surah.id}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-3 group-hover:text-emerald-400 transition-colors">
                    {surah.name}
                  </h3>
                </div>
                <RefreshCw className="w-5 h-5 text-slate-600 group-hover:rotate-180 transition-all duration-700 cursor-pointer hover:text-emerald-400" />
              </div>

              <div className="flex justify-between items-end relative z-10">
                <div className="space-y-1">
                  <p className="text-slate-400 text-sm italic font-medium">
                    "{surah.meaning}"
                  </p>
                  <p className="text-slate-500 text-xs flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {surah.verses} Ayahs
                  </p>
                </div>
                <div className="text-4xl font-serif text-white/80 group-hover:scale-110 transition-transform duration-500">
                  {surah.arabic}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex flex-wrap items-center gap-4">
          <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[#05070A] font-bold rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all active:scale-95 flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Generate New Pair
          </button>
          <button
            onClick={() => setSelectedPrayer("Witr")}
            className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all active:scale-95"
          >
            Reset Selection
          </button>
        </div>
      </div>
    </div>
  );
}
