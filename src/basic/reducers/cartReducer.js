import { PRODUCT_INVENTORY } from "../lib/configs/products";
import {
  generateCartInvoice,
  getQuantityChangeOfCartItem,
  isProductSoldOut,
  isProductStockExists,
  removeItemFromAddedItems,
  updateAddedItems,
} from "../lib/utils/cartUtils";

const actions = {
  addToCart: "ADD_TO_CART",
  changeQuantity: "CHANGE_QUANTITY",
  removeFromCart: "REMOVE_FROM_CART",
};

export function cartReducer(state, action) {
  switch (action.type) {
    case actions.addToCart: {
      const itemToAdd = PRODUCT_INVENTORY.find((p) => {
        return p.id === action.payload.value;
      });

      if (!isProductStockExists(itemToAdd)) {
        return { ...state, error: "재고가 없습니다." };
      }

      const itemInCart = state.addedItems.find((item) => item.id === itemToAdd.id);

      const newQuantity = itemInCart ? itemInCart.quantity + 1 : 1;

      if (isProductSoldOut(newQuantity, itemToAdd.stock)) {
        return { ...state, error: "재고가 부족합니다." };
      }

      itemToAdd.quantity = newQuantity;

      const itemsAfterAdd = updateAddedItems(state.addedItems, itemToAdd);
      const newCartTotal = generateCartInvoice(itemsAfterAdd);

      return {
        ...state,
        addedItems: itemsAfterAdd,
        lastSelected: itemToAdd.id,
        error: null,
        ...newCartTotal,
      };
    }

    case actions.changeQuantity: {
      const selectedElem = action.payload;
      const selectedId = selectedElem.dataset.productId;

      const selectedItem = state.addedItems.find((item) => item.id === selectedId);
      const currentQuantity = selectedItem.quantity;
      const quantifyChange = getQuantityChangeOfCartItem(selectedElem);
      const newQuantity = currentQuantity + quantifyChange;

      if (isProductSoldOut(newQuantity, selectedItem.stock)) {
        return { ...state, error: "재고가 부족합니다." };
      }

      selectedItem.quantity = newQuantity;

      const updatedItems =
        newQuantity > 0
          ? updateAddedItems(state.addedItems, selectedItem)
          : removeItemFromAddedItems(state.addedItems, selectedId);

      const newCartTotal = generateCartInvoice(updatedItems);

      return {
        ...state,
        addedItems: updatedItems,
        ...newCartTotal,
      };
    }

    case actions.removeFromCart: {
      const selectedElem = action.payload;
      const selectedId = selectedElem.dataset.productId;

      const itemsAfterRemove = removeItemFromAddedItems(state.addedItems, selectedId);
      const newCartTotal = generateCartInvoice(itemsAfterRemove);

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
