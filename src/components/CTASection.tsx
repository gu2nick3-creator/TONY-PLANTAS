import { MessageCircle, Instagram, Facebook } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Pronto para escolher sua planta?</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">Entre em contato pelo WhatsApp e escolha a planta perfeita para seu espaço. Atendimento exclusivo para Espírito Santo — DDD 27.</p>
        <div className="flex justify-center gap-4 flex-wrap pt-2">
          <a href="https://wa.me/5527997353388" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-primary-foreground font-medium px-7 py-3.5 rounded-lg transition-all hover:shadow-lg">
            <MessageCircle className="h-5 w-5" /> Falar pelo WhatsApp
          </a>
          <a href="https://instagram.com/tonyrosa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-secondary hover:bg-muted text-secondary-foreground font-medium px-6 py-3.5 rounded-lg transition-colors">
            <Instagram className="h-5 w-5" /> Instagram
          </a>
          <a href="https://facebook.com/tonyrosa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-secondary hover:bg-muted text-secondary-foreground font-medium px-6 py-3.5 rounded-lg transition-colors">
            <Facebook className="h-5 w-5" /> Facebook
          </a>
        </div>
      </div>
    </section>
  );
}
