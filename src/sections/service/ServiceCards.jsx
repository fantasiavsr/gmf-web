import { ArrowRight } from "lucide-react";

export default function ServiceCards() {
  const services = [
    {
      name: "Welding",
      desc: "Highly sought-after program for basic and experienced welders seeking international certification",
      price: "GTAW • SMAW • FCAW • GMAW",
    },
    {
      name: "Pipe Fitter",
      desc: "Creating skilled professionals for industry demands in the Batam region",
      price: "Certified Program",
    },
    {
      name: "Blaster & Coating",
      desc: "Supporting industry with recognized and valued professional skills",
      price: "Industrial Certified",
    },
    {
      name: "Grinder Operations",
      desc: "Basic training program for industrial and business applications in Batam",
      price: "Foundation Level",
    },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Service Cards
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Agency services — equal-size cards with descriptions.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <a
            key={service.name}
            href="#"
            className="group block p-6 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange hover:-translate-y-2 transition-smooth"
          >
            <h4 className="text-lg font-bold text-primary-black dark:text-primary-white mb-2">
              {service.name}
            </h4>
            <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mb-4">
              {service.desc}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-primary-orange">
                {service.price}
              </span>
              <ArrowRight
                size={16}
                className="opacity-0 group-hover:opacity-100 transition-smooth"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
