
import { Link, NavLink, Outlet } from "react-router-dom";

export default function PublicLayout({ user, onLogout }) {
  const navClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive
        ? "text-emerald-700"
        : "text-slate-600 hover:text-emerald-700"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-extrabold tracking-tight">
            Futsal<span className="text-emerald-600">Booking</span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            <NavLink to="/" end className={navClass}>
              Beranda
            </NavLink>
            <NavLink to="/fields" className={navClass}>
              Lapangan
            </NavLink>

            {user ? (
              <>
                <Link
                  to="/bookings"
                  className="hidden text-sm font-medium text-slate-600 sm:block"
                >
                  Booking Saya
                </Link>
                <button
                  onClick={onLogout}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-500 sm:px-6 lg:px-8">
          © 2026 Futsal Booking. Pesan lapangan dengan mudah.
        </div>
      </footer>
    </div>
  );
}
