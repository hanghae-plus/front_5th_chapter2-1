import { calcUtils } from '../../utils/calcUtils';
import { textUtils } from '../../utils/textUtils';
import { calcCartItems } from '../cart/calcCartItems';
import { getPoints } from '../points/getPoints';
import { renderPoints } from '../points/renderPoints';
import { updateStockInfoText } from '../stockStatus/updateStockInfoText';

export function renderCalcCart(items) {
  const { totalAmount, itemCount, originalTotalAmount } = calcCartItems(items);

  const { finalDiscountRate, discountedTotalAmount } =
    calcUtils.calcFinalDiscount(totalAmount, originalTotalAmount, itemCount);

  const roundedAmount = Math.round(discountedTotalAmount);
  const $cartTotal = document.getElementById('cart-total');
  $cartTotal.textContent = textUtils.getTotalAmountText(roundedAmount);

  if (finalDiscountRate > 0) {
    const $discountSpan = document.createElement('span');

    $discountSpan.className = 'text-green-500 ml-2';
    const discountedRate = (finalDiscountRate * 100).toFixed(1);
    $discountSpan.textContent = textUtils.getDiscountText(discountedRate);
    const $cartTotal = document.getElementById('cart-total');
    $cartTotal.appendChild($discountSpan);
  }

  const updateText = updateStockInfoText(items);
  const $stockStatus = document.getElementById('stock-status');
  $stockStatus.textContent = updateText;

  const points = getPoints(totalAmount);
  renderPoints(points);
}
