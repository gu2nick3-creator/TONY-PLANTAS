import { useEffect, useState } from 'react';
import { getProducts, getCategories } from '@/lib/api';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category, Product } from '@/lib/types';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    Promise.all([getProducts({ featured: true }), getCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData.filter((p) => p.active && p.featured));
        setCategories(categoriesData);
      })
      .catch(console.error);
  }, []);

  const catMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">Plantas em Destaque</h2>
            <p className="text-muted-foreground">As mais procuradas e recomendadas da nossa seleção</p>
          </div>
          <Link to="/catalogo" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-light transition-colors">
            Ver tudo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} categoryName={catMap[p.categoryId]} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card/60 p-10 text-center">
            <p className="text-lg font-medium text-foreground">Nenhum produto em destaque ainda</p>
            <p className="text-sm text-muted-foreground mt-2">Cadastre produtos pelo painel administrativo para exibi-los aqui.</p>
          </div>
        )}
        <div className="mt-8 text-center md:hidden">
          <Link to="/catalogo" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-light transition-colors">
            Ver catálogo completo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
