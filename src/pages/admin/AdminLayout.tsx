import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { isAuthenticated, logoutAdmin } from '@/lib/api';
import { Leaf, LayoutDashboard, Package, Tag, LogOut, ArrowLeft } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Produtos', to: '/admin/produtos', icon: Package },
  { label: 'Categorias', to: '/admin/categorias', icon: Tag },
];

export default function AdminLayout() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logoutAdmin();
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="font-serif text-lg font-bold text-foreground">Tony<span className="text-primary">Admin</span></span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.to ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="h-4 w-4" /> {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-2">
            <ArrowLeft className="h-4 w-4" /> Ver Site
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 transition-colors px-3 py-2 w-full">
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <div className="md:hidden flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="font-serif font-bold text-foreground text-sm">TonyAdmin</span>
            </div>
          </div>
          <div className="flex items-center gap-3 md:hidden">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className={`p-2 rounded-lg transition-colors ${location.pathname === item.to ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}>
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
            <button onClick={handleLogout} className="p-2 text-destructive">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
