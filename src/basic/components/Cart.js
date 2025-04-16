import {
  handleRemove,
  handleQuantityChange,
  calculateCart,
} from "../services/cartService";
import { updateProductStock, validateStock } from "../services/productService";
import {
  getButtonType,
  getItemQuantity,
  updateItemQuantity,
} from "../utils/domUtils";
import createCartItem from "./CartItem";
import renderStockInfo from "./StockInfo";
import renderTotal from "./TotalDisplay";

// 장바구니 화면을 업데이트하는 함수
export const updateCartDisplay = (elements, store) => {
  const cartResult = calculateCart(
    Array.from(elements.cartDisplay.children),
    store.getState().products,
  );
  renderTotal(cartResult.total, elements.total, cartResult.discountRate);
  renderStockInfo(elements.stockInfo, store.getState().products);
};

// 상품 추가 버튼 클릭 시 발생하는 이벤트를 설정하는 함수
export const setupAddButtonEvent = (elements, store) => {
  elements.addButton.addEventListener("click", () => {
    const state = store.getState();
    const selectedId = elements.productSelect.value;
    const product = state.products.find((p) => p.id === selectedId);

    if (!validateStock(product)) return;

    const existingItem = document.getElementById(selectedId);
    if (existingItem) {
      const currentQty = getItemQuantity(existingItem);
      const newQty = currentQty + 1;

      if (newQty > product.q + currentQty) {
        alert("재고가 부족합니다.");
        return;
      }

      updateItemQuantity(existingItem, product, newQty);
      updateProductStock(store, product.id, 1);
    } else {
      elements.cartDisplay.appendChild(createCartItem(product));
      updateProductStock(store, product.id, 1);
    }

    updateCartDisplay(elements, store);
  });
};

// 장바구니 버튼 클릭 시 발생하는 이벤트를 설정하는 함수 (삭제, 수량 변경)
export const setupCartButtonEvents = (elements, store) => {
  elements.cartDisplay.addEventListener("click", (event) => {
    const button = event.target;
    if (!button.matches("button")) return;

    const state = store.getState();
    const productId = button.dataset.productId;
    const itemElement = document.getElementById(productId);
    const product = state.products.find((p) => p.id === productId);

    const buttonType = getButtonType(button);
    switch (buttonType) {
      case "remove":
        handleRemove(itemElement, productId, store);
        break;
      case "change":
        handleQuantityChange(
          itemElement,
          product,
          parseInt(button.dataset.change),
          store,
        );
        break;
      default:
        return;
    }

    updateCartDisplay(elements, store);
  });
};
