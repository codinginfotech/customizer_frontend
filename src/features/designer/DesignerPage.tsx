import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { fetchDesign, fetchProduct } from '../../services/catalogService';
import { useDesignerStore } from '../../stores/designerStore';
import { useAuthStore } from '../../stores/authStore';
import { PageSpinner, EmptyState } from '../../components/ui';
import { DesignerLayout } from './DesignerLayout';
import type { DesignDocument } from '@cpd/shared';
import { consumePendingTransfer } from '../../services/transferService';
import { track } from '../../services/analytics';

/**
 * /designer/:productSlug — loads the product (print areas, variants, model),
 * optionally an existing design (?design=id) and variant (?variant=id), then
 * initializes the shared designer store.
 */
export default function DesignerPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [params] = useSearchParams();
  const initializing = useAuthStore((s) => s.initializing);
  const initialize = useDesignerStore((s) => s.initialize);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    if (!productSlug || initializing) return;
    let cancelled = false;
    setStatus('loading');
    (async () => {
      try {
        const product = await fetchProduct(productSlug);
        const variantId = Number(params.get('variant')) || null;
        const variant = product.variants.find((v) => v.id === variantId) ?? null;

        const designId = Number(params.get('design')) || null;
        let existing: { id: number; name: string; doc: DesignDocument } | null = null;
        if (designId && useAuthStore.getState().user) {
          try {
            const design = await fetchDesign(designId);
            if (design.productId === product.id) {
              existing = { id: design.id, name: design.name, doc: design.designJson };
            }
          } catch {
            /* design missing or not owned — start fresh */
          }
        }
        if (cancelled) return;
        const initialVariant =
          existing && existing.doc.variantId
            ? product.variants.find((v) => v.id === existing!.doc.variantId) ?? variant
            : variant ?? product.variants[0] ?? null;
        initialize(product, initialVariant, existing);
        // Cross-product transfer handoff: artwork mapped from another product.
        const transfer = consumePendingTransfer(product.slug);
        if (transfer && !existing) {
          useDesignerStore.getState().replaceAreas(transfer.areas, transfer.productColor);
        }
        track('customizer_opened', { productId: product.id });
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [productSlug, params, initialize, initializing]);

  if (status === 'loading' || initializing) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <PageSpinner />
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <EmptyState
          title="Product not found"
          description="This product may no longer be available."
          action={
            <Link to="/products" className="btn-primary">
              Browse products
            </Link>
          }
        />
      </div>
    );
  }
  return <DesignerLayout />;
}
