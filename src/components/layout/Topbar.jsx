
import { Bell, Menu, Search, ChevronDown } from 'lucide-react';

export default function Topbar({ onMenuClick, activePage }) {
  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between gap-4 border-b border-slate-800 bg-[#0B1120]/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Buka menu"
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold text-slate-100">
            {activePage}
          </h2>
          <p className="hidden text-xs text-slate-500 sm:block">
            Futsal Booking / {activePage}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <label className="hidden h-10 w-52 items-center gap-2 rounded-lg border border-slate-800 bg-[#111C30] px-3 md:flex lg:w-64">
          <Search size={17} className="shrink-0 text-slate-500" />
          <input
            type="search"
            placeholder="Cari sesuatu..."
            aria-label="Cari sesuatu"
            className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
          />
        </label>

        <button
          type="button"
          aria-label="Notifikasi"
          onClick={() => alert('Notifikasi akan diaktifkan pada tahap berikutnya.')}
          className="relative rounded-lg border border-slate-800 p-2.5 text-slate-400 hover:bg-slate-800"
        >
          <Bell size={19} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-400 ring-2 ring-[#0B1120]" />
        </button>

        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg px-2 py-2 hover:bg-slate-800 sm:flex"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/15 text-sm font-semibold text-blue-300">
            A
          </div>
          <ChevronDown size={16} className="text-slate-500" />
        </button>
      </div>
    </header>
  );
}
