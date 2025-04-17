import { PRODUCT_LIST } from "../../constants";
import { createDomain } from "../../utils/common";

const initialState = {
  productList: PRODUCT_LIST,
};

export const actions = {
  setProductList: (state, payload) => ({
    ...state,
    productList: payload,
  }),
};

export const productStore = createDomain(initialState, actions);
