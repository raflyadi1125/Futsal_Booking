
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (
      email.trim().toLowerCase() !== "admin@futsal.test" ||
      password !== "admin123"
    ) {
      setError("Email atau password admin tidak sesuai.");
      return;
    }

    onLogin({
      name: "Administrator",
      email: "admin@futsal.test",
    });

    navigate("/admin", { replace: true });
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-7 sm:p-9">
        <Link
          to="/"
          className="text-sm font-medium text-slate-400 hover:text-white"
        >
          ← Kembali ke halaman publik
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold text-emerald-400">
            FUTSAL BOOKING
          </p>
          <h1 className="mt-2 text-3xl font-bold">Login Administrator</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Halaman khusus pengelola untuk mengakses dashboard dan mengelola
            operasional lapangan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label htmlFor="adminEmail" className="mb-2 block text-sm font-medium">
              Email admin
            </label>
            <input
              id="adminEmail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
              placeholder="admin@futsal.test"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="adminPassword"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="adminPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              placeholder="Masukkan password admin"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none focus:border-emerald-500"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-500"
          >
            Masuk ke Dashboard
          </button>
        </form>

        <div className="mt-6 rounded-xl bg-slate-800 p-4 text-sm text-slate-300">
          <p className="font-semibold">Kredensial demo</p>
          <p className="mt-2">Email: admin@futsal.test</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </main>
  );
}
