import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import type { ShopifySettings } from '@cpd/shared';
import { Field, PageHeader, SectionCard, Segmented, Spinner, Switch } from '../../components/ui';
import { apiErrorMessage } from '../../services/apiClient';
import type { ShopContext } from './ShopifyAdminRoutes';
import { saveSettings } from './shopifyAdminClient';

export default function ShopifySettingsPage({ ctx }: { ctx: ShopContext }) {
  const [form, setForm] = useState<ShopifySettings>(ctx.shop.settings);
  const [busy, setBusy] = useState(false);

  useEffect(() => setForm(ctx.shop.settings), [ctx.shop.settings]);

  const set = <K extends keyof ShopifySettings>(key: K, value: ShopifySettings[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await saveSettings(form);
      await ctx.refresh();
      toast.success('Settings saved');
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not save settings'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <PageHeader
        title="Settings"
        description="How the customizer appears on your storefront and how production files are produced."
        actions={
          <button type="submit" className="btn-primary" disabled={busy}>
            {busy && <Spinner className="h-4 w-4 text-white" />} Save
          </button>
        }
      />

      <SectionCard title="Storefront button" description="Rendered by the “Customize button” app block on product pages.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Button label" hint="Shown on product pages of linked products.">
            <input
              className="input"
              value={form.buttonLabel}
              maxLength={60}
              onChange={(e) => set('buttonLabel', e.target.value)}
            />
          </Field>
          <Field
            label="Open the designer"
            hint="Modal keeps shoppers on the product page; full page is better for very small screens."
          >
            <Segmented
              value={form.launchMode}
              onChange={(v) => set('launchMode', v)}
              options={[
                { value: 'modal', label: 'In a modal' },
                { value: 'page', label: 'Full page' },
              ]}
            />
          </Field>
        </div>
        <div className="mt-5 space-y-4">
          <label className="flex items-start justify-between gap-4">
            <span>
              <span className="block text-sm font-medium text-gray-900">Require a design before adding to cart</span>
              <span className="block text-xs text-gray-500">Shoppers must place at least one element.</span>
            </span>
            <Switch checked={form.requireDesign} onChange={(v) => set('requireDesign', v)} />
          </label>
          <label className="flex items-start justify-between gap-4">
            <span>
              <span className="block text-sm font-medium text-gray-900">Show the design preview in cart and checkout</span>
              <span className="block text-xs text-gray-500">
                Adds a visible “Design preview” line-item property with the mockup image link.
              </span>
            </span>
            <Switch checked={form.showPreviewInCart} onChange={(v) => set('showPreviewInCart', v)} />
          </label>
        </div>
      </SectionCard>

      <SectionCard title="Production" description="Applied when you download print files from an order.">
        <Field label="Default export DPI" hint="Output size = print area's physical size × DPI." className="max-w-xs">
          <select
            className="input"
            value={form.productionDpi}
            onChange={(e) => set('productionDpi', Number(e.target.value))}
          >
            {[150, 300, 600].map((d) => (
              <option key={d} value={d}>
                {d} DPI
              </option>
            ))}
          </select>
        </Field>
      </SectionCard>

      <SectionCard title="Store">
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-label text-gray-500">Store</dt>
            <dd className="mt-0.5 text-gray-900">{ctx.shop.name ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-label text-gray-500">Domain</dt>
            <dd className="mt-0.5 text-gray-900">{ctx.shop.shopDomain}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-label text-gray-500">Currency</dt>
            <dd className="mt-0.5 text-gray-900">{ctx.shop.currency ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-label text-gray-500">Installed</dt>
            <dd className="mt-0.5 text-gray-900">{new Date(ctx.shop.installedAt).toLocaleDateString()}</dd>
          </div>
        </dl>
      </SectionCard>
    </form>
  );
}
