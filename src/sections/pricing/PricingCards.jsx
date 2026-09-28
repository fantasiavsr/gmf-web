import { Check } from "lucide-react";

export default function PricingCards() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      desc: "Perfect for small projects",
      features: [
        "5 projects",
        "2GB storage",
        "Basic support",
        "Community access",
      ],
      cta: "Get Started",
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      desc: "For growing teams",
      features: [
        "Unlimited projects",
        "50GB storage",
        "Priority support",
        "Advanced analytics",
        "Custom domain",
      ],
      cta: "Start Free Trial",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For large organizations",
      features: [
        "Unlimited everything",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantee",
        "On-premise option",
      ],
      cta: "Contact Sales",
    },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Pricing Cards
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: SaaS pricing — equal-size cards with feature lists.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl p-8 border transition-smooth ${
              plan.featured
                ? "border-primary-orange bg-primary-black dark:bg-primary-orange scale-105"
                : "border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:-translate-y-2"
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-2 ${plan.featured ? "text-primary-white" : "text-primary-black dark:text-primary-white"}`}
            >
              {plan.name}
            </h3>
            <p
              className={`text-sm mb-6 ${plan.featured ? "text-primary-white/70" : "text-primary-black/60 dark:text-primary-white/60"}`}
            >
              {plan.desc}
            </p>
            <div className="mb-6">
              <span
                className={`text-4xl font-bold ${plan.featured ? "text-primary-white" : "text-primary-black dark:text-primary-white"}`}
              >
                {plan.price}
              </span>
              {plan.period && (
                <span
                  className={`text-sm ${plan.featured ? "text-primary-white/70" : "text-primary-black/60 dark:text-primary-white/60"}`}
                >
                  {plan.period}
                </span>
              )}
            </div>
            <button
              className={`w-full py-3 px-4 rounded-xl font-bold mb-8 transition-smooth ${
                plan.featured
                  ? "bg-primary-orange text-primary-white hover:bg-primary-black dark:bg-primary-black dark:hover:bg-primary-white dark:hover:text-primary-black"
                  : "bg-primary-black/10 dark:bg-primary-white/10 text-primary-black dark:text-primary-white hover:bg-primary-orange hover:text-primary-white"
              }`}
            >
              {plan.cta}
            </button>
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className={`flex items-start gap-3 text-sm ${plan.featured ? "text-primary-white/80" : "text-primary-black/70 dark:text-primary-white/70"}`}
                >
                  <Check
                    size={16}
                    className={`shrink-0 mt-0.5 ${plan.featured ? "text-primary-orange" : "text-primary-orange"}`}
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
