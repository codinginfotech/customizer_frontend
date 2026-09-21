import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRightLeft,
  Check,
  CloudOff,
  Command,
  Download,
  Keyboard,
  Loader2,
  Maximize2,
  Redo2,
  Save,
  Undo2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import clsx from 'clsx';
import { useDesignerStore } from '../../stores/designerStore';
import { useUiStore } from '../../stores/uiStore';
import { Segmented } from '../../components/ui';

/** Autosave state, rendered as a quiet dot + label rather than a loud badge. */
function SaveStatusChip() {
  const status = useDesignerStore((s) => s.saveStatus);
  const designId = useDesignerStore((s) => s.designId);
  if (!designId && status === 'idle') return null;

  const map = {
    idle: null,
    unsaved: { icon: CloudOff, text: 'Unsaved', cls: 'text-amber-400' },
    saving: { icon: Loader2, text: 'Saving…', cls: 'text-zinc-400' },
    saved: { icon: Check, text: 'Saved', cls: 'text-emerald-400' },
    error: { icon: CloudOff, text: 'Save failed', cls: 'text-red-400' },
  } as const;

  const item = map[status];
  if (!item) return null;

  return (
    <span
      className={clsx(
        'ml-1 hidden items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 text-2xs font-medium sm:flex',
        item.cls,
      )}
    >
      <item.icon className={clsx('h-3 w-3', status === 'saving' && 'animate-spin')} />
      {item.text}
    </span>
  );
}

const railBtn =
  'flex h-8 w-8 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/[.08] hover:text-zinc-100 disabled:opacity-25 disabled:hover:bg-transparent';

/** A grouped set of toolbar buttons sitting in a recessed well. */
function ToolGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-white/[.04] p-0.5">{children}</div>
  );
}

export function TopBar({
  onSave,
  onExport,
  onTransfer,
  compact = false,
  mobileView,
  onMobileViewChange,
}: {
  onSave: () => void;
  onExport: () => void;
  onTransfer?: () => void;
  compact?: boolean;
  mobileView?: 'design' | 'preview';
  onMobileViewChange?: (v: 'design' | 'preview') => void;
}) {
  const product = useDesignerStore((s) => s.product);
  const designName = useDesignerStore((s) => s.designName);
  const canUndo = useDesignerStore((s) => s.past.length > 0);
  const canRedo = useDesignerStore((s) => s.future.length > 0);
  const zoom = useDesignerStore((s) => s.zoom);
  const { undo, redo, setZoom } = useDesignerStore.getState();
  const workspaceMode = useUiStore((s) => s.workspaceMode);
  const setWorkspaceMode = useUiStore((s) => s.setWorkspaceMode);
  const setShortcutsOpen = useUiStore((s) => s.setShortcutsOpen);
  const setCommandPaletteOpen = useUiStore((s) => s.setCommandPaletteOpen);
  const setPresentationOpen = useUiStore((s) => s.setPresentationOpen);

  return (
    <header className="z-30 flex h-13 shrink-0 items-center justify-between gap-3 border-b border-white/[.07] bg-studio-chrome px-2.5 sm:px-3">
      {/* Identity */}
      <div className="flex min-w-0 flex-1 items-center gap-1.5">
        <Link
          to={product ? `/products/${product.slug}` : '/products'}
          className={railBtn}
          aria-label="Back to product"
          title="Back to product"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div className="mx-1 h-5 w-px bg-white/10" />
        <div className="min-w-0">
          <p className="truncate text-xs font-medium leading-tight text-zinc-100">
            {designName || 'Untitled design'}
          </p>
          <p className="truncate text-2xs leading-tight text-zinc-500">{product?.name}</p>
        </div>
        <SaveStatusChip />
      </div>

      {/* Canvas controls */}
      {!compact && (
        <div className="flex items-center gap-1.5">
          <ToolGroup>
            <button onClick={undo} disabled={!canUndo} className={railBtn} title="Undo · Ctrl+Z">
              <Undo2 className="h-4 w-4" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className={railBtn}
              title="Redo · Ctrl+Shift+Z"
            >
              <Redo2 className="h-4 w-4" />
            </button>
          </ToolGroup>

          <ToolGroup>
            <button onClick={() => setZoom(zoom - 0.25)} className={railBtn} title="Zoom out">
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              className="h-8 w-12 rounded-md text-2xs font-medium tabular text-zinc-400 transition-colors hover:bg-white/[.08] hover:text-zinc-100"
              onClick={() => setZoom(1)}
              title="Reset zoom to 100%"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button onClick={() => setZoom(zoom + 0.25)} className={railBtn} title="Zoom in">
              <ZoomIn className="h-4 w-4" />
            </button>
          </ToolGroup>

          <ToolGroup>
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex h-8 items-center gap-1.5 rounded-md px-2 text-2xs font-medium text-zinc-400 transition-colors hover:bg-white/[.08] hover:text-zinc-100"
              title="Command palette · Ctrl+K"
            >
              <Command className="h-3.5 w-3.5" />K
            </button>
            <button
              onClick={() => setShortcutsOpen(true)}
              className={railBtn}
              title="Keyboard shortcuts · ?"
            >
              <Keyboard className="h-4 w-4" />
            </button>
            {onTransfer && (
              <button
                onClick={onTransfer}
                className={railBtn}
                title="Move this design to another product"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setPresentationOpen(true)}
              className={railBtn}
              title="Presentation mode"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </ToolGroup>
        </div>
      )}

      {compact && onMobileViewChange && mobileView && (
        <Segmented
          dark
          size="sm"
          value={mobileView}
          onChange={onMobileViewChange}
          options={[
            { value: 'design', label: 'Design' },
            { value: 'preview', label: 'Preview' },
          ]}
        />
      )}

      {/* Actions */}
      <div className={clsx('flex shrink-0 items-center justify-end gap-2', !compact && 'flex-1')}>
        {!compact && (
          <div className="hidden lg:block">
            <Segmented
              dark
              size="sm"
              value={workspaceMode}
              onChange={setWorkspaceMode}
              options={[
                { value: 'simple', label: 'Simple', title: 'Fewer controls' },
                { value: 'advanced', label: 'Advanced', title: 'Every control' },
              ]}
            />
          </div>
        )}
        <button
          onClick={onExport}
          className="btn btn-sm hidden h-8 border border-white/[.12] bg-transparent text-zinc-200 hover:border-white/20 hover:bg-white/[.06] sm:inline-flex"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden lg:inline">Export</span>
        </button>
        <button
          onClick={onSave}
          className="btn btn-sm h-8 bg-white text-gray-900 hover:bg-zinc-200"
        >
          <Save className="h-3.5 w-3.5" /> Save
        </button>
      </div>
    </header>
  );
}
