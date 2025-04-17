import { createElementFromHTML } from '../utils/dom-utils.js';
import {
  $cartItemsContainer,
  $cartTotal,
  $productSelect,
  $addToCartBtn,
  $stockStatus,
} from '../components';
import { handleCartAction, handleSaleEvent } from '../services';
// 요소 생성
const $root = document.getElementById('app');

const $container = () => {
  return createElementFromHTML(/* html */ `
    <div class="bg-gray-100 p-8"></div>
  `);
};

const $wrapper = () => {
  return createElementFromHTML(/* html */ `
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8"></div>
  `);
};

const $header = () => {
  return createElementFromHTML(/* html */ `
    <h1 class="text-2xl font-bold mb-4">장바구니</h1>
  `);
};

function main() {
  /**
   * DOM 요소 생성
   */
  const createElements = () => {
    const container = $container();
    const wrapper = $wrapper();

    container.appendChild(wrapper);
    wrapper.append(
      $header(),
      $cartItemsContainer(),
      $cartTotal(),
      $productSelect(),
      $addToCartBtn(),
      $stockStatus(),
    );

    $root.appendChild(container);
  };
  createElements();
  handleSaleEvent();
  document.addEventListener('click', handleCartAction);
}

export default main;
