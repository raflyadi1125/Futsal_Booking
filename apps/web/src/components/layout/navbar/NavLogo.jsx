import { Link } from "react-router-dom";

export default function NavLogo() {
  return (
    <Link
      to="/"
      className="group flex items-center gap-2 text-xl font-extrabold tracking-tight"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 text-lg shadow-sm transition-transform duration-300 group-hover:rotate-12 motion-reduce:transform-none">
        ⚽
      </span>
      <span>
        Futsal<span className="text-blue-600">Booking</span>
      </span>
    </Link>
  );
}