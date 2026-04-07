import { useState } from 'react';
import { loginAdmin } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { Leaf, LogIn } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@admin.com');
  const [pass, setPass] = useState('admin123@');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      await loginAdmin(email, pass);
      navigate('/admin');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Credenciais inválidas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-lighter/30 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mx-auto mb-4">
            <Leaf className="h-7 w-7 text-primary" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">TonyPlantas</h1>
          <p className="text-sm text-muted-foreground mt-1">Painel Administrativo</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 shadow-sm space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="admin@admin.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Senha</label>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="••••••" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="rounded-lg bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
            Primeiro acesso padrão: <strong>admin@admin.com</strong> / <strong>admin123@</strong>
          </div>
          <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-primary-foreground font-medium py-2.5 rounded-lg transition-colors disabled:opacity-70">
            <LogIn className="h-4 w-4" /> {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
