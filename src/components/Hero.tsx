import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-plants.jpg";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Plantas ornamentais TonyPlantas" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
      </div>

      <div className="relative container mx-auto px-4 py-24 md:py-36 lg:py-44">
        <div className="max-w-2xl space-y-6 fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm border border-primary-light/30 rounded-full px-4 py-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary-light" />
            <span className="text-xs font-medium text-primary-foreground/90">Atendimento exclusivo: Espírito Santo — DDD 27</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight">
            Plantas que transformam ambientes com{" "}
            <span className="text-primary-light">beleza, frescor e sofisticação</span>
          </h1>

          <p className="text-lg text-primary-foreground/80 max-w-xl leading-relaxed">
            Plantas selecionadas com qualidade premium. Compra fácil e atendimento rápido via WhatsApp para todo o Espírito Santo.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-primary-foreground font-medium px-6 py-3 rounded-lg transition-all hover:shadow-lg"
            >
              Ver Catálogo <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/5527997353388"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/20 text-primary-foreground font-medium px-6 py-3 rounded-lg border border-primary-foreground/20 transition-all"
            >
              <MessageCircle className="h-4 w-4" /> Pedir pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
