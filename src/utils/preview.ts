import type { DesignArea } from '@cpd/shared';
import type { Product } from '../types/catalog';
import { renderAreaToCanvas } from './areaRenderer';
import { tintedMockupUrl, loadImage } from './mockup';

/**
 * Composite thumbnail for saved designs: the tinted product mockup with each
 * designed area drawn at its mockup placement. Falls back to a plain render
 * of the first designed area when no mockup exists.
 */
export async function generatePreviewDataUrl(
  product: Product,
  areas: DesignArea[],
  productColor: string,
): Promise<string | undefined> {
  const size = 600;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return undefined;
  ctx.fillStyle = '#f4f4f5';
  ctx.fillRect(0, 0, size, size);

  const firstArea = product.printAreas[0];
  const baseImageUrl = firstArea?.templateImage;

  try {
    if (baseImageUrl) {
      const tinted = await tintedMockupUrl(baseImageUrl, productColor);
      const img = await loadImage(tinted);
      const scale = Math.min((size * 0.92) / img.width, (size * 0.92) / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const ox = (size - w) / 2;
      const oy = (size - h) / 2;
      ctx.drawImage(img, ox, oy, w, h);

      // Overlay every designed area that belongs to this base image.
      for (const areaConfig of product.printAreas) {
        if (areaConfig.templateImage !== baseImageUrl || !areaConfig.mockup) continue;
        const area = areas.find((a) => a.areaKey === areaConfig.key);
        if (!area || area.elements.length === 0) continue;
        const overlay = document.createElement('canvas');
        renderAreaToCanvas(overlay, area, areaConfig.width, areaConfig.height, { scale: 1 });
        const m = areaConfig.mockup;
        const dx = ox + (m.left / 100) * w;
        const dy = oy + (m.top / 100) * h;
        const dw = (m.width / 100) * w;
        const dh = (m.height / 100) * h;
        ctx.save();
        if (m.rotate) {
          ctx.translate(dx + dw / 2, dy + dh / 2);
          ctx.rotate((m.rotate * Math.PI) / 180);
          ctx.drawImage(overlay, -dw / 2, -dh / 2, dw, dh);
        } else {
          ctx.drawImage(overlay, dx, dy, dw, dh);
        }
        ctx.restore();
      }
    } else {
      const designed =
        product.printAreas.find((cfg) =>
          areas.some((a) => a.areaKey === cfg.key && a.elements.length > 0),
        ) ?? firstArea;
      if (designed) {
        const area = areas.find((a) => a.areaKey === designed.key);
        const overlay = document.createElement('canvas');
        renderAreaToCanvas(overlay, area, designed.width, designed.height, {
          background: '#ffffff',
        });
        const scale = Math.min((size * 0.85) / designed.width, (size * 0.85) / designed.height);
        const w = designed.width * scale;
        const h = designed.height * scale;
        ctx.drawImage(overlay, (size - w) / 2, (size - h) / 2, w, h);
      }
    }
    return canvas.toDataURL('image/webp', 0.85);
  } catch {
    return undefined;
  }
}
