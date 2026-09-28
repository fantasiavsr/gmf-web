import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import * as data from "../../data/exampleData";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import ServiceCards from "../../sections/service/ServiceCards";
import ServiceList from "../../sections/service/ServiceList";
import ServiceAccordion from "../../sections/service/ServiceAccordion";
import ServiceShowcase from "../../sections/service/ServiceShowcase";
import ServiceGrid from "../../sections/service/ServiceGrid";
import ServiceDetailList from "../../sections/service/ServiceDetailList";
import ServicePackageCards from "../../sections/service/ServicePackageCards";

export default function ServicePage() {
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
      <Navbar title="Service Layouts" links={data.NavLinks} />

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
          Services
          <br />
          <span className="italic font-normal text-primary-orange">
            Showcase.
          </span>
        </h1>
        <p
          className={`text-xl md:text-2xl text-primary-black/60 dark:text-primary-white/60 max-w-2xl leading-relaxed font-light transition-all duration-700 ${heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: heroLoaded ? "200ms" : "0ms" }}
        >
          Seven service layout patterns for every business type—from cards to
          accordions, grids to packages.
        </p>
      </section>

      {/* Sections with scroll animations */}
      <div
        ref={section1Ref}
        className={`transition-all duration-700 ${section1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <ServiceCards />
      </div>

      <div
        ref={section2Ref}
        className={`bg-primary-black/4 dark:bg-primary-white/6 transition-all duration-700 ${section2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <ServiceList />
      </div>

      <div
        ref={section3Ref}
        className={`transition-all duration-700 ${section3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <ServiceAccordion />
      </div>

      <div
        ref={section4Ref}
        className={`bg-primary-black/4 dark:bg-primary-white/6 transition-all duration-700 ${section4Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <ServiceShowcase />
      </div>

      <div
        ref={section5Ref}
        className={`transition-all duration-700 ${section5Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <ServiceGrid />
      </div>

      <div
        ref={section6Ref}
        className={`bg-primary-black/4 dark:bg-primary-white/6 transition-all duration-700 ${section6Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <ServiceDetailList />
      </div>

      <div
        ref={section7Ref}
        className={`transition-all duration-700 ${section7Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <ServicePackageCards />
      </div>

      {/* Footer */}
      <Footer page="service" />
    </main>
  );
}
