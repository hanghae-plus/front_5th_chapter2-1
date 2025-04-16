


import { products } from "../data/products";
import { renderProductOptions } from "../utils/render-product-options";

/** 상품 선택 옵션을 새로 렌더링하는 함수 */
function updateSelectOptions() {

  const select = document.getElementById('product-select');
  select.innerHTML = renderProductOptions();
}

// luckySaleTimer함수
const startLuckySaleTimer = () =>{

  setTimeout(function () {
    setInterval(function () {

      const luckyItem=products[Math.floor(Math.random() * products.length)];

      if(Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val=Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');

        updateSelectOptions();
      }
    }, 30000);
  }, Math.random() * 10000);
}


// lastSaleTimer함수
const startLastSaleTimer =(getLastSale) =>{

    setTimeout(function () {
      setInterval(function () {

        const lastSale = getLastSale(); 
        if(lastSale) {
          const suggest=products.find(function (item) { return item.id !== lastSel && item.q > 0; });
          
          if(suggest) {
            alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
            suggest.val=Math.round(suggest.val * 0.95);

            updateSelectOptions();
          }
        }
      }, 60000);
    }, Math.random() * 20000);
}

export { startLastSaleTimer, startLuckySaleTimer };

