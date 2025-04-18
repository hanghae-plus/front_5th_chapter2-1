import { createStore } from "../../lib";
import { findProduct, removeProduct } from "../helpers";

const state = {
  cartItemList: [],
};

const actions = {
  addItem: (state, product, quantity = 1) => {
    const item = findProduct(state.cartItemList, product.id);

    if (item) {
      item.quantity += quantity;
    } else {
      state.cartItemList.push({ ...product, quantity });
    }

    return { cartItemList: [...state.cartItemList] };
  },
  updateItemQuantity: (state, productId, amount) => {
    const item = findProduct(state.cartItemList, productId);

    if (!item) {
      return { cartItemList: [...state.cartItemList] };
    }

    item.quantity = amount;

    const updatedItemList =
      item.quantity <= 0 ? removeProduct(state.cartItemList, productId) : [...state.cartItemList];

    return { cartItemList: updatedItemList };
  },
  removeItem: (state, productId) => {
    return {
      cartItemList: removeProduct(state.cartItemList, productId),
    };
  },
};

export const cartStore = createStore(state, actions);
