import { PRODUCT_LIST } from '../consts/productList';
import { calculateCart } from '../logic';
import { SelectedProductStore } from '../store/stores';
import { CartItemsContainerDOM, ProductSelectDOM } from '../ui';
import { DOM_ATTRIBUTES, DOM_CLASSES, STYLES } from '../consts';

const getCartItemElement = (cartItemId) => document.getElementById(cartItemId);

const getQuantityFromElement = (element) =>
  parseInt(element.querySelector('span').dataset.quantity, 10);

const updateQuantityText = (element, product, quantity) => {
  const span = element.querySelector('span');
  span.dataset.quantity = quantity;
  span.textContent = `${product.name} - ${product.value}원 x ${quantity}`;
};

const createCartItemElement = (item) => {
  const newItem = document.createElement('div');
  newItem.id = item.id;
  newItem.className = STYLES.LAYOUT.FLEX;

  const quantityButtons = [
    { change: -1, text: '-' },
    { change: 1, text: '+' },
  ]
    .map(
      ({ change, text }) => `
    <button 
      class="${STYLES.BUTTON.PRIMARY} ${STYLES.BUTTON.SMALL} ${DOM_CLASSES.BUTTON.QUANTITY_CHANGE}" 
      ${DOM_ATTRIBUTES.PRODUCT.ID}="${item.id}" 
      ${DOM_ATTRIBUTES.PRODUCT.CHANGE}="${change}"
    >${text}</button>
  `,
    )
    .join('');

  newItem.innerHTML = `
    <span ${DOM_ATTRIBUTES.PRODUCT.VALUE}="${item.value}" ${DOM_ATTRIBUTES.PRODUCT.QUANTITY}="1">
      ${item.name} - ${item.value}원 x 1
    </span>
    <div>
      ${quantityButtons}
      <button 
        class="${STYLES.BUTTON.DANGER} ${DOM_CLASSES.BUTTON.REMOVE_ITEM}" 
        ${DOM_ATTRIBUTES.PRODUCT.ID}="${item.id}"
      >삭제</button>
    </div>
  `;
  return newItem;
};

export const handleAddButtonClick = () => {
  const cartItemsContainer = CartItemsContainerDOM.get();
  const productSelect = ProductSelectDOM.get();

  const selectedProductId = productSelect.value;
  const itemToAdd = PRODUCT_LIST.find(
    (product) => product.id === selectedProductId,
  );

  if (!itemToAdd || itemToAdd.quantity <= 0) return;

  const item = getCartItemElement(itemToAdd.id);

  if (item) {
    const newQuantity = getQuantityFromElement(item) + 1;

    if (newQuantity <= itemToAdd.quantity) {
      updateQuantityText(item, itemToAdd, newQuantity);
      itemToAdd.quantity--;
    } else {
      alertOutOfStock();
      return;
    }
  } else {
    const newItem = createCartItemElement(itemToAdd);
    cartItemsContainer.appendChild(newItem);
    itemToAdd.quantity--;
  }

  calculateCart();
  SelectedProductStore.set('selectedProduct', selectedProductId);
};
