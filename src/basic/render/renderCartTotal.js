import { TotalAmountContainerDOM } from '../ui';
import { STYLES } from '../consts';
import { createElement } from '../utils';

export const renderCartTotal = (totalAmount, discountRate) => {
  const container = TotalAmountContainerDOM.get();
  container.textContent = `총액: ${Math.round(totalAmount)}원`;

  if (discountRate > 0) {
    const discountSpan = createElement('span', {
      className: STYLES.TEXT.SUCCESS,
      textContent: `(${(discountRate * 100).toFixed(1)}% 할인 적용)`,
    });
    container.appendChild(discountSpan);
  }
};
