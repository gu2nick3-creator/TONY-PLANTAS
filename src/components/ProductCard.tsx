import { Product } from '@/lib/types';
import { getWhatsAppLink } from '@/lib/api';
import { MessageCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
  categoryName?: string;
}

export default function ProductCard({ product, categoryName }: Props) {
  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="aspect-[4/3] bg-primary-lighter/30 overflow-hidden relative">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">🌿</span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full">Destaque</span>
        )}
        {!product.available && (
          <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2.5 py-1 rounded-full">Indisponível</span>
        )}
      </div>
      <div className="p-5 space-y-3">
        {categoryName && <span className="text-xs font-medium text-primary">{categoryName}</span>}
        <h3 className="font-serif font-semibold text-foreground text-lg leading-snug">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xl font-bold text-primary">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <div className="flex gap-2 pt-1">
          <a
            href={getWhatsAppLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-primary-foreground text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            <MessageCircle className="h-4 w-4" /> Comprar
          </a>
          <Link
            to={`/produto/${product.id}`}
            className="inline-flex items-center justify-center gap-1 bg-secondary hover:bg-muted text-secondary-foreground text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
