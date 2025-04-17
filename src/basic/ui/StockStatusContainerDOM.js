import { STYLES, DOM_IDS } from '../consts';

export const StockStatusContainerDOM = {
  _element: null,

  init() {
    this._element = document.createElement('div');
    this._element.id = DOM_IDS.PRODUCT.STOCK_STATUS;
    this._element.className = STYLES.TEXT.STOCK;
  },

  get() {
    return this._element;
  },
};
