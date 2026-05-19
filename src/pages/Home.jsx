import React, { useContext, useEffect, useRef, useState } from "react";
import { Check, Search, Trash2, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import surahData from "../data/surahData";
import { SelectedSurahContext } from "../context/SelectedSurahContext";

const prayerSelections = {
  Fajr: [78, 79, 80, 81, 82],
  Dhuhr: [87, 88, 89],
  Asr: [103, 102],
  Maghrib: [109, 112, 113, 114],
  Isha: [91, 94, 95],
};

export default function Home() {
  const MAX_SELECTIONS = 4;
  const { selectedSurahs, setSelectedSurahs } =
    useContext(SelectedSurahContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activePrayer, setActivePrayer] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleSurah = (id) => {
    setActivePrayer(null);

    if (selectedSurahs.includes(id)) {
      setSelectedSurahs(selectedSurahs.filter((sId) => sId !== id));
    } else {
      if (selectedSurahs.length >= MAX_SELECTIONS) return;
      setSelectedSurahs([...selectedSurahs, id]);
    }
  };

  const handlePrayerSelect = (prayer) => {
    setSelectedSurahs(prayerSelections[prayer].slice(0, MAX_SELECTIONS));
    setActivePrayer(prayer);
    setIsDropdownOpen(false);
  };

  const clearSelection = () => {
    setSelectedSurahs([]);
    setActivePrayer(null);
    setSearchQuery("");
  };

  const goToRandomPairs = () => {
    if (selectedSurahs.length >= 2) {
      navigate("/random-pairs");
    }
  };

  useEffect(() => {
    if (!isDropdownOpen) return undefined;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const filteredSurahs = activePrayer
    ? surahData.filter((s) => selectedSurahs.includes(s.id))
    : surahData.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 md:p-12 relative">
      <main className="max-w-7xl mx-auto relative z-10 space-y-6 md:space-y-10">
        {/* --- TOP CONTROLS (Responsive Wrapper) --- */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-white/5 pb-6 md:pb-8">
          {/* Dropdown & Clear Button Group */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Dropdown */}
            <div ref={dropdownRef} className="relative w-full sm:w-60">
              {/* Dropdown Menu */}
              <div
                className={`absolute top-[110%] left-0 w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-300 origin-top ${isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}
              >
                {Object.keys(prayerSelections).map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePrayerSelect(p)}
                    className="w-full px-5 py-4 text-left text-sm font-semibold text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors border-b border-slate-800/60 last:border-none cursor-pointer"
                  >
                    {p} vaqti suralari
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Button */}
            {(selectedSurahs.length > 0 || activePrayer) && (
              <button
                onClick={clearSelection}
                className="w-full sm:w-auto h-14 px-5 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2 font-bold whitespace-nowrap cursor-pointer"
              >
                <Trash2 className="w-5 h-5" /> Tozalash
              </button>
            )}
          </div>

          {/* Action & Search Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto md:justify-end">
            {/* Search Input */}
            <div className="relative w-full sm:w-64 md:w-72 lg:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
              <input
                type="text"
                placeholder="Sura qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 text-base focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-600 text-white"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={goToRandomPairs}
              disabled={selectedSurahs.length < 2}
              className={`w-full sm:w-auto h-14 px-6 rounded-2xl font-bold transition-all flex items-center justify-center whitespace-nowrap cursor-pointer ${
                selectedSurahs.length >= 2
                  ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-950/20"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed"
              }`}
            >
              Random Pairs yaratish ({selectedSurahs.length})
            </button>
          </div>
        </div>

        {/* --- INFO PLACARD --- */}
        {selectedSurahs.length > 0 && (
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Tanlangan suralaringiz Random Pairs sahifasida ishlatiladi.
              Maksimum <span className="text-emerald-400 font-bold">4 ta</span>{" "}
              sura tanlashingiz mumkin.
            </p>
          </div>
        )}

        {/* --- SURAH GRID (Mobil ekranda qat'iy 2 tadan card) --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredSurahs.map((surah) => {
            const isChecked = selectedSurahs.includes(surah.id);
            return (
              <div
                key={surah.id}
                onClick={() => toggleSurah(surah.id)}
                className={`relative p-4 sm:p-6 rounded-2xl md:rounded-[32px] border transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[160px] sm:min-h-[190px] ${
                  isChecked
                    ? "bg-emerald-500/10 border-emerald-500 shadow-[0_8px_30px_rgba(16,185,129,0.08)] scale-[1.01]"
                    : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                }`}
              >
                {/* Check Indicator */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-md border flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-emerald-500 border-emerald-400 scale-105"
                        : "border-white/10 bg-black/20"
                    }`}
                  >
                    {isChecked && (
                      <Check className="w-3.5 h-3.5 text-black stroke-[4]" />
                    )}
                  </div>
                </div>

                {/* Card Top: Number */}
                <div className="flex flex-col gap-3 sm:gap-4">
                  <span
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg font-black text-xs sm:text-sm border ${
                      isChecked
                        ? "bg-emerald-500 text-black border-emerald-400"
                        : "bg-white/5 text-slate-400 border-white/10"
                    }`}
                  >
                    {surah.id}
                  </span>

                  {/* Card Middle: Info */}
                  <div>
                    <h3 className="text-base sm:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1 mb-0.5">
                      {surah.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                      {surah.verses} Oyat • {surah.type}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Arabic text */}
                <div className="pt-3 sm:pt-4 border-t border-white/5 flex justify-between items-center mt-3">
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest hidden sm:inline">
                    Surah
                  </span>
                  <span
                    className={`text-lg sm:text-2xl font-serif ml-auto transition-colors ${isChecked ? "text-emerald-400" : "text-slate-400"}`}
                  >
                    {surah.arabic}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- EMPTY STATE --- */}
        {filteredSurahs.length === 0 && (
          <div className="text-center py-20 sm:py-32 rounded-3xl border border-dashed border-white/5">
            <p className="text-slate-500 text-base sm:text-xl">
              Mos keladigan sura topilmadi.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
