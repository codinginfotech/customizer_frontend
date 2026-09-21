import { useMemo } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import clsx from 'clsx';
import { useDesignerStore } from '../../stores/designerStore';
import { useUiStore } from '../../stores/uiStore';
import { ProductStage } from '../../engine3d/ProductStage';
import { MockupPreview } from './preview/MockupPreview';
import { useAddToCart } from '../../hooks/useAddToCart';
import { Spinner } from '../../components/ui';

/**
 * Presentation mode (§78): full-screen customer view — rotate, zoom, change
 * color, add to cart. All editor chrome hidden.
 */
export function PresentationOverlay() {
  const open = useUiStore((s) => s.presentationOpen);
  const setOpen = useUiStore((s) => s.setPresentationOpen);
  const product = useDesignerStore((s) => s.product);
  const productColor = useDesignerStore((s) => s.productColor);
  const designName = useDesignerStore((s) => s.designName);
  const { addToCart, adding } = useAddToCart();

  const colors = useMemo(() => {
    const map = new Map<string, { hex: string; name: string }>();
    product?.variants.forEach((v) => {
      if (v.color && v.colorName && !map.has(v.colorName)) map.set(v.colorName, { hex: v.color, name: v.colorName });
    });
    return Array.from(map.values());
  }, [product]);

  if (!open || !product) return null;

  function pickColor(name: string) {
    const store = useDesignerStore.getState();
    const match = store.product?.variants.find(
      (v) => v.colorName === name && (!store.variant?.size || v.size === store.variant.size),
    );
    if (match) store.setVariant(match);
  }

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-studio-base animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/[.07] px-6 py-4">
        <div>
          <p className="text-sm font-medium text-white">{designName}</p>
          <p className="text-2xs text-zinc-500">{product.name}</p>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 transition-colors hover:bg-white/[.07] hover:text-white"
          aria-label="Exit presentation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="min-h-0 flex-1">{product.model ? <ProductStage /> : <MockupPreview />}</div>

      <div className="flex flex-col items-center gap-4 px-6 pb-8 pt-4">
        {colors.length > 0 && (
          <div className="flex items-center gap-2.5">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => pickColor(c.name)}
                className={clsx(
                  'h-9 w-9 rounded-full transition-transform hover:scale-110',
                  productColor === c.hex ? 'ring-2 ring-white ring-offset-2 ring-offset-studio-base' : 'ring-1 ring-white/20',
                )}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}
        <button
          className="btn btn-lg bg-white px-8 text-gray-900 hover:bg-zinc-200"
          onClick={() => void addToCart(1)}
          disabled={adding}
        >
          {adding ? <Spinner className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          Add to cart
        </button>
      </div>
    </div>
  );
}
