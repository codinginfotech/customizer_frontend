import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Image as ImageIcon,
  Maximize2,
  Minus,
  Plus,
  Rotate3d,
  Scan,
  ShoppingCart,
} from 'lucide-react';
import clsx from 'clsx';
import type { PriceBreakdown } from '@cpd/shared';
import { validateDesignDocument, type DesignValidationIssue } from '@cpd/shared';
import { useDesignerStore } from '../../../stores/designerStore';
import { useUiStore } from '../../../stores/uiStore';
import { fetchQuote } from '../../../services/catalogService';
import { useDebouncedValue } from '../../../hooks/useDebounce';
import { useAddToCart } from '../../../hooks/useAddToCart';
import { formatPrice } from '../../../utils/format';
import { ThreeDViewer } from './ThreeDViewer';
import { MockupPreview } from './MockupPreview';
import { Spinner } from '../../../components/ui';
import { ValidationModal } from '../ValidationModal';
import { track } from '../../../services/analytics';

const VIEW_LABELS: Record<string, string> = {
  front: 'Front',
  back: 'Back',
  left: 'Left',
  right: 'Right',
  top: 'Top',
  base: 'Base',
  handle: 'Handle',
};

const CARDINAL_VIEWS = ['front', 'right', 'back', 'left'] as const;

/**
 * Per-angle preview thumbnails (rendered from the actual model by the
 * engine) with prev/next cycling — like a product-photography strip.
 */
function ViewThumbnailStrip({
  activeView,
  onPick,
}: {
  activeView: string;
  onPick: (view: string) => void;
}) {
  const viewThumbs = useDesignerStore((s) => s.viewThumbs);
  const model = useDesignerStore((s) => s.product?.model ?? null);
  const extraViews = useMemo(() => {
    const config = (model?.configuration ?? {}) as { cameraViews?: Record<string, unknown> };
    return Object.keys(config.cameraViews ?? {}).filter(
      (v) => v !== 'default' && !CARDINAL_VIEWS.includes(v as (typeof CARDINAL_VIEWS)[number]),
    );
  }, [model]);

  return (
    <div className="flex items-center justify-center gap-2 border-t border-white/[.07] px-3 py-2">
      {CARDINAL_VIEWS.map((view) => (
        <button
          key={view}
          onClick={() => onPick(view)}
          className={clsx(
            'h-13 w-13 shrink-0 overflow-hidden rounded-lg border bg-studio-raised transition-colors',
            activeView === view ? 'border-brand-500 ring-1 ring-brand-500/40' : 'border-white/10 hover:border-white/25',
          )}
          title={VIEW_LABELS[view]}
        >
          {viewThumbs[view] ? (
            <img src={viewThumbs[view]} alt={VIEW_LABELS[view]} className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-[9px] font-semibold uppercase text-zinc-500">
              {VIEW_LABELS[view]}
            </span>
          )}
        </button>
      ))}
      {extraViews.map((view) => (
        <button
          key={view}
          onClick={() => onPick(view)}
          className={clsx(
            'shrink-0 rounded-md px-2 py-1 text-2xs font-medium capitalize transition-colors',
            activeView === view ? 'bg-white/[.14] text-white' : 'text-zinc-400 hover:bg-white/[.07]',
          )}
        >
          {VIEW_LABELS[view] ?? view}
        </button>
      ))}
    </div>
  );
}

/** Right-dock live preview: 2D/3D stage, camera views, server-priced quote,
 *  validation-gated add to cart. */
export function PreviewPanel() {
  const product = useDesignerStore((s) => s.product);
  const variant = useDesignerStore((s) => s.variant);
  const previewMode = useDesignerStore((s) => s.previewMode);
  const setPreviewMode = useDesignerStore((s) => s.setPreviewMode);
  const revision = useDesignerStore((s) => s.revision);
  const designId = useDesignerStore((s) => s.designId);
  const workspaceMode = useUiStore((s) => s.workspaceMode);
  const technicalView = useUiStore((s) => s.technicalView);
  const setTechnicalView = useUiStore((s) => s.setTechnicalView);

  const [quantity, setQuantity] = useState(1);
  const [quote, setQuote] = useState<PriceBreakdown | null>(null);
  const [validationOpen, setValidationOpen] = useState(false);
  const [issues, setIssues] = useState<DesignValidationIssue[]>([]);
  const [activeView, setActiveView] = useState('front');
  const stageWrapRef = useRef<HTMLDivElement>(null);
  const { addToCart, adding } = useAddToCart();
  const debouncedRevision = useDebouncedValue(revision, 700);
  const requestCameraView = useDesignerStore((s) => s.requestCameraView);
  const setPresentationOpen = useUiStore((s) => s.setPresentationOpen);

  const has3d = Boolean(product?.model);
  const mode = has3d ? previewMode : '2d';

  function goToView(view: string) {
    setActiveView(view);
    requestCameraView(view);
    track('preview_3d_used');
  }

  function cycleView(direction: 1 | -1) {
    const index = CARDINAL_VIEWS.indexOf(activeView as (typeof CARDINAL_VIEWS)[number]);
    const next = CARDINAL_VIEWS[(Math.max(index, 0) + direction + CARDINAL_VIEWS.length) % CARDINAL_VIEWS.length];
    goToView(next);
  }

  function downloadPreview() {
    const canvas = stageWrapRef.current?.querySelector('canvas');
    if (!canvas) return;
    try {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `${product?.slug ?? 'product'}-preview.png`;
      a.click();
    } catch {
      /* tainted canvas — ignore */
    }
  }

  // Live server-side quote — the client never computes prices.
  useEffect(() => {
    const state = useDesignerStore.getState();
    if (!state.product) return;
    const doc = state.buildDocument();
    fetchQuote({
      productId: state.product.id,
      variantId: state.variant?.id ?? null,
      quantity,
      designJson: doc,
    })
      .then(setQuote)
      .catch(() => undefined);
  }, [debouncedRevision, quantity, variant?.id, product?.id]);

  function startAddToCart() {
    const state = useDesignerStore.getState();
    const doc = state.buildDocument();
    if (!doc || !state.product) return;
    const found = validateDesignDocument(
      doc,
      state.product.printAreas.map((a) => ({
        key: a.key,
        name: a.name,
        width: a.width,
        height: a.height,
        safeArea: a.safeArea,
        physicalWidthIn: a.physicalWidthIn,
      })),
      state.product.productionRules ?? undefined,
    );
    setIssues(found);
    if (found.length === 0) {
      void addToCart(quantity);
    } else {
      setValidationOpen(true);
    }
  }

  if (!product) return null;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center justify-between border-b border-white/[.07] px-4 py-2.5">
        <h2 className="text-xs font-semibold text-zinc-100">Live preview</h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={downloadPreview}
            className="studio-btn h-7 w-7"
            title="Download preview image"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            onClick={() => setPresentationOpen(true)}
            className="studio-btn h-7 w-7"
            title="Fullscreen presentation"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          {workspaceMode === 'advanced' && has3d && (
            <button
              onClick={() => setTechnicalView(!technicalView)}
              className={clsx(
                'studio-btn h-7 w-7',
                technicalView && 'bg-brand-500/20 text-brand-300 hover:text-brand-200',
              )}
              title="Technical view (print zones as wireframe)"
            >
              <Scan className="h-4 w-4" />
            </button>
          )}
          {has3d && (
            <div className="flex rounded-lg bg-white/[.06] p-0.5">
              <button
                onClick={() => setPreviewMode('2d')}
                className={clsx(
                  'flex items-center gap-1 rounded-md px-2 py-1 text-2xs font-medium transition-colors',
                  mode === '2d' ? 'bg-white/[.14] text-white' : 'text-zinc-400 hover:text-zinc-200',
                )}
              >
                <ImageIcon className="h-3.5 w-3.5" /> 2D
              </button>
              <button
                onClick={() => {
                  setPreviewMode('3d');
                  track('preview_3d_used', { productId: product.id });
                }}
                className={clsx(
                  'flex items-center gap-1 rounded-md px-2 py-1 text-2xs font-medium transition-colors',
                  mode === '3d' ? 'bg-white/[.14] text-white' : 'text-zinc-400 hover:text-zinc-200',
                )}
              >
                <Rotate3d className="h-3.5 w-3.5" /> 3D
              </button>
            </div>
          )}
        </div>
      </div>

      <div ref={stageWrapRef} className="relative min-h-0 flex-1 bg-gradient-to-b from-studio-raised to-studio-base">
        {mode === '3d' ? <ThreeDViewer /> : <div className="h-full bg-surface-sunken"><MockupPreview /></div>}
        {mode === '3d' && (
          <>
            <button
              onClick={() => cycleView(-1)}
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-zinc-200 backdrop-blur transition-colors hover:bg-black/60 hover:text-white"
              aria-label="Previous view"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => cycleView(1)}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-zinc-200 backdrop-blur transition-colors hover:bg-black/60 hover:text-white"
              aria-label="Next view"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {mode === '3d' && <ViewThumbnailStrip activeView={activeView} onPick={goToView} />}

      {/* Pricing + cart */}
      <div className="border-t border-white/[.07] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[.12] text-zinc-300 transition-colors hover:border-white/25 hover:bg-white/[.07]"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <input
              className="h-8 w-14 rounded-md border border-white/[.12] bg-transparent text-center text-sm tabular text-zinc-100 transition-colors focus:border-brand-500 focus:outline-none"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            />
            <button
              className="flex h-8 w-8 items-center justify-center rounded-md border border-white/[.12] text-zinc-300 transition-colors hover:border-white/25 hover:bg-white/[.07]"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="text-right">
            {quote ? (
              <>
                <p className="text-lg font-semibold tabular tracking-tight text-white">{formatPrice(quote.totalPrice)}</p>
                <p className="text-2xs tabular text-zinc-500">
                  {formatPrice(quote.unitPrice)} each
                  {quote.discountPct > 0 && (
                    <span className="ml-1 font-medium text-emerald-400">−{quote.discountPct}%</span>
                  )}
                </p>
              </>
            ) : (
              <Spinner className="h-4 w-4 text-zinc-400" />
            )}
          </div>
        </div>
        {quote && quote.customizationFee > 0 && (
          <p className="mt-1.5 text-right text-2xs leading-relaxed text-zinc-500">
            includes {formatPrice(quote.customizationFee)} customization ({quote.printedAreas}{' '}
            area{quote.printedAreas === 1 ? '' : 's'}, {quote.elementCount} element
            {quote.elementCount === 1 ? '' : 's'})
          </p>
        )}
        <button
          className="btn btn-lg mt-3 w-full bg-white text-gray-900 hover:bg-zinc-200"
          onClick={startAddToCart}
          disabled={adding}
        >
          {adding ? <Spinner className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
          Add to cart
        </button>
        {!designId && (
          <p className="mt-2 text-center text-2xs text-zinc-500">
            Save your design to enable adding it to the cart.
          </p>
        )}
      </div>

      <ValidationModal
        open={validationOpen}
        issues={issues}
        busy={adding}
        onClose={() => setValidationOpen(false)}
        onProceed={async () => {
          const ok = await addToCart(quantity);
          if (ok) setValidationOpen(false);
        }}
      />
    </div>
  );
}
