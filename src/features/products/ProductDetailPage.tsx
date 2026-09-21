import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Box, Ruler } from 'lucide-react';
import clsx from 'clsx';
import { fetchProduct } from '../../services/catalogService';
import type { Product, ProductVariant } from '../../types/catalog';
import { formatPrice } from '../../utils/format';
import {
  Badge,
  Breadcrumbs,
  ColorSwatch,
  EmptyState,
  PageSpinner,
} from '../../components/ui';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null | 'error'>(null);
  const [colorName, setColorName] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setProduct(null);
    setImageIndex(0);
    fetchProduct(slug)
      .then(setProduct)
      .catch(() => setProduct('error'));
  }, [slug]);

  const colors = useMemo(() => {
    if (!product || product === 'error') return [];
    const map = new Map<string, { hex: string; name: string }>();
    product.variants.forEach((v) => {
      if (v.color && v.colorName && !map.has(v.colorName)) {
        map.set(v.colorName, { hex: v.color, name: v.colorName });
      }
    });
    return Array.from(map.values());
  }, [product]);

  const sizes = useMemo(() => {
    if (!product || product === 'error') return [];
    return Array.from(new Set(product.variants.map((v) => v.size).filter(Boolean))) as string[];
  }, [product]);

  const selectedVariant: ProductVariant | undefined = useMemo(() => {
    if (!product || product === 'error') return undefined;
    return product.variants.find(
      (v) => (!colorName || v.colorName === colorName) && (!size || v.size === size),
    );
  }, [product, colorName, size]);

  if (product === null) return <PageSpinner label="Loading product" />;
  if (product === 'error') {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-24">
        <EmptyState
          title="Product not found"
          description="It may have been removed or renamed. Browse the catalog to find something similar."
          action={
            <Link to="/products" className="btn-primary">
              Browse catalog
            </Link>
          }
        />
      </div>
    );
  }

  const images = product.images.length ? product.images : [];
  const image = images[imageIndex] ?? images.find((i) => i.isPrimary) ?? images[0];
  const price = selectedVariant?.price ?? product.basePrice;
  const designerUrl = `/designer/${product.slug}${selectedVariant ? `?variant=${selectedVariant.id}` : ''}`;

  return (
    <div className="mx-auto w-full max-w-container flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <Breadcrumbs
        items={[
          { label: 'Catalog', to: '/products' },
          { label: product.category.name, to: `/products?category=${product.category.slug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-[76px]">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-surface-sunken">
              <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
              {image && (
                <img
                  src={image.url}
                  alt={image.alt ?? product.name}
                  className="relative mx-auto aspect-[4/3] w-full object-contain p-10 sm:p-16"
                />
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-3 flex gap-2.5">
                {images.map((img, i) => (
                  <button
                    key={img.id ?? i}
                    onClick={() => setImageIndex(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={i === imageIndex}
                    className={clsx(
                      'h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-surface-sunken p-2 transition-colors',
                      i === imageIndex
                        ? 'border-gray-900'
                        : 'border-gray-200 hover:border-gray-300',
                    )}
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="h-full w-full object-contain"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Spec column */}
        <div className="lg:col-span-5">
          <p className="eyebrow">{product.category.name}</p>
          <h1 className="mt-2.5 text-title font-semibold text-gray-900">{product.name}</h1>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {product.model && (
              <Badge tone="neutral">
                <Box className="h-3 w-3" strokeWidth={2} /> 3D preview
              </Badge>
            )}
            <Badge tone="neutral">
              <Ruler className="h-3 w-3" strokeWidth={2} /> {product.printAreas.length} print area
              {product.printAreas.length === 1 ? '' : 's'}
            </Badge>
          </div>

          <p className="mt-6 text-2xl font-semibold tabular tracking-tight text-gray-900">
            {formatPrice(price)}
            <span className="ml-2 text-xs font-normal text-gray-400">base price</span>
          </p>

          {product.description && (
            <p className="mt-5 max-w-prose text-sm leading-relaxed text-gray-600">
              {product.description}
            </p>
          )}

          <div className="mt-8 space-y-7 border-t border-gray-200 pt-7">
            {colors.length > 0 && (
              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <p className="panel-title">Colour</p>
                  <p className="text-xs text-gray-500">{colorName ?? 'Any'}</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {colors.map((c) => (
                    <ColorSwatch
                      key={c.name}
                      color={c.hex}
                      title={c.name}
                      selected={colorName === c.name}
                      onClick={() => setColorName(c.name === colorName ? null : c.name)}
                    />
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <p className="panel-title">Size</p>
                  <p className="text-xs text-gray-500">{size ?? 'Any'}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s === size ? null : s)}
                      aria-pressed={size === s}
                      className={clsx(
                        'h-9 min-w-11 rounded-lg border px-3 text-xs font-medium transition-colors',
                        size === s
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400',
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.printAreas.length > 0 && (
              <div>
                <p className="panel-title mb-3">Print areas</p>
                <dl className="overflow-hidden rounded-lg border border-gray-200">
                  {product.printAreas.map((a, i) => (
                    <div
                      key={a.id}
                      className={clsx(
                        'flex items-center justify-between gap-4 px-3.5 py-2.5 text-sm',
                        i > 0 && 'border-t border-gray-100',
                      )}
                    >
                      <dt className="text-gray-700">{a.name}</dt>
                      <dd className="tabular text-xs text-gray-500">
                        {a.physicalWidthIn && a.physicalHeightIn
                          ? `${a.physicalWidthIn}″ × ${a.physicalHeightIn}″`
                          : `${a.width} × ${a.height} px`}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-3 border-t border-gray-200 pt-7">
            <button
              onClick={() => navigate(designerUrl)}
              className="btn-primary btn-lg group w-full"
            >
              Customize this product
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <p className="text-center text-xs text-gray-400">
              Free to design · quantity discounts apply at checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
