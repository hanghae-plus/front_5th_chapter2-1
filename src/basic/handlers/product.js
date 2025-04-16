import { DOM } from '../elements';
import { PRODUCT, CART } from '../store';
import { calculateCart } from './calculation';

export function handleAddProduct() {
  const selectedProductId = DOM.getElement('select').value;
  const selectedProduct = PRODUCT.getById(selectedProductId);

  if (selectedProduct && selectedProduct.quantity > 0) {
    const item = document.getElementById(selectedProduct.id);

    if (item) {
      const priceElement = item.firstElementChild;
      const currentQuantity = parseInt(priceElement.textContent.split('x ')[1]);
      const newQuantity = currentQuantity + 1;

      if (selectedProduct.quantity > 0) {
        priceElement.textContent = `${selectedProduct.name} - ${selectedProduct.price}원 x ${newQuantity}`;
        PRODUCT.updateQuantity(selectedProduct.id, -1);
      }
    } else {
      const newItem = document.createElement('div');

      newItem.id = selectedProductId;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML =
        `<span>${selectedProduct.name} - ${selectedProduct.price}원 x 1</span><div>` +
        `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${
          selectedProduct.id
        }" data-change="-1">-</button>` +
        `<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${
          selectedProduct.id
        }" data-change="1">+</button>` +
        `<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${
          selectedProduct.id
        }">삭제</button></div>`;

      DOM.getElement('cartItemContainer').appendChild(newItem);

      PRODUCT.updateQuantity(selectedProduct.id, -1);
    }

    calculateCart();

    CART.setLastSelectedProductId(selectedProductId);
  } else {
    alert('재고가 부족합니다.');
  }
}
