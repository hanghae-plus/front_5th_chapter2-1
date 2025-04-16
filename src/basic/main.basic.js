import { render, elements } from './core/dom';
import { state } from './core/state';
import { saleAlert } from './domains/sales';
import { updateProductOption } from './domains/products';
import {
  calculateCartDiscountPrice,
  calculateCartQuantity,
  updateCartItem,
} from './domains/cart/';
import { handleAddCartClick } from './components/add-cart-button';

/**
 * 메인 함수
 */
const main = () => {
  // DOM요소 추가
  render();
  updateProductOption();
  calculateCartDiscountPrice();
  saleAlert(updateProductOption);
};

// 이벤트 핸들러: 장바구니 추가 버튼
elements.addToCartBtn.addEventListener('click', handleAddCartClick);

// 이벤트 핸들러: 장바구니 아이템 조작 (수량 변경/삭제)
elements.cartItemsContainer.addEventListener('click', (event) => {
  const targetElement = event.target;
  const productId = targetElement.dataset.productId;
  const cartItemElement = document.getElementById(productId);
  const product = state.products.find((product) => product.id === productId);

  if (!cartItemElement || !product) return;

  if (targetElement.classList.contains('quantity-change')) {
    const quantityChange = parseInt(targetElement.dataset.change);
    const currentQuantity = parseInt(cartItemElement.dataset.quantity);
    const { success, quantity, isRemove } = calculateCartQuantity(
      currentQuantity,
      quantityChange,
      product.stock + currentQuantity,
    );

    if (success) {
      updateCartItem(cartItemElement, product, quantity, isRemove);
      calculateCartDiscountPrice();
    } else {
      alert('재고가 부족합니다.');
    }
  } else if (targetElement.classList.contains('remove-item')) {
    const currentQuantity = parseInt(cartItemElement.dataset.quantity);
    product.stock += currentQuantity;
    cartItemElement.remove();
    calculateCartDiscountPrice();
  }
});

main();
