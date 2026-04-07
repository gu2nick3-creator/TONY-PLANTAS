import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Leaf, MapPin, MessageCircle, Instagram, Facebook } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary-lighter/50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Sobre a TonyPlantas</h1>
          </div>
        </section>
        <section className="container mx-auto px-4 py-16 max-w-3xl space-y-8">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed text-center text-lg">
            A TonyPlantas nasceu do amor pelas plantas e da vontade de levar mais verde, beleza e vida para os lares capixabas. Somos especializados em plantas ornamentais, folhagens decorativas, suculentas, cactos e opções especiais para presentear.
          </p>
          <p className="text-muted-foreground leading-relaxed text-center">
            Com um catálogo cuidadosamente selecionado e atendimento personalizado via WhatsApp, oferecemos uma experiência de compra simples, rápida e confiável. Cada planta é escolhida com carinho para garantir qualidade e satisfação.
          </p>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-5 py-2 text-sm font-medium">
              <MapPin className="h-4 w-4" /> Atendimento exclusivo: Espírito Santo — DDD 27
            </div>
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <a href="https://wa.me/5527997353388" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-primary-foreground font-medium px-6 py-3 rounded-lg transition-colors">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href="https://instagram.com/tonyrosa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-secondary hover:bg-muted text-secondary-foreground font-medium px-6 py-3 rounded-lg transition-colors">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a href="https://facebook.com/tonyrosa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-secondary hover:bg-muted text-secondary-foreground font-medium px-6 py-3 rounded-lg transition-colors">
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
