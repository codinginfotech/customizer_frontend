import type { ShapeElement, ShapeKind } from '@cpd/shared';
import { useDesignerStore } from '../../../stores/designerStore';
import { newElementId } from '../../../utils/id';

const SHAPES: Array<{ kind: ShapeKind; label: string; icon: JSX.Element }> = [
  {
    kind: 'rect',
    label: 'Rectangle',
    icon: <rect x="4" y="7" width="24" height="18" rx="2" />,
  },
  { kind: 'circle', label: 'Circle', icon: <circle cx="16" cy="16" r="11" /> },
  { kind: 'triangle', label: 'Triangle', icon: <polygon points="16,5 28,27 4,27" /> },
  { kind: 'line', label: 'Line', icon: <rect x="4" y="14.5" width="24" height="3" rx="1.5" /> },
  {
    kind: 'polygon',
    label: 'Polygon',
    icon: <polygon points="16,4 27,12 23,26 9,26 5,12" />,
  },
  {
    kind: 'star',
    label: 'Star',
    icon: <polygon points="16,4 19.5,12.5 28,13 21.5,18.5 23.5,27 16,22 8.5,27 10.5,18.5 4,13 12.5,12.5" />,
  },
];

export function ShapesPanel() {
  const addElement = useDesignerStore((s) => s.addElement);
  const product = useDesignerStore((s) => s.product);
  const activeAreaKey = useDesignerStore((s) => s.activeAreaKey);

  function add(kind: ShapeKind) {
    const areaConfig = product?.printAreas.find((a) => a.key === activeAreaKey);
    if (!areaConfig) return;
    const size = Math.round(Math.min(areaConfig.safeArea.width, areaConfig.safeArea.height) * 0.4);
    const el: ShapeElement = {
      id: newElementId(),
      type: 'shape',
      shape: kind,
      x: Math.round((areaConfig.width - size) / 2),
      y: Math.round((areaConfig.height - size) / 2),
      width: size,
      height: kind === 'line' ? 8 : size,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      flipX: false,
      flipY: false,
      shadow: null,
      fill: '#1a1816',
      stroke: '',
      strokeWidth: kind === 'line' ? 4 : 0,
      cornerRadius: 0,
      sides: 5,
      points: 5,
      innerRadiusRatio: 0.5,
    };
    addElement(el);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {SHAPES.map((s) => (
          <button
            key={s.kind}
            onClick={() => add(s.kind)}
            className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900"
            title={s.label}
          >
            <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current">
              {s.icon}
            </svg>
            <span className="text-2xs font-medium">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
