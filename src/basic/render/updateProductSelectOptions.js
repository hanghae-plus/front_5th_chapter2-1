import { PRODUCT_LIST } from '../consts';
import { ProductSelectDOM } from '../ui';

const createOptionElement = (item) => {
  const option = document.createElement('option');
  option.value = item.id;
  option.textContent = `${item.name} - ${item.value}원`;
  if (item.quantity === 0) option.disabled = true;
  return option;
};

export const updateProductSelectOptions = () => {
  const productSelect = ProductSelectDOM.get();

  const newSelectOptions = PRODUCT_LIST.reduce((fragment, item) => {
    fragment.appendChild(createOptionElement(item));
    return fragment;
  }, document.createDocumentFragment());

  productSelect.replaceChildren(newSelectOptions);
};
