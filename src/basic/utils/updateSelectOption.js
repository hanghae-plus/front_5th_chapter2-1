import { PRODUCT_LIST } from '../constant';

export const updateSelectOption = () => {
  const select = document.getElementById('product-select');
  select.innerHTML = '';
  PRODUCT_LIST.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name + ' - ' + item.price + '원';
    if (item.quantity === 0) {
      option.disabled = true;
    }
    select.appendChild(option);
  });
};
