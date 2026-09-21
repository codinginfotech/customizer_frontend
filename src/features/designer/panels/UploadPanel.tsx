import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertTriangle, Trash2, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import { estimateDpi, ratePrintQuality } from '@cpd/shared';
import { useDesignerStore } from '../../../stores/designerStore';
import { useAuthStore } from '../../../stores/authStore';
import { useStorefrontStore } from '../../../stores/storefrontStore';
import { uploadStorefrontAsset } from '../../shopify/storefrontService';
import { deleteAsset, fetchAssets, uploadAsset } from '../../../services/catalogService';
import { apiErrorMessage } from '../../../services/apiClient';
import type { UploadedAsset } from '../../../types/catalog';
import { newElementId } from '../../../utils/id';
import { Spinner } from '../../../components/ui';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

const ACCEPT = '.png,.jpg,.jpeg,.webp,.svg';
const MAX_MB = 15;

export function UploadPanel() {
  const user = useAuthStore((s) => s.user);
  // Shopify storefront: anonymous uploads scoped to the store; the "library"
  // is just this session's uploads.
  const storefront = useStorefrontStore((s) => s.context);
  const [assets, setAssets] = useState<UploadedAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user || storefront) return;
    setLoading(true);
    fetchAssets()
      .then(setAssets)
      .catch(() => undefined)
      .finally(() => setLoading(false));
  }, [user, storefront]);

  const doUpload = useCallback(async (file: File) => {
    if (file.size > MAX_MB * 1024 * 1024) {
      toast.error(`File is larger than ${MAX_MB} MB`);
      return;
    }
    setUploading(true);
    try {
      const asset = storefront
        ? await uploadStorefrontAsset(storefront.shopDomain, file)
        : await uploadAsset(file);
      setAssets((prev) => [asset, ...prev]);
      addAssetToCanvas(asset);
      toast.success('Uploaded and added to canvas');
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Upload failed'));
    } finally {
      setUploading(false);
    }
  }, [storefront]);

  function addAssetToCanvas(asset: UploadedAsset) {
    const store = useDesignerStore.getState();
    const areaConfig = store.product?.printAreas.find((a) => a.key === store.activeAreaKey);
    if (!areaConfig) return;
    const natW = asset.metadata?.width || 400;
    const natH = asset.metadata?.height || 400;
    const maxW = areaConfig.safeArea.width * 0.8;
    const maxH = areaConfig.safeArea.height * 0.8;
    const scale = Math.min(maxW / natW, maxH / natH, 1.5);
    const width = Math.round(natW * scale);
    const height = Math.round(natH * scale);
    store.addElement({
      id: newElementId(),
      type: 'image',
      src: asset.fileUrl,
      x: Math.round((areaConfig.width - width) / 2),
      y: Math.round((areaConfig.height - height) / 2),
      width,
      height,
      naturalWidth: natW,
      naturalHeight: natH,
      // Storefront uploads have no library record (negative client-side id).
      assetId: asset.id > 0 ? asset.id : undefined,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      flipX: false,
      flipY: false,
      shadow: null,
    });
  }

  /** Print-quality estimate for an asset placed at ~80% of the active area. */
  function qualityFor(asset: UploadedAsset) {
    const store = useDesignerStore.getState();
    const areaConfig = store.product?.printAreas.find((a) => a.key === store.activeAreaKey);
    if (!areaConfig?.physicalWidthIn || !asset.metadata?.width) return null;
    if (asset.fileType === 'image/svg+xml') return null; // vectors scale freely
    const displayWidth = areaConfig.safeArea.width * 0.8;
    const dpi = estimateDpi(
      asset.metadata.width,
      displayWidth,
      areaConfig.width,
      areaConfig.physicalWidthIn,
    );
    return { dpi, rating: ratePrintQuality(dpi) };
  }

  if (!user && !storefront) {
    return (
      <div className="space-y-4">
        <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50/60 px-3 py-4 text-xs leading-relaxed text-gray-600">
          Sign in to upload your own artwork and build a reusable asset library.
        </p>
        <Link to="/login" className="btn-primary w-full">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div
        className={clsx(
          'flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed bg-white p-6 text-center transition-colors',
          dragOver ? 'border-gray-900 bg-gray-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50/60',
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) void doUpload(file);
        }}
      >
        {uploading ? (
          <Spinner className="h-5 w-5 text-gray-700" />
        ) : (
          <UploadCloud className="h-5 w-5 text-gray-400" strokeWidth={1.8} />
        )}
        <p className="text-xs font-medium text-gray-900">
          Drop artwork, or <span className="underline decoration-gray-300 underline-offset-2">browse</span>
        </p>
        <p className="text-2xs text-gray-500">PNG, JPG, WEBP, SVG · up to {MAX_MB} MB</p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void doUpload(file);
            e.target.value = '';
          }}
        />
      </div>

      <div>
        <p className="panel-title mb-2">Your uploads</p>
        {loading ? (
          <div className="flex justify-center py-6">
            <Spinner />
          </div>
        ) : assets.length === 0 ? (
          <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50/60 px-3 py-5 text-center text-2xs text-gray-500">
            Nothing here yet — upload your first image.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {assets.map((asset) => {
              const q = qualityFor(asset);
              return (
                <div key={asset.id} className="group relative">
                  <button
                    className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-surface-sunken p-1.5 transition-colors hover:border-gray-400"
                    onClick={() => addAssetToCanvas(asset)}
                    title={`${asset.fileName}${q ? ` · ~${q.dpi} DPI` : ''}`}
                  >
                    <img
                      src={asset.fileUrl}
                      alt={asset.fileName}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </button>
                  {q && q.rating !== 'good' && (
                    <span
                      className={clsx(
                        'absolute left-1 top-1 flex items-center gap-0.5 rounded border px-1 py-0.5 text-[9px] font-medium tabular',
                        q.rating === 'acceptable'
                          ? 'border-amber-200 bg-amber-50 text-amber-800'
                          : 'border-red-200 bg-red-50 text-red-800',
                      )}
                    >
                      <AlertTriangle className="h-2.5 w-2.5" />
                      {q.dpi} DPI
                    </span>
                  )}
                  <button
                    className="absolute right-1 top-1 rounded-md border border-gray-200 bg-white/95 p-1 text-gray-500 opacity-0 shadow-card backdrop-blur transition-opacity hover:text-red-700 focus-visible:opacity-100 group-hover:opacity-100"
                    onClick={async () => {
                      if (asset.id > 0) await deleteAsset(asset.id).catch(() => undefined);
                      setAssets((prev) => prev.filter((a) => a.id !== asset.id));
                    }}
                    title="Delete asset"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
