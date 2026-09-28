import { useTheme } from "next-themes";

export default function Footer({ page }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const content = {
    landing: {
      title: "PT. Golden Metalindo Fabrikasi",
      subtitle:
        "Quality technical training with advanced technology adaptation.",
    },
    product: {
      title: "Trades & Programs",
      subtitle: "Explore our certified training programs.",
    },
    pricing: {
      title: "Programs",
      subtitle: "Training paths for every skill level.",
    },
    service: {
      title: "Services",
      subtitle: "Professional technical certification.",
    },
  };

  const c = content[page] || content.landing;

  return (
    <footer className="py-16 px-8 md:px-16 border-t border-primary-black/10 dark:border-primary-white/10">
      <div className="md:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <img
            src={isDark ? "/gmf dark.svg" : "/gmf light.svg"}
            alt="GMF logo"
            className="h-12 mb-3 w-auto"
          />
          <h4 className="font-bold text-lg mb-2 text-primary-black dark:text-primary-white">
            {c.title}
          </h4>
          <p className="text-sm text-primary-black/50 dark:text-primary-white/50">
            {c.subtitle}
          </p>
        </div>
        <div className="flex gap-8 text-sm text-primary-black/60 dark:text-primary-white/60">
          <a
            href="mailto:goldenmetalindofabrikasi@gmail.com"
            className="hover:text-primary-orange transition-smooth"
          >
            Contact
          </a>
          <a
            href="https://wa.me/6282173675033"
            className="hover:text-primary-orange transition-smooth"
          >
            WhatsApp
          </a>
          <a href="#" className="hover:text-primary-orange transition-smooth">
            Programs
          </a>
        </div>
      </div>
      <p className="text-xs text-primary-black/30 dark:text-primary-white/30 mt-12 md:max-w-7xl mx-auto">
        © 2026 PT Golden Metalindo Fabrikasi. All rights reserved.
      </p>
    </footer>
  );
}
