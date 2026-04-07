import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProduct, getCategories, getWhatsAppLink } from '@/lib/api';
import { MessageCircle, ArrowLeft, MapPin, Instagram, Facebook, CheckCircle, XCircle } from 'lucide-react';
import { Category, Product } from '@/lib/types';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([getProduct(id), getCategories()])
      .then(([productData, categoriesData]) => {
        setProduct(productData);
        setCategories(categoriesData);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Carregando...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-xl font-serif text-foreground">Produto não encontrado</p>
            <Link to="/catalogo" className="text-primary hover:text-primary-light text-sm font-medium">Voltar ao catálogo</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <Link to="/catalogo" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Voltar ao catálogo
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-square bg-primary-lighter/30 rounded-xl overflow-hidden">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center"><span className="text-8xl">🌿</span></div>
              )}
            </div>

            <div className="space-y-5">
              {category && <span className="text-sm font-medium text-primary">{category.name}</span>}
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">{product.name}</h1>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="flex items-center gap-2">
                {product.available ? (
                  <span className="inline-flex items-center gap-1 text-sm text-primary font-medium"><CheckCircle className="h-4 w-4" /> Disponível</span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-sm text-destructive font-medium"><XCircle className="h-4 w-4" /> Indisponível</span>
                )}
              </div>

              <p className="text-3xl font-bold text-primary">R$ {product.price.toFixed(2).replace('.', ',')}</p>

              {product.care && (
                <div className="bg-primary-lighter/50 rounded-lg p-4 space-y-1">
                  <p className="text-sm font-semibold text-foreground">Cuidados básicos</p>
                  <p className="text-sm text-muted-foreground">{product.care}</p>
                </div>
              )}

              <a
                href={getWhatsAppLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-primary-foreground font-medium py-3.5 rounded-lg transition-all hover:shadow-lg text-lg"
              >
                <MessageCircle className="h-5 w-5" /> Comprar pelo WhatsApp
              </a>

              <div className="flex items-center gap-4 pt-2">
                <a href="https://instagram.com/tonyrosa" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
                <a href="https://facebook.com/tonyrosa" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Facebook className="h-5 w-5" /></a>
              </div>

              <div className="flex items-center gap-2 text-xs text-primary font-medium bg-primary/5 rounded-lg px-4 py-2.5">
                <MapPin className="h-3.5 w-3.5" /> Atendimento exclusivo para Espírito Santo — DDD 27
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
