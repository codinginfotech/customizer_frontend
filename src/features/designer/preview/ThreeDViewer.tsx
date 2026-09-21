import { ProductStage } from '../../../engine3d/ProductStage';
import { useUiStore } from '../../../stores/uiStore';

/** Thin wrapper over the Product3DEngine stage (kept for import stability). */
export function ThreeDViewer() {
  const technicalView = useUiStore((s) => s.technicalView);
  return <ProductStage technicalView={technicalView} />;
}
