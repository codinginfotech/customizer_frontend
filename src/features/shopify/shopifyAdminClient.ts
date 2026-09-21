import axios from 'axios';
import type { ShopifySettings } from '@cpd/shared';
import { getSessionToken } from './appBridge';

/**
 * Separate axios instance for the embedded admin: every request carries a
 * fresh App Bridge session token instead of the customizer's own JWT, and
 * there is no refresh-cookie dance.
 */
export const shopifyAdminApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || '/api'}/shopify/admin`,
});

shopifyAdminApi.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${await getSessionToken()}`;
  return config;
});

// ---------- types ----------
export interface ShopInfo {
  id: number;
  shopDomain: string;
  name: string | null;
  email: string | null;
  currency: string | null;
  primaryDomain: string | null;
  installedAt: string;
  uninstalledAt: string | null;
  settings: ShopifySettings;
  stats: { orders: number; customizations: number; mappings: number };
}

export interface CustomizerProductOption {
  id: number;
  name: string;
  slug: string;
  category: string;
  imageUrl: string | null;
  printAreas: number;
  variants: number;
  has3d: boolean;
}

export interface ProductMapping {
  id: number;
  shopifyProductId: string;
  shopifyProductTitle: string;
  shopifyHandle: string | null;
  productId: number;
  variantMap: Record<string, number> | null;
  enabled: boolean;
  updatedAt: string;
  product: { id: number; name: string; slug: string };
}

export interface ShopifyProductRow {
  id: string;
  title: string;
  handle: string;
  status: string;
  imageUrl: string | null;
  variants: { id: string; title: string; options: { name: string; value: string }[] }[];
  mapping: ProductMapping | null;
}

export interface ShopifyOrderItemRow {
  id: number;
  lineItemId: string;
  customizationId: number | null;
  productId: number | null;
  title: string;
  variantTitle: string | null;
  sku: string | null;
  quantity: number;
  price: number | null;
  designSnapshot: unknown | null;
  previewImage: string | null;
  product: { id: number; name: string; slug: string; printAreas: { key: string; name: string }[] } | null;
}

export interface ShopifyOrderRow {
  id: number;
  shopifyOrderId: string;
  orderName: string;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  currency: string | null;
  totalPrice: number | null;
  customerEmail: string | null;
  cancelledAt: string | null;
  shopifyCreatedAt: string | null;
  createdAt: string;
  items: ShopifyOrderItemRow[];
}

// ---------- calls ----------
export async function fetchShop(): Promise<ShopInfo> {
  return (await shopifyAdminApi.get('/shop')).data.data;
}

export async function saveSettings(patch: Partial<ShopifySettings>): Promise<ShopifySettings> {
  return (await shopifyAdminApi.put('/settings', patch)).data.data;
}

export async function fetchCustomizerProducts(): Promise<CustomizerProductOption[]> {
  return (await shopifyAdminApi.get('/customizer-products')).data.data;
}

export async function fetchShopifyProducts(params: { after?: string; query?: string }): Promise<{
  items: ShopifyProductRow[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
}> {
  return (await shopifyAdminApi.get('/products', { params })).data.data;
}

export async function linkProduct(
  shopifyProductId: string,
  input: { productId: number; variantMap?: Record<string, number>; enabled?: boolean },
): Promise<ProductMapping> {
  return (await shopifyAdminApi.put(`/products/${shopifyProductId}/mapping`, input)).data.data;
}

export async function toggleMapping(shopifyProductId: string, enabled: boolean): Promise<ProductMapping> {
  return (await shopifyAdminApi.patch(`/products/${shopifyProductId}/mapping`, { enabled })).data.data;
}

export async function unlinkProduct(shopifyProductId: string): Promise<void> {
  await shopifyAdminApi.delete(`/products/${shopifyProductId}/mapping`);
}

export async function fetchShopifyOrders(page = 1, pageSize = 20): Promise<{
  items: ShopifyOrderRow[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}> {
  const res = await shopifyAdminApi.get('/orders', { params: { page, pageSize } });
  return { items: res.data.data, meta: res.data.meta };
}

/** Fetches the PNG with the session token and triggers a browser download. */
export async function downloadProductionFile(orderId: number, itemId: number, areaKey: string, dpi: number) {
  const res = await shopifyAdminApi.get(`/orders/${orderId}/items/${itemId}/production`, {
    params: { areaKey: areaKey || undefined, dpi },
    responseType: 'blob',
  });
  const disposition = String(res.headers['content-disposition'] || '');
  const name = /filename="([^"]+)"/.exec(disposition)?.[1] || `order-${orderId}-item-${itemId}.png`;
  const url = URL.createObjectURL(res.data as Blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
