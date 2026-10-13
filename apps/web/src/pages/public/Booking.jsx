
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { initialFields, formatRupiah } from "../../data/mockData";

export default function Booking({ user, bookings, setBookings }) {
  const [searchParams] = useSearchParams();

  const activeFields = initialFields.filter(
    (field) => field.status === "Aktif"
  );

  const requestedId = searchParams.get("fieldId");
  const selectedField =
    activeFields.find((field) => String(field.id) === requestedId) ||
    activeFields[0];

  const [fieldId, setFieldId] = useState(
    selectedField ? String(selectedField.id) : ""
  );
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("19:00");
  const [duration, setDuration] = useState("1");
  const [message, setMessage] = useState("");
  const [createdBookingId, setCreatedBookingId] = useState("");

  const field = activeFields.find(
    (item) => String(item.id) === fieldId
  );

  const price = field ? field.price * Number(duration) : 0;

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setCreatedBookingId("");

    if (!field) {
      setMessage("Silakan pilih lapangan yang tersedia.");
      return;
    }

    if (!date || date < new Date().toLocaleDateString("en-CA")) {
      setMessage("Tanggal booking tidak boleh sebelum hari ini.");
      return;
    }

    const [hours, minutes] = startTime.split(":").map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + Number(duration) * 60;
    const closingParts = field.closeTime.split(":").map(Number);
    const closingMinutes = closingParts[0] * 60 + closingParts[1];

    if (
      startMinutes < 0 ||
      startMinutes >= 24 * 60 ||
      endMinutes > closingMinutes ||
      endMinutes > 24 * 60
    ) {
      setMessage("Jadwal bermain melewati jam operasional lapangan.");
      return;
    }

    const newBooking = {
      id: `FB-${String(Date.now()).slice(-6)}`,
      userId: user.id,
      customer: user.name,
      field: field.name,
      date,
      time: `${startTime}–${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`,
      amount: price,
      status: "Menunggu",
    };

    setBookings([newBooking, ...bookings]);
    setCreatedBookingId(newBooking.id);
    setMessage("Pengajuan booking berhasil dibuat.");
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-sm font-semibold text-emerald-700">
          FORM PEMESANAN
        </p>
        <h1 className="mt-2 text-3xl font-extrabold">Booking Lapangan</h1>
        <p className="mt-3 text-sm text-slate-600">
          Login sebagai {user.name}. Periksa jadwal dan harga sebelum mengirim
          pengajuan.
        </p>

        {activeFields.length === 0 ? (
          <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
            Belum ada lapangan aktif yang dapat dipesan.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="fieldId"
                className="mb-2 block text-sm font-semibold"
              >
                Lapangan
              </label>
              <select
                id="fieldId"
                value={fieldId}
                onChange={(event) => setFieldId(event.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3"
              >
                {activeFields.map((item) => (
                  <option key={item.id} value={String(item.id)}>
                    {item.name} — {formatRupiah(item.price)}/jam
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-semibold"
              >
                Tanggal bermain
              </label>
              <input
                id="date"
                type="date"
                value={date}
                min={new Date().toLocaleDateString("en-CA")}
                onChange={(event) => setDate(event.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-3"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="startTime"
                  className="mb-2 block text-sm font-semibold"
                >
                  Jam mulai
                </label>
                <input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 px-3 py-3"
                />
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="mb-2 block text-sm font-semibold"
                >
                  Durasi
                </label>
                <select
                  id="duration"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3"
                >
                  <option value="1">1 jam</option>
                  <option value="2">2 jam</option>
                  <option value="3">3 jam</option>
                </select>
              </div>
            </div>

            {field && (
              <div className="rounded-xl bg-emerald-50 p-5">
                <p className="text-sm text-emerald-800">Estimasi pembayaran</p>
                <p className="mt-1 text-2xl font-extrabold text-emerald-800">
                  {formatRupiah(price)}
                </p>
                <p className="mt-1 text-sm text-emerald-800">
                  {field.name} · {duration} jam
                </p>
              </div>
            )}

            {message && (
              <p
                role="status"
                className={`rounded-xl p-3 text-sm ${
                  message.startsWith("Pengajuan")
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message}
              </p>
            )}

            {message.startsWith("Pengajuan") ? (
              <div className="space-y-3">
                {createdBookingId && (
                  <Link
                    to={`/payment/${encodeURIComponent(createdBookingId)}`}
                    className="block rounded-xl bg-emerald-600 px-4 py-3 text-center font-semibold text-white hover:bg-emerald-700"
                  >
                    Bayar Sekarang
                  </Link>
                )}

                <Link
                  to="/bookings"
                  className="block rounded-xl border border-slate-300 px-4 py-3 text-center font-semibold hover:bg-slate-50"
                >
                  Lihat Booking Saya
                </Link>

                <Link
                  to="/fields"
                  className="block text-center text-sm text-slate-500 hover:text-slate-700"
                >
                  Kembali ke daftar lapangan
                </Link>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                Ajukan Booking
              </button>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
