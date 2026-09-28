import { ArrowUpRight } from "lucide-react";
import AboutSection from "./AboutSection";

export default function AboutCta() {
  return (
    <AboutSection className="px-8 md:px-16 pb-24 md:max-w-7xl mx-auto">
      <div className="rounded-2xl bg-primary-orange p-8 md:p-16 text-primary-white flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary-white/70 mb-5">
            Get in touch
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight max-w-2xl">
            Ready to start your training?
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href="mailto:goldenmetalindofabrikasi@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-medium bg-primary-white text-primary-black px-6 py-3 rounded-full hover:bg-primary-black hover:text-primary-white transition-colors"
          >
            Email us <ArrowUpRight size={16} />
          </a>
          <a
            href="https://wa.me/6282173675033"
            className="inline-flex items-center gap-2 text-sm font-medium bg-primary-white text-primary-black px-6 py-3 rounded-full hover:bg-primary-black hover:text-primary-white transition-colors"
          >
            WhatsApp <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </AboutSection>
  );
}
