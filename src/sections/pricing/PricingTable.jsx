import { Check, X } from "lucide-react";

export default function PricingTable() {
  const features = [
    { name: "Projects", starter: "5", pro: "Unlimited", enterprise: "Unlimited" },
    { name: "Storage", starter: "10GB", pro: "100GB", enterprise: "Unlimited" },
    { name: "Team members", starter: "1", pro: "Unlimited", enterprise: "Unlimited" },
    { name: "Support", starter: "Email", pro: "Priority", enterprise: "24/7 Dedicated" },
    { name: "Analytics", starter: false, pro: true, enterprise: true },
    { name: "API access", starter: false, pro: true, enterprise: true },
    { name: "Custom domain", starter: false, pro: true, enterprise: true },
    { name: "SSO/SAML", starter: false, pro: false, enterprise: true },
  ];

  const plans = [
    { name: "Starter", price: "$29/mo" },
    { name: "Pro", price: "$99/mo" },
    { name: "Enterprise", price: "Custom" },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">Pricing Table</h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">Example: Feature matrix — detailed comparison in table format.</p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto border border-primary-black/10 dark:border-primary-white/10 rounded-2xl">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary-black/10 dark:border-primary-white/10">
              <th className="text-left p-6 text-primary-black dark:text-primary-white font-bold">Feature</th>
              {plans.map((plan) => (
                <th key={plan.name} className="text-center p-6 text-primary-black dark:text-primary-white font-bold">
                  <div className="text-lg">{plan.name}</div>
                  <div className="text-primary-orange text-sm mt-1">{plan.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr
                key={feature.name}
                className={`border-b border-primary-black/10 dark:border-primary-white/10 ${idx % 2 === 0 ? "bg-primary-black/2 dark:bg-primary-white/2" : ""}`}
              >
                <td className="p-6 text-primary-black dark:text-primary-white font-medium">{feature.name}</td>
                <td className="p-6 text-center">
                  {typeof feature.starter === "boolean" ? (
                    feature.starter ? (
                      <Check size={20} className="mx-auto text-primary-orange" />
                    ) : (
                      <X size={20} className="mx-auto text-primary-black/30 dark:text-primary-white/30" />
                    )
                  ) : (
                    <span className="text-primary-black/70 dark:text-primary-white/70">{feature.starter}</span>
                  )}
                </td>
                <td className="p-6 text-center">
                  {typeof feature.pro === "boolean" ? (
                    feature.pro ? (
                      <Check size={20} className="mx-auto text-primary-orange" />
                    ) : (
                      <X size={20} className="mx-auto text-primary-black/30 dark:text-primary-white/30" />
                    )
                  ) : (
                    <span className="text-primary-black/70 dark:text-primary-white/70">{feature.pro}</span>
                  )}
                </td>
                <td className="p-6 text-center">
                  {typeof feature.enterprise === "boolean" ? (
                    feature.enterprise ? (
                      <Check size={20} className="mx-auto text-primary-orange" />
                    ) : (
                      <X size={20} className="mx-auto text-primary-black/30 dark:text-primary-white/30" />
                    )
                  ) : (
                    <span className="text-primary-black/70 dark:text-primary-white/70">{feature.enterprise}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked */}
      <div className="md:hidden space-y-4">
        {plans.map((plan) => (
          <div key={plan.name} className="border border-primary-black/10 dark:border-primary-white/10 rounded-2xl p-6">
            <div className="mb-4">
              <h4 className="text-lg font-bold text-primary-black dark:text-primary-white">{plan.name}</h4>
              <p className="text-primary-orange font-bold">{plan.price}</p>
            </div>
            <div className="space-y-2 text-sm">
              {features.map((feature) => {
                const value = plan.name === "Starter" ? feature.starter : plan.name === "Pro" ? feature.pro : feature.enterprise;
                return (
                  <div key={feature.name} className="flex justify-between items-center">
                    <span className="text-primary-black/70 dark:text-primary-white/70">{feature.name}</span>
                    {typeof value === "boolean" ? (
                      value ? (
                        <Check size={16} className="text-primary-orange" />
                      ) : (
                        <X size={16} className="text-primary-black/30 dark:text-primary-white/30" />
                      )
                    ) : (
                      <span className="font-medium text-primary-black dark:text-primary-white">{value}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
