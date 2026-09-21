import type { DesignDocument, PaginationMeta, PriceBreakdown } from '@cpd/shared';
import { api } from './apiClient';
import type {
  Cart,
  Category,
  DesignSummary,
  DesignTemplate,
  Order,
  Product,
  UploadedAsset,
} from '../types/catalog';

// ---------- catalog ----------
export async function fetchCategories(): Promise<Category[]> {
  const res = await api.get('/categories');
  return res.data.data;
}

export interface ProductListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc' | 'name';
  featured?: boolean;
}

export async function fetchProducts(
  params: ProductListParams = {},
): Promise<{ items: Product[]; meta: PaginationMeta }> {
  const res = await api.get('/products', { params });
  return { items: res.data.data, meta: res.data.meta };
}

export async function fetchProduct(slug: string): Promise<Product> {
  const res = await api.get(`/products/${slug}`);
  return res.data.data;
}

// ---------- pricing ----------
export async function fetchQuote(input: {
  productId: number;
  variantId?: number | null;
  quantity?: number;
  designJson?: DesignDocument | null;
}): Promise<PriceBreakdown> {
  const res = await api.post('/pricing/quote', input);
  return res.data.data;
}

// ---------- designs ----------
export interface DesignDetail extends DesignSummary {
  designJson: DesignDocument;
  versions?: { id: number; version: number; previewImage: string | null; createdAt: string }[];
}

export async function fetchDesigns(page = 1, pageSize = 24): Promise<DesignSummary[]> {
  const res = await api.get('/designs', { params: { page, pageSize } });
  return res.data.data;
}

export async function fetchDesign(id: number): Promise<DesignDetail> {
  const res = await api.get(`/designs/${id}`);
  return res.data.data;
}

export async function createDesign(input: {
  name: string;
  productId: number;
  variantId?: number | null;
  designJson: DesignDocument;
  previewImage?: string;
}): Promise<DesignDetail> {
  const res = await api.post('/designs', input);
  return res.data.data;
}

export async function updateDesign(
  id: number,
  input: {
    name?: string;
    variantId?: number | null;
    designJson?: DesignDocument;
    previewImage?: string;
    createVersion?: boolean;
  },
): Promise<DesignDetail> {
  const res = await api.put(`/designs/${id}`, input);
  return res.data.data;
}

export async function deleteDesign(id: number): Promise<void> {
  await api.delete(`/designs/${id}`);
}

export async function duplicateDesign(id: number): Promise<DesignDetail> {
  const res = await api.post(`/designs/${id}/duplicate`);
  return res.data.data;
}

// ---------- uploads ----------
export async function uploadAsset(file: File): Promise<UploadedAsset> {
  const form = new FormData();
  form.append('file', file);
  const res = await api.post('/uploads', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.data;
}

export async function fetchAssets(): Promise<UploadedAsset[]> {
  const res = await api.get('/uploads/assets');
  return res.data.data;
}

export async function deleteAsset(id: number): Promise<void> {
  await api.delete(`/uploads/assets/${id}`);
}

// ---------- templates ----------
export async function fetchTemplates(category?: string): Promise<DesignTemplate[]> {
  const res = await api.get('/templates', { params: category ? { category } : {} });
  return res.data.data;
}

export async function fetchTemplateCategories(): Promise<{ category: string; count: number }[]> {
  const res = await api.get('/templates/categories');
  return res.data.data;
}

// ---------- cart ----------
export async function fetchCart(): Promise<Cart> {
  const res = await api.get('/cart');
  return res.data.data;
}

export async function addCartItem(input: {
  productId: number;
  variantId?: number | null;
  designId?: number | null;
  quantity: number;
}): Promise<Cart> {
  const res = await api.post('/cart/items', input);
  return res.data.data;
}

export async function updateCartItem(id: number, quantity: number): Promise<Cart> {
  const res = await api.put(`/cart/items/${id}`, { quantity });
  return res.data.data;
}

export async function removeCartItem(id: number): Promise<Cart> {
  const res = await api.delete(`/cart/items/${id}`);
  return res.data.data;
}

// ---------- orders ----------
export interface ShippingAddressInput {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export async function createOrder(shippingAddress: ShippingAddressInput): Promise<Order> {
  const res = await api.post('/orders', { shippingAddress });
  return res.data.data;
}

export async function fetchOrders(): Promise<Order[]> {
  const res = await api.get('/orders');
  return res.data.data;
}

export async function fetchOrder(id: number): Promise<Order> {
  const res = await api.get(`/orders/${id}`);
  return res.data.data;
}

/** Trigger a browser download of a production PNG export. */
export async function downloadDesignExport(designId: number, areaKey: string, dpi = 300) {
  const res = await api.get(`/export/designs/${designId}`, {
    params: { areaKey, dpi },
    responseType: 'blob',
  });
  const url = URL.createObjectURL(res.data);
  const a = document.createElement('a');
  a.href = url;
  a.download = `design-${designId}-${areaKey}-${dpi}dpi.png`;
  a.click();
  URL.revokeObjectURL(url);
}
