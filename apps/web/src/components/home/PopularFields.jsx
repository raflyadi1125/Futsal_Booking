import { Link } from "react-router-dom";
import { POPULAR_FIELDS } from "../../data/homeData";
import Icon from "../ui/Icon";
import FieldCard from "../FieldCard";
import useInView from "../../hooks/useInView";

export default function PopularFields() {
  const [headerRef, headerVisible] = useInView({ threshold: 0.3 });
  const [gridRef, gridVisible] = useInView({ threshold: 0.1 });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Dekorasi background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-sky-100/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`flex flex-col gap-4 transition-all duration-700 ease-out sm:flex-row sm:items-end sm:justify-between motion-reduce:transform-none motion-reduce:transition-none ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              Paling Diminati
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Lapangan Populer
            </h2>
            <div
              className={`mt-2 h-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 transition-all delay-300 duration-700 ease-out motion-reduce:transition-none ${
                headerVisible ? "w-16" : "w-0"
              }`}
            />
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
              Rekomendasi lapangan terbaik dengan fasilitas lengkap dan harga
              bersaing.
            </p>
          </div>

          <Link
            to="/fields"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-blue-600 hover:text-white hover:shadow-md hover:ring-blue-600 sm:self-auto"
          >
            Lihat Semua
            <Icon
              name="arrow"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Grid card dengan animasi bertahap */}
        <div
          ref={gridRef}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {POPULAR_FIELDS.map((field, index) => (
            <div
              key={field.id}
              style={{ transitionDelay: gridVisible ? `${index * 120}ms` : "0ms" }}
              className={`transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
                gridVisible
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-10 scale-95 opacity-0"
              }`}
            >
              <div className="h-full rounded-2xl transition duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/10">
                <FieldCard field={field} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}