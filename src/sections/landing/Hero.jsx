import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="report"
      className="pt-36 pb-20 px-8 md:px-16 md:max-w-7xl mx-auto"
    >
      <p
        className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-6 transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        Technical Training Center
      </p>
      <h1
        className={`text-5xl md:text-8xl font-bold tracking-tighter leading-[0.88] mb-8 text-primary-black dark:text-primary-white transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ transitionDelay: heroLoaded ? "100ms" : "0ms" }}
      >
        Quality Technical
        <br />
        <span className="italic font-normal text-primary-orange">
          Training Excellence
        </span>
      </h1>
      <p
        className={`text-xl md:text-2xl text-primary-black/60 dark:text-primary-white/60 max-w-2xl leading-relaxed mb-12 font-light transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ transitionDelay: heroLoaded ? "200ms" : "0ms" }}
      >
        World-class technical training programs in welding, fabrication, and skilled trades for industry-ready professionals.
      </p>
      <a
        href="#products"
        className={`inline-flex items-center gap-2 text-sm font-medium bg-primary-orange text-primary-white px-6 py-3 rounded-full hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-primary-black transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ transitionDelay: heroLoaded ? "300ms" : "0ms" }}
      >
        Explore trades <ArrowDown size={16} />
      </a>
      <a
        href="#teams"
        className={`inline-flex items-center gap-2 text-sm font-medium ml-4 text-primary-black dark:text-primary-white hover:text-primary-orange transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ transitionDelay: heroLoaded ? "400ms" : "0ms" }}
      >
        View programs
      </a>
    </section>
  );
}
