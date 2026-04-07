import { Leaf, MessageCircle, Package, Heart, MapPin, Instagram, Star, Truck } from "lucide-react";

const items = [
  { icon: Star, title: "Plantas Selecionadas", desc: "Qualidade premium em cada planta do nosso catálogo" },
  { icon: MessageCircle, title: "Atendimento Rápido", desc: "Compra simples e personalizada via WhatsApp" },
  { icon: Package, title: "Catálogo Organizado", desc: "Encontre a planta perfeita com facilidade" },
  { icon: Heart, title: "Opções para Presente", desc: "Kits especiais para surpreender quem você ama" },
  { icon: Leaf, title: "Visual Decorativo", desc: "Plantas que elevam a beleza do seu espaço" },
  { icon: MapPin, title: "Espírito Santo", desc: "Atendimento exclusivo para clientes DDD 27" },
];

export default function Differentials() {
  return (
    <section className="py-20 bg-primary-lighter/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Por que escolher a TonyPlantas?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Qualidade, cuidado e um atendimento que faz toda a diferença</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="group bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border hover:border-primary/30" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
