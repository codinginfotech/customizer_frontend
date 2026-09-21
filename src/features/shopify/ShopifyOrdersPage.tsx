import { useEffect, useState } from 'react';
import { Download, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { Badge, EmptyState, PageHeader, Pagination, SectionCard, SkeletonList, Spinner } from '../../components/ui';
import { apiErrorMessage } from '../../services/apiClient';
import type { ShopContext } from './ShopifyAdminRoutes';
import {
  downloadProductionFile,
  fetchShopifyOrders,
  type ShopifyOrderItemRow,
  type ShopifyOrderRow,
} from './shopifyAdminClient';

function tone(status: string | null): 'success' | 'warning' | 'neutral' | 'danger' {
  switch (status) {
    case 'paid':
      return 'success';
    case 'pending':
    case 'authorized':
    case 'partially_paid':
      return 'warning';
    case 'refunded':
    case 'voided':
      return 'danger';
    default:
      return 'neutral';
  }
}

export default function ShopifyOrdersPage({ ctx }: { ctx: ShopContext }) {
  const [orders, setOrders] = useState<ShopifyOrderRow[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchShopifyOrders(page)
      .then((res) => {
        if (cancelled) return;
        setOrders(res.items);
        setTotalPages(res.meta.totalPages);
      })
      .catch((err) => !cancelled && toast.error(apiErrorMessage(err, 'Could not load orders')))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [page]);

  const dpi = ctx.shop.settings.productionDpi;
  const currency = ctx.shop.currency ?? 'USD';

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customized orders"
        description={`Orders containing personalised items. Production files render at ${dpi} DPI (change in Settings).`}
      />

      {loading ? (
        <SkeletonList rows={4} />
      ) : orders.length === 0 ? (
        <EmptyState
          title="No customized orders yet"
          description="Orders appear here as soon as a shopper checks out with a personalised item."
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <SectionCard
              key={order.id}
              title={
                <span className="flex items-center gap-2">
                  {order.orderName}
                  <Badge tone={tone(order.financialStatus)}>{order.financialStatus ?? 'unknown'}</Badge>
                  {order.cancelledAt && <Badge tone="danger">cancelled</Badge>}
                </span>
              }
              description={`${new Date(order.shopifyCreatedAt ?? order.createdAt).toLocaleString()} · ${
                order.totalPrice != null
                  ? new Intl.NumberFormat(undefined, { style: 'currency', currency: order.currency ?? currency }).format(
                      Number(order.totalPrice),
                    )
                  : ''
              }`}
              actions={
                <a
                  href={`https://${ctx.shop.shopDomain}/admin/orders/${order.shopifyOrderId}`}
                  target="_top"
                  rel="noreferrer"
                  className="btn-ghost btn-sm"
                >
                  Open in Shopify <ExternalLink className="h-3.5 w-3.5" />
                </a>
              }
              bodyClassName="p-0"
            >
              <ul className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <OrderItemRow key={item.id} order={order} item={item} dpi={dpi} />
                ))}
              </ul>
            </SectionCard>
          ))}
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  );
}

function OrderItemRow({ order, item, dpi }: { order: ShopifyOrderRow; item: ShopifyOrderItemRow; dpi: number }) {
  const [busyArea, setBusyArea] = useState<string | null>(null);
  const areas = item.product?.printAreas ?? [];
  const snapshot = item.designSnapshot as { areas?: { areaKey: string; elements: unknown[] }[] } | null;
  const designedKeys = new Set(
    (snapshot?.areas ?? []).filter((a) => a.elements.length > 0).map((a) => a.areaKey),
  );

  async function download(areaKey: string) {
    setBusyArea(areaKey);
    try {
      await downloadProductionFile(order.id, item.id, areaKey, dpi);
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not render the production file'));
    } finally {
      setBusyArea(null);
    }
  }

  return (
    <li className="flex items-start gap-4 px-5 py-4">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
        {item.previewImage && <img src={item.previewImage} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">
          {item.title}
          {item.variantTitle && <span className="text-gray-500"> — {item.variantTitle}</span>}
        </p>
        <p className="mt-0.5 text-xs text-gray-500">
          Qty {item.quantity}
          {item.sku && ` · SKU ${item.sku}`}
          {item.product && ` · ${item.product.name}`}
        </p>
        {!item.designSnapshot && (
          <p className="mt-1 text-xs text-amber-700">
            No design snapshot was found for this line — the customization may have been deleted before the
            order arrived.
          </p>
        )}
      </div>
      {item.designSnapshot != null && (
        <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
          {(areas.length ? areas : [{ key: '', name: 'Print file' }]).map((area) => {
            const empty = area.key !== '' && !designedKeys.has(area.key);
            return (
              <button
                key={area.key}
                className="btn-secondary btn-sm"
                onClick={() => void download(area.key)}
                disabled={busyArea !== null || empty}
                title={empty ? 'Nothing was designed on this area' : `Download ${area.name} at ${dpi} DPI`}
              >
                {busyArea === area.key ? <Spinner className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                {area.name}
              </button>
            );
          })}
        </div>
      )}
    </li>
  );
}
