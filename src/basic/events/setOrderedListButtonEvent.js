import { ALERT_MESSAGE } from '../constant/alertMessage';
import { calculateCart } from '../service/calculateCart';
import { globalStore } from '../store/globalStore';

const { getState } = globalStore;
const { prodList } = getState();

const handleCartItemQuantity = (newQuantity, itemToAdd, itemElem, quantityChange) => {
  if (
    newQuantity > 0 &&
    newQuantity <= itemToAdd.quantity + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
  ) {
    itemElem.querySelector('span').textContent =
      itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQuantity;
    itemToAdd.quantity -= quantityChange;
    return;
  }
  if (newQuantity <= 0) {
    itemElem.remove();
    itemToAdd.quantity -= quantityChange;
    return;
  }
  alert(ALERT_MESSAGE.OUT_OF_STOCK);
};

const handleRemoveItem = (itemToAdd, itemElem) => {
  const removeQuantity = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
  itemToAdd.quantity += removeQuantity;
  itemElem.remove();
};

export const setOrderedListButtonEvent = () => {
  const orderedList = document.getElementById('cart-items');

  if (!orderedList) return;

  orderedList.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.classList.contains('quantity-change') && !target.classList.contains('remove-item')) return;

    const productId = target.dataset.productId;
    const itemElem = document.getElementById(productId);
    const itemToAdd = prodList.find((prod) => prod.id === productId);

    if (target.classList.contains('quantity-change')) {
      const quantityChange = parseInt(target.dataset.change);
      const newQuantity = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + quantityChange;
      // 함수 리팩토링
      handleCartItemQuantity(newQuantity, itemToAdd, itemElem, quantityChange);
    }
    if (target.classList.contains('remove-item')) {
      handleRemoveItem(itemToAdd, itemElem);
    }
    calculateCart();
  });
};
