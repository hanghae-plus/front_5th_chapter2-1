// 메시지
const getBungaeSaleMessage = (name) => {
  return `번개세일! ${name}이(가) 20% 할인 중입니다!`;
};
const getSuggestItemMessage = (name) => {
  return `${name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`;
};

// 텍스트
const getSelectOptionText = (name, price) => {
  return `${name} - ${price}원`;
};
const getTotalAmountText = (amount) => {
  return `총액: ${amount}원`;
};

const getDiscountText = (discountRate) => {
  return `(${discountRate}% 할인 적용)`;
};
const getPointText = (points) => {
  return `(포인트: ${points})`;
};

const getStockWarningText = (name, quantity) => {
  return quantity > 0
    ? `${name}: 재고 부족 (${quantity}개 남음)`
    : `${name}: 품절\n`;
};

const getCartItemSummary = (name, price, quantity) => {
  return `${name} - ${price}원 x ${quantity}`;
};

export const textUtils = {
  getBungaeSaleMessage,
  getSuggestItemMessage,
  getSelectOptionText,
  getTotalAmountText,
  getDiscountText,
  getPointText,
  getStockWarningText,
  getCartItemSummary,
};
