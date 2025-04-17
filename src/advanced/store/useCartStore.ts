import { create } from "zustand";
import { products } from "../data/products";
import { CartStore } from "../types/store-type";
import { cloneProducts } from "../utils/products";

export const useCartStore = create<CartStore>((set) => ({
  products: cloneProducts(products),
  lastSelected: null,
  finalTotal: 0,
  originalTotal: 0,
  itemCount: 0,
  discountRate: 0,

  setLastSelected: (id) => set({ lastSelected: id }),

  updateCartTotals: (originalTotal, finalTotal, itemCount, discountRate) =>
    set({
      originalTotal,
      finalTotal,
      itemCount,
      discountRate,
    }),

  updateProductPrice: (id: string, newPrice: number) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, val: newPrice } : p)),
    })),

  resetCart: () =>
    set({
      products: cloneProducts(products),
      lastSelected: null,
      finalTotal: 0,
      originalTotal: 0,
      itemCount: 0,
      discountRate: 0,
    }),
}));
