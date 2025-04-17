import { Product } from '../types/product';

export const updateSelectBoxOptions = (
  productSelectBox: HTMLSelectElement,
  products: Product[],
): void => {
  productSelectBox.innerHTML = '';
  products.forEach(({ id, name, price, quantity }) => {
    const $option = document.createElement('option');

    $option.value = id;
    $option.textContent = `${name} - ${price}원`;
    $option.disabled = quantity === 0;

    productSelectBox.appendChild($option);
  });
};
