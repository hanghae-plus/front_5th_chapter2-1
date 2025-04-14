import { TotalAmountContainerDOM } from '../ui';

export const renderCartTotal = (totalAmount, discountRate) => {
  const container = TotalAmountContainerDOM.get();
  container.textContent = `총액: ${Math.round(totalAmount)}원`;

  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    container.appendChild(span);
  }
};
