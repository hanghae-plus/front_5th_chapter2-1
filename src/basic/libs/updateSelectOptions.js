/** @typedef {import("../types").Product} Product */

/**
 * 상품 선택 옵션 업데이트
 *
 * @param {HTMLSelectElement} $select - 상품 선택 요소
 * @param {Array<Product>} products - 상품 목록
 *
 * @example
 * updateSelOpts($sel, prodList);
 */
export const updateSelectOptions = ($select, products) => {
  $select.innerHTML = "";

  products.forEach((product) => {
    const $option = createOption(product);

    $select.appendChild($option);
  });
};

/**
 * 상품 선택 옵션 생성
 *
 * @param {Product} product - 상품 정보
 * @returns {HTMLOptionElement} 생성된 옵션 요소
 */
const createOption = (product) => {
  const $option = document.createElement("option");
  $option.value = product.id;
  $option.textContent = product.name + " - " + product.price + "원";

  if (product.stock === 0) {
    $option.disabled = true;
  }

  return $option;
};
