import AboutSection from "../about/AboutSection";

const reasons = [
  [
    "Clarity",
    "Clear products, straightforward pricing, and experiences that are easy to understand.",
  ],
  [
    "Flexibility",
    "Solutions that can adapt to different projects, teams, and requirements.",
  ],
  [
    "Quality",
    "Carefully considered design and implementation across every part of the experience.",
  ],
  ["Growth", "Built with room to evolve as your needs and ambitions change."],
];

export default function WhyChooseUs() {
  return (
    <div className="bg-primary-black/4 dark:bg-primary-white/6">
      <AboutSection className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-4">
          Why choose us
        </p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-12">
          Simple where it matters. Powerful where it counts.
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map(([title, description]) => (
            <article
              key={title}
              className="border-t border-primary-black/10 dark:border-primary-white/10 pt-5"
            >
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-sm leading-relaxed text-primary-black/50 dark:text-primary-white/50">
                {description}
              </p>
            </article>
          ))}
        </div>
      </AboutSection>
    </div>
  );
}
