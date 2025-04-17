import { PRODUCT_LIST } from './ProductList.constant.js';

export default function renderProductSelect() {
  const select = document.createElement('select');
  select.id = 'renderProduct-select';
  select.className = 'border rounded p-2 mr-2';

  select.innerHTML = '';

  PRODUCT_LIST.forEach((product) => {
    const { id, name, price, quantity } = product;

    let option = document.createElement('option');

    option.value = id;
    option.textContent = name + ' - ' + price + '원';

    if (quantity === 0) option.disabled = true;

    select.appendChild(option);
  });

  return select;
}
