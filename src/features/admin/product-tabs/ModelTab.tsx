import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Trash2, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import { modelConfigurationSchema, PrimitiveKind, type ModelValidationReport } from '@cpd/shared';
import {
  adminRemoveModel,
  adminUploadModel,
  adminUpsertModel,
} from '../../../services/adminService';
import { apiErrorMessage } from '../../../services/apiClient';
import type { Product } from '../../../types/catalog';
import { Spinner } from '../../../components/ui';

const PRIMITIVE_KINDS: PrimitiveKind[] = ['apparel', 'mug', 'bottle', 'cylinder', 'flat', 'box', 'pan'];

/**
 * 3D model configuration:
 *  - PRIMITIVE: a parametric placeholder rendered by the app (no file needed).
 *  - GLTF: a real .glb/.gltf uploaded here; mesh bindings connect print areas
 *    to the model's mesh names.
 */
export function ModelTab({ product, onChanged }: { product: Product; onChanged: () => Promise<void> }) {
  const existing = product.model;
  const existingConfig = existing
    ? modelConfigurationSchema.safeParse(existing.configuration)
    : null;

  const [modelType, setModelType] = useState<'GLTF' | 'PRIMITIVE'>(existing?.modelType ?? 'PRIMITIVE');
  const [modelUrl, setModelUrl] = useState(existing?.modelUrl ?? '');
  const [primitiveKind, setPrimitiveKind] = useState<PrimitiveKind>(
    existingConfig?.success ? existingConfig.data.primitive?.kind ?? 'flat' : 'flat',
  );
  const [bindings, setBindings] = useState<Array<{ mesh: string; areaKey: string }>>(
    existingConfig?.success
      ? existingConfig.data.meshBindings
      : product.printAreas
          .filter((a) => a.modelMeshName)
          .map((a) => ({ mesh: a.modelMeshName as string, areaKey: a.key })),
  );
  const [colorMeshes, setColorMeshes] = useState(
    existingConfig?.success ? existingConfig.data.colorMeshes.join(', ') : 'body',
  );
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [validation, setValidation] = useState<ModelValidationReport | null>(
    (existing?.validation as ModelValidationReport | null | undefined) ?? null,
  );

  async function uploadGlb(file: File) {
    setUploading(true);
    try {
      const { url, validation: report } = await adminUploadModel(file);
      setModelUrl(url);
      setModelType('GLTF');
      setValidation(report);
      const warns = report.checks.filter((c) => c.level === 'warn').length;
      toast.success(
        `Model validated — quality ${report.score}/100${warns ? `, ${warns} warning${warns > 1 ? 's' : ''}` : ''}`,
      );
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setUploading(false);
    }
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await adminUpsertModel(product.id, {
        modelType,
        modelUrl: modelType === 'GLTF' ? modelUrl || null : null,
        configuration: {
          type: modelType,
          primitive:
            modelType === 'PRIMITIVE'
              ? { kind: primitiveKind, width: 1, height: 1.2, depth: 0.3 }
              : undefined,
          meshBindings: bindings.filter((b) => b.mesh && b.areaKey),
          colorMeshes: colorMeshes
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          cameraDistance: 2.2,
          metalness: 0.05,
          roughness: 0.8,
        },
        validation: modelType === 'GLTF' ? validation : null,
      });
      toast.success('3D model configuration saved');
      await onChanged();
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function removeModel() {
    await adminRemoveModel(product.id).catch((err) => toast.error(apiErrorMessage(err)));
    toast.success('3D model removed — product falls back to the 2D mockup');
    await onChanged();
  }

  return (
    <form onSubmit={save} className="card max-w-2xl space-y-5 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-gray-900">3D preview model</p>
          <p className="text-xs text-gray-400">
            Without a model, the designer shows the high-quality 2D mockup instead.
          </p>
        </div>
        {existing && (
          <button type="button" className="btn-ghost p-1.5 text-red-500" onClick={removeModel} title="Remove model">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="flex gap-3">
        {(['PRIMITIVE', 'GLTF'] as const).map((type) => (
          <label
            key={type}
            className={`flex flex-1 cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm ${
              modelType === type ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              checked={modelType === type}
              onChange={() => setModelType(type)}
              className="accent-brand-600"
            />
            <div>
              <p className="font-medium text-gray-900">
                {type === 'PRIMITIVE' ? 'Built-in primitive' : 'Uploaded GLB/GLTF'}
              </p>
              <p className="text-2xs text-gray-500">
                {type === 'PRIMITIVE' ? 'Parametric placeholder shape' : 'Real product model file'}
              </p>
            </div>
          </label>
        ))}
      </div>

      {modelType === 'PRIMITIVE' ? (
        <div>
          <label className="label">Primitive kind</label>
          <select
            className="input"
            value={primitiveKind}
            onChange={(e) => setPrimitiveKind(e.target.value as PrimitiveKind)}
          >
            {PRIMITIVE_KINDS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="label">Model file (.glb / .gltf)</label>
          <div className="flex items-center gap-2">
            <input
              className="input flex-1 font-mono text-xs"
              value={modelUrl}
              onChange={(e) => setModelUrl(e.target.value)}
              placeholder="/uploads/models/…"
            />
            <label className="btn-secondary cursor-pointer px-3 py-2 text-xs">
              {uploading ? <Spinner className="h-3.5 w-3.5" /> : <UploadCloud className="h-3.5 w-3.5" />}
              Upload
              <input
                type="file"
                accept=".glb,.gltf"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void uploadGlb(f);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        </div>
      )}

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label className="label mb-0">Mesh bindings (mesh → print area)</label>
          <button
            type="button"
            className="text-xs font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-900"
            onClick={() => setBindings((b) => [...b, { mesh: '', areaKey: product.printAreas[0]?.key ?? '' }])}
          >
            + Add binding
          </button>
        </div>
        <div className="space-y-2">
          {bindings.map((binding, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className="input flex-1 font-mono text-xs"
                placeholder="mesh name"
                value={binding.mesh}
                onChange={(e) =>
                  setBindings((b) => b.map((x, j) => (j === i ? { ...x, mesh: e.target.value } : x)))
                }
              />
              <span className="text-gray-400">→</span>
              <select
                className="input flex-1 text-xs"
                value={binding.areaKey}
                onChange={(e) =>
                  setBindings((b) => b.map((x, j) => (j === i ? { ...x, areaKey: e.target.value } : x)))
                }
              >
                {product.printAreas.map((a) => (
                  <option key={a.key} value={a.key}>
                    {a.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn-ghost p-1 text-red-400"
                onClick={() => setBindings((b) => b.filter((_, j) => j !== i))}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {bindings.length === 0 && (
            <p className="text-xs text-gray-400">No bindings — the model will render without designs.</p>
          )}
        </div>
      </div>

      <div>
        <label className="label">Color meshes (tinted with the selected product color)</label>
        <input
          className="input font-mono text-xs"
          value={colorMeshes}
          onChange={(e) => setColorMeshes(e.target.value)}
          placeholder="body, handle"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="btn-primary" disabled={busy}>
          {busy ? <Spinner className="h-4 w-4 text-white" /> : <Box className="h-4 w-4" />}
          Save 3D configuration
        </button>
        {existing?.modelType === 'GLTF' && existing.modelUrl && (
          <Link to={`/admin/products/${product.id}/studio`} className="btn-secondary">
            Open 3D Studio →
          </Link>
        )}
      </div>
    </form>
  );
}
