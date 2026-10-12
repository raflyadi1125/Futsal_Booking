
import {
  LayoutDashboard,
  Trophy,
  CalendarCheck,
  CreditCard,
  ChartNoAxesCombined,
  Settings,
  LogOut,
  CircleHelp,
  X,
} from 'lucide-react';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Manajemen Lapangan', icon: Trophy },
  { label: 'Manajemen Booking', icon: CalendarCheck },
  { label: 'Pembayaran', icon: CreditCard },
  { label: 'Laporan', icon: ChartNoAxesCombined },
];

export default function Sidebar({
  activePage,
  onNavigate,
  open,
  onClose,
}) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-[#0D1526] transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-slate-800 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <Trophy size={23} />
            </div>

            <div>
              <h1 className="font-semibold tracking-wide text-white">
                FUTSAL BOOKING
              </h1>
              <p className="mt-0.5 text-[10px] tracking-[0.18em] text-slate-500">
                ADMIN PANEL
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Tutup sidebar"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-semibold tracking-[0.18em] text-slate-500">
            MENU UTAMA
          </p>

          <nav className="space-y-1">
            {menuItems.map(({ label, icon: Icon }) => {
              const active = activePage === label;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    onNavigate(label);
                    onClose();
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition-colors ${
                    active
                      ? 'bg-blue-500/10 font-medium text-blue-300 ring-1 ring-inset ring-blue-400/15'
                      : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
                  }`}
                >
                  <Icon size={19} />
                  <span>{label}</span>

                  {label === 'Pembayaran' && (
                    <span className="ml-auto rounded-md bg-amber-400/10 px-2 py-0.5 text-xs text-amber-300">
                      12
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-800 p-4">
          <button
            type="button"
            onClick={() => alert('Pengaturan akan dibuat pada tahap berikutnya.')}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <Settings size={19} />
            Pengaturan
          </button>

          <button
            type="button"
            onClick={() => alert('Pusat bantuan belum tersedia.')}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <CircleHelp size={19} />
            Pusat Bantuan
          </button>

          <div className="mt-4 flex items-center gap-3 border-t border-slate-800 pt-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-700 font-semibold text-slate-200">
              A
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-200">
                Administrator
              </p>
              <p className="text-xs text-slate-500">Admin</p>
            </div>

            <LogOut size={17} className="text-slate-500" />
          </div>
        </div>
      </aside>
    </>
  );
}
