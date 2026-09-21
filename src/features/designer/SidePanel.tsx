import {
  Image as ImageIcon,
  LayoutTemplate,
  Layers,
  Shapes,
  Shirt,
  Sparkles,
  Type,
  Upload,
} from 'lucide-react';
import clsx from 'clsx';
import { useDesignerStore, PanelTab } from '../../stores/designerStore';
import { ProductPanel } from './panels/ProductPanel';
import { UploadPanel } from './panels/UploadPanel';
import { TextPanel } from './panels/TextPanel';
import { ShapesPanel } from './panels/ShapesPanel';
import { GraphicsPanel } from './panels/GraphicsPanel';
import { TemplatesPanel } from './panels/TemplatesPanel';
import { LayersPanel } from './panels/LayersPanel';

const TABS: { key: PanelTab; label: string; icon: typeof Shirt; hint: string }[] = [
  { key: 'product', label: 'Product', icon: Shirt, hint: 'Colour, size and view' },
  { key: 'upload', label: 'Upload', icon: Upload, hint: 'Your artwork' },
  { key: 'text', label: 'Text', icon: Type, hint: 'Headlines and lettering' },
  { key: 'shapes', label: 'Shapes', icon: Shapes, hint: 'Rectangles, circles, lines' },
  { key: 'graphics', label: 'Graphics', icon: Sparkles, hint: 'Built-in icon library' },
  { key: 'templates', label: 'Templates', icon: LayoutTemplate, hint: 'Starting layouts' },
  { key: 'layers', label: 'Layers', icon: Layers, hint: 'Stacking order' },
];

export function PanelContent({ tab }: { tab: PanelTab }) {
  switch (tab) {
    case 'product':
      return <ProductPanel />;
    case 'upload':
      return <UploadPanel />;
    case 'text':
      return <TextPanel />;
    case 'shapes':
      return <ShapesPanel />;
    case 'graphics':
      return <GraphicsPanel />;
    case 'templates':
      return <TemplatesPanel />;
    case 'layers':
      return <LayersPanel />;
    default:
      return null;
  }
}

export function SidePanel() {
  const activeTab = useDesignerStore((s) => s.activeTab);
  const setActiveTab = useDesignerStore((s) => s.setActiveTab);
  const active = TABS.find((t) => t.key === activeTab);

  return (
    <div className="flex shrink-0 border-r border-white/[.07]">
      {/* Icon rail — dark studio chrome, active tab marked by an ember edge */}
      <nav
        className="flex w-[68px] flex-col items-center gap-0.5 bg-studio-chrome py-2"
        aria-label="Design tools"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              aria-current={isActive}
              title={tab.hint}
              className={clsx(
                'group relative flex w-[60px] flex-col items-center gap-1 rounded-lg py-2.5 text-2xs font-medium transition-colors duration-150',
                isActive
                  ? 'bg-white/[.07] text-zinc-100'
                  : 'text-zinc-500 hover:bg-white/[.04] hover:text-zinc-300',
              )}
            >
              <span
                className={clsx(
                  'absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-brand-500 transition-all duration-200',
                  isActive ? 'opacity-100' : 'scale-y-0 opacity-0',
                )}
                aria-hidden
              />
              <tab.icon
                className={clsx('h-[18px] w-[18px]', isActive && 'text-brand-400')}
                strokeWidth={1.8}
              />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Active panel — light working surface with a titled header */}
      <div className="flex w-72 flex-col bg-white">
        <header className="flex shrink-0 items-baseline justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">{active?.label}</h2>
          <p className="truncate pl-3 text-2xs text-gray-400">{active?.hint}</p>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 scroll-thin" aria-live="polite">
          <PanelContent tab={activeTab} />
        </div>
      </div>
    </div>
  );
}

export { ImageIcon };
