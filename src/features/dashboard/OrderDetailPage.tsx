import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { fetchOrder } from '../../services/catalogService';
import { api, apiErrorMessage } from '../../services/apiClient';
import type { Order } from '../../types/catalog';
import { Badge, EmptyState, PageSpinner, SectionCard } from '../../components/ui';
import { formatDate, formatPrice, ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '../../utils/format';

/** Production pipeline, in order. Cancelled orders opt out of the timeline. */
const PIPELINE = ['PENDING', 'CONFIRMED', 'IN_PRODUCTION', 'SHIPPED', 'DELIVERED'] as const;

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null | 'error'>(null);
  const [downloading, setDownloading] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchOrder(Number(id))
      .then(setOrder)
      .catch(() => setOrder('error'));
  }, [id]);

  async function downloadProduction(itemId: number) {
    setDownloading(itemId);
    try {
      const res = await api.get(`/orders/${id}/items/${itemId}/production`, {
        params: { dpi: 300 },
        responseType: 'blob',
      });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `order-${id}-item-${itemId}-print.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Download failed'));
    } finally {
      setDownloading(null);
    }
  }

  if (order === null) return <PageSpinner label="Loading order" />;
  if (order === 'error') {
    return (
      <EmptyState
        title="Order not found"
        description="This order may belong to another account."
        action={
          <Link to="/dashboard/orders" className="btn-primary">
            Back to orders
          </Link>
        }
      />
    );
  }

  const address = order.shippingAddress;
  const stageIndex = PIPELINE.indexOf(order.status as (typeof PIPELINE)[number]);

  return (
    <div>
      <Link
        to="/dashboard/orders"
        className="inline-flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Orders
      </Link>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl font-semibold tabular tracking-tight text-gray-900">
            {order.orderNumber}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Placed {formatDate(order.createdAt)} · {order.items.length} item
            {order.items.length === 1 ? '' : 's'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            tone={order.paymentStatus === 'PAID' ? 'success' : 'neutral'}
            dot
          >
            {order.paymentStatus === 'PAID' ? 'Paid' : 'Unpaid'}
          </Badge>
          <Badge className={ORDER_STATUS_COLORS[order.status]} dot>
            {ORDER_STATUS_LABELS[order.status]}
          </Badge>
        </div>
      </div>

      {/* Production timeline */}
      {stageIndex >= 0 && (
        <ol className="mt-6 grid grid-cols-5 gap-1.5">
          {PIPELINE.map((stage, i) => (
            <li key={stage}>
              <span
                className={clsx(
                  'block h-1 rounded-full transition-colors',
                  i <= stageIndex ? 'bg-gray-900' : 'bg-gray-200',
                )}
              />
              <span
                className={clsx(
                  'mt-2 block text-2xs uppercase tracking-label',
                  i <= stageIndex ? 'text-gray-900' : 'text-gray-400',
                )}
              >
                {ORDER_STATUS_LABELS[stage]}
              </span>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard title="Items" bodyClassName="">
            <ul className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 px-5 py-4">
                  <span className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-surface-sunken p-1.5">
                    {(item.design?.previewImage || item.product?.image) && (
                      <img
                        src={item.design?.previewImage ?? item.product?.image ?? ''}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">{item.productName}</p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {item.variantName ? `${item.variantName} · ` : ''}Qty {item.quantity}
                    </p>
                    {item.design && (
                      <p className="truncate text-xs text-gray-400">Design: {item.design.name}</p>
                    )}
                  </div>
                  {item.hasDesign && (
                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => downloadProduction(item.id)}
                      disabled={downloading === item.id}
                      title="Download the 300 DPI print file"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Print file</span>
                    </button>
                  )}
                  <p className="w-20 shrink-0 text-right text-sm font-medium tabular text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Summary">
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Subtotal</dt>
                <dd className="tabular text-gray-900">{formatPrice(order.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Tax</dt>
                <dd className="tabular text-gray-900">{formatPrice(order.tax)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Shipping</dt>
                <dd className="tabular text-gray-900">
                  {order.shipping === 0 ? 'Free' : formatPrice(order.shipping)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-gray-100 pt-3">
                <dt className="font-medium text-gray-900">Total</dt>
                <dd className="text-lg font-semibold tabular tracking-tight text-gray-900">
                  {formatPrice(order.total)}
                </dd>
              </div>
            </dl>
          </SectionCard>

          {address && (
            <SectionCard title="Shipping to">
              <address className="space-y-0.5 text-sm not-italic leading-relaxed text-gray-600">
                <p className="font-medium text-gray-900">{address.fullName}</p>
                <p>
                  {address.line1}
                  {address.line2 ? `, ${address.line2}` : ''}
                </p>
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
                {address.phone && <p className="tabular pt-1 text-gray-500">{address.phone}</p>}
              </address>
            </SectionCard>
          )}
        </div>
      </div>
    </div>
  );
}
