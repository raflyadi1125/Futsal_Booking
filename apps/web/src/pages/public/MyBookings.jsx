
import { Link } from "react-router-dom";
import { formatRupiah } from "../../data/mockData";

const bookingStyles = {
  Menunggu: "bg-amber-100 text-amber-700",
  Dikonfirmasi: "bg-blue-100 text-blue-700",
  Selesai: "bg-emerald-100 text-emerald-700",
  Dibatalkan: "bg-red-100 text-red-700",
};

const paymentStyles = {
  "Menunggu Verifikasi": "bg-amber-100 text-amber-700",
  Terverifikasi: "bg-emerald-100 text-emerald-700",
  Ditolak: "bg-red-100 text-red-700",
};

function Badge({ status, styles }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function MyBookings({
  user,
  bookings = [],
  payments = [],
}) {
  const myBookings = bookings.filter(
    (booking) =>
      booking.userId === user.id || booking.customer === user.name,
  );

  function findPayment(bookingId) {
    return payments.find((payment) => payment.bookingId === bookingId);
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-700">
            RIWAYAT BOOKING
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
            Booking Saya
          </h1>

          <p className="mt-3 text-slate-600">
            Pantau status pemesanan dan pembayaran Anda.
          </p>
        </div>

        <Link
          to="/fields"
          className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Booking Baru
        </Link>
      </div>

      {myBookings.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <div className="text-4xl">⚽</div>

          <h2 className="mt-3 text-lg font-bold text-slate-900">
            Belum ada booking
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Anda belum memiliki riwayat pemesanan lapangan.
          </p>

          <Link
            to="/fields"
            className="mt-5 inline-block rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Cari Lapangan
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {myBookings.map((booking) => {
            const payment = findPayment(booking.id);

            const canPay =
              !payment &&
              booking.status !== "Dibatalkan" &&
              booking.status !== "Selesai";

            return (
              <article
                key={booking.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {booking.field}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                      {booking.id}
                    </p>
                  </div>

                  <Badge
                    status={booking.status}
                    styles={bookingStyles}
                  />
                </div>

                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="text-slate-500">Tanggal</dt>
                    <dd className="mt-1 font-medium text-slate-800">
                      {booking.date}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-500">Waktu</dt>
                    <dd className="mt-1 font-medium text-slate-800">
                      {booking.time}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-500">Total</dt>
                    <dd className="mt-1 font-medium text-slate-800">
                      {formatRupiah(booking.amount)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">
                      Pembayaran:
                    </span>
                    {payment ? (
                      <Badge
                        status={payment.status}
                        styles={paymentStyles}
                      />
                    ) : (
                      <span className="font-medium text-slate-500">
                        Belum dibayar
                      </span>
                    )}
                  </div>

                  {canPay && (
                    <Link
                      to={`/payment/${encodeURIComponent(booking.id)}`}
                      className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      Bayar Sekarang
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
