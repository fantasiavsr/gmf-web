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
import { ArrowRight, Check, X } from "lucide-react";

export default function ProductList() {
  const products = [
    {
      name: "Wireless Headphones",
      type: "Electronics",
      price: "$349",
      available: 24,
    },
    {
      name: "Leather Backpack",
      type: "Accessories",
      price: "$129",
      available: 0,
    },
    { name: "USB-C Hub", type: "Electronics", price: "$79", available: 156 },
    { name: "Coffee Maker", type: "Appliances", price: "$199", available: 8 },
    { name: "Desk Lamp", type: "Furniture", price: "$89", available: 42 },
    { name: "Phone Stand", type: "Accessories", price: "$29", available: 203 },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-8">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Product List
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Inventory view — full-width rows with product details.
        </p>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 text-xs uppercase tracking-widest text-primary-black/50 dark:text-primary-white/50 border-b border-primary-black/10 dark:border-primary-white/10 mb-2">
        <div className="col-span-4">Name</div>
        <div className="col-span-3">Type</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-3">Available</div>
      </div>

      {/* Product Rows */}
      <div className="space-y-2">
        {products.map((product) => (
          <a
            key={product.name}
            href="#"
            className="group block p-6 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange transition-smooth"
          >
            <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
              {/* Name */}
              <div className="col-span-4">
                <h4 className="font-bold text-primary-black dark:text-primary-white">
                  {product.name}
                </h4>
              </div>

              {/* Type */}
              <div className="col-span-3">
                <span className="text-sm text-primary-black/60 dark:text-primary-white/60">
                  {product.type}
                </span>
              </div>

              {/* Price */}
              <div className="col-span-2">
                <span className="font-bold text-primary-orange">
                  {product.price}
                </span>
              </div>

              {/* Available */}
              <div className="col-span-3 flex items-center justify-between">
                <span
                  className={`text-sm font-medium ${
                    product.available > 0
                      ? "text-primary-black/70 dark:text-primary-white/70"
                      : "text-primary-black/40 dark:text-primary-white/40"
                  }`}
                >
                  {product.available > 0
                    ? `${product.available} in stock`
                    : "Out of stock"}
                </span>
                {product.available > 0 ? (
                  <Check size={16} className="text-primary-orange" />
                ) : (
                  <X
                    size={16}
                    className="text-primary-black/30 dark:text-primary-white/30"
                  />
                )}
              </div>
            </div>

            {/* Mobile view */}
            <div className="md:hidden space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-primary-black dark:text-primary-white">
                    {product.name}
                  </h4>
                  <p className="text-xs text-primary-black/60 dark:text-primary-white/60 mt-1">
                    {product.type}
                  </p>
                </div>
                <span className="font-bold text-primary-orange">
                  {product.price}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-primary-black/5 dark:border-primary-white/5">
                <span
                  className={`text-sm font-medium ${
                    product.available > 0
                      ? "text-primary-black/70 dark:text-primary-white/70"
                      : "text-primary-black/40 dark:text-primary-white/40"
                  }`}
                >
                  {product.available > 0
                    ? `${product.available} in stock`
                    : "Out of stock"}
                </span>
                {product.available > 0 ? (
                  <Check size={16} className="text-primary-orange" />
                ) : (
                  <X
                    size={16}
                    className="text-primary-black/30 dark:text-primary-white/30"
                  />
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
