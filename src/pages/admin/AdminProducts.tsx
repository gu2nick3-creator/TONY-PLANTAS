import { useEffect, useMemo, useState } from 'react';
import { createProduct, deleteProduct, getCategories, getProducts, updateProduct, uploadProductImage } from '@/lib/api';
import { Product, Category } from '@/lib/types';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff, Search, X, Upload } from 'lucide-react';

const empty: Product = { id: '', name: '', description: '', price: 0, categoryId: '', image: '', care: '', active: true, featured: false, available: true };

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    const [productsData, categoriesData] = await Promise.all([getProducts({ admin: true }), getCategories()]);
    setProducts(productsData);
    setCategories(categoriesData);
  };

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  const catMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
    [products, search],
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      setSaving(true);
      setError('');
      const payload = {
        name: editing.name,
        description: editing.description,
        price: editing.price,
        categoryId: editing.categoryId,
        image: editing.image,
        care: editing.care,
        active: editing.active,
        featured: editing.featured,
        available: editing.available,
      };

      if (editing.id) {
        await updateProduct(editing.id, payload);
      } else {
        await createProduct(payload);
      }
      await loadData();
      setEditing(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar produto.');
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (product: Product, field: 'active' | 'featured' | 'available') => {
    await updateProduct(product.id, { ...product, [field]: !product[field] });
    await loadData();
  };

  const remove = async (id: string) => {
    if (!confirm('Excluir este produto?')) return;
    await deleteProduct(id);
    await loadData();
  };

  const handleImageUpload = async (file?: File | null) => {
    if (!file || !editing) return;
    try {
      setUploading(true);
      const result = await uploadProductImage(file);
      setEditing({ ...editing, image: result.imageUrl });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar imagem.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-serif font-bold text-foreground">Produtos</h1>
        <button onClick={() => { setEditing({ ...empty }); setError(''); }} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus className="h-4 w-4" /> Novo Produto
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input type="text" placeholder="Buscar produtos..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-foreground/40 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-card rounded-xl border border-border p-6 w-full max-w-lg max-h-[90vh] overflow-auto space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-lg text-foreground">{editing.id ? 'Editar' : 'Novo'} Produto</h2>
              <button type="button" onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome *</label>
              <input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Descrição</label>
              <textarea rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Preço (R$)</label>
                <input type="number" step="0.01" min="0" value={editing.price} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Categoria</label>
                <select value={editing.categoryId} onChange={(e) => setEditing({ ...editing, categoryId: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="">Selecione</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Imagem do produto</label>
              <div className="flex flex-col gap-3">
                <input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="/uploads/imagem.jpg ou https://..." />
                <label className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer text-primary">
                  <Upload className="h-4 w-4" /> {uploading ? 'Enviando imagem...' : 'Enviar imagem do computador'}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e.target.files?.[0])} />
                </label>
              </div>
              {editing.image && <img src={editing.image} alt="Preview" className="h-24 w-24 rounded-lg object-cover border border-border" />}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Cuidados</label>
              <input value={editing.care} onChange={(e) => setEditing({ ...editing, care: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="flex gap-6 flex-wrap">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} className="accent-primary" /> Ativo
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="accent-primary" /> Destaque
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" checked={editing.available} onChange={(e) => setEditing({ ...editing, available: e.target.checked })} className="accent-primary" /> Disponível
              </label>
            </div>
            <button type="submit" disabled={saving || uploading} className="w-full bg-primary hover:bg-primary-light text-primary-foreground font-medium py-2.5 rounded-lg transition-colors disabled:opacity-70">{saving ? 'Salvando...' : 'Salvar'}</button>
          </form>
        </div>
      )}

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Produto</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Categoria</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Preço</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-right py-3 px-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary-lighter/30 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {p.image ? <img src={p.image} alt="" className="w-full h-full object-cover" /> : <span>🌿</span>}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{p.name}</p>
                        {p.featured && <span className="text-xs text-accent font-medium">★ Destaque</span>}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">{catMap[p.categoryId] || '—'}</td>
                  <td className="py-3 px-4 font-medium text-foreground">R$ {p.price.toFixed(2).replace('.', ',')}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block h-2 w-2 rounded-full ${p.active ? 'bg-primary' : 'bg-destructive'}`} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => toggle(p, 'active')} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title={p.active ? 'Desativar' : 'Ativar'}>
                        {p.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button onClick={() => toggle(p, 'featured')} className={`p-1.5 rounded hover:bg-muted transition-colors ${p.featured ? 'text-accent' : 'text-muted-foreground'}`} title="Destaque">
                        <Star className="h-4 w-4" />
                      </button>
                      <button onClick={() => setEditing({ ...p })} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" title="Editar">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => remove(p.id)} className="p-1.5 rounded hover:bg-muted transition-colors text-destructive" title="Excluir">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
