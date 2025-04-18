import { cartStore } from '../store';

export function getProductDiscountRate(productId) {
  if (productId === 'p1') return 0.1;
  if (productId === 'p2') return 0.15;
  if (productId === 'p3') return 0.2;
  if (productId === 'p4') return 0.05;
  if (productId === 'p5') return 0.25;

  return 0;
}

export function getBulkDiscountRate() {
  const minQuantityForBulkDiscount = 30;
  const twentyFivePercentDiscountRate = 0.25;

  if (cartStore.getState().itemQuantity >= minQuantityForBulkDiscount) {
    const bulkDiscountAmount =
      cartStore.getState().totalPrice * twentyFivePercentDiscountRate;
    const itemDiscountAmount =
      cartStore.getState().subTotalPrice - cartStore.getState().totalPrice;

    if (bulkDiscountAmount > itemDiscountAmount) {
      cartStore.setState({
        ...cartStore.getState(),
        totalPrice:
          cartStore.getState().subTotalPrice *
          (1 - twentyFivePercentDiscountRate),
      });

      cartStore.setDiscountRate(twentyFivePercentDiscountRate);
    } else {
      cartStore.setDiscountRate(
        (cartStore.getState().subTotalPrice - cartStore.getState().totalPrice) /
          cartStore.getState().subTotalPrice,
      );
    }
  } else {
    cartStore.setDiscountRate(
      (cartStore.getState().subTotalPrice - cartStore.getState().totalPrice) /
        cartStore.getState().subTotalPrice,
    );
  }
}

export function getSpecialDiscountRate() {
  const isSpecialDiscountDay = new Date().getDay() === 2;
  const tenPercentDiscountRate = 0.1;

  if (isSpecialDiscountDay) {
    cartStore.setState({
      ...cartStore.getState(),
      totalPrice:
        cartStore.getState().totalPrice * (1 - tenPercentDiscountRate),
    });

    cartStore.setDiscountRate(
      Math.max(cartStore.getDiscountRate(), tenPercentDiscountRate),
    );
  }
}
