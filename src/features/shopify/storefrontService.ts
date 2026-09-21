import type { DesignDocument, ShopifySettings, StorefrontCustomization } from '@cpd/shared';
import { api } from '../../services/apiClient';
import type { Product, UploadedAsset } from '../../types/catalog';

/** Anonymous storefront endpoints used by /shopify/customize. */

export interface StorefrontContextResponse {
  shop: { domain: string; name: string | null; primaryDomain: string | null };
  settings: ShopifySettings;
  shopifyProductId: string;
  shopifyVariantId: string | null;
  shopifyProductTitle: string;
  /** Customizer variant mapped from the Shopify variant, if any. */
  variantId: number | null;
  product: Product;
}

export async function fetchStorefrontContext(params: {
  shop: string;
  product: string;
  variant?: string | null;
}): Promise<StorefrontContextResponse> {
  const res = await api.get('/shopify/storefront/context', {
    params: { shop: params.shop, product: params.product, variant: params.variant || undefined },
  });
  return res.data.data;
}

export async function fetchCustomization(shop: string, token: string): Promise<StorefrontCustomization> {
  const res = await api.get(`/shopify/storefront/customizations/${encodeURIComponent(token)}`, {
    params: { shop },
  });
  return res.data.data;
}

export async function createCustomization(input: {
  shop: string;
  shopifyProductId: string;
  shopifyVariantId?: string | null;
  variantId?: number | null;
  designJson: DesignDocument;
  previewImage?: string;
}): Promise<{ customization: StorefrontCustomization; editKey: string }> {
  const res = await api.post('/shopify/storefront/customizations', input);
  return res.data.data;
}

export async function updateCustomization(
  token: string,
  input: {
    shop: string;
    editKey: string;
    shopifyVariantId?: string | null;
    variantId?: number | null;
    designJson?: DesignDocument;
    previewImage?: string;
  },
): Promise<StorefrontCustomization> {
  const res = await api.put(`/shopify/storefront/customizations/${encodeURIComponent(token)}`, input);
  return res.data.data;
}

export async function uploadStorefrontAsset(shop: string, file: File): Promise<UploadedAsset> {
  const form = new FormData();
  form.append('file', file);
  const res = await api.post('/shopify/storefront/uploads', form, {
    params: { shop },
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  // No library record exists for guest uploads; a negative id keeps React
  // keys unique and tells the panel there is nothing to delete server-side.
  return { ...res.data.data, id: -Date.now() };
}
