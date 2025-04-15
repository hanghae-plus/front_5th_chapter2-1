import { STYLES, DOM_ATTRIBUTES, DOM_CLASSES } from '../consts';

export const cartItemElement = (item) => {
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
