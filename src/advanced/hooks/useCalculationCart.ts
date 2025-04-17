import { useCartStore } from "../store/useCartStore";
import { calculateCartTotals } from "../utils/calc/calculate-cart-totals";
import { calculateDiscount } from "../utils/calc/calculate-discount";

export const useCalculationCart = () => {
  const { cart, products, originalTotal, itemCount, finalTotal } = useCartStore();
  //1.장바구니 전체 금액 계산
  calculateCartTotals(cart, products);

  // 2.할인 계산
  calculateDiscount(originalTotal, itemCount, finalTotal);
};
