import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import type { MeshBinding } from '@cpd/shared';
import { useDesignerStore } from '../stores/designerStore';
import { onImageLoaded, renderAreaToCanvas } from '../utils/areaRenderer';

export interface ZoneTexture {
  texture: THREE.CanvasTexture;
  mode: 'surface' | 'overlay';
}

/**
 * TextureManager — rasterizes each bound print area of the shared design
 * state into a CanvasTexture. `surface` zones get the product color as
 * background (the mesh IS the surface); `overlay` zones render on a
 * transparent background so the base material (fabric weave, metal) shows
 * through around the artwork. Regeneration is coalesced per animation frame.
 */
export function useZoneTextures(bindings: MeshBinding[]): Map<string, ZoneTexture> {
  const revision = useDesignerStore((s) => s.revision);
  const productColor = useDesignerStore((s) => s.productColor);
  const [imageTick, setImageTick] = useState(0);
  const canvases = useRef(new Map<string, HTMLCanvasElement>());
  const frame = useRef<number>();

  const bindingKey = bindings.map((b) => `${b.areaKey}:${b.mode}`).join('|');

  const zones = useMemo(() => {
    // CRITICAL: the canvas must have its final size BEFORE the texture's
    // first GPU upload — three allocates immutable texture storage on first
    // use, and a later canvas resize silently breaks every upload after it.
    const product = useDesignerStore.getState().product;
    const map = new Map<string, ZoneTexture>();
    for (const binding of bindings) {
      if (map.has(binding.areaKey)) continue;
      const areaConfig = product?.printAreas.find((a) => a.key === binding.areaKey);
      const width = areaConfig?.width ?? 512;
      const height = areaConfig?.height ?? 512;
      const scale = Math.min(1, 1024 / Math.max(width, height));
      let canvas = canvases.current.get(binding.areaKey);
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvases.current.set(binding.areaKey, canvas);
      }
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 8;
      texture.flipY = false; // GLTF UV convention (v=0 at image top)
      map.set(binding.areaKey, { texture, mode: binding.mode ?? 'surface' });
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bindingKey]);

  useEffect(() => onImageLoaded(() => setImageTick((t) => t + 1)), []);

  useEffect(() => {
    cancelAnimationFrame(frame.current ?? 0);
    frame.current = requestAnimationFrame(() => {
      const state = useDesignerStore.getState();
      const product = state.product;
      if (!product) return;
      for (const [areaKey, zone] of zones) {
        const areaConfig = product.printAreas.find((a) => a.key === areaKey);
        if (!areaConfig) continue;
        const area = state.areas.find((a) => a.areaKey === areaKey);
        const canvas = canvases.current.get(areaKey)!;
        const scale = Math.min(1, 1024 / Math.max(areaConfig.width, areaConfig.height));
        renderAreaToCanvas(canvas, area, areaConfig.width, areaConfig.height, {
          background: zone.mode === 'surface' ? state.productColor : null,
          scale,
        });
        zone.texture.needsUpdate = true;
      }
    });
    return () => cancelAnimationFrame(frame.current ?? 0);
  }, [zones, revision, productColor, imageTick]);

  // Dispose superseded textures only when the binding set actually changes —
  // never on unmount (StrictMode's simulated unmount would kill live GPU
  // textures that the very same component keeps using).
  const previousZones = useRef<Map<string, ZoneTexture> | null>(null);
  useEffect(() => {
    const prev = previousZones.current;
    if (prev && prev !== zones) {
      prev.forEach((z) => z.texture.dispose());
    }
    previousZones.current = zones;
  }, [zones]);

  return zones;
}
