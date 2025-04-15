import { handleAddButtonClick } from '../handlers/handleAddButtonClick.js';
import { DOM_IDS, STYLES } from '../consts';

export const AddButtonDOM = {
  _element: null,

  init() {
    this._element = document.createElement('button');
    this._element.id = DOM_IDS.PRODUCT.ADD_BUTTON;
    this._element.className = STYLES.BUTTON.PRIMARY;
    this._element.textContent = '추가';

    this._element.addEventListener('click', () => {
      handleAddButtonClick();
    });
  },

  get() {
    return this._element;
  },
};
