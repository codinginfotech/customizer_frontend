import type { DesignArea, DesignElement, SafeArea, TextElement } from '@cpd/shared';

export function elementSize(el: DesignElement): { width: number; height: number } {
  if (el.type === 'text') {
    const lines = el.text.split('\n').length;
    return { width: el.width, height: lines * el.fontSize * el.lineHeight };
  }
  return { width: el.width, height: el.height };
}

/** Axis-aligned bounding box of an element after rotation about its top-left. */
export function elementBBox(el: DesignElement) {
  const { width, height } = elementSize(el);
  const rad = (el.rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const corners = [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ].map((p) => ({
    x: el.x + p.x * cos - p.y * sin,
    y: el.y + p.x * sin + p.y * cos,
  }));
  const xs = corners.map((c) => c.x);
  const ys = corners.map((c) => c.y);
  return {
    minX: Math.min(...xs),
    minY: Math.min(...ys),
    maxX: Math.max(...xs),
    maxY: Math.max(...ys),
  };
}

export function isOutsideSafeArea(el: DesignElement, safe: SafeArea): boolean {
  const box = elementBBox(el);
  return (
    box.minX < safe.x ||
    box.minY < safe.y ||
    box.maxX > safe.x + safe.width ||
    box.maxY > safe.y + safe.height
  );
}

export function areaHasOverflow(area: DesignArea | undefined, safe: SafeArea): boolean {
  if (!area) return false;
  return area.elements.some((el) => el.visible !== false && isOutsideSafeArea(el, safe));
}

export function defaultTextElement(overrides: Partial<TextElement> = {}): Omit<TextElement, 'id'> {
  return {
    type: 'text',
    text: 'Your text',
    x: 40,
    y: 40,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    flipX: false,
    flipY: false,
    shadow: null,
    fontFamily: 'Inter',
    fontSize: 42,
    fontWeight: 700,
    fontStyle: 'normal',
    underline: false,
    uppercase: false,
    letterSpacing: 0,
    lineHeight: 1.2,
    align: 'center',
    fill: '#111111',
    stroke: '',
    strokeWidth: 0,
    width: 280,
    curve: 0,
    ...overrides,
  };
}
