import { STYLES, DOM_ATTRIBUTES, DOM_CLASSES } from '../consts';
import { createElement, formatPrice } from '../utils';

const createQuantityButton = ({ change, text, itemId }) => {
  return createElement('button', {
    className: `${STYLES.BUTTON.PRIMARY} ${STYLES.BUTTON.SMALL} ${DOM_CLASSES.BUTTON.QUANTITY_CHANGE}`,
    attributes: {
      [DOM_ATTRIBUTES.PRODUCT.ID]: itemId,
      [DOM_ATTRIBUTES.PRODUCT.CHANGE]: change,
    },
    textContent: text,
  });
};

const createRemoveButton = (itemId) => {
  return createElement('button', {
    className: `${STYLES.BUTTON.DANGER} ${DOM_CLASSES.BUTTON.REMOVE_ITEM}`,
    attributes: {
      [DOM_ATTRIBUTES.PRODUCT.ID]: itemId,
    },
    textContent: '삭제',
  });
};

const createQuantitySpan = (item) => {
  return createElement('span', {
    attributes: {
      [DOM_ATTRIBUTES.PRODUCT.VALUE]: item.value,
      [DOM_ATTRIBUTES.PRODUCT.QUANTITY]: 1,
    },
    textContent: `${item.name} - ${formatPrice(item.value)} x 1`,
  });
};

export const createCartItemElement = (item) => {
  const container = createElement('div', {
    id: item.id,
    className: STYLES.LAYOUT.FLEX,
  });
  container.appendChild(createQuantitySpan(item));

  const buttonContainer = createElement('div');
  [
    { change: -1, text: '-' },
    { change: 1, text: '+' },
  ].forEach((config) => {
    buttonContainer.appendChild(
      createQuantityButton({ ...config, itemId: item.id }),
    );
  });

  buttonContainer.appendChild(createRemoveButton(item.id));
  container.appendChild(buttonContainer);

  return container;
};
