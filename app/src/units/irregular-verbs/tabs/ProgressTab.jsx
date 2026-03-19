import { Brain, CheckCircle2, Download, Flame, Share2, Star, Trophy, Upload, X } from "lucide-react";
import { useAppContext } from "../../../shared/context/useAppContext";
import StatCard from "../../../shared/components/ui/StatCard";
import Badge from "../../../shared/components/ui/Badge";

export default function ProgressTab({ openStat, setOpenStat }) {
  const {
    stats, settings, setSettings, appMeta, verbCount,
    todayDone, dailyGoalPercent, masteredPercent,
    exportProgress, importProgress, resetAll, shareApp, fileInputRef,
  } = useAppContext();

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <StatCard icon={CheckCircle2} label="Выучено" value={`${stats.mastered}/${verbCount}`} hint={`${verbCount} глаголов`} onClick={() => setOpenStat(openStat === "mastered" ? null : "mastered")} active={openStat === "mastered"} />
        <StatCard icon={Trophy} label="Точность" value={`${stats.accuracy}%`} />
        <StatCard icon={Star} label="Избранное" value={stats.starred} onClick={() => setOpenStat(openStat === "starred" ? null : "starred")} active={openStat === "starred"} />
        <StatCard icon={Brain} label="Повторений" value={stats.reviews} onClick={() => setOpenStat(openStat === "reviews" ? null : "reviews")} active={openStat === "reviews"} />
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-zinc-500">Дневная цель</div>
            <div className="mt-1 text-2xl font-bold text-zinc-800">{todayDone} / {settings.dailyGoal}</div>
          </div>
          <Badge tone="dark">{dailyGoalPercent}%</Badge>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-100"><div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${dailyGoalPercent}%` }} /></div>
        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-zinc-500"><span>Общий прогресс</span><span>{masteredPercent}% списка</span></div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-100"><div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${masteredPercent}%` }} /></div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm font-medium text-zinc-500">Серия дней</div>
            <div className="mt-1 flex items-center gap-2 text-2xl font-bold text-zinc-800"><Flame className="h-6 w-6 text-amber-500" />{appMeta.streak || 0}</div>
          </div>
          <Badge tone="rose">{stats.hard} сложных</Badge>
        </div>
        <div className="mt-5 space-y-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-600">Цель в день</label>
            <input type="number" min="5" max="200" value={settings.dailyGoal} onChange={(e) => setSettings((prev) => ({ ...prev, dailyGoal: Math.max(5, Number(e.target.value) || 20) }))} className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 outline-none transition-all focus:border-blue-400 focus:ring-1 focus:ring-blue-400" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-600">Скорость озвучки</label>
            <input type="range" min="0.7" max="1.1" step="0.05" value={settings.speechRate} onChange={(e) => setSettings((prev) => ({ ...prev, speechRate: Number(e.target.value) }))} className="w-full accent-blue-500" />
            <div className="mt-1 text-sm text-zinc-500">{settings.speechRate.toFixed(2)}x</div>
          </div>
          <button onClick={() => setSettings((prev) => ({ ...prev, autoplayAudio: !prev.autoplayAudio }))} className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all active:scale-[0.98] ${settings.autoplayAudio ? "bg-blue-500 text-white shadow-sm" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"}`}>{settings.autoplayAudio ? "Автоозвучка включена" : "Включить автоозвучку карточек"}</button>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="text-lg font-bold text-zinc-800">Данные</div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button onClick={exportProgress} className="flex items-center justify-center gap-2 rounded-xl bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-600 border border-zinc-200 transition-all hover:border-blue-300 hover:text-blue-600 active:scale-[0.98]"><Download className="h-4 w-4" />Экспорт</button>
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 rounded-xl bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-600 border border-zinc-200 transition-all hover:border-blue-300 hover:text-blue-600 active:scale-[0.98]"><Upload className="h-4 w-4" />Импорт</button>
          <button onClick={shareApp} className="flex items-center justify-center gap-2 rounded-xl bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-600 border border-zinc-200 transition-all hover:border-blue-300 hover:text-blue-600 active:scale-[0.98]"><Share2 className="h-4 w-4" />Поделиться</button>
          <button onClick={resetAll} className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 border border-red-200 transition-all hover:bg-red-100 active:scale-[0.98]"><X className="h-4 w-4" />Сбросить</button>
        </div>
        <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={importProgress} />
      </div>
    </div>
  );
}
