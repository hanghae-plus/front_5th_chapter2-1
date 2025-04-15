import { PRODUCT_INVENTORY } from "../lib/configs/products";
import {
  calculateCartTotal,
  getQuantityChangeOfCartItem,
  isProductSoldOut,
  isProductStockExists,
  removeItemFromAddedItems,
  updateAddedItems,
} from "../lib/utils/cartUtils";

const actions = {
  ADD_TO_CART: "ADD_TO_CART",
  CHANGE_QUANTITY: "CHANGE_QUANTITY",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
};

export function cartReducer(state, action) {
  switch (action.type) {
    case actions.ADD_TO_CART: {
      const itemToAdd = PRODUCT_INVENTORY.find((p) => {
        return p.id === action.payload.value;
      });

      if (!isProductStockExists(itemToAdd)) {
        return { ...state, error: "재고가 없습니다." };
      }

      const itemInCart = state.addedItems.find(
        (item) => item.id === itemToAdd.id,
      );

      const newQuantity = itemInCart ? itemInCart.quantity + 1 : 1;

      if (isProductSoldOut(newQuantity, itemToAdd.stock)) {
        return { ...state, error: "재고가 부족합니다." };
      }

      itemToAdd.quantity = newQuantity;

      const itemsAfterAdd = updateAddedItems(state.addedItems, itemToAdd);
      const newCartTotal = calculateCartTotal(itemsAfterAdd);

      return {
        ...state,
        addedItems: itemsAfterAdd,
        lastSelected: itemToAdd.id,
        error: null,
        ...newCartTotal,
      };
    }

    case actions.CHANGE_QUANTITY: {
      const selectedElement = action.payload;
      const selectedId = selectedElement.dataset.productId;

      const selectedItem = state.addedItems.find(
        (item) => item.id === selectedId,
      );
      const currentQuantity = selectedItem.quantity;
      const quantifyChange = getQuantityChangeOfCartItem(selectedElement);
      const newQuantity = currentQuantity + quantifyChange;

      if (isProductSoldOut(newQuantity, selectedItem.stock)) {
        console.log("재고가 부족합니다.");
        return { ...state, error: "재고가 부족합니다." };
      }

      selectedItem.quantity = newQuantity;

      const updatedItems =
        newQuantity > 0
          ? updateAddedItems(state.addedItems, selectedItem)
          : removeItemFromAddedItems(state.addedItems, selectedId);

      const newCartTotal = calculateCartTotal(updatedItems);

      return {
        ...state,
        addedItems: updatedItems,
        ...newCartTotal,
      };
    }

    case actions.REMOVE_FROM_CART: {
      const selectedElement = action.payload;
      const selectedId = selectedElement.dataset.productId;

      const itemsAfterRemove = removeItemFromAddedItems(
        state.addedItems,
        selectedId,
      );
      const newCartTotal = calculateCartTotal(itemsAfterRemove);

      return {
        ...state,
        addedItems: itemsAfterRemove,
        ...newCartTotal,
      };
    }

    default:
      return state;
  }
}
