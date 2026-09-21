import { NavLink, Route, Routes } from 'react-router-dom';
import { FolderOpen, Image, Package, Settings } from 'lucide-react';
import clsx from 'clsx';
import MyDesignsPage from './MyDesignsPage';
import AssetsPage from './AssetsPage';
import OrdersPage from './OrdersPage';
import OrderDetailPage from './OrderDetailPage';
import SettingsPage from './SettingsPage';

const LINKS = [
  { to: '/dashboard', label: 'Designs', icon: FolderOpen, end: true },
  { to: '/dashboard/assets', label: 'Assets', icon: Image, end: false },
  { to: '/dashboard/orders', label: 'Orders', icon: Package, end: false },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings, end: false },
];

export default function DashboardRoutes() {
  return (
    <div className="mx-auto w-full max-w-container flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <aside className="shrink-0 lg:w-48">
          <p className="panel-title mb-3 hidden lg:block">Account</p>
          <nav className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 lg:mx-0 lg:flex-col lg:gap-0.5 lg:px-0">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  clsx(
                    'flex shrink-0 items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-gray-100 font-medium text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900',
                  )
                }
              >
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
          </nav>
        </aside>

        <div className="min-w-0 flex-1">
          <Routes>
            <Route index element={<MyDesignsPage />} />
            <Route path="assets" element={<AssetsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderDetailPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
