import { createElement } from '../utils/index.js';

// 장바구니 총액 업데이트
export const updateCartSummary = (total, discountRate, totalAmount) => {
  total.textContent = `총액: ${Math.round(totalAmount)}원`;

  if (discountRate > 0) {
    const span = createElement('span', {
      className: 'text-green-500 ml-2',
      text: `(${(discountRate * 100).toFixed(1)}% 할인 적용)`,
    });

    total.appendChild(span);
  }
};
