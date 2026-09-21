import { Fragment, useEffect, useState } from 'react';
import { ChevronRight, Download, ShoppingBag } from 'lucide-react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { adminFetchOrders, adminUpdateOrderStatus } from '../../services/adminService';
import { api, apiErrorMessage } from '../../services/apiClient';
import type { Order } from '../../types/catalog';
import { EmptyState, PageHeader, Skeleton } from '../../components/ui';
import { formatDate, formatPrice, ORDER_STATUS_LABELS } from '../../utils/format';

const STATUSES = ['PENDING', 'CONFIRMED', 'IN_PRODUCTION', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    setOrders(null);
    adminFetchOrders({ status: statusFilter || undefined })
      .then((r) => setOrders(r.items))
      .catch(() => setOrders([]));
  }, [statusFilter]);

  async function changeStatus(order: Order, status: string) {
    try {
      const updated = await adminUpdateOrderStatus(order.id, status);
      setOrders((prev) => prev?.map((o) => (o.id === order.id ? updated : o)) ?? null);
      toast.success(`${order.orderNumber} → ${ORDER_STATUS_LABELS[status]}`);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    }
  }

  async function downloadProduction(orderId: number, itemId: number) {
    try {
      const res = await api.get(`/orders/${orderId}/items/${itemId}/production`, {
        params: { dpi: 300 },
        responseType: 'blob',
      });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `order-${orderId}-item-${itemId}-print.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Download failed'));
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Operations"
        title="Orders"
        description="Move orders through production and pull the print-ready files."
        actions={
          <select
            className="input w-44"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {ORDER_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        }
      />

      <div className="card mt-7 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th className="w-8" />
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th className="text-right">Items</th>
                <th className="text-right">Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders === null ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-4 py-3">
                      <Skeleton className="h-10" />
                    </td>
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6">
                    <EmptyState
                      compact
                      icon={<ShoppingBag className="h-5 w-5" strokeWidth={1.8} />}
                      title="No orders found"
                      description={
                        statusFilter
                          ? 'No orders currently have this status.'
                          : 'New orders will appear here as they come in.'
                      }
                    />
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <Fragment key={order.id}>
                    <tr
                      className="cursor-pointer"
                      onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                    >
                      <td className="pr-0">
                        <ChevronRight
                          className={clsx(
                            'h-4 w-4 text-gray-400 transition-transform duration-200',
                            expanded === order.id && 'rotate-90',
                          )}
                        />
                      </td>
                      <td className="font-medium tabular text-gray-900">{order.orderNumber}</td>
                      <td>
                        <span className="block text-gray-900">{order.user?.name}</span>
                        <span className="block text-xs text-gray-400">{order.user?.email}</span>
                      </td>
                      <td className="text-gray-500">{formatDate(order.createdAt)}</td>
                      <td className="text-right tabular text-gray-600">{order.items.length}</td>
                      <td className="text-right font-medium tabular text-gray-900">
                        {formatPrice(order.total)}
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <select
                          className="input h-8 w-36 text-xs"
                          value={order.status}
                          onChange={(e) => changeStatus(order, e.target.value)}
                          aria-label={`Status for ${order.orderNumber}`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {ORDER_STATUS_LABELS[s]}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>

                    {expanded === order.id && (
                      <tr className="!bg-gray-50">
                        <td colSpan={7} className="bg-gray-50 px-4 py-4">
                          <p className="panel-title mb-3">Line items</p>
                          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3"
                              >
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-surface-sunken p-1">
                                  {(item.design?.previewImage || item.product?.image) && (
                                    <img
                                      src={item.design?.previewImage ?? item.product?.image ?? ''}
                                      alt=""
                                      className="h-full w-full object-contain"
                                      loading="lazy"
                                    />
                                  )}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-xs font-medium text-gray-900">
                                    {item.productName}
                                  </p>
                                  <p className="truncate text-2xs text-gray-500">
                                    {item.variantName ? `${item.variantName} · ` : ''}qty{' '}
                                    {item.quantity}
                                  </p>
                                  {item.hasDesign && (
                                    <button
                                      className="mt-1.5 inline-flex items-center gap-1 text-2xs font-medium text-gray-700 underline decoration-gray-300 underline-offset-2 transition-colors hover:text-gray-900 hover:decoration-gray-900"
                                      onClick={() => downloadProduction(order.id, item.id)}
                                    >
                                      <Download className="h-3 w-3" /> Production file · 300 DPI
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
