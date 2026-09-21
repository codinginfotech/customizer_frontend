import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Modal, Spinner } from '../../components/ui';
import { useDesignerStore } from '../../stores/designerStore';
import { useAuthStore } from '../../stores/authStore';
import { createDesign, updateDesign } from '../../services/catalogService';
import { apiErrorMessage } from '../../services/apiClient';
import { generatePreviewDataUrl } from '../../utils/preview';

export function SaveDesignModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const user = useAuthStore((s) => s.user);
  const designId = useDesignerStore((s) => s.designId);
  const designName = useDesignerStore((s) => s.designName);
  const navigate = useNavigate();
  const [name, setName] = useState(designName);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) setName(designName === 'Untitled design' ? '' : designName);
  }, [open, designName]);

  if (open && !user) {
    // Design save requires an account — send them to login and come back.
    return (
      <Modal
        open
        onClose={onClose}
        title="Sign in to save"
        size="sm"
        footer={
          <>
            <button className="btn-ghost" onClick={onClose}>
              Keep designing
            </button>
            <button
              className="btn-primary"
              onClick={() =>
                navigate('/login', {
                  state: { from: window.location.pathname + window.location.search },
                })
              }
            >
              Sign in
            </button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-gray-600">
          Create a free account (or sign in) to save this design and continue editing later. Your
          work stays on this page until you leave it.
        </p>
      </Modal>
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const store = useDesignerStore.getState();
    const doc = store.buildDocument();
    if (!doc || !store.product) return;
    setBusy(true);
    store.setSaveStatus('saving');
    try {
      const previewImage = await generatePreviewDataUrl(store.product, doc.areas, doc.productColor);
      if (store.designId) {
        await updateDesign(store.designId, {
          name: name || store.designName,
          designJson: doc,
          variantId: doc.variantId,
          previewImage,
          createVersion: true,
        });
        store.setDesignIdentity(store.designId, name || store.designName);
      } else {
        const created = await createDesign({
          name: name || 'Untitled design',
          productId: store.product.id,
          variantId: doc.variantId,
          designJson: doc,
          previewImage,
        });
        store.setDesignIdentity(created.id, created.name);
        // Reflect the design id in the URL so refresh/back keeps the session.
        const url = new URL(window.location.href);
        url.searchParams.set('design', String(created.id));
        window.history.replaceState({}, '', url.toString());
      }
      store.markSaved();
      toast.success('Design saved');
      onClose();
    } catch (err) {
      useDesignerStore.getState().setSaveStatus('error');
      toast.error(apiErrorMessage(err, 'Could not save design'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={designId ? 'Save design' : 'Name your design'} size="sm">
      <form onSubmit={onSubmit}>
        <label className="label" htmlFor="design-save-name">
          Design name
        </label>
        <input
          id="design-save-name"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Summer team tee"
          autoFocus
          maxLength={160}
        />
        <p className="mt-2 text-xs leading-relaxed text-gray-500">
          {designId
            ? 'Saving also snapshots the previous state as a version.'
            : 'After the first save, changes auto-save as you work.'}
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" className="btn-ghost" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={busy}>
            {busy && <Spinner className="h-4 w-4 text-white" />}
            Save design
          </button>
        </div>
      </form>
    </Modal>
  );
}
