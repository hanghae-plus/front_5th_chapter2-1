import { createDOM } from '../utils';

/**
 * 상품 옵션 요소를 생성하는 함수
 * @param {Object} products - 상품 정보 배열
 */
export const updateSelectOptions = (products) => {
    const $select = document.getElementById('product-select');
    // 선택 옵션 초기화
    $select.innerHTML = '';
    // 상품 목록 반복
    products.forEach(function (product) {
        createDOM('option', {
            value: product.id,
            textContent: product.name + ' - ' + product.price + '원',
            disabled: product.quantity === 0,
            parent: $select,
        });
    });
};
