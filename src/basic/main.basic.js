
import { calculateCart } from "./logic/calculate-cart";
import { startLastSaleTimer, startLuckySaleTimer } from "./logic/sale";
import { makeUI, UiTemplate } from "./ui/make-ui";

let lastSale = null; // 외부에서 선택값을 계속 업데이트함


function main() {
  //요소 생성
  const $root = document.getElementById('app');
  $root.innerHTML = UiTemplate();

  //계산 함수
  calculateCart();
  
  // saleTimer함수
  startLuckySaleTimer();
  startLastSaleTimer(() => lastSale); // 최신 상태를 항상 가져오도록 전달
};

main();

addBtn.addEventListener('click', function () {
  const {select} = makeUI(); 
  const selectedItem=sel.value;
  var itemToAdd=prodList.find(function (p) { return p.id === selectedItem; });

  if(itemToAdd && itemToAdd.q > 0) {
    var item=document.getElementById(itemToAdd.id);
    if(item) {
      var newQty=parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if(newQty <= itemToAdd.q) {
        item.querySelector('span').textContent=itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
        itemToAdd.q--;
      } else {alert('재고가 부족합니다.');}
    } else {
      var newItem=document.createElement('div');
      newItem.id=itemToAdd.id;
      newItem.className='flex justify-between items-center mb-2';
      newItem.innerHTML='<span>' + itemToAdd.name + ' - ' + itemToAdd.val + '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' + itemToAdd.id + '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' + itemToAdd.id + '">삭제</button></div>';
      cartDisp.appendChild(newItem);
      itemToAdd.q--;
    }
    calcCart();
    lastSel=selItem;
  }
});


cartDisp.addEventListener('click', function (event) {
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