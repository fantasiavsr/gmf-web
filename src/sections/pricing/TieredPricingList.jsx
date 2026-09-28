import { ArrowRight, Check } from "lucide-react";

export default function TieredPricingList() {
  const plans = [
    {
      name: "Hobby",
      price: "$0",
      desc: "For personal projects and learning",
      features: ["1 project", "1GB storage", "Community support"],
      cta: "Get Started",
    },
    {
      name: "Professional",
      price: "$49",
      desc: "For freelancers and small teams",
      features: [
        "10 projects",
        "50GB storage",
        "Email support",
        "Advanced analytics",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Business",
      price: "$199",
      desc: "For growing companies",
      features: [
        "Unlimited projects",
        "500GB storage",
        "Priority support",
        "Team collaboration",
        "API access",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For large organizations",
      features: [
        "Everything in Business",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Tiered Pricing List
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: All plans in list — stacked rows with features.
        </p>
      </div>

      <div className="space-y-4">
        {plans.map((plan, idx) => (
          <a
            key={plan.name}
            href="#"
            className={`group block p-6 rounded-2xl border transition-smooth ${
              idx === 2
                ? "border-primary-orange bg-primary-black dark:bg-primary-orange"
                : "border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3
                  className={`text-xl font-bold mb-1 ${idx === 2 ? "text-primary-white" : "text-primary-black dark:text-primary-white"}`}
                >
                  {plan.name}
                </h3>
                <p
                  className={`text-sm ${idx === 2 ? "text-primary-white/70" : "text-primary-black/60 dark:text-primary-white/60"}`}
                >
                  {plan.desc}
                </p>
              </div>
              <div className="text-right ml-4">
                <div
                  className={`text-3xl font-bold ${idx === 2 ? "text-primary-white" : "text-primary-black dark:text-primary-white"}`}
                >
                  {plan.price}
                </div>
                {plan.price !== "Custom" && (
                  <span
                    className={`text-xs ${idx === 2 ? "text-primary-white/70" : "text-primary-black/60 dark:text-primary-white/60"}`}
                  >
                    /month
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div
                className={`flex flex-wrap gap-2 text-xs ${idx === 2 ? "text-primary-white/80" : "text-primary-black/70 dark:text-primary-white/70"}`}
              >
                {plan.features.map((feature) => (
                  <span key={feature} className="flex items-center gap-1">
                    <Check size={14} />
                    {feature}
                  </span>
                ))}
              </div>
              <button
                className={`ml-4 shrink-0 py-2 px-4 rounded-lg font-medium transition-smooth ${
                  idx === 2
                    ? "bg-primary-white text-primary-black hover:scale-105"
                    : "bg-primary-black/10 dark:bg-primary-white/10 text-primary-black dark:text-primary-white hover:bg-primary-orange hover:text-primary-white"
                }`}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
