import { store } from '../store/store.js';

// 상품리스트 select box에 보여주기
export function showSelectList () {
  const products = store.products;
  
  const selectElement = document.getElementById('product-select');

  selectElement.innerHTML = '';
  products.forEach(function (product) {
    let option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name + ' - ' + product.val + '원';
    if (product.q === 0) option.disabled = true;
    selectElement.appendChild(option);
  });
}