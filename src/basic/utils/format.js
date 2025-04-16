export const formatPrice = (price) => {
  return `${price}원`;
};

export const formatDiscountRate = (rate) => {
  return `${(rate * 100).toFixed(1)}%`;
};
