import calculatePrice from '../calculatePrice.js';
import { PRODUCTS } from '../productList.constant.js';

export default function cartItems() {
  const cartItems = document.createElement('div');
  cartItems.id = 'cart-items';
  cartItems.addEventListener('click', handleChangeQuantity);
  return cartItems;
}

function handleChangeQuantity(event) {
  let target = event.target;
  if (
    target.classList.contains('quantity-change') ||
    target.classList.contains('remove-item')
  ) {
    let productId = target.dataset.productId;
    const itemElement = document.getElementById(productId);
    const product = PRODUCTS.find((product) => product.id === productId);
    if (target.classList.contains('quantity-change')) {
      let quantityIncrement = parseInt(target.dataset.change);
      let newQuantity =
        parseInt(itemElement.querySelector('span').textContent.split('x ')[1]) +
        quantityIncrement;
      if (
        newQuantity > 0 &&
        newQuantity <=
          product.quantity +
            parseInt(
              itemElement.querySelector('span').textContent.split('x ')[1]
            )
      ) {
        itemElement.querySelector('span').textContent =
          itemElement.querySelector('span').textContent.split('x ')[0] +
          'x ' +
          newQuantity;
        product.quantity -= quantityIncrement;
      } else if (newQuantity <= 0) {
        itemElement.remove();
        product.quantity -= quantityIncrement;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (target.classList.contains('remove-item')) {
      let remQty = parseInt(
        itemElement.querySelector('span').textContent.split('x ')[1]
      );
      product.quantity += remQty;
      itemElement.remove();
    }
    calculatePrice();
  }
}
