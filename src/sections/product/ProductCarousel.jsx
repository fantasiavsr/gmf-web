import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
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

export default function ProductCarousel() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Width of one card plus gap
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Product Carousel
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Furniture store — horizontal scrolling with navigation.
        </p>
      </div>
      <div className="relative">
        {/* Navigation buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-10 px-2">
          <button
            onClick={() => scroll("left")}
            className="pointer-events-auto w-10 h-10 rounded-full bg-primary-white dark:bg-primary-dark-card border border-primary-black/10 dark:border-primary-white/10 flex items-center justify-center hover:bg-primary-orange hover:text-primary-white hover:border-primary-orange transition-smooth shadow-lg"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="pointer-events-auto w-10 h-10 rounded-full bg-primary-white dark:bg-primary-dark-card border border-primary-black/10 dark:border-primary-white/10 flex items-center justify-center hover:bg-primary-orange hover:text-primary-white hover:border-primary-orange transition-smooth shadow-lg"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
        >
          {[
            {
              name: "Oslo Sofa",
              price: "$1,299",
              note: "3-seater, linen upholstery",
            },
            {
              name: "Bergen Chair",
              price: "$549",
              note: "Solid oak, leather cushion",
            },
            {
              name: "Fjord Table",
              price: "$899",
              note: "Walnut, extends to 8 seats",
            },
            {
              name: "Lofoten Lamp",
              price: "$299",
              note: "Brass, adjustable arm",
            },
            {
              name: "Tromsø Shelf",
              price: "$449",
              note: "Modular, wall-mounted",
            },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className="group shrink-0 w-72 snap-start block p-5 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange transition-smooth"
            >
              <div className="aspect-square bg-primary-black/5 dark:bg-primary-white/5 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <ImageWithFallback
                  src={`/product/images${(item.name.length % 5) + 1}.jpg`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  fallback={
                    <span className="text-6xl font-black text-primary-black/10 dark:text-primary-white/10 select-none">
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
              <span className="font-bold text-primary-orange">
                {item.price}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
