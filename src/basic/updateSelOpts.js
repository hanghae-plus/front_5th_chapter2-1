import { PRODUCTS } from './productList.constant.js';

export default function handleSelectProduct() {
  const select = document.getElementById('product-select');
  select.innerHTML = '';
  PRODUCTS.forEach(function (item) {
    let opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.price + '원';
    if (item.quantity === 0) opt.disabled = true;
    select.appendChild(opt);
  });
}
