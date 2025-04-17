import { createElementFromHTML } from '../utils/dom-utils.js';
import { state } from '../store/index.js';

/**
 * 상품 선택 옵션 업데이트
 * @param {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 */
const updateProductOption = (products = state.products) => {
  const productSelect = document.getElementById('product-select');
  productSelect.innerHTML = ''; // 기존 옵션 초기화

  const selectOptions = products.map((product) => {
    return createElementFromHTML(
      /* html */
      `<option value="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>${product.name} - ${product.price}원</option>`,
    );
  });
  // 각 옵션을 추가
  selectOptions.forEach((option) => productSelect.appendChild(option));
};

/**
 * 재고 상태 메시지 생성
 * @param  {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 * @returns {string} 재고 상태 메시지
 */
const createStockStatusMessage = (products) => {
  let message = '';

  for (const product of products) {
    if (product.stock < 5) {
      message += `${product.name}: ${product.stock > 0 ? '재고 부족 (' + product.stock + '개 남음)' : '품절\n'}`;
    }
  }
  return message;
};

function updateStockStatus() {
  const stockStatus = document.getElementById('stock-status');
  stockStatus.textContent = createStockStatusMessage(state.products);
}

export { updateProductOption, updateStockStatus };
