import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatRupiah } from "../data/mockData";
import { initialFields } from "../data/mockData";
import SearchForm from "../components/SearchForm";
import useInView from "../hooks/useInView";

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

function ClockIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function ArrowIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function FieldItem({ field, index }) {
  const [ref, visible] = useInView({ threshold: 0.1 });

  const facilities = getFacilities(field.facilities);
  const { openTime, closeTime } = getFieldHours(field);
  const name = field.name ?? field.nama ?? "Lapangan Futsal";
  const type = field.type ?? field.jenis ?? "Jenis lapangan belum tersedia";
  const price = Number(field.price ?? field.harga ?? 0);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${(index % 3) * 120}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0"
      }`}
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70 transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/10 hover:ring-blue-200 motion-reduce:transform-none">
        {/* Header gambar */}
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400">
          <div
            aria-hidden="true"
            className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-12 -right-8 h-44 w-44 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-125"
          />

          <span
            className="relative text-6xl drop-shadow-lg transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110 motion-reduce:transform-none"
            aria-label="Lapangan futsal"
          >
            ⚽
          </span>

          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Tersedia
          </span>
        </div>

        {/* Isi card */}
        <div className="flex flex-1 flex-col p-5">
          <h2 className="text-xl font-bold text-slate-900">{name}</h2>
          <p className="mt-1 text-sm text-slate-500">{type}</p>

          <p className="mt-4 text-2xl font-extrabold text-blue-600">
            {formatRupiah(price)}
            <span className="ml-1 text-sm font-normal text-slate-500">/ jam</span>
          </p>

          <div className="mt-4">
            <p className="text-sm font-semibold text-slate-800">Fasilitas</p>

            {facilities.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {facilities.map((facility, i) => (
                  <span
                    key={`${facility}-${i}`}
                    className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100"
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

          <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <ClockIcon className="h-4 w-4 text-slate-400" />
            Jam operasional: {openTime}–{closeTime}
          </p>

          <Link
            to={`/booking?fieldId=${encodeURIComponent(field.id)}`}
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md"
            style={{ marginTop: "1.25rem" }}
          >
            Booking Lapangan
            <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    </div>
  );
}

export default function Fields() {
  const [headerRef, headerVisible] = useInView({ threshold: 0.2 });
  const [searchRef, searchVisible] = useInView({ threshold: 0.1 });

  const availableFields = initialFields.filter(
    (field) => field.status === "Aktif"
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-slate-50 to-white">
      {/* Dekorasi background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-80 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            headerVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
            </span>
            Pilih Lapangan
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Temukan{" "}
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
              lapangan favoritmu
            </span>
          </h1>

          <div
            className={`mt-3 h-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 transition-all delay-300 duration-700 ease-out motion-reduce:transition-none ${
              headerVisible ? "w-20" : "w-0"
            }`}
          />

          <p className="mt-4 max-w-2xl text-slate-600">
            Lihat harga, jenis lapangan, dan fasilitas sebelum melakukan booking.
          </p>
        </div>

        {/* Form pencarian */}
        <div
          ref={searchRef}
          className={`mt-8 transition-all delay-150 duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            searchVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <SearchForm />
        </div>

        {/* Jumlah hasil */}
        {availableFields.length > 0 && (
          <p className="mt-8 text-sm text-slate-500">
            Menampilkan{" "}
            <span className="font-semibold text-slate-800">
              {availableFields.length}
            </span>{" "}
            lapangan tersedia
          </p>
        )}

        {/* Daftar lapangan */}
        {availableFields.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200/70">
            <div className="text-5xl">⚽</div>
            <h2 className="mt-3 text-lg font-bold text-slate-900">
              Belum ada lapangan tersedia
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Silakan cek kembali nanti.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {availableFields.map((field, index) => (
              <FieldItem key={field.id} field={field} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}