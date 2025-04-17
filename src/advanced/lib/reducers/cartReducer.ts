import { PRODUCT_INVENTORY } from "@advanced/lib/configs/product";
import type { CartItem, CartState, Product } from "@advanced/lib/types";
import {
  generateCartInvoice,
  isProductSoldOut,
  isProductStockExists,
  removeItemFromAddedItems,
  updateAddedItems,
} from "@advanced/lib/utils";

const CART_ACTIONS = {
  addToCart: "ADD_TO_CART",
  changeQuantity: "CHANGE_QUANTITY",
  removeFromCart: "REMOVE_FROM_CART",
} as const;

export type CartAction =
  | { type: typeof CART_ACTIONS.addToCart; payload: Product }
  | { type: typeof CART_ACTIONS.changeQuantity; payload: CartItem & { change: number } }
  | { type: typeof CART_ACTIONS.removeFromCart; payload: CartItem };

export function cartReducer(state: CartState, action: CartAction) {
  switch (action.type) {
    case CART_ACTIONS.addToCart: {
      const { id } = action.payload;

      const productToAdd = PRODUCT_INVENTORY.find((product) => product.id === id);

      if (!productToAdd) {
        return { ...state, error: "상품을 찾을 수 없습니다." };
      }

      if (!isProductStockExists(productToAdd)) {
        return { ...state, error: "재고가 없습니다." };
      }

      const itemInCart = state.addedItems.find((item) => item.id === productToAdd.id);

      const newQuantity = itemInCart ? itemInCart.quantity + 1 : 1;

      if (isProductSoldOut(newQuantity, productToAdd.stock)) {
        return { ...state, error: "재고가 부족합니다." };
      }

      const itemToAdd = { ...productToAdd, quantity: newQuantity };

      const itemsAfterAdd = updateAddedItems(state.addedItems, itemToAdd);
      const newCartTotal = generateCartInvoice(itemsAfterAdd);

      return {
        ...state,
        addedItems: itemsAfterAdd,
        lastSelected: productToAdd.id,
        error: null,
        ...newCartTotal,
      };
    }

    case CART_ACTIONS.changeQuantity: {
      const { change, ...cartItem } = action.payload;
      const { quantity, stock } = cartItem;

      const newQuantity = quantity + change;

      if (isProductSoldOut(newQuantity, stock)) {
        return { ...state, error: "재고가 부족합니다." };
      }

      const updatedItem: CartItem = { ...cartItem, quantity: newQuantity };

      const updatedItems =
        newQuantity > 0
          ? updateAddedItems(state.addedItems, updatedItem)
          : removeItemFromAddedItems(state.addedItems, cartItem.id);

      const newCartTotal = generateCartInvoice(updatedItems);

      return {
        ...state,
        addedItems: updatedItems,
        error: null,
        ...newCartTotal,
      };
    }

    case CART_ACTIONS.removeFromCart: {
      const { id } = action.payload;

      const itemsAfterRemove = removeItemFromAddedItems(state.addedItems, id);
      const newCartTotal = generateCartInvoice(itemsAfterRemove);

      return {
        ...state,
        addedItems: itemsAfterRemove,
        error: null,
        ...newCartTotal,
      };
    }

    default:
      return state;
  }
}
