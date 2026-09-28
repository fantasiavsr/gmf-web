import { ArrowRight } from "lucide-react";

export default function ServiceCards() {
  const services = [
    { name: "Web Design", desc: "Custom websites that convert visitors into customers", price: "Starting $2,500" },
    { name: "Branding", desc: "Complete brand identity from logo to guidelines", price: "Starting $1,500" },
    { name: "UI/UX Design", desc: "User-centered interfaces for web and mobile apps", price: "Starting $3,000" },
    { name: "Motion Design", desc: "Animations and interactions that bring designs to life", price: "Starting $2,000" },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">Service Cards</h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">Example: Agency services — equal-size cards with descriptions.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <a
            key={service.name}
            href="#"
            className="group block p-6 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange hover:-translate-y-2 transition-smooth"
          >
            <h4 className="text-lg font-bold text-primary-black dark:text-primary-white mb-2">{service.name}</h4>
            <p className="text-sm text-primary-black/60 dark:text-primary-white/60 mb-4">{service.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-primary-orange">{service.price}</span>
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-smooth" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
