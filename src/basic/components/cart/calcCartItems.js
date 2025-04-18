import { CONSTANTS } from '../../constants/index';
import { calcUtils } from '../../utils/calcUtils';

export function calcCartItems(items) {
  let totalAmount = 0;
  let itemCount = 0;
  let originalTotalAmount = 0; // 할인 미적용 총액

  const $cart = document.getElementById('cart-items');

  Array.from($cart.children).forEach((item) => {
    const curItem = items.find((p) => p.id === item.id);
    const quantity = parseInt(
      item.querySelector('span').textContent.split('x ')[1],
    );
    const itemTotalPrice = curItem.price * quantity;

    itemCount += quantity;
    originalTotalAmount += itemTotalPrice;

    // 할인 요건 충족 할인율 적용
    const discountCondition = quantity >= CONSTANTS.QUANTITY_DISCOUNT_LIMIT;
    const discountRate = discountCondition
      ? calcUtils.getIdDiscountRate(curItem.id)
      : 0;

    totalAmount += itemTotalPrice * (1 - discountRate);
  });

  return { totalAmount, itemCount, originalTotalAmount };
}
