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

export default function FeaturedProduct() {
  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Featured Product
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Hero product — large immersive showcase.
        </p>
      </div>
      <a
        href="#"
        className="group block rounded-3xl overflow-hidden  bg-primary-orange hover:bg-primary-black dark:hover:bg-primary-black transition-smooth"
      >
        <div className="grid md:grid-cols-2 gap-8 p-10 md:p-16">
          <div className="flex flex-col justify-center">
            <span className="inline-block text-xs uppercase tracking-widest bg-primary-black dark:bg-primary-white text-primary-white dark:text-primary-black px-3 py-1 rounded-full w-fit mb-4">
              New Release
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-primary-white dark:text-primary-black group-hover:text-primary-white mb-4">
              Nebula Pro
            </h2>
            <p className="text-lg text-primary-white/90 dark:text-primary-black/80 group-hover:text-primary-white/90 mb-6 leading-relaxed">
              Premium wireless earbuds with spatial audio, 40-hour battery, and
              adaptive noise cancellation.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary-white dark:text-primary-black group-hover:text-primary-white">
                $399
              </span>
              <span className="text-sm text-primary-white/70 dark:text-primary-black/60 group-hover:text-primary-white/70 line-through">
                $499
              </span>
            </div>
          </div>
          <div className="aspect-square bg-primary-white/10 rounded-2xl flex items-center justify-center">
            <ImageWithFallback
              src="/product/images2.jpg"
              alt="Featured"
              className="aspect-square rounded-2xl object-cover w-full h-full"
              fallback=<span className="text-9xl font-black text-primary-white/20 dark:text-primary-black/20 select-none">
                N
              </span>
            />
          </div>
        </div>
      </a>
    </section>
  );
}
