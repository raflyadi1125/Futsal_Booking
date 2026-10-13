
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatRupiah } from "../../data/mockData";

const methods = ["QRIS", "Transfer Bank", "E-Wallet"];

const statusStyles = {
  "Menunggu Verifikasi": "bg-amber-100 text-amber-700",
  Terverifikasi: "bg-emerald-100 text-emerald-700",
  Ditolak: "bg-red-100 text-red-700",
};

export default function UserPayment({
  user,
  bookings = [],
  payments = [],
  setPayments,
}) {
  const { bookingId } = useParams();

  const [method, setMethod] = useState("QRIS");
  const [proofName, setProofName] = useState("");
  const [error, setError] = useState("");

  const booking = bookings.find(
    (item) =>
      item.id === bookingId &&
      (item.userId === user.id || item.customer === user.name),
  );

  const existingPayment = booking
    ? payments.find((payment) => payment.bookingId === booking.id)
    : null;

  if (!booking) {
    return (
      <section className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Booking tidak ditemukan
        </h1>

        <p className="mt-3 text-sm text-slate-600">
          Data booking tidak tersedia atau bukan milik akun Anda.
        </p>

        <Link
          to="/bookings"
          className="mt-6 inline-block rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Kembali ke Booking Saya
        </Link>
      </section>
    );
  }

  if (existingPayment || booking.status === "Dibatalkan") {
    return (
      <section className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <p className="text-sm font-semibold text-emerald-700">
            STATUS PEMBAYARAN
          </p>

          <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
            {booking.status === "Dibatalkan" && !existingPayment
              ? "Booking dibatalkan"
              : "Pembayaran sudah diajukan"}
          </h1>

          {existingPayment ? (
            <div className="mt-6 space-y-3 rounded-xl bg-slate-50 p-5 text-sm text-slate-700">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Status</span>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                    statusStyles[existingPayment.status] ??
                    "bg-slate-100 text-slate-600"
                  }`}
                >
                  {existingPayment.status}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Metode</span>
                <span className="font-medium">
                  {existingPayment.method}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Nominal</span>
                <span className="font-medium">
                  {formatRupiah(existingPayment.amount)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Booking</span>
                <span className="font-medium">{booking.id}</span>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate-600">
              Booking ini telah dibatalkan sehingga tidak dapat
              dibayar.
            </p>
          )}

          <Link
            to="/bookings"
            className="mt-6 block rounded-xl bg-emerald-600 px-4 py-3 text-center font-semibold text-white hover:bg-emerald-700"
          >
            Kembali ke Booking Saya
          </Link>
        </div>
      </section>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (typeof setPayments !== "function") {
      return;
    }

    if (!method) {
      setError("Silakan pilih metode pembayaran.");
      return;
    }

    const newPayment = {
      id: `PAY-${String(Date.now()).slice(-6)}`,
      bookingId: booking.id,
      customer: booking.customer,
      field: booking.field,
      date: booking.date,
      method,
      amount: booking.amount,
      status: "Menunggu Verifikasi",
    };

    setPayments((previous) => [newPayment, ...previous]);
  }

  return (
    <section className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <Link
          to="/bookings"
          className="text-sm font-semibold text-emerald-700 hover:underline"
        >
          ← Kembali ke Booking Saya
        </Link>

        <p className="mt-6 text-sm font-semibold text-emerald-700">
          PEMBAYARAN
        </p>

        <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
          Bayar Booking
        </h1>

        <div className="mt-6 rounded-xl bg-slate-50 p-5 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">
            {booking.field}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {booking.id} · {booking.date} · {booking.time}
          </p>

          <p className="mt-4 text-2xl font-extrabold text-emerald-700">
            {formatRupiah(booking.amount)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="method"
              className="mb-2 block text-sm font-semibold"
            >
              Metode pembayaran
            </label>

            <select
              id="method"
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 outline-none focus:border-emerald-600"
            >
              {methods.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="proof"
              className="mb-2 block text-sm font-semibold"
            >
              Bukti transfer (opsional)
            </label>

            <input
              id="proof"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setProofName(event.target.files?.[0]?.name ?? "")
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-emerald-700"
            />

            {proofName && (
              <p className="mt-2 text-xs text-slate-500">
                File terpilih: {proofName}
              </p>
            )}
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
            Ajukan Pembayaran
          </button>
        </form>
      </div>
    </section>
  );
}
