import { Link, Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

export default function PublicLayout({ user, onLogout }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar user={user} onLogout={onLogout} />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <p className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-sky-400 text-xs">
              ⚽
            </span>
            © 2026 Futsal Booking. Pesan lapangan dengan mudah.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="transition hover:text-blue-600">
              Beranda
            </Link>
            <Link to="/fields" className="transition hover:text-blue-600">
              Lapangan
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}