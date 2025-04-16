import { products } from "../data/products";

export const renderProductOptions = () => {

  return products.map((product) => {
    const disabledAttribute = product.q === 0 ? 'disabled' : '';
    
    return `<option value="${product.id}" ${disabledAttribute}>
              ${product.name} - ${product.val}원
            </option>`;
  }).join('');

}