import { initialProducts } from '../constants';

/**
 * 상품 선택 옵션 업데이트
 * @param {Array<{id: string, name: string, price: number, stock: number}>} products 상품 목록
 */
const ProductSelect = (products = initialProducts) => {
  const $productSelect = Object.assign(document.createElement('select'), {
    id: 'product-select',
    className: 'border rounded p-2 mr-2',
  });
  const render = () => {
    $productSelect.innerHTML = `
      ${products
        .map((product) => {
          return `<option value="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>${product.name} - ${product.price}원</option>`;
        })
        .join('')}
  `;
  };

  render();

  return $productSelect;
};

export { ProductSelect };
