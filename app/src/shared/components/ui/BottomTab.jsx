import { createElement } from "react";

export default function BottomTab({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-[11px] font-medium transition-all ${
        active ? "bg-blue-500 text-white shadow-sm" : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
      }`}
    >
      {createElement(Icon, { className: "h-5 w-5" })}
      <span className="truncate">{label}</span>
    </button>
  );
}
