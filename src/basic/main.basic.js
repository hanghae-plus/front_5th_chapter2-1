import {
  PRODUCTS,
  DISCOUNT_LUCKY_ITEM,
  DISCOUNT_SUGGEST_ITEM,
  LUCKY_ITEM_INTERVAL,
  SUGGEST_ITEM_INTERVAL,
} from './constant';
import { CartContainer, CartWrapper } from './component';
import { setCartEventHandlers } from './eventHandler';
import { updateCartSummary } from './util/cart';
import { updateSelectOption } from './util/product';

// TODO: item, product 의미는 다르지만 사용되는 목적은 동일하기에 관리 차원에서 통일.
// id 값이 테스트에 영향을 미치기 때문에 한번에 테스트 코드와 같이 수정할 예정

let lastSelectProduct;

function main() {
  const root = document.getElementById('app');
  const container = CartContainer();
  const wrapper = CartWrapper();

  container.appendChild(wrapper);
  root.appendChild(container);

  updateSelectOption();
  updateCartSummary();
  setCartEventHandlers(lastSelectProduct);

  setTimeout(function () {
    setInterval(function () {
      const luckyItem = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      if (Math.random() < 0.3 && luckyItem.stock > 0) {
        luckyItem.price = Math.round(luckyItem.price * DISCOUNT_LUCKY_ITEM);
        alert(`번개세일! ${luckyItem.name}이(가) 20% 할인 중입니다!`);
        updateSelectOption();
      }
    }, LUCKY_ITEM_INTERVAL);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      if (lastSelectProduct) {
        const suggest = PRODUCTS.find(function (item) {
          return item.id !== lastSelectProduct && item.stock > 0;
        });
        if (suggest) {
          alert(`${suggest.name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`);
          suggest.price = Math.round(suggest.price * DISCOUNT_SUGGEST_ITEM);
          updateSelectOption();
        }
      }
    }, SUGGEST_ITEM_INTERVAL);
  }, Math.random() * 20000);
}

main();
