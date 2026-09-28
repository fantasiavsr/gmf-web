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

export default function ProductGrid() {
  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Product Grid
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Electronics store — equal-size cards with ratings.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            name: "Aero Headphones",
            price: "$349",
            note: "Wireless noise-cancelling over-ear",
          },
          {
            name: "Pixel Watch",
            price: "$299",
            note: "Health tracking, OLED display",
          },
          {
            name: "Studio Mic",
            price: "$199",
            note: "USB-C studio condenser mic",
          },
          {
            name: "Slate Pad",
            price: "$449",
            note: "11-inch tablet with stylus support",
          },
        ].map((item) => (
          <a
            key={item.name}
            href="#"
            className="group block p-5 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange hover:-translate-y-1 transition-smooth"
          >
            <div className="aspect-4/3 bg-primary-black/5 dark:bg-primary-white/5 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src={`/product/images${(item.name.length % 6) + 1}.jpg`}
                alt={item.name}
                className="w-full h-full object-cover"
                fallback={
                  <span className="text-3xl font-black text-primary-black/10 dark:text-primary-white/10 select-none">
                    {item.name[0]}
                  </span>
                }
              />
            </div>
            <h4 className="font-bold text-primary-black dark:text-primary-white mb-1">
              {item.name}
            </h4>
            <p className="text-xs text-primary-black/50 dark:text-primary-white/40 mb-3">
              {item.note}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary-orange">
                {item.price}
              </span>
              <span className="flex items-center gap-1 text-xs text-primary-orange">
                <Star size={12} fill="currentColor" /> 4.8
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
