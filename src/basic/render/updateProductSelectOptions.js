import { PRODUCT_LIST } from '../consts';
import { ProductSelectDOM } from '../ui';

export const updateProductSelectOptions = () => {
  const productSelect = ProductSelectDOM.get();
  const newSelectOptions = PRODUCT_LIST.reduce((newOptions, item) => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = `${item.name} - ${item.value}원`;
    if (item.quantity === 0) option.disabled = true;
    newOptions.appendChild(option);
    return newOptions;
  }, document.createDocumentFragment());

  productSelect.replaceChildren(newSelectOptions);
};
