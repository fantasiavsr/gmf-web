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
import { Star } from "lucide-react";

export default function FeaturedProductGrid() {
  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Featured Product + Grid
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Fashion site — hero product with supporting items.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Featured */}
        <a
          href="#"
          className="md:col-span-2 md:row-span-2 group block p-8 rounded-3xl bg-primary-black dark:bg-primary-orange hover:bg-primary-orange dark:hover:bg-primary-black transition-smooth"
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <span className="inline-block text-xs uppercase tracking-widest bg-primary-orange dark:bg-primary-black text-primary-white px-3 py-1 rounded-full mb-4">
                Featured
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary-white dark:text-primary-black group-hover:text-primary-white mb-3">
                Winter Collection
              </h2>
              <p className="text-primary-white/80 dark:text-primary-black/70 group-hover:text-primary-white/80 text-lg mb-6">
                Cozy essentials for the season.
              </p>
            </div>
            <div className="aspect-video bg-primary-white/10 rounded-2xl flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src="/product/images1.jpg"
                alt="Winter Collection"
                className="w-full h-full object-cover"
                fallback={
                  <span className="text-8xl font-black text-primary-white/20 dark:text-primary-black/20 select-none">
                    W
                  </span>
                }
              />
            </div>
          </div>
        </a>

        {/* Supporting items */}
        {[
          { name: "Merino Sweater", price: "$129" },
          { name: "Wool Coat", price: "$289" },
          { name: "Cashmere Scarf", price: "$89" },
          { name: "Leather Boots", price: "$249" },
        ].map((item) => (
          <a
            key={item.name}
            href="#"
            className="group block p-5 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange hover:-translate-y-1 transition-smooth"
          >
            <div className="aspect-square bg-primary-black/5 dark:bg-primary-white/5 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src={`/product/images${(item.name.length % 6) + 1}.jpg`}
                alt={item.name}
                className="w-full h-full object-cover"
                fallback={
                  <span className="text-4xl font-black text-primary-black/10 dark:text-primary-white/10 select-none">
                    {item.name[0]}
                  </span>
                }
              />
            </div>
            <h4 className="font-bold text-primary-black dark:text-primary-white mb-1">
              {item.name}
            </h4>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary-orange">
                {item.price}
              </span>
              <span className="flex items-center gap-1 text-xs text-primary-orange">
                <Star size={12} fill="currentColor" /> 4.9
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
