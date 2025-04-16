import { createElement } from '../../../core/dom';
import { state } from '../../../core/state';
import { elements } from '../../../core/dom';
import { calculateTotalAmount } from '../utils/price-calculate';
import { renderLoyaltyPoints } from '../../points';
import { updateStockStatus } from './stock-render';

/**
 * 장바구니 계산 결과
 *
 */
const calculateCartDiscountPrice = () => {
  const { totalAmount, discountRate, cartItemCount } = calculateTotalAmount();

  state.totalAmount = totalAmount;
  state.cartItemCount = cartItemCount;

  elements.cartTotal.textContent = `총액: ${Math.round(totalAmount)}원`;

  // 할인 적용 여부 확인
  if (discountRate > 0) {
    const discountTag = createElement('span', {
      className: 'text-green-500 ml-2',
      textContent: `(${(discountRate * 100).toFixed(1)}% 할인 적용)`,
    });
    elements.cartTotal.appendChild(discountTag);
  }

  updateStockStatus();
  renderLoyaltyPoints();
};

export { calculateCartDiscountPrice };
