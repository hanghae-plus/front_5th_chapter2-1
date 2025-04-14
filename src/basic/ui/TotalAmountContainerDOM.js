export const TotalAmountContainerDOM = {
  _totalAmountContainer: null,
  init() {
    this._totalAmountContainer = document.createElement('div');
    this._totalAmountContainer.id = 'cart-total';
    this._totalAmountContainer.className = 'text-xl font-bold my-4';
  },
  get() {
    return this._totalAmountContainer;
  },
};
