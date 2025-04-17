import { cartState } from "../../store/state";

/**
 * 장바구니 할인을 계산하는 함수
 *
 */

export const calculateDiscount = (props) => {
  let { finalTotal, originalTotal, itemCount, discountRate } = props;

  //finalTotal이 없으면 originalTotal을 사용
  finalTotal = finalTotal ?? originalTotal;

  //대량 구매 할인 적용
  finalTotal = applyBulkDiscount(finalTotal, originalTotal, itemCount);

  //  화요일 할인 적용
  finalTotal = applyTuesdayDiscount(finalTotal);

  // 최종 할인율 계산
  const finalDiscountRate = calculateDiscountRate(finalTotal, originalTotal, discountRate);

  // cartState 업데이트
  cartState.finalTotal = finalTotal;
  cartState.discountRate = finalDiscountRate;
};
