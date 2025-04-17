import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ProductStore {
  listItems: Product[];
  lastSelectedItem: string | null;
  setLastSelectedItem: (id: string) => void;

  decreaseStock: (id: string, amount?: number) => void;
  increaseStock: (id: string, amount?: number) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  listItems: [
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ],
  lastSelectedItem: null,
  setLastSelectedItem: (id) => set({ lastSelectedItem: id }),

  decreaseStock: (id, amount = 1) => {
    set({
      listItems: get().listItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity - amount) } : item,
      ),
    });
  },

  increaseStock: (id, amount = 1) => {
    set({
      listItems: get().listItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item,
      ),
    });
  },
}));
