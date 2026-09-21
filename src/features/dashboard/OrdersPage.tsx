import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Package } from 'lucide-react';
import { fetchOrders } from '../../services/catalogService';
import type { Order } from '../../types/catalog';
import { Badge, EmptyState, PageHeader, Skeleton } from '../../components/ui';
import { formatDate, formatPrice, ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '../../utils/format';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch(() => setOrders([]));
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Workspace"
        title="Orders"
        description="Track production status and reorder any past job."
      />

      <div className="mt-7">
        {orders === null ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-[86px]" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <EmptyState
            icon={<Package className="h-5 w-5" strokeWidth={1.8} />}
            title="No orders yet"
            description="Once you order a customized product it will show up here with live status."
            action={
              <Link to="/products" className="btn-primary">
                Browse catalog
              </Link>
            }
          />
        ) : (
          <ul className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {orders.map((order, i) => (
              <li key={order.id} className={i > 0 ? 'border-t border-gray-100' : undefined}>
                <Link
                  to={`/dashboard/orders/${order.id}`}
                  className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-gray-50/70 sm:px-5"
                >
                  <div className="flex shrink-0 -space-x-2.5">
                    {order.items.slice(0, 3).map((item) => (
                      <span
                        key={item.id}
                        className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-surface-sunken p-1"
                      >
                        {item.design?.previewImage || item.product?.image ? (
                          <img
                            src={item.design?.previewImage ?? item.product?.image ?? ''}
                            alt=""
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        ) : null}
                      </span>
                    ))}
                    {order.items.length > 3 && (
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white text-2xs font-medium tabular text-gray-500">
                        +{order.items.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium tabular text-gray-900">{order.orderNumber}</p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {formatDate(order.createdAt)} · {order.items.length} item
                      {order.items.length === 1 ? '' : 's'}
                    </p>
                  </div>

                  <Badge className={ORDER_STATUS_COLORS[order.status]} dot>
                    {ORDER_STATUS_LABELS[order.status]}
                  </Badge>

                  <p className="hidden w-24 text-right text-sm font-medium tabular text-gray-900 sm:block">
                    {formatPrice(order.total)}
                  </p>

                  <ChevronRight className="h-4 w-4 shrink-0 text-gray-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-gray-500" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
