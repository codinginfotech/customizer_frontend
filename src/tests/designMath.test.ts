import { describe, expect, it } from 'vitest';
import { elementBBox, isOutsideSafeArea } from '../utils/designMath';
import type { ShapeElement } from '@cpd/shared';

function rect(x: number, y: number, w: number, h: number, rotation = 0): ShapeElement {
  return {
    id: 'r',
    type: 'shape',
    shape: 'rect',
    x,
    y,
    width: w,
    height: h,
    rotation,
    opacity: 1,
    locked: false,
    visible: true,
    flipX: false,
    flipY: false,
    shadow: null,
    fill: '#000',
    stroke: '',
    strokeWidth: 0,
    cornerRadius: 0,
    sides: 5,
    points: 5,
    innerRadiusRatio: 0.5,
  };
}

const safe = { x: 40, y: 50, width: 370, height: 450 };

describe('safe-area math', () => {
  it('accepts elements fully inside the safe area', () => {
    expect(isOutsideSafeArea(rect(100, 100, 50, 50), safe)).toBe(false);
  });

  it('flags elements that cross the safe boundary', () => {
    expect(isOutsideSafeArea(rect(10, 100, 50, 50), safe)).toBe(true);
    expect(isOutsideSafeArea(rect(400, 480, 50, 50), safe)).toBe(true);
  });

  it('accounts for rotation when computing the bounding box', () => {
    const el = rect(300, 100, 100, 10, 90);
    const box = elementBBox(el);
    expect(box.minX).toBeCloseTo(290, 0);
    // A 100×10 bar near the bottom edge fits unrotated, but rotated 90°
    // it swings below the safe boundary.
    expect(isOutsideSafeArea(rect(100, 480, 100, 10), safe), 'unrotated fits').toBe(false);
    expect(isOutsideSafeArea(rect(100, 480, 100, 10, 90), safe)).toBe(true);
  });
});
