import { DOM } from '../elements';
import { PRODUCT, CART } from '../store';
import { calculateCart } from './calculation';

const isProductAvailable = (product) => product && product.quantity > 0;

const updateExistingCartItem = (item, product) => {
  const priceElement = item.firstElementChild;
  const currentQuantity = parseInt(priceElement.textContent.split('x ')[1]);
  const newQuantity = currentQuantity + 1;

  const { id, name, price, quantity } = product;

  if (quantity > 0) {
    priceElement.textContent = `${name} - ${price}원 x ${newQuantity}`;

    PRODUCT.updateQuantity(id, -1);
  }
};

const createCartItemElement = (product) => {
  const newItem = document.createElement('div');

  newItem.id = product.id;
  newItem.className = 'flex justify-between items-center mb-2';
  newItem.innerHTML = createCartItemHTML(product);

  return newItem;
};

const updateNewCartItem = (product) => {
  const newItem = createCartItemElement(product);

  DOM.appendElement('cartItemContainer', newItem);

  PRODUCT.updateQuantity(product.id, -1);
};

const createCartItemHTML = ({ id, name, price }) =>
  `<span>${name} - ${price}원 x 1</span><div>` +
  `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="-1">-</button>` +
  `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${id}" data-change="1">+</button>` +
  `<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${id}">삭제</button></div>`;

export const handleAddProduct = () => {
  const selectedProductId = DOM.getElement('select').value;
  const selectedProduct = PRODUCT.getById(selectedProductId);

  if (!isProductAvailable(selectedProduct)) {
    alert('재고가 부족합니다.');

    return;
  }

  const item = document.getElementById(selectedProduct.id);

  if (item) {
    updateExistingCartItem(item, selectedProduct);
  } else {
    updateNewCartItem(selectedProduct);
  }

  calculateCart();

  CART.setLastSelectedProductId(selectedProductId);
};
