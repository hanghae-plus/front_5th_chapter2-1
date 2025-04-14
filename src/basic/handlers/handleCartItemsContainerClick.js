import { PRODUCT_LIST } from '../consts/productList';
import { calculateCart } from '../logic';

export const handleCartItemsContainerClick = (event) => {
  const clickedCartItemsContainer = event.target;

  if (
    clickedCartItemsContainer.classList.contains('quantity-change')
    || clickedCartItemsContainer.classList.contains('remove-item')
  ) {
    const cartItemId = clickedCartItemsContainer.dataset.productId;
    const cartItemElement = document.getElementById(cartItemId);
    const product = PRODUCT_LIST.find((p) => p.id === cartItemId);

    if (clickedCartItemsContainer.classList.contains('quantity-change')) {
      const quantityChange = parseInt(clickedCartItemsContainer.dataset.change);
      const newQuantity =
        parseInt(cartItemElement.querySelector('span').dataset.quantity)
        + quantityChange;

      if (
        newQuantity > 0
        && newQuantity
          <= product.quantity
            + parseInt(cartItemElement.querySelector('span').dataset.quantity)
      ) {
        cartItemElement.querySelector('span').dataset.quantity = newQuantity;
        cartItemElement.querySelector('span').textContent =
          `${product.name} - ${product.value}원 x ${newQuantity}`;
        product.quantity -= quantityChange;
      } else if (newQuantity <= 0) {
        cartItemElement.remove();
        product.quantity -= quantityChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (clickedCartItemsContainer.classList.contains('remove-item')) {
      const remQuantity = parseInt(
        cartItemElement.querySelector('span').dataset.quantity,
      );

      product.quantity += remQuantity;
      cartItemElement.remove();
    }

    calculateCart();
  }
};
