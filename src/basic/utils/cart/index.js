import {
  BULK_DISCOUNT_RATE,
  BULK_DISCOUNT_THRESHOLD,
  DISCOUNT_MIN_QUANTITY,
  DISCOUNT_RATES,
  TUESDAY_DISCOUNT_RATE,
} from "../../constants";
import { cartStore } from "../../stores";

/**
 * 장바구니에서 특정 ID를 가진 상품을 찾습니다.
 *
 * @param {string} id - 찾고자 하는 상품의 ID
 * @returns {CartItem|undefined} 찾은 장바구니 아이템 또는 undefined
 */
export const getCartItemById = (id) => {
  const { cartItems } = cartStore.state;

  return cartItems.find((item) => item.id === id);
};

/**
 * 장바구니에서 특정 ID를 가진 상품의 수량을 업데이트합니다.
 *
 * @param {string} id - 업데이트할 상품의 ID
 * @param {number} quantity - 새로운 수량
 * @returns {CartItem[]} 업데이트된 장바구니 목록
 */
export const updateCartItemQuantity = (id, quantity) => {
  const { cartItems } = cartStore.state;

  return cartItems.map((item) => {
    if (item.id === id) {
      return { ...item, quantity };
    }

    return item;
  });
};

/**
 * 장바구니에 새 상품을 추가합니다.
 *
 * @param {string} id - 상품 ID
 * @param {string} name - 상품 이름
 * @param {number} price - 상품 가격
 * @param {number} quantity - 추가할 수량
 * @returns {CartItem[]} 업데이트된 장바구니 목록
 */
export const addItem = (id, name, price, quantity) => {
  const { cartItems } = cartStore.state;

  return [...cartItems, { id, name, price, quantity }];
};

/**
 * 장바구니에서 특정 ID를 가진 상품을 제거합니다.
 *
 * @param {string} id - 제거할 상품의 ID
 * @returns {CartItem[]} 업데이트된 장바구니 목록
 */
export const removeCartItem = (id) => {
  const { cartItems } = cartStore.state;

  return cartItems.filter((item) => item.id !== id);
};

/**
 * 장바구니 총액과 할인율을 계산합니다.
 *
 * @param {CartItem[]} cartItems - 장바구니 아이템 목록
 * @returns {{totalAmount: number, discountRate: number}} 총액과 할인율 정보가 담긴 객체
 */
export const calculateCartTotal = (cartItems) => {
  if (cartItems.length === 0) {
    return { totalAmount: 0, discountRate: 0 };
  }

  let originalTotalAmount = 0;
  let discountedTotalAmount = 0;
  let totalQuantity = 0;

  // 각 아이템별 할인 계산
  for (const cartItem of cartItems) {
    const { id, quantity, price } = cartItem;
    const itemTotal = price * quantity;

    let itemDiscount = 0;

    if (quantity >= DISCOUNT_MIN_QUANTITY) {
      itemDiscount = DISCOUNT_RATES[id] ?? 0;
    }

    totalQuantity += quantity;
    originalTotalAmount += itemTotal;
    discountedTotalAmount += itemTotal * (1 - itemDiscount);
  }

  // 초기 할인율 계산
  let discountRate = (originalTotalAmount - discountedTotalAmount) / originalTotalAmount || 0;

  // 대량 할인 적용
  if (totalQuantity >= BULK_DISCOUNT_THRESHOLD) {
    const bulkDiscount = originalTotalAmount * BULK_DISCOUNT_RATE;
    const itemDiscount = originalTotalAmount - discountedTotalAmount;

    if (bulkDiscount > itemDiscount) {
      discountedTotalAmount = originalTotalAmount * (1 - BULK_DISCOUNT_RATE);
      discountRate = BULK_DISCOUNT_RATE;
    }
  }

  // 화요일 할인 적용
  if (new Date().getDay() === 2) {
    discountedTotalAmount *= 1 - TUESDAY_DISCOUNT_RATE;
    discountRate = Math.max(discountRate, TUESDAY_DISCOUNT_RATE);
  }

  return { totalAmount: discountedTotalAmount, discountRate };
};

/**
 * 적립 포인트를 계산하고 표시합니다.
 *
 * @param {HTMLElement} element - 포인트를 표시할 부모 요소
 * @param {number} totalAmount - 총 금액
 */
export const renderBonusPoints = (element, totalAmount) => {
  const bonusPoints = Math.floor(totalAmount / 1000);

  let pointsElement = document.getElementById("loyalty-points");

  if (!pointsElement) {
    pointsElement = document.createElement("span");
    pointsElement.id = "loyalty-points";
    pointsElement.className = "text-blue-500 ml-2";
    element.appendChild(pointsElement);
  }

  pointsElement.textContent = `(포인트: ${bonusPoints})`;
};
