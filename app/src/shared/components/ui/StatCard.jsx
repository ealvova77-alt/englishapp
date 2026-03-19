import { createElement } from "react";

export default function StatCard({ icon: Icon, label, value, hint, onClick, active }) {
  return (
    <button onClick={onClick} className={`min-w-0 rounded-2xl bg-white p-3 text-left transition-all border sm:p-4 active:scale-[0.98] ${active ? "border-blue-400 shadow-md ring-1 ring-blue-400" : "border-zinc-200 shadow-sm hover:shadow-md hover:border-blue-300"}`}>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="shrink-0 rounded-xl bg-blue-50 p-2">
          {createElement(Icon, { className: "h-4 w-4 text-blue-600 sm:h-5 sm:w-5" })}
        </div>
        <div className="min-w-0">
          <div className="truncate text-xs text-zinc-400 sm:text-sm">{label}</div>
          <div className="truncate text-lg font-semibold leading-tight text-zinc-900 sm:text-2xl">{value}</div>
          {hint ? <div className="mt-0.5 truncate text-[11px] text-zinc-400 sm:text-xs">{hint}</div> : null}
        </div>
      </div>
    </button>
  );
}
