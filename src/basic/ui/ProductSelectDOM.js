import { STYLES, DOM_IDS } from '../consts';

export const ProductSelectDOM = {
  _productSelect: null,

  init() {
    this._productSelect = document.createElement('select');
    this._productSelect.id = DOM_IDS.PRODUCT.SELECT;
    this._productSelect.className = STYLES.FORM.SELECT;
  },

  get() {
    return this._productSelect;
  },
};
