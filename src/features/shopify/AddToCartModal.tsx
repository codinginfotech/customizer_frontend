import { useEffect, useState } from 'react';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import type { CustomizerAddToCartMessage } from '@cpd/shared';
import { Modal, Spinner } from '../../components/ui';
import { useDesignerStore } from '../../stores/designerStore';
import { useStorefrontStore } from '../../stores/storefrontStore';
import { apiErrorMessage } from '../../services/apiClient';
import { generatePreviewDataUrl } from '../../utils/preview';
import { track } from '../../services/analytics';
import { createCustomization, updateCustomization } from './storefrontService';

/**
 * Storefront replacement for SaveDesignModal. Persists the shopper's design
 * as a customization, then hands the token to the theme extension — via
 * postMessage when framed, or by returning to the product page with the
 * token in the query string.
 */
export function AddToCartModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ctx = useStorefrontStore((s) => s.context);
  const existingToken = useStorefrontStore((s) => s.customizationToken);
  const editKey = useStorefrontStore((s) => s.editKey);
  const product = useDesignerStore((s) => s.product);
  const variant = useDesignerStore((s) => s.variant);
  const areas = useDesignerStore((s) => s.areas);
  const [quantity, setQuantity] = useState(1);
  const [preview, setPreview] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);

  const elementCount = areas.reduce((n, a) => n + a.elements.length, 0);
  const needsDesign = Boolean(ctx?.settings.requireDesign) && elementCount === 0;

  useEffect(() => {
    if (!open || !product) return;
    let cancelled = false;
    const store = useDesignerStore.getState();
    generatePreviewDataUrl(product, store.areas, store.productColor)
      .then((url) => !cancelled && setPreview(url))
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [open, product]);

  if (!ctx) return null;

  async function confirm() {
    const store = useDesignerStore.getState();
    const doc = store.buildDocument();
    if (!doc || !store.product || needsDesign) return;
    setBusy(true);
    try {
      const previewImage = preview ?? (await generatePreviewDataUrl(store.product, doc.areas, doc.productColor));
      let token = existingToken;
      let previewUrl: string | null = null;
      if (token && editKey) {
        const updated = await updateCustomization(token, {
          shop: ctx!.shopDomain,
          editKey,
          shopifyVariantId: ctx!.shopifyVariantId,
          variantId: doc.variantId,
          designJson: doc,
          previewImage,
        });
        previewUrl = updated.previewImage;
      } else {
        const created = await createCustomization({
          shop: ctx!.shopDomain,
          shopifyProductId: ctx!.shopifyProductId,
          shopifyVariantId: ctx!.shopifyVariantId,
          variantId: doc.variantId,
          designJson: doc,
          previewImage,
        });
        token = created.customization.token;
        previewUrl = created.customization.previewImage;
        useStorefrontStore.getState().setCustomization(token, created.editKey);
      }
      store.markSaved();
      track('added_to_cart', { productId: store.product.id, value: quantity });

      const message: CustomizerAddToCartMessage = {
        type: 'cpd:add-to-cart',
        token: token!,
        previewUrl,
        shopifyVariantId: ctx!.shopifyVariantId,
        quantity,
      };
      if (ctx!.embedded && window.parent !== window) {
        // The theme extension validates the origin and calls /cart/add.js.
        window.parent.postMessage(message, '*');
      } else if (ctx!.returnUrl) {
        const url = new URL(ctx!.returnUrl);
        url.searchParams.set('cpd_customization', message.token);
        if (message.shopifyVariantId) url.searchParams.set('cpd_variant', message.shopifyVariantId);
        url.searchParams.set('cpd_qty', String(quantity));
        window.location.assign(url.toString());
      } else {
        toast.success('Design saved. Return to the store to add it to your cart.');
      }
      onClose();
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not save your design'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add to cart"
      size="sm"
      footer={
        <>
          <button type="button" className="btn-ghost" onClick={onClose} disabled={busy}>
            Keep designing
          </button>
          <button type="button" className="btn-primary" onClick={() => void confirm()} disabled={busy || needsDesign}>
            {busy ? <Spinner className="h-4 w-4 text-white" /> : <ShoppingBag className="h-4 w-4" />}
            Add to cart
          </button>
        </>
      }
    >
      <div className="flex gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          {preview ? (
            <img src={preview} alt="Design preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Spinner className="h-4 w-4 text-gray-400" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">{ctx.shopifyProductTitle}</p>
          {variant && <p className="mt-0.5 text-xs text-gray-500">{variant.name}</p>}
          <p className="mt-0.5 text-xs text-gray-500">
            {elementCount} element{elementCount === 1 ? '' : 's'} across{' '}
            {areas.filter((a) => a.elements.length > 0).length || 0} print area
            {areas.filter((a) => a.elements.length > 0).length === 1 ? '' : 's'}
          </p>
          <div className="mt-3 inline-flex items-center rounded-lg border border-gray-200">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-30"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-10 text-center text-sm font-medium tabular text-gray-900">{quantity}</span>
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-50"
              onClick={() => setQuantity((q) => Math.min(99, q + 1))}
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
      {needsDesign ? (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Add at least one element (text, artwork or a shape) before adding this item to your cart.
        </p>
      ) : (
        <p className="mt-4 text-xs leading-relaxed text-gray-500">
          Your design is saved with the cart item. Pricing, shipping and checkout are handled by the store.
        </p>
      )}
    </Modal>
  );
}
