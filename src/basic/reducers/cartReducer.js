import { renderNewCartItem } from "../components/render";
import { PRODUCT_LIST } from "../lib/configs/products";
import { calculateCartTotal } from "../lib/utils/cartUtils";

const actions = {
  ADD_ITEM: "ADD_ITEM",
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
          let newQty =
            parseInt(
              itemInCart.querySelector("span").textContent.split("x ")[1],
            ) + 1;
          if (newQty <= itemToAdd.stock) {
            itemInCart.querySelector("span").textContent =
              `${itemToAdd.name} - ${itemToAdd.price}원 x ${newQty}`;
            itemToAdd.stock--;
          } else {
            return { ...state, error: "재고가 부족합니다." };
          }
        } else {
          renderNewCartItem(itemToAdd);
          itemToAdd.stock--;
        }
      }

      return {
        ...state,
        items: [...state.items, itemToAdd],
        lastSelected: itemToAdd.id,
        error: null,
        ...calculateCartTotal(),
      };
    }
    case actions.REMOVE_ITEM: {
      const selectedItem = action.payload;

      let selectedId = selectedItem.dataset.productId;
      let itemElem = document.getElementById(selectedId);

      let prod = PRODUCT_LIST.find(function (p) {
        return p.id === selectedId;
      });
      if (selectedItem.classList.contains("quantity-change")) {
        let qtyChange = parseInt(selectedItem.dataset.change);
        let newQty =
          parseInt(itemElem.querySelector("span").textContent.split("x ")[1]) +
          qtyChange;
        if (
          newQty > 0 &&
          newQty <=
            prod.stock +
              parseInt(
                itemElem.querySelector("span").textContent.split("x ")[1],
              )
        ) {
          itemElem.querySelector("span").textContent =
            itemElem.querySelector("span").textContent.split("x ")[0] +
            "x " +
            newQty;
          prod.stock -= qtyChange;
        } else if (newQty <= 0) {
          itemElem.remove();
          prod.stock -= qtyChange;
        } else {
          return { ...state, error: "재고가 부족합니다." };
        }
      } else if (selectedItem.classList.contains("remove-item")) {
        let remQty = parseInt(
          itemElem.querySelector("span").textContent.split("x ")[1],
        );
        prod.stock += remQty;
        itemElem.remove();
      }

      return {
        ...state,
        items: state.items.filter((item) => item.id !== selectedId),
        ...calculateCartTotal(),
      };
    }
    default:
      return state;
  }
}
