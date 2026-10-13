
import { Mail, ShieldCheck, UserRound } from "lucide-react";

const rows = [
  {
    icon: UserRound,
    label: "Nama admin",
    value: "Administrator",
  },
  {
    icon: Mail,
    label: "Email admin",
    value: "admin@futsal.test",
  },
  {
    icon: ShieldCheck,
    label: "Peran",
    value: "Administrator",
  },
];

export default function Settings() {
  return (
    <div className="min-w-0 space-y-6 text-slate-100">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Pengaturan
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Informasi akun administrator dan aplikasi.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
          <h2 className="font-semibold text-white">Akun Admin</h2>

          <div className="mt-5 space-y-4">
            {rows.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Icon size={19} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="text-sm font-medium text-slate-200">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6">
          <h2 className="font-semibold text-white">Aplikasi</h2>

          <div className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400">Nama aplikasi</span>
              <span className="font-medium text-slate-200">
                Futsal Booking
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400">Versi</span>
              <span className="font-medium text-slate-200">
                0.0.0
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-400">Mode data</span>
              <span className="font-medium text-slate-200">
                Simulasi
              </span>
            </div>
          </div>
        </section>
      </div>

      <p className="text-xs text-slate-500">
        Pengaturan lanjutan akan tersedia pada tahap berikutnya.
      </p>
    </div>
  );
}
