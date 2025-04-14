import { createStore } from './createStore.js';

export const CartStore = createStore({
  itemCount: 0,
  subTotal: 0,
  totalAmount: 0,
});

export const SelectedProductStore = createStore({
  selectedProduct: null,
});
