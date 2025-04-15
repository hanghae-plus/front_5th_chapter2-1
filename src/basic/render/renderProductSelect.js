import { PRODUCT_LIST } from '../consts';
import { ProductSelectDOM } from '../ui';
import { createElement, formatPrice } from '../utils';

const createOptionText = (item) => {
  return `${item.name} - ${formatPrice(item.value)}`;
};

const createOptionElement = (item) => {
  return createElement('option', {
    attributes: {
      value: item.id,
      ...(item.quantity === 0 && { disabled: true }),
    },
    textContent: createOptionText(item),
  });
};

export const renderProductSelect = () => {
  const productSelect = ProductSelectDOM.get();

  const fragment = document.createDocumentFragment();

  PRODUCT_LIST.forEach((item) => {
    fragment.appendChild(createOptionElement(item));
  });

  productSelect.replaceChildren(fragment);
};
