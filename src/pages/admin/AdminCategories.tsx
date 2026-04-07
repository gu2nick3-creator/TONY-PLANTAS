import { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getCategories, getProducts, updateCategory } from '@/lib/api';
import { Category, Product } from '@/lib/types';
import { Plus, Pencil, Trash2, Tag, X } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [newMode, setNewMode] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    const [categoriesData, productsData] = await Promise.all([getCategories(), getProducts({ admin: true })]);
    setCategories(categoriesData);
    setProducts(productsData);
  };

  useEffect(() => {
    loadData().catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      setError('');
      if (newMode) {
        await createCategory({ name: editing.name });
      } else {
        await updateCategory(editing.id, { name: editing.name });
      }
      await loadData();
      setEditing(null);
      setNewMode(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar categoria.');
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteCategory(id);
      await loadData();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao excluir categoria.');
    }
  };

  const countProducts = (catId: string) => products.filter((p) => p.categoryId === catId).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-serif font-bold text-foreground">Categorias</h1>
        <button onClick={() => { setEditing({ id: '', name: '' }); setNewMode(true); setError(''); }} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <Plus className="h-4 w-4" /> Nova Categoria
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-foreground/40 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-card rounded-xl border border-border p-6 w-full max-w-sm space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-lg text-foreground">{newMode ? 'Nova' : 'Editar'} Categoria</h2>
              <button type="button" onClick={() => { setEditing(null); setNewMode(false); }} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome *</label>
              <input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <button type="submit" className="w-full bg-primary hover:bg-primary-light text-primary-foreground font-medium py-2.5 rounded-lg transition-colors">Salvar</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Tag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{countProducts(cat.id)} produto(s)</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing({ ...cat }); setNewMode(false); setError(''); }} className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => remove(cat.id)} className="p-1.5 rounded hover:bg-muted transition-colors text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
