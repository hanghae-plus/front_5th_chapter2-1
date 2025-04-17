import { cartState } from "../store/state";
import { calculateCartTotals, calculateDiscount, displayPriceInfo } from "../utils/calc";

/** 포인트 표시용 span 엘리먼트를 생성하여 부모 요소에 추가하고 반환 */
const createLoyaltyTag = (parent) => {
  const $span = document.createElement("span");
  $span.id = "loyalty-points";
  $span.className = "text-blue-500 ml-2";
  parent.appendChild($span);
  return $span;
};

/**
 * 총액에 따라 적립 포인트를 계산하고, 포인트 표시 엘리먼트를 갱신
 *
 * @param {HTMLElement} sum - 포인트 표시를 추가할 부모 엘리먼트
 */
const renderBonusPoints = (sum) => {
  const bonusPoints = Math.floor(cartState.finalTotal / 1000);
  const pointsTag = document.getElementById("loyalty-points") ?? createLoyaltyTag(sum);

  pointsTag.innerHTML = `(포인트: <span>${bonusPoints}</span>)`;
};

/** 재고 부족 상품 정보를 HTML로 표시 */
const updateStockInfo = () => {
  const $stockInfo = document.getElementById("stock-status");

  const infoMsg = cartState.products
    .filter((item) => item.q < 5)
    .map((item) => {
      const status =
        item.q > 0
          ? `재고 부족 (<strong class="text-red-500">${item.q}개</strong> 남음)`
          : `<span class="text-gray-500">품절</span>`;
      return `<div>${item.name}: ${status}</div>`;
    })
    .join("");

  $stockInfo.innerHTML = infoMsg;
};

/** 장바구니 항목을 기반으로 금액 및 할인 정보를 계산하고 화면에 렌더링하는 함수 */
function calculateCart() {
  const $sum = document.getElementById("cart-total");

  //1.장바구니 전체 금액 계산
  calculateCartTotals();

  //2.할인 계산
  calculateDiscount({
    finalTotal: cartState.finalTotal,
    originalTotal: cartState.originalTotal,
    itemCount: cartState.itemCount,
    discountRate: cartState.discountRate,
  });

  // 4. UI 반영
  displayPriceInfo($sum);
  updateStockInfo();
  renderBonusPoints($sum);
}

export { calculateCart };
