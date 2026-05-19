import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  RefreshCw,
  Check,
  Clock,
  ChevronDown,
  BookOpen,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import surahData from "../data/surahData";
import prayerData from "../data/prayerData";
import { SelectedSurahContext } from "../context/SelectedSurahContext";

const getRandomPair = (surahs) => {
  if (!surahs || surahs.length < 2) return null;

  const firstIndex = Math.floor(Math.random() * surahs.length);
  let secondIndex = Math.floor(Math.random() * surahs.length);

  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * surahs.length);
  }

  return [surahs[firstIndex], surahs[secondIndex]];
};

export default function RandomPairs() {
  const { selectedSurahs } = useContext(SelectedSurahContext);
  const [selectedPrayer, setSelectedPrayer] = useState("");
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);

  const homeSurahs = useMemo(
    () => surahData.filter((surah) => selectedSurahs.includes(surah.id)),
    [selectedSurahs],
  );

  const prayerSurahs = useMemo(
    () => (selectedPrayer ? prayerData[selectedPrayer] || [] : []),
    [selectedPrayer],
  );

  const sourceSurahs = selectedPrayer ? prayerSurahs : homeSurahs;
  const [pair, setPair] = useState(() => getRandomPair(sourceSurahs));

  useEffect(() => {
    setPair(getRandomPair(sourceSurahs));
  }, [sourceSurahs]);

  const createNewPair = () => {
    if (sourceSurahs.length < 2) return;
    setPair(getRandomPair(sourceSurahs));
  };

  const canGenerate = sourceSurahs.length >= 2;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Dizayn uchun orqa fon chiroqlari */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        {/* Yuqori ixcham Header */}
        <div className="flex items-center gap-3 bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-md">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Smart Surah Matcher
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Namoz rakaatlari uchun tasodifiy suralar kombinatsiyasi
            </p>
          </div>
        </div>

        {/* ASOSIY YANGI STRUKTURA: Chap va O'ng panel kombinatsiyasi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CHAP PANEL: Boshqaruv va Sozlamalar (4 Kolonka) */}
          <div className="lg:col-span-4 space-y-5">
            {/* 1. Manba va Filtr qutisi */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-slate-400 font-black mb-2">
                  1. Namoz Vaqtini Tanlang
                </label>

                <div className="relative">
                  <button
                    onClick={() => setIsPrayerOpen((current) => !current)}
                    className="w-full h-14 px-4 bg-slate-950 border-2 border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between transition-all font-bold text-base text-slate-200 cursor-pointer"
                  >
                    <span className="truncate">
                      {selectedPrayer
                        ? `${selectedPrayer} suralari`
                        : "Barcha suralar (Home)"}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-emerald-400 transition-transform ${isPrayerOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isPrayerOpen && (
                    <div className="absolute top-[105%] left-0 w-full bg-slate-950 border-2 border-slate-800 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                      <button
                        onClick={() => {
                          setSelectedPrayer("");
                          setIsPrayerOpen(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm font-bold text-slate-300 hover:bg-slate-900 border-b border-slate-900"
                      >
                        Barcha tanlangan suralar (Home)
                      </button>
                      {Object.keys(prayerData || {}).map((prayer) => (
                        <button
                          key={prayer}
                          onClick={() => {
                            setSelectedPrayer(prayer);
                            setIsPrayerOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm font-bold text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors border-b border-slate-900 last:border-none"
                        >
                          {prayer} vaqti suralari
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Suralar soni indikatori */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  Suralar bazasi:
                </div>
                <span className="px-3 py-1 bg-slate-900 text-emerald-400 text-sm font-black rounded-lg border border-slate-800">
                  {sourceSurahs.length} ta sura
                </span>
              </div>

              {/* Generatsiya tugmasi shu yerga ko'chirildi (Chap panelda juda mos tushadi) */}
              <button
                onClick={createNewPair}
                disabled={!canGenerate}
                className={`w-full py-4 rounded-xl text-base font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                  canGenerate
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-40"
                }`}
              >
                <RefreshCw className="w-5 h-5" />
                Yangi Juftlik Saralash
              </button>
            </div>

            {/* 2. Aktiv Suralar ro'yxati (Kichik ko'rinishda pastda) */}
            {sourceSurahs.length > 0 && (
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-5 space-y-3">
                <h3 className="text-xs uppercase tracking-widest text-slate-400 font-black">
                  Faol suralar ro'yxati
                </h3>
                <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
                  {sourceSurahs.map((surah) => (
                    <span
                      key={surah.id}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-850 text-slate-300 text-xs font-bold flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {surah.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* O'NG PANEL: Asosiy Katta Natija Ekrani (8 Kolonka) */}
          <div className="lg:col-span-8">
            {sourceSurahs.length < 2 ? (
              /* Suralar yetishmaganda xabarnoma */
              <div className="w-full bg-slate-900/40 border-2 border-dashed border-slate-800 rounded-[32px] p-8 sm:p-16 text-center text-slate-400 backdrop-blur-sm">
                <HelpCircle className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                  Kombinatsiya hosil qilib bo'lmaydi
                </h2>
                <p className="max-w-md mx-auto text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
                  {selectedPrayer
                    ? `${selectedPrayer} vaqti ro'yxatida kamida 2 ta sura kiritilgan bo'lishi kerak.`
                    : "Iltimos, bosh sahifaga (Home) o'tib, tasodifiy juftlik yaratish uchun kamida 2 ta surani tanlang."}
                </p>
              </div>
            ) : (
              /* Muhtasham Natija Kartasi */
              <div className="bg-slate-900 border-2 border-slate-800 rounded-[32px] p-5 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
                {/* Tepasidagi vizual indikator chizig'i */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500" />

                {/* Katta Arabcha va Transkripsiya sarlavhasi */}
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-black">
                      Tanlangan Kombinatsiya
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {pair?.[0]?.name} + {pair?.[1]?.name}
                    </h2>
                  </div>
                  {pair?.[0] && pair?.[1] && (
                    <div className="text-3xl sm:text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-bold tracking-wide">
                      {pair[0].arabic} • {pair[1].arabic}
                    </div>
                  )}
                </div>

                {/* Rakaatlar bo'yicha Ikkita Katta Blok (Yonma-yon yoki Ketma-ket) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 1-Rakaat */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 relative group transition-all hover:border-emerald-500/30">
                    <div className="absolute top-4 right-4 text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">
                      RAKAAT I
                    </div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                      Birinchi rakaatda o'qiladi
                    </p>
                    <h3 className="text-3xl font-black text-white tracking-tight">
                      {pair?.[0]?.name || "---"}
                    </h3>
                    <div className="mt-6 flex items-center gap-4 text-sm font-bold text-slate-400 pt-4 border-t border-slate-900">
                      <div>
                        Oyatlar:{" "}
                        <span className="text-white font-black">
                          {pair?.[0]?.verses || 0} ta
                        </span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      <div>
                        Turi:{" "}
                        <span className="text-slate-300 font-black">
                          {pair?.[0]?.type || "---"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2-Rakaat */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 relative group transition-all hover:border-teal-500/30">
                    <div className="absolute top-4 right-4 text-xs font-black text-teal-400 bg-teal-500/10 px-2 py-1 rounded-md">
                      RAKAAT II
                    </div>
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">
                      Ikkinchi rakaatda o'qiladi
                    </p>
                    <h3 className="text-3xl font-black text-white tracking-tight">
                      {pair?.[1]?.name || "---"}
                    </h3>
                    <div className="mt-6 flex items-center gap-4 text-sm font-bold text-slate-400 pt-4 border-t border-slate-900">
                      <div>
                        Oyatlar:{" "}
                        <span className="text-white font-black">
                          {pair?.[1]?.verses || 0} ta
                        </span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                      <div>
                        Turi:{" "}
                        <span className="text-slate-300 font-black">
                          {pair?.[1]?.type || "---"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pastki qismdagi Tasdiq belgisi va Eslatma */}
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-850/80 flex items-start gap-3">
                  <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                    Ushbu suralar tasodifiy tanlandi. Namozda tartib bo'yicha
                    Qur'ondagi ketma-ketlikka (masalan, uzunroq surani birinchi
                    rakaatda o'qishga) e'tibor berish tavsiya etiladi.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
