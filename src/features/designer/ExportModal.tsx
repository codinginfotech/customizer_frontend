import { useState } from 'react';
import { Download, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { Field, Modal, Spinner } from '../../components/ui';
import { useDesignerStore } from '../../stores/designerStore';
import { downloadDesignExport } from '../../services/catalogService';
import { apiErrorMessage } from '../../services/apiClient';
import { renderAreaToCanvas } from '../../utils/areaRenderer';

type Format = 'png' | 'jpeg' | 'webp';

export function ExportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const product = useDesignerStore((s) => s.product);
  const designId = useDesignerStore((s) => s.designId);
  const activeAreaKey = useDesignerStore((s) => s.activeAreaKey);
  const [areaKey, setAreaKey] = useState<string>('');
  const [format, setFormat] = useState<Format>('png');
  const [dpi, setDpi] = useState(300);
  const [busy, setBusy] = useState(false);

  if (!product) return null;
  const selectedKey = areaKey || activeAreaKey;

  /** Client-side preview export straight from the design state. */
  function exportPreview() {
    const state = useDesignerStore.getState();
    const cfg = state.product?.printAreas.find((a) => a.key === selectedKey);
    if (!cfg) return;
    const area = state.areas.find((a) => a.areaKey === selectedKey);
    const canvas = document.createElement('canvas');
    renderAreaToCanvas(canvas, area, cfg.width, cfg.height, {
      background: format === 'png' ? null : '#ffffff',
      scale: 2,
    });
    const mime = `image/${format}`;
    const url = canvas.toDataURL(mime, 0.92);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.designName.replace(/\s+/g, '-')}-${selectedKey}.${format === 'jpeg' ? 'jpg' : format}`;
    a.click();
  }

  /** Server-side production export at print resolution. */
  async function exportProduction() {
    if (!designId) {
      toast('Save your design first to generate production files');
      return;
    }
    setBusy(true);
    try {
      await downloadDesignExport(designId, selectedKey, dpi);
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Export failed'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Export design"
      description="Grab a quick preview, or the file your printer needs."
      size="sm"
    >
      <div className="space-y-5">
        <Field label="Print area">
          <select className="input" value={selectedKey} onChange={(e) => setAreaKey(e.target.value)}>
            {product.printAreas.map((a) => (
              <option key={a.key} value={a.key}>
                {a.name}
              </option>
            ))}
          </select>
        </Field>

        <section className="rounded-xl border border-gray-200 p-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-medium text-gray-900">Preview</h3>
            <span className="text-2xs uppercase tracking-label text-gray-400">2× screen</span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-gray-500">
            Rendered in your browser — good for sharing a mockup, not for print.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <select
              className="input w-28"
              value={format}
              onChange={(e) => setFormat(e.target.value as Format)}
              aria-label="Preview format"
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPG</option>
              <option value="webp">WEBP</option>
            </select>
            <button className="btn-secondary flex-1" onClick={exportPreview}>
              <Download className="h-4 w-4" /> Download
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-gray-900/15 bg-gray-50 p-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-sm font-medium text-gray-900">Production file</h3>
            <span className="text-2xs uppercase tracking-label text-gray-500">Print-ready</span>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-gray-600">
            Rendered on the server from your saved design, at full print resolution.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <select
              className="input w-28 tabular"
              value={dpi}
              onChange={(e) => setDpi(Number(e.target.value))}
              aria-label="Export resolution"
            >
              <option value={150}>150 DPI</option>
              <option value={300}>300 DPI</option>
              <option value={600}>600 DPI</option>
            </select>
            <button
              className="btn-primary flex-1"
              onClick={exportProduction}
              disabled={busy || !designId}
            >
              {busy ? <Spinner className="h-4 w-4 text-white" /> : <Download className="h-4 w-4" />}
              Download
            </button>
          </div>
          {!designId && (
            <p className="mt-3 flex items-start gap-2 text-2xs leading-relaxed text-gray-500">
              <Info className="mt-px h-3.5 w-3.5 shrink-0" />
              Save your design first to enable the production export.
            </p>
          )}
        </section>
      </div>
    </Modal>
  );
}
