import { PRODUCT_LIST } from '../consts';
import { ProductSelectDOM } from '../ui';
import { createElement } from '../utils/dom';

const createOptionElement = (item) => {
  return createElement('option', {
    attributes: {
      value: item.id,
      ...(item.quantity === 0 && { disabled: true }),
    },
    textContent: `${item.name} - ${item.value}원`,
  });
};

export const updateProductSelectOptions = () => {
  const productSelect = ProductSelectDOM.get();

  const fragment = document.createDocumentFragment();

  PRODUCT_LIST.forEach((item) => {
    fragment.appendChild(createOptionElement(item));
  });

  productSelect.replaceChildren(fragment);
};
