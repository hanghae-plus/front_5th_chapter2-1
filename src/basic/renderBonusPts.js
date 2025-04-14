export default function renderBonusPts() {
  const totalAmt = document
    .getElementById('cart-total')
    .textContent.match(/\d+/)[0];

  console.log('==totalAmt', totalAmt);
  const bonusPts = Math.floor(totalAmt / 1000);
  // const itemCnt = 0;
  let ptsTag = document.getElementById('loyalty-points');
  const sum = document.getElementById('cart-total');
  if (!ptsTag) {
    ptsTag = document.createElement('span');
    ptsTag.id = 'loyalty-points';
    ptsTag.className = 'text-blue-500 ml-2';
    sum.appendChild(ptsTag);
  }
  ptsTag.textContent = '(포인트: ' + bonusPts + ')';
}
