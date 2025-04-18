import { cartState } from "../../store/state";

/**
 * 총 금액과 할인 정보를 HTML 요소에 표시합니다.
 *
 * @param {HTMLElement} sum - 총액을 표시할 DOM 요소
 */

export const displayPriceInfo = (sum) => {
  const baseText = `총액: ${Math.round(cartState.finalTotal)}원`;

  if (cartState.discountRate > 0) {
    const discountHTML = `<span class="text-green-500 ml-2">(${(cartState.discountRate * 100).toFixed(1)}% 할인 적용)</span>`;
    sum.innerHTML = discountHTML;
  } else {
    sum.innerHTML = baseText;
  }
};
