import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Copy, MoreHorizontal, Palette, Pencil, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  deleteDesign,
  duplicateDesign,
  fetchDesigns,
  updateDesign,
} from '../../services/catalogService';
import { apiErrorMessage } from '../../services/apiClient';
import type { DesignSummary } from '../../types/catalog';
import {
  ConfirmDialog,
  EmptyState,
  Menu,
  MenuItem,
  MenuSeparator,
  Modal,
  PageHeader,
  Skeleton,
  Spinner,
} from '../../components/ui';
import { formatRelative } from '../../utils/format';

export default function MyDesignsPage() {
  const [designs, setDesigns] = useState<DesignSummary[] | null>(null);
  const [renaming, setRenaming] = useState<DesignSummary | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [deleting, setDeleting] = useState<DesignSummary | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDesigns()
      .then(setDesigns)
      .catch(() => setDesigns([]));
  }, []);

  function editUrl(design: DesignSummary) {
    return `/designer/${design.product?.slug}?design=${design.id}`;
  }

  async function handleDuplicate(design: DesignSummary) {
    try {
      const copy = await duplicateDesign(design.id);
      setDesigns((prev) => (prev ? [{ ...design, ...copy }, ...prev] : prev));
      toast.success('Design duplicated');
    } catch (err) {
      toast.error(apiErrorMessage(err));
    }
  }

  async function handleRename() {
    if (!renaming) return;
    setBusy(true);
    try {
      await updateDesign(renaming.id, { name: renameValue });
      setDesigns((prev) =>
        prev ? prev.map((d) => (d.id === renaming.id ? { ...d, name: renameValue } : d)) : prev,
      );
      toast.success('Renamed');
      setRenaming(null);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setBusy(true);
    try {
      await deleteDesign(deleting.id);
      setDesigns((prev) => (prev ? prev.filter((d) => d.id !== deleting.id) : prev));
      toast.success('Design deleted');
      setDeleting(null);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Workspace"
        title="Designs"
        description="Everything you have saved. Open one to keep editing — autosave keeps versions."
        actions={
          <Link to="/products" className="btn-primary">
            <Plus className="h-4 w-4" /> New design
          </Link>
        }
      />

      <div className="mt-7">
        {designs === null ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-[4/5] w-full" />
                <Skeleton className="mt-3 h-4 w-28" />
              </div>
            ))}
          </div>
        ) : designs.length === 0 ? (
          <EmptyState
            icon={<Palette className="h-5 w-5" strokeWidth={1.8} />}
            title="No designs yet"
            description="Pick a product and start creating — everything you save lands here."
            action={
              <Link to="/products" className="btn-primary">
                Browse catalog
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {designs.map((design) => (
              <article key={design.id} className="group flex flex-col">
                <button
                  onClick={() => navigate(editUrl(design))}
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-gray-200 bg-surface-sunken p-4 transition-colors hover:border-gray-300"
                >
                  <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
                  {design.previewImage ? (
                    <img
                      src={design.previewImage}
                      alt={design.name}
                      className="relative h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <span className="relative flex h-full items-center justify-center text-gray-300">
                      <Palette className="h-7 w-7" strokeWidth={1.5} />
                    </span>
                  )}
                  <span className="pointer-events-none absolute inset-x-3 bottom-3 hidden translate-y-1.5 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 sm:block">
                    <span className="btn btn-sm w-full bg-gray-900 text-white shadow-raised">
                      Continue editing
                    </span>
                  </span>
                </button>

                <div className="flex items-start justify-between gap-1.5 pt-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-gray-900">{design.name}</h3>
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {design.product?.name} · edited {formatRelative(design.updatedAt)}
                    </p>
                  </div>

                  <Menu
                    trigger={({ open, toggle }) => (
                      <button
                        onClick={toggle}
                        aria-label={`Actions for ${design.name}`}
                        className={`-mr-1 shrink-0 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 ${
                          open ? 'bg-gray-100 text-gray-700' : ''
                        }`}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    )}
                  >
                    <MenuItem
                      icon={<Pencil className="h-4 w-4" />}
                      onClick={() => navigate(editUrl(design))}
                    >
                      Continue editing
                    </MenuItem>
                    <MenuItem
                      icon={<Pencil className="h-4 w-4" />}
                      onClick={() => {
                        setRenaming(design);
                        setRenameValue(design.name);
                      }}
                    >
                      Rename
                    </MenuItem>
                    <MenuItem
                      icon={<Copy className="h-4 w-4" />}
                      onClick={() => void handleDuplicate(design)}
                    >
                      Duplicate
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem
                      danger
                      icon={<Trash2 className="h-4 w-4" />}
                      onClick={() => setDeleting(design)}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Modal
        open={Boolean(renaming)}
        onClose={() => setRenaming(null)}
        title="Rename design"
        size="sm"
        footer={
          <>
            <button className="btn-ghost" onClick={() => setRenaming(null)}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={handleRename}
              disabled={busy || !renameValue.trim()}
            >
              {busy && <Spinner className="h-3.5 w-3.5 text-white" />}
              Rename
            </button>
          </>
        }
      >
        <label className="label" htmlFor="design-name">
          Design name
        </label>
        <input
          id="design-name"
          className="input"
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && renameValue.trim() && void handleRename()}
          maxLength={160}
          autoFocus
        />
      </Modal>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete design?"
        message={`“${deleting?.name}” will be permanently deleted. Orders that already used it keep their own snapshot.`}
        busy={busy}
      />
    </div>
  );
}
