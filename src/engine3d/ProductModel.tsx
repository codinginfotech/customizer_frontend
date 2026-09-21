import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';
import type { ThreeEvent } from '@react-three/fiber';
import type { MaterialPreset, ModelConfiguration } from '@cpd/shared';
import { areaKeyFromMesh } from '@cpd/shared';
import { useDesignerStore } from '../stores/designerStore';
import { useZoneTextures } from './useZoneTextures';
import { createPresetMaterial, presetForMaterialName } from './materials';
import { byMeshKey, meshKey } from './meshNames';

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
      entries.map(async ([mesh, url]) => [meshKey(mesh), await loadBaseTexture(url)] as const),
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
  // Decal zones need a rasterised print-area texture exactly like authored
  // zone meshes do, but by definition they have no mesh binding — so ask for
  // one explicitly. Without this the texture manager renders nothing for them
  // and the design never reaches an imported model.
  const textureBindings = useMemo(() => {
    const list = [...config.meshBindings];
    for (const areaKey of Object.keys(config.decalZones ?? {})) {
      if (!list.some((b) => b.areaKey === areaKey)) {
        list.push({ mesh: `decal_${areaKey}`, areaKey, mode: 'overlay' });
      }
    }
    return list;
  }, [config.meshBindings, config.decalZones]);

  const zones = useZoneTextures(textureBindings);
  const baseTextures = useBaseTextures(config);
  const managed = useRef<THREE.Material[]>([]);

  // Every mesh name the configuration carries is a raw glTF name; three hands
  // us the sanitised form. Key the lookups by the sanitised name once so the
  // two sides can never drift apart. See ./meshNames.
  const lookup = useMemo(
    () => ({
      bindings: new Map(config.meshBindings.map((b) => [meshKey(b.mesh), b])),
      materials: byMeshKey(config.materials as Record<string, MaterialPreset> | undefined),
      colored: new Set((config.colorMeshes ?? []).map(meshKey)),
      partLabels: byMeshKey(config.partLabels),
    }),
    [config.meshBindings, config.materials, config.colorMeshes, config.partLabels],
  );

  // Clone so repeated mounts never mutate the loader cache, then correct the
  // asset's axes/origin. Stock and scanned models are routinely Z-up and far
  // from the origin (a Sketchfab tee arrives lying down at z≈1.2); without
  // this the camera rig frames a shirt on its back.
  const cloned = useMemo(() => {
    const root = scene.clone(true);
    const t = config.transform;
    if (!t) return root;

    // Two nested groups: the inner one carries the axis/scale correction, the
    // outer one carries only the centring offset. Keeping them separate means
    // the centre is measured in a space where the outer transform is still
    // identity — so the negated box centre *is* the offset, with no ordering
    // subtleties between Box3 and updateMatrixWorld.
    const inner = new THREE.Group();
    inner.add(root);
    inner.rotation.set(
      THREE.MathUtils.degToRad(t.rotation[0]),
      THREE.MathUtils.degToRad(t.rotation[1]),
      THREE.MathUtils.degToRad(t.rotation[2]),
    );
    inner.scale.setScalar(t.scale);

    const outer = new THREE.Group();
    outer.add(inner);
    outer.updateMatrixWorld(true);

    if (t.autoCenter) {
      const box = new THREE.Box3().setFromObject(outer);
      if (!box.isEmpty()) {
        outer.position.copy(box.getCenter(new THREE.Vector3()).negate());
        outer.updateMatrixWorld(true);
      }
    }
    return outer;
  }, [scene, config.transform]);

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
      // Self-shadowing is what gives a garment depth — the sleeve darkening
      // the torso, the collar dropping onto the chest. Without it every part
      // is lit identically and the whole thing reads flat.
      obj.receiveShadow = true;
      const meshName = meshKey(obj.name);
      const binding =
        lookup.bindings.get(meshName) ??
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
            lookup.materials.get(meshName) ??
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
        const preset = lookup.materials.get(meshName) ?? presetForMaterialName(materialName(obj));
        const colored = lookup.colored.has(meshName);
        const artwork = baseTextures.get(meshName) ?? null;
        const authored = Array.isArray(obj.material) ? obj.material[0] : obj.material;
        const material = createPresetMaterial(preset, {
          // Artwork meshes render the sublimated print; tint only if the mesh
          // is also a color mesh (white artwork regions receive the color).
          map: artwork,
          color: artwork ? (colored ? productColor : '#ffffff') : colored ? productColor : baseColor(obj),
          // A tinted mesh must not also inherit the asset's baked albedo, or
          // the texture multiplies the selected colour back out.
          tinted: colored,
          // Photoreal assets keep their baked normal/roughness/AO maps.
          preserveFrom: config.preserveMaterials ? authored : null,
        });
        if (config.preserveMaterials && material.aoMap && !obj.geometry.getAttribute('uv1')) {
          // three samples aoMap from the second UV set; glTF assets that bake
          // AO against TEXCOORD_0 need it mirrored across or AO silently drops.
          const uv = obj.geometry.getAttribute('uv');
          if (uv) obj.geometry.setAttribute('uv1', uv);
        }
        obj.material = material;
        managed.current.push(material);
      }
      obj.userData.partLabel = lookup.partLabels.get(meshName) ?? null;
      if (technicalView && obj.userData.areaKey) {
        (obj.material as THREE.MeshPhysicalMaterial).wireframe = true;
      }
    });
    return () => {
      managed.current.forEach((m) => m.dispose());
      managed.current = [];
    };
  }, [cloned, config, lookup, zones, baseTextures, productColor, technicalView]);

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

  return (
    <>
      <primitive object={cloned} onClick={handleClick} />
      <DecalZones root={cloned} config={config} zones={zones} />
    </>
  );
}

/**
 * Projects print areas onto arbitrary geometry as decals.
 *
 * The contract's `zone_<areaKey>` meshes are the precise route, but stock and
 * scanned assets never ship them. A decal projector conforms the design to
 * whatever surface is actually there, so any GLB can be made printable without
 * re-authoring it. Authored zone meshes still win where both exist.
 *
 * DecalGeometry emits geometry in WORLD space, so these meshes are siblings of
 * the (transformed) model rather than children of it.
 */
function DecalZones({
  root,
  config,
  zones,
}: {
  root: THREE.Object3D;
  config: ModelConfiguration;
  zones: Map<string, { texture: THREE.Texture; mode: string }>;
}) {
  const built = useMemo(() => {
    const entries = Object.entries(config.decalZones ?? {});
    if (entries.length === 0) return [];
    root.updateWorldMatrix(true, true);

    // Authored zone meshes take precedence — never double-print an area.
    const authoredAreas = new Set<string>();
    root.traverse((o) => {
      const key = areaKeyFromMesh(o.name);
      if (key) authoredAreas.add(key);
    });

    const out: Array<{ areaKey: string; geometry: THREE.BufferGeometry; texture: THREE.Texture }> = [];
    for (const [areaKey, spec] of entries) {
      if (authoredAreas.has(areaKey)) continue;
      const zone = zones.get(areaKey);
      if (!zone) continue;

      // Pick the named target, else the densest mesh (the garment body rather
      // than a label or button).
      let target: THREE.Mesh | null = null;
      root.traverse((o) => {
        if (!(o instanceof THREE.Mesh)) return;
        if (spec.targetMesh) {
          if (meshKey(o.name) === meshKey(spec.targetMesh)) target = o;
        } else if (
          !target ||
          o.geometry.getAttribute('position').count > target.geometry.getAttribute('position').count
        ) {
          target = o;
        }
      });
      if (!target) continue;

      try {
        // Aiming by Euler angles is guesswork on a curved part — it is very
        // easy to end up projecting into an armpit or off the mesh entirely.
        // `lookAt` states the intent directly: sit just off the surface and
        // point at the part's centre. Same convention as a camera, so the
        // decal's -Z faces the surface exactly like the identity case does.
        const projectorPosition = new THREE.Vector3(...spec.position);
        const orientation = new THREE.Euler(
          THREE.MathUtils.degToRad(spec.rotation[0]),
          THREE.MathUtils.degToRad(spec.rotation[1]),
          THREE.MathUtils.degToRad(spec.rotation[2]),
        );
        if (spec.lookAt) {
          const m = new THREE.Matrix4().lookAt(
            projectorPosition,
            new THREE.Vector3(...spec.lookAt),
            new THREE.Vector3(0, 1, 0),
          );
          orientation.setFromRotationMatrix(m);
        }

        const geometry = new DecalGeometry(
          target,
          projectorPosition,
          orientation,
          new THREE.Vector3(...spec.size),
        );
        // An empty result means the projector box missed the surface.
        if (geometry.getAttribute('position')?.count) {
          // Zone textures are authored for the contract's zone meshes, which
          // sample with flipY=false and v=0 at the top. DecalGeometry emits its
          // own planar UVs in the projector's frame, so the texture needs the
          // opposite convention and a mirrored U to read the right way round.
          // DecalGeometry lays out UVs in the projector's frame with v growing
          // upward, but print-area canvases follow the glTF convention the zone
          // meshes use (flipY=false, v=0 at the TOP). Flip v to reconcile them,
          // or every design lands upside down. u is already correct — mirroring
          // it too reverses the artwork.
          const uv = geometry.getAttribute('uv') as THREE.BufferAttribute;
          for (let i = 0; i < uv.count; i += 1) {
            uv.setY(i, 1 - uv.getY(i));
          }
          uv.needsUpdate = true;

          // Use the live texture, never a clone. A cloned CanvasTexture shares
          // the canvas but keeps its own `needsUpdate`, which the texture
          // manager never sets — so the decal froze on whatever the canvas held
          // when it was built, and no later edit ever appeared on the model.
          out.push({ areaKey, geometry, texture: zone.texture });
        } else {
          geometry.dispose();
        }
      } catch {
        /* degenerate projection — skip this area rather than blank the stage */
      }
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [root, config.decalZones, zones]);

  useEffect(() => () => built.forEach((d) => d.geometry.dispose()), [built]);

  if (built.length === 0) return null;

  return (
    <>
      {built.map((decal) => (
        <mesh key={decal.areaKey} geometry={decal.geometry} renderOrder={2}>
          <meshPhysicalMaterial
            map={decal.texture}
            transparent
            roughness={0.85}
            sheen={0.5}
            sheenRoughness={0.6}
            sheenColor="#fff6ea"
            // Sit just proud of the garment without z-fighting on it.
            polygonOffset
            polygonOffsetFactor={-6}
            polygonOffsetUnits={-6}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
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
