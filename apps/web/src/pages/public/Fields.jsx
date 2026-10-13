
import { Link } from "react-router-dom";
import { initialFields, formatRupiah } from "../../data/mockData";

function getFacilities(facilities) {
  if (Array.isArray(facilities)) {
    return facilities;
  }

  if (typeof facilities === "string") {
    return facilities
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function getFieldHours(field) {
  const openTime =
    field.openTime ?? field.openingTime ?? field.opening_time ?? field.open ?? "08:00";

  const closeTime =
    field.closeTime ?? field.closingTime ?? field.closing_time ?? field.close ?? "23:00";

  return { openTime, closeTime };
}

export default function Fields() {
  const availableFields = initialFields.filter(
    (field) => field.status === "Aktif"
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-semibold text-emerald-700">
          PILIH LAPANGAN
        </p>

        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
          Temukan lapangan favoritmu
        </h1>

        <p className="mt-3 text-slate-600">
          Lihat harga, jenis lapangan, dan fasilitas sebelum melakukan booking.
        </p>
      </div>

      {availableFields.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div className="text-4xl">⚽</div>
          <h2 className="mt-3 text-lg font-bold text-slate-900">
            Belum ada lapangan tersedia
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Silakan cek kembali nanti.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {availableFields.map((field) => {
            const facilities = getFacilities(field.facilities);
            const { openTime, closeTime } = getFieldHours(field);

            return (
              <article
                key={field.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-emerald-300"
              >
                <div className="flex h-44 items-center justify-center bg-emerald-50">
                  <span className="text-6xl" aria-label="Lapangan futsal">
                    ⚽
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-xl font-bold text-slate-900">
                      {field.name ?? field.nama ?? "Lapangan Futsal"}
                    </h2>

                    <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      Tersedia
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    {field.type ?? field.jenis ?? "Jenis lapangan belum tersedia"}
                  </p>

                  <p className="mt-4 text-xl font-extrabold text-emerald-700">
                    {formatRupiah(Number(field.price ?? field.harga ?? 0))}

                    <span className="ml-1 text-sm font-normal text-slate-500">
                      / jam
                    </span>
                  </p>

                  <div className="mt-4">
                    <p className="text-sm font-semibold text-slate-800">
                      Fasilitas
                    </p>

                    {facilities.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {facilities.map((facility, index) => (
                          <span
                            key={`${facility}-${index}`}
                            className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-slate-500">
                        Informasi fasilitas belum tersedia.
                      </p>
                    )}
                  </div>

                  <p className="mt-4 text-sm text-slate-500">
                    Jam operasional: {openTime}–{closeTime}
                  </p>

                  <Link
                    to={`/booking?fieldId=${encodeURIComponent(field.id)}`}
                    className="mt-5 block rounded-xl bg-emerald-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
                  >
                    Booking Lapangan
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
