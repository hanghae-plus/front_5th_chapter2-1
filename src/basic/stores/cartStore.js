import { createStore } from '../@lib/createStore';
import { productStore } from './productStore';
import { ALERTS } from '../constants';
import { isOutOfStock } from '../utils';

/**
 * @typedef {import('./productStore').Product} Product
 * @typedef {Product & { quantity: number }} CartItem
 */

const initialState = {
  /**  @type {CartItem[]} **/
  cartItems: [],
};

export const cartStore = createStore(initialState, {
  addToCart: (state, product) => {
    if (isOutOfStock(product.stock)) {
      alert(ALERTS.OUT_OF_STOCK);
      return state;
    }

    const existingItem = state.cartItems.find((item) => item.id === product.id);

    let updatedCartItems;
    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;
      if (product.stock < newQuantity) {
        alert(ALERTS.OUT_OF_STOCK);
        return state;
      }
      updatedCartItems = state.cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: newQuantity } : item,
      );
    } else {
      updatedCartItems = [...state.cartItems, { ...product, quantity: 1 }];
    }

    productStore.actions.decreaseStock(product.id);
    productStore.actions.setLastSelectedProductId(product.id);

    return { cartItems: updatedCartItems };
  },
  changeCartItemQuantity: (state, product, quantityChange) => {
    const existingItem = state.cartItems.find((item) => item.id === product.id);
    if (!existingItem) return state;

    const newQuantity = existingItem.quantity + quantityChange;
    if (newQuantity < 0) return state;

    if (quantityChange > 0 && isOutOfStock(product.stock)) {
      alert(ALERTS.OUT_OF_STOCK);
      return state;
    }

    quantityChange > 0
      ? productStore.actions.decreaseStock(product.id)
      : productStore.actions.increaseStock(product.id);

    const updatedCartItems = state.cartItems
      .map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item))
      .filter((item) => item.quantity > 0);

    return { cartItems: updatedCartItems };
  },
  removeFromCart: (state, productId) => {
    const existingItem = state.cartItems.find((item) => item.id === productId);
    if (!existingItem) return state;

    const updatedCartItems = state.cartItems.filter((item) => item.id !== productId);

    productStore.actions.increaseStock(productId, existingItem.quantity);

    return { cartItems: updatedCartItems };
  },
});
