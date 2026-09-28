import { useState } from "react";
function ImageWithFallback({ src, alt, className, fallback }) {
  const [error, setError] = useState(false);
  if (error) return fallback;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}

export default function ServiceShowcase() {
  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Service Showcase
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Hero service — large feature highlight.
        </p>
      </div>
      <a
        href="#"
        className="group block rounded-3xl p-12 md:p-16 bg-primary-black dark:bg-primary-orange hover:bg-primary-orange dark:hover:bg-primary-black transition-smooth border border-primary-black dark:border-primary-orange overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest bg-primary-orange dark:bg-primary-black text-primary-white px-3 py-1 rounded-full mb-4">
              Premium Service
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-white dark:text-primary-black group-hover:text-primary-black dark:group-hover:text-primary-white mb-4">
              Full Brand Transformation
            </h2>
            <p className="text-lg text-primary-white/80 dark:text-primary-black/70 group-hover:text-primary-black/80 dark:group-hover:text-primary-white/80 mb-8">
              Complete rebrand from strategy through execution. We'll audit your
              current brand, develop new positioning, create visual identity,
              and implement across all touchpoints.
            </p>
            <ul className="space-y-3 text-primary-white/80 dark:text-primary-black/70 text-sm mb-8 group-hover:text-primary-black/80 dark:group-hover:text-primary-white/80">
              <li className="hover:text-primary-black dark:hover:text-primary-white">
                ✓ Brand strategy & positioning
              </li>
              <li>✓ Visual identity design (logo, colors, typography)</li>
              <li>✓ Brand guidelines & system</li>
              <li>✓ Marketing materials & collateral</li>
              <li>✓ Website & digital touchpoints</li>
              <li>✓ 90-day rollout plan</li>
            </ul>
            <div className="text-3xl font-bold text-primary-white dark:text-primary-black group-hover:text-primary-black dark:group-hover:text-primary-white">
              $15,000
            </div>
          </div>
          <div className="aspect-square bg-primary-white/10 dark:bg-primary-black/10 rounded-2xl flex items-center justify-center">
            <ImageWithFallback
              src={`/product/images2.jpg`}
              alt="B"
              className="w-full h-full object-cover"
              fallback={
                <span className="text-5xl font-black text-primary-black/10 dark:text-primary-white/10 select-none">
                  B
                </span>
              }
            />
          </div>
        </div>
      </a>
    </section>
  );
}
