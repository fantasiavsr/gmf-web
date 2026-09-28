import AboutSection from "./AboutSection";

const researchHighlights = [
  ["35", "permanent welding booths with 50 advanced machines"],
  ["4+", "specialized welding processes (GTAW, SMAW, FCAW, GMAW)"],
  [
    "7+",
    "certified trade programs including fabrication and blasting",
  ],
];

export default function AboutResearch() {
  return (
    <AboutSection className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-5">
            By the numbers
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            World-class facilities.
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-primary-black/50 dark:text-primary-white/50">
          Advanced welding equipment and specialized training facilities designed for excellence in technical education.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-10 border-t border-primary-black/10 dark:border-primary-white/10 pt-8">
        {researchHighlights.map(([stat, description]) => (
          <div key={stat}>
            <span className="text-6xl font-bold">{stat}</span>
            <p className="text-sm text-primary-black/50 dark:text-primary-white/50 mt-3 max-w-xs">
              {description}
            </p>
          </div>
        ))}
      </div>
    </AboutSection>
  );
}
