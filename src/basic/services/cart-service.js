import { state } from '../store/index.js';
import { MAXIMUM_STOCKS } from '../constants/index.js';
import {
  calculateCartQuantity,
  calculateCartDiscountPrice,
} from './cart-calculate.js';
import { updateStockStatus } from './product-service.js';
import { $cartItem } from '../components/index.js';

/**
 * 장바구니 수량 업데이트
 * @param {Element} cartItemElement 장바구니 아이템 요소
 * @param {Object} product 상품 객체
 * @param {number} quantity 수량
 */
const updateCartItem = (cartItemElement, product, quantity) => {
  product.stock -= quantity - parseInt(cartItemElement.dataset.quantity);
  cartItemElement.dataset.quantity = quantity;
  cartItemElement.querySelector('span').textContent =
    `${product.name} - ${product.price}원 x ${quantity}`;
};

/**
 * 장바구니 동작 처리
 * @param {Event} event 이벤트 객체
 */
const handleCartAction = (event) => {
  const cartItemsContainer = document.getElementById('cart-items');
  const productSelect = document.getElementById('product-select');

  const targetElement = event.target;
  const selectedProductId =
    targetElement.dataset.productId || productSelect.value;
  const product = state.products.find((p) => p.id === selectedProductId);

  const cartItemElement = document.getElementById(product.id);
  const currentQuantity = cartItemElement
    ? parseInt(cartItemElement.dataset.quantity)
    : 0;

  const handleAdd = () => {
    const { success, quantity } = calculateCartQuantity(
      currentQuantity,
      1,
      MAXIMUM_STOCKS.find((p) => p.id === product.id).stock,
    );
    if (!success) return alert('재고가 부족합니다.');
    if (cartItemElement) updateCartItem(cartItemElement, product, quantity);
    else {
      const newCartItem = $cartItem(product);
      newCartItem.dataset.quantity = 1;
      cartItemsContainer.appendChild(newCartItem);
      product.stock--;
    }
  };

  const handleQuantityChange = () => {
    const { success, quantity, isRemove } = calculateCartQuantity(
      currentQuantity,
      1,
      product.stock + currentQuantity,
    );
    if (success) updateCartItem(cartItemElement, product, quantity, isRemove);
    else alert('재고가 부족합니다.');
  };

  const handleRemove = () => {
    product.stock += currentQuantity;
    cartItemElement.remove();
  };

  if (targetElement.id === 'add-to-cart') {
    if (!cartItemElement) {
      handleAdd();
    } else {
      handleQuantityChange();
    }
  }

  if (targetElement.closest('#cart-items')) {
    if (targetElement.classList.contains('quantity-change')) {
      handleQuantityChange();
    }
    if (targetElement.classList.contains('remove-item')) {
      handleRemove();
    }
  }

  calculateCartDiscountPrice();
  updateStockStatus();
  state.lastSelectedProductId = selectedProductId;
};

export { updateCartItem, handleCartAction };
