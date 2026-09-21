import {
  AlertTriangle,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Copy,
  FlipHorizontal2,
  FlipVertical2,
  Italic,
  Lock,
  Trash2,
  Underline,
  Unlock,
  X,
} from 'lucide-react';
import clsx from 'clsx';
import { estimateDpi, ratePrintQuality } from '@cpd/shared';
import type { DesignElement, ImageElement, ShapeElement, TextElement } from '@cpd/shared';
import { useDesignerStore } from '../../../stores/designerStore';
import { FONT_FAMILIES, FONT_WEIGHTS, TEXT_COLORS } from '../../../utils/fonts';

function NumberInput({
  label,
  value,
  onChange,
  step = 1,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  min?: number;
  max?: number;
}) {
  return (
    <label className="flex flex-col gap-0.5">
      <span className="micro-label">{label}</span>
      <input
        type="number"
        className="input-sm tabular"
        value={Math.round(value * 10) / 10}
        step={step}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function ColorSwatches({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {TEXT_COLORS.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={clsx(
            'h-5 w-5 rounded-full border',
            value === c ? 'ring-2 ring-gray-900 ring-offset-1' : 'border-gray-300',
          )}
          style={{ backgroundColor: c }}
        />
      ))}
      <input
        type="color"
        value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : '#111111'}
        onChange={(e) => onChange(e.target.value)}
        className="h-6 w-6 cursor-pointer rounded border border-gray-300 p-0"
        title="Custom color"
      />
    </div>
  );
}

function MultiSelectTools({ count }: { count: number }) {
  const store = useDesignerStore.getState();
  const btn = 'icon-btn';
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-3 py-2">
        <p className="panel-title">{count} selected</p>
        <button className="icon-btn h-6 w-6" title="Deselect (Esc)" onClick={() => store.select(null)}>
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="p-3.5">
      <p className="micro-label mb-1.5">Align</p>
      <div className="flex items-center gap-1">
        <button className={btn} title="Align left" onClick={() => store.alignSelected('left')}>
          <AlignLeft className="h-4 w-4" />
        </button>
        <button className={btn} title="Align horizontal centers" onClick={() => store.alignSelected('centerX')}>
          <AlignCenter className="h-4 w-4" />
        </button>
        <button className={btn} title="Align right" onClick={() => store.alignSelected('right')}>
          <AlignRight className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-gray-200" />
        <button className={btn} title="Align top" onClick={() => store.alignSelected('top')}>
          <AlignLeft className="h-4 w-4 rotate-90" />
        </button>
        <button className={btn} title="Align vertical centers" onClick={() => store.alignSelected('centerY')}>
          <AlignCenter className="h-4 w-4 rotate-90" />
        </button>
        <button className={btn} title="Align bottom" onClick={() => store.alignSelected('bottom')}>
          <AlignRight className="h-4 w-4 rotate-90" />
        </button>
      </div>
      {count >= 3 && (
        <>
          <p className="micro-label mb-1.5 mt-4">Distribute</p>
          <div className="flex gap-2">
            <button className="btn-secondary btn-sm flex-1" onClick={() => store.distributeSelected('x')}>
              Horizontally
            </button>
            <button className="btn-secondary btn-sm flex-1" onClick={() => store.distributeSelected('y')}>
              Vertically
            </button>
          </div>
        </>
      )}
      <button className="btn-danger btn-sm mt-4 w-full" onClick={() => store.removeSelected()}>
        <Trash2 className="h-3.5 w-3.5" /> Delete {count} elements
      </button>
      </div>
    </div>
  );
}

export function PropertiesPanel() {
  const selectedIds = useDesignerStore((s) => s.selectedIds);
  const selected = useDesignerStore((s) => {
    if (!s.selectedId) return undefined;
    for (const area of s.areas) {
      const el = area.elements.find((e) => e.id === s.selectedId);
      if (el) return el;
    }
    return undefined;
  });
  const product = useDesignerStore((s) => s.product);
  const activeAreaKey = useDesignerStore((s) => s.activeAreaKey);

  if (selectedIds.length > 1) return <MultiSelectTools count={selectedIds.length} />;
  if (!selected) return null;
  const store = useDesignerStore.getState();
  const set = (patch: Partial<DesignElement>) =>
    store.updateElement(selected.id, patch, { history: true });

  const areaConfig = product?.printAreas.find((a) => a.key === activeAreaKey);

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-3 py-2">
        <p className="panel-title capitalize">{selected.type}</p>
        <button
          className="icon-btn h-6 w-6"
          title="Deselect (Esc)"
          onClick={() => store.select(null)}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto p-3.5 scroll-thin">

      {/* Common: position / size / rotation */}
      <div className="grid grid-cols-3 gap-2">
        <NumberInput label="X" value={selected.x} onChange={(v) => set({ x: v })} />
        <NumberInput label="Y" value={selected.y} onChange={(v) => set({ y: v })} />
        <NumberInput
          label="Rotate°"
          value={selected.rotation}
          onChange={(v) => set({ rotation: v })}
        />
        {selected.type !== 'text' && (
          <>
            <NumberInput
              label="Width"
              value={(selected as ShapeElement | ImageElement).width}
              min={4}
              onChange={(v) => set({ width: Math.max(4, v) } as Partial<DesignElement>)}
            />
            <NumberInput
              label="Height"
              value={(selected as ShapeElement | ImageElement).height}
              min={4}
              onChange={(v) => set({ height: Math.max(4, v) } as Partial<DesignElement>)}
            />
          </>
        )}
        <NumberInput
          label="Opacity %"
          value={selected.opacity * 100}
          min={0}
          max={100}
          onChange={(v) => set({ opacity: Math.min(1, Math.max(0, v / 100)) })}
        />
      </div>

      {/* Text-specific */}
      {selected.type === 'text' && (
        <TextProperties el={selected} set={set as (p: Partial<TextElement>) => void} />
      )}

      {/* Shape-specific */}
      {selected.type === 'shape' && (
        <ShapeProperties el={selected} set={set as (p: Partial<ShapeElement>) => void} />
      )}

      {/* Image-specific */}
      {selected.type === 'image' && areaConfig && (
        <ImageProperties el={selected} areaConfig={areaConfig} />
      )}

      {/* Effects (identical in editor, preview and production export) */}
      <ShadowControls el={selected} set={set} />

      {/* Flip + actions */}
      <div className="mt-4 flex items-center gap-1 border-t border-gray-100 pt-3">
        <button
          className={clsx('icon-btn', selected.flipX && 'icon-btn-active')}
          title="Flip horizontal"
          onClick={() => set({ flipX: !selected.flipX })}
        >
          <FlipHorizontal2 className="h-4 w-4" />
        </button>
        <button
          className={clsx('icon-btn', selected.flipY && 'icon-btn-active')}
          title="Flip vertical"
          onClick={() => set({ flipY: !selected.flipY })}
        >
          <FlipVertical2 className="h-4 w-4" />
        </button>
        <button
          className="icon-btn"
          title={selected.locked ? 'Unlock' : 'Lock'}
          onClick={() => store.toggleLock(selected.id)}
        >
          {selected.locked ? <Lock className="h-4 w-4 text-amber-500" /> : <Unlock className="h-4 w-4" />}
        </button>
        <span className="flex-1" />
        <button
          className="icon-btn"
          title="Duplicate (Ctrl+D)"
          onClick={() => store.duplicateElement(selected.id)}
        >
          <Copy className="h-4 w-4" />
        </button>
        <button
          className={clsx('icon-btn', 'hover:bg-red-50 hover:text-red-700')}
          title="Delete (Del)"
          onClick={() => store.removeElement(selected.id)}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      </div>
    </div>
  );
}

function ShadowControls({
  el,
  set,
}: {
  el: DesignElement;
  set: (p: Partial<DesignElement>) => void;
}) {
  const shadow = el.shadow;
  return (
    <div className="mt-4 border-t border-gray-100 pt-3">
      <label className="flex items-center justify-between">
        <span className="micro-label">Drop shadow</span>
        <input
          type="checkbox"
          checked={Boolean(shadow)}
          onChange={(e) =>
            set({
              shadow: e.target.checked
                ? { color: '#000000', blur: 8, offsetX: 4, offsetY: 4, opacity: 0.4 }
                : null,
            })
          }
        />
      </label>
      {shadow && (
        <div className="mt-2 grid grid-cols-4 items-end gap-2">
          <label className="flex flex-col gap-0.5">
            <span className="micro-label">Color</span>
            <input
              type="color"
              className="h-7 w-full cursor-pointer rounded border border-gray-300"
              value={shadow.color}
              onChange={(e) => set({ shadow: { ...shadow, color: e.target.value } })}
            />
          </label>
          <NumberInput label="Blur" value={shadow.blur} min={0} max={120} onChange={(v) => set({ shadow: { ...shadow, blur: v } })} />
          <NumberInput label="X" value={shadow.offsetX} onChange={(v) => set({ shadow: { ...shadow, offsetX: v } })} />
          <NumberInput label="Y" value={shadow.offsetY} onChange={(v) => set({ shadow: { ...shadow, offsetY: v } })} />
          <div className="col-span-4">
            <span className="micro-label">
              Shadow opacity {Math.round(shadow.opacity * 100)}%
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={shadow.opacity * 100}
              className="w-full accent-gray-900"
              onChange={(e) => set({ shadow: { ...shadow, opacity: Number(e.target.value) / 100 } })}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function TextProperties({ el, set }: { el: TextElement; set: (p: Partial<TextElement>) => void }) {
  return (
    <div className="mt-4 space-y-3 border-t border-gray-100 pt-3">
      <label className="block">
        <span className="micro-label">Font</span>
        <select
          className="input-sm mt-1"
          value={el.fontFamily}
          onChange={(e) => set({ fontFamily: e.target.value })}
          style={{ fontFamily: el.fontFamily }}
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f} value={f} style={{ fontFamily: f }}>
              {f}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-2">
        <NumberInput label="Size" value={el.fontSize} min={4} max={400} onChange={(v) => set({ fontSize: v })} />
        <label className="flex flex-col gap-0.5">
          <span className="micro-label">Weight</span>
          <select
            className="input-sm tabular"
            value={el.fontWeight}
            onChange={(e) => set({ fontWeight: Number(e.target.value) })}
          >
            {FONT_WEIGHTS.map((w) => (
              <option key={w.value} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
        </label>
        <NumberInput
          label="Spacing"
          value={el.letterSpacing}
          step={0.5}
          onChange={(v) => set({ letterSpacing: v })}
        />
        <NumberInput
          label="Line height"
          value={el.lineHeight}
          step={0.05}
          min={0.5}
          max={4}
          onChange={(v) => set({ lineHeight: v })}
        />
      </div>
      <div className="flex items-center gap-1">
        {(
          [
            ['left', AlignLeft],
            ['center', AlignCenter],
            ['right', AlignRight],
          ] as const
        ).map(([align, Icon]) => (
          <button
            key={align}
            className={clsx('icon-btn', el.align === align && 'icon-btn-active')}
            onClick={() => set({ align })}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
        <span className="mx-1 h-5 w-px bg-gray-200" />
        <button
          className={clsx('icon-btn', el.fontWeight >= 700 && 'icon-btn-active')}
          onClick={() => set({ fontWeight: el.fontWeight >= 700 ? 400 : 700 })}
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          className={clsx('icon-btn', el.fontStyle === 'italic' && 'icon-btn-active')}
          onClick={() => set({ fontStyle: el.fontStyle === 'italic' ? 'normal' : 'italic' })}
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          className={clsx('icon-btn', el.underline && 'icon-btn-active')}
          onClick={() => set({ underline: !el.underline })}
        >
          <Underline className="h-4 w-4" />
        </button>
      </div>
      <div>
        <span className="micro-label">Color</span>
        <div className="mt-1">
          <ColorSwatches value={el.fill} onChange={(fill) => set({ fill })} />
        </div>
      </div>

      {/* Curve (arc) — single-line text bends along a shared arc */}
      <div>
        <span className="micro-label">
          Curve {el.curve !== 0 ? `(${el.curve > 0 ? 'arch' : 'valley'} ${Math.abs(el.curve)})` : ''}
        </span>
        <input
          type="range"
          min={-100}
          max={100}
          value={el.curve}
          className="w-full accent-gray-900"
          onChange={(e) => set({ curve: Number(e.target.value) })}
          disabled={el.text.includes('\n')}
          title={el.text.includes('\n') ? 'Curved text supports a single line' : 'Bend text'}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="micro-label">Uppercase</span>
        <input type="checkbox" checked={el.uppercase} onChange={(e) => set({ uppercase: e.target.checked })} />
      </div>

      {/* Outline */}
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-0.5">
          <span className="micro-label">Outline color</span>
          <input
            type="color"
            className="h-8 w-full cursor-pointer rounded border border-gray-300"
            value={el.stroke || '#000000'}
            onChange={(e) => set({ stroke: e.target.value, ...(el.strokeWidth === 0 ? { strokeWidth: 2 } : {}) })}
          />
        </label>
        <NumberInput
          label="Outline width"
          value={el.strokeWidth}
          min={0}
          max={40}
          onChange={(v) => set({ strokeWidth: v, ...(v > 0 && !el.stroke ? { stroke: '#000000' } : {}) })}
        />
      </div>
    </div>
  );
}

function ShapeProperties({ el, set }: { el: ShapeElement; set: (p: Partial<ShapeElement>) => void }) {
  return (
    <div className="mt-4 space-y-3 border-t border-gray-100 pt-3">
      <div>
        <span className="micro-label">Fill</span>
        <div className="mt-1">
          <ColorSwatches value={el.fill} onChange={(fill) => set({ fill })} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col gap-0.5">
          <span className="micro-label">Stroke</span>
          <input
            type="color"
            className="h-8 w-full cursor-pointer rounded border border-gray-300"
            value={el.stroke || '#000000'}
            onChange={(e) => set({ stroke: e.target.value })}
          />
        </label>
        <NumberInput
          label="Stroke width"
          value={el.strokeWidth}
          min={0}
          max={100}
          onChange={(v) => set({ strokeWidth: v, ...(v > 0 && !el.stroke ? { stroke: '#111111' } : {}) })}
        />
        {el.shape === 'rect' && (
          <NumberInput
            label="Corner radius"
            value={el.cornerRadius}
            min={0}
            onChange={(v) => set({ cornerRadius: v })}
          />
        )}
        {el.shape === 'polygon' && (
          <NumberInput label="Sides" value={el.sides} min={3} max={24} onChange={(v) => set({ sides: Math.round(v) })} />
        )}
        {el.shape === 'star' && (
          <>
            <NumberInput label="Points" value={el.points} min={3} max={24} onChange={(v) => set({ points: Math.round(v) })} />
            <NumberInput
              label="Inner %"
              value={el.innerRadiusRatio * 100}
              min={5}
              max={95}
              onChange={(v) => set({ innerRadiusRatio: v / 100 })}
            />
          </>
        )}
      </div>
    </div>
  );
}

function ImageProperties({
  el,
  areaConfig,
}: {
  el: ImageElement;
  areaConfig: { width: number; physicalWidthIn: number | null };
}) {
  if (!el.naturalWidth || !areaConfig.physicalWidthIn || el.src.endsWith('.svg')) return null;
  const dpi = estimateDpi(el.naturalWidth, el.width, areaConfig.width, areaConfig.physicalWidthIn);
  const rating = ratePrintQuality(dpi);
  const styles = {
    good: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    acceptable: 'border-amber-200 bg-amber-50 text-amber-800',
    low: 'border-red-200 bg-red-50 text-red-800',
  } as const;
  const labels = { good: 'Good quality', acceptable: 'Acceptable', low: 'Low resolution' } as const;
  return (
    <div className={clsx('mt-4 rounded-lg border p-2.5 text-xs leading-relaxed', styles[rating])}>
      <p className="flex items-center gap-1.5 font-medium">
        {rating !== 'good' && <AlertTriangle className="h-3.5 w-3.5" />}
        {labels[rating]} · ~{dpi} DPI
      </p>
      {rating === 'low' && (
        <p className="mt-1 opacity-90">Your image may appear blurry when printed. Use a larger image or shrink it.</p>
      )}
      {rating === 'acceptable' && <p className="mt-1 opacity-90">Fine for most prints; 150+ DPI is ideal.</p>}
    </div>
  );
}
