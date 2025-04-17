import { createDomain } from "../../utils/common";

const initialState = {
  lastSelectedProduct: null,
};

export const actions = {
  setLastSelectedProduct: (state, payload) => ({
    ...state,
    lastSelectedProduct: payload,
  }),
};

export const uiStore = createDomain(initialState, actions);
