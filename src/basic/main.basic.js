
import { handleAddToCart } from "./logic/add-to-cart";
import { calculateCart } from "./logic/calculate-cart";
import { startLastSaleTimer, startLuckySaleTimer } from "./logic/sale-timer";
import { CartUiTemplate } from "./ui/cart-template";

const lastSaleRef = { current: null }; // 외부에서 선택값을 계속 업데이트함

const $addBtn = document.getElementById('add-to-cart');
const $cartDisplay =document.getElementById('cart-items');

function main() {
  //요소 생성
  const $root = document.getElementById('app');
  $root.innerHTML = CartUiTemplate();

  //계산 함수
  calculateCart();
  
  // saleTimer함수
  startLuckySaleTimer();
  startLastSaleTimer(() => lastSaleRef.current); // 최신 상태를 항상 가져오도록 전달
};

main();

$addBtn?.addEventListener('click', handleAddToCart(lastSaleRef) );


$cartDisplay?.addEventListener('click', function (event) {
  var tgt=event.target;
  if(tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    var prodId=tgt.dataset.productId;
    var itemElem=document.getElementById(prodId);
    var prod=prodList.find(function (p) { return p.id === prodId; });
    if(tgt.classList.contains('quantity-change')) {
      var qtyChange=parseInt(tgt.dataset.change);
      var newQty=parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
      if(newQty > 0 && newQty <= prod.q + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])) {
        itemElem.querySelector('span').textContent=itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
        prod.q -= qtyChange;
      } else if(newQty <= 0) {
        itemElem.remove();
        prod.q -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if(tgt.classList.contains('remove-item')) {
      var remQty=parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.q += remQty;
      itemElem.remove();
    }
    calcCart();
  }
});