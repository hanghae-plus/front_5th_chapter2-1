import {
  renderPoint,
  renderPrice,
  renderTitle,
} from './components/common/index.js';
import {
  renderProductAddButton,
  renderProductList,
  renderProductSelect,
  renderStock,
} from './components/product/index.js';
import {
  calculatePrice,
  luckySaleTimer,
  recommendationTimer,
} from './utils/index.js';

function render() {
  const cartItems = document.getElementById('cart-items').children;
  const wrap = document.createElement('div');
  wrap.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';

  wrap.appendChild(renderTitle('h1', '장바구니'));
  wrap.appendChild(renderProductSelect());
  wrap.appendChild(renderProductAddButton());
  wrap.appendChild(renderProductList());
  calculatePrice(cartItems);

  const contents = document.createElement('div');
  contents.className = 'bg-gray-100 p-8';
  contents.appendChild(wrap);

  const root = document.getElementById('app');
  root.appendChild(contents);

  return contents;
}

function main() {
  const root = document.getElementById('app');
  root.appendChild(render());

  luckySaleTimer({ interval: 30000, delay: Math.random() * 10000 });
  recommendationTimer({ interval: 60000, delay: Math.random() * 20000 });

  document.addEventListener('cartUpdated', () => {
    const cartItems = document.getElementById('cart-items').children;
    const result = calculatePrice(cartItems);

    renderPrice(result);
    renderPoint();
    renderStock();
  });
}

main();
