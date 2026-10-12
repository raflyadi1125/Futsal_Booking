import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowUpRight, CalendarDays, ChevronRight } from "lucide-react";
import StatCard from "../../components/ui/StatCard";
import StatusBadge from "../../components/ui/StatusBadge";
import {
  stats,
  weeklyBookings,
  recentBookings,
  formatRupiah,
} from "../../data/mockData";

export default function Dashboard({ fields = [] }) {
  const dashboardStats = stats.map((stat) =>
    stat.title === "Lapangan Aktif"
      ? {
          ...stat,
          value: String(
            fields.filter((field) => field.status === "Aktif").length,
          ),
        }
      : stat,
  );
  return (
    <div className="space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-400">
            Selamat datang kembali, Admin
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Pantau aktivitas dan performa penyewaan lapangan.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-800 bg-[#111C30] px-3 py-2.5 text-sm text-slate-300">
          <CalendarDays size={17} className="text-slate-400" />
          12 Oktober 2026
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-[#111C30] p-5 sm:p-6 xl:col-span-2">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-slate-100">
                Statistik Booking
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Jumlah pemesanan selama satu minggu
              </p>
            </div>

            <span className="rounded-md border border-slate-700 px-2.5 py-1.5 text-xs text-slate-400">
              Minggu ini
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyBookings}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="bookingFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="#263449"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  dy={10}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0B1120",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#F8FAFC",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${value} booking`, "Pemesanan"]}
                  labelStyle={{ color: "#94A3B8", marginBottom: "4px" }}
                />

                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#60A5FA"
                  strokeWidth={2.5}
                  fill="url(#bookingFill)"
                  activeDot={{ r: 5, fill: "#60A5FA", stroke: "#0B1120" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-[#111C30] p-5 sm:p-6">
          <h2 className="font-semibold text-slate-100">Ringkasan Aktivitas</h2>
          <p className="mt-1 text-sm text-slate-500">
            Status operasional saat ini
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-400">Booking menunggu</span>
                <span className="font-semibold text-amber-300">12</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[35%] rounded-full bg-amber-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-400">Booking dikonfirmasi</span>
                <span className="font-semibold text-blue-300">28</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[70%] rounded-full bg-blue-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-400">Booking selesai</span>
                <span className="font-semibold text-emerald-300">42</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-[85%] rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>

          <div className="mt-7 rounded-lg border border-slate-800 bg-[#0D1526] p-4">
            <p className="text-sm text-slate-400">Perlu perhatian</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">
              Periksa pesanan dan bukti transfer yang masih menunggu verifikasi.
            </p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-800 bg-[#111C30]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 p-5 sm:px-6">
          <div>
            <h2 className="font-semibold text-slate-100">Booking Terbaru</h2>
            <p className="mt-1 text-sm text-slate-500">
              Daftar pemesanan terbaru pelanggan
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-bookings"))}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            Lihat semua <ChevronRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full `min-w-[760px]` text-left text-sm">
            <thead className="bg-[#0D1526] text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">ID Booking</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Jadwal</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/80">
              {recentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="transition-colors hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4 font-medium text-blue-300">
                    {booking.id}
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-200">
                      {booking.customer}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {booking.field}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-slate-300">{booking.date}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {booking.time}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4 text-slate-300">
                    {formatRupiah(booking.amount)}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 px-5 py-4 text-xs text-slate-500 sm:px-6">
          <span>Menampilkan 5 data contoh</span>
          <span className="inline-flex items-center gap-1">
            Data simulasi <ArrowUpRight size={13} />
          </span>
        </div>
      </section>
    </div>
  );
}
