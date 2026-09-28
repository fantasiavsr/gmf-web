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

export default function BentoProductGrid() {
  return (
    <section className="bento-product-grid p-8 md:p-16 md:max-w-7xl mx-auto">
      <style>{`
        @media (max-width: 499px) {
          .bento-product-grid {
            padding: 1rem;
          }

          .bento-product-grid__heading {
            margin-bottom: 1.5rem;
          }

          .bento-product-grid__heading p {
            font-size: 0.8125rem;
            line-height: 1.35;
          }

          .bento-product-grid__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.75rem;
          }

          .bento-product-grid__large,
          .bento-product-grid__brand,
          .bento-product-grid__fonts {
            grid-column: span 2 / span 2;
          }

          .bento-product-grid__large,
          .bento-product-grid__tall,
          .bento-product-grid__templates,
          .bento-product-grid__brand,
          .bento-product-grid__fonts {
            grid-row: span 1 / span 1;
            min-width: 0;
          }

          .bento-product-grid__large {
            padding: 1rem;
          }

          .bento-product-grid__large h3 {
            font-size: 1.25rem;
            line-height: 1.2;
          }

          .bento-product-grid__large img,
          .bento-product-grid__large > div > div:last-child {
            height: auto;
            max-height: 10rem;
          }

          .bento-product-grid__tall,
          .bento-product-grid__templates,
          .bento-product-grid__brand,
          .bento-product-grid__fonts {
            padding: 0.875rem;
          }

          .bento-product-grid__tall img,
          .bento-product-grid__tall > div:first-child {
            aspect-ratio: 1 / 1;
          }

          .bento-product-grid__brand > div {
            gap: 0.75rem;
          }
        }
      `}</style>
      <div className="bento-product-grid__heading mb-8">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Bento Product Grid
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Creative portfolio — asymmetric layout with varied sizing.
        </p>
      </div>
      <div className="bento-product-grid__grid grid grid-cols-4 gap-4">
        {/* Large item */}
        <a
          href="#"
          className="bento-product-grid__large col-span-2 row-span-2 group block p-6 rounded-3xl bg-primary-orange hover:bg-primary-black dark:hover:bg-primary-black transition-smooth"
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-primary-white dark:text-primary-black group-hover:text-primary-white mb-2">
                Premium Design Kit
              </h3>
              <p className="text-primary-white/90 dark:text-primary-black/80 group-hover:text-primary-white/90 text-sm">
                200+ components, Figma & code
              </p>
            </div>
            <ImageWithFallback
              src="/product/images1.jpg"
              alt="Premium Design Kit"
              className="aspect-video rounded-xl mt-4 object-cover w-full h-full"
              fallback={
                <div className="aspect-video bg-primary-white/10 rounded-xl mt-4 flex items-center justify-center">
                  <span className="text-6xl font-black text-primary-white/30 dark:text-primary-black/30 select-none">P</span>
                </div>
              }
            />
          </div>
        </a>

        {/* Tall item */}
        <a
          href="#"
          className="bento-product-grid__tall col-span-1 row-span-2 group block p-5 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange hover:-translate-y-1 transition-smooth"
        >
          <ImageWithFallback
            src="/product/images2.jpg"
            alt="Icon Pack"
            className="aspect-3/4 bg-primary-black/5 dark:bg-primary-white/5 rounded-xl mb-3 object-cover w-full"
            fallback={
              <div className="aspect-3/4 bg-primary-black/5 dark:bg-primary-white/5 rounded-xl mb-3 flex items-center justify-center">
                <span className="text-5xl font-black text-primary-black/10 dark:text-primary-white/10 select-none">I</span>
              </div>
            }
          />
          <h4 className="font-bold text-sm text-primary-black dark:text-primary-white">Icon Pack</h4>
          <p className="text-xs text-primary-orange font-bold mt-1">$29</p>
        </a>

        {/* Wide item */}
        <a
          href="#"
          className="bento-product-grid__templates col-span-1 row-span-1 group block p-5 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:-translate-y-1 transition-smooth"
        >
          <h4 className="font-bold text-sm text-primary-black dark:text-primary-white mb-2">Templates</h4>
          <p className="text-xs text-primary-orange font-bold">$49</p>
        </a>

        {/* Standard items */}
        <a
          href="#"
          className="bento-product-grid__brand col-span-2 row-span-1 group block p-5 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:-translate-y-1 transition-smooth"
        >
          <div className="flex items-center gap-4">
            <ImageWithFallback
              src="/product/images4.jpg"
              alt="Brand Guidelines"
              className="w-16 h-16 bg-primary-black dark:bg-primary-orange rounded-xl object-cover shrink-0"
              fallback={
                <div className="w-16 h-16 bg-primary-black dark:bg-primary-orange rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-2xl font-black text-primary-white dark:text-primary-black select-none">B</span>
                </div>
              }
            />
            <div>
              <h4 className="font-bold text-sm text-primary-black dark:text-primary-white">Brand Guidelines</h4>
              <p className="text-xs text-primary-orange font-bold mt-1">$99</p>
            </div>
          </div>
        </a>

        <a
          href="#"
          className="bento-product-grid__fonts col-span-1 row-span-1 group block p-5 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:-translate-y-1 transition-smooth"
        >
          <h4 className="font-bold text-sm text-primary-black dark:text-primary-white mb-2">Fonts</h4>
          <p className="text-xs text-primary-orange font-bold">$19</p>
        </a>
      </div>
    </section>
  );
}
