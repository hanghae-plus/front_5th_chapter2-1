export const DiscountRate = (discRate) => {
  const span = document.createElement('span');
  span.className = 'text-green-500 ml-2';
  span.textContent = `(${(discRate * 100).toFixed(1)}% 할인 적용)`;

  return span;
};
