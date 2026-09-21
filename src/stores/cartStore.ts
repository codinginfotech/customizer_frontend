import { create } from 'zustand';
import * as svc from '../services/catalogService';
import type { Cart } from '../types/catalog';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  load: () => Promise<void>;
  addItem: (input: {
    productId: number;
    variantId?: number | null;
    designId?: number | null;
    quantity: number;
  }) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearLocal: () => void;
  itemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  loading: false,

  async load() {
    set({ loading: true });
    try {
      const cart = await svc.fetchCart();
      set({ cart });
    } finally {
      set({ loading: false });
    }
  },

  async addItem(input) {
    const cart = await svc.addCartItem(input);
    set({ cart });
  },

  async updateQuantity(itemId, quantity) {
    const cart = await svc.updateCartItem(itemId, quantity);
    set({ cart });
  },

  async removeItem(itemId) {
    const cart = await svc.removeCartItem(itemId);
    set({ cart });
  },

  clearLocal() {
    set({ cart: null });
  },

  itemCount() {
    return get().cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  },
}));
