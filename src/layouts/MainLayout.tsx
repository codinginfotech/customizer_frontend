import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  FolderOpen,
  LogOut,
  Menu as MenuIcon,
  Package,
  Settings,
  ShieldCheck,
  ShoppingBag,
  X,
} from 'lucide-react';
import clsx from 'clsx';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import { Menu, MenuItem, MenuLink, MenuSeparator } from '../components/ui';

/**
 * Wordmark. The mark is a bounded print area with the design inside it —
 * the literal thing the product does, not a generic palette glyph.
 */
export function Wordmark({ className, mono }: { className?: string; mono?: boolean }) {
  return (
    <span className={clsx('flex items-center gap-2.5', className)}>
      <span
        className={clsx(
          'relative flex h-7 w-7 items-center justify-center rounded-lg',
          mono ? 'bg-white text-gray-900' : 'bg-gray-900 text-white',
        )}
      >
        <span
          className="absolute inset-[5px] rounded-[3px] border border-dashed"
          style={{ borderColor: 'currentColor', opacity: 0.45 }}
        />
        <span className="h-1.5 w-1.5 rounded-[1px] bg-brand-500" />
      </span>
      <span
        className={clsx(
          'text-[0.9375rem] font-semibold tracking-tight',
          mono ? 'text-white' : 'text-gray-900',
        )}
      >
        Makely
      </span>
    </span>
  );
}

const NAV = [
  { to: '/products', label: 'Catalog', end: false },
  { to: '/dashboard', label: 'My designs', end: true, auth: true },
  { to: '/dashboard/orders', label: 'Orders', end: false, auth: true },
];

export function MainLayout() {
  const { user, logout } = useAuthStore();
  const cartStore = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = cartStore.cart?.items.reduce((s, i) => s + i.quantity, 0) ?? 0;

  useEffect(() => {
    if (user) void cartStore.load().catch(() => undefined);
    else cartStore.clearLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  /* Active state is a 2px underline on the header baseline — quieter and more
     precise than a filled pill, and it survives on any background. */
  const navLink = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'relative flex h-[59px] items-center px-0.5 text-sm transition-colors',
      'after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:transition-transform after:duration-200 after:ease-out after:content-[""]',
      isActive
        ? 'font-medium text-gray-900 after:scale-x-100 after:bg-gray-900'
        : 'text-gray-500 hover:text-gray-900 after:scale-x-0 after:bg-gray-300 hover:after:scale-x-100',
    );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-surface/80 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/70">
        <div className="mx-auto flex h-[60px] max-w-container items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="Makely home" className="shrink-0">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV.filter((n) => !n.auth || user).map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={navLink}>
                {n.label}
              </NavLink>
            ))}
            {user?.role === 'ADMIN' && (
              <NavLink to="/admin" className={navLink}>
                Admin
              </NavLink>
            )}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <Link
              to="/cart"
              className="group relative flex h-9 items-center gap-2 rounded-lg px-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label={`Cart, ${itemCount} item${itemCount === 1 ? '' : 's'}`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.8} />
              {itemCount > 0 && (
                <span className="tabular text-xs font-medium">{itemCount}</span>
              )}
            </Link>

            {user ? (
              <Menu
                trigger={({ open, toggle }) => (
                  <button
                    onClick={toggle}
                    aria-expanded={open}
                    aria-haspopup="menu"
                    className={clsx(
                      'flex h-9 items-center gap-2 rounded-lg pl-1 pr-2 transition-colors',
                      open ? 'bg-gray-100' : 'hover:bg-gray-100',
                    )}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gray-900 text-xs font-medium text-white">
                      {user.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span className="hidden max-w-24 truncate text-sm text-gray-700 sm:block">
                      {user.name.split(' ')[0]}
                    </span>
                  </button>
                )}
              >
                <div className="px-2.5 pb-2 pt-1.5">
                  <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="truncate text-xs text-gray-500">{user.email}</p>
                </div>
                <MenuSeparator />
                <MenuLink to="/dashboard" icon={<FolderOpen className="h-4 w-4" />}>
                  My designs
                </MenuLink>
                <MenuLink to="/dashboard/orders" icon={<Package className="h-4 w-4" />}>
                  Orders
                </MenuLink>
                <MenuLink to="/dashboard/settings" icon={<Settings className="h-4 w-4" />}>
                  Account settings
                </MenuLink>
                {user.role === 'ADMIN' && (
                  <MenuLink to="/admin" icon={<ShieldCheck className="h-4 w-4" />}>
                    Admin console
                  </MenuLink>
                )}
                <MenuSeparator />
                <MenuItem
                  danger
                  icon={<LogOut className="h-4 w-4" />}
                  onClick={async () => {
                    await logout();
                    navigate('/');
                  }}
                >
                  Sign out
                </MenuItem>
              </Menu>
            ) : (
              <div className="hidden items-center gap-1.5 sm:flex">
                <Link to="/login" className="btn-ghost">
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary">
                  Start designing
                </Link>
              </div>
            )}

            <button
              className="btn-ghost -mr-1.5 px-2 md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-gray-200 bg-white px-4 py-3 animate-fade-in md:hidden">
            <div className="flex flex-col">
              {NAV.filter((n) => !n.auth || user).map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  className={({ isActive }) =>
                    clsx(
                      'rounded-lg px-3 py-2.5 text-sm transition-colors',
                      isActive ? 'bg-gray-100 font-medium text-gray-900' : 'text-gray-600',
                    )
                  }
                >
                  {n.label}
                </NavLink>
              ))}
              {user?.role === 'ADMIN' && (
                <NavLink to="/admin" className="rounded-lg px-3 py-2.5 text-sm text-gray-600">
                  Admin
                </NavLink>
              )}
              {!user && (
                <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                  <Link to="/login" className="btn-secondary flex-1">
                    Sign in
                  </Link>
                  <Link to="/register" className="btn-primary flex-1">
                    Start designing
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </header>

      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>

      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-container px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <Wordmark />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
                A production-grade customizer for apparel, drinkware and hard goods — live 2D
                editing, real 3D preview, print-ready output.
              </p>
            </div>
            <div>
              <p className="panel-title">Product</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  { to: '/products', label: 'Catalog' },
                  { to: '/products?category=apparel', label: 'Apparel' },
                  { to: '/products?category=drinkware', label: 'Drinkware' },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-gray-500 transition-colors hover:text-gray-900">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="panel-title">Company</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  { href: '/#how-it-works', label: 'How it works' },
                  { href: '/#specs', label: 'Print specs' },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-gray-500 transition-colors hover:text-gray-900">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Makely. All rights reserved.
            </p>
            <p className="flex items-center gap-2 text-xs text-gray-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              All systems operational
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
