import { DISCOUNT_POLICY } from "../../constants";
import type { CartItem } from "../../types";

//상품별 할인 적용 후 총 가격 계산
const calculateProductDiscountedPrice = (cartList: CartItem[]): number => {
  return cartList.reduce((sum, item) => {
    const productRate =
      item.count >= DISCOUNT_POLICY.PRODUCT.MIN_COUNT
        ? DISCOUNT_POLICY.PRODUCT.RATE[item.id as keyof typeof DISCOUNT_POLICY.PRODUCT.RATE] || 0
        : 0;
    return sum + item.price * item.count * (1 - productRate);
  }, 0);
};

// BULK 할인률 계산
const calculateBulkDiscountRate = (
  totalPrice: number,
  productDiscountedPrice: number,
  totalItemCount: number,
): number => {
  if (totalItemCount < DISCOUNT_POLICY.BULK.MIN_COUNT) {
    return 0;
  }
  const bulkRate = DISCOUNT_POLICY.BULK.RATE;
  const bulkPrice = totalPrice * (1 - bulkRate);
  // 묶음 할인이 더 유리한 경우에만 적용
  return bulkPrice < productDiscountedPrice ? bulkRate : 0;
};

// 날짜(화요일) 세일 할인율 적용
const calculateDateSaleDiscountRate = (currentRate: number): number => {
  const today = new Date().getDay();
  if (today === DISCOUNT_POLICY.DATE_SALE.DAY) {
    return Math.max(currentRate, DISCOUNT_POLICY.DATE_SALE.RATE);
  }
  return currentRate;
};

// 메인 할인 계산기
export const calculateDiscountRate = (totalPrice: number, cartList: CartItem[]) => {
  const productPrice = calculateProductDiscountedPrice(cartList);
  const initialRate = totalPrice !== productPrice ? (totalPrice - productPrice) / totalPrice : 0;

  // 소수점 셋째 자리까지 반올림
  const roundedRate = Math.round(initialRate * 1000) / 1000;

  // BULK 할인율
  const itemCount = cartList.reduce((acc, i) => acc + i.count, 0);
  const bulkRate = calculateBulkDiscountRate(totalPrice, productPrice, itemCount);

  // 더 높은 할인율 선택
  const afterBulk = Math.max(roundedRate, bulkRate);

  // 날짜 세일 적용
  const finalRate = calculateDateSaleDiscountRate(afterBulk);

  // 최종 할인 가격
  const finalPrice = totalPrice * (1 - finalRate);

  return { finalDiscountRate: finalRate, finalDiscountPrice: finalPrice };
};
