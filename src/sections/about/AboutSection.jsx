import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function AboutSection({
  children,
  className = "",
  threshold = 0.2,
  id,
}) {
  const [sectionRef, sectionVisible] = useScrollAnimation({ threshold });

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${className} transition-all duration-700 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {children}
    </section>
  );
}
