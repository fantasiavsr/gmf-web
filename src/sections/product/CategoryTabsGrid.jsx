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

export default function CategoryTabsGrid() {
  const [activeTab, setActiveTab] = useState("electronics");

  const categories = {
    electronics: [
      { name: "Quantum Phone", price: "$899" },
      { name: "Nova Tablet", price: "$549" },
      { name: "Pulse Earbuds", price: "$199" },
      { name: "Vision Display", price: "$1,299" },
    ],
    fashion: [
      { name: "Silk Dress", price: "$249" },
      { name: "Leather Jacket", price: "$399" },
      { name: "Denim Jeans", price: "$129" },
      { name: "Canvas Sneakers", price: "$89" },
    ],
    home: [
      { name: "Velvet Sofa", price: "$1,499" },
      { name: "Marble Table", price: "$799" },
      { name: "Ceramic Lamp", price: "$149" },
      { name: "Cotton Rug", price: "$299" },
    ],
  };

  const tabs = [
    { id: "electronics", label: "Electronics" },
    { id: "fashion", label: "Fashion" },
    { id: "home", label: "Home" },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Category Tabs + Grid
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Multi-category store — tabbed navigation with filtered grid.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-primary-black/10 dark:border-primary-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-smooth relative ${
              activeTab === tab.id
                ? "text-primary-orange"
                : "text-primary-black/60 dark:text-primary-white/60 hover:text-primary-black dark:hover:text-primary-white"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-orange" />
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories[activeTab].map((item, idx) => (
          <a
            key={item.name}
            href="#"
            className="group block p-5 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange hover:-translate-y-1 transition-all duration-700"
            style={{
              opacity: 1,
              transform: "translateY(0)",
              transitionDelay: `${idx * 50}ms`,
            }}
          >
            <div className="aspect-square bg-primary-black/5 dark:bg-primary-white/5 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
              <ImageWithFallback
                src={`/product/images${(item.name.length % 6) + 1}.jpg`}
                alt={item.name}
                className="w-full h-full object-cover"
                fallback={
                  <span className="text-5xl font-black text-primary-black/10 dark:text-primary-white/10 select-none">
                    {item.name[0]}
                  </span>
                }
              />
            </div>
            <h4 className="font-bold text-primary-black dark:text-primary-white mb-1">
              {item.name}
            </h4>
            <span className="font-bold text-primary-orange">{item.price}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
