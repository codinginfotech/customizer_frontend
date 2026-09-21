import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../../services/catalogService';
import { setPendingTransfer, transferDesign } from '../../services/transferService';
import { track } from '../../services/analytics';
import type { Product } from '../../types/catalog';
import { Modal, Spinner } from '../../components/ui';
import { useDesignerStore } from '../../stores/designerStore';

/** "Move this design to another product" — the cross-product design engine. */
export function TransferModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const currentProduct = useDesignerStore((s) => s.product);
  const [products, setProducts] = useState<Product[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    fetchProducts({ pageSize: 60 })
      .then((r) => setProducts(r.items.filter((p) => p.id !== currentProduct?.id)))
      .catch(() => setProducts([]));
  }, [open, currentProduct?.id]);

  function handlePick(target: Product) {
    const state = useDesignerStore.getState();
    if (!state.product) return;
    const result = transferDesign(state.areas, state.product, target, state.productColor);
    setPendingTransfer({ targetSlug: target.slug, areas: result.areas, productColor: result.productColor });
    track('design_transferred', { productId: target.id });
    for (const warning of result.warnings) toast(warning, { icon: '⚠️', duration: 5000 });
    if (result.matchedAreas > 0) {
      toast.success(`Moved artwork onto ${result.matchedAreas} matching area${result.matchedAreas === 1 ? '' : 's'}`);
    }
    onClose();
    navigate(`/designer/${target.slug}`);
  }

  const compatible = (p: Product) =>
    p.printAreas.some((a) => currentProduct?.printAreas.some((c) => c.key === a.key));

  const sorted = (products ?? []).slice().sort((a, b) => Number(compatible(b)) - Number(compatible(a)));

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Move design to another product"
      description="Artwork is remapped by print-area key and rescaled to fit."
      size="lg"
    >
      <p className="mb-5 text-sm leading-relaxed text-gray-600">
        Your artwork is mapped by print area — “Front” art moves to the new product's “Front”,
        rescaled to fit. Areas that don't exist on the target are skipped with a warning.
      </p>
      {products === null ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : (
        <div className="grid max-h-96 grid-cols-2 gap-3 overflow-y-auto scroll-thin sm:grid-cols-3">
          {sorted.map((p) => {
            const isCompatible = compatible(p);
            const shared = p.printAreas.filter((a) =>
              currentProduct?.printAreas.some((c) => c.key === a.key),
            ).length;
            return (
              <button
                key={p.id}
                onClick={() => handlePick(p)}
                className="card-link group flex flex-col items-center gap-2 p-4 text-center"
              >
                <img
                  src={p.images[0]?.url}
                  alt={p.name}
                  className="h-20 object-contain"
                  loading="lazy"
                />
                <span className="text-sm font-medium text-gray-900">{p.name}</span>
                <span
                  className={
                    isCompatible
                      ? 'flex items-center gap-1 text-2xs font-medium text-emerald-700'
                      : 'text-2xs text-gray-400'
                  }
                >
                  {isCompatible ? (
                    <>
                      <ArrowRight className="h-3 w-3" /> {shared} matching area{shared === 1 ? '' : 's'}
                    </>
                  ) : (
                    'starts empty'
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </Modal>
  );
}
