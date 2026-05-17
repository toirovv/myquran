import React from "react";
import { Clock, BookOpen, ClipboardList } from "lucide-react";
import readingHistory from "../data/readingHistory";

export default function ReadingHistory() {
  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 font-sans antialiased relative overflow-hidden pb-20">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[160px] pointer-events-none" />

      <main className="max-w-6xl mx-auto px-6 pt-10 relative z-10">
        <section className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/8 border border-emerald-500/15 text-emerald-500 text-xs font-semibold tracking-wide uppercase mb-4 backdrop-blur-sm">
            <Clock className="w-4 h-4" />
            Reading History
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            O'qish Tarixi
          </h1>
          <p className="text-slate-700 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Oxirgi o'qigan suralaringiz va progresslaringiz bu yerda saqlanadi.
            Har bir o'qish sessiyasi ruhiy sayohatingizni yorqinroq qiladi.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60 bg-slate-50/90 dark:bg-slate-950/40 p-6 md:p-8 shadow-2xl">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-bold mb-1">
                  O'qilganlar ro'yxati
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  So'nggi sessiyalar
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100/90 dark:bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 border border-slate-200/70 dark:border-slate-800/70">
                <ClipboardList className="w-4 h-4 text-emerald-400" />
                {readingHistory.length} yozuv
              </div>
            </div>

            <div className="space-y-4">
              {readingHistory.map((item) => (
                <div
                  key={item.chapter}
                  className="rounded-3xl border border-slate-200/70 dark:border-slate-800/70 bg-white/95 dark:bg-slate-900/30 p-5 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                        {item.chapter}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {item.date}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                        item.progress === "To'liq"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : item.progress === "Yarim"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-sky-500/10 text-sky-600 dark:text-sky-400"
                      } border border-current/10`}
                    >
                      {item.progress}
                    </span>
                  </div>
                  <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {item.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200/70 dark:border-slate-800/60 bg-slate-50/90 dark:bg-slate-950/40 p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <BookOpen className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-400 font-bold">
                  Statistika
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
                  O'qish ritmingizni kuzatish.
                </p>
              </div>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm">
              <div className="rounded-2xl bg-slate-100/90 dark:bg-slate-900/30 p-4 border border-slate-200/70 dark:border-slate-800/70">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Uyuzlik
                </p>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  O'rtacha o'qish davomiyligi: 25 daqiqa.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-100/90 dark:bg-slate-900/30 p-4 border border-slate-200/70 dark:border-slate-800/70">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Manafa
                </p>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Suralar orqali hayotingizdagi ibodat ritmini yaxshilang.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-100/90 dark:bg-slate-900/30 p-4 border border-slate-200/70 dark:border-slate-800/70">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Qisqacha tavsiya
                </p>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  Har kuni 1-2 qism oʻqishni davom ettirsangiz, oʻqish odatingiz
                  tezda barqarorlashadi.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
