import { useEffect, useState, type ReactNode } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Settings, ShoppingBag } from 'lucide-react';
import clsx from 'clsx';
import { PageSpinner } from '../../components/ui';
import { apiErrorMessage } from '../../services/apiClient';
import { isEmbeddedInShopify, loadAppBridge, SHOPIFY_API_KEY, shopifyAdminAppUrl } from './appBridge';
import { fetchShop, type ShopInfo } from './shopifyAdminClient';
import ShopifyInstallPage from './ShopifyInstallPage';
import ShopifyOverviewPage from './ShopifyOverviewPage';
import ShopifyProductsPage from './ShopifyProductsPage';
import ShopifyOrdersPage from './ShopifyOrdersPage';
import ShopifySettingsPage from './ShopifySettingsPage';

declare global {
  // App Bridge web components used for the admin-side navigation.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'ui-nav-menu': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const LINKS = [
  { to: '/shopify/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/shopify/admin/products', label: 'Products', icon: Package, end: false },
  { to: '/shopify/admin/orders', label: 'Orders', icon: ShoppingBag, end: false },
  { to: '/shopify/admin/settings', label: 'Settings', icon: Settings, end: false },
];

export interface ShopContext {
  shop: ShopInfo;
  refresh: () => Promise<void>;
}

/**
 * /shopify/admin/* — the app as merchants see it inside the Shopify admin.
 * Boots App Bridge, authenticates with a session token (which also completes
 * the install via token exchange on first load), then renders the pages.
 */
export default function ShopifyAdminRoutes() {
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'ready' | 'not-embedded' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [shop, setShop] = useState<ShopInfo | null>(null);

  async function refresh() {
    setShop(await fetchShop());
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    // A top-level visit (no admin frame): with ?shop= we know the store, so
    // send the merchant to the app inside their Shopify admin (Shopify shows
    // its own install prompt if it isn't installed yet). Without a shop,
    // show the install screen.
    if (!isEmbeddedInShopify() && !params.get('embedded')) {
      const shop = params.get('shop');
      if (shop && SHOPIFY_API_KEY && /^[a-z0-9][a-z0-9-]*.myshopify.com$/.test(shop)) {
        window.location.replace(shopifyAdminAppUrl(shop));
        return;
      }
      setStatus('not-embedded');
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        await loadAppBridge();
        const info = await fetchShop();
        if (cancelled) return;
        setShop(info);
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        setError(apiErrorMessage(err, 'Could not connect to Shopify'));
        setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
    };
    // The boot sequence runs once per document load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'not-embedded') return <ShopifyInstallPage />;
  if (status === 'loading') return <PageSpinner label="Connecting to Shopify…" />;
  if (status === 'error' || !shop) {
    return (
      <Shell>
        <div className="mx-auto max-w-md py-16 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Couldn't connect to Shopify</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">{error}</p>
          {!SHOPIFY_API_KEY && (
            <p className="mt-2 text-xs text-red-700">VITE_SHOPIFY_API_KEY is missing from the frontend build.</p>
          )}
          <button className="btn-primary mt-6" onClick={() => window.location.reload()}>
            Try again
          </button>
        </div>
      </Shell>
    );
  }

  const ctx: ShopContext = { shop, refresh };
  return (
    <Shell nav>
      <Routes>
        <Route index element={<ShopifyOverviewPage ctx={ctx} />} />
        <Route path="products" element={<ShopifyProductsPage ctx={ctx} />} />
        <Route path="orders" element={<ShopifyOrdersPage ctx={ctx} />} />
        <Route path="settings" element={<ShopifySettingsPage ctx={ctx} />} />
      </Routes>
    </Shell>
  );
}

/**
 * Minimal chrome: Shopify supplies the outer admin frame and (via
 * <ui-nav-menu>) the sidebar entries, so the page itself only needs a
 * compact tab strip for in-frame navigation plus the content column.
 */
function Shell({ children, nav = false }: { children: ReactNode; nav?: boolean }) {
  // Full reloads from the admin sidebar must keep ?shop= so nginx can emit
  // the shop-specific frame-ancestors header.
  const shop = new URLSearchParams(window.location.search).get('shop');
  const withShop = (to: string) => (shop ? `${to}?shop=${encodeURIComponent(shop)}` : to);
  return (
    <div className="min-h-screen bg-surface">
      {nav && (
        <>
          <ui-nav-menu>
            {LINKS.map((l) => (
              <a key={l.to} href={withShop(l.to)} rel={l.end ? 'home' : undefined}>
                {l.label}
              </a>
            ))}
          </ui-nav-menu>
          <nav className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={withShop(l.to)}
                  end={l.end}
                  className={({ isActive }) =>
                    clsx(
                      'flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-gray-100 font-medium text-gray-900'
                        : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900',
                    )
                  }
                >
                  <l.icon className="h-4 w-4" strokeWidth={1.8} />
                  {l.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </>
      )}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
