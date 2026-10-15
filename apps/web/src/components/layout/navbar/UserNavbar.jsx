import { Link, NavLink } from "react-router-dom";
import useMobileMenu from "../../../hooks/useMobileMenu";
import { getInitials, getUserName } from "../../../utils/user";
import MobileToggle from "./MobileToggle";
import NavLogo from "./NavLogo";
import UserMenu from "./UserMenu";
import {
  barClass,
  desktopLinkClass,
  mobileLinkClass,
  mobilePanelClass,
} from "./navStyles";

export default function UserNavbar({ user, onLogout }) {
  const { open, toggle, close } = useMobileMenu();
  const name = getUserName(user);

  const handleLogout = () => {
    close();
    onLogout?.();
  };

  return (
    <>
      <div className={barClass}>
        <NavLogo />

        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/" end className={desktopLinkClass}>
            Beranda
          </NavLink>
          <NavLink to="/fields" className={desktopLinkClass}>
            Lapangan
          </NavLink>
          <NavLink to="/bookings" className={desktopLinkClass}>
            Booking Saya
          </NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/fields"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md motion-reduce:transform-none"
          >
            Booking Sekarang
          </Link>
          <UserMenu user={user} onLogout={onLogout} />
        </div>

        <MobileToggle open={open} onToggle={toggle} />
      </div>

      <div className={mobilePanelClass(open)}>
        <div className="overflow-hidden">
          <div className="border-t border-slate-100 px-4 pb-4 pt-3 sm:px-6">
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-blue-50 p-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-sm font-bold text-white">
                {getInitials(name)}
              </span>
              <div className="min-w-0">
                <p className="text-xs text-slate-500">Masuk sebagai</p>
                <p className="truncate text-sm font-semibold text-slate-900">
                  {name}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              <NavLink to="/" end className={mobileLinkClass}>
                Beranda
              </NavLink>
              <NavLink to="/fields" className={mobileLinkClass}>
                Lapangan
              </NavLink>
              <NavLink to="/bookings" className={mobileLinkClass}>
                Booking Saya
              </NavLink>
            </nav>

            <div className="mt-3 grid gap-2">
              <Link
                to="/fields"
                className="block rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Booking Sekarang
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}