import { useState } from 'react';
import { Star, Trash2, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminImages, adminUploadImage } from '../../../services/adminService';
import { apiErrorMessage } from '../../../services/apiClient';
import type { Product } from '../../../types/catalog';
import { Spinner } from '../../../components/ui';

export function ImagesTab({ product, onChanged }: { product: Product; onChanged: () => Promise<void> }) {
  const [busy, setBusy] = useState(false);

  async function upload(file: File, isPrimary: boolean) {
    setBusy(true);
    try {
      const { url } = await adminUploadImage(file, 'products');
      await adminImages.create(product.id, { url, alt: product.name, isPrimary });
      toast.success('Image added');
      await onChanged();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function remove(imageId: number) {
    await adminImages.remove(product.id, imageId).catch((err) => toast.error(apiErrorMessage(err)));
    await onChanged();
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900">Product images</p>
          <p className="text-xs text-gray-400">The primary image is used on cards and listings.</p>
        </div>
        <label className="btn-primary btn-sm cursor-pointer">
          {busy ? <Spinner className="h-3.5 w-3.5 text-white" /> : <UploadCloud className="h-3.5 w-3.5" />}
          Upload image
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.webp,.svg"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload(f, product.images.length === 0);
              e.target.value = '';
            }}
          />
        </label>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {product.images.map((img) => (
          <div key={img.id} className="group relative rounded-lg border border-gray-200 bg-surface-sunken p-2 transition-colors hover:border-gray-300">
            <img src={img.url} alt={img.alt ?? ''} className="h-28 w-full object-contain" />
            {img.isPrimary && (
              <span className="absolute left-1.5 top-1.5 flex items-center gap-0.5 rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                <Star className="h-2.5 w-2.5" /> Primary
              </span>
            )}
            <button
              className="absolute right-1.5 top-1.5 rounded-md border border-gray-200 bg-white/95 p-1 text-gray-500 opacity-0 shadow-card backdrop-blur transition-opacity hover:text-red-700 focus-visible:opacity-100 group-hover:opacity-100"
              onClick={() => remove(img.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        {product.images.length === 0 && (
          <p className="col-span-full py-6 text-center text-sm text-gray-400">No images yet.</p>
        )}
      </div>
    </div>
  );
}
