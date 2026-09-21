import { NavLink, Route, Routes, Link } from 'react-router-dom';
import {
  ArrowLeft,
  FolderTree,
  LayoutDashboard,
  LayoutTemplate,
  Package,
  ShoppingBag,
  Users,
} from 'lucide-react';
import clsx from 'clsx';
import AdminDashboard from './AdminDashboard';
import AdminProductsPage from './AdminProductsPage';
import AdminProductEditPage from './AdminProductEditPage';
import AdminModelStudio from './AdminModelStudio';
import AdminCategoriesPage from './AdminCategoriesPage';
import AdminTemplatesPage from './AdminTemplatesPage';
import AdminOrdersPage from './AdminOrdersPage';
import AdminUsersPage from './AdminUsersPage';
import { useAuthStore } from '../../stores/authStore';
import { Wordmark } from '../../layouts/MainLayout';

const GROUPS = [
  {
    label: 'Overview',
    links: [{ to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true }],
  },
  {
    label: 'Catalog',
    links: [
      { to: '/admin/products', label: 'Products', icon: Package, end: false },
      { to: '/admin/categories', label: 'Categories', icon: FolderTree, end: false },
      { to: '/admin/templates', label: 'Templates', icon: LayoutTemplate, end: false },
    ],
  },
  {
    label: 'Operations',
    links: [
      { to: '/admin/orders', label: 'Orders', icon: ShoppingBag, end: false },
      { to: '/admin/users', label: 'Users', icon: Users, end: false },
    ],
  },
];

const ALL_LINKS = GROUPS.flatMap((g) => g.links);

export default function AdminRoutes() {
  const user = useAuthStore((s) => s.user);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors',
      isActive
        ? 'bg-gray-100 font-medium text-gray-900'
        : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900',
    );

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Rail */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="flex h-[60px] items-center border-b border-gray-200 px-4">
          <Wordmark />
          <span className="ml-2 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-2xs font-medium uppercase tracking-label text-gray-500">
            Admin
          </span>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto p-3 scroll-thin">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <p className="panel-title px-2.5 pb-2">{group.label}</p>
              <div className="space-y-0.5">
                {group.links.map((link) => (
                  <NavLink key={link.to} to={link.to} end={link.end} className={navClass}>
                    {({ isActive }) => (
                      <>
                        <link.icon
                          className={clsx('h-4 w-4', isActive ? 'text-gray-900' : 'text-gray-400')}
                          strokeWidth={1.8}
                        />
                        {link.label}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-3">
          {user && (
            <div className="mb-2 flex items-center gap-2.5 px-2.5 py-1.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-900 text-xs font-medium text-white">
                {user.name.slice(0, 1).toUpperCase()}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-medium text-gray-900">
                  {user.name}
                </span>
                <span className="block truncate text-2xs text-gray-500">{user.email}</span>
              </span>
            </div>
          )}
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 text-gray-400" strokeWidth={1.8} />
            Back to storefront
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile nav */}
        <nav className="no-scrollbar flex items-center gap-1 overflow-x-auto border-b border-gray-200 bg-white px-3 py-2 md:hidden">
          <Link to="/" className="mr-2 shrink-0">
            <Wordmark />
          </Link>
          {ALL_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                clsx(
                  'shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors',
                  isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/new" element={<AdminProductEditPage />} />
            <Route path="products/:id" element={<AdminProductEditPage />} />
            <Route path="products/:id/studio" element={<AdminModelStudio />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="templates" element={<AdminTemplatesPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="users" element={<AdminUsersPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
