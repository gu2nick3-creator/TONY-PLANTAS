import { Star } from "lucide-react";

const testimonials = [
  { name: "Marina S.", text: "Plantas lindas e saudáveis! O atendimento pelo WhatsApp foi super rápido e atencioso. Recomendo demais!", rating: 5 },
  { name: "Carlos M.", text: "Comprei uma Monstera e veio perfeita. A TonyPlantas é referência em qualidade no ES!", rating: 5 },
  { name: "Juliana R.", text: "O kit presente foi incrível! Minha mãe amou. Plantas bem cuidadas e embalagem impecável.", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">O que nossos clientes dizem</h2>
          <p className="text-muted-foreground">Confiança e satisfação em cada pedido</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4 italic">"{t.text}"</p>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
