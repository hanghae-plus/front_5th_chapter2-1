export default function renderBonusPts() {
  let totalAmt = 0;

  const totalElement = document.getElementById('cart-total');
  if (totalElement) {
    totalAmt = totalElement.textContent.match(/\d+/)[0];
  }

  const bonusPts = Math.floor(totalAmt / 1000);
  let ptsTag = document.getElementById('loyalty-points');
  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    totalElement.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + bonusPts + ')';
}
