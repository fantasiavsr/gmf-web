import { ArrowRight } from "lucide-react";

export default function ServiceList() {
  const services = [
    { name: "Strategy Consultation", desc: "2-hour deep dive into your business goals and market position", price: "$500" },
    { name: "Design Audit", desc: "Comprehensive review of current design system and UX practices", price: "$1,200" },
    { name: "Wireframing & Prototyping", desc: "Low-fidelity to high-fidelity interactive prototypes", price: "$2,500" },
    { name: "Design System Creation", desc: "Build scalable, maintainable design systems for teams", price: "$5,000" },
    { name: "User Testing & Research", desc: "Moderated or unmoderated user testing sessions with analysis", price: "$3,000" },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">Service List</h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">Example: Detailed services — full-width rows with descriptions.</p>
      </div>
      <div className="space-y-3">
        {services.map((service) => (
          <a
            key={service.name}
            href="#"
            className="group flex items-center justify-between p-6 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange transition-smooth"
          >
            <div className="flex-1">
              <h4 className="font-bold text-primary-black dark:text-primary-white mb-1">{service.name}</h4>
              <p className="text-sm text-primary-black/60 dark:text-primary-white/60">{service.desc}</p>
            </div>
            <div className="flex items-center gap-6 ml-4">
              <span className="font-bold text-primary-orange whitespace-nowrap">{service.price}</span>
              <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 transition-smooth" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
