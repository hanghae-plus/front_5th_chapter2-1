import { renderNewCartItem } from "../components/render";
import { PRODUCT_LIST } from "../lib/configs/products";
import {
  calculateCartTotal,
  getNameOfItem,
  getQuantityOfItem,
  isProductOutOfSold,
} from "../lib/utils/cartUtils";

const actions = {
  ADD_ITEM: "ADD_ITEM",
  CHANGE_ITEM_QUANTITY: "CHANGE_ITEM_QUANTITY",
  REMOVE_ITEM: "REMOVE_ITEM",
};

export function cartReducer(state, action) {
  switch (action.type) {
    case actions.ADD_ITEM: {
      let itemToAdd = PRODUCT_LIST.find((p) => {
        return p.id === action.payload.value;
      });

      if (itemToAdd && itemToAdd.stock > 0) {
        let itemInCart = document.getElementById(itemToAdd.id);

        if (itemInCart) {
          const currentQuantity = getQuantityOfItem(itemInCart);
          let newQty = currentQuantity + 1;

          if (isProductOutOfSold(newQty, currentQuantity, itemToAdd.stock)) {
            return { ...state, error: "재고가 부족합니다." };
          }

          itemInCart.querySelector("span").textContent =
            `${itemToAdd.name} - ${itemToAdd.price}원 x ${newQty}`;
        } else {
          renderNewCartItem(itemToAdd);
        }
      }

      const newCartTotal = calculateCartTotal();

      return {
        ...state,
        items: [...state.items, itemToAdd],
        lastSelected: itemToAdd.id,
        error: null,
        ...newCartTotal,
      };
    }

    case actions.CHANGE_ITEM_QUANTITY: {
      const selectedItem = action.payload;

      const selectedId = selectedItem.dataset.productId;
      const $cartItem = document.getElementById(selectedId);

      const prod = PRODUCT_LIST.find((p) => p.id === selectedId);

      const currentQuantity = getQuantityOfItem($cartItem);

      const quantifyChange = parseInt(selectedItem.dataset.change);
      const newQuantity = currentQuantity + quantifyChange;

      if (isProductOutOfSold(newQuantity, currentQuantity, prod.stock)) {
        return { ...state, error: "재고가 부족합니다." };
      }

      $cartItem.querySelector("span").textContent = `${getNameOfItem(
        $cartItem,
      )}x ${newQuantity}`;

      const newCartTotal = calculateCartTotal();
      const newItems =
        newQuantity > 0
          ? [...state.items, prod]
          : state.items.filter((item) => item.id !== selectedId);

      return {
        ...state,
        items: newItems,
        ...newCartTotal,
      };
    }

    case actions.REMOVE_ITEM: {
      const selectedItem = action.payload;

      const selectedId = selectedItem.dataset.productId;
      const $cartItem = document.getElementById(selectedId);

      const prod = PRODUCT_LIST.find((p) => p.id === selectedId);
      const currentQuantity = getQuantityOfItem($cartItem);

      prod.stock += currentQuantity;
      $cartItem.remove();

      const newCartTotal = calculateCartTotal();

      return {
        ...state,
        items: state.items.filter((item) => item.id !== selectedId),
        ...newCartTotal,
      };
    }

    default:
      return state;
  }
}
