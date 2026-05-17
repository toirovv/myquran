import React, { useEffect, useRef, useState } from "react";
import { Check, Search, Trash2, ChevronDown } from "lucide-react";
import surahData from "../data/surahData";

const prayerSelections = {
  Fajr: [78, 79, 80, 81, 82],
  Dhuhr: [87, 88, 89],
  Asr: [103, 102],
  Maghrib: [109, 112, 113, 114],
  Isha: [91, 94, 95],
};

export default function Home() {
  const [selectedSurahs, setSelectedSurahs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activePrayer, setActivePrayer] = useState(null);
  const dropdownRef = useRef(null);

  const toggleSurah = (id) => {
    // Agar qo'lda tanlansa, namoz rejimini o'chiramiz,
    // shunda boshqa cardlar g'oyib bo'lmaydi
    setActivePrayer(null);

    if (selectedSurahs.includes(id)) {
      setSelectedSurahs(selectedSurahs.filter((sId) => sId !== id));
    } else {
      setSelectedSurahs([...selectedSurahs, id]);
    }
  };

  const handlePrayerSelect = (prayer) => {
    setSelectedSurahs(prayerSelections[prayer]);
    setActivePrayer(prayer);
    setIsDropdownOpen(false);
  };

  const clearSelection = () => {
    setSelectedSurahs([]);
    setActivePrayer(null);
    setSearchQuery("");
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

  // Mantiq: Agar namoz tanlangan bo'lsa, faqat o'sha suralar.
  // Agar manual bo'lsa yoki qidiruv bo'lsa, hamma filtrga tushganlari.
  const filteredSurahs = activePrayer
    ? surahData.filter((s) => selectedSurahs.includes(s.id))
    : surahData.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

  const displaySurahs = filteredSurahs;

  return (
    <div className="min-h-screen bg-transparent text-slate-100 font-sans p-6 md:p-12 relative">
      <main className="max-w-7xl mx-auto relative z-10">
        {/* --- TOP CONTROLS --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Dropdown */}
            <div ref={dropdownRef} className="relative w-full md:w-60">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-14 px-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl flex items-center justify-between hover:bg-slate-700/90 transition-all font-bold text-base backdrop-blur-md cursor-pointer text-slate-100"
              >
                <span className="truncate">
                  {activePrayer || "Namoz tanlang"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-emerald-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Animated Dropdown Menu */}
              <div
                className={`absolute top-[110%] left-0 w-full bg-slate-950/95 border border-slate-800/80 rounded-2xl shadow-2xl z-50 overflow-hidden transition-all duration-300 origin-top ${isDropdownOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"}`}
              >
                {Object.keys(prayerSelections).map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePrayerSelect(p)}
                    className="w-full px-6 py-4 text-left text-sm font-semibold text-slate-100 hover:bg-emerald-500/10 transition-colors border-b border-slate-800/70 last:border-none cursor-pointer"
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
                className="h-14 px-6 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all flex items-center gap-2 font-bold whitespace-nowrap"
              >
                <Trash2 className="w-5 h-5" /> Tozalash
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            <input
              type="text"
              placeholder="Sura qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white/5 border border-white/10 text-lg focus:outline-none focus:border-emerald-500/40 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        <div className="mb-8 rounded-3xl bg-white/5 dark:bg-slate-900/50 border border-white/10 p-5 text-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400 font-semibold">
                Tanlangan suralar
              </p>
              <p className="mt-2 text-2xl font-bold text-white">
                {selectedSurahs.length} ta
              </p>
            </div>
            <div className="text-sm text-slate-400">
              {selectedSurahs.length > 0
                ? "Tanlangan suralaringizni pastdagi kartalarda ko'rishingiz mumkin."
                : "Hozircha biror sura tanlanmadi."}
            </div>
          </div>
        </div>

        {/* --- SURAH GRID (Yaxshilangan masofa gap-4/gap-6) --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {displaySurahs.map((surah) => {
            const isChecked = selectedSurahs.includes(surah.id);
            return (
              <div
                key={surah.id}
                onClick={() => toggleSurah(surah.id)}
                className={`relative p-5 md:p-7 rounded-[32px] border transition-all duration-500 cursor-pointer group ${
                  isChecked
                    ? "bg-emerald-500/10 border-emerald-500 shadow-[0_10px_40px_rgba(16,185,129,0.1)] scale-[1.02]"
                    : "bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                {/* Check Icon */}
                <div className="absolute top-6 right-6">
                  <div
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isChecked
                        ? "bg-emerald-500 border-emerald-400 scale-110"
                        : "border-white/10 bg-black/20"
                    }`}
                  >
                    {isChecked && (
                      <Check className="w-4 h-4 text-black stroke-[4]" />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <span
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-sm border ${
                      isChecked
                        ? "bg-emerald-500 text-black border-emerald-400"
                        : "bg-white/5 text-slate-500 border-white/10"
                    }`}
                  >
                    {surah.id}
                  </span>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors mb-1 truncate">
                      {surah.name}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em]">
                      {surah.verses} Oyat • {surah.type}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                      Surah
                    </span>
                    <span
                      className={`text-2xl font-serif transition-colors ${isChecked ? "text-emerald-400" : "text-slate-400"}`}
                    >
                      {surah.arabic}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {displaySurahs.length === 0 && (
          <div className="text-center py-32 rounded-[40px] border-2 border-dashed border-white/5">
            <p className="text-slate-500 text-xl">Sura topilmadi.</p>
          </div>
        )}
      </main>
    </div>
  );
}
