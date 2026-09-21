import { useCallback, useEffect, useState } from 'react';
import { Link2, Link2Off, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { Badge, EmptyState, Modal, PageHeader, SectionCard, SkeletonList, Spinner, Switch } from '../../components/ui';
import { apiErrorMessage } from '../../services/apiClient';
import type { ShopContext } from './ShopifyAdminRoutes';
import {
  fetchCustomizerProducts,
  fetchShopifyProducts,
  linkProduct,
  toggleMapping,
  unlinkProduct,
  type CustomizerProductOption,
  type ShopifyProductRow,
} from './shopifyAdminClient';

/**
 * Links Shopify products to customizer products. The customizer product
 * supplies print areas, the 3D model and production rules; Shopify keeps
 * owning price, inventory and checkout.
 */
export default function ShopifyProductsPage({ ctx }: { ctx: ShopContext }) {
  const [rows, setRows] = useState<ShopifyProductRow[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [options, setOptions] = useState<CustomizerProductOption[]>([]);
  const [linking, setLinking] = useState<ShopifyProductRow | null>(null);

  const load = useCallback(async (q: string, after?: string) => {
    const res = await fetchShopifyProducts({ query: q || undefined, after });
    setCursor(res.pageInfo.endCursor);
    setHasMore(res.pageInfo.hasNextPage);
    return res.items;
  }, []);

  useEffect(() => {
    fetchCustomizerProducts().then(setOptions).catch(() => undefined);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const t = setTimeout(() => {
      load(query)
        .then((items) => !cancelled && setRows(items))
        .catch((err) => !cancelled && toast.error(apiErrorMessage(err, 'Could not load products')))
        .finally(() => !cancelled && setLoading(false));
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query, load]);

  async function loadMore() {
    if (!cursor) return;
    setLoadingMore(true);
    try {
      const items = await load(query, cursor);
      setRows((prev) => [...prev, ...items]);
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not load more'));
    } finally {
      setLoadingMore(false);
    }
  }

  function patchRow(id: string, mapping: ShopifyProductRow['mapping']) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, mapping } : r)));
  }

  async function onToggle(row: ShopifyProductRow, enabled: boolean) {
    try {
      patchRow(row.id, await toggleMapping(row.id, enabled));
      void ctx.refresh();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    }
  }

  async function onUnlink(row: ShopifyProductRow) {
    try {
      await unlinkProduct(row.id);
      patchRow(row.id, null);
      toast.success('Product unlinked');
      void ctx.refresh();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Pick the Shopify products shoppers can personalise and the customizer template each one uses."
        actions={
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              className="input input-sm w-64 pl-8"
              placeholder="Search products…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        }
      />

      {options.length === 0 && !loading && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          The customizer catalog has no active products yet. Create one in the customizer admin
          (print areas, mockups, 3D model) before linking Shopify products.
        </div>
      )}

      <SectionCard bodyClassName="p-0">
        {loading ? (
          <div className="p-5">
            <SkeletonList rows={6} />
          </div>
        ) : rows.length === 0 ? (
          <div className="p-5">
            <EmptyState compact title="No products found" description="Try a different search." />
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {rows.map((row) => (
              <li key={row.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  {row.imageUrl && <img src={row.imageUrl} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{row.title}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span>{row.variants.length} variant{row.variants.length === 1 ? '' : 's'}</span>
                    {row.status !== 'ACTIVE' && <Badge tone="warning">{row.status.toLowerCase()}</Badge>}
                    {row.mapping && (
                      <span className="inline-flex items-center gap-1 text-gray-700">
                        <Link2 className="h-3 w-3" /> {row.mapping.product.name}
                        {row.mapping.variantMap && Object.keys(row.mapping.variantMap).length > 0 && (
                          <span className="text-gray-400">
                            · {Object.keys(row.mapping.variantMap).length} variant
                            {Object.keys(row.mapping.variantMap).length === 1 ? '' : 's'} matched
                          </span>
                        )}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {row.mapping ? (
                    <>
                      <span className={clsx('text-xs', row.mapping.enabled ? 'text-emerald-700' : 'text-gray-400')}>
                        {row.mapping.enabled ? 'Live' : 'Paused'}
                      </span>
                      <Switch
                        checked={row.mapping.enabled}
                        onChange={(v) => void onToggle(row, v)}
                        label="Customization enabled"
                      />
                      <button className="btn-ghost btn-sm" onClick={() => setLinking(row)}>
                        Change
                      </button>
                      <button
                        className="btn-ghost btn-sm text-gray-500"
                        onClick={() => void onUnlink(row)}
                        title="Unlink"
                      >
                        <Link2Off className="h-3.5 w-3.5" />
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => setLinking(row)}
                      disabled={options.length === 0}
                    >
                      <Link2 className="h-3.5 w-3.5" /> Link
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {hasMore && !loading && (
          <div className="border-t border-gray-100 p-3 text-center">
            <button className="btn-secondary btn-sm" onClick={() => void loadMore()} disabled={loadingMore}>
              {loadingMore && <Spinner className="h-3.5 w-3.5" />} Load more
            </button>
          </div>
        )}
      </SectionCard>

      <LinkModal
        row={linking}
        options={options}
        onClose={() => setLinking(null)}
        onLinked={(mapping) => {
          if (linking) patchRow(linking.id, mapping);
          setLinking(null);
          void ctx.refresh();
        }}
      />
    </div>
  );
}

function LinkModal({
  row,
  options,
  onClose,
  onLinked,
}: {
  row: ShopifyProductRow | null;
  options: CustomizerProductOption[];
  onClose: () => void;
  onLinked: (mapping: ShopifyProductRow['mapping']) => void;
}) {
  const [productId, setProductId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setProductId(row?.mapping?.productId ?? options[0]?.id ?? null);
  }, [row, options]);

  async function submit() {
    if (!row || !productId) return;
    setBusy(true);
    try {
      const mapping = await linkProduct(row.id, { productId });
      toast.success(`Linked to ${mapping.product.name}`);
      onLinked(mapping);
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not link product'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open={Boolean(row)}
      onClose={onClose}
      title={row ? `Link "${row.title}"` : ''}
      description="Choose the customizer product that defines the print areas and preview for this Shopify product."
      size="md"
      footer={
        <>
          <button className="btn-ghost" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button className="btn-primary" onClick={() => void submit()} disabled={busy || !productId}>
            {busy && <Spinner className="h-4 w-4 text-white" />} Save link
          </button>
        </>
      }
    >
      <ul className="max-h-80 space-y-1.5 overflow-y-auto scroll-thin">
        {options.map((opt) => (
          <li key={opt.id}>
            <button
              type="button"
              onClick={() => setProductId(opt.id)}
              className={clsx(
                'flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors',
                productId === opt.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50/60',
              )}
            >
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                {opt.imageUrl && <img src={opt.imageUrl} alt="" className="h-full w-full object-contain" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{opt.name}</p>
                <p className="text-xs text-gray-500">
                  {opt.category} · {opt.printAreas} print area{opt.printAreas === 1 ? '' : 's'} · {opt.variants}{' '}
                  variant{opt.variants === 1 ? '' : 's'}
                  {opt.has3d && ' · 3D'}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-gray-500">
        Shopify variants are matched to customizer colours/sizes by name automatically, so "Black / M"
        opens the black medium mockup. Price and stock always come from Shopify.
      </p>
    </Modal>
  );
}
