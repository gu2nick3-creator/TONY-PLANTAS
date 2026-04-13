import { Link } from "react-router-dom";
import { Leaf, Instagram, Facebook, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary-light" />
              <span className="font-serif text-lg font-bold">Tony<span className="text-primary-light">Plantas</span></span>
            </div>
            <p className="text-sm text-primary-foreground/70">Plantas selecionadas com qualidade, beleza e sofisticação para transformar seus ambientes.</p>
            <div className="flex items-center gap-1 text-xs text-primary-light">
              <MapPin className="h-3.5 w-3.5" />
              <span>Atendimento exclusivo: Espírito Santo (DDD 27)</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold">Navegação</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-primary-foreground/70 hover:text-primary-light transition-colors">Início</Link>
              <Link to="/catalogo" className="text-sm text-primary-foreground/70 hover:text-primary-light transition-colors">Catálogo</Link>
              <Link to="/sobre" className="text-sm text-primary-foreground/70 hover:text-primary-light transition-colors">Sobre</Link>
              <Link to="/contato" className="text-sm text-primary-foreground/70 hover:text-primary-light transition-colors">Contato</Link>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold">Contato</h4>
            <a href="https://wa.me/5527997353388" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-light transition-colors">
              <MessageCircle className="h-4 w-4" /> WhatsApp: (27) 99735-3388
            </a>
            <a href="https://instagram.com/tonyrosa7358" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-light transition-colors">
              <Instagram className="h-4 w-4" /> @Tony Rosa
            </a>
            <a href="https://www.facebook.com/share/1MYMsY7Yaj/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-light transition-colors">
              <Facebook className="h-4 w-4" /> Tony Rosa
            </a>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold">Redes Sociais</h4>
            <div className="flex gap-3">
              <a href="https://instagram.com/tonyrosa7358" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-light/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/share/1MYMsY7Yaj/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-light/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/50">© 2024 TonyPlantas. Todos os direitos reservados.</p>
          <p className="text-xs text-primary-light font-medium flex items-center gap-1">
            <MapPin className="h-3 w-3" /> Vendas exclusivas para Espírito Santo — DDD 27
          </p>
        </div>
      </div>
    </footer>
  );
}
