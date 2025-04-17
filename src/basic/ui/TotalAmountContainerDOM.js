import { STYLES, DOM_IDS } from '../consts';

export const TotalAmountContainerDOM = {
  _totalAmountContainer: null,

  init() {
    this._totalAmountContainer = document.createElement('div');
    this._totalAmountContainer.id = DOM_IDS.CART.TOTAL;
    this._totalAmountContainer.className = STYLES.TEXT.TOTAL;
  },

  get() {
    return this._totalAmountContainer;
  },
};
