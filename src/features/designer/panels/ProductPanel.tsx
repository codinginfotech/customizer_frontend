import { useMemo } from 'react';
import clsx from 'clsx';
import { useDesignerStore } from '../../../stores/designerStore';
import { ColorSwatch } from '../../../components/ui';

/** Variant (colour/size) selection plus a read-only print-area spec list. */
export function ProductPanel() {
  const product = useDesignerStore((s) => s.product);
  const variant = useDesignerStore((s) => s.variant);
  const productColor = useDesignerStore((s) => s.productColor);
  const setVariant = useDesignerStore((s) => s.setVariant);

  const colors = useMemo(() => {
    if (!product) return [];
    const map = new Map<string, { hex: string; name: string }>();
    product.variants.forEach((v) => {
      if (v.color && v.colorName && !map.has(v.colorName)) {
        map.set(v.colorName, { hex: v.color, name: v.colorName });
      }
    });
    return Array.from(map.values());
  }, [product]);

  const sizes = useMemo(() => {
    if (!product) return [];
    return Array.from(new Set(product.variants.map((v) => v.size).filter(Boolean))) as string[];
  }, [product]);

  if (!product) return null;

  const selectedColorName = variant?.colorName ?? colors.find((c) => c.hex === productColor)?.name;
  const selectedSize = variant?.size ?? null;

  function pickVariant(colorName: string | null, size: string | null) {
    const match =
      product!.variants.find(
        (v) => (!colorName || v.colorName === colorName) && (!size || v.size === size),
      ) ?? null;
    setVariant(match);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-gray-50/70 px-3 py-2.5">
        <p className="text-sm font-medium text-gray-900">{product.name}</p>
        <p className="mt-0.5 text-xs text-gray-500">{product.category.name}</p>
      </div>

      {colors.length > 0 && (
        <section>
          <div className="mb-2.5 flex items-baseline justify-between">
            <p className="panel-title">Colour</p>
            <p className="truncate pl-2 text-2xs text-gray-500">{selectedColorName ?? 'Default'}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <ColorSwatch
                key={c.name}
                color={c.hex}
                title={c.name}
                selected={selectedColorName === c.name}
                onClick={() => pickVariant(c.name, selectedSize)}
              />
            ))}
          </div>
        </section>
      )}

      {sizes.length > 0 && (
        <section>
          <p className="panel-title mb-2.5">Size</p>
          <div className="flex flex-wrap gap-1.5">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => pickVariant(selectedColorName ?? null, s)}
                aria-pressed={selectedSize === s}
                className={clsx(
                  'h-8 min-w-10 rounded-md border px-2.5 text-xs font-medium transition-colors',
                  selectedSize === s
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400',
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </section>
      )}

      <section>
        <p className="panel-title mb-2.5">Print areas</p>
        <dl className="overflow-hidden rounded-lg border border-gray-200">
          {product.printAreas.map((a, i) => (
            <div
              key={a.key}
              className={clsx(
                'flex items-center justify-between gap-2 px-3 py-2 text-xs',
                i > 0 && 'border-t border-gray-100',
              )}
            >
              <dt className="truncate text-gray-700">{a.name}</dt>
              <dd className="shrink-0 tabular text-2xs text-gray-500">
                {a.physicalWidthIn
                  ? `${a.physicalWidthIn}″ × ${a.physicalHeightIn}″`
                  : `${a.width}×${a.height}`}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
