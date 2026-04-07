import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getProducts, getCategories } from '@/lib/api';
import { Search, MapPin } from 'lucide-react';
import { Category, Product } from '@/lib/types';

export default function CatalogPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData.filter((p) => p.active));
        setCategories(categoriesData);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Erro ao carregar catálogo.'))
      .finally(() => setLoading(false));
  }, []);

  const catMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = !catFilter || p.categoryId === catFilter;
      return matchSearch && matchCat;
    });
  }, [products, search, catFilter]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary-lighter/50 py-12">
          <div className="container mx-auto px-4 text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">Catálogo de Plantas</h1>
            <p className="text-muted-foreground">Encontre a planta perfeita para seu espaço</p>
            <div className="inline-flex items-center gap-2 text-xs text-primary font-medium"><MapPin className="h-3.5 w-3.5" /> Vendas exclusivas para Espírito Santo — DDD 27</div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar plantas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <select
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Todas as categorias</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="text-center py-16 text-muted-foreground">Carregando catálogo...</div>
          ) : error ? (
            <div className="text-center py-16 text-destructive">{error}</div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} categoryName={catMap[p.categoryId]} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">Nenhuma planta encontrada</p>
              <p className="text-sm mt-1">Cadastre produtos no painel ou ajuste sua busca e filtro.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
