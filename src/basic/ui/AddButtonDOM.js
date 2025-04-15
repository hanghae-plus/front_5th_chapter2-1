import { handleAddButtonClick } from '../handlers/handleAddButtonClick.js';
import { DOM_IDS, STYLES } from '../consts';
import { createElement } from '../utils';

export const AddButtonDOM = {
  _element: null,

  init() {
    this._element = createElement('button', {
      id: DOM_IDS.PRODUCT.ADD_BUTTON,
      className: STYLES.BUTTON.PRIMARY,
      textContent: '추가',
    });

    this._element.addEventListener('click', () => {
      handleAddButtonClick();
    });
  },

  get() {
    return this._element;
  },
};
