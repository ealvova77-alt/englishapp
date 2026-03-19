export default function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition ${
        active ? "bg-blue-500 text-white shadow-sm" : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 hover:border-blue-300"
      }`}
    >
      {children}
    </button>
  );
}
