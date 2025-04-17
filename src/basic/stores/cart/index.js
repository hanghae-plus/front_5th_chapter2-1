import { createDomain } from "../../utils/common/createDomain";

const initialState = {
  cartItems: [],
};

export const actions = {
  setCartItems: (state, payload) => ({
    ...state,
    cartItems: payload,
  }),

  resetCart: (state) => ({
    ...state,
    cartItems: [],
  }),
};

export const cartStore = createDomain(initialState, actions);
