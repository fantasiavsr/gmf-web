import { Check } from "lucide-react";

export default function ServicePackageCards() {
  const packages = [
    {
      name: "Starter",
      desc: "Perfect for individuals and small projects",
      price: "$999",
      features: [
        "1 service",
        "Up to 20 hours",
        "1 revision round",
        "Email support",
        "30-day turnaround",
      ],
      cta: "Get Started",
    },
    {
      name: "Professional",
      desc: "For growing businesses and teams",
      price: "$3,499",
      features: [
        "3 services",
        "Up to 80 hours",
        "Unlimited revisions",
        "Priority support",
        "15-day turnaround",
      ],
      cta: "Choose Plan",
      featured: true,
    },
    {
      name: "Enterprise",
      desc: "For agencies and large organizations",
      price: "$9,999",
      features: [
        "Unlimited services",
        "Unlimited hours",
        "Dedicated team",
        "24/7 support",
        "Custom timeline",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Service Package Cards
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Bundled services — package tiers with features.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`rounded-3xl p-8 border transition-smooth ${
              pkg.featured
                ? "border-primary-orange bg-primary-black dark:bg-primary-orange scale-105"
                : "border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-2 ${pkg.featured ? "text-primary-white" : "text-primary-black dark:text-primary-white"}`}
            >
              {pkg.name}
            </h3>
            <p
              className={`text-sm mb-6 ${pkg.featured ? "text-primary-white/70" : "text-primary-black/60 dark:text-primary-white/60"}`}
            >
              {pkg.desc}
            </p>
            <div className="mb-6">
              <span
                className={`text-4xl font-bold ${pkg.featured ? "text-primary-white" : "text-primary-black dark:text-primary-white"}`}
              >
                {pkg.price}
              </span>
            </div>
            <button
              className={`w-full py-3 px-4 rounded-xl font-bold mb-8 transition-smooth ${
                pkg.featured
                  ? "bg-primary-orange text-primary-white hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-primary-black"
                  : "bg-primary-black/10 dark:bg-primary-white/10 text-primary-black dark:text-primary-white hover:bg-primary-orange hover:text-primary-white"
              }`}
            >
              {pkg.cta}
            </button>
            <ul className="space-y-3">
              {pkg.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-3 text-sm ${pkg.featured ? "text-primary-white/80" : "text-primary-black/70 dark:text-primary-white/70"}`}
                >
                  <Check
                    size={16}
                    className={`shrink-0 mt-0.5 ${pkg.featured ? "text-primary-orange" : "text-primary-orange"}`}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
