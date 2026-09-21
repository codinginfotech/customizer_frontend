import { useCallback, useRef, useState } from 'react';
import { useDesignerStore } from '../../stores/designerStore';
import { useUiStore } from '../../stores/uiStore';
import { useAutosave } from '../../hooks/useAutosave';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { useIsDesktop } from '../../hooks/useMediaQuery';
import { TopBar } from './TopBar';
import { SidePanel } from './SidePanel';
import { CanvasEditor } from './canvas/CanvasEditor';
import { AreaSelector } from './AreaSelector';
import { PreviewPanel } from './preview/PreviewPanel';
import { PropertiesPanel } from './panels/PropertiesPanel';
import { SaveDesignModal } from './SaveDesignModal';
import { ExportModal } from './ExportModal';
import { ShortcutsModal } from './ShortcutsModal';
import { MobileToolbar } from './MobileToolbar';
import { CommandPalette } from './CommandPalette';
import { TransferModal } from './TransferModal';
import { PresentationOverlay } from './PresentationOverlay';

/**
 * The studio shell: dark professional chrome (top bar, tool rail, dock
 * headers) around a light working canvas and inspector — with a contextual
 * right dock that shows the Inspector while something is selected and the
 * live product preview otherwise (§53).
 */
export function DesignerLayout() {
  const isDesktop = useIsDesktop();
  const selectedIds = useDesignerStore((s) => s.selectedIds);
  const workspaceMode = useUiStore((s) => s.workspaceMode);
  const [saveOpen, setSaveOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [transferOpen, setTransferOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'design' | 'preview'>('design');
  const [dockWidth, setDockWidth] = useState(() => {
    try {
      return Number(localStorage.getItem('cpd.dockWidth')) || 380;
    } catch {
      return 380;
    }
  });
  const dragging = useRef(false);

  const startDockResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    const onMove = (ev: MouseEvent) => {
      if (!dragging.current) return;
      const width = Math.min(560, Math.max(320, window.innerWidth - ev.clientX));
      setDockWidth(width);
    };
    const onUp = () => {
      dragging.current = false;
      setDockWidth((w) => {
        try {
          localStorage.setItem('cpd.dockWidth', String(w));
        } catch {
          /* private mode */
        }
        return w;
      });
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, []);

  useAutosave();
  useKeyboardShortcuts();

  const modals = (
    <>
      <SaveDesignModal open={saveOpen} onClose={() => setSaveOpen(false)} />
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
      <TransferModal open={transferOpen} onClose={() => setTransferOpen(false)} />
      <ShortcutsModal />
      <CommandPalette onSave={() => setSaveOpen(true)} onExport={() => setExportOpen(true)} />
      <PresentationOverlay />
    </>
  );

  if (!isDesktop) {
    return (
      <div className="flex h-[100dvh] flex-col bg-studio-base [--studio-canvas:#f0ede8]">
        <TopBar
          compact
          onSave={() => setSaveOpen(true)}
          onExport={() => setExportOpen(true)}
          mobileView={mobileView}
          onMobileViewChange={setMobileView}
        />
        <div className="relative flex-1 overflow-hidden bg-surface-sunken">
          {mobileView === 'design' ? <CanvasEditor /> : <PreviewPanel />}
        </div>
        <AreaSelector />
        <MobileToolbar />
        {modals}
      </div>
    );
  }

  const hasSelection = selectedIds.length > 0;

  return (
    <div className="flex h-screen flex-col bg-studio-base [--studio-canvas:#232120]">
      <TopBar
        onSave={() => setSaveOpen(true)}
        onExport={() => setExportOpen(true)}
        onTransfer={() => setTransferOpen(true)}
      />
      <div className="flex min-h-0 flex-1">
        {/* Left: tool rail + active panel */}
        <SidePanel />

        {/* Center: canvas + area tabs */}
        <div className="relative flex min-w-0 flex-1 flex-col">
          <CanvasEditor />
          <AreaSelector />
        </div>

        {/* Right dock: contextual — Inspector on selection, live preview otherwise */}
        <div
          onMouseDown={startDockResize}
          role="separator"
          aria-orientation="vertical"
          className="group hidden w-1 shrink-0 cursor-col-resize items-center justify-center bg-studio-chrome transition-colors hover:bg-brand-600/60 xl:flex"
          title="Drag to resize the dock"
        >
          <div className="h-8 w-px rounded bg-white/15 transition-colors group-hover:bg-white/40" />
        </div>
        <div
          className="hidden flex-col border-l border-white/[.07] bg-studio-chrome xl:flex"
          style={{ width: dockWidth }}
        >
          {hasSelection ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <header className="flex shrink-0 items-baseline justify-between border-b border-white/[.07] px-4 py-2.5">
                <h2 className="text-xs font-semibold text-zinc-100">Inspector</h2>
                <p className="text-2xs text-zinc-500">
                  {selectedIds.length} selected
                </p>
              </header>
              <div className="min-h-0 flex-1 overflow-y-auto p-3 scroll-thin">
                <PropertiesPanel />
                {workspaceMode === 'advanced' && (
                  <p className="mt-3 px-1 text-2xs leading-relaxed text-zinc-600">
                    Esc deselects — the live preview returns when nothing is selected.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <PreviewPanel />
          )}
        </div>
      </div>
      {modals}
    </div>
  );
}
