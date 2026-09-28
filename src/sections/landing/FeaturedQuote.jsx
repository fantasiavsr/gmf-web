import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function FeaturedQuote() {
  const [quotesRef, quotesVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      ref={quotesRef}
      className={`py-20 px-8 md:px-16 md:max-w-5xl mx-auto border-t border-primary-black/10 dark:border-primary-white/10 ${quotesVisible ? "animate-fade-in-up" : "opacity-0"}`}
    >
      <blockquote className="text-3xl md:text-5xl font-medium leading-snug tracking-tight text-primary-black dark:text-primary-white">
        "To provide quality technical training with the adaptation of advanced technology."
      </blockquote>
      <cite className="block mt-8 text-sm text-primary-black/50 dark:text-primary-white/50 not-italic">
        — GMF Training Center Vision
      </cite>
    </section>
  );
}
