import { beforeEach, describe, expect, it } from 'vitest';
import { useDesignerStore } from '../stores/designerStore';
import type { Product } from '../types/catalog';
import type { ShapeElement, TextElement } from '@cpd/shared';

const product: Product = {
  id: 1,
  name: 'Test Tee',
  slug: 'test-tee',
  description: null,
  basePrice: 15,
  pricingRules: null,
  featured: false,
  status: 'ACTIVE',
  category: { id: 1, name: 'Apparel', slug: 'apparel' },
  createdAt: new Date().toISOString(),
  images: [],
  variants: [
    {
      id: 10,
      name: 'White / M',
      color: '#ffffff',
      colorName: 'White',
      size: 'M',
      material: null,
      sku: 'T-W-M',
      price: null,
      stock: 10,
      status: 'ACTIVE',
    },
  ],
  printAreas: [
    {
      id: 100,
      key: 'front',
      name: 'Front',
      width: 450,
      height: 550,
      maxDesignWidth: null,
      maxDesignHeight: null,
      bleed: 0,
      safeArea: { x: 40, y: 50, width: 370, height: 450 },
      physicalWidthIn: 12,
      physicalHeightIn: 14.7,
      mockup: null,
      templateImage: null,
      modelMeshName: 'front',
      textureConfig: null,
      sortOrder: 0,
    },
    {
      id: 101,
      key: 'back',
      name: 'Back',
      width: 450,
      height: 550,
      maxDesignWidth: null,
      maxDesignHeight: null,
      bleed: 0,
      safeArea: { x: 40, y: 50, width: 370, height: 450 },
      physicalWidthIn: 12,
      physicalHeightIn: 14.7,
      mockup: null,
      templateImage: null,
      modelMeshName: 'back',
      textureConfig: null,
      sortOrder: 1,
    },
  ],
  model: null,
};

function shape(id: string): ShapeElement {
  return {
    id,
    type: 'shape',
    shape: 'rect',
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    rotation: 0,
    opacity: 1,
    locked: false,
    visible: true,
    flipX: false,
    flipY: false,
    shadow: null,
    fill: '#ff0000',
    stroke: '',
    strokeWidth: 0,
    cornerRadius: 0,
    sides: 5,
    points: 5,
    innerRadiusRatio: 0.5,
  };
}

describe('designerStore', () => {
  beforeEach(() => {
    useDesignerStore.getState().initialize(product, product.variants[0], null);
  });

  it('initializes areas from product print areas', () => {
    const state = useDesignerStore.getState();
    expect(state.areas.map((a) => a.areaKey)).toEqual(['front', 'back']);
    expect(state.activeAreaKey).toBe('front');
    expect(state.productColor).toBe('#ffffff');
  });

  it('adds elements to the active area and selects them', () => {
    const store = useDesignerStore.getState();
    store.addElement(shape('s1'));
    const state = useDesignerStore.getState();
    expect(state.areas[0].elements).toHaveLength(1);
    expect(state.selectedId).toBe('s1');
    expect(state.dirty).toBe(true);
  });

  it('supports undo and redo across mutations', () => {
    const store = useDesignerStore.getState();
    store.addElement(shape('s1'));
    store.addElement(shape('s2'));
    expect(useDesignerStore.getState().areas[0].elements).toHaveLength(2);

    useDesignerStore.getState().undo();
    expect(useDesignerStore.getState().areas[0].elements).toHaveLength(1);

    useDesignerStore.getState().undo();
    expect(useDesignerStore.getState().areas[0].elements).toHaveLength(0);

    useDesignerStore.getState().redo();
    useDesignerStore.getState().redo();
    expect(useDesignerStore.getState().areas[0].elements).toHaveLength(2);
  });

  it('does not record history for transient updates but does on commit', () => {
    const store = useDesignerStore.getState();
    store.addElement(shape('s1'));
    const pastLen = useDesignerStore.getState().past.length;
    store.updateElement('s1', { x: 200 }); // transient (drag move)
    expect(useDesignerStore.getState().past.length).toBe(pastLen);
    store.updateElement('s1', { x: 300 }, { history: true }); // committed
    expect(useDesignerStore.getState().past.length).toBe(pastLen + 1);
  });

  it('records one history entry per drag via begin/endTransform', () => {
    const store = useDesignerStore.getState();
    store.addElement(shape('s1'));
    const pastLen = useDesignerStore.getState().past.length;
    store.beginTransform();
    store.updateElement('s1', { x: 110 });
    store.updateElement('s1', { x: 140 });
    store.updateElement('s1', { x: 180 });
    useDesignerStore.getState().endTransform();
    const state = useDesignerStore.getState();
    expect(state.past.length).toBe(pastLen + 1);
    state.undo();
    const el = useDesignerStore.getState().areas[0].elements[0];
    expect(el.x).toBe(100);
  });

  it('duplicates elements with an offset and a new id', () => {
    const store = useDesignerStore.getState();
    store.addElement(shape('s1'));
    store.duplicateElement('s1');
    const els = useDesignerStore.getState().areas[0].elements;
    expect(els).toHaveLength(2);
    expect(els[1].id).not.toBe('s1');
    expect(els[1].x).toBe(120);
  });

  it('copies and pastes through the clipboard', () => {
    const store = useDesignerStore.getState();
    store.addElement(shape('s1'));
    store.copyElement('s1');
    useDesignerStore.getState().paste();
    expect(useDesignerStore.getState().areas[0].elements).toHaveLength(2);
  });

  it('reorders layers', () => {
    const store = useDesignerStore.getState();
    store.addElement(shape('a'));
    store.addElement(shape('b'));
    store.addElement(shape('c'));
    useDesignerStore.getState().moveLayer('a', 'front');
    expect(useDesignerStore.getState().areas[0].elements.map((e) => e.id)).toEqual(['b', 'c', 'a']);
    useDesignerStore.getState().moveLayer('a', 'backward');
    expect(useDesignerStore.getState().areas[0].elements.map((e) => e.id)).toEqual(['b', 'a', 'c']);
  });

  it('keeps per-area element lists independent', () => {
    const store = useDesignerStore.getState();
    store.addElement(shape('front-el'));
    store.setActiveArea('back');
    useDesignerStore.getState().addElement(shape('back-el'));
    const state = useDesignerStore.getState();
    expect(state.areas[0].elements.map((e) => e.id)).toEqual(['front-el']);
    expect(state.areas[1].elements.map((e) => e.id)).toEqual(['back-el']);
  });

  it('builds a valid design document', () => {
    const store = useDesignerStore.getState();
    store.addElement(shape('s1'));
    const doc = useDesignerStore.getState().buildDocument();
    expect(doc).not.toBeNull();
    expect(doc!.productId).toBe(1);
    expect(doc!.variantId).toBe(10);
    expect(doc!.areas.find((a) => a.areaKey === 'front')!.elements).toHaveLength(1);
  });

  it('applies templates scaled into the active area', () => {
    const store = useDesignerStore.getState();
    const text: TextElement = {
      id: 'tpl',
      type: 'text',
      text: 'HELLO',
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      flipX: false,
      flipY: false,
      shadow: null,
      fontFamily: 'Inter',
      fontSize: 100,
      fontWeight: 700,
      fontStyle: 'normal',
      underline: false,
      uppercase: false,
      letterSpacing: 0,
      lineHeight: 1.2,
      align: 'center',
      fill: '#000',
      stroke: '',
      strokeWidth: 0,
      width: 900,
      curve: 0,
    };
    store.applyTemplate({
      id: 1,
      name: 'T',
      category: 'Test',
      previewImage: null,
      status: 'ACTIVE',
      templateJson: { canvas: { width: 900, height: 1100 }, elements: [text] },
    });
    const el = useDesignerStore.getState().areas[0].elements[0] as TextElement;
    expect(el.id).not.toBe('tpl');
    expect(el.width).toBe(450); // scaled 0.5×
    expect(el.fontSize).toBe(50);
  });

  it('restores saved designs and merges new product areas', () => {
    const store = useDesignerStore.getState();
    store.initialize(product, null, {
      id: 55,
      name: 'Saved',
      doc: {
        version: 1,
        productId: 1,
        variantId: 10,
        productColor: '#123456',
        areas: [{ areaKey: 'front', elements: [shape('old')] }],
      },
    });
    const state = useDesignerStore.getState();
    expect(state.designId).toBe(55);
    expect(state.productColor).toBe('#123456');
    expect(state.areas).toHaveLength(2); // back added from product config
    expect(state.areas[0].elements[0].id).toBe('old');
    expect(state.saveStatus).toBe('saved');
  });
});
