import { ArrowDown } from "lucide-react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function AboutHero() {
  const [heroRef, heroVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      ref={heroRef}
      className="pt-36 pb-24 px-8 md:px-16 md:max-w-7xl mx-auto"
    >
      <p
        className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-6 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        About us
      </p>
      <h1
        className={`max-w-5xl text-5xl md:text-8xl font-bold tracking-tighter leading-[0.88] mb-8 transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ transitionDelay: heroVisible ? "100ms" : "0ms" }}
      >
        Established for skilled
        <br />
        <span className="italic font-normal text-primary-orange">
          industry professionals.
        </span>
      </h1>
      <div className="grid md:grid-cols-2 gap-8 items-end">
        <p
          className={`text-xl md:text-2xl text-primary-black/60 dark:text-primary-white/60 max-w-2xl leading-relaxed font-light transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroVisible ? "200ms" : "0ms" }}
        >
          GMF Training Center is established in response to the growing demands in the manpower industry for skilled workers with world-class competence in welding, fabrication, and advanced technical trades.
        </p>
        <a
          href="#story"
          className={`md:justify-self-end inline-flex w-fit items-center gap-2 text-sm font-medium bg-primary-orange text-primary-white px-6 py-3 rounded-full hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-primary-black transition-all duration-700 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroVisible ? "300ms" : "0ms" }}
        >
          Explore our work <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}
