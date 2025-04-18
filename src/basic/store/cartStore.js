export const cartStore = {
  selectedProduct: undefined,
  discountRate: 0,
  state: {
    itemQuantity: 0,
    totalPrice: 0,
    subTotalPrice: 0,
  },
  setSelectedProduct(selectedProduct) {
    this.selectedProduct = selectedProduct;
  },
  getSelectedProduct() {
    return this.selectedProduct;
  },
  setDiscountRate(discountRate) {
    this.discountRate = discountRate;
  },
  getDiscountRate() {
    return this.discountRate;
  },
  setState(state) {
    this.state = state;
  },
  getState() {
    return this.state;
  },
  resetCartState() {
    this.state = {
      itemQuantity: 0,
      totalPrice: 0,
      subTotalPrice: 0,
    };
  },
};
