// store/useCart.ts
import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartState>((set, get) => ({
  items: [],

  addToCart: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  decreaseQuantity: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;

      if (item.quantity === 1) {
        return {
          items: state.items.filter((i) => i.id !== id),
        };
      }

      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }),

  clearCart: () => set({ items: [] }),

  getTotalItems: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  },
}));
