
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { demoUsers } from "../../data/authData";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const requestedDestination = params.get("next");

  const destination =
    requestedDestination?.startsWith("/") &&
    !requestedDestination.startsWith("//") &&
    !requestedDestination.startsWith("/admin")
      ? requestedDestination
      : "/booking";

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const account = demoUsers.find(
      (user) => user.id === userId && user.password === password
    );

    if (!account) {
      setError("Akun atau password tidak sesuai.");
      return;
    }

    onLogin({
      id: account.id,
      name: account.name,
      email: account.email,
    });

    navigate(destination, { replace: true });
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Link
          to="/"
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          ← Kembali ke beranda
        </Link>

        <h1 className="mt-6 text-2xl font-extrabold">Login User</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Pilih akun yang sudah didaftarkan oleh admin, kemudian masukkan
          password untuk melanjutkan booking.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="userId"
              className="mb-2 block text-sm font-semibold"
            >
              Pilih akun
            </label>
            <select
              id="userId"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 outline-none focus:border-emerald-600"
            >
              <option value="">-- Pilih akun user --</option>
              {demoUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} — {user.email}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              placeholder="Masukkan password"
              className="w-full rounded-xl border border-slate-300 px-3 py-3 outline-none focus:border-emerald-600"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Login dan Lanjutkan
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Akun demo</p>
          <p className="mt-1">Password semua akun: user123</p>
          <p className="mt-2 text-xs leading-5">
            Akun demo hanya untuk pengujian. Dalam aplikasi sebenarnya,
            akun dan password dikelola secara aman oleh backend.
          </p>
        </div>
      </div>
    </section>
  );
}
