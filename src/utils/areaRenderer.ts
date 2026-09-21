import type { DesignArea, DesignElement, ShapeElement, TextElement } from '@cpd/shared';
import { renderedText } from '@cpd/shared';
import { layoutArcCharacters } from './textArc';

/**
 * Renders a design area's elements onto a plain 2D canvas. This is the
 * common rasterizer behind the 3D texture pipeline, the mockup preview and
 * saved-design thumbnails — everything renders from the same design JSON.
 */

// ---- image cache -----------------------------------------------------------
const imageCache = new Map<string, HTMLImageElement>();
const pending = new Map<string, Promise<HTMLImageElement>>();
const listeners = new Set<() => void>();

/** Subscribe to "an image finished loading" so callers can re-render. */
export function onImageLoaded(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCachedImage(src: string): HTMLImageElement | undefined {
  const img = imageCache.get(src);
  if (img) return img;
  if (!pending.has(src)) {
    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.crossOrigin = 'anonymous';
      el.onload = () => {
        imageCache.set(src, el);
        pending.delete(src);
        listeners.forEach((l) => l());
        resolve(el);
      };
      el.onerror = () => {
        pending.delete(src);
        reject(new Error('image load failed'));
      };
      el.src = src;
    });
    promise.catch(() => undefined);
    pending.set(src, promise);
  }
  return undefined;
}

// ---- drawing ---------------------------------------------------------------

/** Shadow color with the effect's own opacity folded in. */
function shadowColor(color: string, opacity: number): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(color.trim());
  if (m) {
    const n = parseInt(m[1], 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${opacity})`;
  }
  return color;
}

function withTransform(
  ctx: CanvasRenderingContext2D,
  el: DesignElement,
  w: number,
  h: number,
  draw: () => void,
) {
  ctx.save();
  ctx.globalAlpha = el.opacity;
  ctx.translate(el.x, el.y);
  ctx.rotate((el.rotation * Math.PI) / 180);
  if (el.flipX || el.flipY) {
    ctx.translate(el.flipX ? w : 0, el.flipY ? h : 0);
    ctx.scale(el.flipX ? -1 : 1, el.flipY ? -1 : 1);
  }
  if (el.shadow) {
    ctx.shadowColor = shadowColor(el.shadow.color, el.shadow.opacity);
    ctx.shadowBlur = el.shadow.blur;
    ctx.shadowOffsetX = el.shadow.offsetX;
    ctx.shadowOffsetY = el.shadow.offsetY;
  }
  draw();
  ctx.restore();
}

function paintGlyphs(ctx: CanvasRenderingContext2D, el: TextElement, text: string, x: number, y: number) {
  // paint-order: stroke first, fill on top — matches SVG paint-order="stroke".
  if (el.stroke && el.strokeWidth > 0) {
    ctx.strokeStyle = el.stroke;
    ctx.lineWidth = el.strokeWidth;
    ctx.lineJoin = 'round';
    ctx.strokeText(text, x, y);
  }
  ctx.fillText(text, x, y);
}

function drawText(ctx: CanvasRenderingContext2D, el: TextElement) {
  const content = renderedText(el);
  const lines = content.split('\n');
  const lineHeightPx = el.fontSize * el.lineHeight;
  ctx.font = `${el.fontStyle === 'italic' ? 'italic ' : ''}${el.fontWeight} ${el.fontSize}px "${el.fontFamily}", sans-serif`;
  ctx.fillStyle = el.fill;
  ctx.textBaseline = 'alphabetic';
  if ('letterSpacing' in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${el.letterSpacing}px`;
  }

  // Curved (single-line) text — characters placed along the shared arc.
  const arcChars = lines.length === 1 ? layoutArcCharacters(el, (ch) => ctx.measureText(ch).width) : null;
  if (arcChars) {
    ctx.textAlign = 'center';
    for (const c of arcChars) {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.angle);
      paintGlyphs(ctx, el, c.ch, 0, 0);
      ctx.restore();
    }
    if ('letterSpacing' in ctx) {
      (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0px';
    }
    return;
  }

  lines.forEach((line, i) => {
    const y = i * lineHeightPx + el.fontSize * 0.8;
    let x = 0;
    ctx.textAlign = el.align;
    if (el.align === 'center') x = el.width / 2;
    else if (el.align === 'right') x = el.width;
    paintGlyphs(ctx, el, line, x, y);
    if (el.underline && line.trim()) {
      const metrics = ctx.measureText(line);
      const lw = metrics.width;
      let ux = 0;
      if (el.align === 'center') ux = el.width / 2 - lw / 2;
      else if (el.align === 'right') ux = el.width - lw;
      ctx.save();
      ctx.strokeStyle = el.fill;
      ctx.lineWidth = Math.max(1, el.fontSize / 16);
      ctx.beginPath();
      ctx.moveTo(ux, y + el.fontSize * 0.12);
      ctx.lineTo(ux + lw, y + el.fontSize * 0.12);
      ctx.stroke();
      ctx.restore();
    }
  });
  if ('letterSpacing' in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0px';
  }
}

function tracePolygon(ctx: CanvasRenderingContext2D, sides: number, w: number, h: number) {
  const rx = w / 2;
  const ry = h / 2;
  ctx.beginPath();
  for (let i = 0; i < sides; i += 1) {
    const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
    const px = rx + rx * Math.cos(angle);
    const py = ry + ry * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function traceStar(ctx: CanvasRenderingContext2D, points: number, inner: number, w: number, h: number) {
  const rx = w / 2;
  const ry = h / 2;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const f = i % 2 === 0 ? 1 : inner;
    const px = rx + rx * f * Math.cos(angle);
    const py = ry + ry * f * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function drawShape(ctx: CanvasRenderingContext2D, el: ShapeElement) {
  const { width: w, height: h } = el;
  const fillAndStroke = () => {
    if (el.fill) {
      ctx.fillStyle = el.fill;
      ctx.fill();
    }
    if (el.stroke && el.strokeWidth > 0) {
      ctx.strokeStyle = el.stroke;
      ctx.lineWidth = el.strokeWidth;
      ctx.stroke();
    }
  };
  switch (el.shape) {
    case 'rect': {
      ctx.beginPath();
      const r = Math.min(el.cornerRadius, w / 2, h / 2);
      if (r > 0 && 'roundRect' in ctx) {
        (ctx as CanvasRenderingContext2D).roundRect(0, 0, w, h, r);
      } else {
        ctx.rect(0, 0, w, h);
      }
      fillAndStroke();
      break;
    }
    case 'circle':
      ctx.beginPath();
      ctx.ellipse(w / 2, h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
      fillAndStroke();
      break;
    case 'triangle':
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      fillAndStroke();
      break;
    case 'line':
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.strokeStyle = el.stroke || el.fill;
      ctx.lineWidth = Math.max(el.strokeWidth, 2);
      ctx.lineCap = 'round';
      ctx.stroke();
      break;
    case 'polygon':
      tracePolygon(ctx, el.sides, w, h);
      fillAndStroke();
      break;
    case 'star':
      traceStar(ctx, el.points, el.innerRadiusRatio, w, h);
      fillAndStroke();
      break;
  }
}

export interface RenderAreaOptions {
  /** Fill color behind elements (e.g. product color for 3D textures). */
  background?: string | null;
  /** Scale factor from area units to canvas pixels. */
  scale?: number;
}

export function renderAreaToCanvas(
  canvas: HTMLCanvasElement,
  area: DesignArea | undefined,
  areaWidth: number,
  areaHeight: number,
  options: RenderAreaOptions = {},
) {
  const scale = options.scale ?? 1;
  canvas.width = Math.max(1, Math.round(areaWidth * scale));
  canvas.height = Math.max(1, Math.round(areaHeight * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (options.background) {
    ctx.fillStyle = options.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  if (!area) return;
  ctx.save();
  ctx.scale(scale, scale);
  for (const el of area.elements) {
    if (el.visible === false) continue;
    if (el.type === 'text') {
      withTransform(ctx, el, el.width, el.text.split('\n').length * el.fontSize * el.lineHeight, () =>
        drawText(ctx, el),
      );
    } else if (el.type === 'shape') {
      withTransform(ctx, el, el.width, el.height, () => drawShape(ctx, el));
    } else if (el.type === 'image') {
      const img = getCachedImage(el.src);
      if (img) {
        withTransform(ctx, el, el.width, el.height, () => {
          if (el.crop) {
            ctx.drawImage(
              img,
              el.crop.x,
              el.crop.y,
              el.crop.width,
              el.crop.height,
              0,
              0,
              el.width,
              el.height,
            );
          } else {
            ctx.drawImage(img, 0, 0, el.width, el.height);
          }
        });
      }
    }
  }
  ctx.restore();
}
