import { calculateCart } from "../libs";
import store from "../libs/store";
import { createElement } from "../libs/utils/createElement";

/** @typedef {import("../types").Product} Product */

/** 장바구니 클릭 이벤트 */
export const addButtonClickEvent = () => {
  const { $addCartButton, $cartDisplay, $sum, $stockInfo } = store.elements;
  const { products, lastSelect } = store.states;

  $addCartButton.addEventListener("click", () => {
    const selectedItemValue = store.elements.$select.value;

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
    lastSelect.value = selectedItemValue;
  });
};
