import { Product } from '../types/index';

// 상품별 할인율
export const getItemDiscountRate = (
  itemId: string,
  quantity: number
): number => {
  if (quantity < 10) return 0;
  switch (itemId) {
    case 'p1':
      return 0.1;
    case 'p2':
      return 0.15;
    case 'p3':
      return 0.2;
    case 'p4':
      return 0.05;
    case 'p5':
      return 0.25;
    default:
      return 0;
  }
};

// 대량 + 화요일 할인
export const getBulkDiscountRate = (
  itemCount: number,
  subTotal: number,
  totalAmountBeforeBulk: number
) => {
  let discountRate = 0;
  let totalAmount = totalAmountBeforeBulk;
  const bulkDiscount = subTotal * 0.25;
  const itemDiscount = subTotal - totalAmount;

  if (itemCount >= 30) {
    if (bulkDiscount > itemDiscount) {
      totalAmount = subTotal * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = itemDiscount / subTotal;
    }
  } else {
    discountRate = itemDiscount / subTotal;
  }

  const isTuesday = new Date().getDay() === 2;
  if (isTuesday) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  return { discountRate, totalAmount };
};

export const getStockInfoMessage = (products: Product[]) => {
  return products
    .filter(p => p.quantity <= 5)
    .map(
      p =>
        `${p.name}: ${p.quantity > 0 ? `재고 부족 (${p.quantity}개 남음)` : '품절'}`
    )
    .join('\n');
};
