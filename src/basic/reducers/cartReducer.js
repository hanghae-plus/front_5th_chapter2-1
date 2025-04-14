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

      if (itemToAdd && itemToAdd.q > 0) {
        let item = document.getElementById(itemToAdd.id);
        if (item) {
          let newQty =
            parseInt(item.querySelector("span").textContent.split("x ")[1]) + 1;
          if (newQty <= itemToAdd.q) {
            item.querySelector("span").textContent =
              itemToAdd.name + " - " + itemToAdd.val + "원 x " + newQty;
            itemToAdd.q--;
          } else {
            return { ...state, error: "재고가 부족합니다." };
          }
        } else {
          renderNewCartItem(itemToAdd);
          itemToAdd.q--;
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
            prod.q +
              parseInt(
                itemElem.querySelector("span").textContent.split("x ")[1],
              )
        ) {
          itemElem.querySelector("span").textContent =
            itemElem.querySelector("span").textContent.split("x ")[0] +
            "x " +
            newQty;
          prod.q -= qtyChange;
        } else if (newQty <= 0) {
          itemElem.remove();
          prod.q -= qtyChange;
        } else {
          return { ...state, error: "재고가 부족합니다." };
        }
      } else if (selectedItem.classList.contains("remove-item")) {
        let remQty = parseInt(
          itemElem.querySelector("span").textContent.split("x ")[1],
        );
        prod.q += remQty;
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
