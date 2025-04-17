import { cartState } from "../../store/state";
import { applyBulkDiscount, applyTuesdayDiscount, calculateDiscountRate } from "../discount";

/**
 * 장바구니 할인을 계산하는 함수
 *
 */

export const calculateDiscount = () => {
  let { originalTotal, itemCount, discountRate, finalTotal } = cartState;

  //finalTotal이 없으면 originalTotal을 사용
  if (finalTotal === undefined) {
    finalTotal = originalTotal;
  }

  //대량 구매 할인 적용
  const bulkResult = applyBulkDiscount(finalTotal, originalTotal, itemCount);
  finalTotal = bulkResult.finalTotal;

  //  화요일 할인 적용
  const tuesdayResult = applyTuesdayDiscount(finalTotal);
  finalTotal = tuesdayResult.finalTotal;

  // 최종 할인율 계산
  const finalDiscountRate = calculateDiscountRate(finalTotal, originalTotal, discountRate);

  cartState.finalTotal = finalTotal;
  cartState.discountRate = finalDiscountRate;
};
