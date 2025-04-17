import { PRODUCTS } from '../../constant';
import { getDiscountRate } from '../discount';
import { parseQuantity } from '../cart';

/**
 * 장바구니 아이템들의 총액, 아이템 할인 적용 후 총액, 제품 수량을 계산합니다.
 *
 * @param {HTMLCollection | Element[]} cartItems - 장바구니에 담긴 아이템 DOM 요소 목록
 * @returns {{
 *   totalBeforeDiscount: number,      // 전체 할인 적용 전 총액
 *   totalAfterItemDiscount: number,   // 아이템 단위 할인 적용 후 총액
 *   productCount: number              // 총 수량
 * }}
 */

export function calculateCartTotals(cartItems) {
  let totalBeforeDiscount = 0;
  let totalAfterItemDiscount = 0;
  let productCount = 0;

  cartItems.forEach(($item) => {
    const product = PRODUCTS.find((p) => p.id === $item.id);
    const quantity = parseQuantity($item);

    const itemTotal = product.price * quantity;
    const itemDiscountRate = getDiscountRate(product.id, quantity);

    totalBeforeDiscount += itemTotal;
    totalAfterItemDiscount += itemTotal * (1 - itemDiscountRate);
    productCount += quantity;
  });

  return { totalBeforeDiscount, totalAfterItemDiscount, productCount };
}
