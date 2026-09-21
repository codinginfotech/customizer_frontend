import { useEffect } from 'react';
import { useDesignerStore } from '../stores/designerStore';
import { useUiStore } from '../stores/uiStore';

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

/**
 * Designer keyboard shortcuts:
 *  Ctrl/Cmd+Z undo · Ctrl/Cmd+Shift+Z / Ctrl+Y redo · Ctrl/Cmd+C copy
 *  Ctrl/Cmd+V paste · Ctrl/Cmd+D duplicate · Delete/Backspace remove
 *  Escape deselect · Arrows nudge 1px · Shift+Arrows nudge 10px
 */
export function useKeyboardShortcuts() {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey;
      // Command palette opens from anywhere, even inside inputs.
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        useUiStore.getState().setCommandPaletteOpen(true);
        return;
      }
      if (isTypingTarget(e.target)) return;
      const store = useDesignerStore.getState();
      const selected = store.selectedElement();

      if (mod && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        const active = store.areas.find((a) => a.areaKey === store.activeAreaKey);
        store.selectMany(
          (active?.elements ?? []).filter((el) => el.visible !== false && !el.locked).map((el) => el.id),
        );
        return;
      }
      if (mod && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        store.undo();
        return;
      }
      if ((mod && e.key.toLowerCase() === 'z' && e.shiftKey) || (mod && e.key.toLowerCase() === 'y')) {
        e.preventDefault();
        store.redo();
        return;
      }
      if (mod && e.key.toLowerCase() === 'c' && selected) {
        e.preventDefault();
        store.copyElement(selected.id);
        return;
      }
      if (mod && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        store.paste();
        return;
      }
      if (mod && e.key.toLowerCase() === 'd' && selected) {
        e.preventDefault();
        store.duplicateElement(selected.id);
        return;
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (store.selectedIds.length > 1) {
          e.preventDefault();
          store.removeSelected();
          return;
        }
        if (selected && !selected.locked) {
          e.preventDefault();
          store.removeElement(selected.id);
          return;
        }
      }
      if (e.key === 'Escape') {
        store.select(null);
        return;
      }
      if (e.key.startsWith('Arrow') && selected && !selected.locked) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 1;
        const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
        const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;
        store.updateElement(
          selected.id,
          { x: selected.x + dx, y: selected.y + dy },
          { history: true },
        );
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
}
