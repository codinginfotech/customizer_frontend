import { useState } from 'react';
import {
  LayoutTemplate,
  Layers,
  Redo2,
  Shapes,
  Shirt,
  Sparkles,
  SlidersHorizontal,
  Type,
  Undo2,
  Upload,
  X,
} from 'lucide-react';
import clsx from 'clsx';
import { useDesignerStore, PanelTab } from '../../stores/designerStore';
import { PanelContent } from './SidePanel';
import { PropertiesPanel } from './panels/PropertiesPanel';

const TOOLS: { key: PanelTab; label: string; icon: typeof Type }[] = [
  { key: 'product', label: 'Product', icon: Shirt },
  { key: 'upload', label: 'Upload', icon: Upload },
  { key: 'text', label: 'Text', icon: Type },
  { key: 'shapes', label: 'Shapes', icon: Shapes },
  { key: 'graphics', label: 'Graphics', icon: Sparkles },
  { key: 'templates', label: 'Templates', icon: LayoutTemplate },
  { key: 'layers', label: 'Layers', icon: Layers },
];

/**
 * Mobile designer chrome: a bottom toolbar that opens tool panels as bottom
 * sheets, plus quick undo/redo and a properties sheet for selections.
 */
export function MobileToolbar() {
  const [openTab, setOpenTab] = useState<PanelTab | 'properties' | null>(null);
  const selectedId = useDesignerStore((s) => s.selectedId);
  const canUndo = useDesignerStore((s) => s.past.length > 0);
  const canRedo = useDesignerStore((s) => s.future.length > 0);
  const { undo, redo } = useDesignerStore.getState();

  return (
    <>
      {/* Bottom sheet */}
      {openTab && (
        <div className="fixed inset-x-0 bottom-0 z-40 max-h-[65dvh] overflow-y-auto rounded-t-2xl border-t border-gray-200 bg-white shadow-overlay animate-slide-up scroll-thin">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-4 py-2.5 backdrop-blur">
            <p className="text-sm font-semibold capitalize text-gray-900">{openTab}</p>
            <button className="icon-btn" aria-label="Close panel" onClick={() => setOpenTab(null)}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4 pb-8">
            {openTab === 'properties' ? <PropertiesPanel /> : <PanelContent tab={openTab} />}
          </div>
        </div>
      )}

      <nav className="no-scrollbar z-30 flex shrink-0 items-center gap-1 overflow-x-auto border-t border-gray-200 bg-white px-2 py-1.5">
        <button onClick={undo} disabled={!canUndo} className="icon-btn h-9 w-9 shrink-0">
          <Undo2 className="h-5 w-5" />
        </button>
        <button onClick={redo} disabled={!canRedo} className="icon-btn h-9 w-9 shrink-0">
          <Redo2 className="h-5 w-5" />
        </button>
        <div className="mx-1 h-6 w-px shrink-0 bg-gray-200" />
        {TOOLS.map((tool) => (
          <button
            key={tool.key}
            onClick={() => setOpenTab(openTab === tool.key ? null : tool.key)}
            className={clsx(
              'flex shrink-0 flex-col items-center gap-1 rounded-lg px-2.5 py-1.5 text-2xs font-medium transition-colors',
              openTab === tool.key ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900',
            )}
          >
            <tool.icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
            {tool.label}
          </button>
        ))}
        {selectedId && (
          <button
            onClick={() => setOpenTab(openTab === 'properties' ? null : 'properties')}
            className={clsx(
              'flex shrink-0 flex-col items-center gap-1 rounded-lg px-2.5 py-1.5 text-2xs font-medium transition-colors',
              openTab === 'properties' ? 'bg-gray-900 text-white' : 'text-brand-700',
            )}
          >
            <SlidersHorizontal className="h-[18px] w-[18px]" strokeWidth={1.8} />
            Edit
          </button>
        )}
      </nav>
    </>
  );
}
