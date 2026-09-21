import { useEffect, useRef } from 'react';
import { useDesignerStore } from '../stores/designerStore';
import { useAuthStore } from '../stores/authStore';
import { updateDesign } from '../services/catalogService';

const AUTOSAVE_DEBOUNCE_MS = 3000;

/**
 * Debounced autosave: local state updates instantly; the server only sees a
 * save after the user pauses. Only runs once a design has been saved (named)
 * at least once and the user is signed in.
 */
export function useAutosave() {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const saving = useRef(false);

  useEffect(() => {
    const unsubscribe = useDesignerStore.subscribe((state, prev) => {
      if (state.revision === prev.revision && state.dirty === prev.dirty) return;
      if (!state.dirty || !state.designId) return;
      if (!useAuthStore.getState().user) return;

      clearTimeout(timer.current);
      timer.current = setTimeout(async () => {
        const s = useDesignerStore.getState();
        if (!s.dirty || !s.designId || saving.current) return;
        const doc = s.buildDocument();
        if (!doc) return;
        saving.current = true;
        s.setSaveStatus('saving');
        try {
          await updateDesign(s.designId, { designJson: doc, variantId: doc.variantId });
          // Only mark clean if nothing changed while the request was in flight.
          if (useDesignerStore.getState().revision === s.revision) {
            s.markSaved();
          } else {
            s.setSaveStatus('unsaved');
          }
        } catch {
          useDesignerStore.getState().setSaveStatus('error');
        } finally {
          saving.current = false;
        }
      }, AUTOSAVE_DEBOUNCE_MS);
    });
    return () => {
      unsubscribe();
      clearTimeout(timer.current);
    };
  }, []);
}
