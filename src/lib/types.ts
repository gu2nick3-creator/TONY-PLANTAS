export interface Category {
  id: string;
  name: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
  care: string;
  active: boolean;
  featured: boolean;
  available: boolean;
  categoryName?: string;
  createdAt?: string;
  updatedAt?: string;
}
