import {
  accumulateItem,
  applyBulkDiscount,
  applyTuesdayDiscount,
} from "./productService";

import { getItemQuantity, updateItemQuantity } from "../utils/domUtils";

export const handleRemove = (itemElement, productId, store) => {
  const quantity = getItemQuantity(itemElement);
  itemElement.remove();

  const state = store.getState();
  store.update({
    products: state.products.map((p) =>
      p.id === productId ? { ...p, q: p.q + quantity } : p,
    ),
  });
};

export const handleQuantityChange = (itemElement, product, change, store) => {
  if (change > 0 && product.q <= 0) {
    alert("재고가 부족합니다.");
    return;
  }

  const currentQty = getItemQuantity(itemElement);
  const newQty = currentQty + change;

  if (newQty <= 0) {
    handleRemove(itemElement, product.id, store);
    return;
  }

  updateItemQuantity(itemElement, product, newQty);
  const state = store.getState();
  store.update({
    products: state.products.map((p) =>
      p.id === product.id ? { ...p, q: p.q - change } : p,
    ),
  });
};

export const calculateCart = (cartItems, products) => {
  const initial = { subTotal: 0, totalAmt: 0, itemCount: 0, items: new Map() };
  const { subTotal, totalAmt, itemCount, items } = cartItems.reduce(
    (acc, itemElem) => accumulateItem(acc, itemElem, products),
    initial,
  );

  const afterBulk = applyBulkDiscount({ subTotal, totalAmt, itemCount, items });
  const finalRes = applyTuesdayDiscount({
    currentTotal: afterBulk.total,
    currentRate: afterBulk.discountRate,
    items: afterBulk.items,
  });

  return {
    total: finalRes.total,
    discountRate: finalRes.discountRate,
    count: itemCount,
    items: finalRes.items,
  };
};
