export default function MobileToggle({ open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Tutup menu" : "Buka menu"}
      aria-expanded={open}
      className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 md:hidden"
    >
      <span className="relative block h-4 w-5">
        <span
          className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
            open ? "top-1.5 rotate-45" : "top-0"
          }`}
        />
        <span
          className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-current transition-opacity duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-300 ${
            open ? "top-1.5 -rotate-45" : "top-3"
          }`}
        />
      </span>
    </button>
  );
}