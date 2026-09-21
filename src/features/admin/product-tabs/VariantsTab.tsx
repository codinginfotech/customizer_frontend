import { FormEvent, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminVariants } from '../../../services/adminService';
import { apiErrorMessage } from '../../../services/apiClient';
import type { Product, ProductVariant } from '../../../types/catalog';
import { Badge, Modal, Spinner } from '../../../components/ui';
import { formatPrice } from '../../../utils/format';

const EMPTY = {
  name: '',
  colorName: '',
  color: '#ffffff',
  size: '',
  material: '',
  sku: '',
  price: '',
  stock: '100',
};

export function VariantsTab({ product, onChanged }: { product: Product; onChanged: () => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await adminVariants.create(product.id, {
        name: form.name || [form.colorName, form.size].filter(Boolean).join(' / ') || 'Default',
        color: form.colorName ? form.color : null,
        colorName: form.colorName || null,
        size: form.size || null,
        material: form.material || null,
        sku: form.sku,
        price: form.price ? Number(form.price) : null,
        stock: Number(form.stock) || 0,
      });
      toast.success('Variant added');
      setForm(EMPTY);
      setOpen(false);
      await onChanged();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function toggle(variant: ProductVariant) {
    await adminVariants
      .update(product.id, variant.id, {
        status: variant.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      })
      .catch((err) => toast.error(apiErrorMessage(err)));
    await onChanged();
  }

  async function remove(variant: ProductVariant) {
    await adminVariants.remove(product.id, variant.id).catch((err) => toast.error(apiErrorMessage(err)));
    await onChanged();
  }

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
        <p className="font-semibold text-gray-900">Variants (color / size / material)</p>
        <button className="btn-primary btn-sm" onClick={() => setOpen(true)}>
          <Plus className="h-3.5 w-3.5" /> Add variant
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Color</th>
              <th>Size</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {product.variants.map((v) => (
              <tr key={v.id}>
                <td className="font-medium text-gray-900">{v.name}</td>
                <td>
                  {v.color ? (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-3.5 w-3.5 rounded-full" style={{
                          background: v.color,
                          boxShadow: 'inset 0 0 0 1px rgba(26,24,22,.18)',
                        }}
                      />
                      <span className="text-gray-600">{v.colorName}</span>
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="text-gray-600">{v.size ?? '—'}</td>
                <td className="font-mono text-xs text-gray-500">{v.sku}</td>
                <td>{v.price !== null ? formatPrice(v.price) : 'base'}</td>
                <td className="text-gray-600">{v.stock}</td>
                <td>
                  <button onClick={() => toggle(v)}>
                    <Badge
                      className={
                        v.status === 'ACTIVE'
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                          : 'border-gray-200 bg-gray-100 text-gray-500'
                      }
                    >
                      {v.status === 'ACTIVE' ? 'Active' : 'Off'}
                    </Badge>
                  </button>
                </td>
                <td className="text-right">
                  <button className="btn-ghost p-1 text-red-500" onClick={() => remove(v)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
            {product.variants.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-8 text-center text-gray-400">
                  No variants yet — add colors and sizes so customers can choose.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Add variant" size="md">
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="label">Color name</label>
            <input className="input" value={form.colorName} onChange={(e) => setForm((f) => ({ ...f, colorName: e.target.value }))} placeholder="e.g. Navy" />
          </div>
          <div>
            <label className="label">Color</label>
            <input type="color" className="input h-9 p-1" value={form.color} onChange={(e) => setForm((f) => ({ ...f, color: e.target.value }))} />
          </div>
          <div>
            <label className="label">Size</label>
            <input className="input" value={form.size} onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))} placeholder="e.g. XL / 11oz" />
          </div>
          <div>
            <label className="label">Material</label>
            <input className="input" value={form.material} onChange={(e) => setForm((f) => ({ ...f, material: e.target.value }))} />
          </div>
          <div>
            <label className="label">SKU *</label>
            <input className="input" required value={form.sku} onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))} />
          </div>
          <div>
            <label className="label">Price override ($)</label>
            <input className="input" type="number" min={0} step="0.01" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="uses base price" />
          </div>
          <div>
            <label className="label">Stock</label>
            <input className="input" type="number" min={0} value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} />
          </div>
          <div className="sm:col-span-2">
            <button className="btn-primary w-full" disabled={busy}>
              {busy && <Spinner className="h-4 w-4 text-white" />}
              Add variant
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
