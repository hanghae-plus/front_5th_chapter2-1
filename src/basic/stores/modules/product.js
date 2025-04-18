import { createStore } from "../../lib";
import { findProduct } from "../helpers";

const state = {
  productList: [
    { id: "p1", name: "상품1", price: 10000, stock: 50 },
    { id: "p2", name: "상품2", price: 20000, stock: 30 },
    { id: "p3", name: "상품3", price: 30000, stock: 20 },
    { id: "p4", name: "상품4", price: 15000, stock: 0 },
    { id: "p5", name: "상품5", price: 25000, stock: 10 },
  ],
  lastSelectedProduct: null,
};

const actions = {
  decreaseStock: (state, productId, amount = 1) => {
    const item = findProduct(state.productList, productId);

    if (!item || item.stock < amount) {
      return null;
    }

    item.stock -= amount;
    return { productList: [...state.productList] };
  },
  increaseStock: (state, productId, amount = 1) => {
    const item = findProduct(state.productList, productId);

    if (!item || amount < 1) {
      return null;
    }

    return {
      productList: state.productList.map((product) =>
        product.id === productId ? { ...product, stock: product.stock + amount } : product
      ),
    };
  },
  updateStock: (state, productId, newStock) => {
    const item = findProduct(state.productList, productId);

    if (!item || newStock < 0) {
      return null;
    }

    item.stock = newStock;
    return { productList: [...state.productList] };
  },
  setLastSelectedProduct: (state, productId) => {
    return { lastSelectedProduct: productId };
  },
  updateProduct: (state, productId, updatedProduct) => {
    const item = findProduct(state.productList, productId);

    if (!item) {
      return null;
    }

    return {
      productList: state.productList.map((product) =>
        product.id === productId ? { ...product, ...updatedProduct } : product
      ),
    };
  },
};

export const productStore = createStore(state, actions);
