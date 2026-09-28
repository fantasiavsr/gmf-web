import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function Gallery2() {
  const [gallery2Ref, gallery2Visible] = useScrollAnimation({ threshold: 0.2 });

  const galleryItems = [
    {
      id: 1,
      src: "/gallery2/gallery1.jpg",
      alt: "GMF Training Facility",
      title: "State-of-the-art Facilities",
      desc: "Modern training center equipped with advanced welding equipment",
    },
    {
      id: 2,
      src: "/gallery2/gallery2.jpg",
      alt: "Welding Training",
      title: "Expert Instruction",
      desc: "Professional trainers teaching practical welding techniques",
    },
    {
      id: 3,
      src: "/gallery2/gallery3.jpg",
      alt: "Students Training",
      title: "Hands-on Learning",
      desc: "Students gaining real-world experience in technical skills",
    },
    {
      id: 4,
      src: "/gallery2/gallery4.jpg",
      alt: "Equipment",
      title: "Advanced Equipment",
      desc: "Industry-standard machinery for comprehensive training",
    },
  ];

  return (
    <section
      ref={gallery2Ref}
      className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto"
    >
      <div className="mb-16">
        <h2
          className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-4 transition-all duration-700 ${gallery2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Training Experience
        </h2>
        <h3
          className={`text-4xl md:text-6xl font-bold tracking-tight text-primary-black dark:text-primary-white transition-all duration-700 ${gallery2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{ transitionDelay: gallery2Visible ? "100ms" : "0ms" }}
        >
          Our Programs in Action
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {galleryItems.map((item, idx) => (
          <a
            key={item.id}
            href="#"
            className={`group relative overflow-hidden rounded-2xl border border-primary-black/10 dark:border-primary-white/10 hover:border-primary-orange transition-all duration-700 aspect-video`}
            style={{
              opacity: gallery2Visible ? 1 : 0,
              transform: gallery2Visible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: gallery2Visible ? `${200 + idx * 100}ms` : "0ms",
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-black/80 via-primary-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h4 className="text-primary-white font-bold text-lg mb-2">
                {item.title}
              </h4>
              <p className="text-primary-white/80 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
