import { logic, getCartItemText, getValueFromCardItem } from '../../logic.js';
import { updateLastSelValue } from '../../../../store/lastSel.js';
import { ElementIds } from '../../../../../shared/app/constants.js';
import { createCartItemText } from '../../../../../shared/app/Cart/components/AddProduct/calculation.js';

function createNewCartItem(itemToAdd) {
  const newItem = document.createElement('div');
  newItem.id = itemToAdd.id;
  newItem.className = 'flex justify-between items-center mb-2';
  newItem.innerHTML =
    `<span>${itemToAdd.name} - ${itemToAdd.val}원 x 1</span>` +
    `<div><button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="-1">-</button>` +
    `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${itemToAdd.id}" data-change="1">+</button>` +
    `<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${itemToAdd.id}">삭제</button></div>`;

  return newItem;
}

function updateCartItemQuantityDom(item, itemToAdd) {
  const newQty = getValueFromCardItem(item) + 1;
  const { name, val, q } = itemToAdd;

  if (newQty <= q) {
    getCartItemText(item).textContent = createCartItemText(name, val, newQty);
    itemToAdd.q--;
  } else {
    alert('재고가 부족합니다.');
  }
}

function createNewItemToCart() {
  const cartDisplay = document.getElementById(ElementIds.CART_DISP);

  const newItem = createNewCartItem(itemToAdd);
  cartDisplay.appendChild(newItem);
}

function decreaseProductItemQuantity(itemToAdd) {
  itemToAdd.q--;
}

function addItemToCart(itemToAdd) {
  createNewItemToCart();
  decreaseProductItemQuantity();
}

function updateCartDisplay(itemToAdd) {
  const item = document.getElementById(itemToAdd.id);
  item ? updateCartItemQuantityDom(item, itemToAdd) : addItemToCart(itemToAdd);
}

export function addItemToCart(itemToAdd) {
  updateCartDisplay(itemToAdd);
  logic();
  updateLastSelValue(selItem);
}
