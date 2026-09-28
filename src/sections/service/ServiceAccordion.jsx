import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ServiceAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const services = [
    {
      name: "Welding",
      desc: "Highly sought-after program for basic and experienced welders seeking international certification",
      details:
        "Comprehensive welding training program designed for both beginners and experienced welders. Covers GTAW, SMAW, FCAW, and GMAW processes with hands-on practice using 35 permanent booths and 50 advanced welding machines. Participants receive internationally recognized certifications upon successful completion.",
    },
    {
      name: "Pipe Fitter",
      desc: "Creating skilled professionals for industry demands in the Batam region",
      details:
        "Specialized training program creating reliable skilled workers for the industrial needs of Batam and surrounding regions. Covers pipe assembly, welding procedures, pressure testing, and adherence to international industry standards. Graduates are ready for immediate employment in construction and maintenance sectors.",
    },
    {
      name: "Blaster & Coating",
      desc: "Supporting industry with recognized and valued professional skills",
      details:
        "Comprehensive industrial coating and blasting program recognized by major industries in Batam. Participants develop expertise in surface preparation, blasting techniques, and coating application. Program participants gain industry-recognized skills that are highly valued in the manufacturing and construction sectors.",
    },
    {
      name: "Grinder Operations",
      desc: "Basic training program for industrial and business applications in Batam",
      details:
        "Foundational grinder operation training designed for industrial and business applications. Covers safety procedures, grinding techniques, equipment maintenance, and finishing standards. Program equips participants with practical skills needed for immediate job placement in manufacturing facilities.",
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
