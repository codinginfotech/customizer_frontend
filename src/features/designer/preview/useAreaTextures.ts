import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useDesignerStore } from '../../../stores/designerStore';
import { onImageLoaded, renderAreaToCanvas } from '../../../utils/areaRenderer';

/**
 * Builds one CanvasTexture per print area from the shared design state.
 * The same design JSON that drives the 2D editor is rasterized here, so the
 * 3D preview updates the moment an element moves, scales or recolors.
 */
export function useAreaTextures(areaKeys: string[]): Map<string, THREE.CanvasTexture> {
  const revision = useDesignerStore((s) => s.revision);
  const productColor = useDesignerStore((s) => s.productColor);
  const [imageTick, setImageTick] = useState(0);

  const canvases = useRef(new Map<string, HTMLCanvasElement>());
  const keyList = areaKeys.join('|');

  const textures = useMemo(() => {
    // Canvases must be at final size before the texture's first GPU upload
    // (three allocates immutable storage on first use).
    const product = useDesignerStore.getState().product;
    const map = new Map<string, THREE.CanvasTexture>();
    for (const key of keyList.split('|').filter(Boolean)) {
      const areaConfig = product?.printAreas.find((a) => a.key === key);
      const width = areaConfig?.width ?? 512;
      const height = areaConfig?.height ?? 512;
      const scale = Math.min(1, 1024 / Math.max(width, height));
      let canvas = canvases.current.get(key);
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvases.current.set(key, canvas);
      }
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      map.set(key, texture);
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyList]);

  useEffect(() => onImageLoaded(() => setImageTick((t) => t + 1)), []);

  useEffect(() => {
    const state = useDesignerStore.getState();
    const product = state.product;
    if (!product) return;
    for (const [key, texture] of textures) {
      const areaConfig = product.printAreas.find((a) => a.key === key);
      const area = state.areas.find((a) => a.areaKey === key);
      if (!areaConfig) continue;
      const canvas = canvases.current.get(key)!;
      // Cap texture size for perf while keeping crispness.
      const scale = Math.min(1, 1024 / Math.max(areaConfig.width, areaConfig.height));
      renderAreaToCanvas(canvas, area, areaConfig.width, areaConfig.height, {
        background: productColor,
        scale,
      });
      texture.needsUpdate = true;
    }
  }, [textures, revision, productColor, imageTick]);

  // Dispose only superseded texture sets, never on unmount (StrictMode-safe).
  const previous = useRef<Map<string, THREE.CanvasTexture> | null>(null);
  useEffect(() => {
    const prev = previous.current;
    if (prev && prev !== textures) prev.forEach((t) => t.dispose());
    previous.current = textures;
  }, [textures]);

  return textures;
}
