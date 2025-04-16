import { handleAddToCart } from "./events/add-to-cart";
import { handleCartItemAction } from "./events/cart-item-action";
import { calculateCart } from "./logic/calculate-cart";
import { startLastSaleTimer, startLuckySaleTimer } from "./logic/sale-timer";
import { cartState } from "./store/state";
import { renderCartTemplate } from "./ui/render-cart-template";

function main() {
  //요소 생성
  const $root = document.getElementById("app");
  $root.innerHTML = renderCartTemplate();

  //요소 찾기
  const $addBtn = document.getElementById("add-to-cart");
  const $cartDisplay = document.getElementById("cart-items");

  //이벤트 핸들러 등록
  $addBtn?.addEventListener("click", () => handleAddToCart());
  $cartDisplay?.addEventListener("click", handleCartItemAction);

  //계산 함수
  calculateCart();

  // saleTimer함수
  startLuckySaleTimer();
  startLastSaleTimer(() => cartState.lastSelected); // 최신 상태를 항상 가져오도록 전달
}

main();
