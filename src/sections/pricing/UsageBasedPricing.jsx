export default function UsageBasedPricing() {
  const tiers = [
    { usage: "0 - 10K", price: "$0" },
    { usage: "10K - 100K", price: "$0.10/unit" },
    { usage: "100K - 1M", price: "$0.05/unit" },
    { usage: "1M+", price: "$0.02/unit" },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">Usage-Based Pricing</h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">Example: Pay-as-you-go — pricing scales with usage.</p>
      </div>

      <div className="bg-primary-white dark:bg-primary-dark-card rounded-3xl p-8 md:p-12 border border-primary-black/10 dark:border-primary-white/10">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-black dark:text-primary-white mb-3">
            Pay Only for What You Use
          </h2>
          <p className="text-lg text-primary-black/60 dark:text-primary-white/60">
            No setup fees. No hidden charges. Scale as you grow.
          </p>
        </div>

        {/* Pricing tiers */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {tiers.map((tier) => (
            <div key={tier.usage} className="p-6 rounded-2xl bg-primary-black/5 dark:bg-primary-white/5 border border-primary-black/10 dark:border-primary-white/10">
              <div className="text-sm text-primary-black/60 dark:text-primary-white/60 mb-2">Usage</div>
              <div className="text-2xl font-bold text-primary-black dark:text-primary-white mb-2">{tier.usage} requests</div>
              <div className="text-primary-orange font-bold text-lg">{tier.price}</div>
            </div>
          ))}
        </div>

        {/* Example calculation */}
        <div className="border-t border-primary-black/10 dark:border-primary-white/10 pt-8">
          <h3 className="text-lg font-bold text-primary-black dark:text-primary-white mb-6">Example: Monthly Bill</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-primary-black/70 dark:text-primary-white/70">First 10K requests</span>
              <span className="font-bold text-primary-black dark:text-primary-white">$0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-primary-black/70 dark:text-primary-white/70">Next 90K requests (100K total)</span>
              <span className="font-bold text-primary-black dark:text-primary-white">$9.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-primary-black/70 dark:text-primary-white/70">Next 900K requests (1M total)</span>
              <span className="font-bold text-primary-black dark:text-primary-white">$45.00</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-primary-black/10 dark:border-primary-white/10">
              <span className="font-bold text-primary-black dark:text-primary-white">Monthly total for 1M requests</span>
              <span className="text-lg font-bold text-primary-orange">$54.00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
