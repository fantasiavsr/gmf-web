import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ServiceAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const services = [
    {
      name: "Web Development",
      desc: "Full-stack web applications built with modern technologies",
      details:
        "We build responsive, scalable web applications using React, Vue, Node.js, and databases like PostgreSQL. Includes hosting setup, maintenance, and ongoing support.",
    },
    {
      name: "Mobile App Development",
      desc: "Native and cross-platform mobile applications",
      details:
        "iOS and Android app development using Swift, Kotlin, React Native, or Flutter. App store deployment, user analytics, and post-launch support included.",
    },
    {
      name: "E-commerce Solutions",
      desc: "Complete online store setup and optimization",
      details:
        "Shopify, WooCommerce, or custom e-commerce platforms. Payment integration, inventory management, shipping setup, and conversion optimization.",
    },
    {
      name: "API & Backend Services",
      desc: "Robust server-side infrastructure and integrations",
      details:
        "RESTful and GraphQL APIs, microservices architecture, third-party integrations, database design, and deployment on AWS, GCP, or Azure.",
    },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Service Accordion
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Expandable details — collapsible service descriptions.
        </p>
      </div>
      <div className="space-y-3">
        {services.map((service, idx) => (
          <button
            key={service.name}
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            className="w-full text-left p-6 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange transition-smooth"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-bold text-primary-black dark:text-primary-white">
                  {service.name}
                </h4>
                <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mt-1">
                  {service.desc}
                </p>
              </div>
              <ChevronDown
                size={20}
                className={`text-primary-orange shrink-0 ml-4 transition-transform ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === idx && (
              <div className="mt-4 pt-4 border-t border-primary-black/10 dark:border-primary-white/10">
                <p className="text-sm text-primary-black/70 dark:text-primary-white/70">
                  {service.details}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
