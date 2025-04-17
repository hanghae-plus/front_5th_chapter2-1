import type { CartItem, Product } from "../../types";

// 장바구니 목록에 아이템을 추가 또는 수량 증가
export const updateCartList = (cartList: CartItem[], selectedProduct: Product): CartItem[] => {
  const existing = cartList.find((item) => item.id === selectedProduct.id);
  if (existing) {
    return cartList.map((item) => (item.id === selectedProduct.id ? { ...item, count: (item.count || 0) + 1 } : item));
  }
  return [...cartList, { ...selectedProduct, count: 1 }];
};
