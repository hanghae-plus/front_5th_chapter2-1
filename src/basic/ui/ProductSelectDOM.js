import { STYLES } from '../consts';

export const ProductSelectDOM = {
  _productSelect: null,

  init() {
    this._productSelect = document.createElement('select');
    this._productSelect.id = 'product-select';
    this._productSelect.className = STYLES.FORM.SELECT;
  },

  get() {
    return this._productSelect;
  },
};
