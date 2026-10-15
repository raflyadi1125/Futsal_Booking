import { useEffect, useState } from "react";
import { FALLBACK_BLUE } from "../../data/homeData";
import { withFallback } from "../../utils/backgroundImage";
import HighlightList from "../HighlightList";

const HERO_BG = "/bg.png";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Animasi masuk bertahap: fade + naik, dengan jeda per elemen
  const reveal = (delay) => ({
    style: { transitionDelay: mounted ? `${delay}ms` : "0ms" },
    className: `transition-all duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
      mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    }`,
  });

  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background gambar dengan efek zoom-out pelan saat load */}
      <div
        aria-hidden="true"
        style={{ backgroundImage: withFallback(HERO_BG, FALLBACK_BLUE) }}
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[2500ms] ease-out motion-reduce:transform-none motion-reduce:transition-none ${
          mounted ? "scale-100" : "scale-110"
        }`}
      />

      {/* Overlay gelap supaya teks tetap terbaca */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/70 to-transparent" />

      {/* Glow dekoratif */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 animate-pulse rounded-full bg-blue-600/20 blur-3xl motion-reduce:animate-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 md:pt-20 lg:px-8">
        <div className="max-w-xl">


          <h1
            {...reveal(250)}
            className={`mt-3 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl ${reveal(250).className}`}
          >
            Main Futsal Jadi
            <br />
            Lebih{" "}
            <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
              Mudah!
            </span>
          </h1>

        
          <div
            className={`mt-4 h-1 rounded-full bg-gradient-to-r from-blue-500 to-sky-300 transition-all delay-500 duration-1000 ease-out motion-reduce:transition-none ${
              mounted ? "w-20" : "w-0"
            }`}
          />

          <p
            {...reveal(450)}
            className={`mt-5 max-w-lg leading-7 text-slate-200 ${reveal(450).className}`}
          >
            Cari, pilih, dan booking lapangan futsal favoritmu dengan cepat dan
            praktis. Nikmati pengalaman bermain yang lebih seru bersama
            teman-temanmu!
          </p>
        </div>

        <div
          {...reveal(650)}
          className={reveal(650).className}
        >
          <HighlightList />
        </div>
      </div>
    </section>
  );
}