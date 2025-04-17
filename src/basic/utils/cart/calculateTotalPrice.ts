import type { CartItem } from "../../types";

// 카트 내 총액 계산
export const calculateTotalPrice = (cartList: CartItem[] = []): number => {
  return cartList.reduce((sum, item) => sum + item.price * (item.count || 0), 0);
};
