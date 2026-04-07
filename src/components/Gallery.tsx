import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";

const images = [
  { src: g1, alt: "Suculentas e miniplantas" },
  { src: g2, alt: "Plantas em ambientes decorados" },
  { src: g3, alt: "Planta para presentear" },
];

export default function Gallery() {
  return (
    <section className="py-20 bg-primary-lighter/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Inspirações</h2>
          <p className="text-muted-foreground">Plantas que decoram, inspiram e transformam ambientes</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div key={i} className="group rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={800} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
