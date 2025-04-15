import { calculateCart } from "../libs";
import { createElement } from "../libs/utils/createElement";

/** @typedef {import("../types").Product} Product */

/**
 * 장바구니 클릭 이벤트
 *
 * @param {HTMLButtonElement} $addCartButton - 장바구니 요소
 * @param {HTMLElement} $cartDisplay - 장바구니 요소
 * @param {HTMLSelectElement} $select - 선택 요소
 * @param {HTMLElement} $sum - 총 금액 요소
 * @param {HTMLElement} $stockInfo - 재고 정보 요소
 * @param {Product[]} products - 상품 목록
 * @param {Object} lastSel - 마지막 선택 상품
 */
export const addButtonClickEvent = ($addCartButton, $cartDisplay, $select, $sum, $stockInfo, products, lastSel) => {
  $addCartButton.addEventListener("click", () => {
    const selectedItemValue = $select.value;

    const targetProduct = products.find((p) => p.id === selectedItemValue);

    if (!targetProduct) return;
    if (targetProduct.stock <= 0) return;

    const $targetProduct = document.getElementById(targetProduct.id);

    if ($targetProduct) {
      const $targetProductName = $targetProduct.querySelector("span");
      var newProductQuantity = parseInt($targetProductName.textContent.split("x ")[1]) + 1;

      if (newProductQuantity <= targetProduct.stock) {
        $targetProductName.textContent =
          targetProduct.name + " - " + targetProduct.price + "원 x " + newProductQuantity;
        targetProduct.stock--;
      } else {
        alert("재고가 부족합니다.");
      }
    } else {
      const buttons = [
        {
          label: "-",
          class: "quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1",
          dataset: { change: -1, productId: targetProduct.id },
        },
        {
          label: "+",
          class: "quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1",
          dataset: { change: 1, productId: targetProduct.id },
        },
        {
          label: "삭제",
          class: "remove-item bg-red-500 text-white px-2 py-1 rounded",
          dataset: { productId: targetProduct.id },
        },
      ];
      const $newProduct = createElement(
        "div",
        {
          id: targetProduct.id,
          class: "flex justify-between items-center mb-2",
        },
        createElement("span", null, `${targetProduct.name} - ${targetProduct.price}원 x 1`),
        createElement("div", null, ...buttons.map(({ label, ...props }) => createElement("button", props, label))),
      );

      $cartDisplay.appendChild($newProduct);
      targetProduct.stock--;
    }

    calculateCart($cartDisplay, $sum, $stockInfo, products);
    lastSel.value = selectedItemValue;
  });
};
