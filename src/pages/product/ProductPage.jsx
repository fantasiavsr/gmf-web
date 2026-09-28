import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import * as data from "../../data/exampleData";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import ProductGrid from "../../sections/product/ProductGrid";
import ProductList from "../../sections/product/ProductList";
import FeaturedProduct from "../../sections/product/FeaturedProduct";
import FeaturedProductGrid from "../../sections/product/FeaturedProductGrid";
import BentoProductGrid from "../../sections/product/BentoProductGrid";
import ProductCarousel from "../../sections/product/ProductCarousel";
import CategoryTabsGrid from "../../sections/product/CategoryTabsGrid";

export default function ProductPage() {
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const [section1Ref, section1Visible] = useScrollAnimation({ threshold: 0.1 });
  const [section2Ref, section2Visible] = useScrollAnimation({ threshold: 0.1 });
  const [section3Ref, section3Visible] = useScrollAnimation({ threshold: 0.1 });
  const [section4Ref, section4Visible] = useScrollAnimation({ threshold: 0.1 });
  const [section5Ref, section5Visible] = useScrollAnimation({ threshold: 0.1 });
  const [section6Ref, section6Visible] = useScrollAnimation({ threshold: 0.1 });
  const [section7Ref, section7Visible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <main className="min-h-screen bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white font-sans selection:bg-primary-orange selection:text-primary-white transition-colors">
      <Navbar title="Product Layouts" links={data.NavLinks} />

      {/* Hero */}
      <section className="pt-36 pb-20 px-8 md:px-16 md:max-w-7xl mx-auto">
        <p
          className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-6 transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          Layout Patterns
        </p>
        <h1
          className={`text-5xl md:text-8xl font-bold tracking-tighter leading-[0.88] mb-8 text-primary-black dark:text-primary-white transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? "100ms" : "0ms" }}
        >
          Product
          <br />
          <span className="italic font-normal text-primary-orange">
            Showcase.
          </span>
        </h1>
        <p
          className={`text-xl md:text-2xl text-primary-black/60 dark:text-primary-white/60 max-w-2xl leading-relaxed font-light transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? "200ms" : "0ms" }}
        >
          Seven versatile product layout patterns for every use case—from grids
          to carousels, lists to bento boxes.
        </p>
      </section>

      {/* Sections with scroll animations */}
      <div
        id="product-grid"
        ref={section1Ref}
        className={`transition-all duration-700 ${section1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <ProductGrid />
      </div>

      <div
        id="product-list"
        ref={section2Ref}
        className={`bg-primary-black/4 dark:bg-primary-white/6 transition-all duration-700 ${section2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <ProductList />
      </div>

      <div
        id="featured-product"
        ref={section3Ref}
        className={`transition-all duration-700 ${section3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <FeaturedProduct />
      </div>

      <div
        id="featured-product-grid"
        ref={section4Ref}
        className={`bg-primary-black/4 dark:bg-primary-white/6 transition-all duration-700 ${section4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <FeaturedProductGrid />
      </div>

      <div
        id="bento-product-grid"
        ref={section5Ref}
        className={`transition-all duration-700 ${section5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <BentoProductGrid />
      </div>

      <div
        id="product-carousel"
        ref={section6Ref}
        className={`bg-primary-black/4 dark:bg-primary-white/6 transition-all duration-700 ${section6Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <ProductCarousel />
      </div>

      <div
        id="category-tabs-grid"
        ref={section7Ref}
        className={`transition-all duration-700 ${section7Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <CategoryTabsGrid />
      </div>

      {/* Footer */}
      <Footer page="product" />
    </main>
  );
}
