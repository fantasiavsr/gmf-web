import { Check } from "lucide-react";

export default function ServiceGrid() {
  const services = [
    {
      name: "Design Services",
      items: [
        "UI/UX Design",
        "Visual Design",
        "Design Systems",
        "Motion Design",
      ],
    },
    {
      name: "Development",
      items: [
        "Frontend Development",
        "Backend Development",
        "Full-Stack",
        "DevOps",
      ],
    },
    {
      name: "Strategy & Planning",
      items: [
        "Business Strategy",
        "Product Strategy",
        "Market Research",
        "Roadmap Planning",
      ],
    },
    {
      name: "Support & Maintenance",
      items: [
        "Technical Support",
        "Performance Optimization",
        "Security Updates",
        "24/7 Monitoring",
      ],
    },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Service Grid
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Categorized services — grid with subcategories.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((category) => (
          <div
            key={category.name}
            className="rounded-2xl p-8 border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange transition-smooth"
          >
            <h3 className="text-2xl font-bold text-primary-black dark:text-primary-white mb-6">
              {category.name}
            </h3>
            <ul className="space-y-4">
              {category.items.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check size={16} className="text-primary-orange shrink-0" />
                  <span className="text-primary-black/70 dark:text-primary-white/70">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
