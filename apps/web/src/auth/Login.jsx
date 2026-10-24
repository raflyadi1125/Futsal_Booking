import { useState } from "react";
import {
  CalendarDays,
  Eye,
  EyeOff,
  Goal,
  Lock,
  LogIn,
  ShieldCheck,
  User,
  Check,
} from "lucide-react";

import courtImage from "../assets/futsal-court.jpg";

import FeatureItem from "../components/FeatureItem";
import InputField from "../components/InputField";
import GoogleIcon from "../components/GoogleIcon";
import CornerAccents from "../components/CornerAccents";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password) {
      setError("Email/nomor HP dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      // TODO: ganti dengan request ke API login kamu
      // await api.post("/auth/login", { identifier, password, remember });
      await new Promise((r) => setTimeout(r, 800));
      console.log("Login:", { identifier, remember });
    } catch (err) {
      setError("Login gagal. Periksa kembali data Anda.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: arahkan ke endpoint OAuth Google
    console.log("Login dengan Google");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-navy-950 text-white">
      {/* Background foto lapangan */}
      <img
        src={courtImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-left"
      />
      {/* Gradasi: foto terlihat di kiri, menyatu ke navy di kanan */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/30 via-navy-950/75 to-navy-950 lg:via-navy-950/60 lg:to-navy-950" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/70" />

      <CornerAccents />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1400px] items-center gap-10 px-6 py-12 lg:grid-cols-[1.1fr_1fr] lg:px-16 xl:px-24">
        {/* Kolom kiri: branding */}


        {/* Kolom kanan: kartu login */}
        <section className="mx-auto w-full max-w-[34rem]">
          {/* Logo versi mobile */}


          <div className="rounded-2xl border border-line/80 bg-navy-900/80 p-8 shadow-[0_0_60px_-15px_rgba(26,123,255,0.45)] backdrop-blur-md sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight">Selamat Datang!</h2>
            <p className="mt-2 text-base text-slate-200">
              Login untuk melanjutkan ke akun Anda
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              <InputField
                icon={User}
                type="text"
                name="identifier"
                autoComplete="username"
                placeholder="Email atau Nomor HP"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                aria-label="Email atau Nomor HP"
              />

              <InputField
                icon={Lock}
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    className="rounded p-1 text-slate-300 transition hover:text-white focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" strokeWidth={1.75} />
                    ) : (
                      <EyeOff className="h-5 w-5" strokeWidth={1.75} />
                    )}
                  </button>
                }
              />

              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-3 select-none">
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-md border border-line bg-navy-800 checked:border-brand checked:bg-brand focus-visible:ring-2 focus-visible:ring-brand/60 focus-visible:outline-none"
                    />
                    <Check
                      className="pointer-events-none relative h-4 w-4 text-white opacity-0 peer-checked:opacity-100"
                      strokeWidth={3}
                    />
                  </span>
                  Ingat saya
                </label>

                <a
                  href="/lupa-password"
                  className="text-brand-light transition hover:text-white hover:underline"
                >
                  Lupa password?
                </a>
              </div>

              {error && (
                <p role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-brand text-base font-semibold text-white shadow-lg shadow-brand/30 transition hover:bg-brand-light focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:outline-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <LogIn className="h-5 w-5" />
                )}
                {loading ? "Memproses..." : "Login"}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4 text-sm text-slate-300">
              <span className="h-px flex-1 bg-line/70" />
              atau
              <span className="h-px flex-1 bg-line/70" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-line/80 bg-transparent text-base font-medium text-white transition hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
            >
              <GoogleIcon />
              Login dengan Google
            </button>

            <p className="mt-8 text-center text-sm text-slate-200">
              Belum punya akun?{" "}
              <a href="/daftar" className="text-brand-light transition hover:text-white hover:underline">
                Daftar sekarang
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}