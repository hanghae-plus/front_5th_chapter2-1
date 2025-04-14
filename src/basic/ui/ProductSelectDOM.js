export const ProductSelectDOM = {
  _productSelect: null,

  init() {
    this._productSelect = document.createElement('select');
    this._productSelect.id = 'product-select';
    this._productSelect.className = 'border rounded p-2 mr-2';
  },
  get() {
    return this._productSelect;
  },
};
