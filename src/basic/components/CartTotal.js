/**
 * 장바구니 총액 컴포넌트
 * @param {number} totalAmount - 총 금액
 * @param {number} discountRate - 할인율
 * @param {number} bonusPoints - 보너스 포인트
 */
const CartTotal = (totalAmount, discountRate = 0, bonusPoints = 0) => {
  let html = `<div id="cart-total" class="text-xl font-bold my-4">
    총액: ${Math.round(totalAmount)}원`;

  // 할인율 표시
  if (discountRate > 0) {
    html += `<span class="text-green-500 ml-2">(${(discountRate * 100).toFixed(1)}% 할인 적용)</span>`;
  }

  // 포인트 표시
  html += `<span id="loyalty-points" class="text-blue-500 ml-2">(포인트: ${bonusPoints})</span>`;

  html += `</div>`;

  return html.replace(/\n\s*/g, "");
};

export default CartTotal;
