/**
 * 아이템별 할인율 계산
 * @param {string} productId 상품 ID
 * @param {number} quantity 수량
 * @returns {number} 할인율 (0~1 사이의 값)
 */
export const calculateItemDiscount = (productId, quantity) => {
  if (quantity < 10) return 0;

  switch (productId) {
    case "p1":
      return 0.1;
    case "p2":
      return 0.15;
    case "p3":
      return 0.2;
    case "p4":
      return 0.05;
    case "p5":
      return 0.25;
    default:
      return 0;
  }
};

/**
 * 장바구니 전체 계산
 * @param {Object} state 현재 상태
 * @returns {Object} 계산 결과 (totalAmount, itemCount, discountRate, bonusPoints)
 */
export const calculateCartTotal = (state) => {
  const { cartItems, products } = state;
  let totalAmount = 0;
  let itemCount = 0;
  let subtotal = 0;

  // 각 상품별 합계 및 할인 계산
  Object.entries(cartItems).forEach(([productId, quantity]) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const itemTotal = product.val * quantity;
    itemCount += quantity;
    subtotal += itemTotal;

    const discount = calculateItemDiscount(productId, quantity);
    totalAmount += itemTotal * (1 - discount);
  });

  // 대량 구매 할인 계산
  let discountRate = calculateBulkDiscount(itemCount, totalAmount, subtotal);

  // 화요일 할인 적용
  if (isTuesday()) {
    totalAmount *= 0.9; // 10% 할인
    discountRate = Math.max(discountRate, 0.1);
  }

  // 포인트 계산
  const bonusPoints = Math.floor(totalAmount / 1000);

  return {
    totalAmount: Math.round(totalAmount),
    itemCount,
    discountRate,
    bonusPoints
  };
};

/**
 * 대량 구매 할인 계산
 * @param {number} itemCount 총 상품 개수
 * @param {number} totalAmount 할인 적용 전 총액
 * @param {number} subtotal 개별 할인 적용 후 총액
 * @returns {number} 전체 할인율
 */
export const calculateBulkDiscount = (itemCount, totalAmount, subtotal) => {
  // 아이템별 할인이 없는 경우
  if (totalAmount === subtotal) return 0;

  // 30개 이상 구매 시 추가 대량 할인 적용 검토
  if (itemCount >= 30) {
    const bulkDiscount = totalAmount * 0.25; // 25% 대량 할인
    const currentDiscount = subtotal - totalAmount; // 현재 할인액

    // 대량 할인이 더 크면 대량 할인 적용
    if (bulkDiscount > currentDiscount) {
      return 0.25;
    }
  }

  // 아이템별 할인만 적용
  return (subtotal - totalAmount) / subtotal;
};

/**
 * 현재 날짜가 화요일인지 확인
 * @returns {boolean} 화요일 여부
 */
export const isTuesday = () => {
  return new Date().getDay() === 2;
};

/**
 * 포인트 계산
 * @param {number} amount 금액
 * @returns {number} 포인트
 */
export const calculatePoints = (amount) => {
  return Math.floor(amount / 1000);
};
