import { createElement, elements, state, MAXIMUM_STOCKS } from '../core/';
import {
  calculateCartQuantity,
  updateCartItem,
  calculateCartDiscountPrice,
  updateStockStatus,
} from '../domains/cart/';
/**
 * 장바구니 상품 생성
 * @param {id: string, name: string, price: number, stock: number} product 상품 객체
 * @returns {Element} 장바구니 상품 요소
 */
const createCartItem = (product) => {
  const cartItemTag = createElement('div', {
    id: product.id,
    className: 'flex justify-between items-center mb-2',
  });
  const buttonClasses = {
    countButton: () =>
      [
        'quantity-change',
        'bg-blue-500',
        'text-white',
        'px-2',
        'py-1',
        'rounded',
        'mr-1',
      ].join(' '),
    deleteButton: () =>
      [
        'remove-item',
        'bg-red-500',
        'text-white',
        'px-2',
        'py-1',
        'rounded',
      ].join(' '),
  };
  cartItemTag.innerHTML = `
    <span style="font-size: 14px; color: #333;">
      ${product.name} - ${product.price}원 x 1
    </span>
    <div>
      <button class="${buttonClasses.countButton()}" data-product-id="${product.id}" data-change="-1">-</button>
      <button class="${buttonClasses.countButton()}" data-product-id="${product.id}" data-change="1">+</button>
      <button class="${buttonClasses.deleteButton()}" data-product-id="${product.id}">삭제</button
      >
    </div>
    `;
  return cartItemTag;
};

/**
 * 장바구니에 상품 추가
 * @param {Object} product 상품 객체
 * @returns {boolean} 성공 여부
 */
const addToCart = (product) => {
  const cartItemElement = document.getElementById(product.id);
  const currentQuantity = cartItemElement
    ? parseInt(cartItemElement.dataset.quantity)
    : 0;

  const { success, quantity, isRemove } = calculateCartQuantity(
    currentQuantity,
    1,
    MAXIMUM_STOCKS.find((p) => p.id === product.id).stock,
  );

  if (!success) {
    alert('재고가 부족합니다.');
    return false;
  }

  if (cartItemElement) {
    updateCartItem(cartItemElement, product, quantity, isRemove);
  } else {
    const newCartItemElement = createCartItem(product);
    newCartItemElement.dataset.quantity = 1;
    elements.cartItemsContainer.appendChild(newCartItemElement);
    product.stock--;
  }
  return true;
};

export const handleAddCartClick = () => {
  const selectedProductId = elements.productSelect.value;
  const product = state.products.find(
    (product) => product.id === selectedProductId,
  );
  if (addToCart(product)) {
    calculateCartDiscountPrice();
    updateStockStatus();
    state.lastSelectedProductId = selectedProductId;
  }
};
