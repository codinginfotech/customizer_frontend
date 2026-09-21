import { FormEvent, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, FolderTree, Pencil, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminCategories, adminFetchCategories } from '../../services/adminService';
import { apiErrorMessage } from '../../services/apiClient';
import type { Category } from '../../types/catalog';
import {
  Badge,
  ConfirmDialog,
  EmptyState,
  Field,
  Modal,
  PageHeader,
  Skeleton,
  Spinner,
} from '../../components/ui';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: '', description: '' });
  const [busy, setBusy] = useState(false);

  async function reload() {
    setCategories(await adminFetchCategories());
  }
  useEffect(() => {
    void reload().catch(() => setCategories([]));
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (editing) {
        await adminCategories.update(editing.id, form);
        toast.success('Category updated');
      } else {
        await adminCategories.create(form);
        toast.success('Category created');
      }
      setCreating(false);
      setEditing(null);
      await reload();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function move(index: number, dir: -1 | 1) {
    if (!categories) return;
    const next = [...categories];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setCategories(next);
    await adminCategories
      .reorder(next.map((c, i) => ({ id: c.id, sortOrder: i })))
      .catch((err) => toast.error(apiErrorMessage(err)));
  }

  async function remove() {
    if (!deleting) return;
    setBusy(true);
    try {
      await adminCategories.remove(deleting.id);
      toast.success('Category deleted');
      setDeleting(null);
      await reload();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow="Catalog"
        title="Categories"
        description="Storefront grouping and ordering. Drag order is set with the arrows."
        actions={
          <button
            className="btn-primary"
            onClick={() => {
              setForm({ name: '', description: '' });
              setEditing(null);
              setCreating(true);
            }}
          >
            <Plus className="h-4 w-4" /> Add category
          </button>
        }
      />

      <div className="card mt-7 overflow-hidden">
        {categories === null ? (
          <div className="space-y-2 p-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="p-5">
            <EmptyState
              compact
              icon={<FolderTree className="h-5 w-5" strokeWidth={1.8} />}
              title="No categories yet"
              description="Create one to start grouping products in the storefront."
            />
          </div>
        ) : (
          <ul>
            {categories.map((category, i) => (
              <li
                key={category.id}
                className="group flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0 hover:bg-gray-50/70"
              >
                <div className="flex flex-col text-gray-300">
                  <button
                    className="rounded transition-colors hover:text-gray-700 disabled:opacity-30"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label={`Move ${category.name} up`}
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className="rounded transition-colors hover:text-gray-700 disabled:opacity-30"
                    onClick={() => move(i, 1)}
                    disabled={i === categories.length - 1}
                    aria-label={`Move ${category.name} down`}
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{category.name}</p>
                  <p className="truncate text-xs text-gray-500">
                    /{category.slug} · {category._count?.products ?? 0} product
                    {category._count?.products === 1 ? '' : 's'}
                  </p>
                </div>

                <Badge tone={category.status === 'ACTIVE' ? 'success' : 'neutral'} dot>
                  {category.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                </Badge>

                <div className="flex gap-0.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                  <button
                    className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    aria-label={`Edit ${category.name}`}
                    onClick={() => {
                      setEditing(category);
                      setForm({ name: category.name, description: category.description ?? '' });
                      setCreating(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-700"
                    aria-label={`Delete ${category.name}`}
                    onClick={() => setDeleting(category)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title={editing ? 'Edit category' : 'New category'}
        size="sm"
      >
        <form onSubmit={submit} className="space-y-5">
          <Field label="Name" required>
            <input
              className="input"
              required
              minLength={2}
              autoFocus
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </Field>
          <Field label="Description" hint="Shown on category listing pages.">
            <textarea
              className="input"
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </Field>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-ghost" onClick={() => setCreating(false)}>
              Cancel
            </button>
            <button className="btn-primary" disabled={busy}>
              {busy && <Spinner className="h-3.5 w-3.5 text-white" />}
              {editing ? 'Save changes' : 'Create category'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={remove}
        title="Delete category?"
        message={`“${deleting?.name}” will be removed. Categories that still hold products cannot be deleted.`}
        busy={busy}
      />
    </div>
  );
}
