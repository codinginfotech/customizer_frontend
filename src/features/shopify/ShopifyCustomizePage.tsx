import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { DesignDocument } from '@cpd/shared';
import { PageSpinner, EmptyState } from '../../components/ui';
import { useDesignerStore } from '../../stores/designerStore';
import { useStorefrontStore } from '../../stores/storefrontStore';
import { apiErrorMessage } from '../../services/apiClient';
import { track } from '../../services/analytics';
import { DesignerLayout } from '../designer/DesignerLayout';
import { fetchCustomization, fetchStorefrontContext } from './storefrontService';

/**
 * /shopify/customize?shop=&product=&variant=[&token=&key=][&embedded=1][&return=]
 *
 * The storefront customizer. Opened by the theme extension either inside a
 * modal iframe (embedded=1) or as a full page. Shoppers are anonymous: the
 * design is persisted as a "customization" whose token goes into the cart.
 */
export default function ShopifyCustomizePage() {
  const [params] = useSearchParams();
  const initialize = useDesignerStore((s) => s.initialize);
  const activate = useStorefrontStore((s) => s.activate);
  const deactivate = useStorefrontStore((s) => s.deactivate);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  const shop = params.get('shop') ?? '';
  const productId = params.get('product') ?? '';
  const variantId = params.get('variant');
  const token = params.get('token');
  const editKey = params.get('key');
  const embedded = params.get('embedded') === '1';
  const returnUrl = params.get('return');

  useEffect(() => {
    if (!shop || !productId) {
      setError('This link is missing the store or product.');
      setStatus('error');
      return;
    }
    let cancelled = false;
    setStatus('loading');
    (async () => {
      try {
        const ctx = await fetchStorefrontContext({ shop, product: productId, variant: variantId });
        let existing: { id: null; name: string; doc: DesignDocument } | null = null;
        if (token) {
          try {
            const c = await fetchCustomization(shop, token);
            if (c.productId === ctx.product.id && c.status === 'DRAFT') {
              existing = { id: null, name: ctx.shopifyProductTitle, doc: c.designJson };
            }
          } catch {
            /* stale token — start fresh */
          }
        }
        if (cancelled) return;

        const variant =
          ctx.product.variants.find((v) => v.id === (existing?.doc.variantId ?? ctx.variantId)) ??
          ctx.product.variants[0] ??
          null;

        activate(
          {
            shopDomain: ctx.shop.domain,
            shopName: ctx.shop.name,
            primaryDomain: ctx.shop.primaryDomain,
            shopifyProductId: ctx.shopifyProductId,
            shopifyVariantId: ctx.shopifyVariantId,
            shopifyProductTitle: ctx.shopifyProductTitle,
            settings: ctx.settings,
            embedded,
            returnUrl: safeReturnUrl(returnUrl, [ctx.shop.domain, ctx.shop.primaryDomain]),
          },
          existing && token ? { token, editKey } : null,
        );
        initialize(ctx.product, variant, existing);
        useDesignerStore.getState().setDesignIdentity(null, ctx.shopifyProductTitle);
        track('customizer_opened', { productId: ctx.product.id });
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        setError(apiErrorMessage(err, 'This product cannot be customized right now.'));
        setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [shop, productId, variantId, token, editKey, embedded, returnUrl, activate, initialize]);

  // Leaving the page (SPA navigation) must not leak storefront mode into the
  // regular designer.
  useEffect(() => () => deactivate(), [deactivate]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <PageSpinner label="Loading the designer…" />
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <EmptyState
          title="Customizer unavailable"
          description={error}
          action={
            embedded ? (
              <button className="btn-primary" onClick={() => window.parent.postMessage({ type: 'cpd:close' }, '*')}>
                Close
              </button>
            ) : returnUrl ? (
              <a className="btn-primary" href={returnUrl}>
                Back to the product
              </a>
            ) : undefined
          }
        />
      </div>
    );
  }
  return <DesignerLayout />;
}

/** Only ever send shoppers back to the merchant's own storefront. */
function safeReturnUrl(candidate: string | null, hosts: Array<string | null>): string | null {
  if (!candidate) return null;
  try {
    const url = new URL(candidate);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    return hosts.filter(Boolean).includes(url.host) ? url.toString() : null;
  } catch {
    return null;
  }
}
