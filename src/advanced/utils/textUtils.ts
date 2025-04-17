const getBungaeSaleText = (name: string) =>
  `번개세일! ${name}이(가) 20% 할인 중입니다!`;

const getSuggestSaleText = (name: string) =>
  `${name}은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!`;

const getDiscountedAmountText = (rate: string) => `(${rate}% 할인 적용)`;

const getWarningText = (name: string, quantity: number) =>
  `${name}: ${quantity > 0 ? '재고 부족 (' + quantity + '개 남음)' : '품절'}\n`;

const OUT_OF_STOCK = '재고가 부족합니다.';

export const textUtils = {
  getBungaeSaleText,
  getSuggestSaleText,
  getDiscountedAmountText,
  getWarningText,
  OUT_OF_STOCK,
};
