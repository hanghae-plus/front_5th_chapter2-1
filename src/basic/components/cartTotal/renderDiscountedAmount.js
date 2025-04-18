import { textUtils } from '../../utils/textUtils';

export function renderDiscountedAmount(finalDiscountRate) {
  const $discountSpan = document.createElement('span');
  $discountSpan.className = 'text-green-500 ml-2';

  const discountedRate = (finalDiscountRate * 100).toFixed(1);
  $discountSpan.textContent = textUtils.getDiscountText(discountedRate);

  return $discountSpan;
}
