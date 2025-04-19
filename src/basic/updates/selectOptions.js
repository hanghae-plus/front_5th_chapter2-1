import { prodList } from '../lib/constants';
import { createElement } from '../lib/utils';

// 변경된 상품 목록으로 select, option 초기화
export function updateSelectOptions() {
  // select 요소 선택
  const productSelect = document.getElementById('product-select');

  // option 목록 초기화
  productSelect.innerHTML = '';

  // 상품 목록을 순회하며 option 요소 생성
  prodList.forEach((product) => {
    const option = createElement('option', {
      value: product.id,
      textContent: `${product.name} - ${product.price}원`,
      // 재고가 없는 상품은 disabled 처리
      disabled: product.quantity === 0,
    });

    productSelect.appendChild(option);
  });
}
