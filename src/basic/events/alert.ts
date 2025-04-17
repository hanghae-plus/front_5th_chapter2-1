import { PRODUCTS } from "../context/product";
import { updateStockOption } from "./stock";


//깜짝 세일 알람
function discountAlert () {
  setInterval(function () {
    const luckyItem = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];

    if(Math.random() < 0.3 && luckyItem.stock > 0) {
      luckyItem.price = Math.round(luckyItem.price * 0.8);

      alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
      
      updateStockOption();
    }
  }, 30000);
};


//추천 세일 알람
function recommandAlert() {

  let lastSel;

  setInterval(function () {
    if(lastSel) {
      const suggest = PRODUCTS.find(function (item) { 
        return item.id !== lastSel && item.stock > 0; 
      });

      if(suggest) {
        alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
        suggest.price=Math.round(suggest.price * 0.95);
        updateStockOption();
      }
    }
  }, 60000);
};


export {recommandAlert, discountAlert};