import AboutSection from "../about/AboutSection";

export default function Showcase() {
  return (
    <AboutSection className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto">
      <p className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-4">
        Showcase
      </p>
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
        Built to work beautifully together.
      </h2>
      <p className="text-lg text-primary-black/60 dark:text-primary-white/60 max-w-2xl">
        Products, services, and experiences designed as part of one flexible
        ecosystem.
      </p>
      <p className="text-sm leading-relaxed text-primary-black/50 dark:text-primary-white/50 max-w-xl mt-6">
        Explore different solutions, compare options, and find the combination
        that works best for your needs.
      </p>
    </AboutSection>
  );
}
