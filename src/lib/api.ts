import { Category, Product } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const TOKEN_KEY = 'tp_admin_token';

async function request<T>(endpoint: string, options: RequestInit = {}, auth = false): Promise<T> {
  const headers = new Headers(options.headers || {});
  const isFormData = options.body instanceof FormData;

  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (auth) {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401 && auth) {
    localStorage.removeItem(TOKEN_KEY);
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || 'Erro na requisição.');
  }

  return payload as T;
}

export function getWhatsAppLink(plantName: string) {
  const msg = encodeURIComponent(`Olá, tenho interesse na planta ${plantName}. Gostaria de mais informações e finalizar meu pedido.`);
  return `https://wa.me/5527997353388?text=${msg}`;
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export async function loginAdmin(email: string, password: string) {
  const data = await request<{ token: string; user: { id: string; email: string; name: string }; expiresAt: string }>(
    '/auth/login',
    { method: 'POST', body: JSON.stringify({ email, password }) },
    false,
  );
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
}

export async function logoutAdmin() {
  try {
    await request('/auth/logout', { method: 'POST' }, true);
  } finally {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export async function getProducts(params?: { admin?: boolean; featured?: boolean; categoryId?: string; search?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.admin) searchParams.set('admin', '1');
  if (params?.featured) searchParams.set('featured', '1');
  if (params?.categoryId) searchParams.set('categoryId', params.categoryId);
  if (params?.search) searchParams.set('search', params.search);
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
  return request<Product[]>(`/products${query}`, {}, params?.admin);
}

export function getProduct(id: string, admin = false) {
  const query = admin ? '?admin=1' : '';
  return request<Product>(`/products/${id}${query}`, {}, admin);
}

export function getCategories() {
  return request<Category[]>('/categories');
}

export function getAdminStats() {
  return request<{ totalProducts: number; totalCategories: number; active: number; inactive: number; featured: number; available: number; unavailable: number }>('/admin/stats', {}, true);
}

export function createProduct(product: Omit<Product, 'id'>) {
  return request<Product>('/products', { method: 'POST', body: JSON.stringify(product) }, true);
}

export function updateProduct(id: string, product: Omit<Product, 'id'>) {
  return request<Product>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(product) }, true);
}

export function deleteProduct(id: string) {
  return request<{ ok: boolean }>(`/products/${id}`, { method: 'DELETE' }, true);
}

export function createCategory(category: Omit<Category, 'id'>) {
  return request<Category>('/categories', { method: 'POST', body: JSON.stringify(category) }, true);
}

export function updateCategory(id: string, category: Omit<Category, 'id'>) {
  return request<Category>(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(category) }, true);
}

export function deleteCategory(id: string) {
  return request<{ ok: boolean }>(`/categories/${id}`, { method: 'DELETE' }, true);
}

export async function uploadProductImage(file: File) {
  const form = new FormData();
  form.append('image', file);
  return request<{ imageUrl: string }>('/upload', { method: 'POST', body: form }, true);
}
