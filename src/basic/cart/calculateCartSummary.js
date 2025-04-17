import {
  applyLoyaltyPoints,
  updateLowStockNotice,
  updateCartSummary,
} from '../components/index.js';
import {
  getBulkDiscountRate,
  getItemDiscountRate,
} from '../promotion/index.js';

// 장바구니 상품의 총액과 수량 계산
const getItemTotal = (cartItems, products) => {
  let itemCount = 0,
    totalAmount = 0,
    subTotal = 0;

  for (let item of cartItems) {
    // 상품 ID로 상품 정보 찾기
    const product = products.find(product => product.id === item.id);

    if (!product) {
      console.error(`상품 ID ${item.id}를 찾을 수 없습니다.`);
      continue;
    }

    const q = parseInt(item.querySelector('span').textContent.split('x ')[1]);
    const itemTotal = product.price * q;
    const discount = getItemDiscountRate(product.id, q);

    itemCount += q;
    subTotal += itemTotal;
    totalAmount += itemTotal * (1 - discount);
  }

  return {
    itemCount,
    totalAmount,
    subTotal,
  };
};

// 장바구니 요약 계산
export const calculateCartSummary = (
  total,
  cartItemsChildren,
  products,
  stockInfo
) => {
  // 장바구니 상품의 총액과 수량 계산
  const {
    itemCount,
    totalAmount: baseAmount,
    subTotal,
  } = getItemTotal(cartItemsChildren, products);

  // 대량 구매 및 화요일 할인 적용 후 총액/할인율 계산
  const { discountRate, totalAmount } = getBulkDiscountRate(
    itemCount,
    subTotal,
    baseAmount
  );

  // 장바구니의 총액을 업데이트
  updateCartSummary(total, discountRate, totalAmount);

  // 재고 상태 업데이트
  updateLowStockNotice(products, stockInfo);

  // 포인트 적립 기능
  applyLoyaltyPoints(total, totalAmount);
};
