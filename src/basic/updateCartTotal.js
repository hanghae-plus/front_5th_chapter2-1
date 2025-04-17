import {
  calculateProductDiscount,
  calculateCartDiscount,
  calculateTuesdayDiscount,
} from './calculateDiscount.js';

/**
 * 장바구니 총 금액을 계산합니다.
 * @param {HTMLElement} cartList - 장바구니 목록 요소
 * @param {Array} products - 상품 목록
 * @returns {Object} 계산 결과
 * @returns {number} returns.totalPrice - 최종 금액
 * @returns {number} returns.discountRate - 할인율
 * @returns {number} returns.bonusPoints - 적립 포인트
 */
const calculateCartTotal = (cartList, products) => {
  let totalPrice = 0;
  let totalProductCount = 0;
  let totalPriceBeforeDiscount = 0;

  const cartItems = cartList.children;

  for (let i = 0; i < cartItems.length; i++) {
    const currentProduct = products.find((p) => p.id === cartItems[i].id);
    const quantity = parseInt(cartItems[i].querySelector('span').textContent.split('x ')[1]);

    totalProductCount += quantity;

    const productTotalPrice = currentProduct.price * quantity;

    totalPriceBeforeDiscount += productTotalPrice;

    totalPrice += calculateProductDiscount(currentProduct, quantity);
  }

  let totalCartDiscountRate = calculateCartDiscount(
    totalPrice,
    totalPriceBeforeDiscount,
    totalProductCount,
  );

  const tuesdayDiscount = calculateTuesdayDiscount(totalPrice, totalCartDiscountRate);

  totalPrice = tuesdayDiscount.price;
  totalCartDiscountRate = tuesdayDiscount.discountRate;

  const bonusPoints = Math.floor(totalPrice / 1000);

  return {
    totalPrice,
    discountRate: totalCartDiscountRate,
    bonusPoints,
  };
};

/**
 * 재고 상태 메시지를 렌더링합니다.
 * @param {Array} products - 상품 목록
 * @param {HTMLElement} stockStatus - 재고 상태 표시 요소
 */
const renderStockStatusMessage = (products, stockStatus) => {
  let stockStatusMessage = '';

  products.forEach(({ name, quantity }) => {
    if (quantity < 5) {
      stockStatusMessage += `${name}: ${quantity > 0 ? `재고 부족 (${quantity}개 남음)` : '품절'}\n`;
    }
  });

  stockStatus.textContent = stockStatusMessage;
};

/**
 * 포인트 표시 요소를 가져오거나 생성합니다.
 * @param {HTMLElement} cartTotalPrice - 총 금액 표시 요소
 * @returns {HTMLElement} 포인트 표시 요소
 */
const getOrCreateRewardPointsElement = (cartTotalPrice) => {
  let $rewardPoints = document.getElementById('loyalty-points');

  if (!$rewardPoints) {
    $rewardPoints = document.createElement('span');
    $rewardPoints.id = 'loyalty-points';
    $rewardPoints.className = 'text-blue-500 ml-2';
    cartTotalPrice.appendChild($rewardPoints);
  }

  return $rewardPoints;
};

/**
 * 장바구니 총 금액을 렌더링합니다.
 * @param {HTMLElement} cartTotalPrice - 총 금액 표시 요소
 * @param {number} totalPrice - 총 금액
 * @param {number} discountRate - 할인율
 * @param {number} bonusPoints - 적립 포인트
 */
const renderCartTotal = (cartTotalPrice, totalPrice, discountRate, bonusPoints) => {
  cartTotalPrice.textContent = `총액: ${Math.round(totalPrice)}원`;

  if (discountRate > 0) {
    const $discountBadge = document.createElement('span');

    $discountBadge.className = 'text-green-500 ml-2';
    $discountBadge.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    cartTotalPrice.appendChild($discountBadge);
  }

  const $rewardPoints = getOrCreateRewardPointsElement(cartTotalPrice);

  $rewardPoints.textContent = `(포인트: ${bonusPoints})`;
};

/**
 * 장바구니 총 금액을 업데이트합니다.
 * @param {HTMLElement} cartList - 장바구니 목록 요소
 * @param {Array} products - 상품 목록
 * @param {HTMLElement} cartTotalPrice - 총 금액 표시 요소
 * @param {HTMLElement} stockStatus - 재고 상태 표시 요소
 */
const updateCartTotal = (cartList, products, cartTotalPrice, stockStatus) => {
  const { totalPrice, discountRate, bonusPoints } = calculateCartTotal(cartList, products);

  renderCartTotal(cartTotalPrice, totalPrice, discountRate, bonusPoints);
  renderStockStatusMessage(products, stockStatus);
};

export default updateCartTotal;
