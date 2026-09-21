import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDesignerStore } from '../stores/designerStore';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cartStore';
import { updateDesign } from '../services/catalogService';
import { apiErrorMessage } from '../services/apiClient';
import { track } from '../services/analytics';

/** Shared add-to-cart flow (preview panel + presentation mode). */
export function useAddToCart() {
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  async function addToCart(quantity: number): Promise<boolean> {
    const state = useDesignerStore.getState();
    if (!useAuthStore.getState().user) {
      toast('Sign in to add designs to your cart');
      navigate('/login', { state: { from: window.location.pathname + window.location.search } });
      return false;
    }
    if (!state.designId) {
      toast('Save your design first — then add it to the cart');
      return false;
    }
    setAdding(true);
    try {
      const doc = state.buildDocument();
      if (state.dirty && doc) {
        await updateDesign(state.designId, { designJson: doc, variantId: doc.variantId });
        state.markSaved();
      }
      await useCartStore.getState().addItem({
        productId: state.product!.id,
        variantId: state.variant?.id ?? null,
        designId: state.designId,
        quantity,
      });
      track('added_to_cart', { productId: state.product!.id, designId: state.designId });
      toast.success('Added to cart');
      return true;
    } catch (err) {
      toast.error(apiErrorMessage(err, 'Could not add to cart'));
      return false;
    } finally {
      setAdding(false);
    }
  }

  return { addToCart, adding };
}
