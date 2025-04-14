export const StockStatusContainerDOM = {
  _element: null,

  init() {
    this._element = document.createElement('div');
    this._element.id = 'stock-status';
    this._element.className = 'text-sm text-gray-500 mt-2';
  },

  get() {
    return this._element;
  },
};
