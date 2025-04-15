import { cartReducer } from "../reducers/cartReducer";
import { createStore } from "./createStore";

const initialCartState = {
  addedItems: [],
  lastSelected: 0,
  totalAmount: 0,
  totalQuantity: 0,
  totalAmountBeforeDiscount: 0,
  discountRate: 0,
  bonusPoints: 0,
};

export const cartStore = createStore(cartReducer, initialCartState);
