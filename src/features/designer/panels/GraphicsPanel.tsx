import { useDesignerStore } from '../../../stores/designerStore';
import { newElementId } from '../../../utils/id';

/** Built-in vector graphics shipped with the app (public/graphics/*.svg). */
const GRAPHICS = [
  'heart', 'bolt', 'crown', 'flame', 'leaf', 'mountain',
  'paw', 'smiley', 'coffee', 'music', 'anchor', 'rocket',
].map((name) => ({ name, url: `/graphics/${name}.svg` }));

export function GraphicsPanel() {
  const addElement = useDesignerStore((s) => s.addElement);
  const product = useDesignerStore((s) => s.product);
  const activeAreaKey = useDesignerStore((s) => s.activeAreaKey);

  function add(url: string) {
    const areaConfig = product?.printAreas.find((a) => a.key === activeAreaKey);
    if (!areaConfig) return;
    const size = Math.round(Math.min(areaConfig.safeArea.width, areaConfig.safeArea.height) * 0.45);
    addElement({
      id: newElementId(),
      type: 'image',
      src: url,
      x: Math.round((areaConfig.width - size) / 2),
      y: Math.round((areaConfig.height - size) / 2),
      width: size,
      height: size,
      naturalWidth: 512,
      naturalHeight: 512,
      rotation: 0,
      opacity: 1,
      locked: false,
      visible: true,
      flipX: false,
      flipY: false,
      shadow: null,
    });
  }

  return (
    <div className="space-y-4">
      <p className="text-2xs leading-relaxed text-gray-500">
        Vector icons — they stay crisp at any print size.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {GRAPHICS.map((g) => (
          <button
            key={g.name}
            onClick={() => add(g.url)}
            className="flex aspect-square items-center justify-center rounded-lg border border-gray-200 bg-white p-3 text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
            title={g.name}
          >
            <img src={g.url} alt={g.name} className="h-full w-full object-contain" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
