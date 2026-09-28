import { Check } from "lucide-react";

export default function FeaturedPricingCard() {
  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Featured Pricing Card
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Highlight one plan — large hero card with focus.
        </p>
      </div>
      <div className="rounded-3xl p-12 md:p-16 bg-primary-orange hover:bg-primary-black dark:hover:bg-primary-black transition-smooth max-w-2xl mx-auto">
        <span className="inline-block text-xs uppercase tracking-widest bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black px-3 py-1 rounded-full mb-4">
          Most Popular
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-primary-white mb-3">
          Professional Plan
        </h2>
        <p className="text-primary-white/80 mb-8 text-lg">
          Everything you need to scale your business.
        </p>

        <div className="mb-8">
          <span className="text-6xl font-bold text-primary-white">$199</span>
          <span className="text-primary-white/70">/month</span>
        </div>

        <button className="w-full bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black py-4 px-6 rounded-xl font-bold text-lg hover:scale-105 transition-smooth mb-10">
          Get Started Now
        </button>

        <div className="space-y-4">
          {[
            "Unlimited projects and team members",
            "Advanced analytics and reporting",
            "Priority 24/7 support",
            "Custom integrations",
            "API access",
            "White-label options",
          ].map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 text-primary-white/90"
            >
              <Check
                size={20}
                className="text-primary-black dark:text-primary-white shrink-0"
              />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
