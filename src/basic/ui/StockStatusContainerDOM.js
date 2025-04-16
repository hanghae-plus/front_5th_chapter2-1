import { STYLES } from '../consts';

export const StockStatusContainerDOM = {
  _element: null,

  init() {
    this._element = document.createElement('div');
    this._element.id = 'stock-status';
    this._element.className = STYLES.TEXT.STOCK;
  },

  get() {
    return this._element;
  },
};
