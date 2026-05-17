import React, { useState } from "react";
import { Check, Search, BookOpen, Layers, CheckCircle2 } from "lucide-react";

// Suralar ro'yxati (boshlang'ich ma'lumotlar)
const initialSurahs = [
  { id: 1, name: "Al-Fatiha", arabic: "الفاتحة", verses: 7, type: "Makkah" },
  { id: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286, type: "Madinah" },
  { id: 3, name: "Al-Imran", arabic: "آل عمران", verses: 200, type: "Madinah" },
  { id: 4, name: "An-Nisa", arabic: "النساء", verses: 176, type: "Madinah" },
  {
    id: 5,
    name: "Al-Ma'idah",
    arabic: "المائدة",
    verses: 120,
    type: "Madinah",
  },
  { id: 6, name: "Al-An'am", arabic: "الأنعام", verses: 165, type: "Makkah" },
  { id: 7, name: "Al-A'raf", arabic: "الأعراف", verses: 206, type: "Makkah" },
  { id: 8, name: "Al-Anfal", arabic: "الأنفال", verses: 75, type: "Madinah" },
  { id: 9, name: "At-Tawbah", arabic: "التوبة", verses: 129, type: "Madinah" },
  { id: 10, name: "Yunus", arabic: "يونس", verses: 109, type: "Makkah" },
  { id: 11, name: "Hud", arabic: "هود", verses: 123, type: "Makkah" },
  { id: 12, name: "Yusuf", arabic: "يوسف", verses: 111, type: "Makkah" },
];

export default function Home() {
  const [selectedSurahs, setSelectedSurahs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Surani tanlash yoki o'chirish (Tick / Untick) funksiyasi
  const toggleSurah = (id) => {
    if (selectedSurahs.includes(id)) {
      setSelectedSurahs(selectedSurahs.filter((surahId) => surahId !== id));
    } else {
      setSelectedSurahs([...selectedSurahs, id]);
    }
  };

  // Qidiruv bo'yicha filterlash
  const filteredSurahs = initialSurahs.filter((surah) =>
    surah.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans antialiased relative overflow-hidden pb-20">
      {/* --- BACKGROUND GLOW EFFECTS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/5 blur-[150px] pointer-events-none" />

      {/* --- HERO BANNER --- */}
      <main className="max-w-7xl mx-auto px-6 pt-16 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Al-Qur'an Karim
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Quran Surah{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Picker Panel
            </span>
          </h1>
          <p className="text-slate-700 dark:text-slate-400 text-base md:text-lg leading-relaxed">
            Kerakli suralarni belgilang (tick), ularni kuzatib boring va o'z
            ro'yxatingizni shakllantiring.
          </p>
        </div>

        {/* --- STATISTIKA VA QIDIRUV PANELI --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Qidiruv input */}
          <div className="md:col-span-2 relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Surani nomi bo'yicha qidiring..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50/95 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-800/80 text-slate-900 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 backdrop-blur-xl transition-all"
            />
          </div>

          {/* Info Card (Tanlanganlar soni) */}
          <div className="h-14 px-5 rounded-2xl bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800/80 backdrop-blur-xl flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2.5 text-slate-400 text-sm font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Tanlangan suralar:
            </div>
            <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm min-w-8 text-center">
              {selectedSurahs.length}
            </span>
          </div>
        </div>

        {/* --- SURALAR RO'YXATI (GRID LAYOUT) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSurahs.map((surah) => {
            const isChecked = selectedSurahs.includes(surah.id);
            return (
              <div
                key={surah.id}
                onClick={() => toggleSurah(surah.id)}
                className={`relative group p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                  isChecked
                    ? "bg-gradient-to-br from-emerald-200/70 to-slate-50 border-emerald-400/40 shadow-[0_4px_25px_rgba(16,185,129,0.12)] dark:from-emerald-950/30 dark:to-slate-900/80"
                    : "bg-slate-50/95 dark:bg-slate-900/30 border-slate-200/70 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-900/50 shadow-md"
                }`}
              >
                {/* Tepada joylashgan Tick / Checkbox qismi */}
                <div className="absolute top-4 right-4 flex items-center justify-center">
                  <div
                    className={`w-5.5 h-5.5 rounded-md border flex items-center justify-center transition-all duration-200 ${
                      isChecked
                        ? "bg-emerald-500 border-emerald-400 text-slate-950 shadow-[0_0_10px_rgba(52,211,153,0.4)]"
                        : "border-slate-700 group-hover:border-slate-500 bg-slate-950/40"
                    }`}
                  >
                    {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                </div>

                {/* Sura tartib raqami va ma'lumotlari */}
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl font-bold text-sm flex items-center justify-center border transition-colors duration-300 ${
                      isChecked
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-slate-950/40 border-slate-800 text-slate-400"
                    }`}
                  >
                    {surah.id}
                  </div>

                  <div className="flex flex-col pr-8">
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-200 tracking-tight group-hover:text-slate-700 dark:group-hover:text-white transition-colors">
                      {surah.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium tracking-wide mt-0.5">
                      {surah.verses} Oyat • {surah.type}
                    </span>
                  </div>
                </div>

                {/* Arabcha nomi (Pastki o'ng burchakda chiroyli fontda) */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-200/70 dark:border-slate-800/40 pt-3">
                  <span className="text-xs text-slate-500 tracking-wider">
                    SURAH
                  </span>
                  <span
                    className={`font-mono text-lg font-bold tracking-wide transition-colors ${
                      isChecked
                        ? "text-emerald-500"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {surah.arabic}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Agar qidiruv natijasi bo'sh bo'lsa */}
        {filteredSurahs.length === 0 && (
          <div className="text-center py-20 bg-slate-900/10 border border-dashed border-slate-800/80 rounded-3xl backdrop-blur-sm max-w-md mx-auto mt-10">
            <p className="text-slate-500 text-sm">
              Bunday nomli sura topilmadi.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
