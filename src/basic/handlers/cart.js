import { PRODUCT } from '../store';
import { calculateCart } from './calculation';

export function handleCartItem(event) {
  const { target } = event;

  if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
    const productId = target.dataset.productId;
    const targetElementProduct = document.getElementById(productId);
    const targetProduct = PRODUCT.getById(productId);
    const currentQuantity = parseInt(targetElementProduct.querySelector('span').textContent.split('x ')[1]);

    const isQuantityChange = target.classList.contains('quantity-change');
    const isRemoveItem = target.classList.contains('remove-item');

    if (isQuantityChange) {
      const quantityChange = parseInt(target.dataset.change);
      const newQuantity = currentQuantity + quantityChange;

      if (newQuantity > 0 && newQuantity <= targetProduct.quantity + currentQuantity) {
        targetElementProduct.querySelector('span').textContent =
          `${targetElementProduct.querySelector('span').textContent.split('x ')[0]}x ${newQuantity}`;

        PRODUCT.updateQuantity(productId, -quantityChange);
      } else if (newQuantity <= 0) {
        targetElementProduct.remove();

        PRODUCT.updateQuantity(productId, -quantityChange);
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (isRemoveItem) {
      PRODUCT.updateQuantity(productId, currentQuantity);

      targetElementProduct.remove();
    }

    calculateCart();
  }
}
