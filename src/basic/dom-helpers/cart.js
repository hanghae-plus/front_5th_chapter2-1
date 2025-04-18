import { CART_ITEMS_ID } from '../constants';

function addNewCartItemElement(product) {
  const cartItemsElement = document.querySelector(`#${CART_ITEMS_ID}`);
  const newCartItemElement = createCartItemElement(product);
  cartItemsElement.appendChild(newCartItemElement);
}

function getCartItemElementById(productId) {
  return document.querySelector(`#${productId}`);
}

function createCartItemElement(product) {
  const template = document.createElement('template');
  const newItem = `
    <div id="${product.id}" class="flex justify-between items-center mb-2">
      <span>${product.name} - ${product.price}원 x 1</span>
      <div>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
                data-product-id="${product.id}" 
                data-change="-1">-</button>
        <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" 
                data-product-id="${product.id}" 
                data-change="1">+</button>
        <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" 
                data-product-id="${product.id}">삭제</button>
      </div>
    </div>
  `;
  template.innerHTML = newItem.trim();
  return template.content.firstChild;
}

function updateCartItemElement(cartItemElement, product, newQuantity) {
  cartItemElement.querySelector('span').textContent =
    `${product.name} - ${product.price}원 x ${newQuantity}`;
}

export { addNewCartItemElement, getCartItemElementById, updateCartItemElement };
