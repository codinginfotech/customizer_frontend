import { describe, expect, it } from 'vitest';
import { readinessFromIssues, validateDesignDocument, type ValidatableArea } from '@cpd/shared';

const areas: ValidatableArea[] = [
  {
    key: 'front',
    name: 'Front',
    width: 450,
    height: 550,
    safeArea: { x: 40, y: 50, width: 370, height: 450 },
    physicalWidthIn: 12,
  },
];

const baseText = {
  id: 't1',
  type: 'text',
  x: 100,
  y: 100,
  rotation: 0,
  width: 200,
  fontSize: 40,
  lineHeight: 1.2,
  text: 'HELLO',
};

describe('design validation engine', () => {
  it('flags an empty design as NOT_READY', () => {
    const issues = validateDesignDocument({ areas: [{ areaKey: 'front', elements: [] }] }, areas);
    expect(issues.some((i) => i.code === 'EMPTY_DESIGN')).toBe(true);
    expect(readinessFromIssues(issues)).toBe('NOT_READY');
  });

  it('passes a clean design', () => {
    const issues = validateDesignDocument(
      { areas: [{ areaKey: 'front', elements: [baseText] }] },
      areas,
    );
    expect(issues).toHaveLength(0);
    expect(readinessFromIssues(issues)).toBe('READY');
  });

  it('warns when an element crosses the safe margin', () => {
    const issues = validateDesignDocument(
      { areas: [{ areaKey: 'front', elements: [{ ...baseText, x: 5 }] }] },
      areas,
    );
    expect(issues.some((i) => i.code === 'OUTSIDE_SAFE_AREA')).toBe(true);
    expect(readinessFromIssues(issues)).toBe('WARNING');
  });

  it('errors when an element is fully outside the canvas', () => {
    const issues = validateDesignDocument(
      { areas: [{ areaKey: 'front', elements: [{ ...baseText, x: 2000 }] }] },
      areas,
    );
    expect(issues.some((i) => i.code === 'OUTSIDE_CANVAS' && i.level === 'error')).toBe(true);
    expect(readinessFromIssues(issues)).toBe('NOT_READY');
  });

  it('rates low-resolution images against the physical print size', () => {
    const image = {
      id: 'i1',
      type: 'image',
      x: 100,
      y: 100,
      rotation: 0,
      width: 300,
      height: 300,
      naturalWidth: 200, // 200px over 8in → 25 DPI
      src: '/uploads/x.png',
    };
    const issues = validateDesignDocument(
      { areas: [{ areaKey: 'front', elements: [image] }] },
      areas,
    );
    const low = issues.find((i) => i.code === 'LOW_RESOLUTION');
    expect(low).toBeDefined();
    expect(low!.level).toBe('error');
  });

  it('honors configurable production rules (min text px)', () => {
    const issues = validateDesignDocument(
      { areas: [{ areaKey: 'front', elements: [{ ...baseText, fontSize: 18 }] }] },
      areas,
      { minTextPx: 24 },
    );
    expect(issues.some((i) => i.code === 'TEXT_TOO_SMALL')).toBe(true);
  });

  it('skips SVG images in DPI checks (vectors scale freely)', () => {
    const svg = {
      id: 's1',
      type: 'image',
      x: 100,
      y: 100,
      rotation: 0,
      width: 300,
      height: 300,
      naturalWidth: 100,
      src: '/graphics/heart.svg',
    };
    const issues = validateDesignDocument({ areas: [{ areaKey: 'front', elements: [svg] }] }, areas);
    expect(issues.some((i) => i.code === 'LOW_RESOLUTION')).toBe(false);
  });
});
