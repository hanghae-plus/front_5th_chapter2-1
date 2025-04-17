export default function renderPoint() {
  const totalElement = document.getElementById('cart-total');
  let pointElement = document.getElementById('loyalty-points');

  let totalPrice = 0;
  const bonusPts = Math.floor(totalPrice / 1000);

  if (!pointElement) {
    pointElement = document.createElement('span');
    pointElement.id = 'loyalty-points';
    pointElement.className = 'text-blue-500 ml-2';
    totalElement.appendChild(pointElement);
  }
  pointElement.textContent = '(포인트: ' + bonusPts + ')';
}
