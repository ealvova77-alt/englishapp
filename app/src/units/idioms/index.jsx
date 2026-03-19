export default function IdiomsUnit({ onBack }) {
  return (
    <div className="min-h-screen text-zinc-900">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-4">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Назад
        </button>
        <div className="text-center">
          <div className="text-5xl mb-4">💬</div>
          <h2 className="text-xl font-bold text-zinc-800 mb-2">Идиомы и фразовые глаголы</h2>
          <p className="text-zinc-500">Скоро будет доступно</p>
        </div>
      </div>
    </div>
  );
}
