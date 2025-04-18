export const calculateCart = (cartItemList, productList) => {
  let totalAmount = 0;
  let totalItemCount = 0;
  let originalTotalAmount = 0;
  let bonusPoint = 0;

  cartItemList.forEach(({ id, quantity }) => {
    const currentProduct = productList.find((product) => product.id === id);
    if (!currentProduct) {
      return;
    }

    const itemTotalAmount = currentProduct.price * quantity;

    totalItemCount += quantity;
    originalTotalAmount += itemTotalAmount;

    // 수량 할인
    let discount = 0;
    if (quantity >= 10) {
      const quantityDiscounts = {
        p1: 0.1,
        p2: 0.15,
        p3: 0.2,
        p4: 0.05,
        p5: 0.25,
      };
      discount = quantityDiscounts[id] || 0;
    }

    totalAmount += itemTotalAmount * (1 - discount);
  });

  bonusPoint += Math.floor(totalAmount / 1000);

  // 대량 구매 할인
  let discountRate = 0;
  if (totalItemCount >= 30) {
    const bulkDiscountAmount = originalTotalAmount * 0.25;
    const itemDiscountAmount = originalTotalAmount - totalAmount;

    if (bulkDiscountAmount > itemDiscountAmount) {
      totalAmount = originalTotalAmount * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (originalTotalAmount - totalAmount) / originalTotalAmount;
    }
  } else {
    discountRate = (originalTotalAmount - totalAmount) / originalTotalAmount;
  }

  // 화요일 할인
  if (new Date().getDay() === 2) {
    totalAmount *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }

  return {
    totalPrice: Math.round(totalAmount),
    discountRate,
    bonusPoint,
  };
};
