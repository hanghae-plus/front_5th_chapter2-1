import { cartState } from "../../store/state";

const BULK_DISCOUNT_THRESHOLD = 30;
const BULK_DISCOUNT_RATE = 0.25;

const TUESDAY = 2;
const TUESDAY_DISCOUNT_RATE = 0.1;

/**
 * 상품 수량, 할인 적용 전후 금액을 기준으로 할인율을 계산.
 * 화요일에는 추가 할인 적용이 포함.
 *
 */

export const calculateDiscount = () => {
  cartState.discountRate = 0;

  if (cartState.itemCount >= BULK_DISCOUNT_THRESHOLD) {
    const bulkDiscount = cartState.finalTotal * BULK_DISCOUNT_RATE;
    const itemDiscount = cartState.originalTotal - cartState.finalTotal;

    if (bulkDiscount > itemDiscount) {
      cartState.finalTotal = cartState.originalTotal * (1 - BULK_DISCOUNT_RATE);
      cartState.discountRate = BULK_DISCOUNT_RATE;
    } else {
      cartState.discountRate =
        (cartState.originalTotal - cartState.finalTotal) / cartState.originalTotal;
    }
  } else {
    cartState.discountRate =
      (cartState.originalTotal - cartState.finalTotal) / cartState.originalTotal;
  }

  if (new Date().getDay() === TUESDAY) {
    cartState.finalTotal *= 1 - TUESDAY_DISCOUNT_RATE;
    cartState.discountRate = Math.max(cartState.discountRate, TUESDAY_DISCOUNT_RATE);
  }
};
