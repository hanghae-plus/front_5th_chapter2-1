import { DiscountRate } from '../../component';

/**
 * 장바구니 총액을 UI에 업데이트하는 함수.
 *
 * 최종 총액을 표시하고, 할인율이 적용된 경우 해당 할인율을 UI에 추가합니다.
 *
 * @param {number} finalTotal - 할인 적용 후 최종 총액
 * @param {number} discountRate - 적용된 할인율 (0보다 큰 값일 때 할인율이 적용된 것으로 간주)
 */

export function updateCartTotalUI(finalTotal, discountRate) {
  const $cartTotal = document.getElementById('cart-total');
  $cartTotal.textContent = `총액: ${Math.round(finalTotal)}원`;

  if (discountRate > 0) {
    $cartTotal.appendChild(DiscountRate(discountRate));
  }
}
