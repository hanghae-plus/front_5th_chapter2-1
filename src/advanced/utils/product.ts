import { DISCOUNT_RATE, THRESHOLD } from '../config/constants';
import { Product } from '../data/products';

interface CartTotal {
  count: number;
  amountWithDiscount: number;
  amountWithoutDiscount: number;
}

export interface CartSummary extends CartTotal {
  discountRate: number;
  totalAmount: number;
}

export const getCartSummary = (cartList: Product[]) => {
  const total: CartTotal = cartList.reduce(
    (prev, item) => {
      const { price, discountRate, cartQuantity, discountThreshold } = item;

      // 아이템 최소개수 이상 담으면 할인 적용
      const effectiveDiscountRate =
        cartQuantity >= discountThreshold ? discountRate : 0;

      return {
        // 총 수량 누적
        count: prev.count + cartQuantity,

        // 아이템 개별 할인 누적 총 금액
        amountWithDiscount:
          prev.amountWithDiscount +
          price * cartQuantity * (1 - effectiveDiscountRate),

        // 아이템별 할인 적용 안한 금액 누적
        amountWithoutDiscount:
          prev.amountWithoutDiscount + price * cartQuantity,
      };
    },
    {
      count: 0,
      amountWithDiscount: 0,
      amountWithoutDiscount: 0,
    },
  );

  // 아이템 개별 할인을 전체에 적용했을 경우 평균 할인율
  const totalItemDiscountRate =
    total.amountWithoutDiscount === 0
      ? 0
      : (total.amountWithoutDiscount - total.amountWithDiscount) /
        total.amountWithoutDiscount;

  // 구매 총 수량에 따라 적용될 할인율
  const bulkDiscountRate =
    total.count > THRESHOLD.bulkDiscount ? DISCOUNT_RATE.bulk : 0;

  // 총수량에 따라 할인이 적용된 금액
  const bulkDiscountAmount =
    total.amountWithoutDiscount * (1 - bulkDiscountRate);

  // 할인율. 둘 중 높은 할인율을 적용
  const discountRate = Math.max(totalItemDiscountRate, bulkDiscountRate);

  // 총 금액. 둘 중 낮은 금액
  const totalAmount = Math.min(bulkDiscountAmount, total.amountWithDiscount);

  const summary: CartSummary = { ...total, discountRate, totalAmount };

  return summary;
};

export const getProductStockStatusString = (product: Product) => {
  const hasStock = product.stockQuantity > 0;
  const status = hasStock
    ? `재고 부족 (${product.stockQuantity}개 남음)`
    : '품절';

  return `${product.name}: ${status}`;
};
