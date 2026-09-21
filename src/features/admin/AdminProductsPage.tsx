import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Boxes, Package, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  adminDeleteProduct,
  adminFetchProducts,
  adminUpdateProduct,
} from '../../services/adminService';
import { apiErrorMessage } from '../../services/apiClient';
import type { Product } from '../../types/catalog';
import { Badge, ConfirmDialog, EmptyState, PageHeader, Skeleton, Tooltip } from '../../components/ui';
import { formatPrice } from '../../utils/format';
import { useDebouncedValue } from '../../hooks/useDebounce';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [busy, setBusy] = useState(false);
  const debounced = useDebouncedValue(search, 300);

  async function reload() {
    const { items } = await adminFetchProducts({ search: debounced || undefined, pageSize: 60 });
    setProducts(items);
  }

  useEffect(() => {
    setProducts(null);
    void reload().catch(() => setProducts([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  async function toggleStatus(product: Product) {
    try {
      const updated = await adminUpdateProduct(product.id, {
        status: product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      });
      setProducts((prev) => prev?.map((p) => (p.id === product.id ? updated : p)) ?? null);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setBusy(true);
    try {
      const result = await adminDeleteProduct(deleting.id);
      toast.success(result.archived ? 'Product archived (it has orders)' : 'Product deleted');
      setDeleting(null);
      await reload();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Catalog"
        title="Products"
        description="Every SKU, its print areas, variants and 3D model."
        actions={
          <>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                strokeWidth={1.8}
              />
              <input
                className="input w-52 pl-9"
                placeholder="Search products…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Link to="/admin/products/new" className="btn-primary">
              <Plus className="h-4 w-4" /> Add product
            </Link>
          </>
        }
      />

      <div className="card mt-7 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th className="text-right">Price</th>
                <th className="text-right">Variants</th>
                <th className="text-right">Areas</th>
                <th>3D</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products === null ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={8} className="px-4 py-3">
                      <Skeleton className="h-10" />
                    </td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-6">
                    <EmptyState
                      compact
                      icon={<Package className="h-5 w-5" strokeWidth={1.8} />}
                      title="No products found"
                      description={
                        search ? 'Try a different search term.' : 'Add your first product to begin.'
                      }
                    />
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-surface-sunken p-1">
                          {product.images[0] && (
                            <img
                              src={product.images[0].url}
                              alt=""
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-gray-900">{product.name}</p>
                          <p className="truncate text-xs text-gray-400">/{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-gray-600">{product.category.name}</td>
                    <td className="text-right font-medium tabular text-gray-900">
                      {formatPrice(product.basePrice)}
                    </td>
                    <td className="text-right tabular text-gray-600">{product.variants.length}</td>
                    <td className="text-right tabular text-gray-600">
                      {product.printAreas.length}
                    </td>
                    <td>
                      {product.model ? (
                        <Badge tone="neutral">
                          <Boxes className="h-3 w-3" strokeWidth={2} />
                          {product.model.modelType === 'GLTF' ? 'GLB' : 'Primitive'}
                        </Badge>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                    <td>
                      <Tooltip label={product.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}>
                        <button onClick={() => toggleStatus(product)} className="align-middle">
                          <Badge tone={product.status === 'ACTIVE' ? 'success' : 'neutral'} dot>
                            {product.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                          </Badge>
                        </button>
                      </Tooltip>
                    </td>
                    <td>
                      <div className="flex justify-end gap-0.5">
                        <Link
                          to={`/admin/products/${product.id}`}
                          className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                          title="Edit product"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-700"
                          onClick={() => setDeleting(product)}
                          title="Delete product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete product?"
        message={`“${deleting?.name}” will be deleted, or archived instead if existing orders reference it.`}
        busy={busy}
      />
    </div>
  );
}
