import { ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function CaseStudies() {
  const [caseStudiesRef, caseStudiesVisible] = useScrollAnimation({
    threshold: 0.2,
  });

  return (
    <section
      id="teams"
      ref={caseStudiesRef}
      className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto"
    >
      <h2
        className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-4 transition-all duration-700 ${
          caseStudiesVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        Training Programs
      </h2>
      <h3
        className={`text-4xl md:text-6xl font-bold tracking-tight mb-16 text-primary-black dark:text-primary-white transition-all duration-700 ${
          caseStudiesVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: caseStudiesVisible ? "100ms" : "0ms" }}
      >
        Specialized certification paths.
      </h3>
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { co: "Welding (GTAW)", ready: true },
          { co: "Welding (SMAW)", ready: true },
          { co: "Welding (FCAW)", ready: true },
          { co: "Welding (GMAW)", ready: true },
          { co: "Pipe Fitting", ready: true },
          { co: "Fabrication", ready: true },
          { co: "Blaster Painter", ready: true },
        ].map((c, idx) => (
          <a
            key={c.co}
            href="#"
            className={`p-6 rounded-2xl border ${
              c.ready
                ? "bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black border-primary-black dark:border-primary-white"
                : "bg-primary-white dark:bg-primary-dark-card border-primary-black/10 dark:border-primary-white/10 text-primary-black/50 dark:text-primary-white/50"
            } hover:-translate-y-2 transition-all duration-700`}
            style={{
              opacity: caseStudiesVisible ? 1 : 0,
              transform: caseStudiesVisible
                ? "translateY(0)"
                : "translateY(24px)",
              transitionDelay: caseStudiesVisible
                ? `${200 + (idx % 4) * 100}ms`
                : "0ms",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-bold">{c.co}</h4>
              <ArrowUpRight size={18} className="opacity-60" />
            </div>
            <span
              className={`text-xs uppercase tracking-widest ${
                c.ready
                  ? "text-primary-white/70 dark:text-primary-black/70"
                  : "text-primary-black/30 dark:text-primary-white/30"
              }`}
            >
              {c.ready ? "Available" : "Coming soon"}
            </span>
          </a>
        ))}
      </div>
      <a
        href="/"
        className="inline-flex mt-10 text-sm font-medium text-primary-orange hover:text-primary-black dark:hover:text-primary-white transition-colors"
      >
        Explore services
      </a>
    </section>
  );
}
