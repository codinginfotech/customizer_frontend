import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import toast from 'react-hot-toast';
import { Camera, CheckCircle2, Info, Save, XCircle } from 'lucide-react';
import clsx from 'clsx';
import {
  areaKeyFromMesh,
  modelConfigurationSchema,
  type MeshBinding,
  type ModelConfiguration,
  type ModelValidationReport,
} from '@cpd/shared';
import {
  adminFetchProduct,
  adminUpsertModel,
  adminUploadImage,
  adminImages,
} from '../../services/adminService';
import { apiErrorMessage } from '../../services/apiClient';
import type { Product } from '../../types/catalog';
import { PageSpinner, Spinner, Badge } from '../../components/ui';
import { StudioEnvironment } from '../../engine3d/rigs';

interface MeshInfo {
  name: string;
  materialName: string;
  triangles: number;
  hasUV: boolean;
}

function InspectableModel({
  url,
  selected,
  colorMeshes,
  onMeshes,
  onPick,
}: {
  url: string;
  selected: string | null;
  colorMeshes: string[];
  onMeshes: (meshes: MeshInfo[]) => void;
  onPick: (name: string) => void;
}) {
  const { scene } = useGLTF(url, '/draco/');
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const meshes: MeshInfo[] = [];
    cloned.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const material = Array.isArray(obj.material) ? obj.material[0] : obj.material;
      meshes.push({
        name: obj.name,
        materialName: material?.name ?? '—',
        triangles: Math.floor((obj.geometry.getIndex()?.count ?? obj.geometry.getAttribute('position').count) / 3),
        hasUV: Boolean(obj.geometry.getAttribute('uv')),
      });
    });
    onMeshes(meshes);
  }, [cloned, onMeshes]);

  useEffect(() => {
    cloned.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const isZone = obj.name.startsWith('zone_');
      const isSelected = obj.name === selected;
      const isColor = colorMeshes.includes(obj.name);
      const material = new THREE.MeshStandardMaterial({
        color: isSelected ? '#3b63f6' : isZone ? '#7c8db5' : isColor ? '#d9dee7' : '#b9bfc9',
        roughness: 0.7,
        metalness: 0.05,
        side: THREE.DoubleSide,
        wireframe: isZone && !isSelected,
        transparent: isZone,
        opacity: isZone ? 0.85 : 1,
      });
      obj.material = material;
    });
  }, [cloned, selected, colorMeshes]);

  return (
    <primitive
      object={cloned}
      onClick={(e: { stopPropagation: () => void; object: THREE.Object3D }) => {
        e.stopPropagation();
        onPick(e.object.name);
      }}
    />
  );
}

/**
 * Admin 3D Studio (§38–41): inspect the product model, click meshes to see
 * name/material/UVs, bind zones to print areas, review the validation report
 * and quality score, and capture a catalog thumbnail from the live scene.
 */
export default function AdminModelStudio() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [meshes, setMeshes] = useState<MeshInfo[]>([]);
  const [selectedMesh, setSelectedMesh] = useState<string | null>(null);
  const [bindings, setBindings] = useState<MeshBinding[]>([]);
  const [colorMeshes, setColorMeshes] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const config: ModelConfiguration | null = useMemo(() => {
    if (!product?.model) return null;
    const parsed = modelConfigurationSchema.safeParse(product.model.configuration);
    return parsed.success ? parsed.data : null;
  }, [product]);

  useEffect(() => {
    if (!id) return;
    adminFetchProduct(Number(id))
      .then((p) => {
        setProduct(p);
        const parsed = modelConfigurationSchema.safeParse(p.model?.configuration ?? {});
        if (parsed.success) {
          setBindings(parsed.data.meshBindings);
          setColorMeshes(parsed.data.colorMeshes);
        }
      })
      .catch(() => toast.error('Product not found'));
  }, [id]);

  if (!product) return <PageSpinner />;
  const model = product.model;
  const validation = (model?.validation ?? null) as ModelValidationReport | null;

  if (!model?.modelUrl || model.modelType !== 'GLTF' || !config) {
    return (
      <div className="max-w-xl">
        <Link to={`/admin/products/${product.id}`} className="text-sm text-gray-400 hover:text-gray-600">
          ← {product.name}
        </Link>
        <p className="mt-4 text-gray-600">
          This product has no uploaded GLB model yet. Upload one in the product's “3D model” tab,
          then return here to inspect and bind it.
        </p>
      </div>
    );
  }

  const selectedInfo = meshes.find((m) => m.name === selectedMesh);
  const selectedBinding = bindings.find((b) => b.mesh === selectedMesh);

  function setBinding(mesh: string, areaKey: string | '', mode: 'surface' | 'overlay') {
    setBindings((prev) => {
      const rest = prev.filter((b) => b.mesh !== mesh);
      return areaKey ? [...rest, { mesh, areaKey, mode }] : rest;
    });
  }

  async function save() {
    setBusy(true);
    try {
      await adminUpsertModel(product!.id, {
        modelType: 'GLTF',
        modelUrl: model!.modelUrl,
        thumbnailUrl: model!.thumbnailUrl,
        configuration: { ...config, meshBindings: bindings, colorMeshes },
        validation,
      });
      toast.success('Model configuration saved');
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  async function captureThumbnail() {
    const canvas = stageRef.current?.querySelector('canvas');
    if (!canvas) return;
    setBusy(true);
    try {
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/webp', 0.9));
      if (!blob) throw new Error('capture failed');
      const file = new File([blob], `${product!.slug}-3d.webp`, { type: 'image/webp' });
      const { url } = await adminUploadImage(file, 'products');
      await adminImages.create(product!.id, { url, alt: `${product!.name} 3D render`, isPrimary: false });
      toast.success('3D thumbnail captured and added to product images');
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Capture failed'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link to={`/admin/products/${product.id}`} className="text-sm text-gray-400 hover:text-gray-600">
            ← {product.name}
          </Link>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">3D Studio</h1>
        </div>
        <div className="flex items-center gap-2">
          {model.qualityScore !== null && model.qualityScore !== undefined && (
            <Badge
              className={clsx(
                model.qualityScore >= 80
                  ? 'bg-green-100 text-green-800'
                  : model.qualityScore >= 50
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-red-800',
              )}
            >
              3D Quality {model.qualityScore} / 100
            </Badge>
          )}
          <button className="btn-secondary" onClick={captureThumbnail} disabled={busy}>
            <Camera className="h-4 w-4" /> Capture thumbnail
          </button>
          <button className="btn-primary" onClick={save} disabled={busy}>
            {busy ? <Spinner className="h-4 w-4 text-white" /> : <Save className="h-4 w-4" />}
            Save bindings
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* Viewport */}
        <div ref={stageRef} className="card overflow-hidden lg:col-span-2" style={{ height: 520 }}>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [1.4, 1, 2.6], fov: 38 }}
            gl={{ preserveDrawingBuffer: true, antialias: true }}
          >
            <StudioEnvironment />
            <directionalLight position={[3, 6, 4]} intensity={0.8} castShadow />
            <Suspense fallback={null}>
              <InspectableModel
                url={model.modelUrl}
                selected={selectedMesh}
                colorMeshes={colorMeshes}
                onMeshes={setMeshes}
                onPick={setSelectedMesh}
              />
              <ContactShadows position={[0, -0.95, 0]} opacity={0.4} scale={7} blur={2.5} />
            </Suspense>
            <OrbitControls enableDamping dampingFactor={0.08} />
          </Canvas>
        </div>

        {/* Inspector */}
        <div className="space-y-4">
          <div className="card p-4">
            <p className="panel-title mb-2">Meshes ({meshes.length})</p>
            <ul className="max-h-44 space-y-0.5 overflow-y-auto scroll-thin">
              {meshes.map((m) => (
                <li key={m.name}>
                  <button
                    onClick={() => setSelectedMesh(m.name)}
                    className={clsx(
                      'flex w-full items-center justify-between rounded-md px-2 py-1 text-left font-mono text-xs',
                      selectedMesh === m.name ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100',
                    )}
                  >
                    {m.name}
                    {m.name.startsWith('zone_') && <Badge tone="accent">zone</Badge>}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {selectedInfo && (
            <div className="card p-4">
              <p className="panel-title mb-2">Selected mesh</p>
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between"><dt className="text-gray-500">Mesh</dt><dd className="font-mono text-xs">{selectedInfo.name}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Material</dt><dd className="font-mono text-xs">{selectedInfo.materialName}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Triangles</dt><dd>{selectedInfo.triangles.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">UV channel</dt><dd>{selectedInfo.hasUV ? 'channel 0' : 'missing'}</dd></div>
              </dl>
              <div className="mt-3 border-t border-gray-100 pt-3">
                <label className="label">Bound print area</label>
                <select
                  className="input"
                  value={selectedBinding?.areaKey ?? areaKeyFromMesh(selectedInfo.name) ?? ''}
                  onChange={(e) =>
                    setBinding(selectedInfo.name, e.target.value, selectedBinding?.mode ?? 'surface')
                  }
                >
                  <option value="">— not printable —</option>
                  {product.printAreas.map((a) => (
                    <option key={a.key} value={a.key}>{a.name}</option>
                  ))}
                </select>
                {selectedBinding && (
                  <select
                    className="input mt-2"
                    value={selectedBinding.mode}
                    onChange={(e) =>
                      setBinding(selectedInfo.name, selectedBinding.areaKey, e.target.value as 'surface' | 'overlay')
                    }
                  >
                    <option value="surface">surface — texture background is product color</option>
                    <option value="overlay">overlay — transparent over base material</option>
                  </select>
                )}
                <label className="mt-3 flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={colorMeshes.includes(selectedInfo.name)}
                    onChange={(e) =>
                      setColorMeshes((prev) =>
                        e.target.checked
                          ? [...prev, selectedInfo.name]
                          : prev.filter((n) => n !== selectedInfo.name),
                      )
                    }
                  />
                  Tint with product color
                </label>
              </div>
            </div>
          )}

          {validation && (
            <div className="card p-4">
              <p className="panel-title mb-2">Asset validation</p>
              <ul className="max-h-52 space-y-1 overflow-y-auto scroll-thin">
                {validation.checks.map((check, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs">
                    {check.level === 'ok' ? (
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
                    ) : check.level === 'warn' ? (
                      <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                    ) : (
                      <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                    )}
                    <span className="text-gray-600">{check.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
