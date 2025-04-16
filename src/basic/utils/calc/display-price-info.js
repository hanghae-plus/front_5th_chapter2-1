/**
 * 총 금액과 할인 정보를 HTML 요소에 표시합니다.
 *
 * @param {HTMLElement} sum - 총액을 표시할 DOM 요소
 * @param {number} finalTotal - 할인 적용 후 최종 금액
 * @param {number} discountRate - 할인율 (예: 0.15 = 15%)
 */

export function displayPriceInfo (sum,finalTotal,discountRate) {
  const baseText = `총액: ${Math.round(finalTotal)}원`;

  if (discountRate > 0) {
    const discountHTML = `<span class="text-green-500 ml-2">(${(discountRate * 100).toFixed(1)}% 할인 적용)</span>`;
    sum.innerHTML = baseText + ' ' + discountHTML;
  } else {
    sum.innerHTML = baseText;
  }
}