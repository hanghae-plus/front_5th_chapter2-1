export const CART = {
  state: {
    lastSelectedProductId: null,
    totalAmount: 0,
    itemCount: 0,
  },

  getLastSelectedProductId: () => CART.state.lastSelectedProductId,
  getTotalAmount: () => CART.state.totalAmount,
  getItemCount: () => CART.state.itemCount,

  setLastSelectedProductId: (id) => {
    CART.state.lastSelectedProductId = id;
  },
  setTotalAmount: (value) => {
    CART.state.totalAmount = value;
  },
  setItemCount: (value) => {
    CART.state.itemCount = value;
  },

  resetCalculation: () => {
    CART.state.totalAmount = 0;
    CART.state.itemCount = 0;
  },
};
