import { useEffect, useRef, useState } from 'react';
import { ImagePlus, Trash2, UploadCloud } from 'lucide-react';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import { deleteAsset, fetchAssets, uploadAsset } from '../../services/catalogService';
import { apiErrorMessage } from '../../services/apiClient';
import type { UploadedAsset } from '../../types/catalog';
import { ConfirmDialog, EmptyState, PageHeader, Skeleton, Spinner } from '../../components/ui';
import { formatBytes, formatDate } from '../../utils/format';

export default function AssetsPage() {
  const [assets, setAssets] = useState<UploadedAsset[] | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [deleting, setDeleting] = useState<UploadedAsset | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchAssets()
      .then(setAssets)
      .catch(() => setAssets([]));
  }, []);

  async function onUpload(file: File) {
    setUploading(true);
    try {
      const asset = await uploadAsset(file);
      setAssets((prev) => (prev ? [asset, ...prev] : [asset]));
      toast.success('Uploaded');
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Upload failed'));
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete() {
    if (!deleting) return;
    setBusy(true);
    try {
      await deleteAsset(deleting.id);
      setAssets((prev) => (prev ? prev.filter((a) => a.id !== deleting.id) : prev));
      toast.success('Asset deleted');
      setDeleting(null);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept=".png,.jpg,.jpeg,.webp,.svg"
      className="hidden"
      onChange={(e) => {
        const f = e.target.files?.[0];
        if (f) void onUpload(f);
        e.target.value = '';
      }}
    />
  );

  return (
    <div>
      <PageHeader
        eyebrow="Workspace"
        title="Assets"
        description="Artwork you upload in the designer is stored here and reusable across products."
        actions={
          <button
            className="btn-primary"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <Spinner className="h-4 w-4 text-white" />
            ) : (
              <UploadCloud className="h-4 w-4" />
            )}
            {uploading ? 'Uploading…' : 'Upload'}
          </button>
        }
      />
      {fileInput}

      {/* Drop target doubles as the empty state */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files?.[0];
          if (f) void onUpload(f);
        }}
        className={clsx(
          'mt-7 rounded-xl transition-colors',
          dragging && 'ring-2 ring-brand-500 ring-offset-4',
        )}
      >
        {assets === null ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        ) : assets.length === 0 ? (
          <EmptyState
            icon={<ImagePlus className="h-5 w-5" strokeWidth={1.8} />}
            title="No assets yet"
            description="Drag an image here, or upload one — PNG, JPG, WEBP and SVG are supported."
            action={
              <button className="btn-secondary" onClick={() => inputRef.current?.click()}>
                Choose a file
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
            {assets.map((asset) => (
              <figure key={asset.id} className="group">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-surface-sunken p-3 transition-colors group-hover:border-gray-300">
                  <div className="absolute inset-0 bg-grid opacity-50" aria-hidden />
                  <img
                    src={asset.fileUrl}
                    alt={asset.fileName}
                    className="relative h-full w-full object-contain"
                    loading="lazy"
                  />
                  <button
                    className="absolute right-2 top-2 rounded-md border border-gray-200 bg-white/95 p-1.5 text-gray-500 opacity-0 shadow-card backdrop-blur transition-all hover:text-red-700 focus-visible:opacity-100 group-hover:opacity-100"
                    onClick={() => setDeleting(asset)}
                    aria-label={`Delete ${asset.fileName}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <figcaption className="pt-2.5">
                  <p className="truncate text-xs font-medium text-gray-900" title={asset.fileName}>
                    {asset.fileName}
                  </p>
                  <p className="mt-0.5 truncate text-2xs tabular text-gray-500">
                    {asset.metadata ? `${asset.metadata.width}×${asset.metadata.height} · ` : ''}
                    {formatBytes(asset.fileSize)} · {formatDate(asset.createdAt)}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete asset?"
        message={`“${deleting?.fileName}” will be removed from your library. Designs that already use it keep their copy.`}
        busy={busy}
      />
    </div>
  );
}
