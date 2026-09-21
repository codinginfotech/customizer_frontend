import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUp,
  ArrowUpToLine,
  Copy,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Layers,
  Lock,
  Shapes,
  Trash2,
  Type,
  Unlock,
} from 'lucide-react';
import clsx from 'clsx';
import { useDesignerStore } from '../../../stores/designerStore';

const iconBtn =
  'flex h-6 w-6 items-center justify-center rounded text-gray-400 transition-colors hover:bg-gray-200/70 hover:text-gray-900';

export function LayersPanel() {
  const areas = useDesignerStore((s) => s.areas);
  const activeAreaKey = useDesignerStore((s) => s.activeAreaKey);
  const selectedId = useDesignerStore((s) => s.selectedId);
  const { select, moveLayer, toggleLock, toggleVisible, removeElement, duplicateElement } =
    useDesignerStore.getState();

  const area = areas.find((a) => a.areaKey === activeAreaKey);
  const elements = area ? [...area.elements].reverse() : []; // top-most first

  if (elements.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-lg border border-dashed border-gray-300 bg-gray-50/60 px-4 py-10 text-center">
        <Layers className="h-5 w-5 text-gray-300" strokeWidth={1.8} />
        <p className="mt-3 text-xs font-medium text-gray-700">No layers yet</p>
        <p className="mt-1 text-2xs leading-relaxed text-gray-500">
          Add text, shapes or artwork and they will stack up here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-2xs text-gray-400">Top-most first · {elements.length} layers</p>

      <ul className="space-y-1">
        {elements.map((el) => {
          const label =
            el.type === 'text'
              ? el.text.split('\n')[0].slice(0, 22) || 'Text'
              : el.type === 'image'
                ? 'Image'
                : `${el.shape[0].toUpperCase()}${el.shape.slice(1)}`;
          const Icon = el.type === 'text' ? Type : el.type === 'image' ? ImageIcon : Shapes;
          const isSelected = selectedId === el.id;

          return (
            <li
              key={el.id}
              className={clsx(
                'group overflow-hidden rounded-lg border transition-colors',
                isSelected
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 bg-white hover:border-gray-300',
              )}
            >
              <div className="flex items-center gap-1.5 px-2 py-1.5">
                <button
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  onClick={() => select(el.id)}
                >
                  <Icon
                    className={clsx(
                      'h-3.5 w-3.5 shrink-0',
                      isSelected ? 'text-gray-900' : 'text-gray-400',
                    )}
                    strokeWidth={1.8}
                  />
                  <span
                    className={clsx(
                      'truncate text-xs',
                      el.visible === false
                        ? 'text-gray-300 line-through'
                        : isSelected
                          ? 'font-medium text-gray-900'
                          : 'text-gray-700',
                    )}
                  >
                    {label}
                  </span>
                </button>
                <button
                  onClick={() => toggleVisible(el.id)}
                  className={iconBtn}
                  title={el.visible === false ? 'Show layer' : 'Hide layer'}
                >
                  {el.visible === false ? (
                    <EyeOff className="h-3.5 w-3.5" />
                  ) : (
                    <Eye className="h-3.5 w-3.5" />
                  )}
                </button>
                <button
                  onClick={() => toggleLock(el.id)}
                  className={clsx(iconBtn, el.locked && 'text-amber-600')}
                  title={el.locked ? 'Unlock layer' : 'Lock layer'}
                >
                  {el.locked ? (
                    <Lock className="h-3.5 w-3.5" />
                  ) : (
                    <Unlock className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>

              {isSelected && (
                <div className="flex items-center gap-0.5 border-t border-gray-200 bg-white px-1.5 py-1">
                  <button
                    className={iconBtn}
                    title="Bring to front"
                    onClick={() => moveLayer(el.id, 'front')}
                  >
                    <ArrowUpToLine className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className={iconBtn}
                    title="Bring forward"
                    onClick={() => moveLayer(el.id, 'forward')}
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className={iconBtn}
                    title="Send backward"
                    onClick={() => moveLayer(el.id, 'backward')}
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className={iconBtn}
                    title="Send to back"
                    onClick={() => moveLayer(el.id, 'back')}
                  >
                    <ArrowDownToLine className="h-3.5 w-3.5" />
                  </button>
                  <span className="flex-1" />
                  <button
                    className={iconBtn}
                    title="Duplicate"
                    onClick={() => duplicateElement(el.id)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className={clsx(iconBtn, 'hover:bg-red-50 hover:text-red-700')}
                    title="Delete"
                    onClick={() => removeElement(el.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
