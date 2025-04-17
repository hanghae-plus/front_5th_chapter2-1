import { PRODUCT } from '../store';
import { calculateCart } from './calculation';

const isCartActionButton = (target) =>
  target.classList.contains('quantity-change') || target.classList.contains('remove-item');

const isValidQuantity = ({ newQuantity, product, currentQuantity }) =>
  newQuantity > 0 && newQuantity <= product.quantity + currentQuantity;

const getCurrentQuantity = (element) => parseInt(element.querySelector('span').textContent.split('x ')[1]);

const updateElementQuantity = (element, newQuantity) => {
  const quantityElement = element.querySelector('span');
  const quantityPrefix = `${quantityElement.textContent.split('x ')[0]}x `;

  quantityElement.textContent = `${quantityPrefix}${newQuantity}`;
};

const changeQuantity = ({ target, targetElement, targetProduct, productId, currentQuantity }) => {
  const changingQuantity = parseInt(target.dataset.change);
  const newQuantity = currentQuantity + changingQuantity;

  if (
    isValidQuantity({
      newQuantity,
      product: targetProduct,
      currentQuantity,
    })
  ) {
    updateElementQuantity(targetElement, newQuantity);

    PRODUCT.updateQuantity(productId, -changingQuantity);
  } else if (newQuantity <= 0) {
    targetElement.remove();

    PRODUCT.updateQuantity(productId, -changingQuantity);
  } else {
    alert('재고가 부족합니다.');
  }
};

const removeItem = ({ targetElement, productId, currentQuantity }) => {
  PRODUCT.updateQuantity(productId, currentQuantity);

  targetElement.remove();
};

export const handleCartItem = (event) => {
  const { target } = event;

  if (!isCartActionButton(target)) return;

  const productId = target.dataset.productId;
  const targetProductElement = document.getElementById(productId);
  const targetProduct = PRODUCT.getById(productId);
  const currentQuantity = getCurrentQuantity(targetProductElement);

  const isChangeQuantity = target.classList.contains('quantity-change');
  const isRemoveItem = target.classList.contains('remove-item');

  if (isChangeQuantity) {
    changeQuantity({
      target,
      targetElement: targetProductElement,
      targetProduct,
      productId,
      currentQuantity,
    });
  }

  if (isRemoveItem) {
    removeItem({
      targetElement: targetProductElement,
      productId,
      currentQuantity,
    });
  }

  calculateCart();
};
