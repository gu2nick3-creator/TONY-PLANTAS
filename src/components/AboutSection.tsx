import { Leaf, MapPin } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mx-auto">
            <Leaf className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Sobre a TonyPlantas</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Somos uma loja especializada em plantas ornamentais de qualidade, com catálogo selecionado, atendimento personalizado via WhatsApp e forte presença no Espírito Santo. Nosso objetivo é levar beleza, frescor e sofisticação para seus ambientes.
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-5 py-2 text-sm font-medium">
            <MapPin className="h-4 w-4" /> Atendimento exclusivo para Espírito Santo — DDD 27
          </div>
        </div>
      </div>
    </section>
  );
}
