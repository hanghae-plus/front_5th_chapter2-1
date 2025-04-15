import { showSelectList } from '../hooks/selectProduct'
import { store } from '../store/store'
import { getPoints } from '../hooks/getPoints';
import { checkStock } from '../hooks/checkStock';

export const ShoppingList = () => {
  const root = document.getElementById('app');

  root.innerHTML = `
    <div class="bg-gray-100 p-8">
      <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 id="title" class="text-2xl font-bold mb-4">장바구니</h1>
        <div id="cart-items"></div>
        <div id="cart-total" class="text-xl font-bold my-4"></div>
        <select id="product-select" class="border rounded p-2 mr-2"></select>
        <button id="add-to-cart" class="bg-blue-500 text-white px-4 py-2 rounded">추가</button>
        <div id="stock-status" class="text-sm text-gray-500 mt-2"></div>
      </div>
    </div>
  `;

  const cartDisp = document.getElementById('cart-items');
  const sum = document.getElementById('cart-total');
  const sel = document.getElementById('product-select');
  const addBtn = document.getElementById('add-to-cart');
  const stockInfo = document.getElementById('stock-status');

  store.element.cartDisp = cartDisp;
  store.element.sum = sum;
  store.element.sel = sel;
  store.element.addBtn = addBtn;
  store.element.stockInfo = stockInfo;

  showSelectList();
  checkStock();
  getPoints(sum);
};