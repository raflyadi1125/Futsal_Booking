import { BOOKING_STEPS } from "../../data/homeData";
import Icon from "../ui/Icon";
import useInView from "../../hooks/useInView";

export default function BookingSteps() {
  const lastIndex = BOOKING_STEPS.length - 1;
  const [headerRef, headerVisible] = useInView({ threshold: 0.3 });
  const [listRef, listVisible] = useInView({ threshold: 0.15 });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Dekorasi background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
            headerVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-8 opacity-0"
          }`}
        >
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
            Mudah &amp; Cepat
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Cara Booking
          </h2>
          <div
            className={`mt-2 h-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-400 transition-all delay-300 duration-700 ease-out motion-reduce:transition-none ${
              headerVisible ? "w-16" : "w-0"
            }`}
          />
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Hanya {BOOKING_STEPS.length} langkah mudah untuk mulai bermain.
          </p>
        </div>

        {/* Daftar langkah */}
        <ol
          ref={listRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BOOKING_STEPS.map(({ icon, title, text }, index) => (
            <li
              key={title}
              style={{
                transitionDelay: listVisible ? `${index * 150}ms` : "0ms",
              }}
              className={`relative transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
                listVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="group relative flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-blue-200">
                {/* Nomor besar sebagai dekorasi */}
                <span
                  aria-hidden="true"
                  className="absolute right-4 top-3 text-4xl font-extrabold leading-none text-slate-100 transition-colors group-hover:text-blue-100"
                >
                  {index + 1}
                </span>

                {/* Ikon */}
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600 motion-reduce:transform-none">
                  <Icon name={icon} className="h-6 w-6" />
                </div>

                {/* Badge langkah */}
                <span className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                  Langkah {index + 1}
                </span>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {title}
                </p>
                <p className="mt-1.5 text-xs leading-5 text-slate-500">{text}</p>
              </div>

              {/* Konektor panah antar-card (desktop) */}
              {index < lastIndex && (
                <span
                  aria-hidden="true"
                  style={{
                    transitionDelay: listVisible
                      ? `${index * 150 + 300}ms`
                      : "0ms",
                  }}
                  className={`absolute -right-[26px] top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow ring-1 ring-slate-200 transition-all duration-500 ease-out motion-reduce:transition-none lg:flex ${
                    listVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                >
                  <Icon
                    name="arrow"
                    className="h-3.5 w-3.5 animate-pulse text-blue-500 motion-reduce:animate-none"
                  />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}