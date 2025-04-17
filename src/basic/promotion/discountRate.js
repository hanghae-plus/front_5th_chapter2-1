// 상품 할인율 계산
export const getItemDiscountRate = (itemId, quantity) => {
  if (quantity < 10) {
    return 0;
  }

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

// 대량 구매 및 화요일 할인 적용 후 총액/할인율 계산
export const getBulkDiscountRate = (
  itemCount,
  subTotal,
  totalAmountBeforeBulk
) => {
  let discountRate = 0;
  let totalAmount = totalAmountBeforeBulk;
  const bulkDiscount = totalAmount * 0.25;
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

  // 화요일
  const isTuesday = new Date().getDay() === 2;

  // 화요일 할인 적용
  if (isTuesday) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  return { discountRate, totalAmount };
};
