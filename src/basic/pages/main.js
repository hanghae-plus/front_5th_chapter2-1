import {
  CartItems,
  CartTotal,
  ProductSelect,
  CartAddButton,
  StockStatus,
} from '../components';
import { handleSaleEvent } from '../services/sale-service.js';

const $root = document.getElementById('app');

function main() {
  $root.innerHTML = `
  <div class="bg-gray-100 p-8">
    <div id="wrap" class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
      <h1 class="text-2xl font-bold mb-4">장바구니</h1>
    </div>
  </div>
`;

  const $wrap = $root.querySelector('#wrap');

  const createElements = () => {
    $wrap.append(
      CartItems(),
      CartTotal(),
      ProductSelect(),
      CartAddButton(),
      StockStatus(),
    );
  };
  createElements();
  handleSaleEvent();
}

export default main;
