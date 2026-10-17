import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// Akun admin (tetap).
const ADMIN_ACCOUNT = {
  name: "Administrator",
  email: "admin@futsal.test",
  password: "admin123",
};

// Tujuan setelah login untuk tiap peran. Sesuaikan dengan route di App.jsx.
const REDIRECT_BY_ROLE = {
  admin: "/admin",
  user: "/",
};

const ROLE_OPTIONS = [
  { value: "user", label: "Pengguna" },
  { value: "admin", label: "Admin" },
];

const inputClass =
  "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-500";

// Hanya terima tujuan internal (diawali "/") dari parameter ?next=
function getSafeNext(value) {
  return value && value.startsWith("/") && !value.startsWith("//")
    ? value
    : "";
}

export default function Login({ onLogin, defaultRole = "user" }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState(defaultRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isAdmin = role === "admin";

  // Ada tujuan yang menunggu (misalnya pengguna menekan Booking sebelum login)
  const nextPath = getSafeNext(searchParams.get("next"));

  function handleRoleChange(nextRole) {
    setRole(nextRole);
    setPassword("");
    setError("");
  }

  
 
  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();

    setError("");
    setLoading(true);

    try {
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:3000";

      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal.");
      }

      if (!data.user || !data.token) {
        throw new Error("Respons login dari server tidak lengkap.");
      }

      const account = {
        ...data.user,
        role: String(data.user.role).toLowerCase(),
        token: data.token,
      };

      if (isAdmin && account.role !== "admin") {
        throw new Error("Akun ini bukan akun administrator.");
      }

      if (!isAdmin && account.role !== "user") {
        throw new Error("Silakan gunakan tab Admin untuk akun ini.");
      }

      onLogin(account);

      if (account.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate(nextPath || "/", { replace: true });
      }
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Tidak dapat terhubung ke server. Pastikan backend berjalan."
          : err.message || "Terjadi kesalahan saat login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 text-slate-100">
      <div className="flex min-h-full items-center justify-center px-4 py-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
          <Link
            to="/"
            className="text-xs font-medium text-slate-400 hover:text-white"
          >
            ← Kembali ke halaman publik
          </Link>

          <div className="mt-4">
            <p className="text-xs font-semibold text-emerald-400">
              FUTSAL BOOKING
            </p>
            <h1 className="mt-1 text-2xl font-bold">
              Login {isAdmin ? "Administrator" : "Pengguna"}
            </h1>
            <p className="mt-1.5 text-xs leading-5 text-slate-400">
              {isAdmin
                ? "Khusus pengelola untuk mengakses dashboard dan mengelola operasional lapangan."
                : "Masuk menggunakan email dan password akun yang telah terdaftar."}
            </p>
          </div>

          {!isAdmin && nextPath && (
            <p className="mt-4 rounded-lg bg-amber-500/10 px-3 py-2.5 text-xs leading-5 text-amber-300">
              Silakan login terlebih dahulu untuk melanjutkan booking.
            </p>
          )}

          <div
            role="tablist"
            aria-label="Pilih peran"
            className="mt-4 grid grid-cols-2 gap-1 rounded-lg bg-slate-950 p-1"
          >
            {ROLE_OPTIONS.map((option) => {
              const active = role === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleRoleChange(option.value)}
                  className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
                    active
                      ? "bg-emerald-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <label
                htmlFor="loginEmail"
                className="mb-1 block text-xs font-medium"
              >
                {isAdmin ? "Email admin" : "Email"}
              </label>
              <input
                id="loginEmail"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete={isAdmin ? "username" : "email"}
                required
                placeholder={isAdmin ? ADMIN_ACCOUNT.email : "nama@email.com"}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="loginPassword"
                className="mb-1 block text-xs font-medium"
              >
                Password
              </label>
              <input
                id="loginPassword"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                placeholder="Masukkan password"
                className={inputClass}
              />
            </div>

            {error && (
              <p role="alert" className="text-xs text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              {loading
              ? "Memproses..."
              : isAdmin
              ? "Masuk ke Dashboard"
              : "Masuk"}
            </button>
          </form>

          <div className="mt-4 rounded-lg bg-slate-800 px-3 py-2.5 text-xs leading-5 text-slate-300">
            <p className="font-semibold">
              Kredensial demo ({isAdmin ? "Admin" : "Pengguna"})
            </p>
            {isAdmin ? (
              <p>
                {ADMIN_ACCOUNT.email} / {ADMIN_ACCOUNT.password}
              </p>
            ) : (
              <p>
                Contoh akun: andi@futsal.test / user123
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}