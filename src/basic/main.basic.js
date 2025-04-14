import calculatePrice from './calculatePrice.js';
import addButton from './components/addButton.js';
import productList from './components/productList.js';
import productSelect from './components/productSelect.js';
import stockInfo from './components/stockInfo.js';
import sum from './components/sum.js';
import titleText from './components/titleText.js';
import renderProductSelectOptions from './renderProductSelectOptions.js';
import startRecommendationTimer from './startRecommendationTimer.js';
import startSaleTimer from './startSaleTimer.js';

function main() {
  render();
  renderProductSelectOptions();
  calculatePrice();

  document.addEventListener('cartUpdated', () => {
    calculatePrice();
  });

  startSaleTimer({ interval: 30000, delay: Math.random() * 10000 });
  startRecommendationTimer({ interval: 60000, delay: Math.random() * 20000 });
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
  wrap.appendChild(productList());

  const cont = document.createElement('div');
  cont.className = 'bg-gray-100 p-8';
  cont.appendChild(wrap);

  const root = document.getElementById('app');
  root.appendChild(cont);
}

main();
