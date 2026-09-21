import { Plus } from 'lucide-react';
import { useDesignerStore } from '../../../stores/designerStore';
import { defaultTextElement } from '../../../utils/designMath';
import { newElementId } from '../../../utils/id';
import type { TextElement } from '@cpd/shared';

const PRESETS: Array<{ label: string; preview: string; overrides: Partial<TextElement> }> = [
  {
    label: 'Heading',
    preview: 'Add a heading',
    overrides: { text: 'HEADING', fontSize: 56, fontWeight: 800 },
  },
  {
    label: 'Subheading',
    preview: 'Add a subheading',
    overrides: { text: 'Subheading', fontSize: 36, fontWeight: 600 },
  },
  {
    label: 'Body text',
    preview: 'Add body text',
    overrides: { text: 'Your text here', fontSize: 24, fontWeight: 400 },
  },
  {
    label: 'Script',
    preview: 'Something fancy',
    overrides: { text: 'Fancy', fontSize: 48, fontWeight: 400, fontFamily: 'Pacifico' },
  },
  {
    label: 'Athletic',
    preview: 'TEAM 07',
    overrides: {
      text: 'TEAM 07',
      fontSize: 52,
      fontWeight: 700,
      fontFamily: 'Oswald',
      letterSpacing: 4,
    },
  },
];

export function TextPanel() {
  const addElement = useDesignerStore((s) => s.addElement);
  const product = useDesignerStore((s) => s.product);
  const activeAreaKey = useDesignerStore((s) => s.activeAreaKey);

  function add(overrides: Partial<TextElement>) {
    const areaConfig = product?.printAreas.find((a) => a.key === activeAreaKey);
    if (!areaConfig) return;
    const base = defaultTextElement(overrides);
    const width = Math.min(base.width, areaConfig.safeArea.width);
    addElement({
      ...base,
      id: newElementId(),
      width,
      x: Math.round((areaConfig.width - width) / 2),
      y: Math.round(areaConfig.height / 3),
    });
  }

  return (
    <div className="space-y-4">
      <button className="btn-primary w-full" onClick={() => add({})}>
        <Plus className="h-4 w-4" /> Add a text box
      </button>

      <div>
        <p className="panel-title mb-2">Presets</p>
        <div className="space-y-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => add(preset.overrides)}
              className="group w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-left transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              <span
                className="block truncate leading-tight text-gray-900"
                style={{
                  fontFamily: preset.overrides.fontFamily ?? 'Inter',
                  fontWeight: preset.overrides.fontWeight ?? 700,
                  fontSize: Math.min(22, (preset.overrides.fontSize ?? 40) / 2.2),
                  letterSpacing: preset.overrides.letterSpacing,
                }}
              >
                {preset.preview}
              </span>
              <span className="mt-1 block text-2xs uppercase tracking-label text-gray-400">
                {preset.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="rounded-lg border border-dashed border-gray-300 bg-gray-50/60 px-3 py-2.5 text-2xs leading-relaxed text-gray-500">
        Double-click any text on the canvas to edit it. Font, size, spacing and colour live in the
        Inspector.
      </p>
    </div>
  );
}
