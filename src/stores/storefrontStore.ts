import { create } from 'zustand';
import type { ShopifySettings } from '@cpd/shared';

/**
 * Context for the designer when it runs as the Shopify storefront customizer
 * (/shopify/customize). While `active`, the designer is anonymous: no account
 * gate, uploads go through the storefront endpoint, and "Save" becomes
 * "Add to cart". Everything else in the studio behaves identically.
 */
export interface StorefrontContext {
  shopDomain: string;
  shopName: string | null;
  /** Merchant's public storefront host (custom domain) if known. */
  primaryDomain: string | null;
  shopifyProductId: string;
  shopifyVariantId: string | null;
  shopifyProductTitle: string;
  settings: ShopifySettings;
  /** True when opened inside the theme extension's modal iframe. */
  embedded: boolean;
  /** Where "Back" returns to (product page) when not embedded. */
  returnUrl: string | null;
}

interface StorefrontState {
  active: boolean;
  context: StorefrontContext | null;
  /** Set once the shopper's customization has been persisted. */
  customizationToken: string | null;
  editKey: string | null;
  activate: (context: StorefrontContext, existing?: { token: string; editKey: string | null } | null) => void;
  setCustomization: (token: string, editKey: string | null) => void;
  deactivate: () => void;
}

export const useStorefrontStore = create<StorefrontState>((set) => ({
  active: false,
  context: null,
  customizationToken: null,
  editKey: null,
  activate(context, existing) {
    set({
      active: true,
      context,
      customizationToken: existing?.token ?? null,
      editKey: existing?.editKey ?? null,
    });
  },
  setCustomization(token, editKey) {
    set({ customizationToken: token, editKey });
  },
  deactivate() {
    set({ active: false, context: null, customizationToken: null, editKey: null });
  },
}));
