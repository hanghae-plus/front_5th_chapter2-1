export default function renderBonusPts() {
  const totalAmt = document
    .getElementById('cart-total')
    .textContent.match(/\d+/)[0];

  const bonusPts = Math.floor(totalAmt / 1000);

  const sum = document.getElementById('cart-total');
  sum.appendChild(pointTag(bonusPts));
}

function pointTag(bonusPts) {
  const pointTag = document.createElement('span');
  pointTag.id = 'loyalty-points';
  pointTag.className = 'text-blue-500 ml-2';
  pointTag.textContent = '(포인트: ' + bonusPts + ')';

  return pointTag;
}
