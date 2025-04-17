import { cartItemTemplate } from "../views/templates.js";
import { getQuantityFromElement } from "./calculateCart.js";

const INITIAL_QUANTITY = 1;
const MIN_QUANTITY = 1;

export function updateExistingCartItem(itemEl, product) {
  const currentQuantity = getQuantityFromElement(itemEl);
  if (!hasSufficientStock(product, INITIAL_QUANTITY)) {
    alert("재고가 부족합니다.");
    return;
  }
  const newQuantity = currentQuantity + INITIAL_QUANTITY;
  updateQuantityLabel(itemEl, product, newQuantity);
  product.units -= INITIAL_QUANTITY;
}

function hasSufficientStock(product, requiredQuantity) {
  return product.units >= requiredQuantity;
}

function updateQuantityLabel(itemEl, product, quantity) {
  itemEl.querySelector("span").textContent =
    `${product.name} - ${product.price}원 x ${quantity}`;
}

export function createNewCartItem(product) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = cartItemTemplate(product, INITIAL_QUANTITY);
  product.units -= INITIAL_QUANTITY;
  return wrapper.firstElementChild;
}

export function handleQuantityChange(product, itemEl, currentQuantity, change) {
  const newQuantity = currentQuantity + change;

  if (newQuantity < MIN_QUANTITY) {
    handleRemoveItem(product, itemEl, currentQuantity);
  } else if (change > 0 && !hasSufficientStock(product, change)) {
    alert("재고가 부족합니다.");
  } else {
    updateQuantityLabel(itemEl, product, newQuantity);
    product.units -= change;
  }
}

export function handleRemoveItem(product, itemEl, currentQuantity) {
  product.units += currentQuantity;
  itemEl.remove();
}
