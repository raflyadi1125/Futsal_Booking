
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <div>
            <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
              Booking lapangan lebih praktis
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Main futsal jadi lebih mudah.
            </h1>

            <p className="mt-5 max-w-lg leading-7 text-slate-600">
              Cari lapangan, cek informasi fasilitas, dan pilih jadwal bermain
              sesuai kebutuhanmu tanpa harus datang langsung.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/fields"
                className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                Cari Lapangan
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50"
              >
                Login User
              </Link>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Lihat lapangan tanpa perlu login.
            </p>
          </div>

          <div className="rounded-3xl bg-emerald-50 p-6 sm:p-10">
            <div className="rounded-2xl border-4 border-white bg-emerald-600 p-6 text-white shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-emerald-100">
                  Futsal Booking
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs">
                  Demo
                </span>
              </div>

              <div className="my-10 rounded-xl border-2 border-dashed border-emerald-200 p-6 text-center">
                <div className="text-5xl">⚽</div>
                <h2 className="mt-4 text-2xl font-bold">
                  Waktunya Main!
                </h2>
                <p className="mt-2 text-sm text-emerald-100">
                  Pilih lapangan dan tentukan jadwalmu.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-emerald-100">Pilihan lapangan</p>
                  <p className="mt-1 text-xl font-bold">Beragam</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-emerald-100">Proses</p>
                  <p className="mt-1 text-xl font-bold">Praktis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Cara booking</h2>
        <p className="mt-2 text-slate-600">
          Hanya beberapa langkah untuk merencanakan pertandinganmu.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "Pilih lapangan",
              description: "Lihat lapangan yang tersedia beserta harga dan fasilitasnya.",
            },
            {
              number: "02",
              title: "Login akun",
              description: "Masuk menggunakan akun user yang telah dibuat admin.",
            },
            {
              number: "03",
              title: "Ajukan booking",
              description: "Pilih tanggal dan jam bermain yang kamu inginkan.",
            },
          ].map((item) => (
            <article
              key={item.number}
              className="rounded-2xl border border-slate-200 bg-white p-6"
            >
              <span className="text-sm font-bold text-emerald-600">
                LANGKAH {item.number}
              </span>
              <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
