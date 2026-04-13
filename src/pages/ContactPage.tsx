import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MessageCircle, MapPin, Instagram, Facebook, Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary-lighter/50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Contato</h1>
            <p className="text-muted-foreground mt-2">Fale conosco e tire suas dúvidas</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 max-w-2xl space-y-8">
          <div className="space-y-4">
            <a href="https://wa.me/5527997353388" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">WhatsApp</p>
                <p className="text-sm text-muted-foreground">(27) 99735-3388</p>
              </div>
            </a>
            <a href="https://instagram.com/tonyrosa7358" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Instagram className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Instagram</p>
                <p className="text-sm text-muted-foreground">@TonyRosa7358</p>
              </div>
            </a>
            <a href="https://facebook.com/tonyrosa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:border-primary/30 transition-colors group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Facebook className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Facebook</p>
                <p className="text-sm text-muted-foreground">Tony Plantas</p>
              </div>
            </a>
          </div>

          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-5 py-2 text-sm font-medium">
              <MapPin className="h-4 w-4" /> Atendimento exclusivo: Espírito Santo — DDD 27
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
