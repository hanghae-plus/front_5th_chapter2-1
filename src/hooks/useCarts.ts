import { useCartContext } from '@/context/cartContext';
import { Product } from '@/types';

import products from '../data/products.json';

export default function useCarts() {
  const { carts, setCarts, selectedProductId } = useCartContext();

  const addToCart = () => {
    const itemToAdd = products.find((p) => p.id === selectedProductId);
    if (!itemToAdd || carts.find((c) => c.id === itemToAdd.id)) return;
    setCarts([...carts, { ...itemToAdd, currentQuantity: 1 }]);
  };

  const increase = (productId: string) => {
    const productInfo = products.find((p) => p.id === productId);
    if (!productInfo) return;
    setCarts((prev: Product[]) =>
      prev.map((item) =>
        item.id === productId
          ? {
              ...item,
              currentQuantity:
                (item.currentQuantity ?? 0) + 1 > productInfo.quantity
                  ? item.currentQuantity
                  : (item.currentQuantity ?? 0) + 1,
            }
          : item,
      ),
    );
  };

  const decrease = (productId: string) => {
    setCarts((prev: Product[]) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, currentQuantity: (item.currentQuantity ?? 1) - 1 }
            : item,
        )
        .filter((item) => (item.currentQuantity ?? 0) > 0),
    );
  };

  const remove = (productId: string) => {
    setCarts((prev: Product[]) => prev.filter((item) => item.id !== productId));
  };

  return { addToCart, increase, decrease, remove };
}
