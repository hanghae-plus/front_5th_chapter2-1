export const formatPrice = (price) => {
  return `${price}원`;
};

export const formatDiscountRate = (rate) => {
  return `${(rate * 100).toFixed(1)}%`;
};

export const formatProductOption = (item) => {
  return `${item.name} - ${formatPrice(item.value)}`;
};

export const formatStockStatusMessage = (item) => {
  if (item.quantity >= 5) return '';
  const status =
    item.quantity > 0 ? `재고 부족 (${item.quantity}개 남음)` : '품절';
  return `${item.name}: ${status}\n`;
};
