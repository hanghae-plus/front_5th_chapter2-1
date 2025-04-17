export function renderPrice({ totalPrice, discountRate }) {
  const priceElement = document.createElement('div');
  priceElement.id = 'cart-total';
  priceElement.className = 'text-xl font-bold my-4';

  priceElement.innerHTML = `총액: ${totalPrice.toLocaleString()}원`;

  if (discountRate > 0) {
    const spanElement = document.createElement('span');
    spanElement.className = 'text-green-500 ml-2';
    spanElement.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    priceElement.appendChild(spanElement);
  }
}
