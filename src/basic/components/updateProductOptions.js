import { createElement } from '../utils/index.js';

export const updateProductOptions = (select, products) => {
  select.innerHTML = '';

  products.forEach(item => {
    const option = createElement('option', {
      value: item.id,
      text: `${item.name} - ${item.price}원`,
    });

    if (item.quantity === 0) {
      option.disabled = true;
    }

    select.appendChild(option);
  });
};
