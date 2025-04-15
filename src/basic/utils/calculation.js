export const formatPrice = (price) => {
  return `${price}원`;
};

export const formatDiscountRate = (rate) => {
  return `${(rate * 100).toFixed(1)}%`;
};

export const calculateDiscountedPrice = (price, discountRate) => {
  return Math.round(price * (1 - discountRate));
};

export const calculateBonusPoints = (amount) => {
  return Math.floor(amount / 1000);
};

export const calculateTotalPrice = (price, quantity) => {
  return price * quantity;
};
