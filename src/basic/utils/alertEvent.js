import { updateSelectOption } from './updateSelectOption';
import { PRODUCT_LIST } from '../constant';

function runWithRandomDelay(callback, interval, maxDelay) {
  setTimeout(() => {
    setInterval(callback, interval);
  }, Math.random() * maxDelay);
}

function triggerLightningSale() {
  const luckyItem = PRODUCT_LIST[Math.floor(Math.random() * PRODUCT_LIST.length)];

  if (Math.random() < 0.3 && luckyItem.quantity > 0) {
    luckyItem.price = Math.round(luckyItem.price * 0.8);
    alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
    updateSelectOption();
  }
}

function suggestAnotherProduct() {
  const lastSelect = document.getElementById('product-select').value;

  if (lastSelect) {
    const suggest = PRODUCT_LIST.find((item) => item.id !== lastSelect && item.quantity > 0);
    if (suggest) {
      alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
      suggest.price = Math.round(suggest.price * 0.95);
      updateSelectOption();
    }
  }
}

// 실행
runWithRandomDelay(triggerLightningSale, 30000, 10000);
runWithRandomDelay(suggestAnotherProduct, 60000, 20000);
