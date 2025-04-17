import { useCartStore } from "../store/useCartStore";

const MIN_DISCOUNT_QUANTITY = 10;

const DISCOUNT_MAP: Record<string, number> = {
  p1: 0.1,
  p2: 0.15,
  p3: 0.2,
  p4: 0.05,
  p5: 0.25,
};

/**
 * 특정 상품 ID와 수량에 따라 할인율을 반환
 *
 * @param {string} productId - 상품 ID
 * @param {number} quantity - 해당 상품의 수량
 * @returns {number} - 할인율 (0.1 = 10%)
 */

const getDiscountRate = (productId: string, quantity: number): number => {
  if (quantity < MIN_DISCOUNT_QUANTITY) return 0;
  return DISCOUNT_MAP[productId] || 0;
};

export const useCartCalculation = () => {
  const { cart, updateCartTotals } = useCartStore();

  // useEffect(() => {
  //   let originalTotal = 0;
  //   let finalTotal = 0;
  //   let itemCount = 0;

  //   cart.forEach((item) => {
  //     const itemTotal = item.val * item.quantity;
  //     const discount = getDiscountRate(item.id, item.quantity);
  //     originalTotal += itemTotal;
  //     finalTotal += itemTotal * (1 - discount);
  //     itemCount += item.quantity;
  //   });

  //   updateCartTotals(originalTotal, finalTotal, itemCount, discountRate);
  // }, [cart, updateCartTotals]);
};
