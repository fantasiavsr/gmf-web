import { Check, X } from "lucide-react";

export default function ThreeTierPricing() {
  const plans = [
    {
      name: "Essentials",
      price: "$49",
      features: [
        { name: "Up to 10 projects", included: true },
        { name: "10GB storage", included: true },
        { name: "Basic support", included: true },
        { name: "Advanced analytics", included: false },
        { name: "Team collaboration", included: false },
      ],
    },
    {
      name: "Growth",
      price: "$149",
      featured: true,
      features: [
        { name: "Up to 50 projects", included: true },
        { name: "100GB storage", included: true },
        { name: "Priority support", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Team collaboration", included: true },
      ],
    },
    {
      name: "Scale",
      price: "Custom",
      features: [
        { name: "Unlimited projects", included: true },
        { name: "Unlimited storage", included: true },
        { name: "24/7 dedicated support", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Team collaboration", included: true },
      ],
    },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">Three-Tier Pricing</h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">Example: Comparison layout — three options with included/excluded features.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl p-8 border transition-smooth ${
              plan.featured
                ? "border-primary-orange bg-primary-black dark:bg-primary-orange -translate-y-4"
                : "border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card"
            }`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${plan.featured ? "text-primary-white" : "text-primary-black dark:text-primary-white"}`}>
              {plan.name}
            </h3>
            <div className="mb-6">
              <span className={`text-4xl font-bold ${plan.featured ? "text-primary-white" : "text-primary-black dark:text-primary-white"}`}>
                {plan.price}
              </span>
              {plan.price !== "Custom" && (
                <span className={`text-sm ${plan.featured ? "text-primary-white/70" : "text-primary-black/60 dark:text-primary-white/60"}`}>
                  /month
                </span>
              )}
            </div>

            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature.name} className={`flex items-center gap-3 text-sm ${plan.featured ? "text-primary-white/80" : "text-primary-black/70 dark:text-primary-white/70"}`}>
                  {feature.included ? (
                    <Check size={16} className={plan.featured ? "text-primary-orange" : "text-primary-orange"} />
                  ) : (
                    <X size={16} className={`${plan.featured ? "text-primary-white/30" : "text-primary-black/30 dark:text-primary-white/30"}`} />
                  )}
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
