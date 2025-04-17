import { create } from 'zustand';
import type { Product } from './useProductStore';
import { useProductStore } from './useProductStore';
import { MESSAGE_OUT_OF_STOCK } from '../ui/ProductSelect';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  cartItems: CartItem[];

  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, amount: number) => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],

  addToCart: (product) => {
    const items = get().cartItems;
    const exists = items.find((item) => item.id === product.id);

    useProductStore.getState?.().decreaseStock(product.id);

    if (exists) {
      // 이미 있는 상품이면 수량 증가
      set({
        cartItems: items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      });
    } else {
      // 처음 추가하는 상품
      set({
        cartItems: [...items, { ...product, quantity: 1 }],
      });
    }
  },

  removeFromCart: (id) => {
    const prev = get().cartItems.find((i) => i.id === id);

    if (prev) {
      useProductStore.getState?.().increaseStock(id, prev.quantity);
    }

    set({
      cartItems: get().cartItems.filter((item) => item.id !== id),
    });
  },

  updateQuantity: (id, amount) => {
    const selectedItem = useProductStore.getState().listItems.find((p) => p.id === id);
    const availableStock = selectedItem?.quantity ?? 0;

    // 재고 체크
    if (amount > 0 && availableStock < amount) {
      alert(MESSAGE_OUT_OF_STOCK);
      return;
    }

    if (amount > 0) {
      useProductStore.getState?.().decreaseStock(id, amount);
    } else {
      useProductStore.getState?.().increaseStock(id, Math.abs(amount));
    }

    const updated = get()
      .cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item,
      )
      .filter((item) => item.quantity > 0);

    set({ cartItems: updated });
  },
}));
