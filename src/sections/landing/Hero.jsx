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
      className="relative min-h-screen pt-36 pb-20 px-8 md:px-16 overflow-hidden"
      style={{
        backgroundImage: "url('/herobg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-primary-black/40 dark:bg-primary-black/60 z-0"></div>

      {/* Content wrapper */}
      <div className="relative z-10 md:max-w-7xl mx-auto flex flex-col justify-center min-h-screen md:min-h-[calc(100vh-144px)]">
        <p
          className={`text-xs uppercase tracking-[0.2em] text-primary-white/70 mb-6 transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Technical Training Center
        </p>
        <h1
          className={`text-5xl md:text-8xl font-bold tracking-tighter leading-[0.88] mb-8 text-primary-white transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? "100ms" : "0ms" }}
        >
          Quality Technical
          <br />
          <span className="italic font-medium text-primary-orange">
            Training Excellence
          </span>
        </h1>
        <p
          className={`text-xl md:text-2xl text-primary-white/80 max-w-2xl leading-relaxed mb-12 font-normal transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? "200ms" : "0ms" }}
        >
          World-class technical training programs in welding, fabrication, and
          skilled trades for industry-ready professionals.
        </p>
        <div
          className={`flex flex-wrap gap-4 transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? "300ms" : "0ms" }}
        >
          <a
            href="#products"
            className="inline-flex items-center gap-2 text-sm font-medium bg-primary-orange text-primary-white px-8 py-4 rounded-full hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-primary-black transition-all duration-700"
          >
            Explore trades <ArrowDown size={16} />
          </a>
          <a
            href="#teams"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-white hover:text-primary-orange transition-all duration-700 border border-primary-white/30 px-8 py-4 rounded-full hover:border-primary-orange"
          >
            View programs
          </a>
        </div>
      </div>
    </section>
  );
}
