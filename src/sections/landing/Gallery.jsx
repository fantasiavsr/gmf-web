import { useScrollAnimation } from "../../hooks/useScrollAnimation";

export default function Gallery() {
  const [galleryRef, galleryVisible] = useScrollAnimation({ threshold: 0.2 });

  const gallery = [
    { id: 1, src: "/gallery/gallery1.jpg", alt: "GMF Training Facility" },
    { id: 2, src: "/gallery/gallery2.jpg", alt: "Welding Training" },
    { id: 3, src: "/gallery/gallery3.jpg", alt: "Students Training" },
    { id: 4, src: "/gallery/gallery4.jpg", alt: "Equipment" },
    { id: 5, src: "/gallery/gallery5.jpg", alt: "Classroom" },
  ];

  return (
    <section
      ref={galleryRef}
      className="py-24 px-8 md:px-16 md:max-w-7xl mx-auto"
    >
      {/* <h2
        className={`text-xs uppercase tracking-[0.2em] text-primary-black/50 dark:text-primary-white/50 mb-12 transition-all duration-700 ${galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        Training Center
      </h2> */}

      {/* <h3
        className={`text-4xl md:text-6xl font-bold tracking-tight mb-16 text-primary-black dark:text-primary-white transition-all duration-700 ${galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{ transitionDelay: galleryVisible ? "100ms" : "0ms" }}
      >
        Gallery
      </h3> */}

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {gallery.map((item, idx) => (
          <a
            key={item.id}
            href="#"
            className={`group relative overflow-hidden rounded-2xl border border-primary-black/10 dark:border-primary-white/10 hover:border-primary-orange transition-all duration-700 aspect-square`}
            style={{
              opacity: galleryVisible ? 1 : 0,
              transform: galleryVisible ? "translateY(0)" : "translateY(24px)",
              transitionDelay: galleryVisible ? `${200 + idx * 80}ms` : "0ms",
            }}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-primary-black/0 group-hover:bg-primary-black/30 transition-all duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <span className="text-primary-white text-sm font-medium text-center px-4">
                {item.alt}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
