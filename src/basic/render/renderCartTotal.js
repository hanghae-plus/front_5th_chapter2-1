import { TotalAmountContainerDOM } from '../ui';
import { STYLES } from '../consts';
import { createElement, formatPrice, formatDiscountRate } from '../utils';

const createDiscountElement = (discountRate) => {
  return createElement('span', {
    className: STYLES.TEXT.DISCOUNT,
    textContent: `(${formatDiscountRate(discountRate)} 할인 적용)`,
  });
};

export const renderCartTotal = (totalAmount, discountRate) => {
  const container = TotalAmountContainerDOM.get();

  const existingDiscount = container.querySelector(`.${STYLES.TEXT.DISCOUNT}`);
  if (existingDiscount) {
    existingDiscount.remove();
  }

  container.textContent = `총액: ${formatPrice(totalAmount)}`;

  if (discountRate > 0) {
    const discountElement = createDiscountElement(discountRate);
    container.appendChild(discountElement);
  }
};
