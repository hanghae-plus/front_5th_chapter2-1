import { handleAddButtonClick } from '../handlers/handleAddButtonClick.js';

export const AddButtonDOM = {
  _element: null,

  init({
    productSelect,
    cartItemsContainer,
    totalAmountContainer,
    stockStatusContainer,
  }) {
    this._element = document.createElement('button');
    this._element.id = 'add-to-cart';
    this._element.className = 'bg-blue-500 text-white px-4 py-2 rounded';
    this._element.textContent = '추가';

    this._element.addEventListener('click', () => {
      handleAddButtonClick(
        productSelect,
        cartItemsContainer,
        totalAmountContainer,
        stockStatusContainer,
      );
    });
  },

  get() {
    return this._element;
  },
};
