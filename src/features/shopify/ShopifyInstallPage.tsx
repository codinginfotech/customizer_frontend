import { FormEvent, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Wordmark } from '../../layouts/MainLayout';

/**
 * Top-level (non-embedded) landing for /shopify/admin and /shopify/install.
 * Merchants usually arrive from the Shopify admin, where the app is framed
 * and this page never shows; this handles direct visits and manual installs
 * by kicking off the OAuth flow on the API.
 */
export default function ShopifyInstallPage() {
  const [params] = useSearchParams();
  const [shop, setShop] = useState(params.get('shop') ?? '');
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const domain = normalizeShop(shop);
    if (!domain) {
      setError('Enter your store domain, e.g. my-store.myshopify.com');
      return;
    }
    const base = import.meta.env.VITE_API_URL || '/api';
    window.location.href = `${base}/shopify/auth?shop=${encodeURIComponent(domain)}`;
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <header className="flex h-[60px] items-center border-b border-gray-200 bg-white px-6">
        <Link to="/">
          <Wordmark />
        </Link>
        <span className="ml-2 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-2xs font-medium uppercase tracking-label text-gray-500">
          Shopify
        </span>
      </header>
      <main className="mx-auto w-full max-w-md flex-1 px-6 py-16">
        <p className="eyebrow mb-2">Shopify app</p>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Install the customizer</h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Add a product designer to your Shopify store: shoppers personalise products on your
          product pages, and every order arrives with print-ready files.
        </p>
        <form onSubmit={onSubmit} className="card mt-8 p-5">
          <label className="label" htmlFor="shop-domain">
            Store domain
          </label>
          <input
            id="shop-domain"
            className="input"
            placeholder="my-store.myshopify.com"
            value={shop}
            onChange={(e) => {
              setShop(e.target.value);
              setError(null);
            }}
            autoFocus
            autoComplete="off"
          />
          {error && <p className="mt-1.5 text-xs font-medium text-red-700">{error}</p>}
          <button type="submit" className="btn-primary mt-4 w-full">
            Continue to Shopify
          </button>
          <p className="mt-3 text-xs leading-relaxed text-gray-500">
            You'll be asked to approve read access to products and orders. Already installed? Open
            the app from your Shopify admin's <span className="font-medium">Apps</span> menu.
          </p>
        </form>
      </main>
    </div>
  );
}

function normalizeShop(input: string): string | null {
  let s = input.trim().toLowerCase();
  s = s.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  if (!s) return null;
  if (!s.includes('.')) s = `${s}.myshopify.com`;
  return /^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(s) ? s : null;
}
