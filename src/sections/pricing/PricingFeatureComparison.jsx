import { Check, X } from "lucide-react";

export default function PricingFeatureComparison() {
  const comparison = [
    { category: "Core Features", features: [
      { name: "API Access", starter: true, pro: true, enterprise: true },
      { name: "Webhooks", starter: true, pro: true, enterprise: true },
      { name: "Rate Limiting", starter: "1K/day", pro: "100K/day", enterprise: "Unlimited" },
    ]},
    { category: "Support & SLA", features: [
      { name: "Email Support", starter: true, pro: true, enterprise: true },
      { name: "Priority Support", starter: false, pro: true, enterprise: true },
      { name: "24/7 Phone Support", starter: false, pro: false, enterprise: true },
      { name: "SLA Guarantee", starter: false, pro: "99%", enterprise: "99.99%" },
    ]},
    { category: "Security", features: [
      { name: "SSL/TLS Encryption", starter: true, pro: true, enterprise: true },
      { name: "IP Whitelisting", starter: false, pro: true, enterprise: true },
      { name: "SOC 2 Compliance", starter: false, pro: false, enterprise: true },
      { name: "HIPAA Compliance", starter: false, pro: false, enterprise: true },
    ]},
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">Pricing + Feature Comparison</h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">Example: Detailed feature matrix — organized by category.</p>
      </div>

      <div className="space-y-8">
        {comparison.map((section) => (
          <div key={section.category} className="border border-primary-black/10 dark:border-primary-white/10 rounded-2xl overflow-hidden">
            <div className="bg-primary-black/5 dark:bg-primary-white/5 p-6 border-b border-primary-black/10 dark:border-primary-white/10">
              <h3 className="text-lg font-bold text-primary-black dark:text-primary-white">{section.category}</h3>
            </div>

            <div className="divide-y divide-primary-black/10 dark:divide-primary-white/10">
              {section.features.map((feature) => (
                <div key={feature.name} className="p-6 flex items-center justify-between">
                  <span className="font-medium text-primary-black dark:text-primary-white">{feature.name}</span>
                  <div className="flex gap-8 md:gap-12">
                    {/* Starter */}
                    <div className="w-24 text-center text-sm">
                      {typeof feature.starter === "boolean" ? (
                        feature.starter ? (
                          <Check size={20} className="mx-auto text-primary-orange" />
                        ) : (
                          <X size={20} className="mx-auto text-primary-black/30 dark:text-primary-white/30" />
                        )
                      ) : (
                        <span className="text-primary-black/70 dark:text-primary-white/70">{feature.starter}</span>
                      )}
                    </div>

                    {/* Pro */}
                    <div className="w-24 text-center text-sm">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <Check size={20} className="mx-auto text-primary-orange" />
                        ) : (
                          <X size={20} className="mx-auto text-primary-black/30 dark:text-primary-white/30" />
                        )
                      ) : (
                        <span className="text-primary-black/70 dark:text-primary-white/70">{feature.pro}</span>
                      )}
                    </div>

                    {/* Enterprise */}
                    <div className="w-24 text-center text-sm">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <Check size={20} className="mx-auto text-primary-orange" />
                        ) : (
                          <X size={20} className="mx-auto text-primary-black/30 dark:text-primary-white/30" />
                        )
                      ) : (
                        <span className="text-primary-black/70 dark:text-primary-white/70">{feature.enterprise}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-8 p-6 bg-primary-black/5 dark:bg-primary-white/5 rounded-2xl border border-primary-black/10 dark:border-primary-white/10">
        <h4 className="text-sm font-bold text-primary-black dark:text-primary-white mb-4">Plan Comparison</h4>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-primary-black/70 dark:text-primary-white/70">Starter</span>
            <span className="font-bold text-primary-orange">$29/month</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary-black/70 dark:text-primary-white/70">Pro</span>
            <span className="font-bold text-primary-orange">$99/month</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-primary-black/70 dark:text-primary-white/70">Enterprise</span>
            <span className="font-bold text-primary-orange">Custom</span>
          </div>
        </div>
      </div>
    </section>
  );
}
