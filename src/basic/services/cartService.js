import {
  accumulateItem,
  applyBulkDiscount,
  applyTuesdayDiscount,
} from "./productService";

import { getItemQuantity, updateItemQuantity } from "../utils/domUtils";

// 장바구니에서 상품을 제거하고 스토어 재고를 업데이트하는 함수
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
// 장바구니 상품 수량을 변경하고 스토어 재고를 업데이트하는 함수
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

// 장바구니의 총 가격, 할인율, 상품 수량 등을 계산하는 함수
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
