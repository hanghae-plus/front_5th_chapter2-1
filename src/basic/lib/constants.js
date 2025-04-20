// 할인율
export const DISCOUNT_RATE = {
  tuesday: 0.1,
  bulk: 0.25,
  lucky: 0.2,
  suggestion: 0.05,
};

export const LUCK_THRESHOLD = 0.3;

// 상품 목록
export const prodList = [
  { id: 'p1', name: '상품1', price: 10000, quantity: 50, discountRate: 0.1 },
  { id: 'p2', name: '상품2', price: 20000, quantity: 30, discountRate: 0.15 },
  { id: 'p3', name: '상품3', price: 30000, quantity: 20, discountRate: 0.2 },
  { id: 'p4', name: '상품4', price: 15000, quantity: 0, discountRate: 0.05 },
  { id: 'p5', name: '상품5', price: 25000, quantity: 10, discountRate: 0.25 },
];
