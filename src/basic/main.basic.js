
import { handleAddToCart } from "./logic/add-to-cart";
import { calculateCart } from "./logic/calculate-cart";
import { handleCartItemAction } from "./logic/cart-item-action";
import { startLastSaleTimer, startLuckySaleTimer } from "./logic/sale-timer";
import { CartUiTemplate } from "./ui/cart-template";

const lastSaleRef = { current: null }; // 외부에서 선택값을 계속 업데이트함


function main() {
  //요소 생성
  const $root = document.getElementById('app');
  $root.innerHTML = CartUiTemplate();

  //요소 찾기
  const $addBtn = document.getElementById('add-to-cart');
  const $cartDisplay =document.getElementById('cart-items');

  //이벤트 핸들러 등록
  $addBtn?.addEventListener('click', handleAddToCart(lastSaleRef) );
  $cartDisplay?.addEventListener('click', handleCartItemAction);

  //계산 함수
  calculateCart();
  
  // saleTimer함수
  startLuckySaleTimer();
  startLastSaleTimer(() => lastSaleRef.current); // 최신 상태를 항상 가져오도록 전달
};

main();

