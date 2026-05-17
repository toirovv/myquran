import React from "react";

export default function Footer() {
  return (
    <footer className="relative w-full px-6 pb-8 pt-10 mt-20">
      {/* Footerning asosiy suzuvchi konteyneri */}
      <div className="max-w-6xl mx-auto relative group">
        {/* Orqa fondagi neon nur (hover bo'lganda yorishadi) */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-[30px] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>

        <div className="relative bg-[#0D1117]/80 backdrop-blur-2xl border border-white/10 rounded-[30px] p-8 md:p-12 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
            {/* 1. Brend va Shior */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  <span className="text-slate-950 font-black text-xl">Q</span>
                </div>
                <span className="text-xl font-black text-white tracking-tighter">
                  MyQuran
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Qur'on o'qish va duolarni o'rganishda sizning raqamli
                hamrohingiz. Ruhiy yuksalish sari birga qadam tashlaymiz.
              </p>
            </div>

            {/* 2. Tezkor havolalar */}
            <div>
              <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">
                Bo'limlar
              </h4>
              <ul className="space-y-3 text-slate-400 text-sm font-medium">
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Suralar Picker
                </li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Namoz Juftliklari
                </li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                  O'qish Tarixi
                </li>
                <li className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Sozlamalar
                </li>
              </ul>
            </div>

            {/* 3. Bog'lanish */}
            <div>
              <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest">
                Aloqa
              </h4>
            </div>

            {/* 4. Obuna yoki Kichik Badge */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col justify-center items-center text-center">
              <StarIcon />
              <p className="text-white text-xs font-bold mt-3 uppercase tracking-tighter">
                Premium Support
              </p>
              <p className="text-slate-500 text-[10px] mt-1">
                Loyihani qo'llab-quvvatlang
              </p>
              <button className="mt-4 w-full py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 text-[10px] font-black rounded-xl transition-all duration-300">
                DONATE
              </button>
            </div>
          </div>

          {/* Pastki qism: Copyright */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-slate-500 text-xs font-medium">
              © {new Date().getFullYear()} MyQuran. Created with Passion.
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                Developed by
              </span>
              <span className="text-emerald-400 font-black text-xs hover:scale-105 transition-transform cursor-pointer">
                Asadbek
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function StarIcon() {
  return (
    <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center animate-bounce">
      <svg
        className="w-5 h-5 text-amber-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </div>
  );
}
