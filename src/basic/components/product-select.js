import { createElementFromHTML } from '../utils/dom-utils.js';
import { initialProducts } from '../constants';

/**
 * 상품 선택 옵션 업데이트
 * @param {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 */
const $productSelect = (products = initialProducts) => {
  const productSelect = createElementFromHTML(/* html */ `
    <select id="product-select" class="border rounded p-2 mr-2"></select>
  `);
  productSelect.innerHTML = ''; // 기존 옵션 초기화
  const selectOptions = products.map((product) => {
    return createElementFromHTML(
      /* html */
      `<option value="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>${product.name} - ${product.price}원</option>`,
    );
  });
  // 각 옵션을 추가
  selectOptions.forEach((option) => productSelect.appendChild(option));

  return productSelect;
};

export { $productSelect };
