import { PRODUCT_LIST } from '../consts/productList';
import { calculateCart } from '../logic';

const getCartItemElement = (cartItemId) => document.getElementById(cartItemId);

const getQuantityFromElement = (element) =>
  parseInt(element.querySelector('span').dataset.quantity, 10);

const updateQuantityText = (element, product, quantity) => {
  const span = element.querySelector('span');
  span.dataset.quantity = quantity;
  span.textContent = `${product.name} - ${product.value}원 x ${quantity}`;
};

const updateItemQuantity = (element, product, newQuantity, change) => {
  updateQuantityText(element, product, newQuantity);
  product.quantity -= change;
};

const removeItemAndAdjustStock = (element, product, change) => {
  element.remove();
  product.quantity -= change;
};

const alertOutOfStock = () => {
  alert('재고가 부족합니다.');
};

const handleQuantityChange = (target, product, element) => {
  const change = parseInt(target.dataset.change, 10);
  const currentQuantity = getQuantityFromElement(element);
  const newQuantity = currentQuantity + change;
  const maxAllowed = product.quantity + currentQuantity;

  if (newQuantity <= 0) {
    removeItemAndAdjustStock(element, product, change);
    return;
  }

  if (newQuantity > maxAllowed) {
    alertOutOfStock();
    return;
  }

  updateItemQuantity(element, product, newQuantity, change);
};

const handleRemoveItem = (product, element) => {
  const quantity = getQuantityFromElement(element);
  product.quantity += quantity;
  element.remove();
};

export const handleCartItemsContainerClick = (event) => {
  const target = event.target;

  if (
    !target.classList.contains('quantity-change')
    && !target.classList.contains('remove-item')
  )
    return;

  const cartItemId = target.dataset.productId;
  const element = getCartItemElement(cartItemId);
  const product = PRODUCT_LIST.find((p) => p.id === cartItemId);

  if (!element || !product) return;

  if (target.classList.contains('quantity-change')) {
    handleQuantityChange(target, product, element);
  } else if (target.classList.contains('remove-item')) {
    handleRemoveItem(product, element);
  }

  calculateCart();
};
