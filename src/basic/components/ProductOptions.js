import { $ } from "@/basic/lib";

/**
 * [Component] 상품 옵션
 *
 * @param {{id: string, name: string, cost: number, quantity: number, discount: number}} item
 * @returns {HTMLOptionElement}
 */
const ProductOption = (item) => {
  return $("option", {
    textContent: `${item.name} - ${item.cost}원`,
    value: item.id,
    disabled: item.quantity === 0,
  });
};

/**
 * [Component] 상품 선택 셀렉트 옵션 요소
 *
 * @param {Array<{id: string, name: string, cost: number, quantity: number, discount: number}>} products
 * @returns {DocumentFragment}
 */
export const ProductOptions = (products) => {
  const frag = $("frag");
  products.forEach((item) => {
    frag.appendChild(ProductOption(item));
  });
  return frag;
};
