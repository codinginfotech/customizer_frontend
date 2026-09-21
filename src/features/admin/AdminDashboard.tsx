import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, Package, Palette, ShoppingBag, Users } from 'lucide-react';
import { AdminStats, fetchAdminStats } from '../../services/adminService';
import { Badge, EmptyState, PageHeader, Skeleton, StatTile } from '../../components/ui';
import {
  formatDate,
  formatPrice,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
} from '../../utils/format';

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    fetchAdminStats()
      .then(setStats)
      .catch(() => undefined);
  }, []);

  const tiles = stats
    ? [
        { label: 'Revenue', value: formatPrice(stats.revenue), icon: DollarSign },
        { label: 'Orders', value: String(stats.orders), icon: ShoppingBag },
        { label: 'Designs', value: String(stats.designs), icon: Palette },
        { label: 'Products', value: String(stats.products), icon: Package },
        { label: 'Users', value: String(stats.users), icon: Users },
      ]
    : null;

  return (
    <div>
      <PageHeader
        eyebrow="Console"
        title="Dashboard"
        description="Store health at a glance — revenue, catalog size and what is moving through production."
      />

      <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {tiles
          ? tiles.map((tile) => (
              <StatTile
                key={tile.label}
                label={tile.label}
                value={tile.value}
                icon={<tile.icon className="h-4 w-4" strokeWidth={1.8} />}
              />
            ))
          : Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-[104px]" />)}
      </div>

      <section className="card mt-6 overflow-hidden">
        <header className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-3.5">
          <h2 className="text-sm font-semibold text-gray-900">Recent orders</h2>
          <Link
            to="/admin/orders"
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </header>

        {!stats ? (
          <div className="p-5">
            <Skeleton className="h-40" />
          </div>
        ) : stats.recentOrders.length === 0 ? (
          <div className="p-5">
            <EmptyState compact title="No orders yet" description="New orders will appear here." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-medium tabular text-gray-900">{order.orderNumber}</td>
                    <td>{order.user.name}</td>
                    <td>
                      <Badge className={ORDER_STATUS_COLORS[order.status]} dot>
                        {ORDER_STATUS_LABELS[order.status]}
                      </Badge>
                    </td>
                    <td className="text-gray-500">{formatDate(order.createdAt)}</td>
                    <td className="text-right font-medium tabular text-gray-900">
                      {formatPrice(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
