import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import type { ThreeEvent } from '@react-three/fiber';
import type { MaterialPreset, ModelConfiguration } from '@cpd/shared';
import { areaKeyFromMesh } from '@cpd/shared';
import { useDesignerStore } from '../stores/designerStore';
import { useZoneTextures } from './useZoneTextures';
import { createPresetMaterial, presetForMaterialName } from './materials';

/**
 * The universal GLB product renderer.
 *
 * Contract (docs/3D-ASSET-CONTRACT.md):
 *  - `zone_<areaKey>` meshes (or any mesh named in meshBindings) receive the
 *    live design texture for their print area via their authored UVs.
 *  - Meshes listed in `colorMeshes` are tinted with the selected product
 *    color; their material preset comes from config.materials[meshName] or
 *    from the GLB material name (mat_fabric → cotton, …).
 *  - Clicking a zone or labeled part selects its print area in the editor.
 *
 * Draco-compressed GLBs are supported via the locally bundled decoder.
 */

interface ProductModelProps {
  url: string;
  config: ModelConfiguration;
  technicalView?: boolean;
  onPartClick?: (info: { mesh: string; areaKey: string | null; label: string | null }) => void;
}

// ---- base artwork textures (sublimated jerseys, patterned fabrics) --------
const baseTextureCache = new Map<string, Promise<THREE.Texture>>();

function loadBaseTexture(url: string): Promise<THREE.Texture> {
  let promise = baseTextureCache.get(url);
  if (!promise) {
    promise = new Promise((resolve, reject) => {
      const finish = (texture: THREE.Texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = false; // asset-contract UVs: v=0 at the top
        texture.anisotropy = 8;
        resolve(texture);
      };
      if (url.endsWith('.svg')) {
        // Rasterize vectors at full resolution ourselves — browsers give
        // attribute-less SVGs a tiny default intrinsic size.
        const img = new Image();
        img.onload = () => {
          const size = 1024;
          const canvas = document.createElement('canvas');
          const aspect = (img.naturalWidth || size) / (img.naturalHeight || size);
          canvas.width = size;
          canvas.height = Math.round(size / aspect);
          canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
          finish(new THREE.CanvasTexture(canvas));
        };
        img.onerror = () => reject(new Error(`artwork failed: ${url}`));
        img.src = url;
      } else {
        new THREE.TextureLoader().load(url, finish, undefined, reject);
      }
    });
    baseTextureCache.set(url, promise);
  }
  return promise;
}

/** Loads config.baseTextures; re-renders as each artwork arrives. */
function useBaseTextures(config: ModelConfiguration): Map<string, THREE.Texture> {
  const [loaded, setLoaded] = useState<Map<string, THREE.Texture>>(new Map());
  const key = Object.entries(config.baseTextures ?? {})
    .map(([mesh, url]) => `${mesh}:${url}`)
    .join('|');
  useEffect(() => {
    let cancelled = false;
    const entries = Object.entries(config.baseTextures ?? {});
    if (entries.length === 0) {
      setLoaded(new Map());
      return;
    }
    Promise.all(
      entries.map(async ([mesh, url]) => [mesh, await loadBaseTexture(url)] as const),
    )
      .then((pairs) => {
        if (!cancelled) setLoaded(new Map(pairs));
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return loaded;
}

export function ProductModel({ url, config, technicalView = false, onPartClick }: ProductModelProps) {
  const { scene } = useGLTF(url, '/draco/');
  const productColor = useDesignerStore((s) => s.productColor);
  const activeAreaKey = useDesignerStore((s) => s.activeAreaKey);
  const zones = useZoneTextures(config.meshBindings);
  const baseTextures = useBaseTextures(config);
  const managed = useRef<THREE.Material[]>([]);

  // Clone so repeated mounts never mutate the loader cache.
  const cloned = useMemo(() => scene.clone(true), [scene]);

  if (import.meta.env.DEV) {
    (window as unknown as { __cpdModel?: unknown }).__cpdModel = cloned;
  }

  useEffect(() => {
    // Dispose materials created for the previous configuration pass.
    managed.current.forEach((m) => m.dispose());
    managed.current = [];

    cloned.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      obj.castShadow = true;
      const meshName = obj.name;
      const binding =
        config.meshBindings.find((b) => b.mesh === meshName) ??
        (areaKeyFromMesh(meshName)
          ? config.meshBindings.find((b) => b.areaKey === areaKeyFromMesh(meshName))
          : undefined);

      if (binding) {
        const zone = zones.get(binding.areaKey);
        if (zone) {
          const overlay = zone.mode === 'overlay';
          // Print zones render on the base preset of the underlying part so
          // ink sits "in" the material (fabric weave under a tee print, gloss
          // over a mug wrap).
          const basePreset: MaterialPreset =
            (config.materials?.[meshName] as MaterialPreset | undefined) ??
            (overlay ? 'cotton' : presetForMaterialName(materialName(obj)));
          const material = createPresetMaterial(basePreset, {
            map: zone.texture,
            overlay,
            color: '#ffffff',
          });
          obj.material = material;
          obj.userData.areaKey = binding.areaKey;
          managed.current.push(material);
        }
      } else {
        const preset =
          (config.materials?.[meshName] as MaterialPreset | undefined) ??
          presetForMaterialName(materialName(obj));
        const colored = config.colorMeshes.includes(meshName);
        const artwork = baseTextures.get(meshName) ?? null;
        const material = createPresetMaterial(preset, {
          // Artwork meshes render the sublimated print; tint only if the mesh
          // is also a color mesh (white artwork regions receive the color).
          map: artwork,
          color: artwork ? (colored ? productColor : '#ffffff') : colored ? productColor : baseColor(obj),
        });
        obj.material = material;
        managed.current.push(material);
      }
      obj.userData.partLabel = config.partLabels?.[meshName] ?? null;
      if (technicalView && obj.userData.areaKey) {
        (obj.material as THREE.MeshPhysicalMaterial).wireframe = true;
      }
    });
    return () => {
      managed.current.forEach((m) => m.dispose());
      managed.current = [];
    };
  }, [cloned, config, zones, baseTextures, productColor, technicalView]);

  // Subtle emissive pulse on the active print zone (selection affordance).
  useEffect(() => {
    const highlights: THREE.MeshPhysicalMaterial[] = [];
    cloned.traverse((obj) => {
      if (obj instanceof THREE.Mesh && obj.userData.areaKey === activeAreaKey) {
        const material = obj.material as THREE.MeshPhysicalMaterial;
        if (material.emissive) {
          material.emissive.set('#3b63f6');
          material.emissiveIntensity = 0.18;
          highlights.push(material);
        }
      }
    });
    const timer = setTimeout(() => {
      highlights.forEach((m) => {
        m.emissiveIntensity = 0;
      });
    }, 650);
    return () => {
      clearTimeout(timer);
      highlights.forEach((m) => {
        m.emissiveIntensity = 0;
      });
    };
  }, [cloned, activeAreaKey]);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    if (!onPartClick) return;
    event.stopPropagation();
    const obj = event.object as THREE.Mesh;
    onPartClick({
      mesh: obj.name,
      areaKey: (obj.userData.areaKey as string | undefined) ?? null,
      label: (obj.userData.partLabel as string | undefined) ?? null,
    });
  };

  return <primitive object={cloned} onClick={handleClick} />;
}

function materialName(mesh: THREE.Mesh): string | undefined {
  const material = mesh.material;
  if (Array.isArray(material)) return material[0]?.name;
  return material?.name;
}

function baseColor(mesh: THREE.Mesh): string {
  const material = mesh.material;
  const single = Array.isArray(material) ? material[0] : material;
  if (single && 'color' in single) {
    return `#${(single as THREE.MeshStandardMaterial).color.getHexString()}`;
  }
  return '#ffffff';
}
