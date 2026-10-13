
import { Link } from "react-router-dom";

export default function NotFound({ admin = false }) {
  return (
    <section
      className={`flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center ${
        admin ? "text-slate-100" : "text-slate-900"
      }`}
    >
      <p className="text-6xl font-extrabold tracking-tight text-emerald-600">
        404
      </p>

      <h1 className="mt-4 text-2xl font-bold">
        Halaman tidak ditemukan
      </h1>

      <p
        className={`mt-3 text-sm ${
          admin ? "text-slate-400" : "text-slate-600"
        }`}
      >
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>

      <Link
        to={admin ? "/admin" : "/"}
        className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
      >
        {admin ? "Kembali ke Dashboard" : "Kembali ke Beranda"}
      </Link>
    </section>
  );
}
