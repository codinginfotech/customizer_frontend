import type { PaginationMeta } from '@cpd/shared';
import { api } from './apiClient';
import type { Category, Order, Product } from '../types/catalog';

// ---- stats ----
export interface AdminStats {
  users: number;
  products: number;
  designs: number;
  orders: number;
  revenue: number;
  recentOrders: Array<{
    id: number;
    orderNumber: string;
    status: string;
    total: number;
    createdAt: string;
    user: { name: string; email: string };
  }>;
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await api.get('/admin/stats');
  return res.data.data;
}

// ---- products ----
export async function adminFetchProducts(params: {
  page?: number;
  pageSize?: number;
  search?: string;
}): Promise<{ items: Product[]; meta: PaginationMeta }> {
  const res = await api.get('/products/admin/all', { params });
  return { items: res.data.data, meta: res.data.meta };
}

export async function adminFetchProduct(id: number): Promise<Product> {
  const res = await api.get(`/products/admin/${id}`);
  return res.data.data;
}

export async function adminCreateProduct(input: Record<string, unknown>): Promise<Product> {
  const res = await api.post('/products', input);
  return res.data.data;
}

export async function adminUpdateProduct(id: number, input: Record<string, unknown>): Promise<Product> {
  const res = await api.put(`/products/${id}`, input);
  return res.data.data;
}

export async function adminDeleteProduct(id: number) {
  const res = await api.delete(`/products/${id}`);
  return res.data.data;
}

export const adminVariants = {
  create: (productId: number, input: Record<string, unknown>) =>
    api.post(`/products/${productId}/variants`, input).then((r) => r.data.data),
  update: (productId: number, variantId: number, input: Record<string, unknown>) =>
    api.put(`/products/${productId}/variants/${variantId}`, input).then((r) => r.data.data),
  remove: (productId: number, variantId: number) =>
    api.delete(`/products/${productId}/variants/${variantId}`),
};

export const adminPrintAreas = {
  create: (productId: number, input: Record<string, unknown>) =>
    api.post(`/products/${productId}/print-areas`, input).then((r) => r.data.data),
  update: (productId: number, areaId: number, input: Record<string, unknown>) =>
    api.put(`/products/${productId}/print-areas/${areaId}`, input).then((r) => r.data.data),
  remove: (productId: number, areaId: number) =>
    api.delete(`/products/${productId}/print-areas/${areaId}`),
};

export const adminImages = {
  create: (productId: number, input: Record<string, unknown>) =>
    api.post(`/products/${productId}/images`, input).then((r) => r.data.data),
  remove: (productId: number, imageId: number) =>
    api.delete(`/products/${productId}/images/${imageId}`),
};

export async function adminUpsertModel(productId: number, input: Record<string, unknown>) {
  const res = await api.put(`/products/${productId}/model`, input);
  return res.data.data;
}

export async function adminRemoveModel(productId: number) {
  await api.delete(`/products/${productId}/model`);
}

export async function adminUploadImage(file: File, folder: 'products' | 'templates') {
  const form = new FormData();
  form.append('file', file);
  const res = await api.post(`/uploads/admin/image?folder=${folder}`, form);
  return res.data.data as { url: string };
}

export async function adminUploadModel(file: File) {
  const form = new FormData();
  form.append('file', file);
  const res = await api.post('/uploads/admin/model', form);
  return res.data.data as { url: string; validation: import('@cpd/shared').ModelValidationReport };
}

// ---- categories ----
export async function adminFetchCategories(): Promise<Category[]> {
  const res = await api.get('/categories/all');
  return res.data.data;
}
export const adminCategories = {
  create: (input: Record<string, unknown>) => api.post('/categories', input).then((r) => r.data.data),
  update: (id: number, input: Record<string, unknown>) =>
    api.put(`/categories/${id}`, input).then((r) => r.data.data),
  remove: (id: number) => api.delete(`/categories/${id}`),
  reorder: (order: { id: number; sortOrder: number }[]) => api.put('/categories/reorder', { order }),
};

// ---- templates ----
export async function adminFetchTemplates() {
  const res = await api.get('/templates/all');
  return res.data.data;
}
export const adminTemplates = {
  create: (input: Record<string, unknown>) => api.post('/templates', input).then((r) => r.data.data),
  update: (id: number, input: Record<string, unknown>) =>
    api.put(`/templates/${id}`, input).then((r) => r.data.data),
  remove: (id: number) => api.delete(`/templates/${id}`),
};

// ---- orders ----
export async function adminFetchOrders(params: {
  page?: number;
  status?: string;
}): Promise<{ items: Order[]; meta: PaginationMeta }> {
  const res = await api.get('/orders/admin/all', { params });
  return { items: res.data.data, meta: res.data.meta };
}

export async function adminUpdateOrderStatus(id: number, status: string): Promise<Order> {
  const res = await api.put(`/orders/${id}/status`, { status });
  return res.data.data;
}

// ---- users ----
export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  emailVerified: boolean;
  createdAt: string;
  _count: { designs: number; orders: number };
}

export async function adminFetchUsers(params: {
  page?: number;
  search?: string;
}): Promise<{ items: AdminUser[]; meta: PaginationMeta }> {
  const res = await api.get('/users', { params });
  return { items: res.data.data, meta: res.data.meta };
}

export async function adminUpdateUser(
  id: number,
  input: { role?: 'USER' | 'ADMIN'; status?: 'ACTIVE' | 'INACTIVE' },
): Promise<AdminUser> {
  const res = await api.put(`/users/${id}`, input);
  return res.data.data;
}
