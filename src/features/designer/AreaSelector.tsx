import clsx from 'clsx';
import { AlertTriangle } from 'lucide-react';
import { useDesignerStore } from '../../stores/designerStore';
import { areaHasOverflow } from '../../utils/designMath';

/** Bottom tab strip for switching print areas (Front / Back / Sleeve …). */
export function AreaSelector() {
  const product = useDesignerStore((s) => s.product);
  const activeAreaKey = useDesignerStore((s) => s.activeAreaKey);
  const areas = useDesignerStore((s) => s.areas);
  const setActiveArea = useDesignerStore((s) => s.setActiveArea);

  if (!product) return null;

  return (
    <div
      className="no-scrollbar flex shrink-0 items-center gap-1 overflow-x-auto border-t border-white/[.07] bg-studio-chrome px-2 py-1.5"
      role="tablist"
      aria-label="Print areas"
    >
      <span className="shrink-0 px-2 text-2xs uppercase tracking-label text-zinc-600">Area</span>
      {product.printAreas.map((cfg) => {
        const area = areas.find((a) => a.areaKey === cfg.key);
        const count = area?.elements.length ?? 0;
        const overflow = areaHasOverflow(area, cfg.safeArea);
        const isActive = activeAreaKey === cfg.key;

        return (
          <button
            key={cfg.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveArea(cfg.key)}
            className={clsx(
              'flex shrink-0 items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-150',
              isActive
                ? 'bg-white/[.10] text-zinc-50'
                : 'text-zinc-500 hover:bg-white/[.05] hover:text-zinc-200',
            )}
          >
            {cfg.name}
            {count > 0 && (
              <span
                className={clsx(
                  'flex h-4 min-w-4 items-center justify-center rounded px-1 text-2xs tabular',
                  isActive ? 'bg-white/20 text-zinc-100' : 'bg-white/[.07] text-zinc-500',
                )}
              >
                {count}
              </span>
            )}
            {overflow && (
              <AlertTriangle
                className="h-3.5 w-3.5 text-amber-400"
                strokeWidth={2}
                aria-label="Artwork extends past the safe area"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
