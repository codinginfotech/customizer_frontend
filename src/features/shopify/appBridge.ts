/**
 * Shopify App Bridge (CDN build). It expects a `shopify-api-key` meta tag and
 * the script in <head>; since only the /shopify/admin routes are embedded we
 * inject both on demand rather than shipping them on every page.
 *
 * Once loaded, `window.shopify.idToken()` returns a fresh session token that
 * the API verifies (see backend requireShopifySession).
 */

declare global {
  interface Window {
    shopify?: {
      idToken: () => Promise<string>;
      toast?: { show: (message: string, opts?: { isError?: boolean; duration?: number }) => void };
      config?: { shop?: string; host?: string; apiKey?: string };
      environment?: { embedded?: boolean; mobile?: boolean };
      loading?: (state: boolean) => void;
    };
  }
}

const SCRIPT_SRC = 'https://cdn.shopify.com/shopifycloud/app-bridge.js';

export const SHOPIFY_API_KEY: string = import.meta.env.VITE_SHOPIFY_API_KEY || '';

let loading: Promise<void> | null = null;

export function loadAppBridge(): Promise<void> {
  if (window.shopify?.idToken) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise<void>((resolve, reject) => {
    if (!SHOPIFY_API_KEY) {
      reject(new Error('VITE_SHOPIFY_API_KEY is not set'));
      return;
    }
    if (!document.querySelector('meta[name="shopify-api-key"]')) {
      const meta = document.createElement('meta');
      meta.name = 'shopify-api-key';
      meta.content = SHOPIFY_API_KEY;
      document.head.appendChild(meta);
    }
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = false;
    script.onload = () => {
      // App Bridge initialises synchronously on load.
      if (window.shopify?.idToken) resolve();
      else reject(new Error('App Bridge did not initialise'));
    };
    script.onerror = () => reject(new Error('Could not load App Bridge'));
    document.head.appendChild(script);
  });
  return loading;
}

export async function getSessionToken(): Promise<string> {
  await loadAppBridge();
  return window.shopify!.idToken();
}

/** True when this document is framed by the Shopify admin. */
export function isEmbeddedInShopify(): boolean {
  try {
    return window.top !== window.self;
  } catch {
    return true;
  }
}

export function shopifyToast(message: string, isError = false) {
  if (window.shopify?.toast) window.shopify.toast.show(message, { isError });
}
