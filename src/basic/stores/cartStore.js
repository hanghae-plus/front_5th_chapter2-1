import { cartReducer } from "../reducers/cartReducer";
import { createStore } from "./createStore";

const initialCartState = {
  items: [],
  lastSelected: 0,
  totalPrice: 0,
  totalQuantity: 0,
  originalTotalPrice: 0,
};

export const cartStore = createStore(cartReducer, initialCartState);
