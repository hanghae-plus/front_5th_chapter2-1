export const calculateDiscountedPrice = (price, discountRate) => {
  return Math.round(price * (1 - discountRate));
};
