import { products } from "../data/products";

/** 현재 제품 목록을 기반으로 <option> 태그 문자열을 생성 */
export const renderProductOptions = () => {
  return products
    .map((product) => {
      const disabledAttribute = product.q === 0 ? "disabled" : "";

      return `<option value="${product.id}" ${disabledAttribute}>${product.name} - ${product.val}원</option>`;
    })
    .join("");
};
