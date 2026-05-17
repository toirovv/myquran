import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 text-slate-300 py-14 px-6">
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-3xl bg-emerald-500 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.25)]">
              <span className="text-slate-950 font-black text-lg">Q</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">MyQuran</h2>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-400 font-semibold">
                Ruhiy yo‘l hamrohingiz
              </p>
            </div>
          </div>
          <p className="text-sm leading-7 text-slate-400 max-w-sm">
            Surah tanlash, duo va xotira yo‘li bilan har kunligingizni yangi bir
            tajribaga aylantiring.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg">Tezkor bo‘limlar</h3>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/random-pairs"
                className="hover:text-white transition-colors"
              >
                Random Pairs
              </a>
            </li>
            <li>
              <a
                href="/reading-history"
                className="hover:text-white transition-colors"
              >
                Reading History
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg">
            Biz bilan bog‘laning
          </h3>
          <p className="text-slate-400 text-sm leading-6">
            Suhbat, taklif yoki yordam kerak bo‘lsa, bizga murojaat qiling.
          </p>
          <div className="flex items-center gap-3"></div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-center text-[11px] uppercase tracking-[0.35em] text-slate-500">
        © {new Date().getFullYear()} MyQuran — All rights reserved
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }) {
  return (
    <a
      href={href}
      className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition"
    >
      {icon}
    </a>
  );
}
