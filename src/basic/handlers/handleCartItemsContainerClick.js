import { PRODUCT_LIST } from '../consts/productList';
import { calculateCart } from '../logic';

const getCartItemElement = (cartItemId) => document.getElementById(cartItemId);

const getQuantityFromElement = (el) =>
  parseInt(el.querySelector('span').dataset.quantity, 10);

const updateQuantityText = (el, product, quantity) => {
  const span = el.querySelector('span');
  span.dataset.quantity = quantity;
  span.textContent = `${product.name} - ${product.value}원 x ${quantity}`;
};

const updateItemQuantity = (el, product, newQuantity, change) => {
  updateQuantityText(el, product, newQuantity);
  product.quantity -= change;
};

const removeItemAndAdjustStock = (el, product, change) => {
  el.remove();
  product.quantity -= change;
};

const alertOutOfStock = () => {
  alert('재고가 부족합니다.');
};

const handleQuantityChange = (target, product, el) => {
  const change = parseInt(target.dataset.change, 10);
  const currentQuantity = getQuantityFromElement(el);
  const newQuantity = currentQuantity + change;
  const maxAllowed = product.quantity + currentQuantity;

  if (newQuantity <= 0) {
    removeItemAndAdjustStock(el, product, change);
    return;
  }

  if (newQuantity > maxAllowed) {
    alertOutOfStock();
    return;
  }

  updateItemQuantity(el, product, newQuantity, change);
};

const handleRemoveItem = (product, el) => {
  const quantity = getQuantityFromElement(el);
  product.quantity += quantity;
  el.remove();
};

export const handleCartItemsContainerClick = (event) => {
  const target = event.target;

  if (
    !target.classList.contains('quantity-change')
    && !target.classList.contains('remove-item')
  )
    return;

  const cartItemId = target.dataset.productId;
  const el = getCartItemElement(cartItemId);
  const product = PRODUCT_LIST.find((p) => p.id === cartItemId);

  if (!el || !product) return;

  if (target.classList.contains('quantity-change')) {
    handleQuantityChange(target, product, el);
  } else if (target.classList.contains('remove-item')) {
    handleRemoveItem(product, el);
  }

  calculateCart();
};
