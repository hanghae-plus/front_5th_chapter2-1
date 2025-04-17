import { calculateCartSummary } from './calculateCartSummary';
import { updateCartItemText, getQuantity } from './utils';
import { createCartElement } from '../components/index.js';
import { NO_STOCK_TEXT } from '../constants/index.js';

// 장바구니에 상품 추가
export const handleAddToCart = (
  select,
  cartItemsContainer,
  total,
  stockInfo,
  setLastSelectedItem,
  products
) => {
  const selectItem = select.value;

  const itemToAdd = products.find(product => {
    return product.id === selectItem;
  });

  // 재고 없는 상태일 때
  if (itemToAdd.quantity <= 0) {
    alert(NO_STOCK_TEXT);
    return;
  }

  if (itemToAdd && itemToAdd.quantity > 0) {
    const item = document.querySelector(`#${itemToAdd.id}`);
    const currentQuantity = item ? getQuantity(item) : 0;
    const newQuantity = currentQuantity + 1;

    if (newQuantity > currentQuantity + itemToAdd.quantity) {
      alert(NO_STOCK_TEXT);
      return;
    }

    if (item) {
      updateCartItemText(item, itemToAdd.name, itemToAdd.price, newQuantity);
    } else {
      const newItem = createCartElement(itemToAdd);
      cartItemsContainer.appendChild(newItem);
    }

    // 상품 수량 감소 한 번만
    itemToAdd.quantity--;

    calculateCartSummary(
      total,
      cartItemsContainer.children,
      products,
      stockInfo
    );

    setLastSelectedItem(selectItem); // 외부 상태 반영
  }
};

// 장바구니 상품 클릭 이벤트 처리
export const handleCartItemClick = (
  event,
  cartItemsContainer,
  total,
  stockInfo,
  products
) => {
  const target = event.target;

  if (
    !target.classList.contains('quantity-change') &&
    !target.classList.contains('remove-item')
  ) {
    return;
  }

  const productId = target.dataset.productId;
  const itemElement = document.querySelector(`#${productId}`);
  const prod = products.find(product => {
    return product.id === productId;
  });

  const currentQuantity = getQuantity(itemElement);

  if (target.classList.contains('quantity-change')) {
    const quantityChange = parseInt(target.dataset.change);
    const newQuantity = currentQuantity + quantityChange;

    if (newQuantity > 0 && newQuantity <= prod.quantity + currentQuantity) {
      updateCartItemText(itemElement, prod.name, prod.price, newQuantity);
      prod.quantity -= quantityChange;
    } else if (newQuantity <= 0) {
      itemElement.remove();
      prod.quantity -= quantityChange;
    } else {
      alert(NO_STOCK_TEXT);
    }
  }

  if (target.classList.contains('remove-item')) {
    prod.quantity += currentQuantity;
    itemElement.remove();
  }

  calculateCartSummary(total, cartItemsContainer.children, products, stockInfo);
};
