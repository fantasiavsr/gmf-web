import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function Methodology() {
  const [methodologyRef, methodologyVisible] = useScrollAnimation({
    threshold: 0.3,
  });

  return (
    <section
      ref={methodologyRef}
      className="py-20 px-8 md:px-16 md:max-w-7xl mx-auto"
    >
      <h2
        className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-12 transition-all duration-700 ${
          methodologyVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        Pricing
      </h2>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          {
            stat: "Starter",
            desc: "For individuals and small projects getting started.",
          },
          {
            stat: "Professional",
            desc: "For growing teams that need more flexibility and capability.",
          },
          {
            stat: "Enterprise",
            desc: "For organizations with larger requirements, custom workflows, and dedicated support.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="transition-all duration-700"
            style={{
              opacity: methodologyVisible ? 1 : 0,
              transform: methodologyVisible
                ? "translateY(0)"
                : "translateY(24px)",
              transitionDelay: methodologyVisible ? `${idx * 100}ms` : "0ms",
            }}
          >
            <span className="text-6xl font-bold text-primary-black dark:text-primary-white">
              {item.stat}
            </span>
            <p className="text-sm text-primary-black/50 dark:text-primary-white/50 mt-3">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
