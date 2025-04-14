import { PRODUCTS } from './productList.constant.js';

export default function renderProductSelectOptions() {
  const select = document.getElementById('product-select');
  select.innerHTML = '';

  PRODUCTS.forEach((product) => {
    const { id, name, price, quantity } = product;

    let option = document.createElement('option');

    option.value = id;
    option.textContent = name + ' - ' + price + '원';

    if (quantity === 0) option.disabled = true;

    select.appendChild(option);
  });
}
