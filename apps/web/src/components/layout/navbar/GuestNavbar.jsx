import { Link, NavLink } from "react-router-dom";
import useMobileMenu from "../../../hooks/useMobileMenu";
import MobileToggle from "./MobileToggle";
import NavLogo from "./NavLogo";
import {
  barClass,
  desktopLinkClass,
  mobileLinkClass,
  mobilePanelClass,
} from "./navStyles";

export default function GuestNavbar() {
  const { open, toggle } = useMobileMenu();

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
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold !text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md motion-reduce:transform-none"
          >
            Login
          </Link>
        </div>

        <MobileToggle open={open} onToggle={toggle} />
      </div>

      <div className={mobilePanelClass(open)}>
        <div className="overflow-hidden">
          <div className="border-t border-slate-100 px-4 pb-4 pt-3 sm:px-6">
            <nav className="space-y-1">
              <NavLink to="/" end className={mobileLinkClass}>
                Beranda
              </NavLink>
              <NavLink to="/fields" className={mobileLinkClass}>
                Lapangan
              </NavLink>
            </nav>

            <Link
              to="/login"
              className="mt-3 block rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}