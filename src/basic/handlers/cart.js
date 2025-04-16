import { PRODUCT } from '../store';
import { calculateCart } from './calculation';

const isCartActionButton = (target) =>
  target.classList.contains('quantity-change') || target.classList.contains('remove-item');

const isValidQuantity = ({ newQuantity, product, currentQuantity }) =>
  newQuantity > 0 && newQuantity <= product.quantity + currentQuantity;

const getCurrentQuantity = (element) => parseInt(element.querySelector('span').textContent.split('x ')[1]);

const updateElementQuantity = (element, newQuantity) => {
  const spanElement = element.querySelector('span');
  const textBeforeQuantity = spanElement.textContent.split('x ')[0];

  spanElement.textContent = `${textBeforeQuantity}x ${newQuantity}`;
};

const changeQuantity = ({ target, targetElement, targetProduct, productId, currentQuantity }) => {
  const quantityChange = parseInt(target.dataset.change);
  const newQuantity = currentQuantity + quantityChange;

  if (
    isValidQuantity({
      newQuantity,
      product: targetProduct,
      currentQuantity,
    })
  ) {
    updateElementQuantity(targetElement, newQuantity);

    PRODUCT.updateQuantity(productId, -quantityChange);
  } else if (newQuantity <= 0) {
    targetElement.remove();

    PRODUCT.updateQuantity(productId, -quantityChange);
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
  const targetElementProduct = document.getElementById(productId);
  const targetProduct = PRODUCT.getById(productId);
  const currentQuantity = getCurrentQuantity(targetElementProduct);

  if (target.classList.contains('quantity-change')) {
    changeQuantity({
      target,
      targetElement: targetElementProduct,
      targetProduct,
      productId,
      currentQuantity,
    });
  } else if (target.classList.contains('remove-item')) {
    removeItem({
      targetElement: targetElementProduct,
      productId,
      currentQuantity,
    });
  }

  calculateCart();
};
