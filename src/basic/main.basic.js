import { handleAddToCart } from "./events/add-to-cart";
import { handleCartItemAction } from "./events/cart-item-action";
import { calculateCart } from "./services/calculate-cart";
import { startLastSaleTimer, startLuckySaleTimer } from "./services/sale-timer";
import { resetCartState } from "./store/reset-state";
import { cartState } from "./store/state";
import { renderCartTemplate } from "./ui/render-cart-template";

function main() {
  //초기화
  resetCartState();

  //UI 렌더링
  const $root = document.getElementById("app");
  $root.innerHTML = renderCartTemplate();

  //요소 찾기
  const $addBtn = document.getElementById("add-to-cart");
  const $cartDisplay = document.getElementById("cart-items");

  if (!$addBtn || !$cartDisplay) {
    console.warn("필수 DOM 요소를 찾을 수 없습니다.");
    return;
  }

  //이벤트 핸들러 등록
  $addBtn.addEventListener("click", () => handleAddToCart());
  $cartDisplay.addEventListener("click", handleCartItemAction);

  //계산 함수
  calculateCart();

  // saleTimer함수
  startLuckySaleTimer();
  startLastSaleTimer(() => cartState.lastSelected); // 최신 상태를 항상 가져오도록 전달
}

main();
