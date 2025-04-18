import { PRODUCT_SELECT_ID } from '../constants';

const ProductSelector = {
  init: () => {},
  render: ({ products }) => {
    return `
        <select id="${PRODUCT_SELECT_ID}" class="border rounded p-2 mr-2">
          ${products
            .map(
              item =>
                `<option value="${item.id}" ${item.quantity === 0 ? 'disabled' : ''}>${item.name} - ${item.price}원</option>`
            )
            .join('')}
        </select>
    `;
  },
};

export default ProductSelector;
