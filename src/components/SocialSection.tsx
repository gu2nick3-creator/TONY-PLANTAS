import { Instagram, Facebook, ArrowRight } from "lucide-react";

export default function SocialSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 md:p-14 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">Siga a TonyPlantas</h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto">Acompanhe novidades, inspirações, lançamentos e dicas de cuidados com plantas nos nossos perfis sociais.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="https://instagram.com/tonyrosa7358" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground font-medium px-6 py-3 rounded-lg border border-primary-foreground/20 transition-all">
              <Instagram className="h-5 w-5" /> Instagram <ArrowRight className="h-4 w-4" />
            </a>
            <a href="https://www.facebook.com/share/1MYMsY7Yaj/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary-foreground/15 hover:bg-primary-foreground/25 text-primary-foreground font-medium px-6 py-3 rounded-lg border border-primary-foreground/20 transition-all">
              <Facebook className="h-5 w-5" /> Facebook <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
