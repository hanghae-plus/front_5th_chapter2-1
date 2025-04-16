import { PRODUCT_INVENTORY } from "../configs/products";
import { CartItem } from "../../components/CartItem";
import { ProductSelectItem } from "../../components/ProductSelectItem";
import { StockInfo } from "../../components/StockInfo";
import { cartStore } from "../../stores/cartStore";

export function renderTotalPrice(totalPrice) {
  const cartTotalElem = document.getElementById("cart-total");

  cartTotalElem.textContent = `총액: ${Math.round(totalPrice)}원`;
}

export function renderDiscountRate(discountRate) {
  const cartTotalELem = document.getElementById("cart-total");

  if (discountRate > 0) {
    const discountElem = document.createElement("span");

    discountElem.classList.add("text-green-500", "ml-2");
    discountElem.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotalELem.appendChild(discountElem);
  }
}

/**
 * 장바구니 아이템 렌더링
 * 1. 장바구니 아이템 렌더링 시 기존 아이템이 있으면 quantity 업데이트
 * 2. 기존 아이템이 없으면 새로 추가
 * 3. 장바구니 아이템에는 있는데 items에는 없는 아이템이 있으면 삭제
 * @description 장바구니 아이템 렌더링 시 전체 초기화하게 되면 quantity change 버튼의 참조가 변경되어 테스트 살패
 * @param {Array} updatedItems - 업데이트된 장바구니 아이템 배열
 */
export function renderCartItems(updatedItems) {
  const cartItemsElem = document.getElementById("cart-items");
  const cartItemsChildren = Array.from(cartItemsElem.children);

  const itemsToRemoveFromCart = cartItemsChildren.filter((child) => !updatedItems.some((item) => item.id === child.id));

  for (const item of itemsToRemoveFromCart) {
    cartItemsElem.removeChild(item);
  }

  for (const updatedItem of updatedItems) {
    const itemIndex = cartItemsChildren.findIndex((child) => child.id === updatedItem.id);

    if (itemIndex === -1) {
      cartItemsElem.appendChild(
        CartItem({
          id: updatedItem.id,
          name: updatedItem.name,
          price: updatedItem.price,
          quantity: updatedItem.quantity,
        }),
      );
      return;
    }

    cartItemsChildren[itemIndex].querySelector("span").textContent =
      `${updatedItem.name} - ${updatedItem.price}원 x ${updatedItem.quantity}`;
  }
}

export function renderBonusPoints(bonusPoints) {
  let pointsTagElem = document.getElementById("loyalty-points");

  if (!pointsTagElem) {
    pointsTagElem = document.createElement("span");
    pointsTagElem.id = "loyalty-points";
    pointsTagElem.className = "text-blue-500 ml-2";

    const cartTotalElem = document.getElementById("cart-total");
    cartTotalElem.appendChild(pointsTagElem);
  }

  pointsTagElem.textContent = `(포인트: ${bonusPoints})`;
}

export function renderStockInfo() {
  let infoMsg = "";

  for (const item of PRODUCT_INVENTORY) {
    const cartItem = cartStore.getState().addedItems.find((cartItem) => cartItem.id === item.id);

    infoMsg += StockInfo({
      name: item.name,
      quantityLeft: item.stock - (cartItem?.quantity ?? 0),
    });
  }

  const stockInfoElem = document.getElementById("stock-status");
  stockInfoElem.textContent = infoMsg;
}

export function renderProductInventory() {
  const productSelectElem = document.getElementById("product-select");
  productSelectElem.innerHTML = "";

  for (const item of PRODUCT_INVENTORY) {
    const selectItem = ProductSelectItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.stock,
    });
    productSelectElem.appendChild(selectItem);
  }
}
