import useScrolled from "../../../hooks/useScrolled";
import GuestNavbar from "./GuestNavbar";
import UserNavbar from "./UserNavbar";

export default function Navbar({ user, onLogout }) {
  const scrolled = useScrolled();

  return (
    <header
      className={`sticky top-0 z-30 animate-[navIn_0.5s_ease-out] border-b bg-white/90 backdrop-blur transition-shadow duration-300 motion-reduce:animate-none ${
        scrolled
          ? "border-slate-200 shadow-md shadow-slate-900/5"
          : "border-slate-200/70"
      }`}
    >
      {user ? (
        <UserNavbar user={user} onLogout={onLogout} />
      ) : (
        <GuestNavbar />
      )}

      <style>{`
        @keyframes navIn {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </header>
  );
}