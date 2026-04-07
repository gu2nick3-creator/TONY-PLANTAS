import { useEffect, useState } from 'react';
import { getAdminStats } from '@/lib/api';
import { Package, Tag, Star, CheckCircle, XCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalProducts: 0, totalCategories: 0, active: 0, inactive: 0, featured: 0, available: 0, unavailable: 0 });

  useEffect(() => {
    getAdminStats().then(setStats).catch(console.error);
  }, []);

  const cards = [
    { label: 'Total de Produtos', value: stats.totalProducts, icon: Package, color: 'text-primary' },
    { label: 'Categorias', value: stats.totalCategories, icon: Tag, color: 'text-accent' },
    { label: 'Em Destaque', value: stats.featured, icon: Star, color: 'text-primary-light' },
    { label: 'Ativos', value: stats.active, icon: CheckCircle, color: 'text-primary' },
    { label: 'Inativos', value: stats.inactive, icon: XCircle, color: 'text-destructive' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif font-bold text-foreground">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{c.label}</span>
              <c.icon className={`h-5 w-5 ${c.color}`} />
            </div>
            <p className="text-3xl font-bold text-foreground">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Produtos disponíveis</p>
          <p className="text-3xl font-bold text-foreground">{stats.available}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Produtos indisponíveis</p>
          <p className="text-3xl font-bold text-foreground">{stats.unavailable}</p>
        </div>
      </div>
    </div>
  );
}
