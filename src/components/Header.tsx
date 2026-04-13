import { Link, useLocation } from "react-router-dom";
import { Instagram, Facebook, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Início", to: "/" },
  { label: "Catálogo", to: "/catalogo" },
  { label: "Sobre", to: "/sobre" },
  { label: "Contato", to: "/contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <Leaf className="h-7 w-7 text-primary transition-transform group-hover:rotate-12" />
          <span className="font-serif text-xl font-bold text-foreground tracking-tight">
            Tony<span className="text-primary">Plantas</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === l.to ? "text-primary" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="https://instagram.com/tonyrosa7358" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="https://www.facebook.com/share/1MYMsY7Yaj/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
            <Facebook className="h-5 w-5" />
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card border-t border-border fade-in">
          <nav className="flex flex-col p-4 gap-3">
            {navLinks.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className={`text-sm font-medium py-2 px-3 rounded-md transition-colors hover:bg-primary-lighter ${location.pathname === l.to ? "text-primary bg-primary-lighter" : "text-muted-foreground"}`}>
                {l.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-2 px-3">
              <a href="https://instagram.com/tonyrosa7358" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></a>
              <a href="https://www.facebook.com/share/1MYMsY7Yaj/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
