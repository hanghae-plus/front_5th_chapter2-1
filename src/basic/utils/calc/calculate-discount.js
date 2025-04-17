import { cartState } from "../../store/state";
import { applyBulkDiscount } from "../discount/bulk-discount";
import { applyTuesdayDiscount } from "../discount/tuesday-discount";

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
  const bulkResult = applyBulkDiscount(finalTotal, originalTotal, itemCount, discountRate);
  finalTotal = bulkResult.finalTotal;

  //  화요일 할인 적용
  const tuesdayResult = applyTuesdayDiscount(finalTotal, bulkResult.discountRate);
  finalTotal = tuesdayResult.finalTotal;

  cartState.finalTotal = finalTotal;
  cartState.discountRate = tuesdayResult.discountRate;
};
