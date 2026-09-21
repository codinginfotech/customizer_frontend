import type { DesignArea, DesignElement } from '@cpd/shared';
import type { Product } from '../types/catalog';

/**
 * Cross-product design portability (§74/§75). Print-area keys are the
 * semantic layer ("front" on a tee maps to "front" on a hoodie); matched
 * areas are rescaled to fit, unmatched source areas produce warnings.
 */

export interface TransferResult {
  areas: DesignArea[];
  productColor: string;
  warnings: string[];
  matchedAreas: number;
}

export function transferDesign(
  sourceAreas: DesignArea[],
  sourceProduct: Product,
  targetProduct: Product,
  productColor: string,
): TransferResult {
  const warnings: string[] = [];
  let matchedAreas = 0;

  const areas: DesignArea[] = targetProduct.printAreas.map((targetArea) => {
    const source = sourceAreas.find((a) => a.areaKey === targetArea.key);
    const sourceConfig = sourceProduct.printAreas.find((a) => a.key === targetArea.key);
    if (!source || !sourceConfig || source.elements.length === 0) {
      return { areaKey: targetArea.key, elements: [] };
    }
    matchedAreas += 1;
    const scale = Math.min(
      targetArea.width / sourceConfig.width,
      targetArea.height / sourceConfig.height,
    );
    const offsetX = (targetArea.width - sourceConfig.width * scale) / 2;
    const offsetY = (targetArea.height - sourceConfig.height * scale) / 2;
    const elements = source.elements.map((el) => {
      const copy = JSON.parse(JSON.stringify(el)) as DesignElement;
      copy.x = copy.x * scale + offsetX;
      copy.y = copy.y * scale + offsetY;
      if (copy.type === 'text') {
        copy.fontSize = Math.max(4, copy.fontSize * scale);
        copy.width *= scale;
      } else {
        copy.width *= scale;
        copy.height *= scale;
      }
      return copy;
    });
    return { areaKey: targetArea.key, elements };
  });

  // Unmatched source artwork
  for (const source of sourceAreas) {
    if (source.elements.length === 0) continue;
    if (!targetProduct.printAreas.some((a) => a.key === source.areaKey)) {
      const name =
        sourceProduct.printAreas.find((a) => a.key === source.areaKey)?.name ?? source.areaKey;
      warnings.push(
        `"${name}" artwork has no matching area on ${targetProduct.name} and was not transferred`,
      );
    }
  }
  if (matchedAreas === 0) {
    warnings.push('No print areas matched — the design starts empty on the new product.');
  }

  return { areas, productColor, warnings, matchedAreas };
}

// ---- pending transfer handoff between designer routes ----------------------

interface PendingTransfer {
  targetSlug: string;
  areas: DesignArea[];
  productColor: string;
}

let pending: PendingTransfer | null = null;

export function setPendingTransfer(transfer: PendingTransfer) {
  pending = transfer;
}

export function consumePendingTransfer(slug: string): PendingTransfer | null {
  if (pending && pending.targetSlug === slug) {
    const result = pending;
    pending = null;
    return result;
  }
  return null;
}
