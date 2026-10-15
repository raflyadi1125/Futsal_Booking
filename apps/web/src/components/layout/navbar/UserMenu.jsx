import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useClickOutside from "../../../hooks/useClickOutside";
import { getInitials, getUserName } from "../../../utils/user";

function Chevron({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function UserMenu({ user, onLogout }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const name = getUserName(user);

  useClickOutside(ref, close, open);

  const handleLogout = () => {
    close();
    onLogout?.();
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:ring-blue-300"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-xs font-bold text-white">
          {getInitials(name)}
        </span>
        <span className="max-w-[120px] truncate">{name}</span>
        <Chevron
          className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        role="menu"
        className={`absolute right-0 mt-2 w-56 origin-top-right rounded-2xl bg-white p-2 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200 transition duration-200 motion-reduce:transition-none ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="border-b border-slate-100 px-3 pb-2 pt-1">
          <p className="text-xs text-slate-400">Masuk sebagai</p>
          <p className="truncate text-sm font-semibold text-slate-800">{name}</p>
        </div>

        <Link
          to="/bookings"
          role="menuitem"
          onClick={close}
          className="mt-1 block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
        >
          Booking Saya
        </Link>
        <button
          type="button"
          role="menuitem"
          onClick={handleLogout}
          className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Keluar
        </button>
      </div>
    </div>
  );
}