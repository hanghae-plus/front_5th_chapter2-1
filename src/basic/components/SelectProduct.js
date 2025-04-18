import { createElement } from '../utils/elementUtils';
import { productStore } from '../store';

export const selectProduct = {
  $element: null,
  render() {
    const selectProductElement = createElement('select', {
      id: 'product-select',
      className: 'border rounded p-2 mr-2',
    });

    this.$element = selectProductElement;
    this.updateOptionElement();

    return this.$element;
  },
  getElement() {
    return this.$element;
  },
  updateOptionElement() {
    this.$element.innerHTML = '';

    const products = productStore.getProducts();

    products.forEach((product) => {
      const optionElement = createElement('option', {
        value: product.id,
        textContent: `${product.name} - ${product.price}원`,
      });

      if (product.quantity === 0) {
        optionElement.disabled = true;
      }

      this.$element.appendChild(optionElement);
    });
  },
};
