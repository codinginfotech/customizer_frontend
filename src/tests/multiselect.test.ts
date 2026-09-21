import { beforeEach, describe, expect, it } from 'vitest';
import { useDesignerStore } from '../stores/designerStore';
import type { Product } from '../types/catalog';
import type { ShapeElement } from '@cpd/shared';

const product: Product = {
  id: 1,
  name: 'Tee',
  slug: 'tee',
  description: null,
  basePrice: 10,
  pricingRules: null,
  featured: false,
  status: 'ACTIVE',
  category: { id: 1, name: 'Apparel', slug: 'apparel' },
  createdAt: '',
  images: [],
  variants: [],
  printAreas: [
    {
      id: 1,
      key: 'front',
      name: 'Front',
      width: 400,
      height: 400,
      maxDesignWidth: null,
      maxDesignHeight: null,
      bleed: 0,
      safeArea: { x: 20, y: 20, width: 360, height: 360 },
      physicalWidthIn: null,
      physicalHeightIn: null,
      mockup: null,
      templateImage: null,
      modelMeshName: null,
      textureConfig: null,
      sortOrder: 0,
    },
  ],
  model: null,
};

function shape(id: string, x: number, y: number, w = 40, h = 40): ShapeElement {
  return {
    id,
    type: 'shape',
    shape: 'rect',
    x,
    y,
    width: w,
    height: h,
    rotation: 0,
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

describe('multi-selection', () => {
  beforeEach(() => {
    const store = useDesignerStore.getState();
    store.initialize(product, null, null);
    store.addElement(shape('a', 10, 10));
    store.addElement(shape('b', 100, 60));
    store.addElement(shape('c', 200, 110));
  });

  it('toggleSelect builds and shrinks the selection set', () => {
    const store = useDesignerStore.getState();
    store.select('a');
    store.toggleSelect('b');
    expect(useDesignerStore.getState().selectedIds.sort()).toEqual(['a', 'b']);
    useDesignerStore.getState().toggleSelect('a');
    expect(useDesignerStore.getState().selectedIds).toEqual(['b']);
  });

  it('selectMany selects a set and tracks a primary', () => {
    useDesignerStore.getState().selectMany(['a', 'b', 'c']);
    const state = useDesignerStore.getState();
    expect(state.selectedIds).toHaveLength(3);
    expect(state.selectedId).toBe('a');
  });

  it('removeSelected deletes all unlocked selected elements in one undo step', () => {
    const store = useDesignerStore.getState();
    store.selectMany(['a', 'b']);
    const pastLen = useDesignerStore.getState().past.length;
    useDesignerStore.getState().removeSelected();
    let state = useDesignerStore.getState();
    expect(state.areas[0].elements.map((e) => e.id)).toEqual(['c']);
    expect(state.past.length).toBe(pastLen + 1);
    state.undo();
    state = useDesignerStore.getState();
    expect(state.areas[0].elements).toHaveLength(3);
  });

  it('align left snaps group members to the group left edge', () => {
    const store = useDesignerStore.getState();
    store.selectMany(['a', 'b', 'c']);
    useDesignerStore.getState().alignSelected('left');
    const xs = useDesignerStore.getState().areas[0].elements.map((e) => e.x);
    expect(xs).toEqual([10, 10, 10]);
  });

  it('a single element aligns against the safe area', () => {
    const store = useDesignerStore.getState();
    store.select('b');
    useDesignerStore.getState().alignSelected('centerX');
    const b = useDesignerStore.getState().areas[0].elements.find((e) => e.id === 'b')!;
    // safe area 20..380 → center 200; element w 40 → x=180
    expect(b.x).toBe(180);
  });

  it('distributes three elements evenly', () => {
    const store = useDesignerStore.getState();
    store.selectMany(['a', 'b', 'c']);
    useDesignerStore.getState().distributeSelected('y');
    const ys = useDesignerStore
      .getState()
      .areas[0].elements.slice()
      .sort((m, n) => m.y - n.y)
      .map((e) => e.y);
    expect(ys[1] - ys[0]).toBeCloseTo(ys[2] - ys[1], 5);
  });
});
