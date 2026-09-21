import { useEffect, useRef, useState } from 'react';
import { useDesignerStore } from '../../../stores/designerStore';
import { onImageLoaded, renderAreaToCanvas } from '../../../utils/areaRenderer';
import { tintedMockupUrl, loadImage } from '../../../utils/mockup';

/**
 * High-quality 2D mockup preview for products without a 3D model (and the
 * fallback when a model fails to load). Draws the tinted product image with
 * every designed area composited at its configured placement.
 */
export function MockupPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const product = useDesignerStore((s) => s.product);
  const revision = useDesignerStore((s) => s.revision);
  const productColor = useDesignerStore((s) => s.productColor);
  const activeAreaKey = useDesignerStore((s) => s.activeAreaKey);
  const [tick, setTick] = useState(0);

  useEffect(() => onImageLoaded(() => setTick((t) => t + 1)), []);

  useEffect(() => {
    let cancelled = false;
    async function draw() {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      const state = useDesignerStore.getState();
      const prod = state.product;
      if (!canvas || !container || !prod) return;

      const activeConfig = prod.printAreas.find((a) => a.key === state.activeAreaKey);
      const baseImageUrl = activeConfig?.templateImage ?? prod.printAreas[0]?.templateImage;

      const width = container.clientWidth || 360;
      const height = container.clientHeight || 360;
      canvas.width = width * 2; // 2x for crispness
      canvas.height = height * 2;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!baseImageUrl) {
        // No mockup configured — render the active area flat.
        if (activeConfig) {
          const overlay = document.createElement('canvas');
          const area = state.areas.find((a) => a.areaKey === activeConfig.key);
          renderAreaToCanvas(overlay, area, activeConfig.width, activeConfig.height, {
            background: '#ffffff',
          });
          const scale = Math.min(
            (canvas.width * 0.85) / activeConfig.width,
            (canvas.height * 0.85) / activeConfig.height,
          );
          ctx.drawImage(
            overlay,
            (canvas.width - activeConfig.width * scale) / 2,
            (canvas.height - activeConfig.height * scale) / 2,
            activeConfig.width * scale,
            activeConfig.height * scale,
          );
        }
        return;
      }

      try {
        const tinted = await tintedMockupUrl(baseImageUrl, state.productColor);
        const img = await loadImage(tinted);
        if (cancelled) return;
        const scale = Math.min((canvas.width * 0.94) / img.width, (canvas.height * 0.94) / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const ox = (canvas.width - w) / 2;
        const oy = (canvas.height - h) / 2;
        ctx.drawImage(img, ox, oy, w, h);

        for (const cfg of prod.printAreas) {
          if (cfg.templateImage !== baseImageUrl || !cfg.mockup) continue;
          const area = state.areas.find((a) => a.areaKey === cfg.key);
          if (!area || area.elements.length === 0) continue;
          const overlay = document.createElement('canvas');
          renderAreaToCanvas(overlay, area, cfg.width, cfg.height);
          const m = cfg.mockup;
          const dx = ox + (m.left / 100) * w;
          const dy = oy + (m.top / 100) * h;
          const dw = (m.width / 100) * w;
          const dh = (m.height / 100) * h;
          ctx.save();
          ctx.translate(dx + dw / 2, dy + dh / 2);
          if (m.rotate) ctx.rotate((m.rotate * Math.PI) / 180);
          ctx.drawImage(overlay, -dw / 2, -dh / 2, dw, dh);
          ctx.restore();
        }
      } catch {
        /* mockup image missing — leave blank */
      }
    }
    void draw();
    return () => {
      cancelled = true;
    };
  }, [product, revision, productColor, activeAreaKey, tick]);

  return (
    <div ref={containerRef} className="relative flex h-full w-full items-center justify-center">
      <canvas ref={canvasRef} className="h-full w-full object-contain" />
    </div>
  );
}
