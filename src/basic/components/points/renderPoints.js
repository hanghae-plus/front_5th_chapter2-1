import { textUtils } from '../../utils/textUtils';

export function renderPoints(points) {
  let $pointSpan = document.getElementById('loyalty-points');

  if (!$pointSpan) {
    $pointSpan = document.createElement('span');
    $pointSpan.id = 'loyalty-points';
    $pointSpan.className = 'text-blue-500 ml-2';

    const $cartTotalDiv = document.getElementById('cart-total');
    $cartTotalDiv.appendChild($pointSpan);
  }

  $pointSpan.textContent = textUtils.getPointText(points);
}
