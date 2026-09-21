import { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Boxes, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import {
  adminCreateProduct,
  adminFetchCategories,
  adminFetchProduct,
  adminUpdateProduct,
} from '../../services/adminService';
import { apiErrorMessage } from '../../services/apiClient';
import type { Category, Product } from '../../types/catalog';
import { Badge, Field, PageSpinner, SectionCard, Spinner, Switch } from '../../components/ui';
import { VariantsTab } from './product-tabs/VariantsTab';
import { PrintAreasTab } from './product-tabs/PrintAreasTab';
import { ImagesTab } from './product-tabs/ImagesTab';
import { ModelTab } from './product-tabs/ModelTab';

type Tab = 'details' | 'variants' | 'areas' | 'images' | 'model';

export default function AdminProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id;
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tab, setTab] = useState<Tab>('details');
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState({
    name: '',
    categoryId: 0,
    description: '',
    basePrice: '19.99',
    featured: false,
    status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE',
  });

  async function reload() {
    if (!id) return;
    const p = await adminFetchProduct(Number(id));
    setProduct(p);
    setForm({
      name: p.name,
      categoryId: p.category.id,
      description: p.description ?? '',
      basePrice: String(p.basePrice),
      featured: p.featured,
      status: p.status,
    });
  }

  useEffect(() => {
    adminFetchCategories()
      .then(setCategories)
      .catch(() => undefined);
    if (id) {
      void reload().catch(() => toast.error('Product not found'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function saveDetails(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const payload = {
        name: form.name,
        categoryId: form.categoryId || categories[0]?.id,
        description: form.description,
        basePrice: Number(form.basePrice),
        featured: form.featured,
        status: form.status,
      };
      if (isNew) {
        const created = await adminCreateProduct(payload);
        toast.success('Product created — now add variants and print areas');
        navigate(`/admin/products/${created.id}`, { replace: true });
      } else {
        await adminUpdateProduct(Number(id), payload);
        toast.success('Saved');
        await reload();
      }
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  if (!isNew && !product) return <PageSpinner label="Loading product" />;

  const tabs: { key: Tab; label: string; count?: number; disabled?: boolean }[] = [
    { key: 'details', label: 'Details' },
    { key: 'variants', label: 'Variants', count: product?.variants.length, disabled: isNew },
    { key: 'areas', label: 'Print areas', count: product?.printAreas.length, disabled: isNew },
    { key: 'images', label: 'Images', count: product?.images.length, disabled: isNew },
    { key: 'model', label: '3D model', disabled: isNew },
  ];

  return (
    <div className="max-w-5xl">
      <Link
        to="/admin/products"
        className="inline-flex items-center gap-1.5 text-xs text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Products
      </Link>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
            {isNew ? 'New product' : product?.name}
          </h1>
          {product && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge tone={product.status === 'ACTIVE' ? 'success' : 'neutral'} dot>
                {product.status === 'ACTIVE' ? 'Active' : 'Inactive'}
              </Badge>
              {product.featured && <Badge tone="accent">Featured</Badge>}
              <span className="text-xs text-gray-400">/{product.slug}</span>
            </div>
          )}
        </div>

        {product && (
          <div className="flex items-center gap-2">
            <Link to={`/admin/products/${product.id}/studio`} className="btn-secondary">
              <Boxes className="h-4 w-4" /> Model studio
            </Link>
            <Link
              to={`/products/${product.slug}`}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <ExternalLink className="h-4 w-4" /> View
            </Link>
          </div>
        )}
      </div>

      {/* Tabs — underline baseline, count badges inline */}
      <div className="no-scrollbar mt-6 flex gap-6 overflow-x-auto border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            disabled={t.disabled}
            onClick={() => setTab(t.key)}
            className={clsx(
              'relative shrink-0 pb-3 text-sm transition-colors disabled:opacity-35',
              'after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:transition-opacity after:content-[""]',
              tab === t.key
                ? 'font-medium text-gray-900 after:bg-gray-900 after:opacity-100'
                : 'text-gray-500 after:opacity-0 hover:text-gray-900',
            )}
          >
            {t.label}
            {t.count != null && (
              <span className="ml-1.5 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-2xs tabular text-gray-500">
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'details' && (
          <form onSubmit={saveDetails} className="max-w-2xl space-y-6">
            <SectionCard title="Basics">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" required className="sm:col-span-2">
                  <input
                    className="input"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </Field>
                <Field label="Category">
                  <select
                    className="input"
                    value={form.categoryId || categories[0]?.id || ''}
                    onChange={(e) => setForm((f) => ({ ...f, categoryId: Number(e.target.value) }))}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Base price (USD)" required>
                  <input
                    className="input tabular"
                    type="number"
                    min={0}
                    step="0.01"
                    required
                    value={form.basePrice}
                    onChange={(e) => setForm((f) => ({ ...f, basePrice: e.target.value }))}
                  />
                </Field>
                <Field
                  label="Description"
                  className="sm:col-span-2"
                  hint="Shown on the product page. Keep it factual — materials, fit, print method."
                >
                  <textarea
                    className="input min-h-24"
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Visibility">
              <div className="space-y-4">
                <label className="flex items-center justify-between gap-4">
                  <span>
                    <span className="block text-sm font-medium text-gray-900">
                      Active in the store
                    </span>
                    <span className="block text-xs text-gray-500">
                      Inactive products are hidden from the catalog and search.
                    </span>
                  </span>
                  <Switch
                    checked={form.status === 'ACTIVE'}
                    onChange={(v) => setForm((f) => ({ ...f, status: v ? 'ACTIVE' : 'INACTIVE' }))}
                    label="Active in the store"
                  />
                </label>
                <div className="divider" />
                <label className="flex items-center justify-between gap-4">
                  <span>
                    <span className="block text-sm font-medium text-gray-900">
                      Feature on the landing page
                    </span>
                    <span className="block text-xs text-gray-500">
                      Appears in the “Ready to customize” row.
                    </span>
                  </span>
                  <Switch
                    checked={form.featured}
                    onChange={(v) => setForm((f) => ({ ...f, featured: v }))}
                    label="Feature on the landing page"
                  />
                </label>
              </div>
            </SectionCard>

            <div className="flex justify-end">
              <button className="btn-primary" disabled={busy}>
                {busy && <Spinner className="h-4 w-4 text-white" />}
                {isNew ? 'Create product' : 'Save details'}
              </button>
            </div>
          </form>
        )}

        {tab === 'variants' && product && <VariantsTab product={product} onChanged={reload} />}
        {tab === 'areas' && product && <PrintAreasTab product={product} onChanged={reload} />}
        {tab === 'images' && product && <ImagesTab product={product} onChanged={reload} />}
        {tab === 'model' && product && <ModelTab product={product} onChanged={reload} />}
      </div>
    </div>
  );
}
