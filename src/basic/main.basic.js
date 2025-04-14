import calculatePrice from './calculatePrice.js';
import addButton from './components/addButton.js';
import cartItems from './components/cartItems.js';
import productSelect from './components/productSelect.js';
import stockInfo from './components/stockInfo.js';
import sum from './components/sum.js';
import titleText from './components/titleText.js';
import { PRODUCTS } from './productList.constant.js';
import handleSelectProduct from './updateSelOpts.js';
import { getLastSelectState } from './utils/lastSelectState.js';

const SALE_PROBABILITY = 0.3; // 30% 확률
const DISCOUNT_RATE = 0.2; // 20% 할인
const ADDITIONAL_DISCOUNT_RATE = 0.05;

function main() {
  render();
  handleSelectProduct();
  calculatePrice();

  setTimeout(() => {
    setInterval(() => {
      let luckyItem = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      if (Math.random() < SALE_PROBABILITY && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * (1 - DISCOUNT_RATE));
        alert(
          `번개세일! ${luckyItem.name}이(가) ${DISCOUNT_RATE * 100}% 할인 중입니다!`
        );

        handleSelectProduct();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(() => {
    setInterval(() => {
      let lastSel = getLastSelectState();
      if (lastSel) {
        let suggestedItem = PRODUCTS.find(
          (product) => product.id !== lastSel && product.quantity > 0
        );

        if (suggestedItem) {
          alert(
            `${suggestedItem.name}은(는) 어떠세요? 지금 구매하시면 ${ADDITIONAL_DISCOUNT_RATE * 100}% 추가 할인!`
          );

          suggestedItem.val = Math.round(
            suggestedItem.val * (1 - ADDITIONAL_DISCOUNT_RATE)
          );
          // updateSelectOptions();

          handleSelectProduct();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}

function render() {
  const wrap = document.createElement('div');
  wrap.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  wrap.appendChild(titleText('h1', '장바구니'));
  wrap.appendChild(sum());
  wrap.appendChild(productSelect());
  wrap.appendChild(addButton());
  wrap.appendChild(stockInfo());
  wrap.appendChild(cartItems());

  const cont = document.createElement('div');
  cont.className = 'bg-gray-100 p-8';
  cont.appendChild(wrap);

  const root = document.getElementById('app');
  root.appendChild(cont);
}

main();
