import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { fetchCategories, fetchProducts } from '../../services/catalogService';
import type { Category, Product } from '../../types/catalog';
import type { PaginationMeta } from '@cpd/shared';
import { ProductCard } from './ProductCard';
import { EmptyState, Pagination, Skeleton } from '../../components/ui';
import { useDebouncedValue } from '../../hooks/useDebounce';
import clsx from 'clsx';

const SORTS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: low to high' },
  { value: 'price_desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name A–Z' },
] as const;

export default function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [search, setSearch] = useState(params.get('search') ?? '');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const debouncedSearch = useDebouncedValue(search, 350);

  const category = params.get('category') ?? '';
  const sort = (params.get('sort') as (typeof SORTS)[number]['value']) || 'newest';
  const page = Number(params.get('page')) || 1;

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setProducts(null);
    fetchProducts({
      search: debouncedSearch || undefined,
      category: category || undefined,
      sort,
      page,
      pageSize: 12,
    })
      .then((r) => {
        setProducts(r.items);
        setMeta(r.meta);
      })
      .catch(() => setProducts([]));
  }, [debouncedSearch, category, sort, page]);

  const setParam = useMemo(
    () => (key: string, value: string) => {
      const next = new URLSearchParams(params);
      if (value) next.set(key, value);
      else next.delete(key);
      if (key !== 'page') next.delete('page');
      setParams(next, { replace: true });
    },
    [params, setParams],
  );

  const activeCategory = categories.find((c) => c.slug === category);
  const hasFilters = Boolean(category || search);

  const categoryList = (
    <div className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-0.5">
      <FilterButton active={!category} onClick={() => setParam('category', '')} label="All products" />
      {categories.map((c) => (
        <FilterButton
          key={c.id}
          active={category === c.slug}
          onClick={() => setParam('category', c.slug)}
          label={c.name}
          count={c._count?.products}
        />
      ))}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-container flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <header className="border-b border-gray-200 pb-6">
        <p className="eyebrow">Catalog</p>
        <h1 className="mt-2 text-title font-semibold text-gray-900">
          {activeCategory?.name ?? 'Every blank we print'}
        </h1>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-500">
          Each product ships with measured print areas, its own colourways and a 3D preview mesh.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Filters — sticky rail on desktop, sheet on mobile */}
        <aside className="lg:w-52 lg:shrink-0">
          <div className="lg:sticky lg:top-[76px]">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                strokeWidth={1.8}
              />
              <input
                className="input pl-9 pr-8"
                placeholder="Search…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setParam('search', e.target.value);
                }}
                aria-label="Search products"
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch('');
                    setParam('search', '');
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-700"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <button
              className="btn-secondary mt-3 w-full justify-between lg:hidden"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {activeCategory?.name ?? 'All products'}
              </span>
            </button>

            <div className={clsx('mt-5 lg:block', filtersOpen ? 'block' : 'hidden')}>
              <p className="panel-title mb-3 hidden lg:block">Category</p>
              {categoryList}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">
                {meta ? (
                  <>
                    <span className="font-medium tabular text-gray-900">{meta.total}</span>{' '}
                    product{meta.total === 1 ? '' : 's'}
                  </>
                ) : (
                  <span className="inline-block h-4 w-20 skeleton rounded" />
                )}
              </p>
              {hasFilters && (
                <button
                  onClick={() => {
                    setSearch('');
                    setParams({}, { replace: true });
                  }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-900"
                >
                  <X className="h-3 w-3" /> Clear filters
                </button>
              )}
            </div>

            <label className="flex items-center gap-2 text-xs text-gray-500">
              <span className="hidden sm:inline">Sort</span>
              <select
                className="input btn-sm h-8 w-44 text-xs"
                value={sort}
                onChange={(e) => setParam('sort', e.target.value)}
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {products === null ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <Skeleton className="aspect-[4/5] w-full" />
                  <Skeleton className="mt-3.5 h-3 w-16" />
                  <Skeleton className="mt-2 h-4 w-32" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <EmptyState
              title="No products match"
              description="Try a different search term, or clear the filters to see the full catalog."
              action={
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setSearch('');
                    setParams({}, { replace: true });
                  }}
                >
                  Clear filters
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {meta && meta.totalPages > 1 && (
            <div className="mt-12 border-t border-gray-200 pt-6">
              <Pagination
                page={page}
                totalPages={meta.totalPages}
                onChange={(p) => {
                  setParam('page', String(p));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        'flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors',
        active
          ? 'bg-gray-900 font-medium text-white lg:bg-gray-100 lg:text-gray-900'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      )}
    >
      {label}
      {count != null && (
        <span
          className={clsx(
            'text-2xs tabular',
            active ? 'text-white/60 lg:text-gray-400' : 'text-gray-400',
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}
