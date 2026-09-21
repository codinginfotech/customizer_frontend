import { Link } from 'react-router-dom';
import { Box, ImageOff } from 'lucide-react';
import type { Product } from '../../types/catalog';
import { formatPrice } from '../../utils/format';

/**
 * Catalog tile. The image plate does the work — the chrome around it stays
 * hairline-quiet so a wall of these reads as a grid of products, not of cards.
 */
export function ProductCard({ product }: { product: Product }) {
  const image = product.images.find((i) => i.isPrimary) ?? product.images[0];
  const colors = Array.from(
    new Map(
      product.variants.filter((v) => v.color).map((v) => [v.color as string, v.colorName]),
    ).entries(),
  );

  return (
    <article className="group flex flex-col">
      <Link
        to={`/products/${product.slug}`}
        className="relative block overflow-hidden rounded-xl border border-gray-200 bg-surface-sunken transition-colors duration-200 hover:border-gray-300"
      >
        <div className="aspect-[4/5] w-full p-6 sm:p-8">
          {image ? (
            <img
              src={image.url}
              alt={image.alt ?? product.name}
              className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-300">
              <ImageOff className="h-8 w-8" strokeWidth={1.5} />
            </div>
          )}
        </div>

        {product.model && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white/90 px-1.5 py-1 text-2xs font-medium text-gray-600 backdrop-blur">
            <Box className="h-3 w-3" strokeWidth={2} />
            3D
          </span>
        )}

        {/* Action reveals on hover; always reachable on touch via the card link */}
        <span className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-1.5 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          <span className="btn btn-sm w-full bg-gray-900 text-white shadow-raised">
            Customize
          </span>
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-3.5">
        <p className="text-2xs uppercase tracking-label text-gray-400">{product.category.name}</p>
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <h3 className="truncate text-sm font-medium text-gray-900">
            <Link to={`/products/${product.slug}`} className="hover:underline underline-offset-2">
              {product.name}
            </Link>
          </h3>
          <span className="shrink-0 text-sm font-medium tabular text-gray-900">
            {formatPrice(product.basePrice)}
          </span>
        </div>

        {colors.length > 0 && (
          <div className="mt-2.5 flex items-center gap-1.5">
            {colors.slice(0, 6).map(([hex, name]) => (
              <span
                key={hex}
                title={name ?? hex}
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: hex, boxShadow: 'inset 0 0 0 1px rgba(26,24,22,.18)' }}
              />
            ))}
            {colors.length > 6 && (
              <span className="text-2xs tabular text-gray-400">+{colors.length - 6}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
