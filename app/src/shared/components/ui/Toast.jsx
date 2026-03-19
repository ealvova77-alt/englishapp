export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed left-1/2 top-4 z-40 -translate-x-1/2 rounded-full bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md">
      {message}
    </div>
  );
}
