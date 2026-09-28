import { Check, Clock, Users } from "lucide-react";

export default function ServiceDetailList() {
  const services = [
    {
      name: "Logo & Identity Design",
      duration: "2-4 weeks",
      team: "1 Designer + 1 Strategist",
      includes: [
        "Brand concept exploration",
        "5 logo variations",
        "Color palette",
        "Typography system",
        "Brand guidelines",
      ],
    },
    {
      name: "Website Design & Development",
      duration: "6-8 weeks",
      team: "2 Designers + 2 Developers",
      includes: [
        "UX research & wireframes",
        "High-fidelity designs",
        "Responsive development",
        "CMS integration",
        "SEO optimization",
      ],
    },
    {
      name: "App Design & Development",
      duration: "8-12 weeks",
      team: "1 Designer + 2 Developers",
      includes: [
        "User research & testing",
        "UI/UX design",
        "iOS & Android development",
        "App store deployment",
        "Analytics setup",
      ],
    },
  ];

  return (
    <section className="p-8 md:p-16 md:max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-2">
          Service Detail List
        </h3>
        <p className="text-sm text-primary-black/60 dark:text-primary-white/60">
          Example: Service specs — detailed info with timeline and team.
        </p>
      </div>
      <div className="space-y-6">
        {services.map((service) => (
          <a
            key={service.name}
            href="#"
            className="block p-8 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-primary-white dark:bg-primary-dark-card hover:border-primary-orange transition-smooth"
          >
            <h3 className="text-2xl font-bold text-primary-black dark:text-primary-white mb-4">
              {service.name}
            </h3>

            {/* Specs row */}
            <div className="flex flex-wrap gap-8 mb-6 pb-6 border-b border-primary-black/10 dark:border-primary-white/10">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary-orange" />
                <span className="text-sm text-primary-black/70 dark:text-primary-white/70">
                  {service.duration}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} className="text-primary-orange" />
                <span className="text-sm text-primary-black/70 dark:text-primary-white/70">
                  {service.team}
                </span>
              </div>
            </div>

            {/* Includes */}
            <div>
              <span className="text-xs uppercase tracking-widest text-primary-black/50 dark:text-primary-white/50 mb-3 block">
                What's Included
              </span>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
                {service.includes.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Check
                      size={16}
                      className="text-primary-orange shrink-0 mt-0.5"
                    />
                    <span className="text-sm text-primary-black/70 dark:text-primary-white/70">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
