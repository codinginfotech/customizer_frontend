import { describe, expect, it } from 'vitest';
import { transferDesign } from '../services/transferService';
import type { Product } from '../types/catalog';
import type { DesignArea } from '@cpd/shared';

function makeProduct(id: number, name: string, areaSpecs: Array<[string, number, number]>): Product {
  return {
    id,
    name,
    slug: name.toLowerCase(),
    description: null,
    basePrice: 10,
    pricingRules: null,
    featured: false,
    status: 'ACTIVE',
    category: { id: 1, name: 'Apparel', slug: 'apparel' },
    createdAt: '',
    images: [],
    variants: [],
    printAreas: areaSpecs.map(([key, width, height], i) => ({
      id: i,
      key,
      name: key,
      width,
      height,
      maxDesignWidth: null,
      maxDesignHeight: null,
      bleed: 0,
      safeArea: { x: 0, y: 0, width, height },
      physicalWidthIn: null,
      physicalHeightIn: null,
      mockup: null,
      templateImage: null,
      modelMeshName: null,
      textureConfig: null,
      sortOrder: i,
    })),
    model: null,
  };
}

const shirt = makeProduct(1, 'Shirt', [
  ['front', 450, 550],
  ['back', 450, 550],
  ['left_sleeve', 200, 220],
]);
const hoodie = makeProduct(2, 'Hoodie', [
  ['front', 450, 500],
  ['back', 450, 550],
  ['pocket', 300, 160],
]);
const mug = makeProduct(3, 'Mug', [['wrap', 800, 340]]);

const sourceAreas: DesignArea[] = [
  {
    areaKey: 'front',
    elements: [
      {
        id: 'e1',
        type: 'shape',
        shape: 'rect',
        x: 100,
        y: 100,
        width: 200,
        height: 100,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        flipX: false,
        flipY: false,
        shadow: null,
        fill: '#f00',
        stroke: '',
        strokeWidth: 0,
        cornerRadius: 0,
        sides: 5,
        points: 5,
        innerRadiusRatio: 0.5,
      },
    ],
  },
  {
    areaKey: 'left_sleeve',
    elements: [
      {
        id: 'e2',
        type: 'text',
        text: 'HI',
        x: 10,
        y: 10,
        rotation: 0,
        opacity: 1,
        locked: false,
        visible: true,
        flipX: false,
        flipY: false,
        shadow: null,
        fontFamily: 'Inter',
        fontSize: 30,
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
        width: 100,
        curve: 0,
      },
    ],
  },
];

describe('cross-product design transfer', () => {
  it('maps matching area keys and rescales artwork to fit', () => {
    const result = transferDesign(sourceAreas, shirt, hoodie, '#123456');
    const front = result.areas.find((a) => a.areaKey === 'front')!;
    expect(front.elements).toHaveLength(1);
    // hoodie front is 450x500 vs 450x550 → scale = 500/550
    const scale = 500 / 550;
    expect(front.elements[0].x).toBeCloseTo(100 * scale + (450 - 450 * scale) / 2, 3);
    expect((front.elements[0] as { width: number }).width).toBeCloseTo(200 * scale, 3);
    expect(result.matchedAreas).toBe(1);
    expect(result.productColor).toBe('#123456');
  });

  it('warns about artwork on areas the target lacks', () => {
    const result = transferDesign(sourceAreas, shirt, hoodie, '#fff');
    expect(result.warnings.some((w) => w.includes('left_sleeve'))).toBe(true);
    expect(result.areas.find((a) => a.areaKey === 'pocket')!.elements).toHaveLength(0);
  });

  it('reports an empty start when nothing matches', () => {
    const result = transferDesign(sourceAreas, shirt, mug, '#fff');
    expect(result.matchedAreas).toBe(0);
    expect(result.warnings.some((w) => w.includes('starts empty'))).toBe(true);
  });

  it('scales text fontSize with the area', () => {
    const bigSleeveTarget = makeProduct(4, 'Big', [['left_sleeve', 400, 440]]);
    const result = transferDesign(sourceAreas, shirt, bigSleeveTarget, '#fff');
    const sleeve = result.areas.find((a) => a.areaKey === 'left_sleeve')!;
    expect((sleeve.elements[0] as { fontSize: number }).fontSize).toBeCloseTo(60, 3);
  });
});
