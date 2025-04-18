import {
  cartWrapperElement,
  cartContentElement,
  cartText,
  cartTotal,
  selectProduct,
  addCartButton,
  stockQuantityStatus,
  cartItems,
} from '../components';

export function renderInit() {
  const rootElement = document.getElementById('app');

  const cartChildren = [
    cartText,
    cartItems.render(),
    cartTotal.render(),
    selectProduct.render(),
    addCartButton.render(),
    stockQuantityStatus.render(),
  ];

  cartContentElement.append(...cartChildren);
  cartWrapperElement.appendChild(cartContentElement);

  rootElement.appendChild(cartWrapperElement);
}
