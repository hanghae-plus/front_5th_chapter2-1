// 상품 관련 UI 함수
import { html } from '../utils/dom.js';

/*
* 상품 드롭다운 옵션 업데이트 함수
* */
export function updateProductOptions(productSelect, products) {
  productSelect.innerHTML = '';

  products.forEach(product => {
    const option = html`<option value="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>${product.name} - ${product.price}원</option>`;
    productSelect.appendChild(option);
  });
}

/*
* 재고 정보 업데이트 함수
* */
export function updateStockInfo(stockInfoDisplay, products) {
  let infoText = '';

  products.forEach(product => {
    if (product.stock < 5) {
      infoText += `${product.name}: ${
        product.stock > 0
          ? `재고 부족 (${product.stock}개 남음)`
          : '품절'
      }\n`;
    }
  });

  stockInfoDisplay.textContent = infoText;
}

/*
* ID로 상품 찾기
* */
export function findProductById(id, products) {
  return products.find(product => product.id === id);
}

/*
* 번개세일 상품 처리 함수
* */
export function handleFlashSale(event, updateProductOptionFn) {
  const { product, discountRate } = event;

//   사용자에게 알림
  alert(`번개세일! ${product.name}이(가) ${discountRate * 100}% 할인 중입니다!`);

//   상품 목록 갱신
  updateProductOptionFn();
}

/*
* 추천 상품 처리 함수
* */
export function handleRecommendedProduct(event, updateProductOptionFn) {
  const { product, discountRate } = event;

//   사용자에게 알림
  alert(`${product.name}은(는) 어떠세요? 지금 구매하시면 ${discountRate * 100}% 추가 할인!`);

//   상품 목록 갱신
  updateProductOptionFn();
}