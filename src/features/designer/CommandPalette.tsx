import { useEffect, useMemo, useRef, useState } from 'react';
import { Command, CornerDownLeft } from 'lucide-react';
import clsx from 'clsx';
import { useDesignerStore } from '../../stores/designerStore';
import { useUiStore } from '../../stores/uiStore';
import { defaultTextElement } from '../../utils/designMath';
import { newElementId } from '../../utils/id';

interface CommandItem {
  id: string;
  label: string;
  keywords?: string;
  hint?: string;
  run: () => void;
  when?: () => boolean;
}

/**
 * Ctrl/Cmd+K command palette — searchable actions covering the whole studio.
 * Commands are a plain registry, so features register here instead of
 * scattering keyboard handling across components.
 */
export function CommandPalette({ onSave, onExport }: { onSave: () => void; onExport: () => void }) {
  const open = useUiStore((s) => s.commandPaletteOpen);
  const setOpen = useUiStore((s) => s.setCommandPaletteOpen);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  const commands = useMemo<CommandItem[]>(() => {
    const store = () => useDesignerStore.getState();
    const ui = () => useUiStore.getState();
    const areaCommands: CommandItem[] =
      store().product?.printAreas.map((a) => ({
        id: `area-${a.key}`,
        label: `Edit area: ${a.name}`,
        keywords: 'print area zone switch',
        run: () => store().setActiveArea(a.key),
      })) ?? [];
    const viewCommands: CommandItem[] = ['front', 'back', 'left', 'right', 'top'].map((v) => ({
      id: `view-${v}`,
      label: `Camera: ${v} view`,
      keywords: 'camera rotate 3d view angle',
      run: () => {
        store().setPreviewMode('3d');
        store().requestCameraView(v);
      },
    }));
    const selected = () => store().selectedElement();
    return [
      {
        id: 'add-text',
        label: 'Add text',
        keywords: 'type heading',
        run: () => {
          const cfg = store().product?.printAreas.find((a) => a.key === store().activeAreaKey);
          if (!cfg) return;
          const base = defaultTextElement({});
          store().addElement({
            ...base,
            id: newElementId(),
            x: Math.round((cfg.width - base.width) / 2),
            y: Math.round(cfg.height / 3),
          });
        },
      },
      { id: 'upload', label: 'Upload image', keywords: 'photo picture', run: () => store().setActiveTab('upload') },
      { id: 'templates', label: 'Open templates', run: () => store().setActiveTab('templates') },
      { id: 'graphics', label: 'Open graphics', keywords: 'icons stickers', run: () => store().setActiveTab('graphics') },
      { id: 'layers', label: 'Open layers', run: () => store().setActiveTab('layers') },
      { id: 'product', label: 'Open product options', keywords: 'color size variant', run: () => store().setActiveTab('product') },
      {
        id: 'center',
        label: 'Center selected object',
        keywords: 'align middle',
        when: () => Boolean(selected()),
        run: () => {
          store().alignSelected('centerX');
          store().alignSelected('centerY');
        },
      },
      {
        id: 'rotate-90',
        label: 'Rotate 90°',
        when: () => Boolean(selected()),
        run: () => {
          const el = selected();
          if (el) store().updateElement(el.id, { rotation: (el.rotation + 90) % 360 }, { history: true });
        },
      },
      {
        id: 'flip-h',
        label: 'Flip horizontal',
        keywords: 'mirror',
        when: () => Boolean(selected()),
        run: () => {
          const el = selected();
          if (el) store().updateElement(el.id, { flipX: !el.flipX }, { history: true });
        },
      },
      {
        id: 'duplicate',
        label: 'Duplicate',
        hint: 'Ctrl+D',
        when: () => Boolean(selected()),
        run: () => {
          const el = selected();
          if (el) store().duplicateElement(el.id);
        },
      },
      {
        id: 'front-layer',
        label: 'Bring to front',
        when: () => Boolean(selected()),
        run: () => {
          const el = selected();
          if (el) store().moveLayer(el.id, 'front');
        },
      },
      { id: 'undo', label: 'Undo', hint: 'Ctrl+Z', run: () => store().undo() },
      { id: 'redo', label: 'Redo', hint: 'Ctrl+Shift+Z', run: () => store().redo() },
      { id: '2d', label: 'Switch preview to 2D', run: () => store().setPreviewMode('2d') },
      { id: '3d', label: 'Switch preview to 3D', run: () => store().setPreviewMode('3d') },
      ...viewCommands,
      ...areaCommands,
      { id: 'save', label: 'Save design', hint: 'from anywhere', run: onSave },
      { id: 'export', label: 'Export…', keywords: 'download png production', run: onExport },
      {
        id: 'mode',
        label: ui().workspaceMode === 'simple' ? 'Switch to Advanced mode' : 'Switch to Simple mode',
        keywords: 'workspace pro',
        run: () => ui().setWorkspaceMode(ui().workspaceMode === 'simple' ? 'advanced' : 'simple'),
      },
      {
        id: 'present',
        label: 'Presentation mode',
        keywords: 'fullscreen preview customer',
        run: () => ui().setPresentationOpen(true),
      },
      { id: 'shortcuts', label: 'Keyboard shortcuts', run: () => ui().setShortcutsOpen(true) },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, onSave, onExport]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return commands
      .filter((c) => (c.when ? c.when() : true))
      .filter((c) => !q || `${c.label} ${c.keywords ?? ''}`.toLowerCase().includes(q))
      .slice(0, 12);
  }, [commands, query]);

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  if (!open) return null;

  const runCommand = (cmd: CommandItem) => {
    setOpen(false);
    cmd.run();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-gray-950/50 px-4 pt-[14vh] backdrop-blur-[2px] animate-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-studio-raised shadow-overlay animate-scale-in">
        <div className="flex items-center gap-2.5 border-b border-white/[.07] px-4">
          <Command className="h-4 w-4 text-zinc-500" />
          <input
            ref={inputRef}
            className="w-full bg-transparent py-3.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none"
            placeholder="Type a command…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setOpen(false);
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setIndex((i) => Math.min(filtered.length - 1, i + 1));
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setIndex((i) => Math.max(0, i - 1));
              }
              if (e.key === 'Enter' && filtered[index]) runCommand(filtered[index]);
            }}
          />
          <kbd className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">esc</kbd>
        </div>
        <div ref={listRef} className="max-h-80 overflow-y-auto py-1.5 scroll-thin">
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-zinc-500">No matching commands</p>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              onClick={() => runCommand(cmd)}
              onMouseEnter={() => setIndex(i)}
              className={clsx(
                'flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left text-sm transition-colors',
                i === index ? 'bg-white/[.08] text-white' : 'text-zinc-400',
              )}
            >
              <span>{cmd.label}</span>
              <span className="flex shrink-0 items-center gap-2 text-2xs text-zinc-500">
                {cmd.hint}
                {i === index && <CornerDownLeft className="h-3 w-3" />}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
