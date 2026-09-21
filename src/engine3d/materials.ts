import * as THREE from 'three';
import type { MaterialPreset } from '@cpd/shared';

/**
 * MaterialRegistry — maps configuration-level material presets to concrete
 * MeshPhysicalMaterial parameters. Fabric presets get procedural woven
 * normal maps (generated once on a small canvas and tiled), so cotton reads
 * as knit, canvas as coarse weave, denim as twill — with zero texture
 * downloads. Products choose presets purely through configuration.
 */

export interface PresetParams {
  roughness: number;
  metalness: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  sheen?: number;
  sheenRoughness?: number;
  normal?: 'knit' | 'weave' | 'twill' | 'grain';
  normalScale?: number;
  normalRepeat?: number;
  envMapIntensity?: number;
}

export const MATERIAL_PRESETS: Record<MaterialPreset, PresetParams> = {
  cotton: { roughness: 0.92, metalness: 0, sheen: 0.35, sheenRoughness: 0.8, normal: 'knit', normalScale: 0.55, normalRepeat: 26 },
  heavy_cotton: { roughness: 0.95, metalness: 0, sheen: 0.3, sheenRoughness: 0.9, normal: 'knit', normalScale: 0.8, normalRepeat: 18 },
  polyester: { roughness: 0.8, metalness: 0, sheen: 0.5, sheenRoughness: 0.6, normal: 'weave', normalScale: 0.35, normalRepeat: 34 },
  denim: { roughness: 0.97, metalness: 0, normal: 'twill', normalScale: 1.0, normalRepeat: 22 },
  leather: { roughness: 0.55, metalness: 0, clearcoat: 0.25, clearcoatRoughness: 0.5, normal: 'grain', normalScale: 0.7, normalRepeat: 10 },
  canvas: { roughness: 0.98, metalness: 0, normal: 'weave', normalScale: 1.1, normalRepeat: 14 },
  ceramic: { roughness: 0.3, metalness: 0, clearcoat: 0.9, clearcoatRoughness: 0.2 },
  glass: { roughness: 0.05, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.03, envMapIntensity: 1.4 },
  metal: { roughness: 0.4, metalness: 0.85 },
  brushed_metal: { roughness: 0.45, metalness: 0.9, normal: 'twill', normalScale: 0.25, normalRepeat: 60 },
  stainless_steel: { roughness: 0.28, metalness: 0.95, envMapIntensity: 1.2 },
  plastic_gloss: { roughness: 0.15, metalness: 0, clearcoat: 0.8, clearcoatRoughness: 0.1 },
  plastic_matte: { roughness: 0.6, metalness: 0 },
  rubber: { roughness: 0.95, metalness: 0, normal: 'grain', normalScale: 0.4, normalRepeat: 30 },
  paper: { roughness: 0.9, metalness: 0 },
  wood: { roughness: 0.65, metalness: 0, normal: 'grain', normalScale: 0.5, normalRepeat: 8 },
  silicone: { roughness: 0.7, metalness: 0, clearcoat: 0.2, clearcoatRoughness: 0.6 },
};

/** GLB material-name → preset fallback (the asset contract's mat_* names). */
const MATERIAL_NAME_MAP: Array<[RegExp, MaterialPreset]> = [
  [/fabric_heavy/, 'heavy_cotton'],
  [/fabric_rib/, 'cotton'],
  [/fabric/, 'cotton'],
  [/cord/, 'cotton'],
  [/canvas_strap/, 'canvas'],
  [/canvas/, 'canvas'],
  [/ceramic/, 'ceramic'],
  [/glass/, 'glass'],
  [/metal/, 'metal'],
  [/plastic_dark/, 'plastic_matte'],
  [/plastic/, 'plastic_matte'],
  [/rubber/, 'rubber'],
  [/leather/, 'leather'],
  [/paper/, 'paper'],
];

export function presetForMaterialName(name: string | undefined): MaterialPreset {
  if (name) {
    for (const [pattern, preset] of MATERIAL_NAME_MAP) {
      if (pattern.test(name)) return preset;
    }
  }
  return 'plastic_matte';
}

// ---- procedural normal maps ------------------------------------------------

const normalCache = new Map<string, THREE.Texture>();

function makeNormalTexture(kind: NonNullable<PresetParams['normal']>): THREE.Texture {
  const cached = normalCache.get(kind);
  if (cached) return cached;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const image = ctx.createImageData(size, size);
  const put = (i: number, nx: number, ny: number) => {
    // encode tangent-space normal
    const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
    image.data[i] = Math.round((nx * 0.5 + 0.5) * 255);
    image.data[i + 1] = Math.round((ny * 0.5 + 0.5) * 255);
    image.data[i + 2] = Math.round((nz * 0.5 + 0.5) * 255);
    image.data[i + 3] = 255;
  };
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const i = (y * size + x) * 4;
      const fx = (x / size) * Math.PI * 2;
      const fy = (y / size) * Math.PI * 2;
      let nx = 0;
      let ny = 0;
      if (kind === 'knit') {
        nx = Math.sin(fx * 8) * 0.22 + Math.sin(fx * 8 + fy * 4) * 0.06;
        ny = Math.sin(fy * 8 + Math.PI / 3) * 0.22;
      } else if (kind === 'weave') {
        const over = Math.sin(fx * 6) * Math.sin(fy * 6) > 0 ? 1 : -1;
        nx = Math.sin(fx * 12) * 0.18 * over;
        ny = Math.sin(fy * 12) * 0.18 * -over;
      } else if (kind === 'twill') {
        nx = Math.sin((fx + fy) * 10) * 0.25;
        ny = Math.sin((fx + fy) * 10 + Math.PI / 2) * 0.12;
      } else {
        // grain — value-noise-ish speckle
        const n = Math.sin(fx * 13.7 + Math.sin(fy * 9.1) * 3) * Math.cos(fy * 11.3 + Math.sin(fx * 7.7) * 2);
        nx = n * 0.15;
        ny = Math.sin(fx * 17.1 + fy * 5.3) * 0.12;
      }
      put(i, nx, ny);
    }
  }
  ctx.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  normalCache.set(kind, texture);
  return texture;
}

export interface MaterialOptions {
  color?: THREE.ColorRepresentation;
  map?: THREE.Texture | null;
  transparent?: boolean;
  overlay?: boolean;
}

/** Create a physical material for a preset. Caller owns disposal. */
export function createPresetMaterial(preset: MaterialPreset, options: MaterialOptions = {}): THREE.MeshPhysicalMaterial {
  const p = MATERIAL_PRESETS[preset];
  const material = new THREE.MeshPhysicalMaterial({
    color: options.color ?? '#ffffff',
    map: options.map ?? null,
    roughness: p.roughness,
    metalness: p.metalness,
    clearcoat: p.clearcoat ?? 0,
    clearcoatRoughness: p.clearcoatRoughness ?? 0.2,
    sheen: p.sheen ?? 0,
    sheenRoughness: p.sheenRoughness ?? 0.8,
    envMapIntensity: p.envMapIntensity ?? 0.9,
    side: THREE.DoubleSide,
  });
  if (p.normal) {
    const normalMap = makeNormalTexture(p.normal);
    material.normalMap = normalMap;
    material.normalScale = new THREE.Vector2(p.normalScale ?? 0.5, p.normalScale ?? 0.5);
    // Per-material repeat requires cloned texture settings; share via onBeforeCompile-safe clone.
    material.normalMap = normalMap.clone();
    material.normalMap.needsUpdate = true;
    material.normalMap.wrapS = THREE.RepeatWrapping;
    material.normalMap.wrapT = THREE.RepeatWrapping;
    material.normalMap.repeat.setScalar(p.normalRepeat ?? 20);
  }
  if (options.transparent || options.overlay) {
    material.transparent = true;
    material.polygonOffset = true;
    material.polygonOffsetFactor = -2;
    material.polygonOffsetUnits = -2;
  }
  return material;
}
