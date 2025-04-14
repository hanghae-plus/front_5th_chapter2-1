import calculatePrice from '../calculatePrice.js';
import { PRODUCTS } from '../productList.constant.js';

export default function productList() {
  const cartItems = document.createElement('div');
  cartItems.id = 'cart-items';
  cartItems.addEventListener('click', handleChangeQuantity);
  return cartItems;
}

function handleChangeQuantity(event) {
  const target = event.target;
  if (
    target.classList.contains('quantity-change') ||
    target.classList.contains('remove-item')
  ) {
    const productId = target.dataset.productId;

    const itemElement = document.getElementById(productId);
    const product = PRODUCTS.find((product) => product.id === productId);

    const span = itemElement.querySelector('span');
    // [상품명 - 가격, 수량]
    const [productName, quantity] = span.textContent.split('x ');

    const currentQuantity = parseInt(quantity);
    const quantityIncrement = parseInt(target.dataset.change);

    const newQuantity = currentQuantity + quantityIncrement;
    const maxQuantity = product.quantity + currentQuantity;
    if (target.classList.contains('quantity-change')) {
      // 수량이 0개 이상이고, 재고 범위 내의 경우 -> 목록에 추가
      if (newQuantity > 0 && newQuantity <= maxQuantity) {
        span.textContent = `${productName}x ${newQuantity}`;
        product.quantity -= quantityIncrement;

        // 수량이 0보다 작은 경우 -> 목록에서 삭제
      } else if (newQuantity <= 0) {
        itemElement.remove();
        product.quantity -= quantityIncrement;

        // 재고가 없는 경우
      } else {
        alert('재고가 부족합니다.');
      }

      // 수량 제거
    } else if (target.classList.contains('remove-item')) {
      product.quantity += currentQuantity;
      itemElement.remove();
    }
    // document.dispatchEvent(new CustomEvent('cartUpdated'));
    calculatePrice();
  }
}
