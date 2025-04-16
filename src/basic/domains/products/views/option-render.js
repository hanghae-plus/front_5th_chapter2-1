import { createElement } from '../../../core/dom';
import { state } from '../../../core/state';

/**
 * 상품 선택 옵션 업데이트
 * @param {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 */
const updateProductOption = (products = state.products) => {
  const productSelect = document.getElementById('product-select');
  productSelect.innerHTML = '';

  const selectOptions = products.map((product) =>
    createElement('option', {
      value: product.id,
      disabled: product.stock === 0,
      textContent: `${product.name} - ${product.price}원`,
    }),
  );
  productSelect.append(...selectOptions);
};

export { updateProductOption };
