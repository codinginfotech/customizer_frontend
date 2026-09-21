import { computeTextArc, renderedText, type TextElement } from '@cpd/shared';

/** Measure a text element's rendered advance (single line) in px. */
export function measureTextWidth(el: TextElement): number {
  const canvas = measureCanvas();
  const ctx = canvas.getContext('2d')!;
  ctx.font = `${el.fontStyle === 'italic' ? 'italic ' : ''}${el.fontWeight} ${el.fontSize}px "${el.fontFamily}", sans-serif`;
  const text = renderedText(el).split('\n')[0] ?? '';
  const base = ctx.measureText(text).width;
  return base + Math.max(0, text.length - 1) * el.letterSpacing;
}

let cached: HTMLCanvasElement | null = null;
function measureCanvas(): HTMLCanvasElement {
  if (!cached) cached = document.createElement('canvas');
  return cached;
}

export interface ArcLayout {
  radius: number;
  cx: number;
  cy: number;
  up: boolean;
  /** SVG path data spanning the measured text, centered on the arc apex. */
  pathData: string;
  textLength: number;
}

/**
 * Arc layout for a curved text element — the SVG path is sized to the
 * measured text and centered, so Konva's TextPath (which starts text at the
 * path start) renders it centered like the other two renderers.
 */
export function layoutTextArc(el: TextElement): ArcLayout | null {
  const arc = computeTextArc(el.width, el.fontSize, el.curve);
  if (!arc) return null;
  const textLength = Math.min(measureTextWidth(el), el.width * 1.5) || 1;
  // Slight overshoot so TextPath never clips the final glyph.
  const padded = textLength * 1.02 + el.fontSize * 0.35;
  const half = Math.min(padded / (2 * arc.radius), Math.PI * 0.98);
  const point = (theta: number) => {
    if (arc.up) {
      return [arc.cx + arc.radius * Math.sin(theta), arc.cy - arc.radius * Math.cos(theta)];
    }
    return [arc.cx + arc.radius * Math.sin(theta), arc.cy + arc.radius * Math.cos(theta)];
  };
  const [sx, sy] = point(-half);
  const [ex, ey] = point(half);
  const large = half > Math.PI / 2 ? 1 : 0;
  const sweepFlag = arc.up ? 1 : 0;
  const pathData = `M ${sx} ${sy} A ${arc.radius} ${arc.radius} 0 ${large} ${sweepFlag} ${ex} ${ey}`;
  return { radius: arc.radius, cx: arc.cx, cy: arc.cy, up: arc.up, pathData, textLength };
}

/** Per-character placements along the arc (canvas rasterizer path). */
export function layoutArcCharacters(
  el: TextElement,
  measure: (ch: string) => number,
): Array<{ ch: string; x: number; y: number; angle: number }> | null {
  const arc = computeTextArc(el.width, el.fontSize, el.curve);
  if (!arc) return null;
  const text = renderedText(el).split('\n')[0] ?? '';
  const advances = [...text].map((ch) => measure(ch) + el.letterSpacing);
  const total = advances.reduce((a, b) => a + b, -el.letterSpacing);
  let s = -total / 2;
  const out: Array<{ ch: string; x: number; y: number; angle: number }> = [];
  [...text].forEach((ch, i) => {
    const mid = s + (advances[i] - el.letterSpacing) / 2;
    const theta = mid / arc.radius;
    if (arc.up) {
      out.push({
        ch,
        x: arc.cx + arc.radius * Math.sin(theta),
        y: arc.cy - arc.radius * Math.cos(theta),
        angle: theta,
      });
    } else {
      out.push({
        ch,
        x: arc.cx + arc.radius * Math.sin(theta),
        y: arc.cy + arc.radius * Math.cos(theta),
        angle: -theta,
      });
    }
    s += advances[i];
  });
  return out;
}
