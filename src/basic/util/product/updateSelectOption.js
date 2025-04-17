import { PRODUCTS } from '../../constant';

/**
 * 선택 가능한 제품들을 드롭다운 목록에 업데이트합니다.
 * 제품 목록을 순회하여 각 제품의 이름, 가격, 재고 상태를 반영한 옵션을 추가합니다.
 * 재고가 0인 제품은 선택할 수 없도록 비활성화 처리됩니다.
 */

export function updateSelectOption() {
  document.getElementById('product-select').innerHTML = '';

  PRODUCTS.forEach(function (product) {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} - ${product.price}원`;

    if (product.stock === 0) {
      option.disabled = true;
    }

    document.getElementById('product-select').appendChild(option);
  });
}
